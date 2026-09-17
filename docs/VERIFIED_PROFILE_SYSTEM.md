# Made Sick Verified Profile System

Made Sick uses the same verified-profile model as The Weaver, adapted to its consent-first directory.

## Identity prerequisite

Made Sick does **not** onboard people to AT Protocol or create AT Protocol accounts. Participation begins with an existing AT Protocol identity.

The authentication layer establishes the participant's DID. A **verified profile** then records the specific evidence that has been checked.

## Evidence layers

| Evidence | Meaning | Does not mean |
|---|---|---|
| AT Protocol OAuth | The participant authenticated control of the DID | Legal identity, authorship, diagnosis, employment |
| Confirmed account email | The PDS reports a confirmed account email after the participant grants `account:email` | Public ownership of a domain or creative work |
| Verified domain | DNS TXT challenge demonstrates control of the domain namespace | Employment, legal identity, authorship, or endorsement |
| Creator consent | The creator affirmatively opts into a profile | Truth of every claim on the profile |

Made Sick's existing governance already defines verification as field-specific: a verification check must identify what was reviewed, its source class, reviewer, and review date. A profile-level badge must not imply that every claim is independently true or professionally endorsed.

## Profile state

```text
PUBLIC REFERENCE
      ↓
APPLICANT
      ↓
AT AUTHENTICATED
      ↓
VERIFIED PROFILE
   ├── EMAIL VERIFIED
   ├── DOMAIN VERIFIED
   └── EMAIL + DOMAIN VERIFIED
      ↓
CREATOR CONSENT
      ↓
VERIFIED PARTICIPANT
```

A verified profile is not automatically a directory enrollment. Consent remains affirmative and separate.

## Verification record

```json
{
  "did": "did:...",
  "handle": "example.com",
  "status": "verified",
  "evidence": {
    "atIdentity": { "status": "verified" },
    "email": {
      "status": "verified",
      "source": "atproto-account-email"
    },
    "domain": {
      "status": "verified",
      "domain": "example.com",
      "method": "dns-txt-challenge"
    }
  },
  "consent": {
    "directory": false,
    "updatedAt": "2026-09-17T00:00:00Z"
  }
}
```

Email addresses should not be published simply because they have been verified. Store the minimum information required to establish the verification state.

## Email verification

The preferred implementation uses the participant's existing AT Protocol account email. The participant explicitly grants the `account:email` OAuth permission; the verifier reads the account email and confirmation status from the authoritative PDS session. A confirmed account email can then be marked `email_verified`.

This avoids creating a second Made Sick account/password system.

## Domain verification

The verifier generates a random, single-use challenge:

```text
_made-sick-verification.example.com TXT "made-sick=<challenge>"
```

The participant publishes the TXT value in DNS. The verifier resolves the record and requires an exact match before marking the domain verified. Challenges expire and are never reused.

Domain verification is evidence of DNS control only.

## Consent boundary

Verification never creates a public profile by itself. The creator must still affirmatively choose directory participation, consistent with Made Sick governance.

Public references remain references. A creator can correct or remove their profile without surrendering their AT Protocol identity or source writing.

## Technical implementation

Use the official `@atproto/oauth-client-browser` for a static/browser implementation or `@atproto/oauth-client-node` for a server-side deployment. Request the minimum identity scope plus `account:email`; do not request broad repository write access merely to authenticate a participant.

Production deployments must host the OAuth client metadata at the exact client ID URL, use HTTPS, validate the returned DID, and preserve the distinction between authentication, verification, and consent.
