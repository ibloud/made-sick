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
