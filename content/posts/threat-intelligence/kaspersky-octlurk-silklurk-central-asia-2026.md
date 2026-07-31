---
title: "OctLurk·SilkLurk 백도어 — 중앙아시아 표적 사이버 스파이 캠페인 (Kaspersky GReAT)"
date: 2026-07-31T16:25:00+09:00
categories: ["Threat Intelligence"]
tags: ["Kaspersky", "Securelist", "GReAT", "OctLurk", "SilkLurk", "LurkProxy", "PlugX", "Backdoor", "Central Asia", "중국연계", "Cyber Espionage", "DLL Sideloading", "Impacket", "FSCAN"]
author: "tkddnr924"
summary: "Kaspersky GReAT(Saurabh Sharma·Yaroslav Kikel)이 2025년부터 중앙아시아(아프가니스탄·키르기스스탄·타지키스탄·우즈베키스탄·카자흐스탄·시리아)의 정부·의료·물류·법 집행 기관을 표적으로 한 두 신형 백도어 OctLurk·SilkLurk를 분석. 두 패밀리는 동일 스테이징 디렉터리(C:\\ProgramData\\intel\\)와 공유 인프라를 사용하며, 일부 피해자는 두 계열에 동시 감염. SilkLurk의 2차 페이로드로 PlugX(gycudore[.]kozow[.]com)가 배포돼 중국어 사용 행위자로 중간 신뢰 귀속. Impacket secretsdump·키로거·브라우저 자격증명 스틸러·FSCAN·Pandora FMS RC 등 후속 도구 다수 확인."

iocs:
  hashes:
    - "082d49ef9f14e6811d68c7e0e82e5069"
    - "1415a78b75de7db4ba3d1e61d7db4501"
    - "18dc8bff47cc282508354771d0c8cf8c"
    - "2a571f6cee42a17d873f4c942649813f"
    - "2f18472866f38c1e1c2c5c14b9a6ab56"
    - "32a5985543433a4f60da2fafd873b927"
    - "37dc84e4bcad92fa28f1e7778d088283"
    - "3c9a1ba8e0c7475706adc6376e9d7b7c"
    - "45cf5916fab4272a1313c26e67aa9220"
    - "4e6d5c4770d5a822d7fcce6a74f7ad73"
    - "5e26df131ff0a679a0a2699b723b46e3"
    - "62944e26b36b1dcace429ae26ba66164"
    - "6ecf84fb18f6747ed08d7598364d853a"
    - "7c2f64461bb519c6cbf1fc687675514c"
    - "8269d6ba1b6842f9152c90cf7add9b93"
    - "9a1dd1d96481d61934dcc2d568971d06"
    - "a0cc7accc79abb0287aaba825d0351f0"
    - "a4d550a3ba0cd073fe3839b99d98a7a8"
    - "a56cce62930a6bee80d679b4c495a340"
    - "b874123a80fc4f40e06872b9cb54ebc6"
    - "be4731c09734da2e8eb6814a9c82f266"
    - "cf903e4a1629aa0582fd0363b5786676"
    - "ef59aad625eebda8650aec5820d6ce69"
    - "f4578e869a735cfad691f927bae3e638"
  domains:
    - "dns[.]multitoconference[.]com"
    - "dns[.]ssentialserv[.]xyz"
    - "tj[.]tajikistandip[.]com"
    - "fm01[.]clouddevicemetrics[.]com"
    - "confbase[.]mdpsupport[.]net"
    - "digital[.]leroymerling[.]com"
    - "api2[.]annoyingremote[.]com"
    - "about[.]blsouqs[.]com"
    - "ssl[.]blsouqs[.]com"
    - "tyhbgtyuj[.]gleeze[.]com"
    - "wedfcvbn[.]gleeze[.]com"
    - "rgnojb[.]casacam[.]net"
    - "ctyuhjerf[.]kozow[.]com"
    - "uyhvfredc[.]accesscam[.]org"
    - "gycudore[.]kozow[.]com"
  ips:
    - "45.138.157[.]165"
    - "154.196.162[.]76"
    - "154.196.187[.]73"
    - "95.179.210[.]138"
    - "95.179.141[.]26"
    - "45.77.136[.]228"
    - "45.32.152[.]50"
    - "45.61.149[.]112"
    - "212.11.39[.]138"
    - "195.86.120[.]2"
    - "64.7.198[.]130"
  urls: []

sources:
  - name: "Kaspersky Securelist (GReAT — Saurabh Sharma, Yaroslav Kikel)"
    date: "2026.07.30"
    title: "OctLurk and SilkLurk: newly identified tailored backdoors in cyber-espionage campaign in Central Asia"
    url: "https://securelist.com/octlurk-silklurk-backdoors-central-asia/120840/"
---

## 개요

Kaspersky **GReAT**(Saurabh Sharma, Yaroslav Kikel)은 **2025년 1월부터** 중앙아시아 국가들의 정부·핵심 인프라를 표적으로 한 사이버 스파이 캠페인에서 **미공개 백도어 2종 — OctLurk와 SilkLurk** — 을 발견했다. 두 계열은 별개 코드지만 **동일 스테이징 디렉터리(`C:\ProgramData\intel\`)와 공유 C2 인프라**를 사용하며, **일부 피해자에서 두 백도어가 동시 발견**됐다는 점이 결정적 연결 근거다.

| 항목 | 내용 |
|---|---|
| 관찰 시기 | 2025년 1월~ (2026-03 카자흐스탄 인프라 중첩 발견) |
| 표적 지역 | **아프가니스탄, 키르기스스탄, 타지키스탄, 우즈베키스탄, 카자흐스탄, 시리아** |
| 표적 산업 | 정부·외무부, 의료·연구, 법 집행, 물류, 도시 계획·시설 관리, 공공 교육 |
| 백도어 1 | **OctLurk** — 서비스 기반 로더 + 플러그인 방식 |
| 백도어 2 | **SilkLurk** — 정상 바이너리 DLL Side Loading, 피해자별 암호화 |
| 보조 도구 | **LurkProxy**(SOCKS5 리버스 프록시), PlugX(2차 페이로드) |
| 귀속 | **중국어 사용 행위자** (중간 신뢰) — PlugX 사용·공유 인프라 근거 |
| 공유 C2 | OctLurk의 `dns[.]ssentialserv[.]xyz` ↔ TrustFall/MystRodX/SilentRaid 인프라 중첩 (`154.196.162[.]76`) |

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/01-octlurk-deploy.png" alt="OctLurk 배포 시퀀스" caption="▲ Figure 1 — OctLurk 배포 시퀀스: 예약 작업 `GoogleUpDate` → `1.bat` → `NgcCIntSvc` 서비스 생성 → `oleasapi.dll` 로드 (출처: Kaspersky Securelist)" >}}

---

## OctLurk — 서비스 로더 + 플러그인 백도어

### 배포 흐름

{{< attack-flow >}}
{{< step icon="fas fa-user-shield" title="① 관리자 자격증명 확보 → 예약 작업" >}}
공격자가 확보한 관리자 자격증명으로 **`GoogleUpDate`** 예약 작업 생성
{{< /step >}}
{{< step icon="fas fa-terminal" title="② 배치 스크립트 실행 (SYSTEM)" >}}
`C:\Users\<username>\Videos\1.bat`이 **SYSTEM 권한**으로 실행
{{< /step >}}
{{< step icon="fas fa-cog" title="③ NgcCIntSvc 서비스 생성" >}}
악성 로더 DLL `oleasapi.dll`을 로드하는 서비스 등록. 레지스트리의 **`ServiceMain`** 이 `RegisterService` 함수 호출
{{< /step >}}
{{< step icon="fas fa-network-wired" title="④ C2 접속 (dns[.]multitoconference[.]com:443)" >}}
소켓 연결로 커스텀 프로토콜 사용, 16바이트 헤더 + 무작위 10자 세션 문자열
{{< /step >}}
{{< step icon="fas fa-plug" title="⑤ 플러그인 3종 로드" >}}
File Manager · Command Shell · Interaction Manager 순차 로드
{{< /step >}}
{{< /attack-flow >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/02-servicemain-reg.png" alt="ServiceMain 레지스트리 설정" caption="▲ Figure 2 — ServiceMain 항목이 `oleasapi.dll`의 `RegisterService`를 지정하도록 구성된 레지스트리 (출처: Kaspersky Securelist)" >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/03-c2-resolve.png" alt="dns[.]ssentialserv[.]xyz 해상도 확인" caption="▲ Figure 3 — `dns[.]ssentialserv[.]xyz`가 `154.196.162[.]76`으로 해석되는 것을 확인하는 명령 (출처: Kaspersky Securelist)" >}}

### 난독화·암호화

- **이중 XOR 복호화**: 하드코딩 Key 1 + C: 드라이브 시리얼 번호 유도 Key 2
- **zlib 압축 해제**를 페이로드 경로·바이트에 적용
- 익스포트 함수(`Refresh`, `RegisterService`)도 동일 방식으로 복호화
- 하드코딩 XOR 키: **`FDrertgr##@QEWASGkio865ehyf98foidsjzhug874392dfsREFDfdsAGH43wea98h`**
- 통신 데이터 포맷: `[83바이트 랜덤 XOR 키][압축 크기][압축 해제 크기 + deflate(data)][14-41 랜덤 바이트]`

### 플러그인 3종

| 플러그인 | 명령 코드 | 기능 |
|---|---|---|
| **File Manager** | `0x10020~0x20110` | 드라이브 열거, 파일 검색, 재귀 목록, 실행, 파일 조작, 읽기/쓰기 |
| **Command Shell** | `0x3E9~default` | `cmd.exe` 실행, 명령 전달, 출력 캡처 |
| **Interaction Manager** | `0x3E9~0x3FE` | 스크린샷, 클립보드 접근, 키보드·마우스 이벤트 합성 |

### 대체 서비스명 (변종)

`NgcCIntSvc`, `Cusrxsrv`, `specitsrc`, `cmtastsvc`, `PNRPHostSvc`, `vmictimerosync`, `vmicagent`

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/04-cusrxsrv-reg.png" alt="Cusrxsrv 서비스 레지스트리" caption="▲ Figure 4 — `Cusrxsrv` 서비스 등록 — `msbasesysdc.dll` 로드용 (출처: Kaspersky Securelist)" >}}

---

## LurkProxy — SOCKS5 리버스 프록시 (OctLurk 자매 도구)

- **OctLurk 로더와 거의 동일 아키텍처** — 페이로드만 프록시로 교체
- 하드코딩 포트 **`64980`** 리스닝
- C2: `dns[.]ssentialserv[.]xyz` → `154.196.162[.]76`

| 명령 코드 | 기능 |
|---|---|
| `0x1000010` | 신규 클라이언트 연결 |
| `0x1000030` | 종료 |
| `0x1000050` | 바이트 포워딩 |

---

## SilkLurk — 정상 바이너리 DLL Side Loading

### 배포 흐름

공격자는 **여러 정상 서명 바이너리를 배치**하고 각각에 악성 DLL을 사이드로딩시켜 백도어를 메모리에 인젝션한다.

| 정상 바이너리 | 사이드로딩 DLL |
|---|---|
| `NetSetSvc.exe` | `nvml.dll` |
| `nvgwls.exe` | `vulkan-1.dll` |
| `RtkSmbus.exe` | `RtkSmbusLoc.dll` |
| `RtkNGUI64.exe` | `RtkNGUI64Loc.dll` |

DLL이 로더로 동작하며 최종적으로 **SilkLurk 백도어를 프로세스 메모리에 인젝션**한다.

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/12-silklurk-loader-diagram.png" alt="SilkLurk 로더 동작 다이어그램" caption="▲ Figure 12 — 정상 바이너리 실행 → 악성 DLL 사이드로드 → 서비스 지속성 생성 흐름 (출처: Kaspersky Securelist)" >}}

### 피해자별 암호화 — 컴퓨터 이름 해시 기반

이 부분이 SilkLurk의 핵심 특징이다.

- **컴퓨터 이름의 32-bit dword 해시**를 키로 활용
- `IMAGE_DOS_HEADER`는 0으로 마스킹
- `IMAGE_NT_HEADERS`, **재배치 엔트리** 모두 컴퓨터 이름 해시로 XOR 복호화
- Import DLL/API 이름은 별도 하드코딩 단일 바이트 키로 XOR

즉, **각 피해자마다 유일한 키로 암호화**된 페이로드가 사용되어 샘플 간 자동 분류·역공학이 어려워진다.

### 설정 구조 (0x4AC bytes)

```
[0x10 bytes  ] Mutex 이름
[0x49C bytes ] 암호화된 설정
  - 0x00 : C2 host 1
  - 0x64 : C2 host 2
  - 0xC8 : C2 host 3
  - 0x12C: C2 host 4
  - 0x190~0x196 : 포트
  - 이후 프록시 주소·자격증명
```

### C2 프로토콜

- **TLS 위에서 커스텀 바이너리 프로토콜**
- 압축(zlib) + 이중 XOR
- 매직 dword **`0x0C7FFBE86`**
- 초기 32바이트 랜덤 네트워크 키 + magic → 커스텀 알고리즘으로 암호화
- 메시지 헤더: `[매직][타입][데이터 크기][압축 플래그][랜덤 바이트 크기]`

| 메시지 타입 | 기능 |
|---|---|
| `03` | 시스템 시간 조회, 재접속 sleep 간격 설정 |
| `04` | 현재 설정 전송 |
| `05` | 설정 업데이트 |
| `06` | 플러그인 수신·인젝션 |

### 지속성

- 서비스명 **`RmSs`**, `SERVICE_WIN32_OWN_PROCESS`, `SERVICE_AUTO_START`, 실패 시 재시작

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/13-silklurk-drop.png" alt="SilkLurk 로더 드롭 흔적" caption="▲ Figure 13 — OctLurk 명령 셸에서 SilkLurk 로더(`vulkan-1.dll`)를 드롭하는 흔적 (출처: Kaspersky Securelist)" >}}

---

## 귀속 — 중국어 사용 행위자 (중간 신뢰)

### 근거 요약

1. **동일 스테이징 디렉터리** — 두 백도어 모두 `C:\ProgramData\intel\` 사용
2. **동일 피해자 다중 감염** — 일부 조직에서 OctLurk + SilkLurk 병존
3. **PlugX 2차 페이로드** — SilkLurk가 배포한 PlugX(`gycudore[.]kozow[.]com` C2) → 2008년부터 중국어 사용 행위자와 강한 연계
4. **공유 인프라** — OctLurk의 `dns[.]ssentialserv[.]xyz` ↔ `154.196.162[.]76`은 **TrustFall/MystRodX/SilentRaid**(카자흐스탄 표적) 인프라와 중첩 (2026-03 발견)
5. **DDNS 서브도메인 명명 패턴** — 랜덤 키보드 매싱 형태(`tyhbgtyuj`, `wedfcvbn`, `rgnojb`, `uyhvfredc`, `ctyuhjerf`, `gycudore`)로 gleeze/kozow/casacam/accesscam 등 DDNS 프로바이더 반복 사용

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/15-ktae-plugx.png" alt="KTAE 유사도 — kmsonline.exe vs PlugX" caption="▲ Figure 15 — Kaspersky Threat Attribution Engine(KTAE)이 `kmsonline.exe`와 알려진 PlugX 샘플 간 유사도를 시각화 (출처: Kaspersky Securelist)" >}}

---

## 후속 도구 — 광범위 프로파일링

공격자는 감염 후 **정상 도구·오픈소스 유틸리티를 광범위**하게 배포한다.

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/05-fingerprint-batch.png" alt="피해자 지문 수집 배치 실행" caption="▲ Figure 5 — 피해자 지문 수집 배치 스크립트 실행 (시스템 정보 수집) (출처: Kaspersky Securelist)" >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/06-wevtutil-security.png" alt="wevtutil로 원격 로그온 이벤트 조회" caption="▲ Figure 6 — `wevtutil`로 성공한 원격 로그온(Security 이벤트) 조회 (출처: Kaspersky Securelist)" >}}

| 도구 | 위장명 (MD5) | 용도 |
|---|---|---|
| Impacket **secretsdump** | `Adobe.exe` (`32a5985543433a4f60da2fafd873b927`) | 자격증명 추출 |
| **키로거** | `AnyDesk.exe` (`2a571f6cee42a17d873f4c942649813f`) | 키 입력·클립보드 수집 (바이트 감산 인코딩) |
| 브라우저 패스워드 스틸러 | `64.exe`/`x64.exe` (`37dc84e4bcad92fa28f1e7778d088283`) | Chrome/Firefox 자격증명 |
| **FSCAN** | `fc.exe` (`cf903e4a1629aa0582fd0363b5786676`) | 내부 네트워크 스캔 |
| **Pandora FMS RC Agent** | (예약 작업 통해 설치) | 원격 접근 채널 |
| WinRAR | `RecordedTV.exe`/`recordutil.exe` (`18dc8bff47cc282508354771d0c8cf8c`) | 데이터 아카이빙 |
| 7-Zip | `7z.exe` (`9a1dd1d96481d61934dcc2d568971d06`) | 데이터 아카이빙 |
| PlugX 드로퍼 | `kmsonline.exe` (`3c9a1ba8e0c7475706adc6376e9d7b7c`) | 2차 페이로드 |
| PlugX 로더 | `RasTls.dll` (`ef59aad625eebda8650aec5820d6ce69`) | Symantec 위장 사이드로드 |

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/07-secretsdump.png" alt="Impacket secretsdump 실행" caption="▲ Figure 7 — Impacket secretsdump 실행 (Adobe.exe 위장) (출처: Kaspersky Securelist)" >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/08-keylogger-task.png" alt="키로거 예약 작업" caption="▲ Figure 8 — AnyDesk 예약 작업으로 위장한 키로거 지속성 (출처: Kaspersky Securelist)" >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/09-pandora-fms.png" alt="Pandora FMS RC 에이전트 설치 명령" caption="▲ Figure 9 — Pandora FMS RC Agent 설치 명령(EHUSER, STARTEHORUSSERVICE, EHORUSINSTALLFOLDER 파라미터) (출처: Kaspersky Securelist)" >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/10-fscan.png" alt="FSCAN 내부 네트워크 스캔" caption="▲ Figure 10 — FSCAN이 `%TEMP%\result.txt`로 결과 리다이렉트하며 내부 네트워크 스캔 (출처: Kaspersky Securelist)" >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/11-mailbox-curl.png" alt="mailbox curl 열거" caption="▲ Figure 11 — 메일 서버 대상 curl 명령으로 사서함 열거 (출처: Kaspersky Securelist)" >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/14-exfil-archive.png" alt="PowerShell + WinRAR/7-Zip 아카이빙" caption="▲ Figure 14 — 데이터 유출을 위한 PowerShell + WinRAR/7-Zip 아카이빙 명령 (출처: Kaspersky Securelist)" >}}

{{< img src="/images/posts/kaspersky-octlurk-silklurk-central-asia-2026/16-exastsrc-service.png" alt="ExAstSrc 서비스 생성 명령" caption="▲ Figure 16 — OctLurk 배포에 사용된 `ExAstSrc` 서비스 생성 명령 (출처: Kaspersky Securelist)" >}}

---

## IoC (선별)

### OctLurk C2 도메인·IP
- `dns[.]multitoconference[.]com`
- `dns[.]ssentialserv[.]xyz` (LurkProxy 공유)
- `tj[.]tajikistandip[.]com`
- `fm01[.]clouddevicemetrics[.]com`
- `confbase[.]mdpsupport[.]net`
- `digital[.]leroymerling[.]com`
- `api2[.]annoyingremote[.]com`
- `about[.]blsouqs[.]com`, `ssl[.]blsouqs[.]com`
- `45.138.157[.]165`
- `154.196.162[.]76` (공유 인프라 — TrustFall 계열 중첩)

### SilkLurk C2 도메인·IP
- `tyhbgtyuj[.]gleeze[.]com` → `95.179.210[.]138`
- `wedfcvbn[.]gleeze[.]com` → `45.77.136[.]228`
- `rgnojb[.]casacam[.]net` → `95.179.141[.]26`
- `ctyuhjerf[.]kozow[.]com` → `45.32.152[.]50`
- `uyhvfredc[.]accesscam[.]org` → `154.196.187[.]73`
- 그 외 IP: `212.11.39[.]138`, `195.86.120[.]2`, `45.61.149[.]112`

### PlugX (SilkLurk 2차 페이로드)
- C2: `gycudore[.]kozow[.]com` → `64.7.198[.]130`

### 주요 파일 MD5 (24건)
- **OctLurk 로더**: `082d49ef9f14e6811d68c7e0e82e5069` (`oleasapi.dll`), `f4578e869a735cfad691f927bae3e638` (`msbasesysdc.dll`), `7c2f64461bb519c6cbf1fc687675514c` (`mscastrac.dll`)
- **SilkLurk 로더**: `8269d6ba1b6842f9152c90cf7add9b93` (`vulkan-1.dll`)
- **OctLurk 백도어 본체**: `a0cc7accc79abb0287aaba825d0351f0`
- **OctLurk 플러그인**: `a56cce62930a6bee80d679b4c495a340` (File Manager), `1415a78b75de7db4ba3d1e61d7db4501` (Command Shell), `a4d550a3ba0cd073fe3839b99d98a7a8` (Interaction Manager)
- 나머지 15개(secretsdump, 키로거, 스틸러, FSCAN, PlugX 등)는 frontmatter 참조

### 서비스명
- OctLurk: `NgcCIntSvc`, `Cusrxsrv`, `specitsrc`, `cmtastsvc`, `PNRPHostSvc`, `vmictimerosync`, `vmicagent`
- SilkLurk: `RmSs`
- PlugX: `SymantecRAS`

### 예약 작업
- **`GoogleUpDate`** (OctLurk 배포·지문)
- **`AnyDesk`** (키로거 실행)

### 주요 파일 경로 (선별)
- OctLurk: `C:\Windows\System32\oleasapi.dll`, `C:\Windows\Media\Welcome01.wav`, `C:\Users\Public\Libraries\msect\dev0`(키로거 출력), `\dev1`(클립보드)
- SilkLurk: `C:\ProgramData\intel\vulkan-1.dll`, `C:\ProgramData\HP\NCCOM\vulkan-1.dll`, `C:\Program Files\nvidia corporation\display.nvcontainer\plugins\vulkan-1.dll`
- SilkLurk 설정: `%APPDATA%\2470b666bece868f`, `27879a4df1a740ff`
- PlugX: `C:\ProgramData\Symantec\RasTls.dll`, `RasTls.dll.res`

---

## MITRE ATT&CK

| Tactic | Techniques |
|---|---|
| Privilege Escalation | T1136.001 — Create Account |
| Persistence | T1547.001 — Registry Run Keys / T1037 — Boot Scripts |
| Execution | T1059.001, T1059.003 |
| Credential Access | **T1555** — Credentials from Password Stores / T1110 — Brute Force |
| Collection | T1005, T1115, **T1056.001** — Keylogging |
| Discovery | T1082, T1057, T1012, T1518, T1518.001, T1135, T1040 |
| Lateral Movement | T1021.001 (SSH), T1021.004 (MySQL) |
| C2 | T1557.001 — MITM Proxy |

---

## 방어 권고

| 영역 | 권고 |
|---|---|
| 예약 작업 | **`GoogleUpDate`** / **`AnyDesk`** 명칭의 예약 작업 생성 이벤트 알림 |
| 서비스 등록 | `NgcCIntSvc`, `RmSs`, `Cusrxsrv`, `specitsrc`, `cmtastsvc`, `PNRPHostSvc`, `vmictimerosync`, `vmicagent`, `SymantecRAS` 서비스 생성 실시간 탐지 |
| DLL Side Loading | `nvml.dll`, `vulkan-1.dll`, `RtkSmbusLoc.dll`, `RtkNGUI64Loc.dll`이 **비표준 경로**(`C:\ProgramData\`, `C:\Users\Public\`)에서 로드되는 이벤트 알림 |
| 스테이징 경로 | **`C:\ProgramData\intel\`** 의 신규 실행/DLL 파일 모니터링 |
| 도구 위장 | `Adobe.exe`, `AnyDesk.exe`가 비정상 경로에서 실행 시 알림 (Impacket·키로거 위장) |
| C2 트래픽 | 위 IoC IP·DDNS 서브도메인(gleeze/kozow/casacam/accesscam) 아웃바운드 차단 |
| 자격증명 노출 | Chrome/Firefox 자격증명 저장소·DPAPI 접근 EDR 룰 |

Kaspersky 고객은 **Threat Intelligence Reporting** 서비스(`intelreports@kaspersky.com`)를 통해 추가 탐지 시그니처 제공.

---

## 시사점

이 캠페인의 특이점은 **"두 개의 별개 백도어 + 공유 인프라 + 피해자별 암호화"** 삼중 구조다. SilkLurk의 **컴퓨터 이름 해시 기반 페이로드 암호화**는 자동 샘플 분류·역공학을 크게 어렵게 만들며, OctLurk와 함께 **동일 조직에 병존**시켜 **하나가 탐지·차단돼도 다른 채널로 유지**되게 한 이중화 전략이 관찰됐다. PlugX 배포와 TrustFall 계열 인프라 중첩은 중앙아시아를 상시 표적화하는 **중국어 사용 행위자의 도구·인프라 재활용 패턴**을 다시 보여준다.
