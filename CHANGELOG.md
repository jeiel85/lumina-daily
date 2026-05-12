# CHANGELOG

## v1.3.10 - 2026-05-12
### 🐛 버그 수정 (Fix)
- 다국어(i18n) 누락 키 보강 — 일부 화면에서 키가 그대로 노출되던 문제 수정
- `referral_count`에 `{{count}}` 인터폴레이션 적용 (친구 초대 카운트 표시 정상화)

### 📦 설정
- 버전 범프: 1.3.9 → 1.3.10
- Android versionCode: 29 → 30
- Play Store 업데이트용 통합 빌드 (1.3.0 이후 누적 변경 포함)

## v1.3.3 - 2026-05-06
### 🎨 개선 (Improvement)
- 앱 로딩 화면 텍스트 가운데 정렬 적용 (왼쪽 치우침 수정)
- 다크 테마 로딩 화면 텍스트 대비 개선 (가독성 향상)

### 📦 설정
- 버전 범프: 1.3.2 → 1.3.3
- Android versionCode: 22 → 23

## v1.3.2 - 2026-05-06
### 📦 설정
- 버전 범프: 1.3.1 → 1.3.2
- Android versionCode: 21 → 22

## v1.3.1 - 2026-05-06
### 📦 설정
- 버전 범프: 1.3.0 → 1.3.1
- Android versionCode: 20 → 21

## v1.3.0 - 2026-05-06
### 🎨 개선 (Improvement)
- 다크모드 배경색 밝게 조정 (neutral-950→900, 900→800)
- 다크모드 텍스트 대비 개선 (neutral-400→300, 300→200)
- QuoteCard, Header, HistoryItem 컴포넌트 다크모드 색상 수정

### ✨ 신규 기능 (Features)
- **인앱 리뷰(#70)**: 3회 이상 명언 저장/공유 시 리뷰 유도 (@capacitor-community/in-app-review)
- **로컬 알림(#58)**: 설정한 시간에 매일 알림 발송 (@capacitor/local-notifications)
- **초대/공유 리워드(#71)**: 사용자별 리퍼럴 코드 생성 및 표시 UI 추가

### 🌐 웹 최적화 (ASO)
- 앱 스토어 다국어 설명 추가 (docs/app-store-descriptions.md)
- 메타 태그 및 키워드 최적화 (docs/index.html)
- robots.txt 및 sitemap.xml 추가

### 🔧 리팩토링
- TypeScript 린트 에러 수정 (THEME_SEED_TOOLS 오타, LocalNotifications API)

### 📦 설정
- 버전 범프: 1.2.9 → 1.3.0
- Android versionCode: 19 → 20

## v1.2.9 - 2026-05-04
### Changed
- version bump
- AAB build support for Play Store

## v1.2.7 - 2026-05-04
### Changed
- version bump
- AAB build support for Play Store

## v1.2.6 - 2026-05-04
### Added
- daily API usage limit added

## v1.2.5 - 2026-05-04
### Changed
- AAB build configuration for Play Store

## v1.2.4 - 2026-05-03
### Fixed
- Android Google 로그인 실패 수정
- Firebase 환경 변수가 placeholder 값일 때 잘못된 Auth 설정으로 빌드되는 문제 방지
- APK 내부 WebView에서 Firebase Web Messaging SDK 초기화하지 않도록 조정 (unsupported-browser 오류 제거)
- Firebase Android 앱에 debug SHA-256 추가 및 Google Cloud Android API key 생성 시 debug/release SHA-1 추가

## v1.2.3 - 2026-04-25
### Fixed
- credential manager fix for Google Sign-In

## v1.2.2 - 2026-04-25
### Changed
- version bump

## v1.2.1 - 2026-04-25
### Changed
- version bump

## v1.2.0 - 2026-04-24
### Added
- initial release with Google login, Firebase integration
