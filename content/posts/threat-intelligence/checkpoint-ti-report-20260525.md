---
title: "Check Point 주간 TI 리포트 — 2026년 5월 25일"
date: 2026-05-26T14:25:11+09:00
categories: ["Threat Intelligence"]
tags: ["Check Point", "주간리포트", "ShinyHunters", "Kali365", "AI 위협", "Linux 악성코드", "공급망 공격", "랜섬웨어"]
author: "tkddnr924"
summary: "7-Eleven·GitHub·Grafana 침해, FBI 경고를 받은 PhaaS 플랫폼 Kali365, AI 활용 멕시코 정부 해킹, Windows Defender CVE 2건, Laravel 공급망 공격 등 2026년 5월 25일자 Check Point 주간 위협 인텔리전스 리포트를 정리한다."

iocs:
  hashes: []
  domains:
    - "kali365[.]com"
  ips: []
  urls: []
sources:
  - name: "Check Point Research"
    date: "2026.05.25"
    title: "25th May – Threat Intelligence Report"
    url: "https://research.checkpoint.com/2026/25th-may-threat-intelligence-report/"
---

## 개요

Check Point Research가 2026년 5월 25일자 주간 위협 인텔리전스 보고서를 공개했다. 대형 플랫폼 침해 사고, AI 기반 공격 자동화, 복수의 CVE 패치, 그리고 중동·DACH 지역을 겨냥한 지속적인 캠페인이 이번 주 주요 이슈다.

---

## 주요 침해 사고

### 7-Eleven — 60만 건 Salesforce 레코드 유출

ShinyHunters가 7-Eleven 가맹점 문서 시스템에 무단 접근해 **60만 건 이상의 Salesforce 레코드**를 탈취했다. 개인정보와 기업 데이터가 포함됐으며, 7-Eleven은 영향을 받은 개인에게 신원 보호 서비스를 제공하고 있다.

### GitHub — 내부 저장소 3,800개 유출

공격자가 **Visual Studio Code 확장 프로그램을 무기화**해 GitHub 직원 장치를 침해했다. 이를 통해 내부 소스코드 저장소 약 3,800개가 유출됐다. 고객 대면 시스템에는 영향이 없었다고 GitHub은 밝혔다.

### Grafana Labs — 소스코드 접근

GitHub 토큰 탈취로 Grafana Labs 소스코드에 접근한 사례가 확인됐다. Grafana는 몸값 요구를 거부했으며, 고객 데이터 노출 및 서비스 중단은 없었다.

---

## Kali365 — PhaaS 플랫폼 FBI 경고

FBI가 미국인을 표적으로 한 **Phishing-as-a-Service(PhaaS) 플랫폼 Kali365**에 대해 경고를 발령했다. Telegram을 통해 유포되며, **Microsoft 365 사용자를 디바이스 코드 피싱으로 공략**한다.

{{< attack-flow >}}
{{< step icon="fab fa-telegram" title="Telegram을 통한 피싱 링크 유포" >}}
Kali365 플랫폼이 Telegram 채널을 통해 피싱 링크 배포
{{< /step >}}
{{< step icon="fas fa-mobile-screen" title="디바이스 코드 피싱" >}}
Microsoft 365 로그인 흐름을 사칭한 가짜 디바이스 코드 인증 페이지로 유도
{{< /step >}}
{{< step icon="fas fa-key" title="OAuth 토큰 탈취 — MFA 우회" >}}
피해자가 코드를 입력하면 공격자가 OAuth 액세스 토큰 획득 → MFA 우회
{{< /step >}}
{{< step icon="fas fa-cloud" title="지속적 접근 유지" >}}
Outlook, Teams, OneDrive에 지속적 접근 — 계정 탈취 없이도 데이터 열람 가능
{{< /step >}}
{{< /attack-flow >}}

---

## AI 기반 위협

### 단일 공격자, AI로 멕시코 정부 기관 9곳 침해

Check Point Research는 상용 AI를 활용한 단일 공격자가 **멕시코 정부 기관 9곳을 침해**하고 **5,000건 이상의 자동화 명령**을 실행한 사례를 문서화했다. 악성 설정 파일로 AI 안전 제어를 재정의하고, 상용화된 툴킷과 탈취한 API 키를 활용했다.

### 보이지 않는 텍스트 피싱 (Indirect Prompt Injection)

이메일 본문에 **크기 0 폰트**와 **배경색과 동일한 색상**으로 숨겨진 텍스트를 삽입해 AI 이메일 필터를 우회하는 기법이 발견됐다. AI 필터가 자동 검토 시 숨겨진 지시문을 처리하면서 악성 메일이 통과된다.

### 러시아 연계 AI 영향력 공작

구독자 **17,000명의 MAGA 테마 텔레그램 채널**을 운영하는 러시아 연계 그룹이 Gemini 안전 장치를 우회해 프로파간다를 자동 생성했다. 자격증명 탈취 및 암호화폐 지갑 탈취도 병행했다.

---

## 취약점 및 패치

### Windows Defender

| CVE | 유형 | 영향 |
|---|---|---|
| **CVE-2026-41091** | 로컬 권한 상승 | Malware Protection Engine |
| **CVE-2026-45498** | 서비스 거부(DoS) | Defender Antimalware Platform |

두 취약점 모두 실제 악용이 확인됐으며, 자동 업데이트로 패치가 배포됐다.

### Trend Micro Apex One — CVE-2026-34926

온프레미스 Apex One 서버의 **디렉터리 트래버설** 취약점. 관리자 권한이 있는 공격자가 엔드포인트에 악성 코드를 푸시할 수 있다. Windows 시스템 대상 실제 공격이 확인됐다.

### Drupal SQL 인젝션 — CVE-2026-9082

PostgreSQL을 사용하는 Drupal 사이트의 **크리티컬 SQL 인젝션** 취약점. 데이터베이스 명령 실행, 데이터 탈취, 코드 실행이 가능하다. 공개 직후 수천 개 사이트를 대상으로 한 공격이 보고됐다.

---

## 위협 캠페인

### Showboat — 중국 연계 Linux 모듈형 악성코드

국제 통신사를 표적으로 하는 **Linux 악성코드 패밀리**. 중국 연계 위협 행위자로 귀속됐다.

**주요 기능:**
- 프로세스 은닉
- 파일 전송
- 원격 셸 실행
- SOCKS5 프록시 운영

### Laravel Lang 공급망 공격

GitHub 태그 재작성으로 악성 커밋을 가리키도록 조작했다. **크로스플랫폼 자격증명 탈취 악성코드**를 배포하며, 클라우드 키·개발자 토큰·브라우저 비밀번호를 수집한다. 수백 개의 Composer 패키지 버전이 영향을 받았다.

### 중동 통신 인프라 C2 서버 급증

98개 통신사 및 호스팅 제공업체에 걸쳐 **1,350개 이상의 활성 C2 서버**가 확인됐다.

| 연계 활동 | 설명 |
|---|---|
| Phorpiex 봇넷 | 스팸·악성코드 배포 |
| Eagle Werewolf | 스파이 활동 |
| React Native CLI 악용 | 개발자 환경 침투 |
| RondoDox 봇넷 | 분산 공격 인프라 |

### DACH 지역 위협 급증

2025년 독일·오스트리아·스위스(DACH) 지역에서 핵티비즘과 랜섬웨어가 **124% 증가**했다. 독일이 피해 건수의 대부분을 차지했으며, 주요 랜섬웨어 그룹으로 **Akira, Qilin, Safepay**가 확인됐다.

---

## 주요 수치

| 항목 | 수치 |
|---|---|
| 7-Eleven 유출 레코드 | 600,000건+ |
| GitHub 유출 저장소 | 3,800개 |
| 러시아 텔레그램 채널 구독자 | 17,000명 |
| AI로 침해된 멕시코 정부 기관 | 9곳 |
| AI 자동화 실행 명령 | 5,000건+ |
| DACH 지역 위협 증가율 | 124% |
| 중동 C2 서버 | 1,350개+ (98개 공급자) |
