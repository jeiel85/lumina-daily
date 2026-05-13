# CONTINUE ON ANOTHER PC

> 다른 PC/세션에서 이어서 작업하기 위한 최소 핸드오프 정보.

---

## 현재 상태 (2026-05-13)

| 항목 | 값 |
|------|-----|
| 브랜치 | `main` |
| 버전 | `1.3.10` |
| versionCode | `30` |
| 최신 릴리즈 태그 | `v1.3.10` |

## 시작하기

1. `git clone https://github.com/jeiel85/lumina-daily.git`
2. `cd lumina-daily`
3. `npm ci`
4. `.env` 파일 생성 (AGENTS.md 참고 — Firebase + Gemini 시크릿)
5. `npm run dev`

## Android 빌드 필요 시

- Java 21 (Temurin) + Android SDK 설치 필수
- `npm run build` → `npx cap sync android`
- Debug: `cd android; ./gradlew assembleDebug`
- Release: `cd android; ./gradlew assembleRelease` (키스토어 필요)

## 유의 사항

- GitHub Pages `docs/`는 정적 랜딩 페이지 전용 — Vite 빌드 산출물을 넣지 말 것 (CLAUDE.md LOCKED POLICY 참고)
- `capacitor.config.ts`의 `webDir`은 `dist` — 절대 `docs`로 바꾸지 말 것
- 릴리즈 전 `package.json` 버전과 `android/app/build.gradle`의 `versionName`/`versionCode` 일치 확인
- Phase 1 이슈(#242~#247)가 현재 최우선 (ROADMAP.md 참고)
