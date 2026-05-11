import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 키워드 차단 목록 (클라이언트 측과 동일하게 유지)
const BLOCKED_KEYWORDS = ['욕설', '음란', '폭력', 'sex', 'fuck', 'shit', 'porn', 'kill'];

const DAILY_QUOTE_LIMIT = 10;

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

// ─── Gemini 명언 생성 (내부 헬퍼) ────────────────────────────────────────────

async function generateQuoteContent(
  preferredTheme: string,
  customKeyword: string,
  language: string,
  geminiApiKey: string
): Promise<{ text: string; author: string; explanation: string; resolvedTheme: string } | null> {
  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // 랜덤 처리
    const ALL_THEMES = Object.keys(THEME_NAMES);
    let resolvedTheme = preferredTheme === 'random'
      ? ALL_THEMES[Math.floor(Math.random() * ALL_THEMES.length)]
      : (THEME_NAMES[preferredTheme] ? preferredTheme : 'life');

    const langName = LANG_NAMES[language] ?? 'English';

    let topicPart: string;
    if (customKeyword?.trim()) {
      topicPart = `keyword: "${customKeyword.trim()}"`;
    } else {
      const themeName = THEME_NAMES[resolvedTheme] ?? resolvedTheme;
      topicPart = `theme: "${themeName}"`;
    }

    const prompt = `Generate a short, powerful inspirational quote about ${topicPart}. Write everything in ${langName}. Also write a warm, insightful 2-3 sentence explanation of why this quote matters and how it applies to daily life. Respond only with JSON: {"text": "quote text", "author": "Author Name", "explanation": "explanation text"}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    });

    const data = JSON.parse(result.response.text());
    if (data.text && data.author) return { text: data.text, author: data.author, explanation: data.explanation || '', resolvedTheme };
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
      const { fcmToken, language = 'ko', preferredTheme, preferredThemes, customKeyword = '' } = doc.data();
      // 하위 호환: 이전 preferredThemes 데이터도 지원
      const resolvedPreferredTheme = preferredTheme || preferredThemes?.[0] || 'life';
      const lang = (language in NOTIF_TITLES) ? language : 'ko';

      const quote = geminiApiKey
        ? await generateQuoteContent(resolvedPreferredTheme, customKeyword, lang, geminiApiKey)
        : null;

      const title = NOTIF_TITLES[lang];
      const body  = quote
        ? `"${quote.text}" — ${quote.author}`
        : FALLBACK_BODIES[lang];

      // 생성된 명언을 Firestore에 먼저 저장 (앱 열었을 때 표시용)
      let quoteId: string | null = null;
      if (quote) {
        try {
          const quoteData = {
            text: quote.text,
            author: quote.author,
            explanation: quote.explanation,
            theme: quote?.resolvedTheme || resolvedPreferredTheme,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            uid: doc.id,
            source: 'notification',
          };
          const docRef = await db.collection('users').doc(doc.id).collection('history').add(quoteData);
          quoteId = docRef.id;
        } catch (err) {
          console.error(`[Notification] Firestore 저장 실패 (${doc.id}):`, err);
        }
      }

      try {
        await admin.messaging().send({
          token: fcmToken as string,
          notification: { title, body },
          // FCM data payload: 앱에서 quoteId로 해당 명언 로드
          data: { ...(quoteId ? { quoteId } : {}) },
          webpush: { fcmOptions: { link: appUrl } },
          android: { priority: 'high' },
        });
        console.log(`[Notification] 발송 완료 (${doc.id})${quoteId ? ` quoteId: ${quoteId}` : ''}`);
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

// ─── HTTPS Callable: 클라이언트가 직접 Gemini 호출 대신 이 함수로 ─────────────
// 보안: API key 가 클라이언트 번들에서 사라지고 서버 시크릿에만 존재
// 남용 방지: Firebase Auth 검증 + Firestore 일일 한도 (atomic transaction)

interface GenerateQuoteRequest {
  preferredThemes?: string[];
  customKeyword?: string;
  language?: string;
}

export const generateQuote = onCall<GenerateQuoteRequest>(
  {
    secrets: ['GEMINI_API_KEY'],
    // 한국 사용자 latency 줄이기: 가까운 region 사용. 미배포 region 이면 us-central1 fallback
    region: 'asia-northeast3',
  },
  async (request) => {
    // 1) 인증 검증 — 비로그인 거부
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Login required to generate a quote.');
    }
    const uid = request.auth.uid;

    const { preferredThemes = ['motivation'], customKeyword = '', language = 'ko' } =
      request.data ?? {};

    // 2) 키워드 차단
    if (customKeyword) {
      const lower = customKeyword.toLowerCase();
      if (BLOCKED_KEYWORDS.some((b) => lower.includes(b))) {
        throw new HttpsError('invalid-argument', 'Keyword contains blocked term.');
      }
    }

    // 3) 일일 한도 체크 (atomic 트랜잭션 — 클라이언트 우회 불가)
    const today = new Date().toISOString().split('T')[0];
    const usageRef = db.doc(`users/${uid}/usage/${today}`);

    const newCount: number = await db.runTransaction(async (tx) => {
      const snap = await tx.get(usageRef);
      const cur: number = snap.exists ? (snap.data()?.count ?? 0) : 0;
      if (cur >= DAILY_QUOTE_LIMIT) {
        throw new HttpsError(
          'resource-exhausted',
          `Daily limit reached (${cur}/${DAILY_QUOTE_LIMIT}). Try again tomorrow.`
        );
      }
      tx.set(usageRef, { count: cur + 1 }, { merge: true });
      return cur + 1;
    });

    // 4) 테마 resolution (클라이언트와 동일 로직 — 단 ALL_THEMES 는 함수 측 정의 사용)
    const ALL_THEMES = Object.keys(THEME_NAMES);
    const filtered = preferredThemes.filter((id) => id !== 'random');
    const includesRandom = preferredThemes.includes('random');
    const pool = includesRandom || filtered.length === 0 ? ALL_THEMES : filtered;
    const resolvedTheme = pool[Math.floor(Math.random() * pool.length)];

    // 5) Gemini 호출
    const apiKey = process.env.GEMINI_API_KEY ?? '';
    if (!apiKey) {
      throw new HttpsError('internal', 'Server is misconfigured (missing API key).');
    }
    const lang = language in LANG_NAMES ? language : 'ko';
    const quote = await generateQuoteContent(resolvedTheme, customKeyword, lang, apiKey);
    if (!quote) {
      throw new HttpsError('internal', 'Quote generation failed. Please try again.');
    }

    // 6) Firestore history 에 저장
    const docRef = await db.collection(`users/${uid}/history`).add({
      text: quote.text,
      author: quote.author,
      explanation: quote.explanation,
      theme: quote.resolvedTheme,
      uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      source: 'manual',
    });

    return {
      id: docRef.id,
      text: quote.text,
      author: quote.author,
      explanation: quote.explanation,
      theme: quote.resolvedTheme,
      usageCount: newCount,
    };
  }
);
