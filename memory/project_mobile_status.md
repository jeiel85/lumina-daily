# Lumina Daily — 프로젝트 현황

> 마지막 업데이트: 2026-05-13

---

## 현재 버전

| 항목 | 값 |
|------|-----|
| 버전 | **1.3.10** |
| versionCode | **30** |
| 최신 릴리즈 | v1.3.10 |
| 브랜치 | main |

---

## 기술 스택

| 영역 | 내용 |
|------|------|
| 프레임워크 | React 19 + TypeScript 5.8 + Vite 6 |
| 모바일 | Capacitor 8 (Android) |
| 백엔드 | Firebase 12 (Auth, Firestore, Functions, FCM) |
| AI | Google Gemini 2.5 Flash (Cloud Functions 프록시 경유) |
| 번역 | i18next (ko / en / ja / zh) |
| 스타일 | Tailwind CSS 4 + motion/react |
| 테스트 | Vitest + Playwright |

---

## 현재 Phase

**Phase 1 — 안정화 + AI 비용 통제** (이슈 [#242](https://github.com/jeiel85/lumina-daily/issues/242) ~ [#247](https://github.com/jeiel85/lumina-daily/issues/247))

전체 로드맵은 [ROADMAP.md](../ROADMAP.md) 참고.

---

## 테스트

```bash
npm test              # Vitest (단위)
npx playwright test   # Playwright (E2E UI)
```

---

## 빌드 명령어

```bash
# 웹 개발
npm run dev

# Android APK 빌드
.\build-and-install.bat

# Play Store AAB
npm run build
npx cap sync android
cd android && ./gradlew bundleRelease
```

---

## GitHub

- 저장소: https://github.com/jeiel85/lumina-daily
- 이슈 보드: https://github.com/jeiel85/lumina-daily/issues
- GitHub Pages (앱 소개): https://jeiel85.github.io/lumina-daily/
