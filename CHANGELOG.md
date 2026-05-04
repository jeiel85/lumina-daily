# CHANGELOG

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
- Firebase Android 앱에 debug SHA-256 추가 및 Google Cloud Android API key 제한에 debug/release SHA-1 추가

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
