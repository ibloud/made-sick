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
