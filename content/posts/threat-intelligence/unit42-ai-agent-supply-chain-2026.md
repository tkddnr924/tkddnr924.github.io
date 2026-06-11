---
title: "AI 에이전트 공급망 위협 — 49,943개 third-party skill 행동 무결성 검증 (Unit 42)"
date: 2026-06-12T02:35:00+09:00
categories: ["Threat Intelligence"]
tags: ["Unit 42", "AI Security", "AI Agent", "Supply Chain", "BIV", "LLM", "OpenClaw", "Prompt Injection", "Credential Theft", "RCE"]
author: "tkddnr924"
summary: "Unit 42가 OpenClaw 레지스트리의 AI 에이전트 third-party skill 49,943개를 행동 무결성 검증(BIV) 기법으로 분석한 결과. 80%가 선언된 능력과 실제 행위가 불일치했고, 18.9%는 명백한 적대적 의도, 81.1%는 개발자 실수에서 비롯됐다. 4종의 다단계 공격 패턴(자격증명 탈취·지시어 하이재킹·RCE 체인·코드 난독화)이 88%를 차지한다."

sources:
  - name: "Unit 42 (Palo Alto Networks — Yuhao Wu, Tony Li, Hongliang Liu)"
    date: "2026.06.11"
    title: "Trust No Skill: Integrity Verification for AI Agent Supply Chains"
    url: "https://unit42.paloaltonetworks.com/ai-agent-supply-chain-risks/"
---

## 개요

AI 에이전트가 외부 도구(third-party skill)를 끌어다 쓰는 시대가 본격화되면서, **skill 자체가 공급망 공격 벡터**로 부상했다. Unit 42(Yuhao Wu, Tony Li, Hongliang Liu)는 **OpenClaw 레지스트리의 49,943개 skill**을 대상으로 **행동 무결성 검증(Behavioral Integrity Verification, BIV)** 방법론을 적용해 다음 핵심 통계를 도출했다.

| 항목 | 수치 |
|---|---|
| 분석 대상 skill | 49,943개 |
| **선언 능력 vs 실제 능력 불일치** | **80.0% (39,933개)** |
| 식별된 행동 편차(deviation) | **250,706건** |
| 그중 **명백한 적대적 의도** | **18.9%** (자격증명 탈취·스파이 행위 집중) |
| 개발자 실수(문서화 오류·미사용 코드 등) | **81.1%** |

핵심 메시지는 단순하다 — **"AI에 도구를 주기 전에 그 도구가 실제로 무엇을 할 수 있는지 검증해야 한다."** 설치 후 모니터링이 아닌 **설치 전 행동 검증**으로 패러다임이 옮겨가야 한다는 권고다.

---

## 위험은 어디에 집중되는가

skill의 카테고리별 적대적 비율을 보면 위험 집중 양상이 뚜렷하다.

| 능력 카테고리 | 적대적 비율 | 해석 |
|---|---|---|
| **Instruction manipulation** (지시어 조작) | **96%** | 거의 모든 사례가 악의적 — 에이전트 의사결정 루프 탈취 |
| **Credentials** (자격증명) | **56%** | 시크릿 읽기·전송 패턴이 주류 |
| **Network access** | **37%** | 외부 송신·은닉 채널 |
| File system / Process execution | 10~12% | 다수가 정당 사용, 일부 RCE 체인 구성 |

지시어 조작과 자격증명 접근 능력은 **존재 자체가 강한 적대 신호**라는 점이 가장 중요한 발견이다.

{{< img src="/images/posts/unit42-ai-agent-supply-chain-2026/02-category-scatter.png" alt="카테고리별 적대 비율 vs 편차 볼륨 산점도" caption="▲ Figure 2 — 카테고리별 적대 비율(y) × 편차 볼륨(x). 다단계 공격이 가능한 카테고리는 빨간 별표 (출처: Unit 42)" >}}

---

## 4종 복합 위협 패턴 — 다단계 공격의 88%

전체 다단계 공격 체인의 **88%가** 다음 네 가지 패턴에서 발견됐다.

| # | 패턴 | 흐름 | 위협 |
|---|---|---|---|
| 1 | **Silent Credential Exfiltration** | 시크릿 읽기 → 외부 전송 | 자격증명 탈취 (조용한) |
| 2 | **Instruction-Override Hijacking** | 에이전트 의사결정 루프 탈취 → 데이터 유출 | 에이전트 행위 자체를 우회 |
| 3 | **Remote Code Execution Chain** | 다운로드 → 파일 작성 → 실행 | 임의 코드 실행 |
| 4 | **Code Obfuscation** | 인코딩 → 동적 평가(eval) | 정적 분석 우회 |

이 4종은 **각각 단일 기법이 아니라 능력 결합**이라는 점이 중요하다. 예를 들어 `네트워크 접근` 자체는 무해할 수 있지만 `시크릿 읽기 + 네트워크 송신`이 결합되면 패턴 ①이 된다.

---

## 편차 250,706건의 근본 원인

{{< img src="/images/posts/unit42-ai-agent-supply-chain-2026/01-deviations-by-root-cause.png" alt="163,754건 분류된 편차의 근본 원인 분포" caption="▲ Figure 1 — 분류된 163,754건의 편차를 근본 원인별로 분해 (출처: Unit 42)" >}}

| 원인 | 비율 | 의미 |
|---|---|---|
| 개발자 실수 | **81.1%** | 문서화 오류, 미사용 코드, 과잉 권한 — *비악의적이지만 공격면을 키움* |
| 적대적 의도 | **18.9%** | 명백한 악성 skill — 자격증명 탈취·스파이가 다수 |

> 81%가 "단순 실수"라는 점이 핵심이다. 악의 없는 개발자의 **과잉 권한 선언과 잔존 데드 코드**가 그 자체로 공급망 위험이며, 공격자는 이를 합법적 skill 안에 숨겨 들어가기 좋은 토양으로 활용한다.

---

## BIV 방법론 — 세 모달리티 교차 검증

BIV는 skill의 세 가지 표현을 모두 분석해 불일치를 찾는다.

| 구성 요소 | 분석 기법 |
|---|---|
| **메타데이터** (YAML 등) | 결정적 파싱 + LLM 기반 추출 |
| **실행 코드** (Python/JS/Shell) | **AST 수준 taint 분석** + 정규식 + 패턴 매칭 |
| **자연어 instructions** | LLM 분석으로 **프롬프트 인젝션·지시어 오버라이드** 모티프 탐지 |

**Capability Taxonomy**: 29개 능력을 **7개 패밀리**로 분류

- Network · File system · Process execution
- Environment · Encoding
- **Credentials** · **Instruction-level threats** ← 핵심 위험 패밀리

---

## 거버넌스 — 3-Tier 처리 모델

레지스트리 전체에 동일 정책을 적용하는 건 비현실적이다. Unit 42는 **위험도 기반 3계층 분리**를 제안한다.

| 등급 | 비율 (개수) | 필요한 조치 |
|---|---|---|
| **Top tier** | **5.0% (2,490개)** | **필수 보안 리뷰** — 다단계 공격 체인 보유 |
| Middle tier | 16.8% | 컨텍스트 리뷰 — 단일 단계 적대적 편차 |
| Remaining | 72.5% | 메타데이터·문서 갱신 |

상위 5%만 집중해도 가장 위험한 케이스를 잡아낼 수 있다는 비용-효과 관점의 설계다.

---

## 권고 — LLM 에이전트 운영 조직을 위해

1. **설치된 third-party skill 전수 인벤토리 확보**
2. **설치 *전* 행동 무결성 검증** 적용 — 사후 모니터링이 아닌 사전 게이트
3. **카테고리별 심각도 티어** 운영:
   - Critical — Credentials, Instruction-level
   - High — Network, Process, Environment
   - Medium — File system, Encoding
4. **고우선 헌팅 패턴 집중**:
   - 자격증명 탈취 체인 (시크릿 읽기 + 송신)
   - 지시어 오버라이드 하이재킹

---

## 한계

BIV가 만능은 아니다. 본 방법론은 **정적 분석**에 의존하므로 다음 영역은 잡지 못한다.

- **동적 dispatch / 난독화된 페이로드** — 런타임 디코드형
- 플래깅된 skill은 **분류 후보**일 뿐 — 런타임 익스플로잇 확정 아님
- LLM 분석을 혼동시키도록 **설명을 calibrate한** 적대자
- **백본 모델 백도어**, retrieval corpus 포이즈닝, 런타임 메모리 공격은 범위 밖

---

## 함께 보면 좋은 자료

- **풀 리서치 페이퍼:** [Behavioral Integrity Verification for AI Agent Skills](https://arxiv.org/abs/2605.11770)
- **보완 연구:** ["Don't Believe Everything You Read": Understanding MCP Behavior Under Misleading Tool Descriptions](https://arxiv.org/abs/2602.03580)

---

## 시사점

이 리포트는 **랜섬웨어·익스플로잇 분석과 결이 다른** 보안 연구다. 공격자가 등장하지 않아도, **에이전트 + 도구 생태계 자체**가 무결성 검증 없이 굴러가면 80%가 이미 적합하지 않은 상태라는 것이다.

조직이 LLM 에이전트에 외부 도구를 연결할 때 던질 질문은 이제 "이 도구가 안전한가?"가 아니라 **"이 도구가 *선언한 만큼만* 실제로 동작하는가?"** 가 돼야 한다.
