import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { GoogleGenerativeAI } from '@google/generative-ai';

admin.initializeApp();
const db = admin.firestore();

// ─── 상수 ────────────────────────────────────────────────────────────────────

const THEME_NAMES: Record<string, string> = {
  motivation: 'motivation and inspiration',
  comfort:    'comfort and healing',
  humor:      'humor and wit',
  success:    'success and achievement',
  business:   'business and leadership',
  love:       'love and relationships',
  philosophy: 'philosophy and deep thought',
  wisdom:     'wisdom and life lessons',
  life:       'life and living',
};

const NOTIF_TITLES: Record<string, string> = {
  ko: '오늘의 명언 ✨',
  en: 'Daily Quote ✨',
  ja: '今日の名言 ✨',
  zh: '每日名言 ✨',
};

const FALLBACK_BODIES: Record<string, string> = {
  ko: '오늘의 영감이 준비됐어요. 지금 확인해보세요!',
  en: 'Your daily inspiration is ready. Check it out now!',
  ja: '今日のインスピレーションが届きました。今すぐチェック！',
  zh: '今天的灵感已准备好。现在查看！',
};

const LANG_NAMES: Record<string, string> = {
  ko: '한국어', en: 'English', ja: '日本語', zh: '中文',
};

// ─── Gemini 명언 생성 ─────────────────────────────────────────────────────────

async function generateQuote(
  themes: string[],
  language: string,
  geminiApiKey: string
): Promise<{ text: string; author: string } | null> {
  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const theme = themes[Math.floor(Math.random() * themes.length)] || 'life';
    const themeName = THEME_NAMES[theme] ?? theme;
    const langName = LANG_NAMES[language] ?? 'English';

    const prompt = `Generate a short, powerful inspirational quote about "${themeName}". Write the quote and author name in ${langName}. Respond only with JSON: {"text": "quote text", "author": "Author Name"}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const data = JSON.parse(result.response.text());
    if (data.text && data.author) return data;
    return null;
  } catch (err) {
    console.error('[Notification] Gemini 생성 실패:', err);
    return null;
  }
}

// ─── 스케줄 함수: 매 분 실행 ──────────────────────────────────────────────────
// 각 유저의 notificationTimeUTC와 현재 UTC HH:MM을 비교해 발송

export const sendDailyNotifications = onSchedule(
  {
    schedule: 'every 1 minutes',
    timeZone: 'UTC',
    secrets: ['GEMINI_API_KEY'],
  },
  async () => {
    const now = new Date();
    const utcHHMM = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}`;

    const snapshot = await db.collection('users')
      .where('isSubscribed', '==', true)
      .get();

    const targets = snapshot.docs.filter((doc) => {
      const d = doc.data();
      return d.fcmToken && d.notificationTimeUTC === utcHHMM;
    });

    if (targets.length === 0) return;
    console.log(`[Notification] ${utcHHMM} UTC → ${targets.length}명 발송`);

    const geminiApiKey = process.env.GEMINI_API_KEY ?? '';
    const appUrl = process.env.APP_URL ?? 'https://lumina-762f8.firebaseapp.com';

    await Promise.allSettled(targets.map(async (doc) => {
      const { fcmToken, language = 'ko', preferredThemes = ['life'] } = doc.data();
      const lang = (language in NOTIF_TITLES) ? language : 'ko';

      const quote = geminiApiKey
        ? await generateQuote(preferredThemes, lang, geminiApiKey)
        : null;

      const title = NOTIF_TITLES[lang];
      const body  = quote
        ? `"${quote.text}" — ${quote.author}`
        : FALLBACK_BODIES[lang];

      try {
        await admin.messaging().send({
          token: fcmToken as string,
          notification: { title, body },
          webpush: { fcmOptions: { link: appUrl } },
          android: { priority: 'high' },
        });
        console.log(`[Notification] 발송 완료 (${doc.id})`);
      } catch (err: unknown) {
        const e = err as { code?: string; message?: string };
        console.error(`[Notification] 발송 실패 (${doc.id}):`, e.message);
        if (e.code === 'messaging/registration-token-not-registered') {
          await db.collection('users').doc(doc.id).update({ isSubscribed: false, fcmToken: '' });
          console.log(`[Notification] 만료 토큰 정리: ${doc.id}`);
        }
      }
    }));
  }
);
