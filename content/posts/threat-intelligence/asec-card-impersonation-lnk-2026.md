---
title: "카드사 '보안 메일' 사칭 악성 LNK 유포 분석 — Kimsuky 연계"
date: 2026-05-27T11:00:00+09:00
categories: ["Threat Intelligence"]
tags: ["Kimsuky", "북한", "LNK", "Phishing", "Info-Stealer", "Backdoor", "Keylogger", "mshta", "보안메일사칭"]
author: "tkddnr924"
summary: "국내 카드사의 '보안 메일'을 사칭해 악성 LNK 파일을 유포하는 캠페인이 확인됐다. mshta·HTA·VBScript로 이어지는 실행 흐름과 Windows Defender 상태에 따른 분기 실행이 특징이며, 정보 탈취·키로깅·백도어 기능을 수행한다. Kimsuky 그룹의 과거 LNK 유포 사례와 유사하다."

iocs:
  hashes: []
  domains: []
  ips: []
  urls:
    - "hxxps://drive.google[.]com/uc?export=download&id=1veetviG********"
    - "hxxps://drive.google[.]com/uc?export=download&id=1PTs95g********"
    - "hxxps://drive.google[.]com/uc?export=download&id=1EkyeoS********"
sources:
  - name: "안랩 ASEC"
    date: "2026.05.27"
    title: "'보안 메일'도 안심 금물! 카드사 사칭 악성 파일 유포 중"
    url: "https://asec.ahnlab.com/ko/93854/"
---

## 개요

안랩 ASEC은 국내 카드사의 **'보안 메일'을 사칭**해 악성 LNK 파일을 유포하는 캠페인을 확인했다. 공격자는 정상 보안 메일처럼 위장한 첨부 파일로 사용자를 속여 LNK 실행을 유도한 뒤, 정보 탈취·키로깅·원격 제어를 수행한다. 이번 캠페인은 **Kimsuky 그룹**의 과거 '비밀번호 파일 위장 악성 LNK 유포' 사례와 유사하나, 초기 실행 명령어가 변경된 형태로 확인됐다.

---

## 위협 행위자 프로파일

| 항목 | 내용 |
|---|---|
| 그룹명 | Kimsuky (Thallium, Velvet Chollima) |
| 배후 | 북한 연계 위협 그룹 |
| 유포 방식 | 보안 메일·비밀번호 파일 위장 악성 LNK |
| 귀속 근거 | 과거 LNK 유포 캠페인과 실행 흐름·구성 유사 (초기 명령어만 변형) |

---

## 공격 흐름

{{< attack-flow >}}
{{< step icon="fas fa-envelope-open-text" title="카드사 보안 메일 사칭" >}}
국내 카드사의 '보안 메일'을 사칭한 메일에 악성 LNK 파일 첨부 → 사용자 실행 유도
{{< /step >}}
{{< step icon="fas fa-terminal" title="LNK → PowerShell → mshta" >}}
LNK 내부 PowerShell 코드가 `mshta`를 실행해 원격 서버의 HTA 파일을 가져와 실행
{{< /step >}}
{{< step icon="fas fa-file-code" title="HTA 내 난독화 VBScript 실행" >}}
난독화된 VBScript가 정상 문서(디코이)를 표시해 의심을 낮추고, 백그라운드에서 악성 동작 수행
{{< /step >}}
{{< step icon="fas fa-shield-halved" title="Windows Defender 상태 확인 (분기)" >}}
Defender 서비스 활성 여부를 점검해 두 갈래로 분기 실행
{{< /step >}}
{{< step icon="fas fa-download" title="페이로드 다운로드 및 실행" >}}
분기에 따라 암호화된 페이로드를 내려받아 AES 복호화 후 정보 탈취·키로깅·백도어 동작 개시
{{< /step >}}
{{< /attack-flow >}}

{{< img src="/images/posts/asec-card-impersonation-lnk-2026/01-vbscript.png" alt="난독화된 VBScript 코드" caption="▲ mshta를 통해 실행되는 난독화된 VBScript 코드 (출처: AhnLab ASEC)" >}}

---

## 분기 실행 로직

악성코드는 **Windows Defender 서비스의 활성 여부**를 점검한 뒤 두 갈래로 동작이 갈린다.

### 분기 A — Windows Defender 활성

| 단계 | 내용 |
|---|---|
| 다운로드 | `curl`로 암호화된 `pipe.log` 다운로드 |
| 복호화 | AES 복호화 후 `pipe.zip`으로 저장 |
| 압축 해제 | `1.log`, `1.ps1`, `2.log` 3개 파일 추출 |

추출 파일별 기능:

| 파일 | 기능 |
|---|---|
| `1.log` | 정보 탈취 및 백도어 동작 |
| `1.ps1` | 파일을 읽어 Base64 디코드한 코드를 메모리에서 실행 |
| `2.log` | 키로깅 및 클립보드 데이터 수집 |

{{< img src="/images/posts/asec-card-impersonation-lnk-2026/02-pipe-zip.png" alt="pipe.zip 내부 파일" caption="▲ pipe.zip 압축 해제 시 확인되는 1.log·1.ps1·2.log 파일 (출처: AhnLab ASEC)" >}}

### 분기 B — Windows Defender 비활성

| 단계 | 내용 |
|---|---|
| 다운로드 | `%LocalAppData%`에 `user.txt`, `sys.log` 다운로드 |
| 복호화 | 내장 AES 키로 `sys.log`를 복호화 → `sys.dll` 저장 |
| 로드 | `rundll32`로 `sys.dll` 로드 (다운로더 악성코드) |
| 분석 회피 | VirtualBox·VMware 가상환경 탐지 시 실행 중단 |
| URL 추출 | `user.txt` 복호화로 3개 Google Drive 다운로드 URL 획득 |
| 2차 페이로드 | `notepad.log`, `net`, `app` 다운로드 |

---

## 최종 페이로드 상세

### notepad.log — 백도어

- 원격 명령 실행 및 파일 조작
- 호스트 정보 수집
- 브라우저 확장 프로그램 탐지
- 암호화폐 지갑 경로 스캔
- MeshAgent 원격 관리 도구 설치
- 키로깅 및 클립보드 데이터 탈취

### net — 인포스틸러 (계정/메일)

- 브라우저 계정: **Chrome, Firefox**
- 이메일 클라이언트 자격증명: **Thunderbird, Group Mail, IncrediMail**

{{< img src="/images/posts/asec-card-impersonation-lnk-2026/03-net-code.png" alt="net 파일 코드 일부" caption="▲ net 인포스틸러 코드 일부 (출처: AhnLab ASEC)" >}}

### app — 인포스틸러 (쿠키)

- Chrome 메인 프로세스에 복호화된 코드를 **인젝션**
- **Chrome, Edge, Whale** 브라우저 쿠키 탈취 및 유출

{{< img src="/images/posts/asec-card-impersonation-lnk-2026/04-app-code.png" alt="app 파일 코드 일부" caption="▲ app 인포스틸러 코드 일부 — Chrome 프로세스 인젝션 (출처: AhnLab ASEC)" >}}

---

## 대응 방안

| 조치 | 내용 |
|---|---|
| 메일·파일 출처 검증 | 카드사 '보안 메일' 사칭 주의, 첨부 파일 형식(LNK) 확인 후 실행 |
| 레지스트리 점검 | 지속성 확보용 의심 레지스트리 항목 확인 및 삭제 |
| 잔존 파일 제거 | `%TEMP%` 및 `%LocalAppData%\pipe` 경로의 의심 파일 삭제 |
| LNK 실행 모니터링 | LNK → `mshta` → `rundll32` 실행 체인 탐지 |
