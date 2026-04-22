# Lumina Daily — 개발/배포 지침

이 파일은 새 세션이 시행착오 없이 작업할 수 있도록 핵심 지식을 담은 가이드입니다.

---

## 프로젝트 구조

```
lumina-daily/
├── src/                  # React 웹앱 소스
├── dist/                 # Vite 빌드 출력 (gitignore) — APK에 번들됨
├── docs/                 # GitHub Pages 랜딩 페이지 (정적 HTML, git 추적)
├── android/              # Capacitor Android 네이티브 프로젝트
├── capacitor.config.ts   # Capacitor 설정
├── vite.config.ts        # Vite 설정
└── .github/workflows/deploy.yml  # CI/CD
```

### 핵심 역할 분리

| 대상 | 소스 | 배포 방법 |
|------|------|-----------|
| `jeiel85.github.io/lumina-daily/` | `docs/` (정적 HTML 랜딩 페이지) | GitHub Pages legacy 모드 — `main` 브랜치 `/docs` 폴더 직접 서빙 |
| Android APK | `dist/` (React 앱 번들) | Capacitor가 `dist/`를 android assets에 복사 |
| GitHub Release | `app-release.apk` + `dist.zip` | 태그 푸시(v*) 시 CI 자동 생성 |

**중요:** GitHub Pages는 React 앱을 서빙하지 않는다. `docs/`의 랜딩 페이지만 서빙한다. React 앱은 오직 APK 안에 번들된다.

---

## 환경 변수

### GitHub Actions Secrets에 등록된 변수

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_FIREBASE_DATABASE_ID
GEMINI_API_KEY

# 릴리즈 APK 서명용
RELEASE_KEYSTORE_BASE64      # release.keystore 파일을 base64 인코딩한 값
RELEASE_STORE_PASSWORD
RELEASE_KEY_ALIAS            # lumina-daily-key
RELEASE_KEY_PASSWORD
```

### 로컬 개발

루트에 `.env` 파일 생성 (`.gitignore`에 포함됨):
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
(나머지 동일)
```

---

## CI/CD 워크플로우 (`.github/workflows/deploy.yml`)

### 트리거

- **`v*` 태그 푸시** → 빌드 + 릴리즈 생성
- **`workflow_dispatch`** → GitHub Actions UI에서 수동 실행
- 일반 `main` 브랜치 푸시는 빌드를 트리거하지 않음

### Job 구조

```
build ──┐
        ├── release  (v{version} 태그로 릴리즈 생성)
build-apk ┘
```

### `build` job
- Node.js **22** 사용 (Capacitor CLI가 Node 22+ 필수)
- lint → test → `npm run build` (base 플래그 없음) → dist.zip 생성
- 버전은 `package.json`의 `version` 필드에서 읽어 `$GITHUB_OUTPUT`에 `version=1.0.4` 형태로 출력

### `build-apk` job
- Node.js 22, Java 21 (Temurin), Android SDK 사용
- `npm run build` → `npx cap sync android` → `./gradlew assembleRelease`
- CI에서 `RELEASE_KEYSTORE_BASE64` 시크릿을 base64 디코딩해 `android/app/release.keystore`로 복원 후 서명
- `gradlew` 실행 전 `chmod +x gradlew` 필수 (CI 환경에서 실행 권한 없음)
- Gradle이 Maven Central에서 의존성 받다가 일시적 403 오류가 날 수 있음 → `gh run rerun <id> --failed`로 재실행하면 대부분 해결됨

### `release` job
- `build`와 `build-apk` 완료 후 실행
- 태그: `v{version}` (예: `v1.0.4`) — `v` 접두사 한 번만 붙음
  - **주의:** version output은 숫자만(`1.0.4`), 릴리즈 step에서 `v${{ version }}` 형태로 `v`를 붙임. 둘 다 `v`를 붙이면 `vv1.0.4` 태그가 생성되는 버그 발생

### GitHub Pages 설정 — 절대 바꾸지 말 것

- Pages 모드: **legacy**, source: `main` 브랜치 `/docs` 폴더
- `actions/configure-pages`나 `actions/deploy-pages`를 workflow에 추가하면 Pages가 Actions 모드로 전환되어 랜딩 페이지 대신 React 앱이 서빙됨 → 추가하지 말 것
- Pages 모드 확인: `gh api repos/jeiel85/lumina-daily/pages | grep build_type`
- legacy 모드 복원: `gh api repos/jeiel85/lumina-daily/pages --method PUT -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/docs'`
- Vite 빌드에 `--base /lumina-daily/` 플래그를 붙이지 말 것 — APK 내부에서 경로가 깨짐

---

## Android 빌드

### Capacitor 설정 (`capacitor.config.ts`)

```ts
webDir: 'dist'   // React 빌드 결과물 — 절대 'docs'로 바꾸지 말 것
                 // 'docs'로 설정하면 APK에서 랜딩 페이지가 열림
server: {
  hostname: 'lumina-762f8.firebaseapp.com',  // Google OAuth 허용 도메인
  androidScheme: 'https'
}
```

### 서명 (`android/app/build.gradle`)

- **debug 빌드**: `android/app/debug.keystore` 고정 사용
  - SHA-1: `97:25:5E:13:C9:F6:4D:F7:23:5B:39:88:E7:CA:33:9F:09:1B:1D:92`
- **release 빌드**: 환경변수(`RELEASE_STORE_FILE` 등)에서 읽음
  - 키스토어 파일: `android/app/release.keystore` (gitignore됨, CI에서 Secret으로 복원)
  - SHA-1: `76:D1:EF:4A:8D:99:78:32:7C:F5:2A:6E:DE:F4:B7:A9:26:73:79:E4`
  - 릴리즈 키스토어 원본은 로컬 PC 및 안전한 곳에 백업 필수 — 분실 시 앱 재등록 필요

### 버전 올릴 때 수정할 파일 두 곳

1. `package.json` → `"version": "x.x.x"`
2. `android/app/build.gradle` → `versionCode N` (정수, 1씩 증가), `versionName "x.x.x"`

---

## 릴리즈 관리

### 버전 올리는 순서

1. `package.json`과 `android/app/build.gradle` 버전 수정
2. 커밋 & `main` 푸시 (빌드 없음)
3. 태그 생성 & 푸시 → CI가 자동으로 빌드 + 릴리즈 생성

```bash
git tag v1.0.5
git push origin v1.0.5
```

4. `gh release edit vX.X.X --notes "..."` 로 릴리즈 노트 직접 작성

### Play Store 출시 관련

- 현재 릴리즈 APK(`assembleRelease`)로 빌드 중 — Play Store 제출 가능
- Play Store는 APK 대신 **AAB(Android App Bundle)** 권장 → 필요 시 `bundleRelease`로 전환
- Play App Signing 활성화 시: 지금 키스토어는 "업로드 키" 역할, 실제 배포는 구글 서버 키로 재서명됨

### 릴리즈 노트 작성 기준

자동 생성된 PR 목록 대신 아래 형식으로 직접 작성:
- 변경 내용을 카테고리별로 (기능/수정/보안/CI 등)
- 설치 방법 포함 (APK 다운로드 → 알 수 없는 앱 허용 → 설치)
- 웹앱 URL 포함

---

## 자주 쓰는 명령어

```bash
# 로컬 개발
npm run dev

# 빌드 및 테스트
npm run build
npm test
npm run lint

# 릴리즈 배포
git tag v1.0.5
git push origin v1.0.5

# CI 확인
gh run list --limit 5 --repo jeiel85/lumina-daily
gh run view <run_id> --log-failed --repo jeiel85/lumina-daily
gh run rerun <run_id> --failed --repo jeiel85/lumina-daily

# 릴리즈
gh release list --repo jeiel85/lumina-daily
gh release edit v1.0.5 --repo jeiel85/lumina-daily --notes "..."

# GitHub Pages 설정 확인
gh api repos/jeiel85/lumina-daily/pages
```
