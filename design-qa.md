# Made Sick homepage design QA

final result: passed

Scope: desktop homepage and existing destination navigation, 22 October 2026. This is not a complete accessibility certification or authenticated join test.

## Visual evidence

- Source: selected third displayed concept `exec-b74116e5-538a-4d54-8a66-39c67d5c8769.png`, 1487 × 1058 pixels. Subsequent user approval replaces its purple palette with paper, charcoal, ochre and petrol.
- Implementation: `docs/community-home-review.jpg`, browser screenshot at a 1363 CSS-pixel desktop viewport. Screenshot captures actual rendered content, not the image concept.
- Combined comparison: `docs/community-design-comparison.jpg`, both images scaled proportionally into equal-width columns; no claim of pixel-exact matching across different source and browser aspect ratios. State: homepage, menus closed, top of page.
- Composition retained: dark masthead, condensed display headline, large collaborative-studio illustration, three-part invitation band. Intentional changes: real selectable HTML headline outside the illustration, retained production navigation, human/AI disclosure caption, reduced purple and cleaner paper surface. Decorative sun marks and tape in the mock are omitted rather than presented as approved brand marks.

## Required fidelity surfaces

- Typography: locally hosted Anton display face loaded (verified computed font); system sans for readable body copy and actions. Headline wraps to two intentional lines without clipping at the checked viewport.
- Spacing: first implementation pushed primary actions below the viewport; reduced headline padding/type and illustration max-height from 570px to 360px. Revised screenshot shows primary directory action and join link in the initial viewport. No horizontal overflow at 1363 CSS pixels.
- Colour: approved #F4EBDD paper, #242321 charcoal, #E8B949 ochre, #285653 petrol. Computed WCAG luminance ratios: charcoal/paper 13.29:1; charcoal/ochre 8.57:1; petrol/paper 6.98:1; muted text/paper 6.64:1. These are colour-pair checks, not proof that every inherited component is accessible.
- Imagery: new 1672 × 941 WebP displays sharply without stretching. The desktop crop prioritizes people, table and cat; the full aspect ratio returns under 550px CSS width. Original source artwork retained. Fictional participants disclosed directly below the image.
- Copy: retains approved headline and directory/join actions. Credits distinguish Dominique’s decisions from AI-generated assets, code and prose, with earlier asset provenance explicitly unresolved. No Wazir results claimed.

## Interaction checks

- Directory action opened the existing creator directory and its entries.
- Join action opened the existing AT Protocol sign-in page; no account sign-in or public participant record was created.
- Illustration credit navigated to the creative-process section; its details expanded successfully.
- Existing node test suite: 60/60 passed, including local links, unique IDs, consent boundaries and lazy PIXIE loading.
- Console inspected: browser-extension metadata errors are unrelated to site code. The join destination’s OAuth client reports a CryptoSubtle/HTTPS requirement on the HTTP local preview. Authentication is intentionally not tested in that preview; the production HTTPS destination requires separate live verification.

## Remaining limitations

- Physical iPad/mobile device, screen reader, keyboard-only end-to-end workflow and authenticated join publishing were not tested in this change. Browser zoom shortcuts did not change the viewport; that attempt is not recorded as mobile verification.
- The palette and design are scoped to the homepage so directory/join application behavior and earlier spacing repairs are not overwritten.
- Colour-emotion claims remain interpretive; no psychological effect is promised.

## Comparison history

1. Initial browser capture: primary action below fold (P2). Reduced hero vertical height.
2. Revised capture and combined source/implementation review: primary action visible, no observed actionable P0/P1/P2 desktop issues. Remaining cross-device testing gaps are listed above.

## Implementation checklist

- [x] Retain existing routes and consent behavior.
- [x] Use approved palette and new illustration with original retained.
- [x] Add human/AI disclosure and sources.
- [x] Check desktop rendering, primary links and contrast pairs.
- [x] Pass repository test suite.
- [ ] Publish branch and merge: blocked by automatic approval review pending explicit authorization.
- [ ] Verify production deployment over HTTPS after merge.

## Policy additions reviewed October 22, 2026

Made Sick privacy and terms pages were opened in the browser at the desktop viewport. The approved paper/charcoal/ochre layout renders readable policy text, shared navigation and linked policies. `docs/privacy-review.jpg` records the privacy view; no horizontal overflow was observed. The policy-to-terms link opened the expected terms heading. Repository suite now passes 64/64 checks (new pages are included automatically). This is draft review, not attorney review or authenticated join verification. Owner explicitly requires confirmation before publication; no push or deployment is authorized yet for these additions.

The related 50 Ways branch preserves that site's existing style, removes the Metricool loader and replaces its automatic PLYR frame with explicit load/unload controls. The two projects retain different existing licenses. Cross-device and screen-reader user testing remain unverified.
