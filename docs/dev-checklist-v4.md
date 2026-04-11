# Dev checklist (v4)

Fast repeatable pass — aligns with family Task / `.local` / `.compost` rules.

## Pre-dev (30–60s)

- [ ] Current goal is clear (README / `TASKS.md` / `docs/dev-process-v4.md`)
- [ ] One actionable task exists in **`TASKS.md`**
- [ ] Scope is explicit (what is out of scope)

## During

- Stay in task scope; avoid silent wide refactors
- Logs: `[SCOPE] message` — no spam
- Temporary: `[DEBUG]` / `[TRACE]` — remove or trim before commit

## Post-dev (before commit)

- [ ] Happy path + one error path checked
- [ ] No stray debug noise
- [ ] Task section updated (In Progress → Done)
- [ ] One clear commit message

## Rule

Skipping this checklist invites drift. Keep it lightweight.
