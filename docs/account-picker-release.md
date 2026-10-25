# Shared atmosphere account UI — release candidate

Status: implemented locally; not pushed, merged or deployed. This extends the existing Made-Sick OAuth flow and public readers, the existing Companion Site, Training contributor door and Creator OS Streamplace viewers. No new directory, identity database, repository, domain or membership system is created.

## Owning source and integration

`shared/atproto-account.js` is the canonical dependency-free picker. It contacts Bluesky’s public `searchActorsTypeahead` endpoint after deliberate typing (two characters, 250 ms debounce, six results). It cancels stale requests, treats remote text as text, supports arrow keys/Enter/Escape/Tab and pointer selection, and leaves direct custom-handle entry available when suggestions are absent or fail. Selection does not authenticate, submit a form or load a feed/player. Names and handles are shown without fetching avatars.

Made-Sick integrates it into `join.html`, `story-finder.html` and the published-work check in `stories.html`. Existing join consent and PDS writes are unchanged. The privacy page discloses prefix queries. All pages retain the same versioned `styles.css`; its account styles inherit the site's theme and text size.

`shared/atproto-sign-in.js` is optional identity-only OAuth for Companion. It lazily loads the same pinned official browser SDK already used by Made-Sick (`@atproto/oauth-client-browser@0.5.7`); the SDK owns handle/DID/PDS discovery, PAR, PKCE, DPoP, callback validation and revocation. New Companion metadata requests only `atproto`, with no email or posting scope. Public profile display is a separate unauthenticated request after a verified session. Authentication is client-side identity only, not authorization for server/private resources. MCP authentication remains separate.

Companion's `app/account.tsx` adapter uses local copies under `public/shared/`, a collapsed account panel and an Account navigation link. Training's homepage and contributor guide link to this same account panel; they do not establish a second OAuth client. Creator OS offers this link in another tab to protect unsaved drafts and adds suggestions to its three existing Streamplace inputs. Sharing remains manual. Sifa's existing participation routes are unchanged.

The SDK stores browser OAuth session material in IndexedDB. This wrapper stores only a boolean restoration flag in localStorage; no token, profile, email or progress is copied there by the wrapper. Signing out revokes the session. A failed revoke is reported as a failure, not falsely described as a successful sign-out. GitHub keeps submitted checkpoints; identity sign-in adds neither membership nor cross-device progress synchronization.

## Maintain one implementation

Run from Made-Sick:

```sh
python scripts/sync-account-ui.py ../companion ../pixie-creator-os
python scripts/sync-account-ui.py --check ../companion ../pixie-creator-os
cd tests
npm ci --ignore-scripts
npm test
```

The sync step copies scripts and inserts the single shared CSS fragment into existing stylesheet bundles. There are no new linked stylesheets, inline styles or runtime imports from another ecosystem site. Creator OS retains its pre-existing workstation stylesheet split; consolidating all legacy CSS is outside this change. Account code is not forked per application.

## Release and acceptance

Owner: Codex prepares source/tests and release; Dominique reviews publication and authorizes her identity with her own provider. Existing application and Site identities must be preserved. Companion source lives in its existing Sites source repository; this is distinct from GitHub publication. Keep the changed source publicly reviewable through existing contribution records when releasing; no new repository is required for this feature.

1. Run the picker suite and Made-Sick regression suite; run Companion tool tests, TypeScript and production build; run Creator OS artist/viewer/tools regressions and the asset drift check.
2. Use the existing preview infrastructure to review affected account fields, surrounding page layout and Made-Sick homepage at 1440 px, 820 px and 390 px. Check keyboard-only navigation and browser text zoom. Record actual viewports; do not call emulation physical iPad/VoiceOver testing.
3. After layout acceptance and owner approval, push the existing feature branches for review. Publish Companion through its existing Site identity, exact source commit and saved version, then release Training links and static-site changes through their existing workflows. Do not overwrite production during preview or change DNS/App identities.
4. Verify published metadata matches the embedded client definition and callback URL. Test a real custom-handle/Eurosky account: choose its suggestion, observe correct provider, authorize only identity, return to a verified profile, reload and sign out. Test cancellation, blocked storage, expired/revoked session and network failure. Do not publish participant records as a sign-in test.
5. Verify public browsing, Story Finder direct entry and existing GitHub contribution paths still work without an account; verify MCP access remains unchanged. Confirm no draft is lost opening the Creator OS handoff link. Physical iPad Safari and VoiceOver acceptance remain explicit human checks.

Current verification limit: the managed preview service reported running at `http://terminal.local:4173/`, but the cloud browser timed out and then returned `ERR_CONNECTION_REFUSED`. A stale dev lock was removed and the supported preview restarted; browser access remained unavailable. No screenshot, viewport inspection, actual provider authorization or live feature verification is claimed. Production remains unchanged. Resume with preview/browser recovery, then the acceptance sequence above.

Automated validation completed: 82 Made-Sick tests (including 10 account-picker/OAuth lifecycle tests), 24 Companion tests, and 14 focused Creator OS artist/viewer/tools tests passed. Companion TypeScript and production build passed. Training's changed pages have unique IDs and the canonical account route. Script/CSS copies pass the drift check. Visual, physical-device and actual-provider acceptance remain outstanding; automated DOM mocks are not proof of live OAuth success.
