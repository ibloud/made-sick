# Resource and Voting Edition review — November 7, 2026

Unmerged review candidate. No production release is authorized. AI assisted implementation and source review; owner review determines publication.

## Existing-work inspection

Base main: f1dbb99aa9c8835be98d96d260e025cb4aabca69. Read AGENTS.md, README, GOVERNANCE, DISCLOSURE_STANDARD, directory.html and directory-resources.json, voting-edition.html, index.html, search.html, styles.css, navigation.js, app.js, resource generator and existing tests/workflows. Open PRs #68 (brand), #66 (account picker), #64 (identity URL fix), #53/#52/#43 (adventures) and open issue #36 do not implement this assignment. Their work is not copied or modified.

The directory has one authoritative JSON contract and Python card renderer. Seven requested resources were absent among 15 existing records. Existing resource/legal-provider types suffice. The existing site search is a static destination list filtered locally; seven anchors were added there. Creator filters/consent remain separate from organizational cards. No new category or framework.

## Before / after

| Area | Before | Candidate |
| --- | --- | --- |
| Resources | 15 source-owned cards | 22; seven missing Minnesota/federal resources with dated evidence and audience boundaries |
| Voting selection | One location button; language/timezone inference and implicit US fallback | Manual country and all 50 states/DC; national lookup without state; no residence inference |
| Location | Detection selects resources automatically | Disclosed, optional click + browser permission; suggested area needs explicit manual confirmation; denial/offline uses manual path |
| Local education | Limited national links | Official registration, local-office, ballot/candidate, voting-method and accessibility routes; Minnesota ballot lookup; Canada federal/provincial distinction; UK Commission/local registration lookup |
| Dates / ballots | No current local ballot data | No fabricated personalization/dates; explicit source-year/deadline check and missing-data guidance |
| Small screens | Existing creator-card minimum width and desk-grid intrinsic sizing overflowed at 320px | Bounded shared card columns and desk children; no clipping or hidden content workaround |

MasterClass Live: Voting Edition, “Your voice, where you are”, neutral framing, original feature media, shared header/navigation and existing creator consent are preserved. No address, preferences, voting choices or new signup is collected. Manual selection makes no external lookup request and is not saved. Third-party reverse geocoding occurs only after the explained location action and successful browser permission. Coordinates are not stored by this code. External election sites have their own forms/privacy terms.

## Official source review

Source descriptions were reviewed through current web retrieval/indexed official pages on November 7. This is not service eligibility, credentials, accessibility or authenticated destination acceptance. Executor direct HTTP to many external hosts is restricted; a proxy block is not an organizational outage. No personal data or form submissions were used.

- https://disabilityhubmn.org/ — navigation across disability, housing, work and benefits; no placement/eligibility guarantee.
- https://mylegalaid.org/disability-law-center/how-we-help/access/ — disability access/discrimination; intake and case priorities apply.
- https://homelinemn.org/ — free Minnesota tenant advice; not property listings.
- https://apps.deed.state.mn.us/ddp/PolicyDetail.aspx?pol=52 — VRS Small Business policy; official page last updated July 1, 2026; not an open startup grant.
- https://metrocouncil.org/Communities/Services/Livable-Communities-Grants/LCA-Programs/Development-Projects.aspx — development grants through eligible government sponsors; not individual rent aid.
- https://www.gsa.gov/real-estate/real-property-disposition — government excess/surplus property processes; not a real-estate marketplace or free-property promise.
- https://mnhousing.gov/home/requests-proposals — official RFP route; no assertion a particular round is open.

Election authority sources: Vote.gov/register (state/district routing; Minnesota, New York and DC examples opened), USA.gov/state-election-office, USA.gov/who-you-can-vote-for, USA.gov/voter-accessibility-laws; Minnesota SOS what’s-on-my-ballot; Elections Canada voter registration and homepage; Elections Canada’s electionsanddemocracy.ca provincial/territorial agency directory; UK Electoral Commission voting-and-elections; GOV.UK register-to-vote, how-to-vote and contact-electoral-registration-office. An old USA.gov/election-office URL redirected to state-election-office; guessed sample-ballot route returned 404 and was not used. No claim that every local ballot, candidate or state registration transaction was individually checked.

## Related Atmosphere source

https://atmosphere.loptrlab.com/ is deployed by ibloud/atmosphere-field-guide from maintained ibloud/pixie-device-stewardship/tools/atmosphere-guide. Companion source review adds Tangled, official SDK directory, Lexicon tooling and Indigo Tap to its existing Build category. No duplicate general directory, new category or deployment repo source copy. The guide change needs its own source-repository review; the single Made-Sick PR remains focused on this assignment. Neither main nor the guide's deployment workflow is updated/run without owner approval.

## Validation and release boundary

78/78 existing and new Node/jsdom tests pass; card generator --check passes. Tests cover manual routing, no default inference/network/storage, CA/GB routes, optional location success, permission denial, network failure, stale response after manual choice, duplicate cards and search anchors. Existing checks cover navigation, creator filtering, consent, local links, unique IDs and single authoritative stylesheet. The shared stylesheet cache version is updated across all 14 root HTML pages; other page markup is unchanged except search/card/voting content.

Chromium checked all 14 root pages at 320 and 1280 CSS pixels; no horizontal page overflow after the bounded shared fixes. Checked voting selection, directory participant filter, resource-card count and HOME Line site search at both widths; guide Build expands to eight resources at both widths. UK voting checked at 820×1180 with light and dark OS preferences. The Made-Sick palette is unchanged by OS preference; this does not assert a new dark-theme feature. Reviewed full homepage screenshots including music/play, trust and mission, plus voting and guide screenshots. Exact commit/READY Vercel preview links are recorded in the PR after verification. Chromium simulation is not physical iPad Safari or VoiceOver acceptance. No election-date feed or personalized ballot service is connected. A user may need to provide address/postcode directly to their own authority to see a precise ballot; Made Sick does not receive those entries. Optional live browser GPS/provider service flows remain unverified beyond controlled tests. Owner must review the preview before any merge or production publish.
