"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDailyNotifications = void 0;
const admin = __importStar(require("firebase-admin"));
const scheduler_1 = require("firebase-functions/v2/scheduler");
const generative_ai_1 = require("@google/generative-ai");
admin.initializeApp();
const db = admin.firestore();
// ─── 상수 ────────────────────────────────────────────────────────────────────
const THEME_NAMES = {
    motivation: 'motivation and inspiration',
    comfort: 'comfort and healing',
    humor: 'humor and wit',
    success: 'success and achievement',
    business: 'business and leadership',
    love: 'love and relationships',
    philosophy: 'philosophy and deep thought',
    wisdom: 'wisdom and life lessons',
    life: 'life and living',
};
const NOTIF_TITLES = {
    ko: '오늘의 명언 ✨',
    en: 'Daily Quote ✨',
    ja: '今日の名言 ✨',
    zh: '每日名言 ✨',
};
const FALLBACK_BODIES = {
    ko: '오늘의 영감이 준비됐어요. 지금 확인해보세요!',
    en: 'Your daily inspiration is ready. Check it out now!',
    ja: '今日のインスピレーションが届きました。今すぐチェック！',
    zh: '今天的灵感已准备好。现在查看！',
};
const LANG_NAMES = {
    ko: '한국어', en: 'English', ja: '日本語', zh: '中文',
};
// ─── Gemini 명언 생성 ─────────────────────────────────────────────────────────
async function generateQuote(themes, language, geminiApiKey) {
    var _a, _b;
    try {
        const genAI = new generative_ai_1.GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const theme = themes[Math.floor(Math.random() * themes.length)] || 'life';
        const themeName = (_a = THEME_NAMES[theme]) !== null && _a !== void 0 ? _a : theme;
        const langName = (_b = LANG_NAMES[language]) !== null && _b !== void 0 ? _b : 'English';
        const prompt = `Generate a short, powerful inspirational quote about "${themeName}". Write the quote and author name in ${langName}. Respond only with JSON: {"text": "quote text", "author": "Author Name"}`;
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
        });
        const data = JSON.parse(result.response.text());
        if (data.text && data.author)
            return data;
        return null;
    }
    catch (err) {
        console.error('[Notification] Gemini 생성 실패:', err);
        return null;
    }
}
// ─── 스케줄 함수: 매 분 실행 ──────────────────────────────────────────────────
// 각 유저의 notificationTimeUTC와 현재 UTC HH:MM을 비교해 발송
exports.sendDailyNotifications = (0, scheduler_1.onSchedule)({
    schedule: 'every 1 minutes',
    timeZone: 'UTC',
    secrets: ['GEMINI_API_KEY'],
}, async () => {
    var _a, _b;
    const now = new Date();
    const utcHHMM = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}`;
    const snapshot = await db.collection('users')
        .where('isSubscribed', '==', true)
        .get();
    const targets = snapshot.docs.filter((doc) => {
        const d = doc.data();
        return d.fcmToken && d.notificationTimeUTC === utcHHMM;
    });
    if (targets.length === 0)
        return;
    console.log(`[Notification] ${utcHHMM} UTC → ${targets.length}명 발송`);
    const geminiApiKey = (_a = process.env.GEMINI_API_KEY) !== null && _a !== void 0 ? _a : '';
    const appUrl = (_b = process.env.APP_URL) !== null && _b !== void 0 ? _b : 'https://lumina-762f8.firebaseapp.com';
    await Promise.allSettled(targets.map(async (doc) => {
        const { fcmToken, language = 'ko', preferredThemes = ['life'] } = doc.data();
        const lang = (language in NOTIF_TITLES) ? language : 'ko';
        const quote = geminiApiKey
            ? await generateQuote(preferredThemes, lang, geminiApiKey)
            : null;
        const title = NOTIF_TITLES[lang];
        const body = quote
            ? `"${quote.text}" — ${quote.author}`
            : FALLBACK_BODIES[lang];
        // 생성된 명언을 Firestore에 먼저 저장 (앱 열었을 때 표시용)
        let quoteId = null;
        if (quote) {
            try {
                const quoteData = {
                    text: quote.text,
                    author: quote.author,
                    explanation: '',
                    theme: preferredThemes[Math.floor(Math.random() * preferredThemes.length)] || 'life',
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    uid: doc.id,
                    source: 'notification',
                };
                const docRef = await db.collection('users').doc(doc.id).collection('history').add(quoteData);
                quoteId = docRef.id;
            }
            catch (err) {
                console.error(`[Notification] Firestore 저장 실패 (${doc.id}):`, err);
            }
        }
        try {
            await admin.messaging().send({
                token: fcmToken,
                notification: { title, body },
                // FCM data payload: 앱에서 quoteId로 해당 명언 로드
                data: Object.assign({}, (quoteId ? { quoteId } : {})),
                webpush: { fcmOptions: { link: appUrl } },
                android: { priority: 'high' },
            });
            console.log(`[Notification] 발송 완료 (${doc.id})${quoteId ? ` quoteId: ${quoteId}` : ''}`);
        }
        catch (err) {
            const e = err;
            console.error(`[Notification] 발송 실패 (${doc.id}):`, e.message);
            if (e.code === 'messaging/registration-token-not-registered') {
                await db.collection('users').doc(doc.id).update({ isSubscribed: false, fcmToken: '' });
                console.log(`[Notification] 만료 토큰 정리: ${doc.id}`);
            }
        }
    }));
});
//# sourceMappingURL=index.js.map