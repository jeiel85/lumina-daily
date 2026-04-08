# Lumina Daily — 프로젝트 현황

> 마지막 업데이트: 2026-04-09

---

## 기술 스택

| 영역 | 내용 |
|------|------|
| 프레임워크 | React + TypeScript + Vite |
| 모바일 | Capacitor (Android) |
| 백엔드 | Firebase (Auth, Firestore) |
| AI | Google Gemini API |
| 번역 | i18next (ko / en / ja / zh) |
| 스타일 | Tailwind CSS + motion/react |

---

## 완료된 작업

### Capacitor 전환
- React Native `mobile/` 폴더 전체 삭제
- Capacitor 기반으로 재구성 (`capacitor.config.ts`)
- `@capacitor/filesystem`, `@capacitor/share`, `@capacitor/browser` 플러그인 적용

### Android 빌드 환경
- `android/local.properties` 생성 — `sdk.dir` 경로 지정
  ```
  sdk.dir=C\:\\Users\\jeiel\\AppData\\Local\\Android\\Sdk
  ```
- APK 빌드 경로: `android/app/build/outputs/apk/debug/app-debug.apk`
- 패키지명: `com.jeiel85.luminadaily`

### UI 개선 (최근)
- **홈 탭 버튼 재배치**: 카드만들기(full-width) + 새로고침/공유하기(2열) 2행 구조로 변경
- **기록 탭 카드**: hover 오버레이 방식 제거 → 이미지 하단에 다운로드/공유/재생성 버튼 항상 노출 (모바일 터치 오버 이슈 해결)
- **설정 탭 구조 재정의**: 5개 그룹으로 재구성

  | 그룹 | 항목 |
  |------|------|
  | 🔔 알림 | 알림 상태 + 알림 시간 |
  | 📖 콘텐츠 | 명언 테마 (단일) + 선호 테마 (다중/알림용) |
  | 🎨 외관 | 비주얼 테마 + 카드 스타일 |
  | 🌐 앱 설정 | 언어 선택 |
  | ☕ 지원 | 커피 후원 버튼 |

### i18n 정리 (최근)
- `common.cancel` / `common.done` 4개 언어 추가 (알림시간 모달 버튼 키 문자열 노출 버그 수정)
- `status_desc` 웹앱 잔재 문구 교체: "브라우저 푸시 알림 상태" → "앱 알림 상태"
- `ja.json` 오타 수정: `通知ステータ스` → `通知ステータス`
- `ja.json` / `zh.json` 누락 키 전체 추가 (history, home, settings, themes, cardStyles, preferredThemes, share)
- 설정 섹션 헤더 키 추가 (`section_notification`, `section_content`, `section_appearance`, `section_app`, `section_support`, `buy_coffee`)

---

## 미해결 이슈: Google 로그인 (Android)

### 증상
- `useCredentialManager: true` (기본값): "No credentials available" — Credential Manager `GetGoogleIdOption` timeout
- `useCredentialManager: false` (레거시): error 10 (DEVELOPER_ERROR) — SHA-1 미매칭

### 현재 키스토어 SHA-1
```
1D:09:7C:59:11:25:22:D5:C4:46:49:4E:5B:F9:73:40:CE:57:F4:7A
```

### google-services.json
- certificate_hash 1: `1d097c59112522d5c446494e5bf97340ce57f47a` ← 현재
- certificate_hash 2: `97255E13C9F64DF7235B3988E7CA339F091B1D92` ← 이전
- web client (type 3): `136746254242-rqqaqpdltemsm1i1orrnp66oholf6qqe`

### 다음 시도 항목
1. `useCredentialManager: false` 재설정 후 재테스트
2. 네이티브 분기 제거 → 웹 `signInWithPopup` 강제 사용 (SHA-1 불필요)
   ```typescript
   return await signInWithPopup(auth, googleProvider);
   ```
3. `signInWithRedirect` + `getRedirectResult` 방식

---

## 빌드 & 배포 명령어

```bash
# 웹 빌드
npm run build

# Capacitor sync
npx cap sync android

# Android 빌드
ANDROID_HOME="/c/Users/jeiel/AppData/Local/Android/Sdk" \
  ./android/gradlew.bat -p ./android assembleDebug

# 설치 + 실행 (USB)
adb -s R3CWC0KB53Z install -r android/app/build/outputs/apk/debug/app-debug.apk
adb -s R3CWC0KB53Z shell am force-stop com.jeiel85.luminadaily
adb -s R3CWC0KB53Z shell am start -n com.jeiel85.luminadaily/.MainActivity

# Wi-Fi 연결
adb connect 192.168.45.149:5555
```

---

## GitHub Issues

| # | 제목 | 상태 |
|---|------|------|
| [#1](https://github.com/jeiel85/lumina-daily/issues/1) | [i18n] 설정 탭 번역 누락 및 웹앱 잔재 문구 정리 | ✅ Closed |
| [#2](https://github.com/jeiel85/lumina-daily/issues/2) | [UI] 설정 탭 섹션 구조 재정의 및 버튼 배치 정리 | ✅ Closed |

---

## Firebase 프로젝트 정보

- 프로젝트 ID: `lumina-762f8`
- Android 앱 패키지: `com.jeiel85.luminadaily`
