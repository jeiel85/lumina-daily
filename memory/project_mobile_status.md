# Lumina Daily — 프로젝트 현황

> 마지막 업데이트: 2026-04-17

---

## 기술 스택

| 영역 | 내용 |
|------|------|
| 프레임워크 | React 19 + TypeScript 5.8 + Vite 6 |
| 모바일 | Capacitor 8 (Android) |
| 백엔드 | Firebase 12 (Auth, Firestore) |
| AI | Google Gemini 2.5 Flash |
| 번역 | i18next (ko / en / ja / zh) |
| 스타일 | Tailwind CSS 4 + motion/react |
| 테스트 | Vitest + Playwright |

---

## 완료된 작업

### 리팩토링 (2026-04-17)
- App.tsx: 1545줄 → 797줄 (48% 감소)
- 컴포넌트 분리: types/, constants/, components/
- 테스트 셋업: Vitest (7 tests) + Playwright (10 tests)

### APK 빌드
- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk` (8.3MB)
- Release APK: `android/app/build/outputs/apk/release/app-release.apk` (6.6MB)

### 테스트 결과 (총 17 passed)
```
Vitest: 7 passed
Playwright: 10 passed
```

---

## 빌드 명령어

```bash
# 웹 개발
npm run dev

# APK 빌드
.\build-and-install.bat

# 테스트
npm test              # 단위 테스트
npx playwright test  # UI 테스트
```

---

## GitHub

- 브랜치: `refactor/components`
- 릴리즈: v1.0.2-refactor
- URL: https://github.com/jeiel85/lumina-daily