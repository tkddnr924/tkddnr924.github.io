---
title: "Vidar Stealer + XMRig 캠페인 — 코드 서명 위장·Go 로더·파일 인플레이션 분석 (Unit 42)"
date: 2026-07-09T13:50:00+09:00
categories: ["Threat Intelligence"]
tags: ["Unit 42", "Vidar", "XMRig", "Code Signing Abuse", "Go Loader", "Fantasm Packer", "AMSI Bypass", "File Inflation", "Cryptomining", "Info-Stealer", "Malvertising"]
author: "tkddnr924"
summary: "Unit 42가 2026년 4월 관찰된 대규모 Vidar Stealer + XMRig 캠페인을 분석. 정보 탈취와 크립토마이닝을 동시에 수행하며, JustWatch·BleacherReport 등 정상 기업 인증서를 흉내낸 Rogue CA로 코드 서명 위장, Fantasm 패커로 감싼 Go 로더, 최대 2GB에 이르는 파일 인플레이션으로 방어 회피, AMSI 우회, PEB 워킹, 지연 실행 등 다양한 우회 기법을 결합. 스테이지 2는 X3D MINER(XMRig 변종) + Vidar Stealer(FileID V4 프로토콜) 병렬 실행."

iocs:
  hashes:
    - "03e6f4f49cec3af38bbec9ed64c195c7a85a630ec989efb3669f04a2993c1dd7"
    - "097a87cfa4a5186aba3bba096866692951bde59c6f0c2e8c1c4a599246d14da8"
    - "0a6a67a2fc4d79ec1cd8afc5b8b7a5e69a406e53d57a7334e097c5d0644de5f6"
    - "15489bcd6e4602b41c9a787ec8d7ab027d5e45d400938048bb1c702ad5937980"
    - "169a330353e53a409e0109c914404354741ff1e1c64e501738dc05e58ea92abc"
    - "201594c9d173bba6cb509407ecba378c19b93da0a81a2182a913c480e6dbb54e"
    - "20bf39e1e67152039e70a01ad9e7b23c08d23d2a724ef9c44903f3d4353a2275"
    - "2a02ec4af5ed591afdf1236a443e3b68642ee133f38a2857d1eada51246ab498"
    - "2b7297a5f502a2e9a59066f0a370bc5a8b28addd0e27975db3d770f801c15397"
    - "2c0b344af415b787b396c8e23bbeb112bd471a1ca1d12cf357c48e2ee1ae068c"
    - "2c6e8f86c05781af12b323311e83e011f1a603928e2086c48e2ca59e33d90dbe"
    - "2e11a16f94484e0f43eb4572f800f26f0b4a1314cbdae3c44c1ae35f376906d8"
    - "2f1400a91c853d61622f4d21ed97d96ea1093c0fa1586669bea6f6baa331251f"
    - "314ce675c040c63b825f213965f5c76a3bd09bf70e138708367e2a84e9e84b30"
    - "32172e4d8d2ab9fb29b36c9b279117be6ff611b5b91ff7b1c42501a5ec969f2b"
    - "330efeebba3782994612fdfe20ff96c930af33a83b88a342b6622461511921b2"
    - "35b51bbe42edd15918b015eaa1b4f0e6b5c94f186d71d887e39f1da69a4dec3f"
    - "35dde1b2482b12582820a861e7c46f10721af6b75052fc872c05d2230a4e8ca1"
    - "3c3f12531045b7eedfe25e0f291d4792b0d8c8366f8de043e2fa8ecf34ccb913"
    - "3db33b0423bb9278db267a7adb036ecbd6aeebd7909d06d824919708b1e12e1b"
    - "3e906ae47e9836a591f44d4b743e961d634a404fa8fd8bfae64f1d54c853be2b"
    - "43920ef7d2742d140a1ab2a1ef172c716903474c73561377dc4f1534d2c5f581"
    - "47d6d1a38534ba897a5a1e293e3d5df303bbd8e0526e756ad08887ffc1417bef"
    - "488d941b7b4428b0f4a0e5495e3857b9b96215fb3e7f164b06640d59096425e6"
    - "4bf770a59d367b532dec32668f86003b17d93918dba5ef5fd2b19c5394252436"
    - "4f456142caf590d98fb11ca247800bb417766714527e5a4707ac2f5d01542626"
    - "53d263b292be387843fadb7131c2d538b4262c81f5b95cfacafacf2d5446c06e"
    - "5494909e0f5221db75e933b28981b2d0e118f227b7d8a5980d88b500b76dfc2e"
    - "54dc05ab56244444f86d69b8274a6075906f7ba2307b08e08d3884abde255495"
    - "559f46ceb801a3540eace594476718e1486b5b4423cfb4ff64530ff8fb4a3815"
    - "5838ae6c748dcbdfa13c6529c654cb821897d29835d3e7e05ca23fb2f3794f02"
    - "59b9153c4c9e155c976db1a2fd4d1b28fa10bb9c4dcafdc4758b352c037e3d86"
    - "5b6a466b65d479b77a03b15a95ac097b45e23ff7ae5ef6282985b2a503deb691"
    - "5d7324d8b5a25f862ef8223c6766d0e80af3ad168e17312b265e13a3a68e0ded"
    - "613e5314a7ded3155cdec49fd34e852e181f4651d78bd8bf3adad2f4dbf22b0d"
    - "62877a5096828c4bc2fca7cbee7d38b11a0c90fd0d3fc8c37981581e9988c919"
    - "634e89d8592d7c9e2bc1c098217a813947b44a4f80bc569e9a15c1e8b0864b91"
    - "67569adec99fd38b114ae07e2e549e6c16f75368f3c5373022c84934ed1c8e84"
    - "68ced9d7c1b1ff8ffb5f56c7d3f849d4fd16a1b95324426811424b40043d6d25"
    - "69946018ddda1058ce5c2a556c78a747838865c47074dcb165effb0840cb1cf5"
    - "6b7ff061eebeb9ead8812c410247768a7ba90786aeeb1bafa6412cc5b08237b5"
    - "6d49233b1fca22f3823e856e4c16749e9c45f384ea57055fead16df35b217226"
    - "71c79e8bf71ed257435ea9b8b91e118ba03ec681860651190f7d7457804313ee"
    - "739cdedb20de39aeb1f15dc8c2dbbf15fa993250fd879bf87443ff9aeaf4997b"
    - "74df77b6a83d89fa137fd285a2efde36b1d62c00b3be81cc93df7d1e6e94837b"
    - "7720e83c02a027d70ae201c393c1956aa2fa8199879a3a4c4fd1d20b03022cfd"
    - "77469615c5f548063922b469a8c0a4116511395d013e5a798e123e9c119acc4b"
    - "7828e17e674507ab13dfd84b31b361fa19b9cb27ee130620ba9211feef746d31"
    - "7e49da0ae2f81e14841f356b4d69f0480c2d9ce3fab5a3fa91b0036d9a36fa0f"
    - "7ed4a256e1d281cb4f194d13ff554fd4fb280dafde0a67a18115ea038ea6c87d"
    - "8b40cc7d173efd27fb60f3d260acef28f58d67d1f39597e1d611db311a305f62"
    - "8dbcde2a28a0b3de201214d7e3bd43acc97561924daa247c05c4b0536d42be85"
    - "901a43b42f997710147295a0625e20c935207f8c531daf5311449ec119a37dcc"
    - "914c18a04a2727bba9cecab78a1d516ec3c7a3f667e0e5a6081aa0e9206a69fe"
    - "94db6fa14b4e487dffba709b87e8a7e25483300ed409de243b19fff7cf2f0978"
    - "95cd48130247525d8a7e966bd3fa07e9d6c39ebbe3058ecccb336f66bb8e3d1e"
    - "9656d3301f63ef6114289739a1c44082206298f787238fc6c190ad87eab24751"
    - "96bb418128deeb2b9d2e4b66b98cae07b238b326b6456cc9b86802e67c504a03"
    - "98cce1e69873de25e5139aa848f469bef2af345a8a49d15000b5b5e72b582896"
    - "9b3df1b6c1b98c201de09a7719066f7bcae6b66a3173b703a617f53fddf67d51"
    - "a1039de7ec690d64db9d7d91f3d777d308e49e958de4154aa0b62ded7820f1fe"
    - "a17a972a05afe387ed32aa2986d5be8bca2f22619d0aedfa834c6963abfab3bf"
    - "a4f979b4a5d7bc8bc455dd4c09b44e51a389576fccce35a2c8da3ce680237565"
    - "a64843ebfbc39e96ec7613003b1b5c3a9b878874ea15a05e1d34ce91781ebfb6"
    - "a785fc61fc4ff7cff0ddb540bf7ff12111ed0d6031f78f48387a6c16cb3c5451"
    - "aa0083f662f055e8d911c5de3a8f3a31b3c84cacc7dccc30c98f2be14dba4102"
    - "aaa2bc1128d8b8b2da76262bf87ede19bac053cca6576efba6aaa71c9438c304"
    - "b58814fb3ce5a085014ee6e8d89f7cc1380b234b97170fd5f3398031281c6a77"
    - "b6912c23cccc4b0964d55608916297f6978f0b38c80a4beac472004a786fcef7"
    - "b830f043076a12748b6a2dc0810ece85439ee77434d991ae7d84201b09ead756"
    - "b8b5f6991a3a61083461d5269245bebf28b90934c328848ba8c1e084a5a6216c"
    - "b927d265fa29e471c1ae0d31516e480c09c0fb17f480ad08ea8d5b73e84b7a1b"
    - "b9b6893fa6b04ee8daa29e515c08239ac5204af1a1fa2bc10006eede1b41329b"
    - "bb30cc2b302d9a6963109b201b78d4163bb6c2d7bc8bf5a66e9a744b62fc2717"
    - "bd3230e4ceaf32ad2248ab069b164bd2144401967ac69de0a4cd1734fe429d9c"
    - "c25799facb3e788830bcf614f33411d3bcfc0edd4a2200e160b5eb4ce700039f"
    - "c328b78c21060e2203ac517833fce41572b91878e187f85fa434cd6914659834"
    - "c39fedb662259bd76b11616966c41ff1fbda58d9b129b9c1bd818700eea92b29"
    - "c7a4a547eb7f6b0b4b75bb6dd8955244bb2618ba234ae740cdedd7c2d30e3465"
    - "c7c37a973b14edd5b6b2da4a1497c593e43640735ff54aecc9a3288fa5e548e3"
    - "ca8a00c9d36c64e5dcf562c7ae2b8df4bd6455fe0b41b32ee3a2a528ddc2d155"
    - "ce379de03e35e0ea2c88744c29b9e2678165214065f9b957177002c6bbe69084"
    - "d18369be4487d7cd0e4bd3dd0da720672e56e13ca43627305e26767e26925551"
    - "d2148a458da46e81702136aa915312d360805f083d1f37ff5531db9fbdb8ad6d"
    - "d384c403c084967d8c967501ee6332b050af04ef424f13a3f5a88d155389d98c"
    - "d6446f2803444bd2200d48a01a9ad7d487e67e8e831c9cd13f89cbfec17fd4e2"
    - "d7745513034af14617436ad6b3fc125fd0343218411d0c79bda56b0dadc86b2b"
    - "d78082dc33c6dca98316e865efa9829c6eb5a97c2ca3cd4ea6c2123a5f6ae45b"
    - "d7b56818c829960b692de9ad5a14e52669d953e9f074f7218c3fe34ede4a11a0"
    - "d7c9c9469c513c05aa431fae34f414f91fcf3f794d3e76b6e4d0b92c4cd3ff2e"
    - "d8ac0c08e4c698017558e532974cf749135d3d49757f05001e6127dc6e07cf17"
    - "d8c1f96107a3349e62b3ab9afc60f62af9c89b6961b637a26b71e1230f2b3b8a"
    - "db2a872f712fbdb1e347d06e29a9ed8278d86710ffc14ff04422be76e47124f4"
    - "dccf9f008b42a04f7e69d3bbf7b5ce81e71308545d6176cc4763920a424e5ac1"
    - "e5341edb7c039c456d46c39f194be86ce4b41725d7ad12d297d18aa99cddd675"
    - "e88c41a6f769cd760e323b4f7c01835433cd4059cd59630cb1a9eb1181b350ed"
    - "e9e5e748ec5c0b811c8e60b0e55059edb4d2df86ff3ca45969e57d5fecb11a38"
    - "f0dcb7e407de85d8de8e2221df8dddecac8aec88af8975c9f07e14100f6edb88"
    - "f13f9cef5cc020bf673c7f4e19c93c312a043867f46796a8f01927a9a14c2533"
    - "f760bc16a585325ba9d74917f9e0994d3a4164c1141158c799b619d2c823e818"
    - "ab92f731ab20774dfdb95664ee41a2fbafe2a284"
  domains:
    - "justwatch[.]com"
    - "bleacherreport[.]com"
    - "ip-api[.]com"
    - "pool.supportxmr[.]com"
  ips:
    - "116.203.243[.]208"
    - "136.243.203[.]109"
    - "136.243.203[.]111"
    - "138.199.246[.]13"
  urls: []

sources:
  - name: "Unit 42 (Palo Alto Networks)"
    date: "2026.07.07"
    title: "Vidar Stealer Unmasked: Code Signing Abuse, Go Loaders and File Inflation"
    url: "https://unit42.paloaltonetworks.com/vidar-stealer-xmrig-miner-campaign-analysis/"
---

## 개요

Unit 42는 **2026년 4월 대규모 Vidar Stealer + XMRig 캠페인**을 분석했다. 정보 탈취와 크립토마이닝을 **동시에 수행**하는 이중 목적 캠페인으로, 다음 세 가지 회피 기법이 결합돼 있다.

1. **Code Signing Impersonation** — JustWatch, BleacherReport 등 **정상 기업의 인증서를 흉내낸 Rogue CA**로 로더에 코드 서명
2. **Go 로더 + Fantasm 패커** — Go 언어 기반 로더에 Fantasm 패커를 이중 적용, PEB 워킹·AMSI 우회로 인메모리 실행
3. **File Inflation (최대 2GB)** — 샌드박스·AV 분석 도구가 처리 못 하는 크기로 부풀려 방어 회피

최종 페이로드는 **X3D MINER(XMRig 변종) + Vidar Stealer(FileID V4 프로토콜)** 를 병렬 실행하며, 감염 성공 시 **Telegram 봇으로 실시간 알림**을 공격자에게 보낸다.

{{< img src="/images/posts/unit42-vidar-xmrig-code-signing-abuse-2026/01-samples-timeline.png" alt="2026년 4월 캠페인 샘플 타임라인" caption="▲ Figure 1 — 2026년 4월 캠페인 — 일별 Vidar Stealer 샘플 발견 수 (출처: Unit 42)" >}}

---

## 캠페인 개요 표

| 항목 | 내용 |
|---|---|
| 관찰 시기 | 2026년 4월 (대규모 파동) |
| 유포 경로 | **말버타이징(malvertising)** → 패스워드 보호 아카이브 다운로드 |
| 로더 | **Factory-v3** (Go 언어 기반) |
| 패커 | **Fantasm packer** (이중 적용) |
| 스테이지 2 | **X3D MINER** (XMRig 변종) + **Vidar Stealer** |
| Vidar 프로토콜 | FileID V4 |
| C2 서버 | 4개 IP (Vidar C2 클러스터) |
| 채굴 풀 | `pool.supportxmr[.]com` (Monero) |
| 지역 확인 | `ip-api[.]com/json` (GET) |
| 알림 채널 | **Telegram 봇** (감염 성공 알림) |

---

## 공격 흐름

{{< attack-flow >}}
{{< step icon="fas fa-bullhorn" title="① 말버타이징 → 패스워드 아카이브 다운로드" >}}
악성 광고로 피해자 유인 → 패스워드 보호 아카이브 배포. 아카이브 압축 해제 시 **Factory-v3 로더 바이너리** 확인
{{< /step >}}
{{< step icon="fas fa-certificate" title="② Rogue CA로 코드 서명 위장" >}}
공개 신뢰 저장소에 없는 **Rogue CA**로 서명(예: `CN=justwatch[.]com`). 이후 `BleacherReport[.]com` 등으로 인증서를 **정기적으로 갱신·교체**
{{< /step >}}
{{< step icon="fas fa-file-invoice" title="③ Fantasm 패커 + Go 로더 실행" >}}
Fantasm 패커로 이중 감싼 Go 로더가 실행 — 빌드 머신 경로가 메타데이터에 노출됨
{{< /step >}}
{{< step icon="fas fa-shield-halved" title="④ AMSI 우회 — AmsiScanBuffer 패치" >}}
`AmsiScanBuffer` 위치에 **`0x80070057`** (E_INVALIDARG) 리턴 바이트 패치 → 안티멀웨어 스캔 무력화
{{< /step >}}
{{< step icon="fas fa-globe" title="⑤ 지리 정보 비콘" >}}
`GET http://ip-api[.]com/json` — 피해자 공인 IP + 국가 조회, 이후 Telegram 알림에 삽입
{{< /step >}}
{{< step icon="fas fa-download" title="⑥ 스테이지 2 페이로드 드롭" >}}
X3D MINER(XMRig 변종) + Vidar Stealer(FileID V4) 병렬 배포. **최대 2GB로 파일 인플레이션** 처리
{{< /step >}}
{{< step icon="fas fa-coins" title="⑦ XMRig 채굴 시작" >}}
`pool.supportxmr[.]com` 대상 Monero 채굴 개시, 마이닝 프록시로 **`136.243.203[.]109`** 사용
{{< /step >}}
{{< step icon="fas fa-user-secret" title="⑧ Vidar Stealer 정보 탈취" >}}
FileID V4 프로토콜로 C2 통신, 브라우저·지갑·자격증명 수집
{{< /step >}}
{{< step icon="fab fa-telegram" title="⑨ Telegram 봇으로 신규 감염 알림" >}}
공격자에게 실시간 알림 — 피해자 IP/국가 포함
{{< /step >}}
{{< /attack-flow >}}

{{< img src="/images/posts/unit42-vidar-xmrig-code-signing-abuse-2026/05-execution-chain.png" alt="X3D MINER / Vidar Stealer 실행 체인" caption="▲ Figure 5 — Factory-v3를 통한 X3D MINER · Vidar Stealer 실행 체인 (출처: Unit 42)" >}}

---

## 핵심 기법 분석

### 1) Code Signing Impersonation

정상 로 신뢰받는 기업 인증서를 **완벽하게 복제한 뒤 Rogue CA로 서명**하는 기법이다. 공개 신뢰 저장소에 없는 CA라 정식 체인 검증은 실패하지만, **파일 서명 정보만 표면적으로 보면 정상 기업 소유**로 보인다.

- 초기 로더: **`CN=justwatch[.]com`** 서명 → JustWatch 위장
- 이후 갱신: **`CN=bleacherreport[.]com`** 로 회전 → BleacherReport 위장

이 기법은 자동 방역 도구가 **인증서 발급자 이름 기반 화이트리스트**를 사용할 경우 우회 가능성을 만든다.

{{< img src="/images/posts/unit42-vidar-xmrig-code-signing-abuse-2026/03-rogue-cert.png" alt="Rogue CA 인증서 정보" caption="▲ Figure 3 — Rogue CA로 발급된 로더의 인증서 정보 (출처: Unit 42)" >}}

### 2) Fantasm 패커 + Go 로더 (Factory-v3)

Go 언어로 작성된 로더에 **Fantasm 패커를 이중 적용**한다.

- Go 컴파일 특성상 **PDB / 빌드 머신 경로**가 바이너리에 잔존 — 공격자 개발 환경 프로파일링 가능
- 정적 링킹으로 인해 최종 바이너리 크기가 이미 크며, 여기에 **인플레이션 스텁**을 추가해 **최대 2GB**까지 부풀림
- 다수 AV/샌드박스는 **500MB~1GB 이상 파일 스캔 스킵** 기본 정책 → 회피

{{< img src="/images/posts/unit42-vidar-xmrig-code-signing-abuse-2026/02-build-machine-path.png" alt="빌드 머신 메타데이터" caption="▲ Figure 2 — 로더 바이너리에 잔존한 빌드 머신 경로 (출처: Unit 42)" >}}

### 3) AMSI 우회 — AmsiScanBuffer 패치

**`amsi.dll!AmsiScanBuffer`** 함수 시작부에 **`E_INVALIDARG(0x80070057)`** 를 즉시 리턴하도록 바이트 패치를 주입한다. 이후 실행되는 모든 스크립트·인메모리 페이로드에 대해 AMSI가 항상 "안전"으로 응답하게 됨.

패치 방식:
1. `LoadLibraryA("amsi.dll")` + `GetProcAddress("AmsiScanBuffer")` (또는 PEB 워킹)
2. 프리앰블 6바이트를 `mov eax, 0x80070057; ret` 로 덮어씀
3. `VirtualProtect`로 페이지 권한을 `PAGE_EXECUTE_READWRITE`로 임시 전환

{{< img src="/images/posts/unit42-vidar-xmrig-code-signing-abuse-2026/04-amsi-patch.png" alt="AMSI 패치 바이트" caption="▲ Figure 4 — AmsiScanBuffer 위치에 기록된 패치 바이트 (0x80070057) (출처: Unit 42)" >}}

### 4) File Inflation — 최대 2GB

로더 자체 크기가 이미 큰데(수백 MB) 여기에 **더미 섹션 추가**로 최종 2GB까지 부풀린다. 실무적으로 다수 AV가 스캔 대상 크기 상한을 두므로, **크기만으로도 스캔 회피**가 발생한다.

### 5) PEB 워킹

Import Address Table을 우회하기 위해 **Process Environment Block(PEB) 워킹**으로 `kernel32.dll` 등 로드된 모듈을 런타임에 직접 찾고 API 주소를 해석한다.

### 6) 지연 실행 (Sleep-based)

샌드박스 우회를 위해 **의도적인 sleep**을 삽입 — 짧은 실행 시간(보통 3~5분) 안에 판정하는 자동 분석 환경을 피한다.

---

## 스테이지 2 — X3D MINER + Vidar Stealer 병렬

Factory-v3 로더는 두 페이로드를 **동시 실행**한다.

### X3D MINER
- 기반: **XMRig** (오픈소스 Monero 채굴기) 변종
- 마이닝 풀: **`pool.supportxmr[.]com`**
- 마이닝 프록시: **`136.243.203[.]109`**
- 화폐: XMR (Monero) — 프라이버시 보장 코인

### Vidar Stealer
- **FileID V4 프로토콜** (Vidar 최신 프로토콜)
- C2: 4개 IP 클러스터 (`116.203.243[.]208`, `136.243.203[.]109`, `136.243.203[.]111`, `138.199.246[.]13`)
- 수집 대상: 브라우저 자격증명·쿠키·자동완성, 암호화폐 지갑, FTP/이메일 클라이언트, 시스템 정보, 스크린샷

### Telegram 알림
공격자는 감염 성공 시 **Telegram 봇 토큰**을 이용해 알림을 받는다. 알림 메시지에는 피해자 **IP + 국가**(from `ip-api[.]com`)가 포함되며, 봇 토큰·Monero 지갑 주소·마이닝 풀 호스트명은 다음 키로 암호화된다.

```
Key: 69946018ddda1058ce5c2a556c78a747838865c47074dcb165effb0840cb1cf5
```

---

## IoC 요약

### C2 IP (Vidar)
- `116.203.243[.]208`
- `136.243.203[.]109` (마이닝 프록시 겸용)
- `136.243.203[.]111`
- `138.199.246[.]13`

### 도메인
| 도메인 | 용도 |
|---|---|
| `justwatch[.]com` | 코드 서명 위장 대상 (Rogue CA) |
| `bleacherreport[.]com` | 코드 서명 위장 대상 (Rogue CA) |
| `ip-api[.]com` | 피해자 지리 정보 조회 |
| `pool.supportxmr[.]com` | Monero 마이닝 풀 |

### SHA-256 해시
총 **99개** 확인 (frontmatter에 전량 포함, IoC 그래프 자동 연동). 대표 샘플:
- `03e6f4f49cec3af38bbec9ed64c195c7a85a630ec989efb3669f04a2993c1dd7`
- `69946018ddda1058ce5c2a556c78a747838865c47074dcb165effb0840cb1cf5` (Telegram 봇 토큰 암호화 키)
- ... 나머지 97개는 frontmatter 참조

### SHA-1
- `ab92f731ab20774dfdb95664ee41a2fbafe2a284`

---

## MITRE ATT&CK

| Tactic | Technique |
|---|---|
| Initial Access | T1189 — Drive-by Compromise (malvertising) |
| Defense Evasion | **T1553.002 — Code Signing** / T1027.001 — Binary Padding (파일 인플레이션) / **T1562.001 — AMSI Bypass** |
| Execution | T1204 — User Execution |
| Discovery | T1082 — System Information / T1614 — System Location |
| Collection | T1005 — Data from Local System / T1503 — Credentials from Web Browsers |
| C2 | T1071 — Application Layer Protocol |
| Impact | **T1496 — Resource Hijacking** (크립토마이닝) |
| Exfiltration | T1041 — Exfiltration Over C2 |

---

## 방어 권고

| 영역 | 권고 |
|---|---|
| 인증서 검증 | 실행 파일의 **서명 체인 검증** (subject CN 화이트리스트 지양, root CA 신뢰성 함께 확인) |
| AMSI 무결성 | AMSI 함수 프리앰블 무결성 모니터링, EDR로 `amsi.dll` 코드 페이지 쓰기 이벤트 탐지 |
| 대용량 실행 파일 | 500MB 이상 미서명 실행 파일 실행 시 사전 알림 정책 |
| 광고 차단 | 광고 네트워크 화이트리스트/브라우저 광고 차단 |
| 프로세스 원격 스레드 | Fantasm 패커 특유의 원격 스레드 생성·메모리 매핑 패턴 EDR 룰 |
| 아웃바운드 트래픽 | `ip-api[.]com`, `supportxmr[.]com` 도메인 접속 알림 |
| 크립토마이닝 탐지 | 지속적 고 CPU 사용 + Stratum 프로토콜 트래픽 탐지 |

---

## 시사점

이 캠페인은 **"이중 목적 페이로드 + 다층 회피"** 조합의 전형이다. 개별 기법(AMSI 패치, 코드 서명 위장, 파일 인플레이션, PEB 워킹, sleep 지연) 각각은 이미 잘 알려진 기법이지만, **전부 결합**해 다층으로 배치된 것이 이번 캠페인의 핵심 특징이다.

특히 **Rogue CA로 정상 기업 인증서를 갱신형으로 회전**하는 방식은 공격 인프라의 지속 유지 능력을 시사하며, 크립토마이닝의 **직접 수익화** + Vidar Stealer의 **자격증명 유출** 이중 목적 구조는 캠페인 ROI를 극대화하는 설계로 평가된다.
