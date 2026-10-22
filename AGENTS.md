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
load site-theme.css last and use made-sick-site on body. Keep the canonical header
identical across pages. Check every page at desktop and narrow widths before
reporting a site-wide visual change complete; record exactly what was inspected.
The shared theme owns palette, typography, page edges, controls and navigation;
page styles may define functional grids, forms and consent states. Never override
hidden states or remove existing accessibility and privacy behavior for styling.
