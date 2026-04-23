# ✨ Lumina Daily: Your Daily Dose of Wisdom

> **"Lumina: 당신의 하루를 채우는 지혜 한 조각"**

Lumina는 AI-powered 명언 및 성찰 앱입니다. Google Gemini로 맞춤형 명언을 생성하고, beautiful한 이미지 카드로 공유할 수 있습니다. 웹과 Android 모두 지원합니다.

---

## 🌟 주요 특징 (Key Features)

### 📱 모바일 앱 (Capacitor Hybrid)
- **Capacitor 기반**: React + Vite로 native Android로 변환
- **오프라인 번들링**: 네트워크 환경과 관계없이 안정적 실행
- **프리미엄 UI/UX**: 웹 버전의 감성을 모바일에서
- **맞춤형 빌드 자동화**: `build-and-install.bat`

### 🧠 AI-Powered 명언 생성
- Google Gemini 2.5 Flash로 맞춤형 명언 생성
- 10개 테마: motivation, comfort, humor, success, business, love, philosophy, wisdom, life
- 각 명언에 대한 AI 해설 제공

### 🌍 4개 국어 지원
- 한국어, English, 日本語, 中文

### 🎨 다크 모드
- Light / Dark / System / Material You 테마

---

## 🛠 기술 스택 (Tech Stack)

### Frontend & Mobile
![React](https://img.shields.io/badge/react-19-%2320232a?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/typescript-5.8-%23007ACC?style=flat)
![Vite](https://img.shields.io/badge/vite-6-%23646CFF?style=flat)
![Capacitor](https://img.shields.io/badge/capacitor-8-%23646CFF?style=flat)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4-%2338B2AC?style=flat)
![Playwright](https://img.shields.io/badge/playwright-%23e34f26?style=flat)

### Backend & Infrastructure
![Firebase](https://img.shields.io/badge/firebase-12-%23FFCA2D?style=flat)
![Google Gemini](https://img.shields.io/badge/Gemini-2.5-8E75B2?style=flat)
![Firebase Functions](https://img.shields.io/badge/Functions-Node_22-%2300B562?style=flat)

---

## 🧪 테스트 (Testing)

```bash
# 단위 테스트 (Vitest - 7 tests)
npm test

# UI 테스트 (Playwright - 10 tests)
npx playwright test
```

**테스트 결과:**
- Vitest: 7 passed ✅
- Playwright: 10 passed ✅
- **총계: 17 passed** ✅

---

## 🚀 시작하기 (Getting Started)

### 개발
```bash
npm install
npm run dev
```

### APK 빌드 (Android)
```batch
.\build-and-install.bat
```

APK 위치: `android\app\build\outputs\apk\debug\app-debug.apk`

---

## 📂 프로젝트 구조

```
src/
├── App.tsx              # 메인 앱 (797줄, 리팩토링 완료)
├── components/          # 분리된 컴포넌트
│   ├── QuoteCard.tsx
│   ├── Header.tsx
│   ├── HistoryItem.tsx
│   └── ErrorBoundary.tsx
├── constants/           # 테마, 설정 등
├── types/               # TypeScript 타입 정의
├── i18n/               # 다국어 지원
└── e2e/                # Playwright 테스트

android/                # Capacitor Android 프로젝트
functions/              # Firebase Functions (Node 22)
```

---

## 📜 개발 지침

자세한 내용은 [MOBILE_GUIDELINES.md](./MOBILE_GUIDELINES.md)를 참고하세요.

---

## © 라이선스

© 2026 Lumina Project. All rights reserved.