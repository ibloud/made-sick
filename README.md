# Made Sick: Share the Joy

## Loptr Lab mission and participation

Loptr Lab is a pre-seed, people-over-profit, accessibility-first venture working toward a self-sustaining model within a capitalist economy. Money sustains the work; meaningful change for people is its purpose. We accept funding only on terms that keep people and accessibility first. Our long-term vision includes universal basic income. We aim to bring change to life and leave a transparent record of what we tried, what worked, and what failed so others can carry it forward. This mission governs our projects, funding decisions, and partnerships; it is not a temporary marketing position.

Current open review and contribution opportunities are voluntary and unpaid. Before work begins, agree in writing on scope, time, what will be public, credit preferences, and an exit path. You can stop at any point. Participation does not promise employment, ownership, revenue share, academic credit, or future pay. Any paid commission or other formal arrangement requires a separate signed agreement before work begins. External assistance or benefits belong to the participant and are not compensation from Loptr Lab.

Financial support is optional and sustains infrastructure, maintenance, accessibility work, and documented development. Paying does not buy contributor status, canon authority, approvals, ownership, or employment. Participation and accessibility are not sponsorship rewards. Project-specific licenses and existing signed agreements continue to apply.

[Full mission and participation terms](https://github.com/ibloud/ibloud.github.io/blob/main/MISSION.md).


Made Sick is an early, consent-first creator directory for celebrating meaningful milestones, publishing creator-owned stories, listing verified events, and sharing carefully labeled wellness practices.

## Verified profile gate

Made Sick does **not** create AT Protocol accounts or onboard people to the protocol. Participation starts with an existing AT Protocol identity.

The new verified-profile model separates five things that must not be collapsed:

`AT IDENTITY → AUTHENTICATION → VERIFICATION → CREATOR CONSENT → DIRECTORY PARTICIPATION`

A **verified profile** requires an authenticated AT Protocol identity plus at least one validated verification method:

- **Email verified:** the participant explicitly grants the `account:email` OAuth permission and the authoritative account record reports a confirmed email.
- **Domain verified:** the participant proves control of a domain through a single-use DNS TXT challenge.

The profile shows which method or methods were verified. Verification does not establish legal identity, authorship, employment, diagnosis, or ownership of creative work. It also does not enroll a person in the directory; affirmative creator consent remains required.

The repository contains `verified-profile.js`, a small state model that evaluates trusted verification evidence. The participant join flow now uses the official browser OAuth client for AT Protocol authentication and writes a narrowly scoped participant record to the participant's own repository. Verification evidence remains a separate step.

## Stories and community resources

[Stories](https://made-sick.org/stories.html) features a manually curated collection from the founder’s Made Sick pckt.blog publication, with topic filters and Load more. The homepage previews three articles. Direct links connect the publication and `@made-sick.org` on Bluesky. Six independent resource cards are labeled as unconfirmed partners or educational references, including The Venus Project as an Ideas & Systems resource. Other creators require per-story permission; enrollment is not publication permission. See [story sharing and removal](docs/STORY_SHARING.md). Automatic feed indexing and cross-posting remain unimplemented.

## Story Finder

[Story Finder](https://made-sick.org/story-finder.html) is a device-local research interface for people who use a public Bluesky feed as a diary, notebook, or distributed story archive. It resolves a public AT Protocol handle, loads the author's feed in chronological pages of up to 100 posts, and provides local text, exact-phrase, date, reply, repost, and link filters.

Selected posts can be exported as a creator-controlled JSON research ledger containing source URLs, timestamps, AT URIs, and text. The tool requires no Bluesky password or sign-in and does not read DMs, likes, private records, or other accounts' timelines. Search terms, loaded feed data, and selections are not sent to Made Sick or persisted by default. Export is not publication consent or directory enrollment.

## Product model

- **Identity:** an AT Protocol DID and handle controlled by the creator.
- **Writing:** long-form posts published through tools such as [pckt.blog](https://pckt.blog/) using compatible `standard.site` records.
- **Directory:** a curated AppView that indexes only creators who opt in and labels evidence field by field.
- **Private contact:** an optional, creator-enabled [Germ](https://www.germnetwork.com/) entry point for end-to-end encrypted messages.
- **Live video:** proposed opt-in [Streamplace](https://stream.place/) sessions embedded only after creator consent, rights clearance, and a moderation plan.

The current release is a static product prototype. It does not create accounts, issue verification badges, collect private health information, or claim that any editorially referenced artist has joined the campaign. Named public-record examples and their evidence boundaries are documented in [SOURCE_REGISTER.md](SOURCE_REGISTER.md).

The public build, verified interactions, and features that still require authenticated acceptance testing are recorded in [PUBLIC_TESTING.md](PUBLIC_TESTING.md).

## Functional pilot

The creator-controlled AT Protocol identity `ibloud.xyz` (`did:plc:b5uem672ci23lqrcz6j6bs2c`) is the first functional test fixture. The pilot interface demonstrates separate consent for directory presence, preparing a Duet invitation, and keeping a player-owned session reference. Records remain in the participant's browser and can be exported or deleted. The prototype does not send invitations, receive gameplay, or operate a production consent service.

## Principles

1. No profile without affirmative creator consent.
2. Public evidence supports commentary, not enrollment.
3. Identity, work, event, credential, and lived-experience claims are verified separately.
4. Verification labels must identify the evidence actually checked.
5. Wellness routines are personal experience, not medical advice.
6. Creators can leave the directory without losing their identity or writing.
7. Sponsorships and material relationships must be disclosed.

## Proposed next phase

- Expand the deployed AT Protocol OAuth join flow into the verification service when field-level verification is ready.
- Request only the minimum identity scope plus `account:email` when email verification is needed.
- Persist verified-profile evidence separately from directory consent.
- Implement single-use DNS TXT challenges for domain verification.
- Build an AppView that indexes approved DIDs and `standard.site` posts.
- Add field-level evidence and expiration dates for event verification.
- Add moderation, correction, removal, and appeal workflows before accepting public submissions.

## Status

Independent prototype by Loptr Lab. No affiliation with pckt.blog, standard.site, Germ Network, Bluesky, or their respective teams is implied.

See [GOVERNANCE.md](GOVERNANCE.md), [DISCLOSURE_STANDARD.md](DISCLOSURE_STANDARD.md), [PRIVACY.md](PRIVACY.md), and [LICENSE](LICENSE).


## Participant join

The live join path is [`join.html`](join.html). It supports existing AT Protocol identities and provider-side account creation, then requires explicit directory consent before writing `org.made-sick.participant` to the participant's own repository. The OAuth client requests only the participant collection's create/update/delete permission in addition to the required `atproto` scope. Withdrawal deletes that record. See [docs/ATPROTO_JOIN.md](docs/ATPROTO_JOIN.md).

## Travelling bard review proposal

[Travelling bard · possible 2027–28 pitch](bard-tour.html) is Dominique / Loptr Lab’s independent, AI-assisted proposal for Ren’s optional review. No agreement, tour booking, guest or sponsorship is confirmed. Ren has no obligation to participate; execution requires his affirmative agreement and complete control. The static page separates historical evidence from proposals and financial estimates. It adds no enrollment, contact, payments or broadcast service. See [review and provenance notes](docs/BARD_TOUR_PITCH.md).
