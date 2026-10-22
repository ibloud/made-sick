# Made Sick shared theme — 22 October 2026

Dominique requested consistent styling across the entire Made Sick site after
Search still showed the old design. ChatGPT/Codex implemented the shared theme.

Every root HTML page now loads `site-theme.css` last and uses `made-sick-site` on
body. The approved paper, charcoal, ochre and petrol palette, Anton headings,
controls, section rhythm and canonical navigation apply across all 14 pages.
Page-specific CSS retains functional grids and forms. The former homepage-only
stylesheet is replaced by the shared theme; CSS links have a new cache version.

## Verification performed

All 14 page entry views were inspected in Chrome at a 1363px browser viewport
(1348px content width with a vertical scrollbar). All 14 were also rendered in
390px iframe viewports (375px content with scrollbars). Whole-document horizontal
scroll widths equalled viewport widths on every page at both sizes. The narrow
headers settled at 80px high with the menus closed.

Pages: index, search, directory, stories, story-finder, join, admin, influences,
future-vision, bard-tour, voting-edition, pixie-care, privacy and terms.

Browser interactions: Search filtering and reset; Mission story filter;
Participants directory filter; narrow menu open and Escape close; PIXIE dialog
open and Escape close with focus restored to its launcher.

Automated checks: 65 tests pass, including local links, unique IDs, existing
consent and tool behavior, plus a new cross-page theme/navigation contract.
`git diff --check` passes.

## Limits

These checks are browser layout checks, not physical iPad/Safari or screen-reader
testing. They do not certify every expanded tool state or authenticated workflow.
Join sign-in, admin access, external workspaces and voting geolocation were not
exercised as part of this visual change. No new authenticated data was published.
