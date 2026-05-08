# Lumina Daily Signing Handoff

마지막 업데이트: 2026-05-08 (KST)

## 목적
- 다른 세션/에이전트가 바로 이어서 작업할 수 있도록 서명 상태를 빠르게 공유한다.
- 로컬 빌드와 GitHub CI 빌드가 같은 업로드 키로 서명되는지 기준을 명시한다.

## 현재 업로드 키 지문 (기준값)
- SHA-1: `39:64:39:BF:65:1D:ED:F4:CC:4C:B9:82:58:1A:29:52:CC:AF:1D:9F`
- SHA-256: `94:69:60:11:A3:72:2A:1D:12:A7:5F:2E:C9:FA:C7:AD:94:F5:53:26:3D:18:81:71:B6:98:6E:0E:57:E8:40:C4`

## 검증 결과
- 로컬 빌드 산출물
  - `android/app/build/outputs/apk/release/app-release.apk`
  - `android/app/build/outputs/bundle/release/app-release.aab`
  - 위 두 파일의 서명 지문이 기준값과 일치함.
- GitHub Actions
  - run id: `25530823882` 성공
  - `build-apk` 성공 및 산출물 생성
  - 산출물 APK 서명 지문이 기준값과 일치함.

## 로컬 설정 상태
- 로컬 keystore 파일 위치: `lumina-release.jks` (repo 루트)
- `android/local.properties`에서 release 서명 경로는 다음을 사용:
  - `RELEASE_STORE_FILE=../../lumina-release.jks`
- 주의: `android/local.properties`는 민감정보 포함 가능성이 있어 Git 커밋 금지.

## GitHub Secrets (개념)
- 아래 4개가 반드시 같은 키 세트를 가리켜야 함:
  - `RELEASE_KEYSTORE_BASE64`
  - `RELEASE_STORE_PASSWORD`
  - `RELEASE_KEY_ALIAS`
  - `RELEASE_KEY_PASSWORD`
- 비밀번호/alias 불일치 시 `Cannot recover key` 또는 `Keystore was tampered` 오류 발생.

## Play Console 체크포인트
- App Integrity > Upload key certificate SHA-1 이 아래 값과 같아야 함:
  - `39:64:39:BF:65:1D:ED:F4:CC:4C:B9:82:58:1A:29:52:CC:AF:1D:9F`
- 이 값이 맞으면 로컬/CI 어디서 빌드해도 업데이트 업로드 가능.

## 재검증 명령어
```bash
# 기준 인증서 지문 확인
keytool -printcert -file .temp/lumina_uploadkey_20260507_103408/upload_cert.der

# 로컬 APK 지문 확인
apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk

# 로컬 AAB 지문 확인
keytool -printcert -jarfile android/app/build/outputs/bundle/release/app-release.aab
```
