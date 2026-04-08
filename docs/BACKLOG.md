# Backlog — uDOS v3

## Closed: v3.0.1 (local demo loop)

**Status:** Milestone **M1–M4 complete** per [MILESTONES.md](MILESTONES.md) (2026-04-08).  
**Scope:** [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md)  
**Gold path:** [DEMO.md](DEMO.md)

Shipped capabilities (summary):

| Area | Delivered |
|------|-----------|
| Host | HTTP API, pipeline, vault tools, events + SSE, storage layout, launch scripts |
| Hivemind | Scout/Planner task graph (4 steps + review), provider stub events |
| ThinUI | Feed, tasks (grouped, rerun), output + provider strip + vault file list |
| WordPress | Docker compose, `udos-empire-local`, restricted page, REST bridge, privacy hooks |
| Ops | `npm run launch`, `doctor`, `storage:init`, double-click launchers |
| Demo steps 8–9 | `demo:wp-bootstrap`, `demo:wp-link`, `demo/.wp-demo.env` (gitignored) |

## Optional (non-blocking)

- Marketing assets: PNG/video from [DEMO.md](DEMO.md) screenshot checklist.

**Steps 8–9 prep:** `npm run demo:wp-bootstrap` and `npm run demo:wp-link` (see [DEMO.md](DEMO.md) § Steps 8–9).

## Active: v3.0.2 backlog (resumed 2026-04-08)

Priority order follows [ROADMAP.md](ROADMAP.md) and keeps scope limited to hardening the existing loop before any repo split.

### P0 — reliability hardening (current)

- [x] Job runner hardening: timeout policy, resource caps, structured failure codes (`UDOS_TOOL_TIMEOUT_MS`, `UDOS_VAULT_NOTE_MAX_BYTES`; task `errorCode` + `tool.failed` payload).
- [x] ThinUI live-update resilience: reconnect UX and stream status; keep SSE as default unless hard blocker appears.
- [x] Task/event persistence review: JSON files retained for v3.0.2; SQLite deferred (recorded in [DATA-MODEL.md](DATA-MODEL.md)).

### P1 — demo quality uplift

- [x] Second demo scenario: **email-thread / inbox intake** — Scout detects `From:`+`Subject:`, reply headers, or quoted lines; `vaultStem` `thread`, tasks + tools unchanged; sample `demo/sample-inputs/inbox-thread.txt`; `npm run demo:seed:inbox`.
- [x] Operator notes for scenario B in [DEMO.md](DEMO.md).

### P2 — deferred until acceptance gates

- [x] Repo split prep: checklist and boundaries in [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md) (extract when you accept the tranche; no structural split in-repo).
- [ ] Depth features remain deferred (sync engine, beacon networking, registry/marketplace, mobile, full module parity).

## Tracking rule

If an item changes the one-loop boundary, update [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md) first, then update [ROADMAP.md](ROADMAP.md) and this backlog in the same change set.
