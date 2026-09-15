# PIXIE Device Stewardship: building the prototype without pretending it is finished

*Field notes from Made Sick / Loptr Lab — September 15, 2026*

There is a particular kind of technology demo I do not trust anymore: the immaculate screenshot of a product that does not exist yet.

The interface looks finished. The copy says “revolutionary.” The device is always photographed at the perfect angle. Somewhere there is a glowing dashboard, a made-up metric, and a promise that the hard parts are already solved.

PIXIE is being built in the opposite direction.

This post documents the current prototype work behind **PIXIE Device Stewardship** and the Made Sick technology-access program. The point is not to make the project look bigger than it is. The point is to make the work inspectable.

## What actually exists

Made Sick is currently a static product prototype: an opt-in creator directory, a Story Finder for public Bluesky feeds, a creator-controlled pilot surface, and a research program around technology and creative access. The repository explicitly describes the release as a prototype rather than a production service. fileciteturn28file0

The current Made Sick interface already gives us a useful test environment for the larger PIXIE idea. It separates public evidence from participation, keeps creator permissions visible, and treats private communication as something that has to be deliberately enabled rather than silently harvested. fileciteturn28file0

PIXIE Device Stewardship takes that principle down to the operating-system and creative-tool level.

The research question is simple:

> **How much avoidable cognitive labor does our software transfer to the person using it?**

That includes filenames, folders, versions, retrieval, interruption recovery, and the small decisions that become expensive when a person is already carrying a lot of cognitive load.

This is an accessibility hypothesis. It is not a diagnostic system, monitoring service, therapy product, or caregiver channel. Made Sick's own project documentation draws that boundary explicitly. fileciteturn28file0

## The prototype is not an AI agent

PIXIE is deliberately being designed around a different interaction contract.

**Intent → proposed action → consequence preview → explicit consent → execution → rollback receipt.**

That sequence matters.

A conventional assistant is often rewarded for doing something *for* you. PIXIE is being designed to make the proposed action legible before it happens.

The prototype rules are equally important:

- no silent inference;
- no secret monitoring;
- no unauthorized file changes;
- no automatic publication of receipts;
- private provenance stays private;
- stopping is always a valid outcome.

In other words: the system should not need to pretend it understands a person in order to be useful to them.

## What the interface is trying to show

The current visual language deliberately looks like a piece of software someone could actually build: hard edges, terminal typography, status labels, explicit states, and evidence boundaries.

It is not supposed to be a fake render of a finished operating system.

The accompanying evidence plate in this post is a vector reconstruction of the **current prototype's information architecture**, not an AI-generated product screenshot. It shows the actual design vocabulary we are working with: Phase 2 signaling, the creator-owned directory, creator-submitted participation, public-record examples, and the distinction between those states.

That distinction is central to Made Sick.

A public post can be evidence for commentary without becoming enrollment. A creator can submit their own identity and story without surrendering control of the original identity. An ally can be listed without implying membership. A health-related statement can remain explicitly self-reported rather than being converted into a diagnosis by the interface. fileciteturn28file0

## Why prototype-accurate images matter

I am intentionally using the phrase **prototype-accurate** instead of “concept art.”

Concept art is useful when we are imagining possibilities. But it becomes misleading when it is presented as proof that a product already exists.

For this project, an image should answer one of three questions:

1. **What does the software actually look like today?**
2. **What interaction are we proposing to test next?**
3. **What is merely an illustration of the idea?**

Those labels should never be interchangeable.

The image accompanying this article is therefore built from the real product structure rather than invented UI chrome. It intentionally leaves the prototype's rough edges visible. There is no fictional “AI confidence score,” no fabricated device, no fake app-store badge, no invented user count, and no photorealistic handset pretending to be a shipped PIXIE phone.

That is the standard I want to keep as the project grows.

## From Made Sick to PIXIE OS

Made Sick is the public campaign and participation surface. PIXIE Device Stewardship is the research program underneath it. The repository describes that relationship directly: the public project is where participation happens, while the PIXIE repository carries the research hypothesis, methodology, specification, and case ledger. fileciteturn28file0

The longer-term PIXIE OS plan has three layers.

**Tier 1 — Android launcher.**

A normal Android application that can become the home screen. It would surface holdings, a market map, PXCOIN, and stewardship actions without requiring root access.

**Tier 2 — Android/LineageOS system integration.**

A deeper system layer for consent, provenance, reversible actions, and OS-level stewardship. This is still a build roadmap, not a shipped ROM.

**Tier 3 — dedicated hardware.**

A future device where the physical interface, operating system, consent model, and local-first memory are designed together. Again: future work, not a product being represented as available today.

Apple development is being treated as a parallel implementation problem rather than a claim that iOS can be replaced as a system launcher. The first task is the file-structure and semantic conversion: preserve identity, provenance separation, consent policy, and project relationships before building platform-native Swift/SwiftUI surfaces.

## The old Sidekick idea is still useful

There is also a historical design reference here: the Danger Hiptop / T-Mobile Sidekick.

The important part is not trying to install modern PIXIE OS on an old Sidekick. That would be the wrong engineering path.

The useful idea is the physical relationship between a small communication computer, a focused interface, and a device that feels intentional rather than like a general-purpose slab with another notification feed on top.

So the Sidekick belongs in the lineage as a **design ancestor**, not as the software base of PIXIE.

The modern implementation has to live on supportable hardware.

## The rule: show the consequence before the magic

This is probably the most important thing we are building.

When PIXIE proposes an action, the person should be able to see:

- what will change;
- which files or records are involved;
- what information is being used;
- what will remain local;
- what permission is required;
- and how the action can be reversed.

Then the person decides.

If they say no, the system does not interpret that as failure.

If they change their mind, rollback is part of the design rather than a support-ticket fantasy.

If the system cannot explain the consequence clearly, it should not pretend that automation is ready.

## What comes next

The next milestones are deliberately boring.

First, prove the launcher surface.

Then prove the local stewardship model.

Then test the consent and rollback behavior.

Then integrate with a real Android system build.

Then test a signed device build.

And only after those pieces are real should we start talking seriously about dedicated hardware.

That sequencing is intentional because **a credible prototype is more valuable than a spectacular mockup**.

## This is the anti–AI-slop rule

The easiest way to make PIXIE look impressive would be to generate a dozen cinematic renders and call the project a platform.

We are not doing that.

A generated image can be an illustration, and there is nothing wrong with illustration. But if an image is presented as evidence of implementation, it needs to correspond to something that exists in the repository or to a clearly labeled prototype state.

For Made Sick and PIXIE, the public record should be able to answer:

**Is this real? Is it proposed? Or is it illustrative?**

Those three words are enough.

And if the answer is “illustrative,” we should say so.

That is not less exciting.

It is more trustworthy.

---

### Build notes

**Current status:** early prototype / research build.

**Implemented:** Made Sick's static creator directory, public Story Finder, creator-controlled pilot surfaces, consent boundaries, and project documentation. fileciteturn28file0

**Proposed:** PIXIE Android launcher, deeper OS integration, Apple platform adapters, dedicated hardware, and the full Device Steward execution/rollback layer.

**Unverified:** production hardware, production consent service, automated lead capture, and any claim that a future PIXIE OS build is ready for general installation.

The source of truth remains the repositories, not the render.

**Made Sick · Loptr Lab**

*Accessibility is infrastructure.*
