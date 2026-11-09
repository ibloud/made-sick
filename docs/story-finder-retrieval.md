# Story Finder retrieval improvements

Story Finder remains read-only and searches public posts in the current tab. It does not log in, publish, or transcribe audio.

## Use

- Load an author feed, then search post text, image/video descriptions, and external-card titles/descriptions.
- Select **Videos only** to restrict matches to native AT Protocol video embeds, including videos attached to quoted records. External video links are not classified as native videos.
- Select **Load up to 2,500 older posts** for at most 25 sequential API pages. **Stop loading** aborts the pending request and retains retrieved posts and selections. Filters still apply locally.
- Date searches exclude pinned feed insertions and only declare a date boundary when an entire page's non-repost post dates precede the start date. This favors extra retrieval over prematurely claiming coverage. Results still depend on AppView availability and ordering.
- Paste an HTTPS `bsky.app` or `mu.social` post link under **Read a post and its conversation**. This retrieves up to 20 parent levels and two reply levels through the public Bluesky AppView. Conversation content stays separate from the ledger; open original links for additional context.

Missing captions, transcripts, deleted posts, or unavailable replies are not reconstructed. Audio transcription remains future work.

## Sifa conversation: source and scope

Source: https://mu.social/profile/sifa.id/post/3mygz3t3ee227 (22 October 2026), read with its public parent chain through `app.bsky.feed.getPostThread`.

Sifa said it can discover `org.made-sick.participant` records and suggested stories/milestones for richer cards. It said its activity stream emphasizes creation rather than joining. These are Sifa's statements, not independently verified interoperability results.

This change adds post/thread retrieval to Story Finder. Publishing new story or milestone record types is a separate proposal requiring existing schema/OAuth inspection and an explicit author-controlled publishing flow; it is not part of this change.

## Verification

Run `cd tests && npm ci && npm test`. Retrieval tests exercise media filtering, date pagination across an old repost, cancellation retention, URL validation, and safe conversation rendering without ledger mutation.

Before release, preview Story Finder on desktop and iPad widths, paste the Sifa source link, confirm parent context and original links, load/filter native videos, and stop a batch load. After merging, repeat these checks at https://made-sick.org/story-finder.html. A merged change is not evidence of a successful live deployment.

## Public repository retrieval (separate review, November 2026)

The existing Finder now offers **Public PDS repository** alongside the unchanged
hydrated AppView feed. Made-Sick owns `story-retrieval.js`; PIXIE vendors an exact,
hash-pinned reviewed copy instead of downloading executable code at runtime.

Handles resolve through the public AT identity endpoint and are checked against
the DID document. Supported PLC DIDs and reviewed-provider bare `did:web` DIDs
also receive forward/reverse handle verification. PDS origins must be credential-
free HTTPS on the closed reviewed-provider policy (Bluesky PDS hosts, bsky.social,
eurosky.social). Unknown providers, DID web paths/ports and other collections
fail explicitly; they are not proxied or guessed. `org.made-sick.participant` is a
known participant schema, not a post lexicon, and is not converted into stories.

Repository mode uses `com.atproto.repo.listRecords` for `app.bsky.feed.post`,
100 records per page, at most 25 pages/2,500 records per invocation. Continue with
the returned cursor and the same account, collection and source. The entryway
option explicitly uses bsky.social's standard repository relay; it does not
silently replace the discovered PDS or claim to be an AppView response. Other
PDS providers do not depend on that relay. Requests omit credentials, reject
redirects, time out after 15 seconds and bound streamed responses to 3 MB.
HTTP 429 stops with the cursor and Retry-After; callers wait before resuming.
Cancellation retains committed pages. No retry storm or background archive.

Repository record keys are not a publication-date index. Therefore repository
mode never stops at a page of old timestamps: date filters apply locally while
pagination continues. Replies remain searchable; a quote's other-author text is
not copied. Repository post records are originals/replies, not repost records;
AppView still supplies repost classification, hydrated media and conversation.
A returned CID is source-reported, not cryptographic CAR/signature verification.

Exact matching uses normalized phrases; apostrophe variants (including omission),
case, accents and whitespace normalize without rewriting source text. The module
and MCP contract additionally accept newline-separated alternative phrases.
Regular word mode requires every word in a phrase. Post text and supported
record metadata are searched, with no transcription or universal lexicon guess.
Coverage is explicitly a batch's records/pages/date interval, not an inference
from a search index. Exhaustion only describes currently accessible records;
deleted/inaccessible material cannot be ruled out.

Ledger v2 and its permission notice are unchanged. PIXIE's explicit
`prepare_story_ledger` returns a draft using the same exporter, rejects foreign
or repost text, and does not save, publish or establish ownership. The host may
retain tool results under its own policies. Existing MCP connection authentication
remains; public AT repository reads themselves require no account credential.

See [historical acceptance evidence](story-history-acceptance.md). Physical iPad
Safari/VoiceOver, production publishing and installed-plugin discovery are
separate release gates.

## Standard.site public snapshots — review 9 November 2026

Existing authority check: the current `published-work.js` and
`docs/SIFA_PUBLISHED_WORK.md` already implement Standard.site lookup. This
increment adds `standard-references.js` as a reusable, side-effect-free reader,
using the existing reader's bounded document page and URL construction and Story
Finder's verified account/PDS resolution and closed provider policy. No directory,
curated-story, publishing, OAuth or Ledger v2 behavior is changed.

Primary sources checked:
- https://standard.site/docs/lexicons/document/
- https://standard.site/docs/lexicons/publication/
- https://standard.site/docs/verification/
- https://atproto.com/specs/xrpc
- https://pckt.blog/ (external publishing service, not a private-project database)

The Standard.site documentation's linked lexicon authority is
`did:plc:re3ebnp5v7ffagz6rb6xfei4`. Its public
`com.atproto.lexicon.schema/site.standard.document` was read via the standard
repository relay at CID `bafyreifylc5lfr4vqfzrwdtqm4pnfg7cbra7z4acbgikylqandzefwdeaq`;
publication schema CID
`bafyreiapvnarfn3nl2wvg27hsylli5zqvou7a74p7od5mu4detprtejapy`.
Schemas require document site/title/publishedAt and publication URL/name, while
content remains an open union. `textContent` is the defined plain-text
representation; rich formats are not interchangeable.

Live public sample:
`at://did:plc:o6kuv3yieti2vqrb7ckmd5vg/site.standard.document/3mzkofw7ak7xb`,
CID `bafyreifmmb2otmwjehrmqbv2mms2pa3fyebdzqvjz2qrj4lgnclcyoecdq`,
contains `blog.pckt.content` with `items` and a separate 3,056-character
`textContent`. The live reusable reader resolved its publication and canonical
pckt URL. A separate bounded page read returned 14 records plus continuation;
this is not a total-archive count. No rich pckt converter or undocumented REST /
oEmbed API is inferred from that sample. No public text was copied into a private
project in this live check. CIDs remain source-reported, not verified signatures.

`pixie.standard-reference/v1` is separate from Bluesky-only Ledger v2. It retains
DID, collection/rkey/AT-URI, CID, publication relationship and publication revision,
canonical URL, source dates, retrieval endpoint/time, representation and explicit
verification limitations. `createReader({retrieval,work,fetcher,signal})` exposes
one-page discovery (up to 20 records), exact AT-URI retrieval and a retained
continuation cursor. Unsupported/over-20,000-character text stays reference-only.
Records and publication references are validated; exact lookups must return the
requested URI. Network requests omit credentials, reject redirects, use timeouts
and bound decoded response bytes to 500,000. No media is fetched.

Website checks are a separate explicit operation. Publication checks compare the
specified `.well-known` endpoint; document checks use the browser's inert parser
and an exact head link relation/AT-URI. Only reviewed pckt.blog host patterns can
be fetched. Custom domains, missing endpoints, redirects, CORS/network failure or
an unavailable browser parser report unavailable/mismatch; they do not become
verification success. Matching confirms the reciprocal web association only,
not authorship, permission, ownership or cryptographic verification. This
increment has fixture website-check evidence, not live pckt website verification.

Companion owns project configuration, review, rights declarations and private
snapshot persistence; the reader performs none of these. Deletion of a PDS
record does not establish deletion from pckt or other copies. No synchronization,
publication or automatic refresh is introduced. New tests cover identity and
publication links, format/byte limits, exact-URI mismatch, unsafe endpoints,
cursors, cancellation, HTTP errors and reciprocal publication checks.
