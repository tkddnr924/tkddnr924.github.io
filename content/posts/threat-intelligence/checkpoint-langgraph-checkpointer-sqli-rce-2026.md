---
title: "LangGraph Checkpointer SQLi → RCE 취약점 분석 — CVE-2025-67644 / 28277 / 27022 (Check Point Research)"
date: 2026-06-12T02:58:00+09:00
categories: ["Threat Intelligence"]
tags: ["Check Point", "LangGraph", "LangChain", "AI Agent", "SQL Injection", "RCE", "Deserialization", "msgpack", "Vulnerability", "CVE-2025-67644", "CVE-2026-28277", "CVE-2026-27022"]
author: "tkddnr924"
summary: "Check Point Research(Yarden Porat)가 분석한 LangGraph(월 5천만 다운로드) 영속성 계층의 세 취약점. SQLite Checkpointer의 SQL 인젝션(CVE-2025-67644)과 msgpack 비안전 역직렬화(CVE-2026-28277)가 체인되어 RCE로 이어지고, Redis Checkpointer에도 동일한 인젝션 클래스(CVE-2026-27022)가 존재한다. 자체 호스팅 환경에서 get_state_history()가 사용자 제어 filter를 노출하면 위험. LangSmith Deployment(관리형 PostgreSQL)는 영향 없음. 패치 버전 명시."

sources:
  - name: "Check Point Research (Yarden Porat)"
    date: "2026.06.11"
    title: "From SQLi to RCE – Exploiting LangGraph's Checkpointer"
    url: "https://research.checkpoint.com/2026/from-sqli-to-rce-exploiting-langgraphs-checkpointer/"
---

## 개요

{{< img src="/images/posts/checkpoint-langgraph-checkpointer-sqli-rce-2026/00-banner.png" alt="From SQLi to RCE — Exploiting LangGraph's Checkpointer" caption="▲ Check Point Research 리포트 배너 (출처: Check Point Research)" >}}

Check Point Research(저자 **Yarden Porat**)는 AI 에이전트의 상태(state)를 저장하는 LangGraph **Checkpointer**(영속성 계층)에서 **3개의 취약점**을 찾아냈고, 그중 두 개는 체인되어 **원격 코드 실행(RCE)으로** 이어진다는 사실을 공개했다. LangGraph는 LangChain의 확장 프레임워크로 **월 5천만 다운로드** 수준의 사용량을 가진 핵심 컴포넌트다.

| 핵심 사항 | 내용 |
|---|---|
| 영향 받는 컴포넌트 | LangGraph **SQLite / Redis Checkpointer** (자체 호스팅) |
| **영향 없음** | LangChain **LangSmith Deployment** (구 LangGraph Platform) — 관리형 PostgreSQL 사용 |
| 위험 조건 | `get_state_history()`를 **사용자 제어 `filter`** 와 함께 노출한 자체 호스팅 애플리케이션 |
| 취약점 1 (SQLite) | **CVE-2025-67644** — `_metadata_predicate`의 키 보간 SQL 인젝션 |
| 취약점 2 (RCE 연쇄) | **CVE-2026-28277** — `_msgpack_ext_hook`을 통한 비안전 역직렬화 |
| 취약점 3 (Redis) | **CVE-2026-27022** — 동일 클래스 SQL 인젝션 |

---

## CVE-2025-67644 — SQLite Checkpointer SQL 인젝션

### Checkpointer 스키마

```sql
CREATE TABLE checkpoints (
    thread_id            TEXT NOT NULL,
    checkpoint_ns        TEXT NOT NULL DEFAULT '',
    checkpoint_id        TEXT NOT NULL,
    parent_checkpoint_id TEXT,
    type                 TEXT,
    checkpoint           BLOB,   -- ← 직렬화된 페이로드 저장
    metadata             BLOB,
    PRIMARY KEY (thread_id, checkpoint_ns, checkpoint_id)
);
```

`metadata` 컬럼은 다음 같은 JSON을 담는다:

```json
{
  "user_id": "alice",
  "step": 1,
  "source": "input"
}
```

### `list()` 의 `filter` 파라미터

`sqliteSaver.list()` 호출 시 전달되는 `filter` dict는 내부 `_metadata_predicate`에 전달되어 SQL `WHERE` 절을 만든다:

```python
# process metadata query
for query_key, query_value in filter.items():
    operator, param_value = _where_value(query_value)
    predicates.append(
        f"json_extract(CAST(metadata AS TEXT), '$.{query_key}') {operator}"
    )
    param_values.append(param_value)

return (predicates, param_values)
```

### 인젝션 포인트

문제 한 줄:

```python
f"json_extract(CAST(metadata AS TEXT), '$.{query_key}') {operator}"
```

공격자가 제어하는 `query_key`에 `'` 문자를 포함시키면 **JSON 경로 문자열을 탈출해 임의 SQL을 주입**할 수 있다.

---

## RCE로의 연쇄 — UNION SELECT → 역직렬화

`list()`가 실행하는 최종 쿼리는 다음과 같다:

```sql
SELECT thread_id, checkpoint_ns, checkpoint_id, parent_checkpoint_id,
       type, checkpoint, metadata
FROM checkpoints
{where}
ORDER BY checkpoint_id DESC
```

조회 결과는 다음처럼 처리된다:

```python
async for (
    thread_id, checkpoint_ns, checkpoint_id, parent_checkpoint_id,
    type, checkpoint,   # ← 쿼리에서 그대로 가져온 BLOB
    metadata,
) in cur:
    yield CheckpointTuple(
        self.serde.loads_typed((type, checkpoint)),   # ← 여기서 역직렬화
        ...
    )
```

### 공격 페이로드 — UNION SELECT로 가짜 행 주입

```sql
SELECT thread_id, checkpoint_ns, checkpoint_id, parent_checkpoint_id,
       type, checkpoint, metadata
FROM checkpoints
WHERE ... (injected: ') UNION SELECT 'thread1', 'ns', 'checkpoint1', NULL,
                                      'msgpack', X'<악성 msgpack BLOB>',
                                      '{}' -- )
ORDER BY checkpoint_id DESC
```

주입된 `UNION SELECT`는 **`type='msgpack'`** 과 **공격자 통제 BLOB**을 반환한다. 결과 루프에서 이 가짜 행의 `BLOB`이 `loads_typed`로 넘어가 역직렬화되는 순간이 RCE 트리거다.

{{< img src="/images/posts/checkpoint-langgraph-checkpointer-sqli-rce-2026/01-sqli-attack.png" alt="SQL injection으로 가짜 checkpoint 행을 주입하는 흐름" caption="▲ Figure 1 — SQL 인젝션으로 UNION SELECT를 추가해 가짜 checkpoint 행을 결과셋에 삽입하는 과정 (출처: Check Point Research)" >}}

---

## CVE-2026-28277 — msgpack 비안전 역직렬화

### `loads_typed`의 분기

```python
def loads_typed(self, data: tuple[str, bytes]) -> Any:
    type_, data_ = data
    if type_ == "null":      return None
    elif type_ == "bytes":   return data_
    elif type_ == "bytearray": return bytearray(data_)
    elif type_ == "json":
        return json.loads(data_, object_hook=self._reviver)
    elif type_ == "msgpack":
        return ormsgpack.unpackb(
            data_, ext_hook=self._unpack_ext_hook,
            option=ormsgpack.OPT_NON_STR_KEYS
        )
    elif self.pickle_fallback and type_ == "pickle":
        return pickle.loads(data_)
    else:
        raise NotImplementedError(f"Unknown serialization type: {type_}")
```

| 포맷 | 위험 |
|---|---|
| `pickle` | 기본 비활성화(`pickle_fallback=False`) |
| `json` | `object_hook` 사용하지만 코드 실행으로 이어지지 않음 |
| **`msgpack`** | **이번 취약점의 표적** |

### `_msgpack_ext_hook` — 임의 호출 구조

LangGraph가 ormsgpack 확장 핸들러로 등록한 함수:

```python
def _msgpack_ext_hook(code: int, data: bytes) -> Any:
    if code == EXT_CONSTRUCTOR_SINGLE_ARG:
        try:
            tup = ormsgpack.unpackb(
                data, ext_hook=_msgpack_ext_hook,
                option=ormsgpack.OPT_NON_STR_KEYS
            )
            # module, name, arg
            return getattr(importlib.import_module(tup[0]), tup[1])(tup[2])
        except Exception:
            return
```

**공격자가 직렬화된 데이터를 통제하면 `tup` 의 세 원소(`module`, `name`, `arg`) 모두를 제어한다.**

### 트리거 페이로드 예

`EXT_CONSTRUCTOR_SINGLE_ARG` 코드 + 튜플 `("os", "system", "echo PWN > /tmp/pwned.txt")` 를 보내면:

```python
return getattr(importlib.import_module("os"), "system")("echo PWN > /tmp/pwned.txt")
```

1. `os` 모듈 import
2. `system` 함수 획득
3. `os.system("...")` 호출 → **서버에서 임의 셸 명령 실행**

---

## 공격 체인 — 시나리오 종합

{{< img src="/images/posts/checkpoint-langgraph-checkpointer-sqli-rce-2026/02-attack-chain.png" alt="SQLi + msgpack 역직렬화 결합 RCE 흐름" caption="▲ Figure 2 — 두 취약점을 결합한 종합 공격 흐름 (출처: Check Point Research)" >}}

진입점은 개발자가 외부에 노출한 **`get_state_history()`** 다.

```python
def get_state_history(
    self,
    config: RunnableConfig,
    *,
    filter: Optional[Dict[str, Any]] = None,
    before: Optional[RunnableConfig] = None,
    limit: Optional[int] = None,
) -> Iterator[StateSnapshot]:
    for checkpoint_tuple in self.checkpointer.list(
        config, filter=filter, before=before, limit=limit
    ):
        # ...
```

`filter`가 사용자 입력에서 sanitize 없이 흘러들어오면 **dict 키 자체가 공격자 통제 영역**이 된다.

{{< attack-flow >}}
{{< step icon="fas fa-code" title="① 악성 msgpack 페이로드 준비" >}}
`EXT_CONSTRUCTOR_SINGLE_ARG` + `("os", "system", "<shell command>")` 튜플을 msgpack으로 패킹
{{< /step >}}
{{< step icon="fas fa-database" title="② SQL 인젝션으로 가짜 행 주입" >}}
`filter`에 `'` 가 포함된 키로 `_metadata_predicate` 우회 → **`UNION SELECT`** 로 `type='msgpack'` + 악성 BLOB 행을 결과셋에 추가
{{< /step >}}
{{< step icon="fas fa-bolt" title="③ 역직렬화 트리거" >}}
애플리케이션이 결과 행 루프에서 `loads_typed(('msgpack', <악성 BLOB>))` 호출
{{< /step >}}
{{< step icon="fas fa-skull" title="④ 원격 코드 실행" >}}
`_msgpack_ext_hook`이 `getattr(import_module('os'), 'system')(cmd)` 실행 → **서버에서 임의 명령**
{{< /step >}}
{{< /attack-flow >}}

---

## CVE-2026-27022 — Redis Checkpointer 동일 인젝션

`langgraph-checkpoint-redis`에도 같은 **사용자 제어 dict 키가 쿼리에 직접 보간**되는 패턴이 존재한다. 전제 조건은 SQLite 케이스와 동일:

- 애플리케이션이 `get_state_history()`를 **사용자 제어 `filter`** 와 함께 노출
- Redis Checkpointer 사용 중

패치 버전: **`langgraph-checkpoint-redis 1.0.2`**

---

## 부수적 발견 — 정수 파라미터 SQL 인젝션 (DiD)

주 SQL 인젝션 외에도 **SQLite·PostgreSQL Checkpointer 모두에서 `LIMIT`·`ttl` 정수 파라미터의 직접 문자열 결합**을 발견했다. Python은 타입 힌트를 런타임에 강제하지 않으므로 해당 파라미터에 악성 문자열이 들어올 수 있다. LangChain 팀과 함께 **매개변수 바인딩**으로 수정.

---

## 디스클로저 타임라인 + 패치 버전

| 날짜 | 이벤트 |
|---|---|
| 2025-11-19 | CVE-2025-67644 / 2026-28277 / 2026-27022 LangChain에 보고 |
| 2025-12-10 | **CVE-2025-67644 패치 공개** — `langgraph-checkpoint-sqlite 3.0.1` |
| 2026-02-20 | **CVE-2026-27022 패치 공개** — `langgraph-checkpoint-redis 1.0.2` |
| 2026-03-05 | **CVE-2026-28277 패치 공개** — `langgraph-checkpoint 4.0.1` (langgraph 1.0.10+에 포함) |

> Check Point는 LangChain 팀의 신속한 대응(특히 SQL 인젝션 우선 수정으로 **체인을 끊은 것**)을 긍정적으로 평가했다.

---

## 영향 받는 사용자 — 본인 환경 점검

자체 호스팅 LangGraph 사용자는 다음 모두에 해당하면 **즉시 패치 필요**:

1. Checkpointer가 **SQLite 또는 Redis**
2. 애플리케이션이 `get_state_history()` 또는 동등 경로를 외부에 노출
3. 그 호출의 `filter` 인자가 **사용자 입력에서 직접 유래**

| 환경 | 상태 |
|---|---|
| LangGraph 자체 호스팅 + SQLite Checkpointer | **취약** (RCE 가능) |
| LangGraph 자체 호스팅 + Redis Checkpointer | **취약** (SQLi) |
| LangGraph 자체 호스팅 + PostgreSQL Checkpointer | 주 인젝션 영향 없음(단, LIMIT/ttl DiD 이슈 해당) |
| **LangSmith Deployment**(관리형) | **영향 없음** (PostgreSQL 사용) |

---

## 권고

| 영역 | 권고 |
|---|---|
| 즉시 업그레이드 | `langgraph-checkpoint-sqlite ≥ 3.0.1`, `langgraph ≥ 1.0.10` (= `langgraph-checkpoint ≥ 4.0.1`), `langgraph-checkpoint-redis ≥ 1.0.2` |
| 입력 검증 | `get_state_history(..., filter=...)`에 사용자 입력을 절대 그대로 전달 금지 — **dict 키는 화이트리스트로** 제한 |
| 노출 제한 | 에이전트의 내부 상태 조회 API를 **외부에 직접 노출하지 말 것** (인증·권한 분리 후 별도 게이트웨이) |
| 직렬화 정책 | msgpack 확장 핸들러로 임의 `importlib` 호출 금지 — **고정 매핑 테이블** 기반 deserializer 도입 검토 |
| 탐지 | 애플리케이션 로그에서 `filter` 키의 비정상 문자(`'`, `--`, `UNION`) 모니터링; Checkpointer로 가는 SQL 쿼리에 `UNION` 등장 시 알람 |

---

## 시사점

이 사례는 **AI 에이전트 인프라가 새로운 공격 표면**임을 보여준다. 모델·프롬프트·도구뿐 아니라 **에이전트의 메모리(영속성 계층)** 도 동일한 입력 검증·역직렬화 정책 원칙이 적용돼야 한다. "AI 프레임워크니까 다를 것이다"라는 가정 없이, **고전적인 웹 보안 원칙(파라미터 바인딩, 화이트리스트, 안전한 deserializer)** 을 그대로 적용해야 한다는 교훈이다.
