# ✨ Lumina Daily: Your Daily Dose of Wisdom

> **"Lumina: 당신의 하루를 채우는 지혜 한 조각"**

Lumina는 AI 기반의 명언 · 성찰 앱입니다. Google Gemini로 맞춤형 명언을 생성하고, 감성적인 이미지 카드로 공유할 수 있습니다. **Android 전용** 앱이며, React + Capacitor 기반으로 빌드됩니다.

- 📱 Android: Google Play 출시 (패키지명 `com.jeiel85.luminadaily`)
- 📢 앱 소개 페이지: [https://jeiel85.github.io/lumina-daily/](https://jeiel85.github.io/lumina-daily/) — 정적 랜딩 페이지 (앱이 아님)
- 🏷 현재 버전: **v1.3.10** (Android versionCode 30)

> ⚠️ **GitHub Pages URL은 앱의 웹 버전이 아니라 앱 소개용 정적 랜딩 페이지입니다.** 실제 앱은 Google Play의 Android APK에서만 동작합니다. 자세한 정책은 [CLAUDE.md](./CLAUDE.md) 참고.

---

## 🌟 주요 특징 (Key Features)

### 🧠 AI-Powered 명언 생성
- **Google Gemini 2.5 Flash** 기반 맞춤 명언 + AI 해설
- 10개 테마: motivation, comfort, humor, success, business, love, philosophy, wisdom, life, random
- 사용자 정의 키워드 입력 지원 (욕설/유해어 차단)
- **일일 한도 10회** — Firestore atomic 트랜잭션으로 우회 방지

### 🔐 보안 강화 — Cloud Functions Gemini 프록시
- Gemini API 키를 **클라이언트 번들에서 완전히 제거**
- 모든 명언 생성은 `generateQuote` Callable Function 경유 (asia-northeast3)
- Firebase Auth 인증 + 일일 한도 + 키워드 필터를 서버에서 검증
- 요금 폭탄 / 키 유출 리스크 차단

### 🔔 데일리 알림 (Daily Notifications)
- `sendDailyNotifications` 스케줄러가 매 분 실행
- 사용자별 설정 시각(UTC 환산)에 맞춰 Gemini로 명언 생성 → FCM 발송
- 만료 토큰 자동 정리

### 📱 Capacitor 하이브리드
- React + Vite 웹 자산을 그대로 네이티브 Android로 패키징
- Google 로그인 (Credential Manager), FCM 푸시, 햅틱, 인앱 리뷰, 로컬 알림, 파일 시스템, 공유 모두 네이티브 연동
- `build-and-install.bat` 한 방 빌드 자동화

### 🎨 UI / UX
- Light / Dark / System / Material You 4가지 테마
- 다크모드 가독성 튜닝 (neutral-900/800 베이스)
- **햅틱 피드백 ON/OFF** 사용자 설정 (v1.3.8+)
- Motion(framer-motion) 기반 마이크로 애니메이션
- 이미지 카드 다운로드 · 공유 (Picsum Photos 배경)

### 🌍 4개 국어
- 한국어 · English · 日本語 · 中文
- 앱 스토어 설명 및 OG 메타태그도 다국어 대응

### 🎁 부가 기능
- **인앱 리뷰**: 명언 저장/공유 3회 누적 시 리뷰 프롬프트
- **리퍼럴 시스템**: 사용자별 초대 코드 생성/표시
- **SNS 공유용 OG 이미지**: `og-image` + 메타태그 자동 적용 (소개 페이지용)

---

## 🛠 기술 스택 (Tech Stack)

### Frontend & Mobile
![React](https://img.shields.io/badge/react-19-%2320232a?logo=react)
![TypeScript](https://img.shields.io/badge/typescript-5.8-%23007ACC)
![Vite](https://img.shields.io/badge/vite-6-%23646CFF)
![Capacitor](https://img.shields.io/badge/capacitor-8-%23119EFF)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4-%2338B2AC)
![Motion](https://img.shields.io/badge/motion-12-%23000000)

### Backend & Infrastructure
![Firebase](https://img.shields.io/badge/firebase-12-%23FFCA2D?logo=firebase)
![Functions](https://img.shields.io/badge/Cloud_Functions-Node_22-%2300B562)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-8E75B2)
![Firestore](https://img.shields.io/badge/Firestore-rules-%23FFA000)
![FCM](https://img.shields.io/badge/FCM-Messaging-%23FF6F00)

### Testing
![Vitest](https://img.shields.io/badge/vitest-4-%236E9F18)
![Playwright](https://img.shields.io/badge/playwright-1-%232EAD33)

---

## 🚀 시작하기 (Getting Started)

### 1. 설치 & 개발 서버
```bash
npm install
npm run dev          # http://localhost:5173
```

### 2. 환경 변수
`.env.example`을 복사해 `.env` 작성:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=lumina-762f8
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```
> ⚠️ Gemini API 키는 더 이상 클라이언트에 두지 않습니다. Cloud Functions secret(`GEMINI_API_KEY`)으로만 관리하세요.

### 3. 빌드
```bash
npm run build  # APK 번들용 자산 빌드 (dist/) — Capacitor가 android assets에 복사
```

> ⚠️ `dist/`는 **오직 APK 번들 용도**다. GitHub Pages로 배포하지 않는다.
> GitHub Pages는 `docs/` 폴더(정적 랜딩 페이지)를 main 브랜치에서 직접 서빙한다.

### 4. Android APK / AAB 빌드
```bat
.\build-and-install.bat
```
산출물:
- Debug APK: `android\app\build\outputs\apk\debug\app-debug.apk`
- Release AAB: `android\app\build\outputs\bundle\release\app-release.aab`

### 5. Cloud Functions 배포
```bash
cd functions
npm install
npm run deploy   # firebase deploy --only functions
```
필수 secret:
```bash
firebase functions:secrets:set GEMINI_API_KEY
```

---

## 🧪 테스트 (Testing)

```bash
npm test              # Vitest (단위)
npx playwright test   # Playwright (E2E UI)
```

| 종류 | 파일 | 케이스 |
|---|---|---|
| Vitest | `src/components/App.test.tsx` | 7 |
| Vitest | `src/i18n/config.test.ts` | 7 |
| Playwright | `src/e2e/app.spec.ts` | 3 |
| Playwright | `src/e2e/app-ui.spec.ts` | 10 |

---

## 📂 프로젝트 구조

```
lumina-daily/
├── src/
│   ├── App.tsx                # 메인 앱
│   ├── firebase.ts            # Firebase 초기화 + Google 로그인 (Capacitor 분기)
│   ├── main.tsx
│   ├── components/            # QuoteCard, Header, HistoryItem, ErrorBoundary, HistorySkeleton
│   ├── constants/             # 테마, 카드 스타일, 차단 키워드, 언어
│   ├── types/                 # TypeScript 타입
│   ├── utils/haptics.ts       # 햅틱 토글 유틸
│   ├── i18n/                  # 다국어 (ko/en/ja/zh)
│   ├── e2e/                   # Playwright 스펙
│   └── test/setup.ts          # Vitest 셋업
│
├── functions/                 # Firebase Cloud Functions (Node 22)
│   └── src/index.ts
│       ├── generateQuote              # Callable — Gemini 프록시 (Auth + 일일 한도 + 차단 키워드)
│       └── sendDailyNotifications     # Scheduler — 매 분, 사용자 설정 시각에 FCM 발송
│
├── android/                   # Capacitor Android 프로젝트
├── public/                    # 앱 아이콘, og-image (Vite 빌드 시 dist/로 복사)
├── docs/                      # 🔒 GitHub Pages 정적 랜딩 페이지 (앱 소개 전용 — PWA 빌드 금지)
├── capacitor.config.ts        # webDir: dist, Google/FCM 설정
├── vite.config.ts             # 빌드 설정 (manualChunks)
├── firestore.rules            # 사용자별 history/usage 접근 규칙
├── storage.rules
└── build-and-install.bat      # Android 빌드 → 설치 → 실행 자동화
```

---

## 🗺 버전 하이라이트

| 버전 | 주요 변경 |
|---|---|
| **1.3.10** | i18n 누락 키 보강 + referral_count 인터폴레이션 버그 수정 |
| 1.3.9 | Cloud Functions Gemini 프록시 + OG 메타태그 + GitHub Pages를 정적 랜딩 페이지로 전환 |
| 1.3.8 | 햅틱 피드백 ON/OFF 설정 |
| 1.3.7 | 서명키 핸드오프 문서 보강 |
| 1.3.6 | 네이티브 앱이 hosting 의존 없이 내장 dist 로드 |
| 1.3.5 | CI에서 Gemini 키를 VITE_GEMINI_API_KEY로 주입 (deprecated, 1.3.9에서 프록시로 대체) |
| 1.3.0 | 인앱 리뷰, 로컬 알림, 리퍼럴 UI, ASO 다국어 |
| 1.2.4 | Android Google 로그인 수정 (Credential Manager) |
| 1.2.0 | 초기 릴리즈 — Google 로그인, Firebase 연동 |

자세한 내역은 [CHANGELOG.md](./CHANGELOG.md) 참고.

---

## 🔒 보안 메모

- Gemini API 키는 **서버 secret 전용** — 클라이언트 번들에 절대 노출 금지
- Firestore 규칙: `users/{uid}` 본인만 R/W
- 일일 한도(10회)는 클라이언트가 아닌 **Firestore 트랜잭션**으로 강제
- 키워드 차단 목록은 클라이언트/서버 양쪽 모두에서 검사 (이중 방어)
- 자세한 보안 검토 노트는 [SECURITY_REVIEW.md](./SECURITY_REVIEW.md)

---

## 📜 개발 지침 / 문서

- [CLAUDE.md](./CLAUDE.md) — 🔒 Claude Code 작업 시 반드시 따라야 할 잠금 정책 (GitHub Pages 용도 등)
- [MOBILE_GUIDELINES.md](./MOBILE_GUIDELINES.md) — 모바일 빌드/디버깅 가이드
- [SIGNING_HANDOFF.md](./SIGNING_HANDOFF.md) — Play Store 서명키 핸드오프
- [AGENTS.md](./AGENTS.md) — 에이전트 작업 규칙 (LOCKED POLICY 포함)
- [ROADMAP.md](./ROADMAP.md) — 현실 로드맵 (2026 KPI + 30개 핵심 이슈, Phase 1~4)
- [CONTINUE_ON_ANOTHER_PC.md](./CONTINUE_ON_ANOTHER_PC.md) — 작업 환경 이전 가이드

---

## © 라이선스

© 2026 Lumina Project. All rights reserved.
