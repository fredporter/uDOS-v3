# Roadmap — after v3.0.1

**Baseline:** The v3.0.1 local demo loop is **complete** per [MILESTONES.md](MILESTONES.md) and [BACKLOG.md](BACKLOG.md). Items below are **v3.0.2+** only.

## Family v4 alignment (uDosDev specs)

**Canonical folder:** [`uDosConnect/uDosDev/docs/specs/v4/`](../../uDosConnect/uDosDev/docs/specs/v4/) (sibling clone under `~/Code/`).

This monorepo implements the **runnable integration** slice of the family platform. The following specs directly shape uDosGo work; keep [specs/README.md](specs/README.md) and schemas in lockstep when the uDosDev copies change.

| Theme | Specs | Direction for uDosGo |
| --- | --- | --- |
| **Round A — architecture** | [`ROUND_A_CORE_ARCHITECTURE_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/ROUND_A_CORE_ARCHITECTURE_v4.md) | **Locked** — reference implementation, governance split, vault; pair with [ARCHITECTURE.md](ARCHITECTURE.md) |
| **Round B — product boundaries** | [`ROUND_B_PRODUCT_BOUNDARIES_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/ROUND_B_PRODUCT_BOUNDARIES_v4.md) | **Locked** — Linkdown / uMacDown / uChatDown / uFeedThru; not shipped inside this monorepo |
| **Round C — physical layer** | [`ROUND_C_PHYSICAL_LAYER_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/ROUND_C_PHYSICAL_LAYER_v4.md) | **Locked** — uRing hardware + DIY + uNode stub; **Sonic** + spatial ecosystem |
| **Round D — publishing and graphics** | [`ROUND_D_PUBLISHING_GRAPHICS_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/ROUND_D_PUBLISHING_GRAPHICS_v4.md) | **Locked** — uDosPublish + **UVIL** + Classic Modern; sibling **[UniversalVectorIL](../../UniversalVectorIL)** |
| **Round F — roadmap** | [`ROUND_F_ROADMAP_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/ROUND_F_ROADMAP_v4.md) | **Locked** — parallel tracks A–E, alpha archive, v5+ deferrals; family spine + consolidated plan |
| **Core + grid** | [`uDos-Spec-v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/uDos-Spec-v4.md), [`uDos-Grid-Spec-v4-2-1.md`](../../uDosConnect/uDosDev/docs/specs/v4/uDos-Grid-Spec-v4-2-1.md) | Reconcile with [ARCHITECTURE.md](ARCHITECTURE.md), [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md), ThinUI + `packages/shared` |
| **Spatial + storage** | [`SPATIAL_STORAGE_ECOSYSTEM_v1.md`](../../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_STORAGE_ECOSYSTEM_v1.md) | **Locked** — uCell / uTile / uGrid / uCoin / uRing vocabulary and economics; map + NFC alignment (**v4.4.0** in consolidated rounds plan) |
| **uSpace / cloud fallback** | [`SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md`](../../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md) | **Locked** — published **uTile** cloud fallback tiers, free tier, view limits, bundled examples (**v4.4.0**) |
| **UVIL (vector / tile / QR)** | [`UNIVERSAL_VECTOR_IL_UVIL_v1.md`](../../uDosConnect/uDosDev/docs/specs/v4/UNIVERSAL_VECTOR_IL_UVIL_v1.md) | **Locked** — **`UniversalVectorIL/`** asset factory; USXD consumes outputs; not full editors in uDosGo |
| **Tasks + markdown** | [`TASK_SPEC_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/TASK_SPEC_v4.md), [`GFM_Enhanced_Specification_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/GFM_Enhanced_Specification_v4.md) | Hivemind task graph, feed text, vault docs |
| **Contacts** | [`CONTACT_SCHEMA_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/CONTACT_SCHEMA_v4.md), [`contacts-db-template.txt`](../../uDosConnect/uDosDev/docs/specs/v4/contacts-db-template.txt) | `packages/schemas/contact`, WP bridge |
| **Unified user data** | [`UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md`](../../uDosConnect/uDosDev/docs/specs/v4/UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md) | **Locked** — WP + HubSpot + **`$user.*$`** + activity table; **v4.5.0** when bridges ship |
| **Shell TUI (shared)** | [`SHELL_v4_command-palette.md`](../../uDosConnect/uDosDev/docs/specs/v4/SHELL_v4_command-palette.md), [`SHELL_v4_bubble-tea-tui.md`](../../uDosConnect/uDosDev/docs/specs/v4/SHELL_v4_bubble-tea-tui.md) | First Host/operator TUI path; **same palette + viewport rules** as **SonicScrewdriver** |
| **Sonic handoff** | [`SONIC_v4_device-database.md`](../../uDosConnect/uDosDev/docs/specs/v4/SONIC_v4_device-database.md), [`SONIC_v4_ewaste-triage.md`](../../uDosConnect/uDosDev/docs/specs/v4/SONIC_v4_ewaste-triage.md) | APIs and UX when ThinUI or Host consumes catalog / triage data from Sonic |
| **USXD → GUI** | [`INTEGRATION_v4_usxd-operational-gui.md`](../../uDosConnect/uDosDev/docs/specs/v4/INTEGRATION_v4_usxd-operational-gui.md) | **Browser GUI:** `apps/thinui` (React) from validated USXD; **UniversalSurfaceXD** lab + `ux:validate-surfaces`; terminal surfaces per **`SHELL_v4_*`** |
| **Variables + uCode** | [docs/specs/uDos-variables-ucode-v4.md](specs/uDos-variables-ucode-v4.md), [`UCODE_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4.md), [`UCODE_v4_family-lock-2026-04-11.md`](../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_family-lock-2026-04-11.md), addenda 1–3 | **Variables doc** — `$VAR$` / dotted paths; **uCode v4** — **locked** pack (2026-04-11); phases A→C for variables layer |
| **v4.4–v4.8 rounds (planning)** | [`uDos-v4-rounds-consolidated-execution-plan.md`](../../uDosConnect/uDosDev/docs/future/uDos-v4-rounds-consolidated-execution-plan.md) | **Locked for planning** — infrastructure → uCode → gameplay → uChatDown experiment lanes → plugins / 3D |

**Execution tracking:** [TASKS.md](../TASKS.md) · family rounds [v4-dev-rounds.md](../../uDosConnect/uDosDev/docs/v4-dev-rounds.md).

## v4 journey — status snapshot (integration monorepo)

**Last reviewed:** 2026-04-10 · **Spec hub audit:** [`[UDGO-R02]`](../TASKS.md) **done** — full `specs/v4/` inventory in [specs/README.md](specs/README.md); re-extend when [uDosDev `README.md`](../../uDosConnect/uDosDev/docs/specs/v4/README.md) changes.

| Area | State | Notes |
| --- | --- | --- |
| **Family dev standard (v4)** | **Adopted** | Task, `dev-process-v4.md`, `.local` / `.compost`; root `package.json` meta **4.x** is dev-standard semver (not the v3.0.1 demo label). |
| **v3.0.x milestones (product)** | **Closed (M1–M8)** | [MILESTONES.md](MILESTONES.md) — local demo, reliability, second scenario, USXD validation sweep, closure tranche. |
| **Docs consolidation (plan P0–P4)** | **Done** | [docs/dev/docs-v4-consolidation-plan.md](dev/docs-v4-consolidation-plan.md); hub is [README.md](README.md). |
| **USXD validation (integration + lab)** | **Done** | [`[UDGO-R01]`](../TASKS.md): `npm run validate:usxd:parity`; [specs/README.md](specs/README.md). |
| **uDosDev specs v4 → this repo** | **Baseline done** (2026-04-10) | [specs/README.md](specs/README.md) lists every file in [uDosDev `specs/v4/README.md`](../../uDosConnect/uDosDev/docs/specs/v4/README.md) + integration vs sibling-product tables; maintenance when that README grows. |
| **Shell TUI / shared command palette in Host** | **Not implemented** | [SHELL_v4_*](../../uDosConnect/uDosDev/docs/specs/v4/) linked for direction; Bubble Tea / Host TUI not in monorepo yet. |
| **Sonic handoff (device DB / triage)** | **Docs only** | Specs linked; runtime consumption from ThinUI/Host deferred. |
| **Repo split (host / thinui / hivemind)** | **Prep only** | [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md); no extraction performed. |
| **GitHub branding / rename sweep** | **Backlog** | [`[UDGO-T001]`](../TASKS.md), [repo-identity-and-rename-v4.md](repo-identity-and-rename-v4.md). |

**Cross-repo spine (family):** [uDosConnect/uDosDev/docs/roadmap-v4-family.md](../../uDosConnect/uDosDev/docs/roadmap-v4-family.md) — this monorepo matches the **uDos-Go** row (runnable core, ThinUI, grid canon, USXD validation). Governance stays in **uDosConnect**; USXD interchange lab in **UniversalSurfaceXD**; native Mac client is **uMacDown** — out of tree here.

## Immediate post-demo (v3.0.2 candidates)

- **Done (P0):** Job runner timeouts + vault write size cap + structured `tool.failed` / task `errorCode`; ThinUI SSE reconnect with backoff + status line; persistence decision (JSON for now) in [DATA-MODEL.md](DATA-MODEL.md).
- **Done (P1):** Second demo scenario (inbox / email-thread intake) + [DEMO.md](DEMO.md) + `demo:seed:inbox`.
- **Done (P2 prep):** [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md) (checklist only; no repo split in-tree).
- **Done (v3.0.3):** `validate:usxd` validates **all** USXD surface JSON files under `examples/` (not only the canonical file); use `npm run validate:usxd:verbose` to list skipped JSON.
- **Done (v3.0.3 closure):** Feed `metadata.surfaceRef` + `feed.received`; SSE and JSON persistence decisions recorded; optional demo media folder [docs/media/README.md](docs/media/README.md); [BACKLOG.md](BACKLOG.md) active tranche cleared.
- ThinUI live updates: optional SSE filtering or WebSocket if a hard blocker appears.
- SQLite (or single-DB) consolidation for tasks + events if file sprawl hurts (deferred past v3.0.2 P0).

## Display stack (confirmed specs → code)

**Docs:** [DISPLAY_STACK.md](DISPLAY_STACK.md) — router for GRID-GRAPHICS-CANON, USXD, View/Render/Grid/Teletext/Spatial/Style guides.

**Done in repo (baseline):**

- `packages/shared` — `USXD_SCHEMA_VERSION`, mosaic + fallback ladder constants beside viewport/tile px.
- `packages/schemas/usxd-surface.schema.json` — JSON Schema subset for `usxd/0.1` surface documents.
- `examples/usxd-surface-canonical.example.json` — canonical 80×30 teletext example.

**Done (implementation):**

- `npm run validate:usxd` — AJV (draft 2020-12) validates every `usxd/0.1` surface JSON under `examples/` against `usxd-surface.schema.json`; runs at the start of `npm run build`.
- ThinUI footer — shows `USXD_SCHEMA_VERSION`, canonical viewport, cell px, canvas px, link to **Teletext lab**.
- **Teletext lab** — hash route `#/lab/teletext`; interactive 2×3 mosaic toggles (scaled view of one 16×24 logical cell).

**Next:**

- Add more `examples/**/*.json` surface fixtures; `npm run validate:usxd` picks them up automatically.
- Host: optional `surfaceRef` or embedded layout metadata beyond ThinUI.

## Active tranche

**Product backlog (v3.0.x):** [BACKLOG.md](BACKLOG.md) — all tranches through **v3.0.3 / M8** are **closed**; no open v3.0.x milestone queue.

**v4 spec hub:** Baseline inventory parity complete — [`[UDGO-R02]`](../TASKS.md). When **uDosDev** adds spec files, update [specs/README.md](specs/README.md) in the same change set.

**Optional:** **[UDGO-T001]** rename/branding sweep when scheduled.

Historical execution order for v3.0.2:

1. Reliability hardening (job runner + stream resilience + persistence decision).
2. Second scenario (inbox thread) using existing contracts.
3. Repo split preparation ([REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md)).

## Repo split (only after demo acceptance)

- Extract `apps/host` → `uDOS-host` repo with semver.
- Extract `packages/hivemind` → `uDOS-hivemind` (or keep package private).
- Extract `apps/thinui` → `uDOS-thinui`.
- Keep `packages/schemas` published or git-subtree shared.

## Depth features (explicitly not v3.0.1)

- Full family module parity, sync engine, beacon networking, MCP registry, marketplace, mobile, App Store.

## WordPress depth

- Multisite, enterprise CRM, full bi-directional Empire sync.

Track decisions that affect scope in [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md) and bump version when scope changes.
