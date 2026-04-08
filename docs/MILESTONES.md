# Milestones — uDOS v3

## Release status

**v3.0.1 — complete (2026-04-08).** M1–M4 checklists below are satisfied.

**v3.0.2 — P0 reliability (M5) — complete (2026-04-09).** See [M5 checklist](#m5--v302-reliability-p0) and [BACKLOG.md](BACKLOG.md).

---

## Overview

| Milestone | Name | Goal | Status |
|-----------|------|------|--------|
| M1 | Foundation | Repo, storage, Host + WP + ThinUI skeleton, schemas drafted | Done |
| M2 | Local loop | Feed → tasks → execute → events → ThinUI visibility | Done |
| M3 | WP bridge | Login, restricted page, contact↔user link, privacy hooks | Done |
| M4 | Demo polish | Seed data, docs, screenshot/video-ready state | Done |
| M5 | v3.0.2 P0 | Job runner limits + structured failures; SSE resilience; persistence decision | Done |

---

## M1 — Foundation (checklist)

- [x] Monorepo root `package.json` with workspace config (npm workspaces).
- [x] `apps/host` boots local HTTP server with `/health` and `/api/v1/health`.
- [x] Storage root creates `/vault`, `/spool`, `/events`, `/exports`, `/wordpress`, `/backups` on first run (Host startup).
- [x] `apps/thinui` shell loads and reads Host base URL from `VITE_UDOS_HOST_URL` (see `apps/thinui/.env.development`).
- [x] WordPress runs locally with persistent data under `.udos-data/wordpress` (Docker Compose in `infra/docker/compose.yml`).
- [x] `packages/schemas` contains first-draft JSON schemas (all six files).
- [x] `packages/sdk`: `createHostClient().health()` (M2+ will add feed/tasks).

**Exit:** Operator can start stack and see empty UI + healthy Host + WP install screen or logged-in admin.

**Progress:** Host + ThinUI + SDK + WordPress Compose + `demo:seed` are wired.

---

## M2 — Local loop (checklist)

- [x] ThinUI: submit feed item → appears in Feed panel.
- [x] Hivemind: Scout classifies; Planner creates ≥3 tasks for gold-path scenario.
- [x] Host: persists tasks + emits `feed.*` and `task.*` events.
- [x] Maker: Host runs stub tool chain (vault write + append + review).
- [x] Vault: markdown file written; path shown on tasks and on disk.
- [x] ThinUI: task states update (SSE for events + debounced feed/task sync; full refresh every 12s).
- [x] Output panel: shows tool runs, provider stub (`provider.request` / `provider.response`).

**Exit:** Gold path completes without WordPress (WP optional off) for core loop — or WP running but unused, per implementation choice; document in DEMO.md.

---

## M3 — WP bridge (checklist)

- [x] `udos-empire-local` activates without fatal errors (PHP 8.x; see plugin).
- [x] WP user login + session (standard WordPress; **`npm run demo:wp-bootstrap`** creates Subscriber **`demo`** or operator uses install wizard — plugin grants `udos_empire_access` to Subscriber on activate).
- [x] One restricted page: anonymous cannot view; logged-in with `udos_empire_access` can (`empire-local-restricted` + shortcode).
- [x] Seed `EmpireContact` (`demo-contact-001`); user-link via `POST .../me/link`.
- [x] Self-service: `PATCH .../contacts/{id}` for `displayName` / `consent.*` (authenticated).
- [x] Privacy: exporter/eraser **registered** (eraser clears user meta as demo).

**Exit:** Steps 8–9 of [DEMO.md](DEMO.md) definition of done are reproducible.

---

## M4 — Demo polish (checklist)

- [x] `demo/sample-inputs/` contains gold-path input (`gold-path-note.txt`).
- [x] `npm run demo:seed` POSTs gold-path text to Host (requires Host running); `demo:seed:dry` for dry run.
- [x] README + DEMO: commands, URLs, `UDOS_HOST_URL` / `UDOS_WP_BASE_URL` / ThinUI env vars + `npm run launch` / launchers.
- [x] ARCHITECTURE: Host HTTP route table; DATA-MODEL: default file paths under `.udos-data`.
- [x] Screenshot / video checklist documented in [DEMO.md](DEMO.md) (capturing PNGs is optional; not stored in repo by default).
- [x] Operator checklist in [DEMO.md](DEMO.md) aligned with `package.json` scripts.

**Exit:** External contributor can run demo in < 15 minutes following docs (target).

---

## Definition of done (recap)

From [DEMO.md](DEMO.md):

1. Start local system  
2. Open ThinUI  
3. Submit one input  
4. Watch Hivemind create tasks  
5. Watch Host execute  
6. See vault files  
7. See events + provider usage  
8. Restricted WP page with login  
9. Linked Empire contact / WP user flow  

All nine **checked** → **v3.0.1 complete**.

**As of 2026-04-08:** All nine steps are supported by the repo and docs; operator performs one-time WordPress install + user creation for steps 8–9.

---

## M5 — v3.0.2 reliability (P0)

- [x] Host: per-tool timeout (`UDOS_TOOL_TIMEOUT_MS`) and vault body size cap (`UDOS_VAULT_NOTE_MAX_BYTES`).
- [x] Host: `tool.failed` payload includes `code` + `retryable`; failed tasks persist `errorCode` (see [DATA-MODEL.md](DATA-MODEL.md)).
- [x] ThinUI: SSE closes on error and reconnects with exponential backoff (max 30s); header shows connecting / live / reconnecting (attempt) / down.
- [x] Persistence: document JSON-first decision; defer SQLite until a later tranche.

**Exit:** Gold path still runs; failures are classifiable; ThinUI recovers from dropped SSE without requiring a full page reload.
