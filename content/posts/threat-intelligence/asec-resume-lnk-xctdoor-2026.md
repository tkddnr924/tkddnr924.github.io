---
title: "이력서 위장 악성 LNK → Xctdoor 백도어 유포 분석 (ASEC)"
date: 2026-06-24T03:35:00+09:00
categories: ["Threat Intelligence"]
tags: ["ASEC", "Xctdoor", "LNK", "Resume Lure", "Backdoor", "DLL Sideloading", "Task Scheduler", "Decoy Document", "북한연계", "Spear Phishing"]
author: "tkddnr924"
summary: "AhnLab ASEC이 분석한 이력서 위장 악성 LNK 유포 캠페인. 기업명·직무명을 포함한 '(RESUME)_*.LNK' 파일이 실행되면 정상 디코이 문서를 보여주고, 백그라운드에서 PowerShell·VBScript를 생성해 'office365' 작업 스케줄러로 10분 주기 지속성을 확보한다. 최종적으로 ProximityUxHost.exe의 DLL Side Loading을 통해 ProximityCommon.dll이 로드되고 Xctdoor 백도어(settings.dat)가 인젝션·실행된다."

iocs:
  hashes: []
  domains: []
  ips: []
  urls: []

sources:
  - name: "안랩 ASEC"
    date: "2026.06.17"
    title: "정상 이력서처럼 보이지만 실행 순간 감염 시작"
    url: "https://asec.ahnlab.com/ko/94163/"
---

## 개요

AhnLab ASEC은 **기업명·직무명을 포함한 이력서 파일로 위장한 악성 LNK**가 유포 중이라고 경고했다. 채용·영업·고객 대응 등 외부 문서 수신이 잦은 부서를 직접 노린 캠페인이며, **정상 디코이 문서 + DLL Side Loading + Xctdoor 백도어**라는 다단계 구조를 갖는다.

| 항목 | 내용 |
|---|---|
| 유포 파일명 패턴 | **`(RESUME)_국내 기업명_직무명_***.LNK`** |
| 1차 표적 | 채용·영업·HR 등 외부 문서 수신 부서 |
| 최종 페이로드 | **Xctdoor 백도어** (`settings.dat`, 정상 프로세스에 인젝션) |
| 지속성 | **`office365`** 이름의 작업 스케줄러 (10분 간격) + 시작 프로그램 바로가기 |
| 실행 우회 | **DLL Side Loading** — `ProximityUxHost.exe` ← `ProximityCommon.dll` |
| 사회공학 | 실행 시 **정상 디코이 이력서 문서** 동시 표시 |

> Xctdoor는 과거 국내 기업·기관 대상 캠페인에서 사용된 백도어로, 북한 연계 위협 행위자의 도구로 추정된 사례가 보고된 바 있다.

{{< img src="/images/posts/asec-resume-lnk-xctdoor-2026/01-decoy-resume.png" alt="정상 디코이 이력서 문서" caption="▲ 그림 1 — 사용자 의심을 낮추기 위해 함께 열리는 정상 디코이 이력서 문서 (출처: AhnLab ASEC)" >}}

---

## 공격 흐름

{{< attack-flow >}}
{{< step icon="fas fa-file-lines" title="이력서 위장 LNK 실행" >}}
`(RESUME)_<기업명>_<직무명>_***.LNK` 파일 실행 — 채용·영업·HR 담당자 표적
{{< /step >}}
{{< step icon="fas fa-eye" title="정상 디코이 문서 표시" >}}
LNK 내부 정상 이력서 문서를 함께 열어 사용자 의심 차단 (사회공학)
{{< /step >}}
{{< step icon="fas fa-file-code" title="스크립트 파일 생성 (Public\\Videos)" >}}
`C:\Users\Public\Videos\` 경로에 **랜덤 이름의 `.bat` / `.ps1` / `.vbs`** 생성
{{< /step >}}
{{< step icon="fas fa-clock" title="작업 스케줄러 등록 — 'office365' (10분 주기)" >}}
정상 서비스 이름을 흉내낸 **`office365`** 예약 작업이 VBScript → BAT 체인을 **10분마다** 실행
{{< /step >}}
{{< step icon="fas fa-download" title="외부 서버에서 추가 파일 다운로드 (curl)" >}}
BAT 파일이 `curl`로 추가 컴포넌트 다운로드 (다운로드 URL은 원문 미공개)
{{< /step >}}
{{< step icon="fas fa-unlock" title="Base64 복호화 → p2.ps1 생성" >}}
다운로드된 파일을 디코드해 **`C:\Users\Public\Pictures\p2.ps1`** 로 저장
{{< /step >}}
{{< step icon="fas fa-link" title="시작 프로그램 바로가기 + 정상/악성 파일 묶음 생성" >}}
`p2.ps1`이 시작 프로그램 경로에 LNK 생성 + `ProximityUxHost.exe` / `ProximityCommon.dll` / `settings.dat` / `MicrosoftBing.lnk` 추출
{{< /step >}}
{{< step icon="fas fa-syringe" title="DLL Side Loading → Xctdoor 인젝션" >}}
`MicrosoftBing.lnk`가 정상 `ProximityUxHost.exe` 실행 → `ProximityCommon.dll` 로드 → **`settings.dat`(Xctdoor)** 가 정상 프로세스에 인젝션되어 C2 통신 개시
{{< /step >}}
{{< /attack-flow >}}

---

## 단계별 상세

### 1) 스크립트 생성과 'office365' 작업 스케줄러

악성 LNK 내부에 포함된 코드가 `C:\Users\Public\Videos\` 경로에 **랜덤 이름의 BAT/PS1/VBS** 파일 묶음을 풀어낸다. 이어 PowerShell 스크립트가 **`office365`** 라는 작업 스케줄러를 등록해 **10분마다** VBScript를 실행하도록 설정한다. VBScript는 BAT을 실행하고, BAT은 다음 단계 행위를 트리거한다.

정상 업무 서비스와 똑같은 이름(`office365`)을 사용한 이유는 단순하다 — **작업 스케줄러 목록에서 자연스럽게 묻혀 들어가기 위함**이다. 시스템 재부팅이나 일부 프로세스 종료 후에도 지속성이 유지된다.

{{< img src="/images/posts/asec-resume-lnk-xctdoor-2026/02-scheduled-task.png" alt="등록된 'office365' 작업 스케줄러" caption="▲ 그림 2 — 정상 서비스명을 흉내낸 'office365' 예약 작업 (출처: AhnLab ASEC)" >}}

### 2) 외부 다운로드 → Base64 복호화 → p2.ps1

VBS가 실행한 BAT 파일이 **`curl`** 으로 외부 서버에서 추가 파일을 받아온다(URL은 원문 미공개). 받은 파일은 **Base64 인코딩**되어 있고, 디코드 후 `C:\Users\Public\Pictures\p2.ps1` 로 저장된다.

이 `p2.ps1`이 두 가지를 동시에 수행한다.

- 시작 프로그램 경로에 **바로가기 파일 생성** → 부팅 시 자동 실행 (지속성 보강)
- 이전에 다운로드한 파일을 **복호화**해 다음 컴포넌트 4종 추출:

| 파일 | 역할 |
|---|---|
| `ProximityUxHost.exe` | 정상 마이크로소프트 서명 실행 파일 (DLL 로더 역할로 악용) |
| `ProximityCommon.dll` | **악성 DLL** — `ProximityUxHost.exe`가 사이드 로딩 |
| `settings.dat` | **Xctdoor 백도어 페이로드** (인젝션 대상) |
| `MicrosoftBing.lnk` | 사이드 로딩 트리거용 바로가기 |

{{< img src="/images/posts/asec-resume-lnk-xctdoor-2026/03-p2-ps1.png" alt="p2.ps1 파일 일부" caption="▲ 그림 3 — `p2.ps1` 스크립트 코드 일부 (출처: AhnLab ASEC)" >}}

### 3) DLL Side Loading → Xctdoor 인젝션

마지막 단계가 정교하다. `MicrosoftBing.lnk`가 정상 서명된 `ProximityUxHost.exe`를 실행하는데, 이 정상 바이너리가 **같은 폴더에 있는 `ProximityCommon.dll`(악성)을 자동 로드**한다 — 전형적인 DLL Side Loading.

악성 `ProximityCommon.dll`이 로드된 후, **`settings.dat`(Xctdoor)** 페이로드가 정상 프로세스에 인젝션되어 외부 C2 서버와 통신을 시도한다.

{{< img src="/images/posts/asec-resume-lnk-xctdoor-2026/04-xctdoor-code.png" alt="Xctdoor 코드 일부" caption="▲ 그림 4 — Xctdoor 백도어 코드 일부 (출처: AhnLab ASEC)" >}}

이 흐름의 핵심은 **"정상 문서 + 정상 서비스명 + 정상 실행 파일"** 의 3중 위장이다. 사용자는 이력서 문서를 본 것으로 끝나고, 시스템 관리자는 `office365` 예약 작업을 의심하지 않으며, 보안 솔루션은 정상 서명된 `ProximityUxHost.exe` 실행을 차단할 명분이 약하다.

---

## 호스트 기반 탐지 지표

> 원문은 **다운로드 URL·해시·C2 정보를 의도적으로 공개하지 않았다**(연관 IoC는 AhnLab TIP 구독자 전용). 다만 본문에 드러난 **호스트 측 탐지 지표**는 그대로 모니터링·헌팅에 활용 가능하다.

### 파일·경로
| 지표 | 위치 |
|---|---|
| LNK 파일명 정규식 | `^\(RESUME\)_.+_.+_.+\.LNK$` (한글 기업명·직무명 패턴) |
| 1차 드롭 경로 | `C:\Users\Public\Videos\*.{bat,ps1,vbs}` (랜덤 파일명) |
| 2차 스크립트 | `C:\Users\Public\Pictures\p2.ps1` |
| 최종 페이로드 경로 | `C:\Users\<User>\AppData\Local\Packages\Microsoft.BingSearch365_8wekyb3d8bbwe\Appdata\` |
| 최종 페이로드 파일 | `ProximityCommon.dll`, `settings.dat`, `MicrosoftBing.lnk` |

> ※ `Microsoft.BingSearch365_8wekyb3d8bbwe`는 **정상 UWP 패키지 폴더명을 모방한 위장 경로**다 — 실제 BingSearch 패키지와 구분 필요.

### 행위
| 지표 | 설명 |
|---|---|
| 예약 작업 | **`office365`** — VBS/BAT을 **10분 주기** 실행 |
| LOLBin | `Public\Videos`에서 `curl.exe` 외부 호출 |
| DLL Side Loading | `ProximityUxHost.exe` → `ProximityCommon.dll` 로드 체인 |
| 시작 프로그램 | `Startup` 폴더에 신규 `.lnk` 생성 (정상 프로그램명 위장) |
| Mutex/뮤텍스 | (원문 미공개) |

---

## 대응 가이드

1. **작업 스케줄러 점검** — `office365` 또는 정상 서비스명을 흉내낸 의심 예약 작업 확인 후 삭제
2. **의심 파일 삭제** — 위 사용자 프로필 하위 경로에서 `ProximityCommon.dll`·`settings.dat`·`MicrosoftBing.lnk` 발견 시 즉시 제거
3. **이력서 LNK 실행 차단** — 출처 불명 이력서 첨부의 **확장자(.lnk)** 를 반드시 확인. 메일 게이트웨이에서 `.lnk` 첨부 차단 정책 권장
4. **EDR 헌팅 룰**
   - `Public\Videos`에서 생성된 `.bat`·`.ps1`·`.vbs` 실행
   - 예약 작업 이름이 정상 서비스 이름과 동일한 경우 (특히 `office365`)
   - `ProximityUxHost.exe`의 비표준 경로 실행
   - `curl.exe`의 `Public\*` 경로 실행

---

## 시사점

이 캠페인은 **"정상으로 보이는 신호의 누적"** 으로 탐지를 빠져나가는 전형적인 사례다. 단일 요소(예: DLL Side Loading)만으로는 일반적인 LOLBAS 패턴과 구분이 어렵지만, 이력서 LNK → 정상 디코이 → office365 예약 작업 → BingSearch365 위장 경로 → 정상 서명 EXE의 체인 전체가 **모두 정상 신호의 위장**이라는 점을 인지해야 한다.

원문은 다운로드 URL·해시 등 **하드 IoC를 공개하지 않았지만**, 위 호스트 측 패턴만으로도 충분히 헌팅 룰을 구성할 수 있다. AhnLab TIP 구독 환경에서는 연관 IoC 추가 확인 권장.
