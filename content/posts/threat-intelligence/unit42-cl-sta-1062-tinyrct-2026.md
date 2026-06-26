---
title: "CL-STA-1062 — 동남아 정부·핵심 인프라 표적 TinyRCT 백도어 캠페인 (Unit 42)"
date: 2026-06-26T10:00:00+09:00
categories: ["Threat Intelligence"]
tags: ["Unit 42", "CL-STA-1062", "UAT-7237", "TinyRCT", "Backdoor", "AppDomainManager Injection", "C#", "AES-128-CBC", "JuicyPotato", "SoftEther", "중국연계", "Southeast Asia"]
author: "tkddnr924"
summary: "Unit 42가 분석한 중국어 사용 위협 클러스터 CL-STA-1062(Cisco Talos UAT-7237과 강한 연관). 동남아 정부·국영 에너지 기업·핵심 인프라를 표적으로, 2025년 10~12월 사이 최소 10개 조직 침해. 미공개 C# 백도어 TinyRCT(AES-128-CBC + 하드코딩 키), AppDomainManager 인젝션, JuicyPotato 권한 상승, SoftEther·yuze·VNT VPN 도구 위장(vmtools.exe·VMware 실행 파일)이 핵심."

iocs:
  hashes:
    - "00e09754526d0fe836ba27e3144ae161b0ecd3774abec5560504a16a67f0087c"
    - "f34bd1d485de437fe18360d1e850c3fd64415e49d691e610711d8d232071a0b1"
    - "dce5df29bddff5a4ddaea5c4fec14da91f7b69063a6e1c45ed61e5da4fc6c87b"
    - "cbfe8de6ffadbb1d396f61e63eb18e8b11c29527c1528641e3223d4c516cf7c3"
    - "4e1f8888d020decd09799ec946f1bf677cac6612b24582ddbf4d8ede425d8384"
    - "9b481b69cd91b09fa7bae7428f646dd89473a4c03393e43da81fe756cde1c472"
  domains: []
  ips:
    - "139.180.134[.]221"
    - "202.182.102[.]5"
    - "45.76.210[.]43"
    - "45.32.113[.]172"
  urls:
    - "hxxp://139.180.134[.]221/sdksdk608/1.zip"
    - "hxxp://139.180.134[.]221/sdksdk608/anydesk_0117.zip"
    - "hxxp://139.180.134[.]221/sdksdk608/hamcore.se2"
    - "hxxp://139.180.134[.]221/sdksdk608/httpdf"
    - "hxxp://139.180.134[.]221/sdksdk608/vpn_bridge.config"
    - "hxxp://139.180.134[.]221/sdksdk608/win-vpn.rar"
    - "hxxp://139.180.134[.]221/PerfWatson2.exe"

sources:
  - name: "Unit 42 (Palo Alto Networks)"
    date: "2026.06.25"
    title: "CL-STA-1062 Targets Southeast Asian Governments and Critical Infrastructure"
    url: "https://unit42.paloaltonetworks.com/cl-sta-1062-tinyrct-backdoor/"
---

## 개요

Unit 42는 **중국어를 구사하는 위협 클러스터 CL-STA-1062**가 동남아 정부·국영 에너지 기업·핵심 인프라를 노린 2025년 캠페인을 공개했다. Cisco Talos가 2025년 중반에 보고한 **UAT-7237**(타이완 웹 호스팅 인프라 침해)과 강한 연관성을 가진 그룹이며, 이번 분석에서는 **2025년 10~12월 사이 최소 10개 조직 침해**와 미공개 C# 백도어 **TinyRCT** 사용이 확인됐다.

| 항목 | 내용 |
|---|---|
| 클러스터명 | **CL-STA-1062** (높은 확신: Cisco Talos **UAT-7237** 와 연계) |
| 추정 출신 | **중국어 사용 그룹** (TinyRCT 소스에 간체 중국어 라인 잔존) |
| 활동 시작 | 2022년 3월 이후 |
| 표적 지역 | **동남아 (주)**, 동아시아 (광역) |
| 표적 산업 | 정부, **국영 에너지 기업**, 핵심 인프라 |
| 피해 규모 | 2025년 10~12월 사이 **최소 10개 조직** |
| 신규 백도어 | **TinyRCT** — 경량 C# RAT, 미공개 |
| 핵심 기법 | AppDomainManager 인젝션, JuicyPotato 권한 상승, SoftEther·yuze·VNT VPN 위장 |

---

## 공격 흐름

{{< attack-flow >}}
{{< step icon="fas fa-globe" title="① Web Exploitation — ASPX Web Shell" >}}
공개 웹 애플리케이션 익스플로잇(T1190) → ASPX 웹쉘 배포
{{< /step >}}
{{< step icon="fas fa-file-archive" title="② chrome_setup.zip 배포" >}}
정상 서명 `chrome_setup.exe` + 악성 `chrome_setup.exe.config` + `MyAppDomainManager.dll` 묶음 전달
{{< /step >}}
{{< step icon="fas fa-syringe" title="③ AppDomainManager 인젝션 (T1574.014)" >}}
정상 .NET 바이너리가 악성 `MyAppDomainManager.dll`을 자동 로드 — `%USERPROFILE%\Downloads`에서만 실행되도록 환경 검사
{{< /step >}}
{{< step icon="fas fa-clock" title="④ 예약 작업으로 지속성" >}}
**`GoogleUpdaterTaskSystem140.0.7272.0 {ACE7A46F-50FD-481C-AB32-3D838871DB40}`** — `/sc onlogon /rl highest` 로 등록
{{< /step >}}
{{< step icon="fas fa-download" title="⑤ 2단계 TinyRCT 다운로드" >}}
스테이징 서버 `139.180.134[.]221` 에서 **PerfWatson2.exe** 다운로드 → `%LOCALAPPDATA%` 에 저장 (Visual Studio 텔레메트리 컴포넌트 위장)
{{< /step >}}
{{< step icon="fas fa-network-wired" title="⑥ TinyRCT C2 통신 (10초 비콘)" >}}
주 C2 `45.32.113[.]172` 와 **HTTP POST/GET**, **AES-128-CBC** + 하드코딩 키 `ThisIsASecretKey87654321` (IV=zero), 기본 10초 비콘
{{< /step >}}
{{< step icon="fas fa-arrow-up" title="⑦ 권한 상승 + 측면 이동" >}}
**JuicyPotato** 권한 상승 / `tracert` 네트워크 정찰 / **MSSQL** 접속·덤프 / 웹서버 소스코드 스테이징
{{< /step >}}
{{< step icon="fas fa-user-secret" title="⑧ 지속 채널 확보 — VPN 도구 위장" >}}
**SoftEther VPN** → `vmtools.exe` 위장, **yuze** VPN 유틸, **VNT**를 VMware 실행 파일로 위장
{{< /step >}}
{{< step icon="fas fa-file-export" title="⑨ 데이터 유출" >}}
패스워드 보호 RAR 아카이브 + `curl` 로 공격자 인프라에 전송 — **MSSQL 덤프 + 웹서버 전체 소스코드**
{{< /step >}}
{{< /attack-flow >}}

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/02-source-code-extract.png" alt="정부 기관 소스코드 추출" caption="▲ Figure 2 — 정부 기관 웹서버에서 소스코드를 추출하는 과정 (출처: Unit 42)" >}}

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/03-tool-download.png" alt="공격 도구 다운로드 명령" caption="▲ Figure 3 — 표적 네트워크에 공격자 도구를 다운로드하는 명령행 (출처: Unit 42)" >}}

---

## TinyRCT 백도어 상세

**유형:** 경량 **C# RAT** — 이전에 문서화되지 않은 자체 개발 백도어  
**위장명:** `PerfWatson2.exe` (Visual Studio 텔레메트리 컴포넌트 모방)

### 환경 검사 (분석 회피)

실행 시 **`%LOCALAPPDATA%` 외 경로에서 실행되면 즉시 종료** — 샌드박스·분석가 환경 검출.

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/11-loader-env-check.png" alt="로더 환경 검사 코드" caption="▲ Figure 11 — 로더 소스코드의 실행 경로 환경 검사 로직 (출처: Unit 42)" >}}

### C2 프로토콜

| 항목 | 값 |
|---|---|
| 주 C2 | `45.32.113[.]172` |
| 스테이징 | `139.180.134[.]221` |
| 프로토콜 | HTTP POST/GET |
| 암호화 | **AES-128-CBC** |
| 하드코딩 키 | **`ThisIsASecretKey87654321`** |
| IV | **null/zero** |
| 기본 비콘 간격 | **10초** |

### 등록(Registration) 시 전송 정보

- 사용자명 / 머신명 / OS 버전 / 로컬 IP들
- 실행 경로 / PID
- 무작위 생성 GUID

### 지원 명령 (8종)

| # | 기능 |
|---|---|
| 1 | Shell 실행 (`cmd.exe`) |
| 2 | 설정 업데이트 (sleep 간격 변경) |
| 3 | 디렉터리/파일 목록 — 포맷: `Filename*Date*Size` |
| 4 | 텍스트 파일 읽기 |
| 5 | URL에서 파일 다운로드 |
| 6 | 바이너리 파일 유출 (**40KB 청크**, gzip 압축) |
| 7 | 화면 캡처 (JPEG, gzip 압축) |
| 8 | 자기 파괴 |

### 자기 파괴 루틴

1. **`GoogleUpdater` 예약 작업 삭제**
2. `choice.exe`로 **3초 지연**
3. **`PerfWatson2.exe` 실행 파일 제거**

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/09-tinyrct-chinese-code.png" alt="TinyRCT 코드 — 간체 중국어 라인 잔존" caption="▲ Figure 9 — TinyRCT 소스에 잔존한 간체 중국어 코드 라인 — 작성자 출신 단서 (출처: Unit 42)" >}}

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/10-perfwatson2-analysis.png" alt="PerfWatson2 분석" caption="▲ Figure 10 — PerfWatson2.exe 실행 파일 내부 분석 (출처: Unit 42)" >}}

---

## AppDomainManager 인젝션 (T1574.014)

전달 패키지 `chrome_setup.zip` 구성:

```
chrome_setup.exe            ← 정상 서명 실행 파일
chrome_setup.exe.config     ← 악성 .config — AppDomainManager 지정
MyAppDomainManager.dll      ← 악성 어셈블리 (1단계 로더)
```

.NET 런타임이 정상 `chrome_setup.exe`를 시작할 때 함께 있는 `.config`를 신뢰하므로, **악성 DLL이 정상 프로세스 컨텍스트에서 로드**된다. 이번 캠페인의 로더는 다음 조건도 함께 강제한다.

- **`%USERPROFILE%\Downloads` 에서만 동작** → 다른 경로(분석가의 샘플 폴더 등)로 옮기면 종료
- 정상적인 다운로드 폴더에 떨어진 경우만 다음 단계로 진행

이후 2단계 페이로드(`PerfWatson2.exe` = TinyRCT)를 `139.180.134[.]221` 에서 가져와 `%LOCALAPPDATA%` 에 저장한다.

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/08-cortex-xdr-block.png" alt="Cortex XDR이 PerfWatson2 차단" caption="▲ Figure 8 — Cortex XDR이 PerfWatson2.exe 실행을 차단·경보하는 화면 (출처: Unit 42)" >}}

---

## 측면 이동 · 권한 상승 · 도구 위장

### 측면 이동·정찰

- 네트워크 정찰: `tracert` 기반 토폴로지 파악
- **MSSQL 데이터베이스 접속 후 데이터 추출**
- 웹서버 소스코드 디렉터리 통째로 스테이징·압축

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/01-mssql-exfil.png" alt="MSSQL 데이터 유출 명령" caption="▲ Figure 1 — MSSQL 서버로부터 데이터를 유출하는 명령행 (출처: Unit 42)" >}}

### 권한 상승

- **JuicyPotato** 익스플로잇 사용

### VPN 도구 위장 (지속 채널 확보)

공격자는 정상 시스템 유틸리티 이름을 사용해 EDR·관리자의 의심을 분산시킨다.

| 도구 | 위장명 | 비고 |
|---|---|---|
| **SoftEther VPN** | `vmtools.exe` | VMware Tools 위장 |
| **yuze** | (정상명 사용) | 보조 VPN 유틸 |
| **VNT** | VMware 실행 파일명 | 네트워킹 도구 |
| RAR 아카이브 | **패스워드 보호** | 도구 배포·유출 컨테이너 |

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/04-command-lines.png" alt="사용된 명령행 예시" caption="▲ Figure 4 — 측면 이동에 사용된 명령행 예시 (출처: Unit 42)" >}}

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/05-yuze-exec.png" alt="yuze 인스턴스 실행" caption="▲ Figure 5 — yuze VPN 인스턴스 실행 명령행 (출처: Unit 42)" >}}

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/06-softether-extract.png" alt="SoftEther VPN 추출" caption="▲ Figure 6 — SoftEther VPN 바이너리 추출·실행 (출처: Unit 42)" >}}

{{< img src="/images/posts/unit42-cl-sta-1062-tinyrct-2026/07-vnt-vmware-disguise.png" alt="VNT를 VMware 실행 파일로 위장" caption="▲ Figure 7 — VNT 네트워킹 도구를 VMware 실행 파일로 위장 (출처: Unit 42)" >}}

---

## IoC (선별)

### SHA-256 (6건)
| 산출물 | 해시 |
|---|---|
| `chrome_setup.zip` | `00e09754526d0fe836ba27e3144ae161b0ecd3774abec5560504a16a67f0087c` |
| `fscan` | `f34bd1d485de437fe18360d1e850c3fd64415e49d691e610711d8d232071a0b1` |
| SoftEther VPN | `dce5df29bddff5a4ddaea5c4fec14da91f7b69063a6e1c45ed61e5da4fc6c87b` |
| TinyRCT downloader | `cbfe8de6ffadbb1d396f61e63eb18e8b11c29527c1528641e3223d4c516cf7c3` |
| TinyRCT payload | `4e1f8888d020decd09799ec946f1bf677cac6612b24582ddbf4d8ede425d8384` |
| VNT | `9b481b69cd91b09fa7bae7428f646dd89473a4c03393e43da81fe756cde1c472` |

### IPv4 (4건)
- `139.180.134[.]221` (스테이징)
- `45.32.113[.]172` (주 C2)
- `202.182.102[.]5`
- `45.76.210[.]43`

### URLs (7건)
- `hxxp://139.180.134[.]221/sdksdk608/1.zip`
- `hxxp://139.180.134[.]221/sdksdk608/anydesk_0117.zip`
- `hxxp://139.180.134[.]221/sdksdk608/hamcore.se2`
- `hxxp://139.180.134[.]221/sdksdk608/httpdf`
- `hxxp://139.180.134[.]221/sdksdk608/vpn_bridge.config`
- `hxxp://139.180.134[.]221/sdksdk608/win-vpn.rar`
- `hxxp://139.180.134[.]221/PerfWatson2.exe`

### 호스트 기반 지표
- 예약 작업: `GoogleUpdaterTaskSystem140.0.7272.0 {ACE7A46F-50FD-481C-AB32-3D838871DB40}`
- 실행 파일 위장명: `PerfWatson2.exe`, `vmtools.exe`

---

## MITRE ATT&CK

| Tactic | Technique |
|---|---|
| Initial Access | T1190 — Exploit Public-Facing Application |
| Defense Evasion | **T1574.014 — AppDomainManager Hijacking** |
| Execution | T1059.003, T1047 |
| Persistence | T1053.005 — Scheduled Task |
| Privilege Escalation | (JuicyPotato) |
| Credential Access | T1078 — Valid Accounts (사후 사용) |
| Lateral Movement | T1570 — Lateral Tool Transfer |
| Collection | T1005 — Data from Local System |
| Exfiltration | T1041 — Exfiltration Over C2 |

---

## 방어 권고

| 영역 | 권고 |
|---|---|
| 헌팅 — 환경 검사 우회 | `%LOCALAPPDATA%`에서 실행되는 미서명 .NET 바이너리 모니터링 |
| 예약 작업 | **`GoogleUpdater...` GUID 패턴** 의 예약 작업 생성 알림 |
| AppDomainManager | `.exe.config` 의 `appDomainManagerAssembly`/`Type` 키 모니터링 + 같은 폴더에 신규 `.dll` 동반 시 경보 |
| C2 트래픽 | 10초 간격 비콘 + AES-128-CBC + 의심 IP 대역 (`139.180.134.*`, `45.32.113.*`) |
| LOLBin·위장 | `vmtools.exe`·VMware 실행 파일명으로 등록된 비표준 경로 프로세스 탐지 |
| 권한 상승 | JuicyPotato 토큰 인격화 시그니처 (`SeImpersonatePrivilege` 비정상 사용) |
| 도구 차단 | SoftEther VPN·yuze·VNT 등 비인가 VPN 도구 실행 차단 정책 |

Palo Alto Networks 제품군에서는 **Cortex XDR/XSIAM, Advanced WildFire, Advanced URL Filtering, Advanced DNS Security**로 탐지·차단을 제공한다.

---

## 시사점

이 캠페인은 **"정상 서명 + 정상 경로 + 정상 도구"의 3중 위장**과 **자체 개발 경량 백도어**를 결합해 동남아 핵심 인프라를 장기 침투한 전형적인 사례다. UAT-7237 → CL-STA-1062로 이어지는 운영 연속성과 **타이완에서 동남아로의 표적 확장**은 중국 연계 위협 클러스터의 광역 캠페인 흐름을 보여준다. 특히 TinyRCT가 **C#·AES-128-CBC·하드코딩 키**로 구현된 점은 단순성을 통해 RE·EDR 탐지 회피를 의도한 설계로 평가된다.
