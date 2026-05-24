---
title: "Nimbus Manticore의 이란 분쟁 기간 작전 분석"
date: 2026-05-25T10:00:00+09:00
categories: ["Threat Intelligence"]
tags: ["Nimbus Manticore", "IRGC", "APT", "MiniFast", "AppDomain Hijacking", "SEO Poisoning"]
author: "tkddnr924"
summary: "이란 분쟁 기간 중 IRGC 연계 위협 그룹 Nimbus Manticore의 3단계 작전을 분석합니다. AppDomain Hijacking, AI 보조 악성코드 개발, SEO 포이즈닝 등 고도화된 기법이 확인됐습니다."

iocs:
  hashes:
    - "10fd541674adadfbba99b54280f7e59732746faf2b10ce68521866f737f1e46d"
    - "eee657ffdb2af8ed6412221e7d5fbf4f5742f2ac2c88f43f12db46af0697de71"
    - "781605ce9d4a9869e846f6c9657d71437cb6240ab27ffbc4cd550c0e06996690"
    - "2c214494fd0bad31473ca8adce78a4f50847876584571e66aadeae70827ec2dc"
    - "f08b17856616d66492a24dced27f788e235f35f42fa7cd10f315000d3a2f4c03"
    - "a57ffb819fe8d98ff925c5d7b239598fe302acf5a13193d7a535040a71298fdf"
    - "63d0d3c4a7f71bdbca720903d6a99b832089cc093c64d2938e7e001e56c17ab4"
    - "74882085db2088356ed7f72f01e0404a0a98cda88ef56fb15ce74c1f36b26d27"
    - "bc3b44154518c5794ce639108e7b9c5fecb0c189607a26de1aaed518d890c7ad"
    - "ecaf493c320d201d285ef5f61d75744216e47cf1115b4af528f9a78883cc446e"
    - "44f4f7aca7f1d9bfdaf7b3736934cbe19f851a707662f8f0b0c49b383e054250"
    - "0db36a04d304ad96f9e6f97b531934594cd95a5cea9ff2c9af249201089dc864"
    - "485f182f7b74ee4013b2539275a95d21e3a9bf0082c331937af9353a324b36f3"
    - "64530d7e6ee30e4a66d9eeed6b8595c33fd72f5f73409133ca40539e5695df4c"
    - "332ba2f0297dfb1599adecc3e9067893e7cf243aa23aedce4906a4c480574c17"
    - "9e4a658e6d831c9e9bdfe11884a75b7c64812ed0a80e8495ddf6b316505acac1"
    - "43dc62cef52ebdd69e79f10015b3e13890f26c058325c0ff139c70f8d8eadcfa"
    - "8808c794c24367438f183e4be941876f1d3ecd0c8d2eb43b10d2380841d2283b"
    - "5c3362d20229597d11380f56d1f2eb39647fb6afad7be8392a7abcd18dff12f8"
    - "0291ef318576953f7f3fe287e7775ed1d7c3206119dc7b9cd6d85c02779e6e40"
    - "d4a7e9f107fe40c1a5d0139c6c6e25bf6bf57f61feff090bee28f476bb3cc3c2"
    - "38bd137c672bd58d08c4f0502f993a6561e2c3411773d1ae57ee0151a0a9d11d"
    - "f54cd38632ac9da3af3533ae93e92625cbcb04df521dbf1b6acfaa81218f9e8c"
    - "b19e06da580cf91691eda066ac9ee4b09c6e5dc26c367af12660fe1f9306eec4"
    - "9cf029daca89523d917dafed0568d11d00e45ec96b5b90b4a1f7fd4018c7da84"
    - "a13ba3c5aff46e9daf2d23df4b3e3d49dc7236c207c56f0a1433051f3450d441"
    - "dfa1e3137a032ee8561a1cd5e1a0f71a10bebb36aef7c336c878638a9c1239ee"
  domains:
    - "business-startup[.]org"
    - "business-startup.azurewebsites[.]net"
    - "businessstartup.azurewebsites[.]net"
    - "buisness-centeral.azurewebsites[.]net"
    - "buisness-centeral-transportation.azurewebsites[.]net"
    - "buisness-centeral-transportation[.]com"
    - "licencemanagers.azurewebsites[.]net"
    - "licencesupporting.azurewebsites[.]net"
    - "peerdistsvcmanagers.azurewebsites[.]net"
    - "nanomatrix.azurewebsites[.]net"
    - "PremierHealthAdvisory[.]com"
    - "PremierHealthAdvisory.azurewebsites[.]net"
    - "Premier-HealthAdvisory.azurewebsites[.]net"
    - "ramiltonsfinance[.]com"
    - "ramiltonsfinance.azurewebsites[.]net"
    - "ramiltons-finance.azurewebsites[.]net"
    - "globalitconsultants.azurewebsites[.]net"
    - "globalit-consultants.azurewebsites[.]net"
    - "global-it-consultants.azurewebsites[.]net"
    - "global-it-checkers.azurewebsites[.]net"
    - "global-it-checkbusiness.azurewebsites[.]net"
    - "global-check-itbusiness.azurewebsites[.]net"
    - "global-check-business-it.azurewebsites[.]net"
    - "globalbusiness-checkers-it.azurewebsites[.]net"
    - "getsqldeveloper[.]com"
---

## 개요

Check Point Research는 이란 군사 분쟁이 진행 중이던 2026년 2~4월, IRGC(이란 혁명수비대) 연계 위협 그룹 **Nimbus Manticore**(Google: UNC1549)가 세 차례의 연속적인 사이버 작전을 수행한 사실을 공개했다. 해당 그룹은 이란이 군사적 압박을 받는 상황에서도 고도화된 인프라를 유지하며 항공·소프트웨어 분야 표적을 지속적으로 공격했다.

---

## 위협 행위자 프로파일

| 항목 | 내용 |
|---|---|
| 그룹명 | Nimbus Manticore (UNC1549) |
| 배후 | IRGC (이란 혁명수비대) |
| 주요 표적 | 항공, 방산, 통신, 소프트웨어 |
| 피해 지역 | 이스라엘, UAE, 사우디, 호주, **미국** (신규) |
| 특이사항 | 이란 가장 정교한 연계 APT 그룹 중 하나로 평가 |

---

## 3단계 작전 타임라인

### 1단계 — Rising Tension (2026년 2월)
미국의 군사 작전(Operation Epic Fury) 시작 수 주 전, 그룹은 **AppDomain Hijacking** 기법을 처음 도입했다. 사우디아라비아·호주 기업을 사칭한 채용 피싱 메일을 통해 악성 ZIP 파일을 배포했으며, OnlyOffice 플랫폼을 배포 채널로 악용했다.

### 2단계 — Operation Epic Fury (2026년 3~4월)
미국 군사 작전 개시 직후에도 인프라를 유지하며 공격을 지속했다. **트로이목마 Zoom 설치 파일**을 제작해 가짜 회의 초대 메일로 배포했으며, 미국 국내 항공사를 사칭한 피싱 캠페인으로 처음으로 **미국 내 표적을 직접 공략**했다. 이 단계에서 신형 백도어 **MiniFast**가 처음 등장했다.

### 3단계 — Post-Ceasefire SQL Developer (2026년 4월)
휴전 이후에도 작전을 멈추지 않았다. **SEO 포이즈닝** 기법으로 가짜 SQL Developer 다운로드 페이지(`getsqldeveloper[.]com`)를 Bing·DuckDuckGo 상위 검색 결과에 노출시켜 불특정 다수를 감염시키는 방식으로 공격 범위를 확대했다.

---

## 핵심 기법 분석

### AppDomain Hijacking
정상적인 Microsoft 서명 바이너리(`Setup.exe`)와 함께 악성 XML 설정 파일(`Setup.exe.config`)을 배포한다. .NET 런타임은 설정 파일을 신뢰하므로, 악성 DLL이 **신뢰된 프로세스 컨텍스트** 안에서 로드된다. 로더는 실행 전 호스팅 프로세스 이름(`setup.exe`, `update.exe`)과 부모 프로세스(`svchost.exe`)를 검증해 샌드박스 분석을 회피한다.

### Zoom 설치 흐름 악용
Zoom 정상 설치 과정을 사전에 심층 연구해, 감염 체인이 **합법적인 Zoom 설치 과정처럼 보이도록** 설계했다. 악성코드는 Zoom이 생성하는 예약 작업(`ZoomUpdateTaskUser-<SID>`)을 모니터링하다가 해당 작업을 **납치(Hijacking)** 하는 방식으로 지속성을 확보한다. 새로운 의심 작업을 생성하지 않아 탐지가 어렵다.

### AI 보조 악성코드 개발
MiniFast 코드에서 LLM 활용 흔적이 다수 발견됐다. 단순한 API 호출에도 과도한 오류 처리, 반복적이고 장황한 함수 명명, 디버그 메시지 남용 등이 특징이다. 이는 **AI 도구를 활용한 빠른 악성코드 개발** 능력을 보여준다.

---

## MiniFast 백도어 상세

MiniFast는 MiniJunk를 대체하는 신형 64비트 DLL 백도어로, `CheckForUpdates` 함수를 진입점으로 사용한다.

**주요 기능:**

| 명령 코드 | 기능 |
|---|---|
| 0x02 | 디렉터리 목록 조회 |
| 0x04 | 명령 실행 (cmd.exe /c) |
| 0x05 | 실행 중인 프로세스 열거 |
| 0x07 | 파일 다운로드 |
| 0x08 | 파일 업로드 (유출) |
| 0x0B | DLL 로드 |
| 0x0D | ZIP 압축 아카이브 생성 |
| 0xB0 | UAC 권한 상승 요청 |
| 0xB1 | 지속성 설치 (예약 작업: WindowsSecurityUpdate) |

**C2 통신 구조:**
- JSON 포맷, Base64 인코딩
- Chrome User-Agent 위장 (`Chrome/146.0.0.0`)
- `/agent/init` 등록 → `/agent/poll` 명령 수신 → `/agent/result` 결과 전송

**난독화:** ROT13 + 문자열 역순 변환으로 런타임 복호화

---

## 대응 권고

1. **AppDomain 설정 파일 모니터링** — 실행 파일 경로에 `.exe.config` 또는 `UpdateConfig.xml` 파일 생성 여부 탐지
2. **예약 작업 변조 탐지** — `ZoomUpdateTaskUser-*` 작업의 비정상적인 수정 이벤트 모니터링
3. **SEO 포이즈닝 대응** — 소프트웨어 다운로드 시 반드시 공식 벤더 사이트에서만 수행
4. **아래 IoC 차단** — 도메인 및 해시를 EDR/네트워크 장비에 즉시 등록

---

## 출처

> Check Point Research (2026.05.22)
> **"Fast and Furious: Nimbus Manticore Operations During the Iranian Conflict"**
> [https://research.checkpoint.com/2026/fast-and-furious-nimbus-manticore-operations-during-the-iranian-conflict/](https://research.checkpoint.com/2026/fast-and-furious-nimbus-manticore-operations-during-the-iranian-conflict/)
