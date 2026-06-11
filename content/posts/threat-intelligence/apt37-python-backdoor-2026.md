---
title: "APT37의 Python 백도어 캠페인 분석 — 딥페이크 사칭 스피어피싱"
date: 2026-05-25T02:51:13+09:00
categories: ["Threat Intelligence"]
tags: ["APT37", "북한", "Python Backdoor", "Spear Phishing", "LNK", "RAT", "스케줄드 태스크"]
author: "tkddnr924"
summary: "북한 연계 APT37이 딥페이크 군 신분증 사칭, 항공 e-티켓 등 사회공학 테마로 스피어피싱을 수행하며 Python 컴파일 백도어를 배포한다. 배치 파일 환경변수 치환 난독화와 .cat 확장자 위장 기법이 특징이다."

iocs:
  hashes:
    - "255155bad9af5e2c6cf550ff2a95219d"
    - "abbb362cdfe14b56b3a13a2a55937ee4"
    - "b5f9cd67cb32f44c138c382e17b06fd6"
    - "f7b2e0cebd7793c8cfee2c7c5b93df9c"
    - "fcb97f87905a33af565b0a4f4e884d61"
    - "1aa7751332710f4e963a708243d3d550"
    - "09dabe5ab566e50ab4526504345af297"
    - "16d7be5ebc3c2ff1cffbb83b965fd4fb"
    - "33c97fc4eacd73addbae9e6cde54a77d"
    - "804d12b116bb40282fbf245db885c093"
    - "7922f91281e8b0fe00518d05bf295b4a"
  domains:
    - "oxenhan1.cafe24[.]com"
    - "kmot.co[.]kr"
    - "ycpatent.co[.]kr"
    - "printory[.]kr"
    - "fe01.co[.]kr"
    - "choisy[.]fr"
  ips:
    - "51.158.21[.]1"
    - "183.111.174[.]69"
    - "211.239.157[.]126"
    - "218.150.78[.]198"
    - "220.73.160[.]23"
sources:
  - name: "지니언스 시큐리티 센터"
    date: "2026.05"
    title: "Python으로 무장한 APT37, 딥페이크 사칭 스피어피싱 캠페인 분석"
    url: "https://www.genians.co.kr/blog/threat_intelligence/python"
---

## 개요

{{< img src="/images/posts/apt37-python-backdoor-2026/01-attack-overview.png" alt="APT37 공격 사례 흐름" caption="▲ APT37 경찰 공무원 사칭 공격 사례 흐름도 (출처: 지니언스)" >}}

지니언스 시큐리티 센터(GSC)는 북한 연계 위협 그룹 **APT37(Reaper)이** 딥페이크 사칭, 항공 e-티켓, 국방·경찰 공무원 사칭 등 다양한 사회공학 테마를 활용해 스피어피싱 캠페인을 수행하고 있음을 확인했다. 최종 페이로드는 `.cat` 확장자로 위장한 Python 컴파일 백도어로, 예약 작업을 통해 지속성을 유지하며 원격 명령을 실행한다.

---

## 위협 행위자 프로파일

| 항목 | 내용 |
|---|---|
| 그룹명 | APT37 (Reaper, ScarCruft) |
| 배후 | 북한 국가보위성 (MSS) |
| 주요 표적 | 한국 방산·연구·정부 관련 인물 |
| 귀속 근거 | "Lailey" 메타데이터(2022~2026), PHP 웹쉘 시그니처 재사용, Cafe24·프랑스 도메인 인프라, 공유 C2 IP |

---

## 공격 흐름

{{< attack-flow >}}
{{< step icon="fas fa-envelope-open-text" title="스피어피싱 이메일" >}}
항공 e-티켓 / 북한 연구행사 / 국방·경찰 공무원 사칭 테마로 타깃 유도
{{< /step >}}
{{< step icon="fas fa-file-zipper" title="ZIP 첨부파일 → LNK 실행" >}}
압축 파일 내 LNK 파일 실행 시 PowerShell 명령 트리거
{{< /step >}}
{{< step icon="fas fa-terminal" title="PowerShell 실행 정책 우회" >}}
`-ExecutionPolicy Bypass` 플래그로 정책 우회 후 BAT 파일 드롭 및 실행
{{< /step >}}
{{< step icon="fas fa-download" title="Python Embed 패키지 다운로드" >}}
`curl.exe`로 `python-3.10.0-embed-amd64.zip` 다운로드 →  
`C:\Users\Public\Music\MusicLibrariesPackage\` 에 설치,  
`pythonw.exe` → `codeflush.exe` 로 이름 변경
{{< /step >}}
{{< step icon="fas fa-clock" title="예약 작업 등록 (지속성)" >}}
`MicrosoftMusicLibrariesPackageTaskMachine` 작업 등록, **1분 간격** 반복 실행
{{< /step >}}
{{< step icon="fas fa-spider" title="백도어 실행 및 C2 통신" >}}
`codeflush.exe settingenv.cat` — Python 컴파일 백도어 실행 후 C2 서버와 통신 개시
{{< /step >}}
{{< /attack-flow >}}

---

## 핵심 기법 분석

{{< img src="/images/posts/apt37-python-backdoor-2026/02-phishing-examples.png" alt="스피어피싱 사례별 화면" caption="▲ 항공 e-티켓, 연구행사, 국방·경찰 사칭 등 다양한 스피어피싱 사례 화면 (출처: 지니언스)" >}}

### 1. 배치 파일 환경변수 치환 난독화

배치 파일 내 명령어를 환경변수 문자 조각으로 분해하는 방식이다. `%var:~offset,length%` 문법을 활용해 실제 실행할 명령어를 런타임에 재조합한다. 정적 분석 도구와 시그니처 기반 탐지를 우회하는 데 효과적이다.

{{< img src="/images/posts/apt37-python-backdoor-2026/03-lnk-params.png" alt="LNK 파일 내부 인자값" caption="▲ LNK 파일 내부 환경변수 치환 난독화 명령 (출처: 지니언스)" >}}

{{< img src="/images/posts/apt37-python-backdoor-2026/04-deobfuscated-cmd.png" alt="원본 명령 복원 결과" caption="▲ 난독화 해제 후 복원된 PowerShell 명령 및 curl.exe 복사 작업 (출처: 지니언스)" >}}

### 2. Python 바이트코드 .cat 위장

최종 페이로드 `settingenv.cat`은 실제로는 **Python 3.10 컴파일 바이트코드(.pyc)** 파일이다. 매직 넘버 `6F 0D 0D 0A`로 식별된다. `.cat`(Windows 보안 카탈로그) 확장자를 사용해 보안 솔루션의 의심을 줄인다.

내부 추가 난독화:
- `chr()` 문자 연결로 문자열 동적 생성
- `[::-1]` 문자열 역순 변환
- `getattr(__builtins__, "__import__")` 를 통한 모듈 동적 로딩

{{< img src="/images/posts/apt37-python-backdoor-2026/05-cat-header.png" alt="settingenv.cat 파일 헤더 구조" caption="▲ settingenv.cat 파일 헥스 헤더 — Python 3.10 바이트코드 매직 넘버(6F 0D 0D 0A) 확인 (출처: 지니언스)" >}}

{{< img src="/images/posts/apt37-python-backdoor-2026/06-decompiled-python.png" alt="디컴파일된 Python 코드" caption="▲ 디컴파일된 Python 바이트코드 초기 영역 — chr() 문자 연결 난독화 (출처: 지니언스)" >}}

{{< img src="/images/posts/apt37-python-backdoor-2026/07-deobfuscated-c2.png" alt="난독화 해제된 C2 문자열" caption="▲ 복원된 C2 URL, HTTP 헤더, 인코딩 파라미터 (출처: 지니언스)" >}}

### 3. LOLBins 악용

`curl.exe`를 시스템 경로가 아닌 임시 경로로 복사해 실행한다. 기본 제공 도구를 악용하여 추가 악성 바이너리 다운로드 없이 페이로드를 가져온다.

---

## settingenv.cat 백도어 상세

**타입:** Python RAT (원격 접근 트로이목마)

**C2 통신 구조:**

| 단계 | 내용 |
|---|---|
| 클라이언트 식별 | `os.getlogin()` 기반 쿠키 토큰 생성 |
| 명령 수신 | `kmot.co[.]kr/board.php` HTTP GET |
| 수신 데이터 처리 | Base64 디코드 후 `exec()` 로 동적 실행 |
| 결과 전송 | `io.StringIO`로 stdout 캡처 → Base64 인코딩 후 HTTP POST |

**지속성:**
- 예약 작업명: `MicrosoftMusicLibrariesPackageTaskMachine`
- 실행 간격: **1분**
- 실행 명령: `codeflush.exe settingenv.cat`

---

## 인프라 연계 분석

{{< img src="/images/posts/apt37-python-backdoor-2026/08-infra-map.png" alt="APT37 인프라 상관 관계도" caption="▲ APT37 캠페인 간 인프라 연계 관계도 (출처: 지니언스)" >}}

APT37은 수년간 동일한 인프라 패턴을 재사용한다.

| 연도 | 도메인 | IP | 악성코드 |
|---|---|---|---|
| 2020 | attiferstudio[.]com | 121.78.88[.]93 | Chinotto |
| 2021 | udcontest[.]com | 114.207.246[.]156 | PHP 웹쉘 |
| 2022 | hanainternational[.]net | 121.78.88[.]92 | PHP 웹쉘 변형 |
| 2026 | choisy[.]fr | 51.158.21[.]1 | Python 백도어 |

---

## 탐지 권고

{{< img src="/images/posts/apt37-python-backdoor-2026/09-edr-lnk.png" alt="EDR LNK 파일 탐지" caption="▲ EDR을 통해 탐지된 의심스러운 LNK 파일 실행 모습 (출처: 지니언스)" >}}

{{< img src="/images/posts/apt37-python-backdoor-2026/10-edr-c2.png" alt="EDR PowerShell C2 접속" caption="▲ PowerShell과 curl.exe를 통한 C2 접속 시도 EDR 탐지 화면 (출처: 지니언스)" >}}

- **LNK 실행** — 압축 파일 컨텍스트에서 LNK 파일 실행 탐지
- **PowerShell 정책 우회** — `-ExecutionPolicy Bypass` 플래그 모니터링
- **비정상 경로 curl 실행** — 시스템 디렉터리 외 curl.exe 복사·실행 탐지
- **Python 패키지 다운로드** — 공용 경로(`C:\Users\Public\`) 내 python zip 다운로드 탐지
- **의심 예약 작업** — `Microsoft*` 접두사 작업 중 비시스템 경로 실행 탐지
- **비표준 확장자 실행** — `.cat`, `.bat` 등 비시스템 경로 실행 탐지
