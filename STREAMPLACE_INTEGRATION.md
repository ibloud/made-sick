# Made Sick Sessions: Streamplace integration standard

## Purpose

Streamplace can supply the public live-video layer for creator-controlled Made Sick profiles. pckt.blog remains the long-form source, the directory indexes approved public fields, and Germ remains the optional private-message layer.

This repository does not fork or self-host Streamplace in the pilot. It uses the hosted service and its documented embed only after an actual creator opts in.

## Activation gate

Do not add an iframe until every item is recorded:

- Creator's AT Protocol DID, handle, and Streamplace URL
- Affirmative profile and livestream consent
- Topic, title, date, guests, and host
- Whether recording, replay, transcription, and clips are allowed
- Rights or licenses for every work that will be played
- Specific content note and qualified resources when relevant
- Named chat moderator and escalation owner
- Public correction, takedown, and contact route
- International resource scope where the audience is not U.S.-only

## Safe embed pattern

After the gate is complete, use Streamplace's documented handle-based embed:

```html
<iframe
  src="https://stream.place/embed/CREATOR_HANDLE"
  title="Made Sick Session with CREATOR_NAME"
  width="560"
  height="315"
  loading="lazy"
  allowfullscreen>
</iframe>
```

Replace both placeholders with approved public values. Do not ship a fake handle, autoplay the stream, or infer a handle from a display name.

## Viewer disclosure

Display this beside the player:

> Public livestream hosted through Streamplace. Chat is public and is not therapy, medical advice, crisis response, or a confidential support channel. This session may discuss [topics]. [Recording/replay statement]. For immediate danger, contact local emergency services.

## Rights boundary

Commentary about a film, episode, song, or video does not grant rebroadcast rights. Link to the official work unless written permission or an applicable license covers the broadcast. Document sponsorships, affiliate relationships, appearance releases, and reuse permissions separately.

## Data boundary

Made Sick should store only the approved stream URL, scheduling metadata, disclosure text, and verification record. It should not copy public chat into a health profile, ingest private Germ messages, or treat viewer participation as evidence of illness or campaign enrollment.

## Technical path

1. Pilot with the hosted iframe described in Streamplace's embed documentation.
2. Add an optional `streamUrl` field to a creator-controlled profile record.
3. Validate the URL host and resolved AT identity before rendering.
4. Render nothing when the field is absent or consent is paused.
5. Consider Streamplace player components or self-hosting only after the pilot establishes a real operational need.

Streamplace is MIT-licensed. Made Sick is an independent prototype and does not imply affiliation or endorsement.
