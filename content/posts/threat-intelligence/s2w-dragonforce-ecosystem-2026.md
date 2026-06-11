---
title: "DragonForce 랜섬웨어 생태계·운영 분석 — RaaS 카르텔 (S2W TALON)"
date: 2026-05-28T16:21:39+09:00
categories: ["Threat Intelligence"]
tags: ["DragonForce", "Ransomware", "RaaS", "LockBit", "Cartel", "BYOVD", "ChaCha8", "ESXi", "RansomBay"]
author: "tkddnr924"
summary: "S2W TALON이 분석한 DragonForce 랜섬웨어 생태계와 운영. 2023년 12월부터 363개 기업을 공격한 RaaS '카르텔', LockBit 3.0·Conti 기반 빌더, ChaCha8 설정 복호화·BYOVD 프로세스 종료, Windows·Linux(ESXi/NAS/RHEL) 페이로드 구조 변화, 제휴 패널 침투 분석까지 정리한다."
sources:
  - name: "S2W TALON (Byeongyeol An, Gahyun Choi)"
    date: "2026.02.12"
    title: "Inside the Ecosystem & Operations: DragonForce"
    url: "https://medium.com/s2wblog/inside-the-ecosystem-operations-dragonforce-11048db4cbb0"
---

## 개요

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/00-cover.png" alt="DragonForce 분석 커버" caption="▲ Inside the Ecosystem & Operations: DragonForce — S2W TALON (이미지 생성: Google Gemini Nano Banana)" >}}

S2W TALON이 2023년 12월부터 활동 중인 랜섬웨어 그룹 **DragonForce**의 생태계와 운영을 종합 분석한 리포트를 공개했다. DragonForce는 **RaaS(Ransomware-as-a-Service)** 모델 위에서 스스로를 "**카르텔**"로 포지셔닝하며 영향력을 확장해 왔고, **2023년 12월부터 2026년 1월까지 363개 기업**을 공격 대상에 올렸다. 2025년부터 활동이 가파르게 증가해 **2025년 12월에는 단일 월 최다인 35개 피해 기업**을 공개했다.

핵심 관전 포인트는 세 가지다.
1. 단순 랜섬웨어 운영을 넘어선 **카르텔 전략** — 타 그룹 공격과 공개 협력 병행
2. **LockBit 3.0(Black) + Conti** 유출 코드 기반의 자체 빌더(2026.01 시점 LockBit 3.0 기반 빌더는 더 이상 제공되지 않음)
3. 제휴 패널 침투를 통해 확인된 **운영 인프라의 지속적 발전**

---

## 위협 행위자 프로파일

| 항목 | 내용 |
|---|---|
| 그룹명 | DragonForce |
| 활동 시작 | 2023년 12월 13일 (`@dragonforce` 계정의 BreachForums 첫 게시) |
| 모델 | RaaS — 자체 카르텔 브랜딩 |
| 빌더 기반 | 유출된 **LockBit 3.0 (Black)** + **Conti** 소스 코드 |
| 주요 다크웹 거점 | BreachForums, RAMP, Exploit |
| 연관 그룹 | BlackLock, RansomHub, Scattered Spider, DEVMAN, LockBit |
| 공개 협력 시도 | Qilin, LockBit |
| 자체 서비스 | DragonForce Ransomware Cartel · **RansomBay** · Harassment Calling · Data Analysis |
| 피해 통계 (~2026.01) | **누적 363개사** / 단월 최다 35개사 (2025.12) |

---

## 활동 기원과 피해 통계

DragonForce는 2023년 12월 13일 BreachForums에 `@dragonforce` 계정이 탈취 데이터를 업로드하면서 처음 등장했다. 자체 데이터 유출 사이트(DLS)에는 **2023년 12월 6일** 첫 피해자가 게시됐고, 2023년 12월에만 22개사가 공개됐다.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/01-breachforums.png" alt="@dragonforce의 BreachForums 첫 게시물" caption="▲ Figure 1 — BreachForums에 업로드된 @dragonforce 게시물 (출처: S2W TALON)" >}}

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/02-dls.png" alt="DragonForce 데이터 유출 사이트" caption="▲ Figure 2 — DragonForce 데이터 유출 사이트(DLS) (출처: S2W TALON)" >}}

이후 매월 피해자 공개를 정기화했고, 2025년부터 활동이 본격적으로 증가해 **2025년 12월 단일 월 35개사** 공개로 최고치를 찍었다. 누적은 2026년 1월 기준 **363개사**.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/03-monthly-trends.png" alt="DragonForce 월별 공격 추이" caption="▲ Figure 3 — DragonForce의 월별 공격 추이 (출처: S2W TALON)" >}}

---

## 그룹 운영 — 다크웹 거점과 차별화

DragonForce는 다크웹 포럼(BreachForums, RAMP, Exploit)에서 **제휴(affiliate)와 펜테스터를 동시에 모집**하며, 일반적인 랜섬웨어 그룹과의 **차별화**를 강조했다. 단순 페이로드 외에 별도로 운영하는 서비스가 있다.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/04-operator-activity.png" alt="DragonForce 운영자 활동 목록" caption="▲ Table 1 — DragonForce 운영자 활동 목록 (출처: S2W TALON)" >}}

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/05-services.png" alt="DragonForce 전문화 서비스 목록" caption="▲ Table 2 — DragonForce 전문화 서비스 (RansomBay, Harassment Calling, Data Analysis 등) (출처: S2W TALON)" >}}

### DDW 생태계 — 적대 vs 연계

DDW(다크/딥웹) 포럼 활동을 분석한 결과, DragonForce는 타 랜섬웨어 그룹에 대해 **두 가지 상반된 접근**을 동시에 구사했다.

- **적대(Adversarial)** — 인프라 수준의 공격을 통한 압박
- **연계(Associated)** — 소스 코드·바이너리·랜섬노트의 유사성을 통한 협업/계승 관계

여기에 **Qilin·LockBit**과는 공개적인 협력을 시도하기도 했다. 이는 단일 그룹의 행보가 아닌 **카르텔식 영향력 확장 전략**의 일환으로 해석된다.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/06-related-groups.png" alt="DragonForce 적대/연계 그룹" caption="▲ Table 3 — DragonForce와 적대/연계 관계에 있는 그룹들 (출처: S2W TALON)" >}}

---

## 제휴 패널(Affiliate Panel) 침투 분석

S2W TALON은 DragonForce의 **제휴 패널에 직접 접근**해 내부 구조를 분석했다. 패널은 **8개의 서브페이지**로 구성되어 있고, 피해자 추적·빌드 생성에 더해 외부 제휴에 접근 권한을 부여하는 기능까지 포함한다.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/07-affiliate-panel.png" alt="DragonForce 제휴 패널 화면" caption="▲ Figure 4 — DragonForce 제휴 패널 화면 (출처: S2W TALON)" >}}

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/08-panel-pages.png" alt="제휴 패널 페이지별 기능" caption="▲ Table 4 — DragonForce 제휴 패널 페이지별 기능 (출처: S2W TALON)" >}}

### Group-IB 2024년 분석 대비 변화

Group-IB가 2024년 12월에 공개한 분석과 비교했을 때 주목할 변화 두 가지:

| 변화 | 내용 |
|---|---|
| **BYOVD 드라이버 선택 UI 제거** | 패널에서는 사라졌으나 **빌드된 바이너리에는 그대로 통합**되어 기본 동작으로 유지됨 |
| **LockBit 기반 빌더 제거** | 2026.01 시점에서 LockBit 3.0 기반 빌더는 더 이상 제공되지 않음 |
| **확장자 기반 암호화 모드 베타 도입** | 파일 확장자별로 암호화 모드(전체/부분/헤더)를 지정하는 신규 옵션 추가 |

즉, **UI는 단순화됐지만 핵심 악성 기능은 유지·발전**됐다는 점이 이번 분석의 핵심이다.

---

## 바이너리 분석 — Windows 버전

2025년 12월 분석 시점의 DragonForce와 비교했을 때, 빌더로 생성된 신규 샘플은 **암호화 루틴과 BYOVD 기반 프로세스 종료라는 핵심 기능은 동일**하게 유지했다. 다만 **메타데이터·설정(config) 레이아웃에 구조적 변화**가 있다.

### Default Build Option

운영자는 빌드 시 **암호화 범위**(All / Local / Network / Paths)와 **제외 목록**을 선택한다. 패널이 제공하는 기본값은 다음 이미지에 정리되어 있다.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/09-windows-build-options.png" alt="Windows 빌드 기본 옵션" caption="▲ Table 5 — Windows 버전 빌드 기본 옵션 (출처: S2W TALON)" >}}

### Config — ChaCha8 복호화와 `encryption_rules`

설정(config) 구조는 이전 버전과 동일하나 **`encryption_rules` 필드가 새로 추가**됐다. 실행 시 임베디드 config는 **ChaCha8** 알고리즘으로 복호화되며, 복호화 루틴 자체는 변경되지 않았다.

베타 빌드에서 신설된 `encryption_rules`는 **파일 확장자별 암호화 모드 오버라이드**를 정의한다.

| 시나리오 | 동작 |
|---|---|
| 확장자 오버라이드 **미설정** | 파일 크기에 따라 **full / partial / header** 자동 선택 |
| 확장자 오버라이드 **설정** | 해당 확장자에는 파일 크기와 무관하게 지정된 모드 적용 |

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/10-extension-encryption.png" alt="확장자 기반 암호화 모드 오버라이드 빌더 UI" caption="▲ Figure 5 — 빌더의 확장자 기반 암호화 모드 오버라이드 기능 (출처: S2W TALON)" >}}

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/11-config-details.png" alt="DragonForce config 상세" caption="▲ Table 6 — DragonForce config 상세 (출처: S2W TALON)" >}}

### Metadata — 537바이트로 확장

암호화된 파일에 부착되는 메타데이터에서 **Encryption Ratio 필드가 1바이트 → 4바이트로 확장**되었다. 그 결과 부착 메타데이터의 총 크기는 **534바이트 → 537바이트**(+3바이트)로 늘었다.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/12-metadata-structure.png" alt="변경된 메타데이터 구조" caption="▲ Figure 6 — 업데이트된 메타데이터 구조 (출처: S2W TALON)" >}}

이 작은 변화는 **샘플 식별 시그니처**로도 활용 가능하다 — `Encryption Ratio` 필드 길이만으로 신·구 빌드를 구분할 수 있다.

---

## 바이너리 분석 — Linux 버전 (ESXi · NAS · RHEL)

Linux 버전 3종(ESXi, NAS, RHEL)은 **기능적으로 동일**하며, 설정 복호화와 암호화 알고리즘은 Windows 버전과 같다. 다만 **ESXi 버전만** 다음 두 가지를 추가로 수행한다.

- 가상 머신 **셧다운 처리**
- **ESXi 환경 및 사용자 정보 수집**

### 실행 흐름

| 단계 | 동작 |
|---|---|
| ① | 커맨드라인 인자 파싱 |
| ② | `-d` 옵션 시 **백그라운드 데몬**으로 실행 |
| ③ | 로깅, 지연 실행, 시스템 정보 수집 |
| ④ | 파일 암호화 수행 |
| ⑤ | 파일명 **인코딩** 처리 |
| ⑥ | **MOTD** 파일 변경 (랜섬 노트 노출) |

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/13-linux-flow.png" alt="DragonForce Linux 버전 실행 흐름" caption="▲ Figure 7 — DragonForce 랜섬웨어 Linux 버전의 실행 흐름 (출처: S2W TALON)" >}}

### Default Build Option

Linux 빌더도 Windows와 동일한 방식으로 **암호화 모드와 제외 목록**을 사용자 정의한다. 확장자 기반 오버라이드 기능 (Extension for overridden mode / Pick locker mode for this extension) 미설정 시 **빌드 시점의 기본 모드**(full / partial / header)로 암호화하고, 설정 시 해당 확장자에 지정된 모드를 우선 적용한다.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/14-linux-build-options.png" alt="Linux 빌드 기본 옵션" caption="▲ Table 7 — Linux 버전 빌드 기본 옵션 (출처: S2W TALON)" >}}

---

## 핵심 시사점

1. **생태계 주도형 영향력 확장** — DragonForce는 타 그룹 공격과 협업을 **병행**해 랜섬웨어 생태계 내 위치를 강화하고 있다. 단일 그룹의 행보보다는 **카르텔 전략**으로 해석해야 한다.
2. **전략 목표의 이동** — Group-IB 2024년 12월 보고서 대비, **제휴 패널·바이너리 모두 지속적으로 개발·유지**되고 있다는 점이 확인된다. UI에서 BYOVD 드라이버 선택을 숨겼다고 해도 **바이너리에는 그대로 남아 있다**는 점이 단적인 예시다.
3. **베타 기능 = 운영자 정밀화** — 확장자 기반 암호화 모드 오버라이드 같은 베타 기능은, 운영자에게 **표적·파일 유형별 맞춤 암호화**라는 정밀 통제권을 부여한다. 향후 백업 회피·복호화 난이도 상승의 도구로 발전할 가능성.

{{< img src="/images/posts/s2w-dragonforce-ecosystem-2026/15-diamond-model.png" alt="DragonForce 다이아몬드 모델" caption="▲ Figure 8 — Diamond Model: DragonForce (출처: S2W TALON)" >}}

---

## 주요 수치 요약

| 항목 | 수치 |
|---|---|
| 누적 피해 기업 (2023.12 ~ 2026.01) | **363개사** |
| 첫 DLS 게시 | 2023.12.06 |
| 활동 시작 | 2023.12.13 (`@dragonforce` BreachForums) |
| 2023.12 신규 공개 피해 | 22개사 |
| 단월 최다 공개 (2025.12) | **35개사** |
| 제휴 패널 서브페이지 수 | 8개 |
| 메타데이터 크기 변화 | 534B → **537B** (+3B) |
| Encryption Ratio 필드 | 1B → **4B** |
| 설정 복호화 알고리즘 | **ChaCha8** |
| 빌더 기반 유출 소스 | **LockBit 3.0 (Black) + Conti** |
| Linux 지원 플랫폼 | **ESXi, NAS, RHEL** |
