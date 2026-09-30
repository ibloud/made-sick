# Story Finder ledger v2

Story Finder continues to read one public author's feed without credentials or browser persistence. Export is a deliberate file download, not publication or directory enrollment. Creator OS consumes the portable schema; neither app depends on the other at runtime.

The envelope includes `schemaVersion: 2`, `actor: {handle, did}`, `exportedAt`, the existing consent notice, and `posts`. Each source includes `uri`, `cid`, `authorDid`, `createdAt`, `selectedAt`, DID-based `url`, `reply`, `repost`, and `embedding` (`allowed`, `disabled`, or `unknown`). Selection time is recorded when the checkbox or Select visible action first selects the item, not when the file is exported. Deselecting and selecting again starts a new selection.

`text` is exported only when `post.author.did === actor.did`. A repost of another author's post remains a reference. Nested quote/embed payloads are not copied. Missing CID, mismatched URI/author identity, or invalid timestamps stop the export with a visible error rather than presenting malformed data as v2.

A missing unauthenticated `viewer.embeddingDisabled` is `unknown`. A boolean response is mapped explicitly; missing information never implies permission. No postgate request is performed. Postgate verification against the author's PDS remains separate future work.

Creator OS must determine ownership from its verified session DID, not from the searched actor or a file's ownership assertion. Exporting someone else's feed does not make it the importer's content. Legacy v1 files remain reference-only and lack historical version evidence.

Run `cd tests && npm ci && npm test`. Fixture coverage includes own text, repost sanitization, nested quote omission, tri-state embedding, missing CID, inconsistent identity, and malformed timestamps. iPad Files export still needs device verification.
