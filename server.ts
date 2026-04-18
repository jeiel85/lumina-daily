import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import cron from "node-cron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // API routes go here
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Serve Firebase config dynamically from environment variables or local file
  app.get("/firebase-applet-config.json", async (req, res) => {
    let localConfig = {};
    try {
      const configPath = path.join(process.cwd(), "firebase-applet-config.json");
      const fs = await import("fs/promises");
      const data = await fs.readFile(configPath, "utf-8");
      localConfig = JSON.parse(data);
    } catch (e) {
      console.warn("Could not read firebase-applet-config.json from disk");
    }

    res.json({
      apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY || (localConfig as any).apiKey,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN || (localConfig as any).authDomain,
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || (localConfig as any).projectId,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET || (localConfig as any).storageBucket,
      messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID || (localConfig as any).messagingSenderId,
      appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID || (localConfig as any).appId,
      measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || process.env.FIREBASE_MEASUREMENT_ID || (localConfig as any).measurementId,
      firestoreDatabaseId: process.env.VITE_FIREBASE_DATABASE_ID || process.env.FIREBASE_DATABASE_ID || (localConfig as any).firestoreDatabaseId,
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built files
    // Note: outDir is 'docs' in vite.config.ts
    const distPath = path.join(process.cwd(), 'docs');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

// ─── Push Notification Cron ───────────────────────────────────────────────────

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

const FALLBACK_MESSAGES: Record<string, string> = {
  ko: '오늘의 영감이 준비됐어요. 지금 확인해보세요!',
  en: 'Your daily inspiration is ready. Check it out now!',
  ja: '今日のインスピレーションが届きました。今すぐチェック！',
  zh: '今天的灵感已准备好。现在查看！',
};

const LANG_NAMES: Record<string, string> = {
  ko: '한국어', en: 'English', ja: '日本語', zh: '中文',
};

// Gemini로 개인화 명언 생성 (실패 시 null 반환 → 폴백 메시지 사용)
async function generateQuoteForNotification(
  themes: string[],
  language: string,
  geminiApiKey: string
): Promise<{ text: string; author: string } | null> {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const theme = themes[Math.floor(Math.random() * themes.length)] || 'life';
    const themeName = THEME_NAMES[theme] ?? theme;
    const langName = LANG_NAMES[language] ?? 'English';

    const prompt = `Generate a short, powerful inspirational quote about "${themeName}". Write the quote and author name in ${langName}. If the author is a real historical figure, keep their name in its original language. Respond only with JSON: {"text": "quote text", "author": "Author Name"}`;

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

async function initNotificationCron() {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!serviceAccountJson) {
    console.warn('[Notification] FIREBASE_SERVICE_ACCOUNT_JSON 미설정 - 푸시 알림 비활성화');
    return;
  }

  const geminiApiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || '';
  if (!geminiApiKey) {
    console.warn('[Notification] GEMINI_API_KEY 미설정 - 폴백 메시지로 발송됩니다');
  }

  const admin = (await import('firebase-admin')).default;
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
    });
  }
  const adminDb = admin.firestore();

  // 매 분 정각에 실행: 현재 UTC HH:MM과 notificationTimeUTC가 일치하는 구독자에게 발송
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const utcHHMM = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}`;

    let snapshot;
    try {
      snapshot = await adminDb.collection('users')
        .where('isSubscribed', '==', true)
        .get();
    } catch (err) {
      console.error('[Notification] Firestore 조회 실패:', err);
      return;
    }

    const targets = snapshot.docs.filter(doc => {
      const data = doc.data();
      return data.fcmToken && data.notificationTimeUTC === utcHHMM;
    });

    if (targets.length === 0) return;
    console.log(`[Notification] ${utcHHMM} UTC - ${targets.length}명에게 알림 발송 시작`);

    const appUrl = process.env.APP_URL || '/';

    await Promise.allSettled(targets.map(async (doc) => {
      const { fcmToken, language = 'ko', preferredThemes = ['life'] } = doc.data();
      const lang = language in NOTIF_TITLES ? language : 'ko';

      // 유저별 개인화 명언 생성
      const quote = geminiApiKey
        ? await generateQuoteForNotification(preferredThemes, lang, geminiApiKey)
        : null;

      const title = NOTIF_TITLES[lang];
      const body = quote
        ? `"${quote.text}" — ${quote.author}`
        : FALLBACK_MESSAGES[lang];

      try {
        await admin.messaging().send({
          token: fcmToken,
          notification: { title, body },
          webpush: { fcmOptions: { link: appUrl } },
        });
        console.log(`[Notification] 발송 완료 (${doc.id}): ${quote ? '개인화 명언' : '폴백 메시지'}`);
      } catch (err: any) {
        console.error(`[Notification] 발송 실패 (${doc.id}):`, err.message);
        // 토큰 만료/무효 시 구독 해제
        if (err.code === 'messaging/registration-token-not-registered') {
          await adminDb.collection('users').doc(doc.id).update({ isSubscribed: false, fcmToken: '' });
          console.log(`[Notification] 만료 토큰 정리: ${doc.id}`);
        }
      }
    }));
  });

  console.log('[Notification] 알림 cron 활성화 (매 분 실행)');
}

initNotificationCron().catch(err => console.error('[Notification] cron 초기화 실패:', err));
