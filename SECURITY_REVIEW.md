# 스토어 배포 전 보안 검토 문서

> 마지막 검토: 2026-05-13
> 연계 이슈: Phase 1 — [#242](https://github.com/jeiel85/lumina-daily/issues/242) [#243](https://github.com/jeiel85/lumina-daily/issues/243) [#244](https://github.com/jeiel85/lumina-daily/issues/244) [#245](https://github.com/jeiel85/lumina-daily/issues/245)

---

## ✅ 완료된 작업

### 1. Gemini API 키 서버 이전 (v1.3.9)
- Gemini API 키를 **클라이언트 번들에서 완전히 제거**
- Cloud Functions `generateQuote` Callable이 프록시 역할 (Auth + 한도 + 키워드 필터 검증)
- `GEMINI_API_KEY`는 Cloud Functions secret으로만 관리

### 2. `.env` 파일 Git 제외
- 실제 API 키 → 플레이스홀더(`YOUR_XXX_KEY`)로 대체
- `.gitignore`에 `.env*` 등록 완료

### 3. Firestore 보안 규칙 기본 적용
- `users/{uid}` 본인만 R/W
- 일일 한도(10회)는 Firestore atomic 트랜잭션으로 강제

---

## 🛠️ Phase 1 보안 작업 (진행 중)

| 이슈 | 내용 | 상태 |
|------|------|------|
| [#242](https://github.com/jeiel85/lumina-daily/issues/242) | AI 캐시 풀 모드 (Gemini 비용 99% 절감) | OPEN |
| [#243](https://github.com/jeiel85/lumina-daily/issues/243) | Firebase 비용 임계 알림 | OPEN |
| [#244](https://github.com/jeiel85/lumina-daily/issues/244) | Crashlytics + Performance 연동 | OPEN |
| [#245](https://github.com/jeiel85/lumina-daily/issues/245) | Firestore 보안 규칙 심화 + Rate Limit | OPEN |
| [#246](https://github.com/jeiel85/lumina-daily/issues/246) | 에러 바운더리 + 자동 재시도 | OPEN |
| [#247](https://github.com/jeiel85/lumina-daily/issues/247) | 실기기 라운드 테스트 (저사양 포함) | OPEN |

---

## 🔐 완료된 보안 조치 (Closed Issues)

- [#67](https://github.com/jeiel85/lumina-daily/issues/67): 로컬 저장소 암호화
- [#66](https://github.com/jeiel85/lumina-daily/issues/66): 무차별 대입(Brute-force) 대응성 강화 방안
- [#65](https://github.com/jeiel85/lumina-daily/issues/65): 민감 정보 최소화
- [#64](https://github.com/jeiel85/lumina-daily/issues/64): Firestore 보안 규칙(Rules) 검증 — 기본 규칙 적용 완료
- [#63](https://github.com/jeiel85/lumina-daily/issues/63): API 키 독립적 백엔드 프록시화 — Cloud Functions Gemini 프록시로 해결

---

## 📋 참고 정보

### 프로젝트 환경변수 구조

| 변수 | 용도 | 클라이언트 노출 |
|------|------|----------------|
| `VITE_FIREBASE_*` | Firebase 클라이언트 SDK | 가능 (공개용) |
| `GEMINI_API_KEY` | Cloud Functions secret | ❌ 서버 전용 |

### 빌드 후 확인 명령어

```bash
npm run build
# dist/index.html 에 Gemini API 키가 포함되지 않았는지 확인
rg "AIzaSy" dist/ || echo "OK - 키 미발견"
```
