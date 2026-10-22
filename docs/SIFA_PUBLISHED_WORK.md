# Sifa: published work and participant records

## Implemented in this branch

The existing Stories page has a **Let your work speak** section, a read-only Standard.site document lookup, and links to the existing pckt.blog publishing route and Sifa. The successful join result links to that section. The optional join-form milestone field is now labeled **Profile introduction**; its existing `milestone` storage property remains unchanged for compatibility.

No new custom collections, OAuth client, publishing system, or account permissions are needed for this path. A creator publishes a substantive story or milestone write-up at pckt.blog using the identity they want credited. Existing writing remains at its original source; do not duplicate it just to trigger activity. Joining alone does not publish a creative work.

The lookup resolves a handle/DID, discovers its current PDS from its DID document, and reads `site.standard.document` records in pages of at most 20. Publication AT-URIs are resolved through the publication owner's PDS. Only titles, dates, record URIs, and source links are displayed. The lookup is user-triggered, sends no credentials, performs no writes, and does not modify the curated Stories collection. Stop aborts an in-flight request. Provider CORS policies, unavailable records, deleted publications, and network errors can limit retrieval.

## What Sifa actually supports

Source conversation: https://mu.social/profile/sifa.id/post/3mygz3t3ee227 and its parent posts. Sifa suggested stories and milestones for richer cards, and stated that joining does not count as creation activity. Their statement that Sifa can pick up participant records is not proof those records are currently rendered or registered.

Primary sources checked on 22 October 2026:

- https://docs.sifa.id/docs/activity-feed/
- https://docs.sifa.id/docs/supported-apps/
- https://sifa.id/.well-known/sifa-activity-tiers.json — live version 1.4.0, updated 4 September 2026. `site.standard.document` is classified `creation` under app `standard`. No `org.made-sick.*` entry was found.
- https://github.com/singi-labs/sifa-sdk — source inspected at `83f8fa9914fd219ca859be50130ef9ba9ae40f3f`. It includes a Standard.site document renderer; no Made Sick namespace match was found.
- https://standard.site/docs/lexicons/document/ — documents may be standalone or linked to a publication; required fields are site, title and publishedAt.

The compatibility decision is to reuse Standard.site, which pckt.blog already writes. This does not establish automatic appearance on every Sifa profile. Sifa controls its indexing, account state, supported publishers, and visibility settings. A Made Sick membership card is not claimed as implemented. Supporting custom Made Sick story/milestone collections would require a separate Sifa consumer change and provides no present compatibility advantage.

## Live read-only evidence

The production reader logic was exercised against public services, using curl as its HTTP transport in this environment:

- `made-sick.org` resolved to `did:plc:o6kuv3yieti2vqrb7ckmd5vg`.
- The DID document identified `https://eurosky.social` as its PDS.
- The first document page returned 11 records and a continuation cursor. This is a page count, not a total archive count.
- Document `at://did:plc:o6kuv3yieti2vqrb7ckmd5vg/site.standard.document/3myf3xgz45pck` resolved via its publication record to https://made-sick.pckt.blog/different-conditions-a-shared-need-to-be-heard-1gnr8wv.
- Sifa's DID profile route returned HTTP 200 after redirecting to https://sifa.id/c/made-sick.org. This confirms the destination responds, not that a particular story appears on it.

No authenticated publishing, enrollment, or outreach was performed. No Sifa account settings were changed.

## Validation and release handoff

`npm ci --prefix tests` then `npm test --prefix tests`: all 60 tests pass on this branch. Six new tests cover provider discovery, publication link resolution, read-only requests, unsafe URLs, DID mismatch, explicit lookup, preserving the curated collection, duplicate cursors, safe rendering, missing links and cancellation. Existing local-link, layout and consent checks also pass. This branch starts from main independently of Story Finder PR #56.

Before merge, preview `stories.html#published-work` at desktop and iPad widths. Enter `made-sick.org`, choose **Check published work**, follow a source link, load another page and stop a pending request. Confirm keyboard labels, status announcements, and no horizontal overflow. Confirm the Sifa destination shows the expected identity. Automated DOM and transport tests do not verify browser CORS or iPad rendering.

After merge, verify the same flow at https://made-sick.org/stories.html#published-work, then check the Sifa profile/organization page for a specific existing story. Record its visible title and source link before claiming end-to-end Sifa display. If a record is absent there, inspect Sifa activity settings/indexing rather than republishing the article or expanding OAuth scopes.

Remaining ownership: Codex can finish preview/deployment checks when that environment is available; the owner can review and merge the PR. A consenting creator controls any new pckt.blog publication. Sifa controls downstream indexing. Safe to pause at the PR; do not report the integration as deployed or fully displayed on Sifa until those checks are complete.
