---
title: "Windows LNK(바로가기) 파일 아티팩트 분석"
date: 2026-05-25T02:00:00+09:00
categories: ["Artifact"]
tags: ["LNK", "Shell Link", "Windows Forensics", "Artifact", "DFIR", "파일시스템"]
author: "tkddnr924"
ai_written: true
summary: "Windows LNK(바로가기) 파일은 사용자의 파일 접근 행위를 기록하는 핵심 포렌식 아티팩트다. 대상 파일의 타임스탬프·볼륨 시리얼·MAC 주소까지 추출 가능하며, 악성코드 유포에도 적극 활용된다. 파일 구조, 저장 위치, 포렌식 가치, 분석 도구를 정리한다."
sources_label: "참고 명세"
sources:
  - name: "Microsoft Open Specifications"
    title: "[MS-SHLLINK] Shell Link Binary File Format"
  - name: "SANS FOR500"
    title: "Windows Forensic Analysis"
  - name: "Eric Zimmerman's Tools"
    url: "https://ericzimmerman.github.io/"
---

## 개요

Windows **LNK 파일**(Shell Link, 바로가기)은 다른 파일·폴더·URL을 가리키는 포인터 역할을 하는 이진 파일이다. 확장자는 `.lnk`이며, 파일을 열거나 프로그램을 실행할 때마다 자동으로 생성·갱신된다. 단순한 편의 기능처럼 보이지만, 포렌식 관점에서는 **사용자의 파일 접근 행위**, **연결된 디바이스 정보**, **원격지 경로**, 심지어 **네트워크 어댑터 MAC 주소**까지 담고 있는 중요한 아티팩트다.

---

## 저장 위치

Windows는 파일을 열 때마다 자동으로 LNK 파일을 `Recent` 경로에 생성한다.

| 경로 | 설명 |
|---|---|
| `%APPDATA%\Microsoft\Windows\Recent\` | 최근 파일 목록 (자동 생성 LNK) |
| `%APPDATA%\Microsoft\Windows\Recent\AutomaticDestinations\` | Jump List 자동 대상 |
| `%APPDATA%\Microsoft\Windows\Recent\CustomDestinations\` | Jump List 사용자 고정 대상 |
| `%USERPROFILE%\Desktop\` | 바탕화면 바로가기 |
| `%APPDATA%\Microsoft\Windows\Start Menu\Programs\` | 시작 메뉴 바로가기 |
| `%APPDATA%\Microsoft\Internet Explorer\Quick Launch\` | 빠른 실행 바로가기 |
| `C:\ProgramData\Microsoft\Windows\Start Menu\` | 전체 사용자 시작 메뉴 |

### Recent 폴더 특성

- 파일을 **열기만 해도** 자동 생성
- 원본 파일이 삭제되어도 LNK 파일은 **남아 있음** → 삭제된 파일의 존재 증명 가능
- 기본 보존 개수: **최대 1000개** (Windows 10/11 기준)

---

## 파일 구조 (MS-SHLLINK)

LNK 파일은 Microsoft의 **[MS-SHLLINK]** 명세를 따르는 이진 형식이다. 크게 5개 섹션으로 구성된다.

```
┌─────────────────────────────┐
│   Shell Link Header (76B)   │  ← 항상 존재, 고정 크기
├─────────────────────────────┤
│   LinkTargetIDList          │  ← 선택적
├─────────────────────────────┤
│   LinkInfo                  │  ← 선택적
├─────────────────────────────┤
│   StringData                │  ← 선택적
├─────────────────────────────┤
│   ExtraData                 │  ← 선택적, 복수 블록
└─────────────────────────────┘
```

---

### 1. Shell Link Header (76바이트)

모든 LNK 파일의 첫 76바이트. 핵심 메타데이터가 담겨 있다.

| 오프셋 | 크기 | 필드 | 설명 |
|---|---|---|---|
| 0x00 | 4 | HeaderSize | 항상 `0x4C` (76) |
| 0x04 | 16 | LinkCLSID | `{00021401-0000-0000-C000-000000000046}` |
| 0x14 | 4 | LinkFlags | 섹션 존재 여부 플래그 |
| 0x18 | 4 | FileAttributes | 대상 파일 속성 |
| 0x1C | 8 | CreationTime | **대상 파일** 생성 시각 (FILETIME) |
| 0x24 | 8 | WriteTime | **대상 파일** 수정 시각 (FILETIME) |
| 0x2C | 8 | AccessTime | **대상 파일** 접근 시각 (FILETIME) |
| 0x34 | 4 | FileSize | 대상 파일 크기 (하위 32bit) |
| 0x38 | 4 | IconIndex | 아이콘 인덱스 |
| 0x3C | 4 | ShowCommand | 창 표시 방식 |
| 0x40 | 2 | HotKey | 단축키 |

> ⚠️ **중요:** 여기 기록된 타임스탬프는 **LNK 파일 자신의 시각이 아니라 대상 파일의 시각**이다. 원본 파일이 삭제되어도 마지막 접근 당시의 타임스탬프가 보존된다.

---

### 2. LinkTargetIDList

대상 파일의 **ID 리스트(Shell Item)** 구조로, 파일 시스템 경로를 계층적으로 표현한다. 드라이브 문자부터 파일까지 각 경로 구성 요소가 별도의 ItemID로 저장된다.

Shell Item 내부에는 파일명 외에도 **FAT/NTFS 타임스탬프**, **파일 크기** 등이 추가로 기록되는 경우가 있어 Header의 타임스탬프와 교차 검증이 가능하다.

---

### 3. LinkInfo

대상이 위치한 **스토리지 환경** 정보.

| 항목 | 포렌식 가치 |
|---|---|
| DriveType | 로컬·USB·네트워크 드라이브 구분 |
| **DriveSerialNumber** | 볼륨 시리얼 번호 → 특정 디바이스 식별 |
| VolumeLabel | 드라이브 레이블명 |
| LocalBasePath | 로컬 절대 경로 |
| CommonNetworkRelativeLink | UNC 네트워크 경로 (`\\server\share`) |

**DriveType 값:**

| 값 | 의미 |
|---|---|
| 1 | 경로 없음 |
| 2 | 이동식 미디어 (USB 등) |
| 3 | 고정 디스크 |
| 4 | 네트워크 드라이브 |
| 5 | CD-ROM |
| 6 | RAM 디스크 |

---

### 4. StringData

| 필드 | 설명 |
|---|---|
| NAME_STRING | 바로가기 설명 |
| RELATIVE_PATH | 상대 경로 |
| WORKING_DIR | 작업 디렉터리 |
| COMMAND_LINE_ARGUMENTS | **실행 인자** ← 악성 LNK 분석 시 핵심 |
| ICON_LOCATION | 아이콘 경로 |

악성 LNK 파일은 `COMMAND_LINE_ARGUMENTS`에 PowerShell, cmd, mshta 등의 페이로드를 숨기는 경우가 많다.

---

### 5. ExtraData

가장 풍부한 포렌식 정보를 담고 있는 가변 길이 섹션.

#### TrackerDataBlock ← 핵심

| 필드 | 포렌식 가치 |
|---|---|
| **MachineID** | 대상 파일이 있던 컴퓨터의 **NetBIOS 호스트명** |
| **VolumeID Droid** | 볼륨 개체 ID — UUID v1, 타임스탬프 포함 |
| **FileID Droid** | 파일 개체 ID — **UUID v1**, 마지막 6바이트에 **MAC 주소** 포함 |

#### FileID Droid — UUID v1 구조

`FileID Droid`는 **UUID 버전 1** 형식으로 저장된다. UUID v1은 생성 시각(60bit 타임스탬프)과 생성 장치의 **네트워크 어댑터 MAC 주소(48bit)**를 결합해 만들어지며, 이 MAC 주소가 그대로 필드 마지막 6바이트에 기록된다.

```
UUID v1 구조 (16바이트)
┌────────────┬──────┬──────┬──────┬──────────────┐
│ time_low   │t_mid │t_hi  │clock │  node (MAC)  │
│  (4B)      │ (2B) │ (2B) │ (2B) │    (6B)      │
└────────────┴──────┴──────┴──────┴──────────────┘
                                   ↑
                           공격자 MAC 주소
```

예를 들어 UUID가 `6226b280-f5d2-11e9-8f0b-362b9e155667` 이라면 마지막 `36:2b:9e:15:56:67`이 LNK를 생성한 시스템의 MAC 주소다.

> 💡 악성 LNK 파일을 공격자가 직접 제작해 배포한 경우, FileID Droid에서 추출한 MAC 주소로 **파일을 만든 시스템의 NIC**를 특정할 수 있다. 분석 대상 장치의 MAC 주소와 대조하면 제작 주체 귀속(Attribution)의 근거가 된다.

#### 기타 ExtraData 블록

| 블록 | 설명 |
|---|---|
| SpecialFolderDataBlock | 특수 폴더(바탕화면, 문서 등) ID |
| KnownFolderDataBlock | KNOWNFOLDERID GUID |
| EnvironmentVariableDataBlock | 환경변수 기반 경로 |
| ConsoleDataBlock | 콘솔 창 속성 |
| PropertyStoreDataBlock | 확장 속성 저장소 |

---

## 분석 도구

### LECmd (Eric Zimmerman)

가장 널리 쓰이는 LNK 분석 CLI 도구.

```powershell
# 단일 파일 분석
LECmd.exe -f "C:\Users\user\AppData\Roaming\Microsoft\Windows\Recent\document.lnk"

# 디렉터리 전체 분석 + CSV 출력
LECmd.exe -d "C:\Users\user\AppData\Roaming\Microsoft\Windows\Recent" --csv C:\output

# 모든 사용자 Recent 폴더 재귀 분석
LECmd.exe -d "C:\Users" -q --csv C:\output
```

### LnkParse3 (Python)

```python
import lnkparse3

with open("document.lnk", "rb") as f:
    lnk = lnkparse3.LnkParse3(f)
    lnk.print_lnk_info()
```

### 기타 도구

| 도구 | 특징 |
|---|---|
| **KAPE** | 자동 수집 + LECmd 연동 |
| **Autopsy** | LNK 파서 플러그인 내장 |
| **Eric Zimmerman's JLECmd** | Jump List 분석 (AutoDest/CustomDest) |
| **ExifTool** | 기본 메타데이터 추출 |
| **CyberChef** | 16진수 직접 파싱 |
