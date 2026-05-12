# Lumina Daily — 로드맵 (현실 버전)

> **이 파일은 `ROADMAP_100.md`를 대체한다.** 이전 100개 항목은 1인 무예산 환경에서 비현실적이라는 판단으로 폐기됐다.
> 작성: 2026-05-12

---

## 🎯 북극성 KPI

**2026년 12월까지:**

| 지표 | 목표 |
|---|---|
| 누적 설치 | **5,000** (욕심내면 10,000) |
| Play Store 평점 | **4.5 이상** |
| 리뷰 수 | **100건 이상** |
| D7 리텐션 | **15% 이상** |
| Crash-free rate | **99.5% 이상** |
| 월 인프라 비용 | **2만원 이내 유지** |

**"Play Store 카테고리 10위"는 1인 무예산 환경에서 비현실적인 목표라 명시적으로 폐기**한다. 위 KPI를 달성하면 그 자체로 1인 개발 앱 기준 큰 성공이며, 그 다음 단계는 그때 다시 논의한다.

---

## ⚠️ 제약 조건 (현실)

- **개발자**: 1인
- **마케팅 예산**: 0원
- **AI/인프라 예산**: 월 2만원 한도
- **유료 광고(UAC, Meta Ads 등)**: 불가
- **유통 채널**: 인스타/X/카카오톡 자연 공유 + 블로그 + Play Store ASO만

이 제약이 모든 우선순위를 결정한다. **바이럴 메커닉(Phase 3)이 사실상 유일한 유입 채널**이며, **AI 비용 통제(Phase 1)가 실패하면 성공할수록 망한다.**

---

## 📊 마일스톤

| 시점 | 누적 설치 | 평점 | D7 | 비고 |
|---|---|---|---|---|
| Phase 1 종료 (~3주) | 현재 유지 | 4.0+ | 측정 시작 | 크래시 0%, 비용 가시화 |
| Phase 2 종료 (~3개월) | 1,000 | 4.3+ | 10% | 위젯/스트릭 정착 |
| Phase 3 종료 (~5개월) | 3,000 | 4.5+ | 12% | 인스타 공유 확산 |
| **2026년 12월** | **5,000** | **4.5+** | **15%** | 최종 KPI |

---

## 🗂 Phase별 이슈 (총 30개)

### Phase 1 — 안정화 + AI 비용 통제 (3주)

가장 시급. AI 비용 통제 없이는 그 다음 단계가 의미 없다.

| # | 이슈 | 핵심 |
|---|---|---|
| [#27](https://github.com/jeiel85/lumina-daily/issues/27) | Play Console signing key mismatch | 출시 차단 이슈 해결 |
| [#242](https://github.com/jeiel85/lumina-daily/issues/242) | **AI 캐시 풀 모드 (Gemini 비용 99% 절감)** | 🔥 최우선 |
| [#243](https://github.com/jeiel85/lumina-daily/issues/243) | Firebase 비용 임계 알림 | 폭탄 사전 감지 |
| [#244](https://github.com/jeiel85/lumina-daily/issues/244) | Crashlytics + Performance 연동 | 측정 시작 |
| [#245](https://github.com/jeiel85/lumina-daily/issues/245) | Firestore 보안 규칙 + Rate Limit | 어뷰징 방지 |
| [#246](https://github.com/jeiel85/lumina-daily/issues/246) | 에러 바운더리 + 자동 재시도 | 별점 방어 |
| [#247](https://github.com/jeiel85/lumina-daily/issues/247) | 실기기 라운드 테스트 | 저사양 포함 |

### Phase 2 — 리텐션 코어 (5주)

한 번 깐 사람을 매일 들어오게.

| # | 이슈 | 핵심 |
|---|---|---|
| [#248](https://github.com/jeiel85/lumina-daily/issues/248) | 연속 출석 스트릭 | D7 직격 |
| [#249](https://github.com/jeiel85/lumina-daily/issues/249) | 개인화 푸시 시간대 학습 | DAU 핵심 |
| [#250](https://github.com/jeiel85/lumina-daily/issues/250) | 즐겨찾기 + 컬렉션 폴더 | 자기 자료화 |
| [#251](https://github.com/jeiel85/lumina-daily/issues/251) | **안드로이드 홈 위젯** | 🔥 무예산 리텐션 최강 |
| [#252](https://github.com/jeiel85/lumina-daily/issues/252) | TTS 명언 낭독 | 사용 시나리오 확장 |
| [#253](https://github.com/jeiel85/lumina-daily/issues/253) | 데이터 백업/복원 | 헤비 유저 이탈 방지 |
| [#254](https://github.com/jeiel85/lumina-daily/issues/254) | 명상 모드 (BGM + 풀스크린) | 카테고리 확장 |
| [#255](https://github.com/jeiel85/lumina-daily/issues/255) | 다크모드 시간 예약 | 야간 사용 |

### Phase 3 — 바이럴 (5주, 무예산 핵심)

한 명이 두 명을 데려오게. **무예산에서 사실상 유일한 유입 채널.**

| # | 이슈 | 핵심 |
|---|---|---|
| [#256](https://github.com/jeiel85/lumina-daily/issues/256) | **인스타 스토리 9:16 카드** | 🔥 가장 강력 |
| [#257](https://github.com/jeiel85/lumina-daily/issues/257) | 워터마크 + 다운로드 QR | 유통 시 자동 광고 |
| [#258](https://github.com/jeiel85/lumina-daily/issues/258) | 딥링크 공유 | 받은 사람 즉시 진입 |
| [#259](https://github.com/jeiel85/lumina-daily/issues/259) | 트위터/X 친화 포맷 | 텍스트 중심 채널 |
| [#260](https://github.com/jeiel85/lumina-daily/issues/260) | 친구 초대 보상 (테마 해제) | K-factor 0.1+ |
| [#261](https://github.com/jeiel85/lumina-daily/issues/261) | 카카오톡 공유 최적화 | 한국 친구 단위 바이럴 |
| [#262](https://github.com/jeiel85/lumina-daily/issues/262) | 명언 배경화면 저장 | 매일 폰 켤 때 노출 |
| [#263](https://github.com/jeiel85/lumina-daily/issues/263) | SNS 해시태그 자동 복사 | 검색 점유 |
| [#264](https://github.com/jeiel85/lumina-daily/issues/264) | **연말 결산 "나의 명언 1년"** | 🔥 12월 폭발 |

### Phase 4 — ASO & 무예산 홍보 (지속)

광고 못 사면 ASO와 발품으로.

| # | 이슈 | 핵심 |
|---|---|---|
| [#265](https://github.com/jeiel85/lumina-daily/issues/265) | Play 스크린샷 풀 리뉴얼 + 30초 영상 | CTR 직격 |
| [#266](https://github.com/jeiel85/lumina-daily/issues/266) | 키워드 ASO (한/영/일 5개씩) | 검색 노출 |
| [#267](https://github.com/jeiel85/lumina-daily/issues/267) | 다국어 네이티브 품질 점검 | 일본 시장 |
| [#268](https://github.com/jeiel85/lumina-daily/issues/268) | 인앱 리뷰 트리거 정교화 + 부정 별점 우회 | 평점 4.5+ |
| [#269](https://github.com/jeiel85/lumina-daily/issues/269) | 소셜 컨텐츠 직접 운영 (인스타/X/유튜브) | 0원 광고 |
| [#270](https://github.com/jeiel85/lumina-daily/issues/270) | 네이버 블로그 · Reddit 자연 유통 | 검색 SEO |

---

## ❌ 명시적으로 폐기한 항목 (자동 부활 금지)

이전 `ROADMAP_100.md`에서 다음 항목들은 1인 무예산 환경에 안 맞다고 판단해 폐기했다. 자동으로 부활시키지 말 것:

- **유료 채널**: 애플 서치 애즈, 구글 UAC, 인플루언서 비용, 보도자료 PR 에이전시
- **과도한 인프라**: Algolia 검색, 실시간 DB 동시 접속 카운터, Apple Watch 앱, 다이나믹 아일랜드 (iOS는 아예 대상 아님)
- **허영 디자인**: 글래스모피즘, 적응형 배경 그라데이션, 공백의 미학(이슈가 아님), 핀치 줌
- **LOCKED 정책 충돌**: Next.js 랜딩 페이지 별도 구축 (현재 `docs/` 정책 위배)
- **마케팅 운영**: 보도자료 작성, 인플루언서 미팅, 커뮤니티 시딩 — GitHub Issue 아님 (별도 노션/메모 운영)

---

## 🛣 다음 단계 (이 KPI 달성 후)

5K 설치 / 4.5+ / D7 15% 달성하면 그때 다음 옵션 검토:

1. **iOS 출시** (지금은 의도적 미지원)
2. **유료 구독 (Pro 모델)** — 광고 없는 무제한 AI, 프리미엄 테마, 외부 백업 등
3. **유료 광고 소액 테스트** — 월 5만원 UAC로 CAC 측정
4. **인플루언서 단발 협업** — 어워드/매크로보다 명상/자기계발 마이크로 인플루언서

지금은 위 30개에 집중. KPI 달성하기 전엔 이 위의 내용은 잊는다.

---

## 📌 운영 원칙

1. **이슈 수는 30개 이내로 유지한다.** 새 항목이 들어오려면 기존 항목이 닫혀야 한다.
2. **Phase 순서대로 진행한다.** Phase 1 미완 상태로 Phase 3 손대지 않는다. (단 Phase 4 ASO는 Phase 1 종료 후 백그라운드 병행)
3. **AI 비용은 항상 가시화한다.** 매주 1회 Firebase 콘솔 확인.
4. **KPI는 분기마다 솔직히 점검한다.** 빗나가면 목표를 낮추거나 전략을 바꾼다 — "그냥 더 열심히"는 답이 아니다.
