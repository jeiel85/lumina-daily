# Lumina Mobile Development Guidelines

이 문서는 Lumina 프로젝트의 모바일 애플리케이션 개발 철학 및 누락 없는 연속성을 위한 지침을 정의합니다.

## 🚨 [CRITICAL] 기능 누락 방지 수칙 (Feature Integrity)

- **기능 보존 원칙**: 모든 코드 수정 및 리팩토링 시, 기존에 구현된 핵심 기능(카테고리, 다국어, 인증 등)이 목록에서 삭제되거나 누락되지 않도록 **철저히 검증**해야 합니다.
- **필수 기능 체크리스트**:
  1. 명언 카테고리 (10종: motivation, comfort, humor, success, business, love, philosophy, wisdom, life, random)
  2. 다국어 지원 (4종: ko, en, ja, zh)
  3. 구글 로그인 및 기록 동기화
  4. 앱 테마 시스템 (Light, Dark, System, Material You) — [#255]
  5. 알림 시간 설정 + 로컬 알림 — [#249]
  6. 햅틱 피드백 ON/OFF
  7. 인앱 리뷰 — [#268]

## 1. 디자인 및 가독성 지침

- **고대비(High Contrast) 보장**: 모든 테마(특히 Dark/Material)에서 버튼 배경과 글자색이 겹쳐 보이지 않도록 대비가 확실한 색상 조합을 사용합니다. (`subText`, `accent` 등의 명시적 구분)
- **UI 일관성**: 헤더, 카드, 버튼 등의 레이아웃은 프로젝트 초기 브랜딩을 계승하며, 사용자 요청이 없는 한 임의로 대폭 변경하지 않습니다.

## 2. UI/UX 레이아웃 지침

- **상단 SafeArea**: 상태바와 겹치지 않도록 안드로이드 기준 `paddingTop: 40` 이상의 SafeArea 처리를 항상 적용합니다.
- **카드 캡처**: 공유 이미지 생성 시 배경 잔상이 남지 않도록 라운딩을 제거한 캡처 모드를 지원합니다.

## 3. 다국어 및 기술 스택

- **i18n**: `TRANSLATIONS` 객체에서 누락된 언어가 발생하지 않도록 정기적으로 점검합니다. (이슈 [#267](https://github.com/jeiel85/lumina-daily/issues/267))
- **Build System**: 아래 빌드 워크플로우를 참고합니다.

## 4. 빌드 워크플로우

### 개발 모드 (웹 — Fast Refresh)
```bash
npm run dev        # Vite dev server → http://localhost:5173
```
- 코드 수정 후 저장하면 즉시 반영 (HMR)
- Capacitor 네이티브 기능(Google 로그인, FCM 등)은 빌드 후 APK에서만 동작

### Android 빌드 (Capacitor)
```bash
npm run build                        # Vite 빌드 → dist/
npx cap sync android                 # dist/ → android assets 복사
cd android && ./gradlew assembleDebug
```
또는 한 번에:
```bat
.\build-and-install.bat
```

### 프로덕션 빌드 (Play Store 출시용)
```bash
npm run build
npx cap sync android
cd android && ./gradlew assembleRelease   # APK
cd android && ./gradlew bundleRelease      # AAB
```

## 5. Firebase 설정 (lumina-762f8)

| 항목 | 값 |
|------|-----|
| Project ID | `lumina-762f8` |
| Android Package | `com.jeiel85.luminadaily` |
| Keystore (debug) | `android/app/debug.keystore` |
| SHA1 (debug) | `97:25:5E:13:C9:F6:4D:F7:23:5B:39:88:E7:CA:33:9F:09:1B:1D:92` |
| SHA1 (release) | `76:D1:EF:4A:8D:99:78:32:7C:F5:2A:6E:DE:F4:B7:A9:26:73:79:E4` |
| SHA1 (upload) | `39:64:39:BF:65:1D:ED:F4:CC:4C:B9:82:58:1A:29:52:CC:AF:1D:9F` |

- Firestore 보안 규칙: 로그인 사용자는 자신의 `users/{uid}/history` 경로만 읽기/쓰기 허용
- 보안 강화: [#245](https://github.com/jeiel85/lumina-daily/issues/245) Firestore 보안 규칙 심화 + Rate Limit
- Google Sign-in: Firebase Console → Authentication → Sign-in method → Google 활성화 필요
- Gemini API 키: Cloud Functions secret(`GEMINI_API_KEY`)으로만 관리 — 클라이언트 번들에 미포함

## 6. Google Sign-in 트러블슈팅

| 에러 코드 | 원인 | 해결 |
|-----------|------|------|
| `[10] DEVELOPER_ERROR` | APK 서명 SHA1이 Firebase에 미등록 | Firebase Console에 SHA1 추가 후 google-services.json 재다운로드 |
| `[7]` | 네트워크 오류 | 인터넷 연결 확인 |
| `[12500]` | Play Services 버전 낮음 | Play Services 업데이트 |
| `[28444]` | Credential Manager 설정 불일치 | Firebase + GCP 양쪽 SHA-1 확인 ([SIGNING_HANDOFF.md](SIGNING_HANDOFF.md) 체크리스트 참고) |

- Capacitor Google Sign-in은 `@capacitor-firebase/authentication` 의 `signInWithGoogle()` 사용
- `capacitor.config.ts`의 `server.androidScheme`은 `https`로 설정 (Google OAuth 요구사항)

## 7. 안정성 모니터링

- **Crashlytics**: [#244](https://github.com/jeiel85/lumina-daily/issues/244) Firebase Crashlytics + Performance 연동
- **에러 바운더리**: [#246](https://github.com/jeiel85/lumina-daily/issues/246) 에러 바운더리 + 자동 재시도
- **실기기 테스트**: [#247](https://github.com/jeiel85/lumina-daily/issues/247) 실기기 라운드 테스트 (저사양 포함)

---

*Last Updated: 2026-05-13 | Phase 1 기준*
