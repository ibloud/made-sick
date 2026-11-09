# Historical Story Finder acceptance — 9 November 2026

## Status and boundaries

**Local registered HTTP MCP search: verified against live public repository records. Installed plugin and direct PDS acceptance: not complete.** The installed ChatGPT plugin has no story-search tool; this separately reviewed source change does not update it. The direct PDS remains blocked by the running cloud proxy (CONNECT HTTP 403), even after the owner reported adding its domain. The 13:35 UTC runtime read still omitted that domain. The successful source below is explicitly the public Bluesky repository entryway relay, not direct-PDS or AppView search.

Public identity: `ibloud.xyz` ↔ `did:plc:b5uem672ci23lqrcz6j6bs2c`. The [DID document](https://plc.directory/did:plc:b5uem672ci23lqrcz6j6bs2c) binds the handle and identifies `https://morel.us-east.host.bsky.network` as PDS. Forward handle resolution was checked through the public standard identity endpoint. Records/CIDs are provider-reported over HTTPS, with identity and schema validation; no cryptographic repository signature/CAR verification is claimed.

## Confirmed cause and existing work

- Default branches inspected: Made-Sick `03613ef`; PIXIE `2ea7361`. Existing `story-finder.html`, `story-ledger.js`, retrieval/ledger documentation, tests, Companion dispatcher and source/deployment adapters were read. Working code was reused.
- `apps/companion/lib/companion.mjs` previously registered no identity/story-search/continuation operation. Installed `list_projects` still reports v0.5 snapshots; installed tool discovery contains no historical search. This establishes the missing integration. It does not prove which unrecorded prior search produced a particular failure.
- Existing Finder uses AppView `getAuthorFeed` only and searches loaded posts locally. It already retains `state.cursor` between 25-page/2,500-post batches, with More/Batch continuation. A hard 2,500 total cap is **not confirmed**. Date mode continues separately; it does not establish full repository coverage.
- Existing normalization strips accents and case but not apostrophe variants. The new normalized phrase matcher treats straight/curly/omitted apostrophes alike and preserves original source wording.
- Repository enumeration must not use a whole page of old publication timestamps as an exhaustion boundary: record-key ordering does not guarantee publication-date order. Repository mode now follows cursors through the available collection.

## Retrieval coverage and required search

The live dispatcher ran 12 bounded invocations, examined 27,490 unique records within batches, and exhausted the available collection. Observed interval: **2023-11-13T13:34:08.616Z–2026-11-06T10:33:14.213Z**. Each invocation used at most 25 sequential 100-record requests; the final terminal invocation returned zero records and no cursor. No database or persistent runtime archive was introduced. The following files are deliberately requested acceptance evidence, not an indexing service.

[All 107 required-query text matches, full source fields and every batch endpoint/cursor](story-history-matches.json). Dates below are the original record timestamps in UTC, not retrieval or indexing dates. The JSON also records retrieval times and classification. Metadata is searchable, but the counts here deliberately describe matches confirmed in the original record text.

| Normalized phrase | Matches in original text |
| --- | ---: |
| Diary of Death's Daughter | 31 |
| The Diary of Death's Daughter | 30 |
| Death's Daughter | 73 |
| Death’s Daughter | 73 |
| Deaths Daughter | 73 |
| Rebirth | 32 |
| Walking the Path | 3 |

## 31 verified full-title posts, oldest first

Every entry below was returned by the live public repository search. Exact excerpt spelling/case is retained. Each is an account-owned post/reply, not a repost. Source endpoint, retrieval timestamp, CID, AT-URI, reply classification and all text are retained in the linked JSON. A post proves that its author published the words; claims in the words are not independently adjudicated.

### 2025-03-13T14:35:37.750Z

> The Diary of Death's Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lkbcy6gxis2g) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lkbcy6gxis2g`  
CID: `bafyreiaxzlwukbcvgpko6him6yhnewilkqbgwllztxdst5jw2fbmyzfpdm`

### 2025-03-21T01:34:02.201Z

> An excerpt from an entry in the diary of Death's daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lku2zx2ewk2d) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lku2zx2ewk2d`  
CID: `bafyreifq7nkecbsp66qkrkxjnvunerx5qm4gf4jxfyur7ijqhsnrromvsq`

### 2025-04-07T01:29:45.790Z

> From the Diary of Death’s Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lm6spxe3ks25) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lm6spxe3ks25`  
CID: `bafyreiciy64dvd5owsvmgeilwicz4i4cbmgr7peorprtulu2qvelyx2b34`

### 2025-04-08T19:02:44.740Z

> The Diary of Death's Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lmd5zqxdx22g) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lmd5zqxdx22g`  
CID: `bafyreic5pv7qyr563kwtkbzflyibaseuqypmvjuv6sqd46xqo3e4vfc2vi`

### 2025-04-10T23:40:08.864Z

> ... an excerpt from the Diary of Death's Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lmiohmxbak2z) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lmiohmxbak2z`  
CID: `bafyreibf5egt5epieihogzonu3dlh247srz52ril3wjil32465vxnah7qu`

### 2025-04-11T16:08:18.983Z

> The Diary of Death's Daughter : The Queen's Journey is a way for them to learn to love life after death and for adults to remember how to #chooselife again.

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lmkfomg24s2r) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lmkfomg24s2r`  
CID: `bafyreifdhmnrrxls6w5tcacvte5ttagb4skk4yg62khxzbzl6hieitu7hm`

### 2025-04-12T13:54:10.529Z

> The Diary of Death’s Daughter : The Queen’s Journey

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lmmonobiqk2q) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lmmonobiqk2q`  
CID: `bafyreiaa7tco5afsafi5ice2hyhbxay7a77j77fvv6llloaicqn4lmaksa`

### 2025-04-26T08:34:45.587Z

> The Diary of Death’s Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lnpddfmg2c2z) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lnpddfmg2c2z`  
CID: `bafyreick4lg5oqlxeohgfvlilmumuwmgdtcj3gpkhjgevgkie32ofhrro4`

### 2025-04-26T12:21:10.615Z

> The Diary of Death’s Daughter : A Game of Life and Leadership represents the evolution of critical thinking 🤔

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lnppybckxc2s) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lnppybckxc2s`  
CID: `bafyreigzgki7tdruqr2wv34uvkrmfrx7xzs6tobqt4xglgr6mamr5bwukm`

### 2025-05-18T14:49:35.477Z

> * The Diary of Death's Daughter is how the main character learns her alignment #chess

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lphcjvrtcc2r) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lphcjvrtcc2r`  
CID: `bafyreibwnk2rgmupjwjaiymiptltqlbgs3akds4jglea352zxzrxmxhfh4`

### 2025-06-03T11:49:15.283Z

> The Diary of Death’s Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lqp7w67xfs2q) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lqp7w67xfs2q`  
CID: `bafyreifgpuyl5wh4kb3rte5d3tblpul4f4fyfyyak3btca4nvxy35gepuu`

### 2025-06-16T12:38:02.399Z

> The Diary of Death’s daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lrpypeq37s26) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lrpypeq37s26`  
CID: `bafyreiaeraqgilw6fppurtotclhpuivv5g7tfshkclvi2n3yrlw5ii75ay`

### 2025-06-23T11:56:36.657Z

> If I was interested in having you make a limited edition candle for my Diary of Death's Daughter project, would you be ok with carrying it on your site?

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lsbjnqefuk2k) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lsbjnqefuk2k`  
CID: `bafyreiaixubimsuydgiapvsoyyuujtdvsayozxt6fopn5d4lz4g7uuxvva`

### 2025-07-27T16:16:26.250Z

> Violet’s Revenge came before The Diary of Death’s Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3luxhzngtkc2t) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3luxhzngtkc2t`  
CID: `bafyreibnlz346ewxa2jcvxw6gw2iaffkgnr47keifdiewtspjoa47ottcm`

### 2025-08-14T11:43:52.714Z

> The Diary of Death’s Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lweb6trprs26) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lweb6trprs26`  
CID: `bafyreiassdfl6vubvuophiys7nc3cf5dv4yc656lodasngr5ym6l44atra`

### 2025-09-10T17:48:00.586Z

> The Diary of Death’s Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lyis4sy4bs24) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lyis4sy4bs24`  
CID: `bafyreia7qltnkba6rtze6x6y54ho4ejoqods5lanf3fciqwkjemuxbv6eu`

### 2025-09-24T19:31:42.661Z

> The Diary of Death’s daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lzm6h5bbfk2c) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lzm6h5bbfk2c`  
CID: `bafyreiciipvlnpfdmptcdbhudqcfdd2duywf4zpyrequwopap3qpn4fodm`

### 2025-09-26T12:36:42.223Z

> I created the Diary of Death’s daughter for their consideration

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lzqi6vbrek2m) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3lzqi6vbrek2m`  
CID: `bafyreihjuqtxwybqk7p3acmav6pgxnoxnwxwcly5fmk7kyack5zu6rsnc4`

### 2025-10-14T12:17:44.739Z

> The Diary of Death's daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3m35pjkrx722l) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3m35pjkrx722l`  
CID: `bafyreicjfbvkivze6r7jqlqgps3zxs57rhqjng4zrx3duf4sagpesbgtce`

### 2025-10-14T19:02:12.834Z

> The Diary of Death’s Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3m36g4snfqk2q) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3m36g4snfqk2q`  
CID: `bafyreifqlqy4yzgxgqejfu75euywbsntzdrr7htyyekzno2pjxcwh2wrmq`

### 2025-10-27T16:32:17.565Z

> The Diary of Death's daughter ♟️ #reactsky

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3m46tsp3edk2h) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3m46tsp3edk2h`  
CID: `bafyreihtsmrgbvch6ylqjlyjcbudcfbbfzrubbljcrrr2zb2hrmrsfuoiu`

### 2025-11-14T10:46:28.467Z

> Have you read The Diary of Death's daughter? Wanna join development?

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3m5liuvind222) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3m5liuvind222`  
CID: `bafyreifozimgpwjrls2vxetsnewkldago2qfmn2oevl4lkhow7zoflio4q`

### 2025-12-13T15:39:13.885Z

> Let me know if you’d be interested in working with me on this 5-in-1 strategy game called The Diary of Death’s daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3m7uwr3keuc2i) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3m7uwr3keuc2i`  
CID: `bafyreig6mc7nlvh4sgea4cinshqkcg25c7bssaq6uyu4x4tcpb6h3iogfq`

### 2026-01-20T08:12:00.133Z

> The Diary of Death's daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mctpiefrvk2f) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3mctpiefrvk2f`  
CID: `bafyreigmx2cy5bim2ytczf5zjxg65jkb5hlkpf5atvvayrf3honl7btmbe`

### 2026-03-07T16:46:26.346Z

> The Diary of Death’s Daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mgibolwd2k2g) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3mgibolwd2k2g`  
CID: `bafyreiacnrqwnp44noxpgo4xmftozqcgzxucgp3exubemkgo5yccw2gawi`

### 2026-04-02T21:01:16.464Z

> The Diary of Death’s daughter

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mik427pfqs2t) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3mik427pfqs2t`  
CID: `bafyreiaz7cellok2cfons6vpnhmbzehksgn3l3gq5adkxr4cj72652qgn4`

### 2026-04-12T11:03:25.200Z

> The Diary of Death's daughter has MANY reasons for being created.

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mjc7cexnrk23) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3mjc7cexnrk23`  
CID: `bafyreifm2my54jgo7lvjlogozt3smm3b2f55olwnbnu74w2ols4izvarja`

### 2026-04-22T12:57:39.134Z

> The Diary of Death's Daughter — rendered as a full illustrated HTML comic

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mk3kdttqh22r) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3mk3kdttqh22r`  
CID: `bafyreidhbcxi3p7px6tapbkkkje4xok6dga4iuehbrc5qs5bx4sjiuvrni`

### 2026-04-29T20:20:44.920Z

> I had an interesting conversation with some very lovely people today about The Diary of Death’s daughter. Everyone was intrigued by the concept but …

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mknwemama22d) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3mknwemama22d`  
CID: `bafyreift32r54q5crg6yhryikgy36y4q54gu6zlny25ibpr2zmczuldcyy`

### 2026-06-14T01:06:38.855Z

> This is, "The Diary of Death's daughter"

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mo7ldbawu22c) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3mo7ldbawu22c`  
CID: `bafyreidgys5kx2nbxehjeeb2ku55ghp2p6qimzgtlre5dokgnctep4gcwq`

### 2026-10-11T16:00:45.085Z

> The Diary of Death’s Daughter — a spiritual court record, read by PIXIE

[Original post](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mxmerm56s43v) · `ibloud.xyz` · `did:plc:b5uem672ci23lqrcz6j6bs2c`

AT-URI: `at://did:plc:b5uem672ci23lqrcz6j6bs2c/app.bsky.feed.post/3mxmerm56s43v`  
CID: `bafyreiffonw477tqfc3faeutlpakczir6mgsdmcep2ttxmqduodth4yct4`

## Source-verified development chronology

This is a chronology of public statements, not acceptance of every statement as external fact or story canon. The [canonical architecture](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md) was read before this review. It separates Lady Violet/Sebastian, The RIM, Urban Alien Adventures, Battle the Beast, Violet’s Revenge and Veiled Dominion; each destination repository retains canon authority.

- **2024-04-12T13:06:39.423Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3kpwrso57tb23): Meet Violet: explicitly labels the imagining as inspired by Violet’s Tale and a game pitch; source evidence of fan-fiction development, not permission from the artist.
- **2024-04-16T20:51:53.733Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3kqbnob46q72c): Publicly asks for first thoughts on Violet’s Revenge.
- **2024-04-27T10:14:37.201Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3kr476tzrvo2s): Names The Legend of Lady Violet and Sebastian and links Wattpad with a fanfiction tag.
- **2024-08-30T15:25:58.863Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3l2x2uouqtu2q): Describes developing Violet E. Nightingale from the Tales; evidence of the creator’s adaptation account.
- **2024-09-30T14:34:40.946Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3l5ewhisnxn2o): Describes the Legend → Violet’s Revenge pitch lineage. The creator’s statements about another person’s response remain unverified.
- **2025-03-13T14:35:37.750Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lkbcy6gxis2g): Explicit full-title Diary reference; no inference about the addressee’s participation.
- **2025-04-11T16:08:18.983Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lmkfomg24s2r): Names The Queen’s Journey and explains the creator’s intended grief/choose-life purpose.
- **2025-04-12T13:54:10.529Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lmmonobiqk2q): Describes a card deck, manga and chess derivative. The named illustrator claim is the author’s statement, not independent evidence of agreement, delivery or rights.
- **2025-06-23T11:56:36.657Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lsbjnqefuk2k): Asks a potential candle collaborator a question about the Diary project; an enquiry is not acceptance.
- **2025-07-27T16:16:26.250Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3luxhzngtkc2t): Creator states Violet’s Revenge preceded the Diary. This is creator-provided lineage interpretation.
- **2025-08-14T11:43:52.714Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3lweb6trprs26): Full-title Diary reference alongside playing-card suit research.
- **2025-10-12T16:47:15.374Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3m2z5nnezxk2w): Uses “walking the path” in a producer/founder/artist reflection; this occurrence alone does not identify the later titled Substack work.
- **2026-04-22T10:44:57.092Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mk3cwknmpk2v): Publicly describes an AI response concerning a Veiled Dominion card-deck viewer; quoted AI output does not establish accepted canon or implemented functionality.
- **2026-04-22T12:57:39.134Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mk3kdttqh22r): Explicitly connects the Diary comic presentation to Walking the Path on Substack.
- **2026-10-11T16:00:45.085Z** — [source](https://bsky.app/profile/did%3Aplc%3Ab5uem672ci23lqrcz6j6bs2c/post/3mxmerm56s43v): Describes a spiritual court record read by PIXIE; explicitly frames the Seven Sins connection as personal inspiration rather than a claim about the artist’s intent.

**Rebirth and Mortis:** The JSON retains 32 Rebirth text matches and other source-verified Mortis/Diary references. “Rebirth” is also an ordinary word, so occurrence alone does not establish a particular work, identity or relationship. **IVXX Story Lab:** IVXX references were found, but this review has not independently established an exact “IVXX Story Lab” naming event. **Independent authorship:** public posts evidence creator-authored text and stated development, not adjudicated exclusive rights. No evidence here establishes any third party’s agreement, rejection, control or transfer of rights.

## Parent/thread context

Live AppView `getPostThread` succeeded for 36 title/lineage targets (up to 20 parent levels and one reply level). [Attributed thread evidence](story-history-context.json) separates `accountOwner: true/false`; 80 returned context nodes belong to the account and four to other authors. Other authors’ text is omitted from the report artifact; their identifiers and original links remain. Missing/deleted/blocked context is never reconstructed. Repeated nodes across threads are not independent posts. Fictional dialogue in an owner post remains owner-published writing, not speech verified from a named external person.

## Actual PIXIE interface and release status

The existing `createCompanionServer` HTTP `/mcp` adapter was started locally with an ephemeral test bearer. `tools/list` registered the new tools; an actual authenticated `tools/call` to `search_public_stories` used live HTTPS repository requests and returned 10 title matches dated March–May 2025 after enumerating 2,500 records in that continued batch. The same request without authentication returned HTTP 401. `prepare_story_ledger` returned schemaVersion 2 using the unchanged Made-Sick exporter. No account password or AT publishing scope was used. See the coordinated Companion PR’s `review/STORY_DISCOVERY_HTTP.json` for the exact request and returned result; no bearer is stored.

Code implementation, browser preview, live repository retrieval and installed-plugin release are separate. Local browser checks replayed the actual retrieved records at 820×1180 and 390×1180: keyboard Enter loaded matches, visible selection enabled export, no horizontal overflow or JS errors, and labelled controls/status appeared in the accessibility tree. This is not physical iPad Safari or VoiceOver acceptance. Local preview: `http://127.0.0.1:8765/story-finder.html` while the task server runs; no externally published preview is claimed.

PIXIE PR #12 remains a separate disabled OAuth/security candidate. Its positive allowlist, issuer, grants, credentials and release gates were not changed or bypassed. These tools use existing adapters/authentication only. Adding them to a future OAuth allowlist requires that PR’s own security review. No merge, deployment, public plugin activation, infrastructure purchase or canon edit occurred.

## SkyFeed reference review

- [indexer](https://github.com/skyfeed-dev/indexer/tree/e9f0e3c82e61b3edabbf802cc429e030ce990457): historical enumerator resumes saved progress, bounds concurrency and delays requests; firehose cursor persistence distinguishes streaming from historical backfill. Its README explicitly disclaims integrity verification. License: AGPL-3.0.
- [query-engine](https://github.com/skyfeed-dev/query-engine/tree/bc1601de6cdbc320bfb05a20af8e5f7f94ac602d): single-user historical input and bounded filter/regex blocks are relevant concepts; its RAM/SurrealDB requirements are unnecessary for this one-account repair. License: AGPL-3.0.
- [app](https://github.com/skyfeed-dev/app/tree/b1785e44f34f3b1ea53bc33117b1d38216358d62): feed-builder query composition is a reference, not a retrieval authority; README notes incomplete source. License: EUPL-1.2.
- Made-Sick is MIT. No SkyFeed code was copied and no combined-license compatibility is asserted. Only the general ideas of explicit resumable cursors, bounded work and separate historical enumeration were applied using public protocol methods.

## Documentation and validation read

Read: root AGENTS.md in each owning repository; PIXIE `lib/principles.mjs`; canonical ecosystem architecture; Made-Sick retrieval/ledger docs, schema/exporter and tests; Companion dispatcher/server/security tests; `deployment/RAILWAY.md`; open PR listings in both repositories, including PIXIE #12 body/diff/discussion and existing #11 browser CI work. No pending branch was merged into this repair.

Validation commands/results and exact review heads are recorded in the coordinated PR descriptions. Direct PDS/installed-plugin release, physical iPad/VoiceOver and production-route acceptance remain unverified gates, not passing tests.

## Repair recheck — 9 November 2026, 15:17 UTC

The earlier direct-PDS proxy denial is no longer reproducible in this environment.
The existing Companion local HTTP `/mcp` adapter, using its unchanged default
proxy-aware server transport, resolved `ibloud.xyz` and searched two pages directly
from `https://morel.us-east.host.bsky.network`. It examined 200 records, found one
exact title match and retained continuation. Authenticated HTTP returned 200;
the same request without the ephemeral machine bearer returned 401. The bearer
was not recorded. This is a bounded connectivity/search observation, not a new
full-history enumeration or installed-plugin/hosted MCP acceptance.

Public-source evidence:
https://github.com/Loptr-Lab/pixie-ecosystem-guide/blob/fix/public-story-discovery/apps/companion/review/STORY_DISCOVERY_DIRECT_PDS.json

The existing Story Finder Vercel preview returned HTTP 200 through the connected
Vercel fetch tool. A local Chromium live-provider attempt hit
`ERR_CERT_AUTHORITY_INVALID` for the environment's HTTPS inspection certificate;
no TLS verification was disabled. It retained the existing visible fetch error
and selections rather than claiming a successful load. This is an environment
browser-trust limitation, not proof of an application/provider defect. Physical
Safari/VoiceOver and deployed-browser search/export remain unverified.

Made-Sick's existing suite was rerun: 85 tests pass. No Finder behavior,
dependencies, stylesheet, exporter or source pin changed in this repair recheck.
