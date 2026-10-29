---
brand: Made-Sick
owner: Dominique Devereaux
scope: Made-Sick repository only
status: Consolidated existing approved direction; no visual redesign
reviewed: 2026-10-29
stylesheet: styles.css
---
# Made-Sick brand guidelines

## Required reading and authority
Read this file and AGENTS.md before changing UI, copy, CSS or imagery. This is the
single brand entry point; source records remain linked, not discarded. The owner
controls identity, assets, scope and release. Missing information is not permission
to invent it. Existing code is evidence of implementation, not automatic approval.

## Foundation and audience
Made-Sick is the ecosystem's existing consent-first creator/resource directory:
find reliable resources, share creator-owned stories and celebrate meaningful
milestones. It is not a replacement for PIXIE's workspace or 50 Ways' curriculum.
Use the existing directory and contribution routes; do not create another database
or signup workflow. Respect the mission's people-over-profit, accessibility-first
commitment, contributor credit, consent and exit. Never promise employment,
qualification, payment, medical effects or professional endorsement without evidence.

## Identity and source-backed choices
Dominique selected the third gig-poster concept with dark masthead and collaborative
studio illustration, rejected heavy purple, and approved paper/charcoal/ochre/petrol.
Source: [creative direction](docs/community-design-process.md), 22 October 2026.
Design evidence and limits: [design QA](design-qa.md). Do not silently transplant
PIXIE's palette or the older Loptr Lab monochrome palette into this site.

| Semantic role | Existing token / value | Use |
| --- | --- | --- |
| surface | --paper #F4EBDD | Warm reading canvas |
| surfaceContainer | --surface-color #FAF6EE | Raised reading surface |
| onSurface | --ink / --text-main #242321 | Text, structure and outlines |
| onSurfaceVariant | --text-muted #53524B | Supporting text |
| primary / focus | existing --red / --focus #285653 | Petrol action/focus; token name is legacy, not red intent |
| accent | --acid #E8B949 | Ochre emphasis with charcoal text |
| illustration detail | #705568 | Small muted-plum art detail only |

Do not scatter new hex colors through page markup. Verify contrast on actual
backgrounds; token use alone is not certification. Do not brighten the reading
canvas or restore large purple fields without direction.

## Typography and composition
Locally hosted Anton Regular is the established display face; system sans is for
body/actions; monospace is for technical records. Keep selectable semantic HTML
headlines rather than raster lettering. Use display, headline, title, body and
label roles purposefully. Sentence case for readable UI; no compressed heading
tracking or tiny labels. Keep text large enough for the existing over-40/low-vision
reading requirements. Do not solve layout with smaller text.
Preserve the dark masthead, intentional headline, studio illustration and invitation
structure. Common section edges align. Keep related heading/body/link gaps coherent;
no narrow right-hand prose columns beside huge empty spaces. Stack when content
and available width require it. No fixed heights that clip large text.

## One stylesheet and components
styles.css is the single authoritative stylesheet; all root HTML pages use its
versioned URL and made-sick-site body class. Shared tokens → type → components →
scoped functional layouts. No per-page stylesheets, embedded styles, inline
presentation, @import chains or competing themes. Keep the canonical header the
same across pages. Preserve hidden, consent, focus and privacy states. Follow the
existing cache-version update convention when changing CSS.
Select controls by behavior: navigation is a link; action is a button; settings
and consent remain explicit. One clear primary task per region, quieter secondary
actions. Do not invent accounts, PDS hosting, private profiling or automatic sharing.

## Images and PIXIE
Preserve originals and provenance. Approved studio derivative:
assets/community-studio-ochre.webp; retained original assets/stories/cover-1.webp.
People are fictional; do not imply real participation or endorsement. Keep the
composition's collaborators, wheelchair user, music, game materials and cat;
no replacement stock imagery or unapproved logo marks.
PIXIE is one companion across distinct applications. Reuse her actual accepted
Companion sigil for helper identity; page illustrations are not replacement icons.
Her identity source is the PIXIE guide/Companion repository's brand-guidelines.md.
Do not create a new assistant or imply shared runtime, sign-in or private records.

## Voice and examples
Welcoming, direct, resourceful and creatively defiant; plain language with concrete
next steps. Retain creator ownership and agency. Say “Find resources for your next
step,” not “Unlock an unparalleled creator ecosystem.” Explain what a tool does,
what information it reads and what happens next. Label reported, verified,
proposed and unavailable states accurately. Avoid hype, therapeutic claims,
unsupported trust badges and affiliation claims.

## Material 3 adaptation and accessibility
Use semantic roles, hierarchy, adaptive layouts, interaction states and native web
semantics; do not erase the approved poster identity to imitate Google styling.
Consult https://m3.material.io/ and the owner-supplied third-party reference
https://github.com/skydashnet/material-design-3-ui-skill . Read relevant spacing,
typography, navigation, component, color and accessibility references before work.
No claimed compliance from decorative rounding or a passing link test.
Preserve keyboard access, visible focus, skip links, screen-reader names, reduced
motion, text scaling and media opt-in. Verify 4.5:1 normal-text and 3:1 large-text/UI
contrast and generous targets (48px where practical). Check full pages at narrow,
tablet and wide widths, enlarged text and breakpoint boundaries. Record exactly
what was checked; Chromium viewports are not physical iPad Safari or VoiceOver.

## Maintenance and release
Update this file with source/date/status when the owner changes direction. Link
it from AGENTS.md and README.md; do not rely on chat memory or assume every tool
automatically reads it. Separate approved principles from proposed implementation.
Keep tests, local visual evidence, deployment and real-device results distinct.
Preview before production; do not merge, deploy or change domains without approval.

29 October 2026: documentation-only consolidation of existing approved direction
from AGENTS, creative-process record, design QA and current shared CSS. No new
archetypes, audience demographics, palette, logo, layout or product behavior added.
