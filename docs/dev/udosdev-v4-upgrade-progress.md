# uDosDev v4 upgrade — progress

**Status:** Complete (**2026-04-11**)  
**Role:** Operator log for the **uDosDev** workspace migration. Canonical governance remains in **uDosDev** `docs/process/` and `docs/proposals/`, `docs/decisions/`, `docs/promotions/`.

## Completed

- [x] Tracked former **`@dev/`** tree moved to **`uDosDev/docs/archive/pre-v4-atdev/`** (fixtures, notes, pathways, requests, submissions, triage).
- [x] **uDosDev** repo root **`@dev`** is a **symlink** to **`docs/archive/pre-v4-atdev/`** so existing script paths (`@dev/fixtures/…`, `@dev/notes/reports/…`, etc.) keep resolving.
- [x] **`docs/archive/README.md`** and **`docs/archive/pre-v4-atdev/README.md`** describe the layout.
- [x] **`docs/process/udosdev-v4-framework-brief.md`** §5 updated.
- [x] **uDosDev** `README.md`, **`AGENTS.md`**, **`TASKS.md`** (`[UDEV-R02]` done).

## Not in this pass

- Rewriting every legacy **`docs/`** mention of `@dev/…` (paths still work via the symlink).
- Retiring or repointing individual **`scripts/*.sh`** files (optional follow-up).

## References

- [udosdev-v4-upgrade-delta.md](udosdev-v4-upgrade-delta.md) — before/after table  
- [uDosDev framework brief](../../uDosConnect/uDosDev/docs/process/udosdev-v4-framework-brief.md)  
- [uDosDev archive index](../../uDosConnect/uDosDev/docs/archive/README.md)
