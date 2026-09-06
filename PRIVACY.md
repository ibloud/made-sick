# Privacy approach

Made Sick should collect the minimum information required to operate a consent-first creator directory.

## Public directory data

- AT Protocol DID and current handle
- Creator-selected display information
- Creator-selected links and posts
- Milestone and upcoming-event references
- Field-level verification labels and review dates
- Optional public contact preference

## Data the directory should not request

- Medical records or diagnosis documents
- Treatment details submitted for verification
- Private Germ message contents
- Government identity documents retained after a bounded identity check
- Precise home addresses or private telephone numbers

## Creator controls

Creators should be able to see what is indexed, correct inaccurate fields, revoke directory consent, disable contact, and request deletion of directory-held data. Revoking directory consent cannot delete records the creator independently published through another AT Protocol application.

## Important distinction

End-to-end encrypted messaging protects message content in transit and from service access as designed; it does not eliminate all metadata, device-security, impersonation, harassment, or recipient-sharing risks.

## Livestreams and embeds

A Streamplace player must not load until a real, consented session is configured. Loading a third-party player can disclose viewer connection data to that service. The page must identify the stream provider, link its applicable terms and privacy information, and distinguish public chat from Germ private messaging. Hosts must tell participants whether a session is recorded, where a replay will live, and how clips may be reused before going live.

## Germ private communication

Made Sick does not operate a DM inbox, message composer, or messaging proxy. It must not collect Germ cards, cryptographic keys, contact relationships, activity data, or message content. A creator's current published contact policy is authoritative; the absence of permission is a closed channel, not an invitation to find another route.

The Phase 2 interface may store a contact-policy draft in the creator's browser for review and export. That draft does not change Germ or the creator's public AT Protocol profile. Real configuration and card exchange occur in Germ. End-to-end encryption protects transport and service access as designed, but it cannot prevent a conversation participant from saving, copying, or sharing received content.

This document is a product-design baseline, not a final privacy policy. A production launch requires jurisdiction-specific privacy and platform counsel.
