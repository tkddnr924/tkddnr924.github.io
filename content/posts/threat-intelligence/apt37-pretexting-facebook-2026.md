---
title: "APT37의 페이스북 위장 접근 및 소프트웨어 변조 공격 분석"
date: 2026-05-25T03:40:04+09:00
categories: ["Threat Intelligence"]
tags: ["APT37", "북한", "RokRAT", "Pretexting", "Social Engineering", "Process Injection", "Fileless", "Zoho"]
author: "tkddnr924"
summary: "북한 연계 APT37이 페이스북 위장 계정으로 표적을 사전 접촉한 뒤 변조된 PDF 뷰어 설치 파일로 RokRAT 변종을 배포하는 정교한 다단계 공격이 확인됐다. PE 패칭, 3중 XOR 암호화, 파일리스 실행, Zoho WorkDrive C2 활용이 특징이다."

iocs:
  hashes:
    - "c681fe3f42e82e9240afe97c23971cbc"
    - "d44a22d2c969988a65c7d927e22364c8"
    - "28d0143718153bf04c1919a26bb70c2d"
    - "36be2cbb59cd1c3f745d5f80f9aee21c"
  domains:
    - "japanroom[.]com"
  ips:
    - "38.32.68[.]195"
    - "222.122.49[.]15"
  urls: []
sources:
  - name: "지니언스 시큐리티 센터"
    date: "2026.05"
    title: "APT37의 프리텍스팅 기반 표적 침투: 페이스북 사전 정찰 및 소프트웨어 변조 공격 분석"
    url: "https://www.genians.co.kr/blog/threat_intelligence/pretexting"
---

## 개요

지니언스 시큐리티 센터(GSC)는 북한 연계 위협 그룹 **APT37(Reaper)이** 페이스북 위장 계정으로 표적에 접근한 뒤, 변조된 PDF 뷰어 설치 파일을 통해 **RokRAT 변종**을 배포하는 캠페인을 확인했다. 단순한 악성 첨부 파일 배포가 아닌, 장기적인 신뢰 형성(pretexting)을 거친 표적 침투 방식이 특징이다.

{{< img src="/images/posts/apt37-pretexting-facebook-2026/01-attack-overview.png" alt="APT37 전체 공격 흐름 개요" caption="▲ APT37 캠페인 전체 공격 흐름 — 초기 접근부터 C2 통신까지 (출처: 지니언스)" >}}

---

## 위협 행위자 프로파일

| 항목 | 내용 |
|---|---|
| 그룹명 | APT37 (Reaper, ScarCruft) |
| 배후 | 북한 국가보위성 (MSS) |
| 주요 표적 | 군사·방산·정책 연구 분야 종사자 |
| 귀속 근거 | RokRAT 코드 유사성, Zoho 인프라 재사용, 북한 언어 지표, 디버그 문자열 "JinHyok" |

---

## 공격 흐름

{{< attack-flow >}}
{{< step icon="fas fa-user-secret" title="페이스북 위장 계정 구축" >}}
평양·평성 소재로 등록된 Facebook 계정 2개 동시 생성 (2025-11-10).  
`richardmichael0828`, `johnsonsophia0414` — 친구 신청 후 메신저로 신뢰 관계 형성
{{< /step >}}
{{< step icon="fab fa-telegram" title="텔레그램 전환 및 미끼 파일 전달" >}}
대화를 텔레그램으로 이동 후 "암호화된 군사 문서 열람을 위한 전용 PDF 뷰어" 설치를 요청.  
암호화된 ZIP으로 변조 설치 파일 + 디코이 PDF + 가짜 안내서 전달
{{< /step >}}
{{< step icon="fas fa-comment-dots" title="북한식 한국어 지표 확인" >}}
`설명서.txt` 내 "콤퓨터", "프로그람", "화일" 등 북한식 표현 — 작성자 귀속 근거
{{< /step >}}
{{< step icon="fas fa-file-code" title="변조 인스톨러 실행 (PE 패칭)" >}}
`Wondershare_PDFelement_Installer(PDF_Security).exe` — 유효 서명 없음.  
진입점을 `0x00114103` → `0x0015A0E0`으로 변조, `.text` 섹션 코드 케이브에 **약 2KB 셸코드** 삽입
{{< /step >}}
{{< step icon="fas fa-syringe" title="프로세스 인젝션 (dism.exe)" >}}
셸코드가 `CreateProcessA(CREATE_SUSPENDED)`로 `dism.exe` 정지 상태 생성 →  
`VirtualAllocEx` + `WriteProcessMemory`로 XOR(0x6D) 복호화 페이로드 주입 →  
`CreateRemoteThread`로 실행
{{< /step >}}
{{< step icon="fas fa-image" title="C2 통신 — JPG 위장 2차 페이로드 다운로드" >}}
복호화된 C2 URL: `http://japanroom[.]com/board/DATA/1288247428101.jpg`  
`wininet.dll` 동적 로드 후 약 10MB 수신 버퍼로 JPG 위장 2차 페이로드 다운로드
{{< /step >}}
{{< step icon="fas fa-ghost" title="파일리스 메모리 실행" >}}
2차 페이로드에 2차 XOR(0x6F) 복호화 적용 → x86 프롤로그(0x55 0x8B) 검증 →  
**MZ·PE 헤더 제거** 후 메모리에서만 직접 실행 (파일리스)
{{< /step >}}
{{< step icon="fas fa-cloud-upload-alt" title="RokRAT 배포 및 데이터 탈취" >}}
Zoho WorkDrive C2를 통해 스크린샷·문서·오디오 파일 수집.  
AES-256-CBC 암호화 후 유출. `OfficeUpdate.exe` 루어 파일로 지속성 유지
{{< /step >}}
{{< /attack-flow >}}

---

## 핵심 기법 분석

{{< img src="/images/posts/apt37-pretexting-facebook-2026/02-telegram-transfer.png" alt="텔레그램 파일 전달 화면" caption="▲ 위협 행위자가 텔레그램에서 m.zip 파일을 전달하는 화면 (출처: 지니언스)" >}}

{{< img src="/images/posts/apt37-pretexting-facebook-2026/03-nk-language.png" alt="설명서.txt 북한식 언어 지표" caption="▲ 설명서.txt 내 북한식 한국어 표현 — '콤퓨터', '프로그람', '화일' (출처: 지니언스)" >}}

### 1. PE 패칭 — 코드 케이브 인젝션

정상 Wondershare PDFelement 설치 파일의 `.text` 섹션 빈 공간(코드 케이브)에 셸코드를 삽입하고 진입점을 변조한다. 설치가 완료되면 정상 PDFelement가 실제로 설치되어 사용자의 의심을 낮춘다.

{{< img src="/images/posts/apt37-pretexting-facebook-2026/05-entry-point-compare.png" alt="정상/변조 설치 파일 진입점 비교" caption="▲ 정상 설치 파일(좌)과 변조 설치 파일(우)의 Entry Point 비교 (출처: 지니언스)" >}}

셸코드는 12단계로 구성된다:

| 단계 | 동작 |
|---|---|
| 1~3 | 진입점 리다이렉션, 프롤로그, `dism.exe` 경로 동적 구성 (4바이트 MOV) |
| 4~7 | API 해석, 프로세스 생성, 메모리 할당, 페이로드 주입 |
| 8 | 정상 진입점으로 복귀 |
| 9~10 | HTTP C2 통신 및 2차 페이로드 다운로드 |
| 11~12 | PEB 워킹 기반 API 해석, 위치 독립적 주소 계산 |

{{< img src="/images/posts/apt37-pretexting-facebook-2026/06-shellcode-flow.png" alt="셸코드 실행 흐름" caption="▲ 악성 셸코드 12단계 실행 흐름 다이어그램 (출처: 지니언스)" >}}

### 2. 3중 XOR 암호화 체인

| 단계 | 키 | 대상 |
|---|---|---|
| 1차 | `0x6D` | 인젝션 페이로드 |
| 2차 | `0x6F` | JPG 위장 2차 페이로드 |
| 3차 | `0xD0000` 블록 단위 | 파일리스 실행 전 최종 복호화 |

{{< img src="/images/posts/apt37-pretexting-facebook-2026/07-xor-decrypt.png" alt="C2 URL XOR 복호화 과정" caption="▲ C2 URL 5단계 XOR 복호화 과정 — 키 추출, 복호화 루프, 최종 URL 복원 (출처: 지니언스)" >}}

{{< img src="/images/posts/apt37-pretexting-facebook-2026/08-stage2-xor.png" alt="2차 페이로드 XOR 복호화" caption="▲ 2차 페이로드 XOR 복호화 루프 분석 (출처: 지니언스)" >}}

### 3. 탐지 우회 기법

- **문자열 난독화** — 4바이트 MOV 명령으로 스택에서 문자열 동적 조립
- **PEB 워킹** — Import Address Table 우회, API를 런타임에 직접 해석
- **JPEG 위장** — `.jpg` 확장자로 C2 페이로드 요청 (이미지 트래픽처럼 위장)
- **파일리스 실행** — MZ/PE 헤더 제거, 디스크 기록 없이 메모리에서만 실행
- **정상 인프라 악용** — 일본 부동산 사이트(`japanroom[.]com`)를 C2 프록시로 활용

### 4. RokRAT 수집 대상

`.DOC`, `.XLS`, `.PPT`, `.PDF`, `.HWP`, `.TXT`, `.M4A`, `.AMR`

Qihoo 360(`360Tray.exe`) 보안 솔루션 존재 여부를 확인하는 안티샌드박스 로직 포함.

---

{{< img src="/images/posts/apt37-pretexting-facebook-2026/09-binary-strings.png" alt="바이너리 문자열 — FBI TOOLKIT" caption="▲ 내장 바이너리 문자열 — 'FBI TOOLKIT GIDRA@TEAM' 등 서버 식별자 (출처: 지니언스)" >}}

## APT37 귀속 근거

| 지표 | 내용 |
|---|---|
| 코드 유사성 | 2025년 12월 RokRAT 변종과 코드 레벨 일치 |
| Zoho 재사용 | `scott.snyder@zoho.com` (2017) → `leon91729@zoho.com` (2025) |
| 디버그 문자열 | C2 통신 내 `"JinHyok"` |
| 언어 지표 | 북한식 한국어: "콤퓨터", "프로그람", "화일" |
| VPN 인프라 | Astrill VPN `38.32.68[.]195` — Recorded Future / Silent Push에서 Lazarus 연계 IP로 분석 |
| 계정 생성 패턴 | Facebook 계정 2개 동일 날짜(2025-11-10) 동시 생성 |

---

{{< img src="/images/posts/apt37-pretexting-facebook-2026/10-rokrat-compare.png" alt="2025년 12월 RokRAT 변종과 비교" caption="▲ 2025년 12월 RokRAT 변종(좌)과 현재 캠페인(우) 코드 비교 (출처: 지니언스)" >}}

## MITRE ATT&CK

| 전술 | 기법 |
|---|---|
| Initial Access | T1566 Phishing, T1598 Social Engineering |
| Execution | T1204 User Execution, T1059 Command & Scripting |
| Persistence | T1547 Boot/Logon Autostart |
| Defense Evasion | T1036 Masquerading, T1027 Obfuscated Files, T1140 Deobfuscate/Decode |
| Collection | T1113 Screen Capture, T1005 Data from Local System |
| Exfiltration | T1041 Exfiltration Over C2 Channel |
| C2 | T1071 Application Layer Protocol, T1090 Proxy |

---

## 탐지 권고

{{< img src="/images/posts/apt37-pretexting-facebook-2026/11-edr-process-tree.png" alt="EDR 프로세스 트리" caption="▲ EDR 기반 초기 침투 프로세스 트리 — 인스톨러 실행 후 dism.exe 자식 프로세스 생성 확인 (출처: 지니언스)" >}}

{{< img src="/images/posts/apt37-pretexting-facebook-2026/12-network-c2.png" alt="EDR C2 네트워크 통신 시도" caption="▲ EDR에서 탐지된 C2 네트워크 연결 시도 (출처: 지니언스)" >}}

{{< img src="/images/posts/apt37-pretexting-facebook-2026/13-memory-dump.png" alt="dism.exe 메모리 덤프 분석" caption="▲ dism.exe 프로세스 메모리 덤프에서 추출된 C2 주소 (출처: 지니언스)" >}}

- **SNS 접근 정책** — 출처 불명 친구 요청·메신저 파일 전달에 대한 보안 정책 수립
- **암호화 압축 파일** — 비밀번호 별도 전달 프로세스 강제화, 수신 경로 검증
- **설치 파일 서명 검증** — 디지털 서명 없는 인스톨러 실행 차단
- **EDR 프로세스 트리 분석** — 정상 인스톨러 실행 후 비정상 자식 프로세스 탐지
- **dism.exe 정지 생성 모니터링** — `CREATE_SUSPENDED` 플래그 동반 실행 탐지
- **Zoho WorkDrive API 트래픽** — OAuth 토큰 기반 비정상 접근 패턴 탐지
