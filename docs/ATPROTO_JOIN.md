# Made Sick AT Protocol participant join

## What joining does

Made Sick uses AT Protocol OAuth to authenticate a participant's DID. After authentication, joining is a separate affirmative action.

The join page requests:

- `atproto` — required AT Protocol authentication scope.
- `repo:org.made-sick.participant?action=read&action=create&action=update&action=delete` — permission to read, create, update, and delete only the Made Sick participant record collection.

The app does not request a password, `repo:*`, private messages, Bluesky DMs, health records, email, or broad repository access.

## Participant record

The participant record is written to the participant's own AT Protocol repository with the stable key `self`.

Example:

```json
{
  "$type": "org.made-sick.participant",
  "version": 1,
  "directory": true,
  "displayName": "A creator",
  "milestone": "Something I made",
  "consentedAt": "2026-09-21T00:00:00Z"
}
```

The record is public AT Protocol data. Made Sick may index the record for the directory. Users can withdraw by deleting the record from the same join page.

## OAuth client

The public client ID is:

`https://made-sick.org/oauth-client-metadata.json`

AT Protocol OAuth requires the client ID to resolve to public client metadata. The redirect URI is `https://made-sick.org/join.html`.

The browser implementation uses `@atproto/oauth-client-browser`, which manages PKCE, DPoP, callback handling, and browser session storage.

## Account creation

The **Create an AT Protocol identity** action starts OAuth with `prompt=create` against the Bluesky entryway. Account creation is handled by the identity provider; Made Sick never receives the participant's password.

If an identity provider does not support `prompt=create`, the participant can use the normal identity connection route or create an account with their chosen PDS first.

## Security and consent

Authentication is not enrollment. The participant must separately check both publication-consent boxes before the record is written.

The participant record deliberately excludes diagnoses, health details, email addresses, private contact information, and OAuth tokens.

## Deployment requirement

This is designed for the existing static `made-sick.org` deployment. The exact public client metadata URL and HTTPS redirect URI must remain stable. If the site is moved to another host, update the metadata, redirect URI, and OAuth client before deploying.


## If the join page shows a 400

OAuth grants are attached to the authorization session. If the requested permission set changes, an existing browser session may still have the older grant.

The join page therefore provides **Log out** and **Switch account** controls. Logging out revokes the current OAuth grant and clears the page session. Switching accounts does the same and returns to the handle field so a different AT Protocol identity can be entered.

If a user sees an error such as `Could not read the participant record (400)` after a deployment that changes OAuth permissions, they should log out and reconnect. The reconnect will request the current scope set.
