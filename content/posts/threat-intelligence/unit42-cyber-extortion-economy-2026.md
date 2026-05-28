---
title: "사이버 갈취 경제의 진화 — 암호화 없는 데이터 탈취 동향 분석 (Unit 42)"
date: 2026-05-27T13:00:00+09:00
categories: ["Threat Intelligence"]
tags: ["Cyber Extortion", "Ransomware", "Data Theft", "Vishing", "Supply Chain", "TGR-CRI-1135", "Bling Libra", "BlackFile", "Frontier AI", "SaaS"]
author: "tkddnr924"
summary: "Unit 42가 분석한 2025~2026년 사이버 갈취 동향. 암호화 사용은 78%로 하락하고 데이터 탈취 단독 갈취가 급증했다. TGR-CRI-1135의 공급망 공격, Bling Libra·BlackFile의 비싱 + SaaS 침투, 스와팅·DDoS 등 새로운 압박 기법, Frontier AI 활용 가능성까지 정리한다."
sources:
  - name: "Unit 42 (Palo Alto Networks)"
    date: "2026.05.27"
    title: "Out of the Crypt: The Evolving Cyber Extortion Economy"
    url: "https://unit42.paloaltonetworks.com/cyber-extortion-economy/"
---

## 개요

**Unit 42**(Palo Alto Networks)가 2025년부터 2026년 초까지 관찰된 사이버 갈취(extortion) 생태계 변화를 분석한 리포트를 공개했다. 핵심 메시지는 명확하다 — **암호화는 더 이상 갈취의 필수 조건이 아니다**. 공격자는 데이터 탈취만으로도 충분한 협상 지렛대를 확보할 수 있다는 점을 학습했고, 그에 맞춰 운영 방식·표적·압박 기법이 재편되고 있다.

---

## 핵심 변화 — 암호화는 더 이상 필수가 아니다

| 지표 | 변화 |
|---|---|
| 갈취 사건 중 **암호화 사용 비율** | 2021~2024년 **90%+** → **2025년 78%로** 하락 |
| 전체 침해 사건 대비 **데이터 탈취·갈취** | 2020년 약 **2%** → 2025년 **15%** (Google 자료) |
| **갈취 단독**(암호화 없음) 비율 | 2025 상반기 **49%** → 하반기 **65%** (Resilience 자료) |
| 데이터 탈취형 갈취의 **평균 피해 금액** | **$5.08M**, 미국 광역 침해 시 $10M 초과 |
| 초기 접근 → 데이터 유출까지 **최단 관측 시간** | **39초** |

암호화가 줄어드는 배경에는 네 가지 흐름이 있다.

1. **백업·복구 체계 성숙** — 신속한 재이미징으로 운영 중단 압박이 약해짐
2. **엔드포인트 보안과 자동 차단의 진화** — 암호화 단계 도달 자체가 어려워짐
3. **고속 유출 능력 확보** — 짧은 체류 시간에 유출 완료
4. **규제가 만든 새로운 지렛대** — SEC **4일 공시**, GDPR **72시간 보고** 등 공시 의무가 협상 시계를 압박

---

## 표적 변화 — 중견 기업과 신흥 핫스폿

- **데이터 탈취 단독 캠페인 피해의 64%가** **중견 기업**(mid-sized)
- 주요 산업: **전문 서비스, 의료, 소비자 서비스**가 1순위, **제조업**은 가장 큰 운영 차질
- **건설업 +44% YoY** — 데이터 탈취 갈취의 새로운 핫스폿으로 부상

---

## 주요 위협 행위자

### 1. TGR-CRI-1135 — 공급망 침투 기반 갈취 (a.k.a. TeamPCP)

2025년 말부터 활동을 시작한 그룹으로, **20건 이상의 별개 공급망 침해**를 수행했고 **500종 이상의 소프트웨어**에 악성 코드를 주입했다. 클라우드 액세스 토큰·SSH 키·Kubernetes 시크릿을 탈취해 **데이터 유출 단독** 형태로 갈취한다.

협업 파트너십:
- **LAPSUS$ Group** — EaaS(Extortion-as-a-Service) 형태로 LAPSUS$의 데이터 유출 사이트를 빌려 피해자 압박
- **Vect** RaaS 운영자 — 랜섬웨어 배포 파이프라인 공유

{{< img src="/images/posts/unit42-cyber-extortion-economy-2026/01-lapsus-dls.png" alt="LAPSUS$ 데이터 유출 사이트 게시물" caption="▲ Figure 1 — LAPSUS$ 데이터 유출 사이트의 피해자 게시(2026.05.21). TGR-CRI-1135와의 EaaS 협업 (출처: Dark Web Informer / Unit 42)" >}}

{{< img src="/images/posts/unit42-cyber-extortion-economy-2026/02-hasanbroker-vect.png" alt="HasanBroker의 BreachForums 게시물" caption="▲ Figure 2 — HasanBroker가 BreachForums에 게시한 Vect·TGR-CRI-1135 협업 글(2026.03.25) (출처: Unit 42)" >}}

#### Shai-Hulud — 오픈소스 공급망 공격 도구 공개

2026년 5월 13일, TGR-CRI-1135는 BreachForums에 **Shai-Hulud** 도구를 오픈소스로 공개했다. 다른 행위자가 동일 도구로 모방 공격을 수행할 수 있어 **귀속(attribution)을 의도적으로 흐리는** 효과를 노린 것으로 분석된다. 또한 그룹은 **AI 환경**(MLOps/모델 저장소 등)을 적극 표적화하고 있다.

{{< img src="/images/posts/unit42-cyber-extortion-economy-2026/03-shai-hulud.png" alt="Shai-Hulud 도구 공개 게시물" caption="▲ Figure 3 — TGR-CRI-1135가 BreachForums에 공개한 Shai-Hulud 도구 게시물 (출처: Unit 42)" >}}

{{< img src="/images/posts/unit42-cyber-extortion-economy-2026/04-vect-banned.png" alt="Vect 운영자 포럼 차단" caption="▲ Figure 4 — Vect 운영자의 BreachForums 차단 표시(2026.05.21). TGR-CRI-1135 협업에 영향 가능성 (출처: Unit 42)" >}}

---

### 2. Bling Libra (a.k.a. ShinyHunters) — 비싱 기반 SaaS 침투

SaaS 테넌트를 직접 침투해 데이터를 탈취하고 갈취하는 그룹. 최근 사이버범죄 연합체 **Scattered LAPSUS$ Hunters와 거리 두기**를 선언하는 텔레그램 메시지가 확인됐다.

**기법 요약:**
- **비싱**(보이스 피싱)으로 피해자를 피싱 사이트로 유도 → 자격증명·MFA 코드 가로채기
- 캡처한 자격으로 **본인 디바이스를 등록**해 지속성 확보
- **Tor 기반 데이터 유출 사이트** 운영, **Tox ID**로 피해자와 직접 협상
- **이중 압박:** DDoS 공격 + 언론에 데이터 일부 공개

{{< img src="/images/posts/unit42-cyber-extortion-economy-2026/05-bling-libra-telegram.png" alt="Bling Libra 텔레그램 메시지" caption="▲ Figure 5 — Bling Libra가 Scattered LAPSUS$ Hunters와 결별을 선언한 텔레그램 메시지 (출처: Unit 42)" >}}

---

### 3. CL-CRI-1116 (BlackFile → Redact) — 비싱 + 스와팅

Bling Libra와 유사한 비싱·SaaS 침투 플레이북을 운영하나, 운영 디테일에서 차별점이 있다.

| 항목 | 차이점 |
|---|---|
| Tox ID 운영 | **피해자마다 다른 Tox ID 사용**(Bling Libra는 단일 Tox ID) |
| 피싱 인프라 | Bling Libra와 **다른 등록기관** 사용 |
| 이중 압박 기법 | **직원 스와팅(swatting)** — 가짜 응급 신고로 경찰 특공대 출동 유도 |
| 최근 동향 | 기존 사이트 폐쇄 → **"Redact"** 이름으로 리브랜딩 (2026.05.11~19) |

{{< img src="/images/posts/unit42-cyber-extortion-economy-2026/06-blackfile-dls.png" alt="BlackFile 데이터 유출 사이트" caption="▲ Figure 6 — BlackFile 데이터 유출 사이트의 게시(2026.05.11) (출처: Unit 42)" >}}

{{< img src="/images/posts/unit42-cyber-extortion-economy-2026/07-redact-dls.png" alt="Redact 새 데이터 유출 사이트" caption="▲ Figure 7 — 리브랜딩 후 신설된 Redact 데이터 유출 사이트 (출처: Unit 42)" >}}

> **스와팅의 의미** — 사이버 갈취가 **물리 보안 영역까지 침범**한 첫 사례 중 하나다. 보안팀과 임원 경호팀(executive protection)의 **사전 조율**이 새로운 필수 과제로 등장했다.

---

### 4. Hazy Scorpius (CLOP) — 취약점 악용형

Oracle E-Business Suite 취약점을 적극 악용하며, **데이터 탈취 + 암호화** 혼합형 갈취를 유지하는 전통적 그룹.

---

## Frontier AI 통합 — 임박한 시계 압축

Unit 42는 **Frontier AI 모델 "Mythos"가** 1,000개 오픈소스 프로젝트에서 **23,000건의 잠재 취약점**을 식별할 수 있음을 확인했다. AI 보조 시나리오에서는 **초기 접근부터 데이터 유출까지 25분**으로 단축된다.

**위협 행위자의 AI 무기화까지 남은 기간: 3~5개월** (Unit 42 추정).

| 영역 | AI 결합 시나리오 |
|---|---|
| 공급망 | TGR-CRI-1135가 이미 AI 환경 표적화 → CI/CD 파이프라인 복잡도↑ (예: SymJack 시연) |
| 비싱 | **ATHR** 같은 콜센터 자동화 AI로 진입 장벽↓·속도↑ |
| 취약점 발견 | 자동화된 대규모 자산 스캔 + 익스플로잇 합성 |

---

## 방어 권고

### 데이터 유출 탐지·차단
- 클라우드·엔드포인트·네트워크 egress 지점에 **DLP 통합 배치**
- 비정상 egress **볼륨·속도 베이스라인** 수립 및 경보
- 데이터 **스테이징 행위** 감시

### SaaS 보안 상태 관리(SSPM)
- OAuth 토큰·서드파티 통합·API 권한 정기 감사
- 디바이스 컴플라이언스·위치·위험점수 기반 **조건부 접근** 강제
- SaaS 감사 로그 집계 + 이상행위 탐지

### 신원·비싱 회복력
- OTP 기반 MFA → **FIDO2/WebAuthn** 등 피싱 저항형 인증으로 전환
- 헬프데스크 신원 검증 절차를 **사회공학 내성** 구조로 재설계
- **비싱 시뮬레이션** 정기 수행

### 공급망 무결성
- CI/CD에 **SCA + 의존성 핀닝**
- CI/CD 시크릿 **로테이션·볼팅**
- 패키지 레지스트리 모니터링(타이포스쿼팅·무단 업데이트)
- 코드 서명·**프로비넌스(provenance) 검증** 강제

### AI 가속 위협 대비
- 탐지·대응을 **압축된 시간선**으로 압박 테스트
- 인터넷 노출·AI로 발견 가능한 자산 우선 패치
- **음성 인증·통화 검증** 도구 도입

---

## 주요 수치 요약

| 항목 | 수치 |
|---|---|
| 갈취 사건의 암호화 사용률 (2025) | 78% (이전 90%+) |
| 데이터 탈취·갈취 비율 (2025) | 15% (2020 약 2%) |
| 갈취 단독 비율 (2025 하반기) | 65% (상반기 49%) |
| 중견기업 피해 비중 | 64% |
| 건설업 YoY 증가율 | +44% |
| 평균 피해액 (데이터 탈취형) | $5.08M |
| 최단 초기접근→유출 시간 | 39초 |
| TGR-CRI-1135 공급망 공격 수 | 20+ 건 / 500+ 소프트웨어 |
| Mythos가 식별한 잠재 취약점 | 23,000건 / 1,000 프로젝트 |
| AI 보조 시 초기접근→유출 시간 | 25분 |
| Frontier AI 무기화까지 추정 기간 | 3~5개월 |
