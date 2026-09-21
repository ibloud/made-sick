# Public testing status

Made Sick is ready for public prototype testing. It is not represented as a production health, verification, messaging, or emergency-response service.

## Automated checks

Every proposed change must pass the repository test workflow. The suite verifies:

- PIXIE cue save, restore, pause, delete, corrupt-data handling, and all neutral response choices;
- the Duet invitation gate remains closed until the participant grants consent and closes again when consent is withdrawn; and
- every local page, script, stylesheet, image, and same-page fragment linked from an HTML page exists.

## Live behavior verified for public testing

- GitHub Pages serves the custom domain over HTTPS and redirects HTTP to HTTPS.
- Story Finder can load a public AT Protocol feed without a password and keeps search state in the browser tab.
- PIXIE remains voluntary and device-local; the site does not send health data or notifications.
- Duet and Streamplace are closed by default and require a deliberate participant or viewer action.
- The PIXIE ecosystem launcher opens the existing Holdings desktop without replacing the local Made Sick care panel.

## Boundaries still requiring human acceptance testing

- Completing AT Protocol OAuth with a consenting test identity.
- Confirming creation, update, and withdrawal of `org.made-sick.participant` in that identity's repository.
- Running a consented Streamplace session with the disclosure and moderation checklist.
- Confirming any future Germ contact policy inside Germ; Made Sick does not operate or inspect private messages.

Do not use real medical details, crisis disclosures, private messages, or identifying information during prototype testing. Report inaccurate public framing or accessibility barriers through the repository issue tracker.
