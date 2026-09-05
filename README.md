# Made Sick: Share the Joy

Made Sick is an early, consent-first creator directory for celebrating meaningful milestones, publishing creator-owned stories, listing verified events, and sharing carefully labeled wellness practices.

## Product model

- **Identity:** an AT Protocol DID and handle controlled by the creator.
- **Writing:** long-form posts published through tools such as [pckt.blog](https://pckt.blog/) using compatible `standard.site` records.
- **Directory:** a curated AppView that indexes only creators who opt in and labels evidence field by field.
- **Private contact:** an optional, creator-enabled [Germ](https://www.germnetwork.com/) entry point for end-to-end encrypted messages.

The current release is a static product prototype. It does not create accounts, issue verification badges, collect private health information, or claim that any editorially referenced artist has joined the campaign. Named public-record examples and their evidence boundaries are documented in [SOURCE_REGISTER.md](SOURCE_REGISTER.md).

## Principles

1. No profile without affirmative creator consent.
2. Public evidence supports commentary, not enrollment.
3. Identity, work, event, credential, and lived-experience claims are verified separately.
4. Wellness routines are personal experience, not medical advice.
5. Creators can leave the directory without losing their identity or writing.
6. Sponsorships and material relationships must be disclosed.

## Run locally

Serve the repository with any static HTTP server, or open `index.html` directly.

## Proposed next phase

- Define a Made Sick AT Protocol Lexicon for consent and directory metadata.
- Add OAuth sign-in using AT Protocol.
- Build an AppView that indexes approved DIDs and `standard.site` posts.
- Add field-level evidence and expiration dates for event verification.
- Integrate an opt-in Germ launch link after the creator enables private messages.
- Add moderation, correction, removal, and appeal workflows before accepting public submissions.

## Status

Independent prototype by Loptr Lab. No affiliation with pckt.blog, standard.site, Germ Network, Bluesky, or their respective teams is implied.

See [GOVERNANCE.md](GOVERNANCE.md), [PRIVACY.md](PRIVACY.md), and [LICENSE](LICENSE).
