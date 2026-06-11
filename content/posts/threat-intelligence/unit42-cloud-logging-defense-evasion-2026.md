---
title: "클라우드 로깅 서비스 악용 — 방어 회피와 지속적 가시성 확보 (Unit 42)"
date: 2026-06-12T02:15:00+09:00
categories: ["Threat Intelligence"]
tags: ["Unit 42", "Cloud Security", "AWS", "GCP", "CloudTrail", "Cloud Logging", "Defense Evasion", "KMS", "CMEK", "S3", "Log Poisoning", "MITRE T1562"]
author: "tkddnr924"
summary: "Unit 42(Yahav Festinger)가 분석한 클라우드 로깅 서비스 악용 기법. AWS CloudTrail·S3·KMS와 Google Cloud Logging·CMEK를 대상으로 한 방어 회피 5종(로깅 중지, 저장소·라우터 삭제, 외부 암호키로 무력화, 로그 변조)과 지속 가시성 확보 2종(신규 라우팅, 리디렉션)을 표·다이어그램으로 정리한다. 공격자는 침해 사실 자체를 숨기거나 피해자 환경을 지속적으로 들여다보는 양방향 효과를 노린다."

sources:
  - name: "Unit 42 (Palo Alto Networks, Yahav Festinger)"
    date: "2026.06.09"
    title: "Blinding the Watchmen: Abusing Cloud Logging Services for Defense Evasion and Visibility"
    url: "https://unit42.paloaltonetworks.com/cloud-logging-defense-evasion/"
---

## 개요

Unit 42는 **클라우드 로깅 서비스 자체를 공격 표면**으로 삼는 기법을 정리했다. 공격자가 클라우드 환경에 침투한 뒤 가장 먼저 노리는 것은 운영 자원이 아닌 **로그를 만드는·저장하는·전달하는 컴포넌트**다. 로깅을 무력화하면 침해 흔적이 사라지고, 로그 라우팅을 자신 쪽으로 돌리면 피해자 환경을 **지속적으로 들여다보는** 효과를 얻는다.

본 리포트는 **AWS CloudTrail / S3 / KMS** 와 **Google Cloud Logging / CMEK** 두 플랫폼에서 동일 개념이 어떻게 매핑되는지를 비교하며, 7가지 기법을 두 갈래로 분류한다.

| 공격 벡터 | 목적 | 기법 수 |
|---|---|---|
| **Defense Evasion** | 침해 행위를 가리고 탐지 회피 | 5종 (로깅 중지·저장소 삭제·라우터 삭제·암호키 무력화·로그 변조) |
| **Continuous Visibility** | 피해자 환경을 지속적으로 관찰·은닉 채널 확보 | 2종 (신규 라우팅 리소스 생성·로그 리디렉션) |

---

## Part 1. 방어 회피 (Defense Evasion)

### 1) Stop Logging — 로깅 자체를 끈다

가장 단순하고 강력한 공격이다. 로깅 서비스를 API 한 번으로 중단시키면 그 시점 이후 발생하는 행위는 기록되지 않는다.

| 플랫폼 | 필요 권한 | API |
|---|---|---|
| AWS | `cloudtrail:StopLogging` | `stop-logging` |
| GCP | `logging.sinks.update` | sink 비활성화 |

{{< img src="/images/posts/unit42-cloud-logging-defense-evasion-2026/01-gcp-sink-disabled.png" alt="GCP sink 비활성화 콘솔 메시지" caption="▲ Figure 1 — Google Cloud 콘솔에 표시된 sink 비활성화 메시지 — 더 이상 로그가 기록되지 않는 상태 (출처: Unit 42)" >}}

### 2) Delete Log Storage — 저장소를 통째로 삭제

이미 쌓인 로그까지 함께 없앤다. 포렌식 증거 자체가 소멸된다.

| 플랫폼 | 필요 권한 | 비고 |
|---|---|---|
| AWS | `s3:DeleteBucket`, `s3:DeleteObject` | 버킷 정책·MFA Delete로 차단 가능 |
| GCP | `logging.buckets.delete` | **7일 유예 후 영구 삭제** — Bucket Lock으로 완화 가능 |

### 3) Delete Log Router — 라우터(파이프) 절단

저장소는 두되, **로그를 어디로 보낼지 정의한 리소스 자체**를 삭제한다. 새 이벤트가 더 이상 흐르지 않는다.

| 플랫폼 | API |
|---|---|
| AWS | `delete-trail` (CloudTrail trail 삭제) |
| GCP | `logging.sinks.delete` |

{{< img src="/images/posts/unit42-cloud-logging-defense-evasion-2026/02-cloudtrail-delete.png" alt="CloudTrail trail 삭제 알림" caption="▲ Figure 2 — CloudTrail trail 설정 화면에 표시되는 삭제 알림 (출처: Unit 42)" >}}

### 4) Impair via Attacker-Controlled Encryption Key — 외부 암호키로 무력화

이 기법이 가장 정교하다. **로그는 계속 생성·저장되지만 읽을 수 없게 만드는** 방식이라 표면적으로는 모든 게 정상으로 보인다.

#### AWS 시나리오

1. 공격자가 외부 KMS 키를 생성하면서 정책에 CloudTrail 서비스가 사용할 수 있도록 권한을 부여
2. `update-trail`로 CloudTrail이 이 외부 키를 사용하도록 변경
3. **CloudTrail의 KMS 접근 권한을 회수** — 이제 로그는 암호화돼 저장되지만 복호화할 수단이 없음

{{< img src="/images/posts/unit42-cloud-logging-defense-evasion-2026/03-kms-external-policy.png" alt="외부 KMS 키 정책" caption="▲ Figure 3 — CloudTrail이 접근 가능하도록 작성된 외부 KMS 키 정책 (출처: Unit 42)" >}}

{{< img src="/images/posts/unit42-cloud-logging-defense-evasion-2026/04-kms-access-denied.png" alt="KMS 접근 차단 후 메시지" caption="▲ Figure 4 — 접근 권한 회수 후 표시되는 KMS Access Denied 메시지 (출처: Unit 42)" >}}

이후 피해자가 로그를 조회하려 하면 S3에서 **Bucket access denied** 오류가 발생한다.

{{< img src="/images/posts/unit42-cloud-logging-defense-evasion-2026/05-aws-attack-flow.png" alt="AWS 공격 흐름 다이어그램" caption="▲ Figure 5 — KMS 키를 이용한 AWS 측 전체 공격 흐름 (출처: Unit 42)" >}}

#### GCP 시나리오

CMEK(고객 관리 암호 키)를 외부 키로 변경한 뒤 **CMEK 서비스 계정의 decrypt 권한을 제거**한다. 결과는 동일하다 — 로그가 남기는 하지만 복호화 불가.

{{< img src="/images/posts/unit42-cloud-logging-defense-evasion-2026/06-gcp-unreadable-log.png" alt="GCP 콘솔 — 로그 읽기 불가" caption="▲ Figure 6 — Google Cloud 콘솔에서 로그를 읽지 못하는 피해자 화면 (출처: Unit 42)" >}}

> **GCP 특이사항**: 키 재키(rekeying) 시 CMEK 서비스 계정이 **현재 CMEK 키에 대한 decrypt 권한**을 보유하고 있어야 한다. 이 조건을 끊으면 재키 자체가 막혀 무력화가 영구화된다.

{{< img src="/images/posts/unit42-cloud-logging-defense-evasion-2026/07-cmek-rekey.png" alt="CMEK 재키 요구사항" caption="▲ Figure 7 — GCP 문서가 명시하는 CMEK 재키 시 decrypt 권한 요구사항 (출처: Unit 42)" >}}

### 5) Log Poisoning — 로그 변조

저장된 JSON 로그 파일을 직접 수정해 **특정 이벤트만 제거하거나 위조**한다. 로그가 계속 쌓이는 모양새는 그대로라 탐지가 가장 어렵다.

| 플랫폼 | 필요 권한 |
|---|---|
| AWS | `s3:GetObject`, `s3:PutObject` (CloudTrail 버킷에 대해) |
| GCP | `storage.objects.get`, `storage.objects.create` |

{{< img src="/images/posts/unit42-cloud-logging-defense-evasion-2026/08-log-poisoning-athena.png" alt="Amazon Athena로 변조된 로그 검사" caption="▲ Figure 8 — 공격자가 로그를 변조한 뒤 피해자가 Amazon Athena로 조사하는 시나리오 (출처: Unit 42)" >}}

> **완화책**: CloudTrail의 **log file integrity validation**(로그 파일 무결성 검증)을 활성화하면 변조를 탐지할 수 있다. 단, **AWS 콘솔에서는 기본 활성, CLI/API로 trail 생성 시에는 기본 비활성**이라는 함정이 있다.

---

## Part 2. 지속적 가시성 (Continuous Visibility)

### 1) 신규 라우팅 리소스 생성 — 공격자 통제 저장소로 흘려보내기

새 trail/sink를 만들어 **공격자 통제 S3 버킷·외부 GCP 대상**으로 로그 사본을 송출한다. 정규 로깅 파이프라인을 건드리지 않아 피해자 입장에선 이상 징후가 보이지 않는다.

- AWS: `create-trail` API → 공격자 S3 버킷 지정
- GCP: `logging.sinks.create` → 외부 대상 지정

### 2) Log Redirection — 기존 라우터의 목적지만 바꾸기

기존 trail/sink 자체의 **destination만 공격자 측으로 변경**한다. 피해자 측 로그가 사라지는 동시에 공격자는 모든 활동을 실시간으로 본다.

- AWS: `update-trail`의 `s3-bucket-name` 파라미터 변경
- GCP: `logging.sinks.update`로 destination 수정

---

## 위협 평가 — 기법별 악성 가능성과 영향

| 기법 | 악성 가능성 | 주된 영향 |
|---|---|---|
| Stop Logging | **High** | 전체 로그 가시성 상실 |
| Delete Storage | Medium | 포렌식 증거 소멸 |
| Delete Router | Low | 보안 파이프라인 단절 |
| Encryption Key Impairment | Medium | 로그 자체는 남으나 접근 불가 |
| Log Poisoning | Medium | 데이터 무결성 훼손 |
| 신규 라우팅 리소스 | Low | 로그 유출·은닉 채널 확보 |
| Log Redirection | **High** | 로그 유출·은닉 채널 확보 |

---

## MITRE ATT&CK 매핑

- 주 전술: **Defense Evasion (TA0005)** — `T1562 Impair Defenses` 계열
- 보조: Discovery (TA0007), Impact (TA0040)

---

## Cortex XDR 탐지 시그니처

| 시그니처 |
|---|
| AWS CloudTrail has been stopped |
| AWS CloudTrail modification |
| CloudTrail logging deletion |
| Google Cloud logging sink modification |
| Google Cloud logging sink deletion |
| Google Cloud Logging Bucket Deletion |
| Logging was impaired via external encryption key |
| Suspicious activity on logging bucket |

---

## 방어 권고

### AWS
- `update-trail` API 호출 권한을 **고권한 계정에만** 한정 (IAM 정책으로 차단)
- CloudTrail S3 버킷에 **비-관리자 수정 차단** 정책 적용 (MFA Delete 권장)
- **불변(immutable) 90일 Event History** 활용 — 단, **management events**만 다루고 data/network events는 제외됨
- **CloudTrail Log File Integrity Validation 활성화** (CLI/API 생성 시 명시적으로 켜야 함)

### Google Cloud
- 불변 로그 버킷 **`_Required` / `_Default`** 의 변경·삭제 권한 잠금
- `logging.sinks.update` 권한 최소화
- 수동 생성 버킷에는 **Bucket Lock** 적용

### 공통 운영 관점
- 로깅 관련 API 호출(`StopLogging`, `update-trail`, `sinks.update`, `buckets.delete`, KMS 키 정책 변경)을 **별도 채널**로 실시간 알림
- 로그 저장소의 **암호화 키 관리 자체**가 가장 큰 단일 실패점 — 키 정책 변경에는 별도 승인 워크플로 적용
