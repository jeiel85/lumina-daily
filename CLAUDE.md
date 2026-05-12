# Lumina Daily — Claude Code 작업 지침

이 파일은 Claude Code가 세션마다 자동으로 읽는 프로젝트 컨벤션 파일이다.
세부 개발 가이드는 [AGENTS.md](AGENTS.md) 참고.

---

## 🔒 LOCKED POLICY — 절대 변경 금지

### GitHub Pages는 "앱 소개 브랜딩 랜딩 페이지" 전용이다

**`https://jeiel85.github.io/lumina-daily/` 는 앱의 웹앱(PWA) 버전이 아니다.**
**`docs/` 폴더는 앱 소개용 정적 랜딩 페이지 자료만 들어간다.**

이 정책은 사용자가 명시적으로 박제 요청한 항목이다 (2026-05-12). 빌드/배포 작업 중 정책이 자꾸 뒤집혀서 못박는다.

#### 금지 사항
- ❌ React 앱 번들(Vite 빌드 산출물)을 `docs/`에 넣는 것
- ❌ `npm run build -- --mode github-pages` 산출물을 `docs/`로 복사/배포하는 CI step
- ❌ `docs/index.html`에 `<script type="module" src="/lumina-daily/assets/index-*.js">` 같은 Vite 번들 reference
- ❌ `docs/`에 PWA 산출물 (`assets/`, `manifest.webmanifest`, `sw.js`, `workbox-*.js`, `registerSW.js` 등)
- ❌ README/문서에 GitHub Pages URL을 "🌐 웹" 또는 "Web App" 으로 표기하는 것 (정확히는 "소개 페이지" / "Landing Page")

#### 허용 사항
- ✅ 정적 HTML/CSS/이미지로 된 앱 소개 페이지 (앱 설명, 기능 소개, 스크린샷)
- ✅ Play Store / 다운로드 링크
- ✅ 개인정보처리방침 (`privacy-policy.html`), `robots.txt`, `sitemap.xml`, OG 이미지
- ✅ 앱 아이콘 같은 브랜딩 자산

#### 원칙
실제 React 앱은 **오직 Android APK/AAB에 번들**된다. 웹에서 앱을 돌릴 일은 없다.

CI에서 Vite 빌드(`dist/`)는 **APK 빌드용으로만** 사용한다 — Capacitor가 `dist/`를 `android/app/src/main/assets/`로 복사하는 용도다. `dist/`를 GitHub Pages로 배포하지 마라.

#### 정책 변경 조건
사용자가 **명시적으로** "github.io에서 웹앱도 서빙하고 싶다"고 말한 경우에만 가능. 그 외엔 어떠한 사유(편의성/캐시 적중률/배포 단순화 등)로도 자동으로 뒤집지 말 것.

---

## 참고

- 개발/빌드/배포 상세: [AGENTS.md](AGENTS.md)
- 변경 이력: [CHANGELOG.md](CHANGELOG.md)
- 서명/릴리즈 핸드오프: [SIGNING_HANDOFF.md](SIGNING_HANDOFF.md)
