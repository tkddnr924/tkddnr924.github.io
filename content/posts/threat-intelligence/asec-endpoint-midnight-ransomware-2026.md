---
title: "Endpoint(Midnight) 랜섬웨어 분석 — Babuk 파생, ChaCha20+RSA, ESXi/NAS 표적"
date: 2026-06-12T00:59:59+09:00
categories: ["Threat Intelligence"]
tags: ["Endpoint", "Midnight", "Babuk", "Ransomware", "ChaCha20", "Double Extortion", "ESXi", "NAS", "북한연계", "Session"]
author: "tkddnr924"
summary: "AhnLab ASEC이 분석한 Endpoint(구 Midnight) 랜섬웨어. Babuk 소스코드 기반 파생 변종으로 Windows·ESXi·NAS를 모두 표적화한다. ChaCha20 대칭 암호 + 자체 RSA 공개키 연산, 파일 크기 기반 부분 암호화, VSS 삭제·서비스 종료를 수행하며 데이터 탈취 협박과 결합한 Double Extortion 방식을 쓴다. 과거 랜섬노트의 메일 계정은 북한 연계 공격자가 사용한 정황도 확인됐다."

iocs:
  hashes:
    - "34be5e70f1260da87096b80dc7b026ac"
    - "b77ad606ba04d2d0077130679a257c96"
    - "c00cc937e064946ee42776cfe80754d7"
    - "e82bcf417f51acc6b2d8a94ceabd5e36"
  domains: []
  ips: []
  urls: []

sources:
  - name: "안랩 ASEC"
    date: "2026.06.02"
    title: "새벽에 온 암호화 손님 Endpoint(Midnight) 랜섬웨어 분석"
    url: "https://asec.ahnlab.com/ko/93931/"
---

## 개요

**Endpoint**(이전 명칭 **Midnight**)는 **Babuk 랜섬웨어 프레임워크**를 기반으로 파생된 변종이다. Babuk 소스코드 유출 이후 등장한 여러 파생 랜섬웨어 중 하나로 확인되며, **Windows·ESXi·NAS**를 모두 표적화한다. 파일 암호화와 데이터 유출 협박을 결합한 **Double Extortion** 방식을 사용한다.

| 항목 | 내용 |
|---|---|
| 별칭 | Endpoint / Midnight |
| 기반 코드 | **Babuk** (유출된 소스코드 기반) |
| 표적 OS | Windows, ESXi, NAS |
| 암호화 확장자 | `.endpoint` |
| 암호화 알고리즘 | **ChaCha20** + 자체 구현 **RSA** 공개키 연산 |
| 협상 채널 | **Session 메신저** (구버전: uTox ID) |
| 갈취 방식 | Double Extortion (암호화 + 데이터 유출 협박) |
| 귀속 단서 | 과거 랜섬노트 메일(`schipkealfred@gmail.com`)이 동아시아연구소 소장을 사칭한 **북한 연계 공격자** 사용 계정으로 식별됨(2024년 이후) |

---

## 공격 흐름

{{< attack-flow >}}
{{< step icon="fas fa-play" title="실행 인자 처리" >}}
`-paths=`(특정 경로), `/n`(네트워크 공유), `/e`(`.endpoint` 확장자 변경 비활성화) 옵션 파싱
{{< /step >}}
{{< step icon="fas fa-skull" title="프로세스·서비스 종료" >}}
DB·오피스·메일 클라이언트 프로세스 종료 →  
`vss`, `sql`, `Veeam`, `Sophos`, `Acronis` 백업·보안 서비스 강제 중단
{{< /step >}}
{{< step icon="fas fa-trash" title="VSS 섀도우 삭제" >}}
`vssadmin.exe delete shadows /all /quiet` 실행 — 복구 차단
{{< /step >}}
{{< step icon="fas fa-lock" title="ChaCha20 부분 암호화" >}}
파일 크기 기반 **부분 암호화** 수행, CPU 코어 수 기반 스레드 분산.  
`Mutexisfunnylocal` 뮤텍스로 중복 실행 방지
{{< /step >}}
{{< step icon="fas fa-file-signature" title="Footer에 키·해시 기록" >}}
세션 키(RSA 공개키로 보호) + SHA-256 해시값을 파일 Footer에 추가
{{< /step >}}
{{< step icon="fas fa-comment-dollar" title="랜섬노트 + 데이터 유출 협박" >}}
`How To Restore Your Files.txt` 생성, Session 메신저로 협상 유도
{{< /step >}}
{{< /attack-flow >}}

---

## 파일 암호화 상세

### 실행 인자

| 옵션 | 동작 |
|---|---|
| `-paths=<경로>` | 지정된 경로만 암호화 |
| `/n` | 네트워크 공유 폴더만 암호화 |
| `/e` | `.endpoint` 확장자 변경 비활성화 |

실행 경로에 **`debug.endpoint`** 로그 파일을 생성해 `FindFirstFileW`·`MoveFileExW` 실패 로그를 기록한다.

### 사전 작업

- 데이터베이스·오피스·메일 클라이언트 등 **여러 프로세스 종료**
- `vssadmin.exe delete shadows /all /quiet` — 볼륨 섀도우 복사본 삭제
- 강제 중단 대상 서비스: `vss`, `sql`, `Veeam`, `Sophos`, `Acronis`

### 암호화 대상 제외

| 구분 | 제외 |
|---|---|
| 디렉터리 | `Windows`, `Program Files`, `AppData` 등 |
| 파일명 | `bootmgr`, `ntuser.dat` |
| 확장자 | `.exe`, `.dll`, `.msi`, `.endpoint` |

### 암호화 알고리즘

- **ChaCha20** 대칭 암호로 파일 본문 암호화
- **자체 구현 RSA 공개키 연산**으로 세션 키 보호
- 파일 크기 기반 **부분 암호화**(전체가 아닌 일부 구간만) — 처리 속도와 영향 범위 조절
- CPU 코어 수 기준 멀티스레딩
- 중복 실행 방지 뮤텍스: **`Mutexisfunnylocal`**
- 암호화 완료 후 **Footer에 세션 키 + SHA-256 해시** 저장

---

## 랜섬노트

- 파일명: **`How To Restore Your Files.txt`**
- 바탕화면은 변경하지 않으며, 모든 암호화 경로에 노트 생성
- 노트 내용:
  - 데이터 탈취·암호화 사실 통보
  - 금전 지급 시 복구 지원 주장
  - **Session 메신저** 기반 연락 방법
  - **3개 파일 무료 복호화** 제공
  - 지연 시 금액 증가 경고

---

## 안랩 대응 시그니처

| 분류 | 시그니처 |
|---|---|
| 실행 파일 | `Trojan/Win.Generic.C5765109` |
| 행위 기반 (MDP) | `Ransom/MDP.Delete.M2117`, `Ransom/MDP.Command.M2255`, `Ransom/MDP.Decoy.M1171`, `Ransom/MDP.Event.M1946`, `Ransom/MDP.Event.M1875` |
| EDR | `SystemManipulation/EDR.Event.M2486`, `Ransom/EDR.Decoy.M2470` |

---

## 평가

Endpoint는 다음과 같은 체계적인 구조로 **빠른 피해 확산과 복구 방해**를 노린다.

- **부분 암호화** — 파일 크기에 따라 암호화 범위 조절 → 처리 속도↑·우회성↑
- **ChaCha20 + 자체 RSA** — 표준 라이브러리 의존 최소화로 탐지 우회
- **Footer 기반 키 저장** — 복호화 메타데이터 일관 관리
- **VSS·백업 서비스 표적** — Veeam·Sophos·Acronis까지 광범위 종료로 복구 차단
- **ESXi·NAS 동시 표적** — 가상화·스토리지 인프라까지 동시 마비

---

## 대응 가이드

| 영역 | 권고 |
|---|---|
| 백업 | **서비스망과 분리된 오프사이트** 백업, 백업 저장소 접근 통제, **정기 복구 훈련** |
| 패치 | OS·소프트웨어 최신 보안 업데이트 적용 |
| 보안 솔루션 | 보안 SW 최신 유지 (특히 ESXi·NAS 환경 포함) |
| 사용자 | 신뢰 불가 링크·첨부 파일 주의, 추측 어려운 패스워드 + **2FA** |
| 탐지 룰 | `vssadmin delete shadows`, `Veeam`·`Acronis` 서비스 종료, `Mutexisfunnylocal` 뮤텍스 생성, `.endpoint` 파일 생성, `debug.endpoint` 로그 생성 모니터링 |
