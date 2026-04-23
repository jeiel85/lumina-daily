# 스토어 배포 전 보안 검토 문서

## 진행 상황

### ✅ 완료된 작업

1. **`.env` 파일 정리**
   - 실제 API 키 → 플레이스홀더(`YOUR_XXX_KEY`)로 대체
   - git에 포함되지 않음 (`.gitignore`에 `.env*` 등록済み)

2. **`vite.config.ts` 환경변수 처리**
   - 기존: 빌드 시 `process.env`에 직접 주입 → 번들에 포함 위험
   - 개선: Vite 기본 방식 (`import.meta.env.VITE_*`) 사용으로 변경됨

---

## 🛠️ 남은 작업 (사용자 담당)

### 1. Firebase Console API 키 제한 설정

**위치**: Firebase Console > Project Settings > API Keys

**작업 내용**:
- 각 API Key 선택 → Application restrictions: **HTTP referrers**
- Accept requests from에 허용 도메인 추가:
  - `lumina-762f8.firebaseapp.com`
  - (배포 후 실제 도메인 추가)

### 2. 서비스 계정 키 순환 (필수)

**위치**: Firebase Console > Project Settings > Service Accounts

**작업 내용**:
1. 현재 키가 노출되었으므로 "Generate new private key" 클릭
2. 새 JSON 파일 다운로드
3. `.env`의 `FIREBASE_SERVICE_ACCOUNT_JSON` 값 업데이트
4. 기존 키 삭제

---

## 참고 정보

### 프로젝트 환경변수 구조

| 변수 | 용도 | 클라이언트 노출 |
|------|------|----------------|
| `VITE_GEMINI_API_KEY` | AI 생성 | 가능 (공개용) |
| `VITE_FIREBASE_*` | Firebase 클라이언트 | 가능 (공개용) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | 서버 푸시 알림 | 서버만 사용, 절대로 공개 금지 |

### 빌드 후 확인 명령어

```bash
npm run build
# docs/dist/index.html 에 API 키가 포함되지 않았는지 확인
grep -r "AIzaSy" docs/ || echo "API 키 미발견 - 안전"
```

---

## 다음 세션 진행 사항

1. `.env`에 실제 키 복원 (사용자가 직접 입력)
2. Firebase API 키 제한 설정 완료 확인
3. 빌드 후 번들 내 키 포함 여부 검증