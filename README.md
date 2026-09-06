# Made Sick: Share the Joy

Made Sick is an early, consent-first creator directory for celebrating meaningful milestones, publishing creator-owned stories, listing verified events, and sharing carefully labeled wellness practices.

## Product model

- **Identity:** an AT Protocol DID and handle controlled by the creator.
- **Writing:** long-form posts published through tools such as [pckt.blog](https://pckt.blog/) using compatible `standard.site` records.
- **Directory:** a curated AppView that indexes only creators who opt in and labels evidence field by field.
- **Private contact:** an optional, creator-enabled [Germ](https://www.germnetwork.com/) entry point for end-to-end encrypted messages.
- **Live video:** proposed opt-in [Streamplace](https://stream.place/) sessions embedded only after creator consent, rights clearance, and a moderation plan.

The current release is a static product prototype. It does not create accounts, issue verification badges, collect private health information, or claim that any editorially referenced artist has joined the campaign. Named public-record examples and their evidence boundaries are documented in [SOURCE_REGISTER.md](SOURCE_REGISTER.md).

## Functional pilot

The creator-controlled AT Protocol identity `ibloud.xyz` (`did:plc:b5uem672ci23lqrcz6j6bs2c`) is the first functional test fixture. The pilot interface demonstrates separate consent for directory presence, preparing a Duet invitation, and keeping a player-owned session reference. Records remain in the participant's browser and can be exported or deleted. The prototype does not send invitations, receive gameplay, or operate a production consent service.

The pilot's ATmosphere desk also connects the same DID to its public `pixie.pckt.blog` publication and Streamplace profile. Writing is linked from verified `site.standard.*` records. The Streamplace iframe has no `src` until a visitor affirmatively chooses to connect, and it can be unloaded immediately. Germ contact remains closed in accordance with the identity's public contact declaration. The app-and-window organization is inspired by Aether OS as an interface example; no Aether OS code, assets, branding, or implied affiliation are included.

## Phase 2: participatory story layer

Phase 2 reframes the ATmosphere desk as an in-world recruitment surface: audiences move from public evidence to voluntary participation and creator-controlled communication. It draws on the feeling of dystopian collective storytelling and the audience participation surrounding Ren's earlier Money Game treasure hunt while remaining an independent Loptr Lab prototype. It is not affiliated with or endorsed by Ren, Sick Boi, *Mr. Robot*, fsociety, Aether OS, or their rights holders.

The ARG boundary is explicit: no impersonation, secrecy about sponsorship or provenance, trespass, dangerous tasks, urgent payment, credential collection, health disclosure, or contacting artists through private channels. Fictional clues must remain distinguishable from emergency, medical, financial, or legal instructions.

Germ handles private communication rather than Made Sick. The interface reflects the subject's current closed contact declaration, offers a device-local policy draft, requires a care-boundary acknowledgement before drafting broader access, and hands configuration to Germ. Made Sick never receives Germ cards, encryption keys, contact relationships, or message content.

The PIXIE panel demonstrates the project's intended care behavior with one voluntary, user-authored habit cue. A person may mark a full version, a smaller version, or rest; all are neutral check-ins and there is no streak or score. The record stays in browser storage and can be paused or deleted. This is an interaction prototype, not a notification service, health monitor, diagnosis tool, or caregiver channel.

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
- Pilot one consented Streamplace session using [STREAMPLACE_INTEGRATION.md](STREAMPLACE_INTEGRATION.md).
- Add moderation, correction, removal, and appeal workflows before accepting public submissions.

## Status

Independent prototype by Loptr Lab. No affiliation with pckt.blog, standard.site, Germ Network, Bluesky, or their respective teams is implied.

See [GOVERNANCE.md](GOVERNANCE.md), [DISCLOSURE_STANDARD.md](DISCLOSURE_STANDARD.md), [PRIVACY.md](PRIVACY.md), and [LICENSE](LICENSE).

Developers can find official repositories, documentation, community support links, and integration boundaries for Germ and Streamplace in [BUILDER_RESOURCES.md](BUILDER_RESOURCES.md).
