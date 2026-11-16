# Repository instruction entry — ibloud/made-sick

Scope: this repository. Consent-first creator directory, public resource/story discovery and optional care prototypes; not a diagnosis or enrollment authority.

Before work, explicitly read the [shared ecosystem instructions](https://github.com/ibloud/ibloud.github.io/blob/docs/agent-design-continuity/docs/ECOSYSTEM_INSTRUCTIONS.md)
(or `docs/ECOSYSTEM_INSTRUCTIONS.md` in a locally available `ibloud/ibloud.github.io` checkout),
then the local sources below and any applicable nested `AGENTS.md`.
A link does not automatically load or inherit instructions. The shared file is under
review in portfolio PR #59; it is not yet a merged production record. If unavailable,
identify the gap and stop only work dependent on it; do not fabricate its contents.
Local security, privacy, canon, license, tests and release authority remain local.

## Local essentials and sources

Identity, authentication, field-specific verification, creator consent and directory participation are distinct. Preserve removal/revocation, private-message boundaries, opt-in embeds and non-clinical labels. One styles.css and existing hidden/consent states remain authoritative. Current-main preview-first requirements are retained below despite this older review branch.

Read: [README.md](README.md), [brand-guidelines.md](brand-guidelines.md), [GOVERNANCE.md](GOVERNANCE.md), [PRIVACY.md](PRIVACY.md), [DISCLOSURE_STANDARD.md](DISCLOSURE_STANDARD.md).
Inspect existing changes, open issues/PRs and unpublished work before creating a duplicate.
Use the current contribution entry in README and the local contribution policy where present;
record ideas as proposals, not automatic assignments. Identify exact source conflicts and
preserve behavior; do not invent precedence or relax a hold.

## Existing work

Reuse [brand/instruction PR #68](https://github.com/ibloud/made-sick/pull/68). Security PR #64 and optional public-account suggestions #66 remain separate.

## Checks and release boundary

Commands confirmed in local scripts/configuration (not a claim of current passing results):

- `cd tests && npm test`
- `python3 scripts/build-resources.py --check`

CNAME made-sick.org is configured; exact-commit Vercel preview required for participant-facing changes. Live current deployment unverified.
No merge, deploy, release, DNS, authentication or infrastructure change is authorized
by this instruction structure. Preserve existing palettes, symbols, stylesheet ownership,
privacy and governance gates. Report committed documentation, checks, previews, merged
source and observed live behavior separately. Automated checks do not establish physical
iPad/Safari/VoiceOver acceptance. MCP tools do not automatically discover or enforce this file.

No nested AGENTS.md was found in the inspected revision; add one only for materially different directory requirements.

---

## Retained project instructions

Read [brand-guidelines.md](brand-guidelines.md) before any brand, copy, image or presentation change. This is the consolidated brand entry point; preserve source records and release gates.

# Made Sick visual fixes

Dominique has repeatedly requested consistent spacing. For visual changes, do not
verify only the hero or modified element. Review the full homepage and adjacent
sections, especially music/play, trust and mission, at wide and narrow widths.

Keep common section edges aligned. Avoid inline section margins, padding and
widths that override the shared page rhythm. Balance long prose across the
available width while preserving readable line lengths; stack columns on narrow
screens. Check heading-to-body, paragraph, link and section gaps together.

Code/link tests are separate from visual verification. Report the exact viewport
and interactions checked. Do not claim physical iPad or screen-reader testing
without performing it. Keep cache versions current when changing page CSS.

Site-wide consistency is mandatory, not homepage-only. Every root HTML page must
load only the versioned styles.css and use made-sick-site on body. Keep the canonical header
identical across pages. Check every page at desktop and narrow widths before
reporting a site-wide visual change complete; record exactly what was inspected.
The shared stylesheet owns palette, typography, page edges, controls and navigation;
page styles may define functional grids, forms and consent states. Never override
hidden states or remove existing accessibility and privacy behavior for styling.

CSS consolidation is the owner-required standard across ecosystem work. Each site
repository has one authoritative stylesheet. Do not add per-page stylesheets,
embedded style blocks, inline style attributes or @import chains. Keep shared
tokens and components authoritative; scope unique functional layouts by page
class within the same stylesheet. Inspect each project before migrating it;
this rule does not claim that other ecosystem repositories are already migrated.


# Mandatory preview-first owner review

For every visual, content, directory, navigation or participant-facing change:

1. Follow the current repository instructions and existing components, then build and test the changed route.
2. Confirm the Vercel **preview deployment for the exact review-branch commit** is READY. Open or retrieve the actual preview hostname from Vercel; never guess it from a project name, and never substitute a dashboard, code page, or PR link.
3. Give the owner the **direct rendered page URL** (including the relevant path and fragment) as the primary review link. Give the GitHub PR separately for merge/change tracking.
4. Distinguish deployment READY, successful HTTP retrieval, local browser checks and verified deployed-browser behavior. State any unperformed checks honestly. If preview access or browser verification is blocked, state exactly which part could not be verified; do not call the page visually reviewed.
5. Leave production/main unchanged until the applicable owner and repository release requirements are satisfied. After an approved merge, verify the canonical production URL rather than assuming GitHub merge means a live page.
6. Physical iPad/Safari/VoiceOver acceptance is voluntary public-participant testing unless the applicable project governance requires otherwise; do not ask the owner to certify testing they did not perform.

This procedure supplements, and does not override, repository governance, privacy, rights, security, or release holds.
