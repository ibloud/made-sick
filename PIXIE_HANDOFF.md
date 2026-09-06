# PIXIE continuation guide

## What the current demo proves

PIXIE is a consent-based memory aid, not an authority. The ATmosphere desk lets a tester define one situational cue and one gentle action, then answer with full participation, a smaller version, or rest. Every response is valid. Data stays in local browser storage and can be paused or deleted.

## Claude's next safe steps

1. Test the PIXIE panel by keyboard and screen reader at narrow and wide widths. Confirm every control has a visible focus state and every status change is announced.
2. Write tests for save, restore, pause, delete, corrupt local-storage data, empty required fields, and all three response choices.
3. Keep the default state off. Do not add notifications, HealthKit, location, accounts, analytics, community sharing, AI-generated health guidance, or caregiver contact without a separate consent screen and privacy review for that exact capability.
4. If browser notifications are prototyped, request permission only after the user creates a cue and presses a plainly labeled “Enable reminders” button. Provide frequency, quiet hours, snooze, pause, and revoke controls before enabling it.
5. Do not use streak resets, leaderboards, guilt, scarcity, urgency, age-based defaults, weight-loss assumptions, or “no excuses” language. Never infer capacity from age, disability, diagnosis, or missed check-ins.
6. Treat accessibility as acceptance criteria: WCAG 2.2 AA contrast, 200% zoom, reduced motion, large touch targets, plain language, no color-only meaning, and full keyboard operation.
7. Before any networked pilot, document data fields, retention, deletion, threat model, moderation and crisis boundaries, responsible contact, and a no-sale/no-targeted-advertising commitment. Obtain informed opt-in from a small, diverse test group and pay testers where possible.

## Product test sentence

“PIXIE gently reminds me of a care action I chose, accepts the capacity I have today, and lets me stop without penalty.”

If a proposed feature makes that sentence less true, do not ship it.
