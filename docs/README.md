# uDos — documentation (v4 working line)

**uDos** = **Universal Device Operating Surface** (capital **D** intentional in new/edited prose—[dev-process-v4.md](dev-process-v4.md)).

**Monorepo:** local-first demo (Host, Hivemind, ThinUI, optional WordPress). **GitHub:** [github.com/fredporter/uDosGo](https://github.com/fredporter/uDosGo) — clone **`~/Code/uDosGo/`**.  
**Sibling design repo:** **[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)** (interchange, browser-mockup, MIT). Optional clone: `../UniversalSurfaceXD` (see **[`uDosGo.code-workspace`](../uDosGo.code-workspace)** at repo root).

This folder is the **authoritative doc tree** for the repo. The **v3.0.1** label names the *planning / demo cut* in [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md); **family dev standard** is **v4** (`package.json` version line, `TASKS.md`, [dev-process-v4.md](dev-process-v4.md)). **Naming:** prefer **`kebab-case.md`** for new files ([style-guide.md](style-guide.md)).

**Doc consolidation (systematic plan):** [dev/docs-v4-consolidation-plan.md](dev/docs-v4-consolidation-plan.md) — phases P0–P4, `.compost/` policy, planning-pack duplicates under `examples/`.

**Cross-repo legacy map:** [dev/family-legacy-doc-map-v4.md](dev/family-legacy-doc-map-v4.md) — authoritative vs archive vs drift; optional **`uDOS-host`**; what belongs in **`.compost/`** vs **`v2-reference/`**. **Drift hints (uDosGo):** `npm run doc:drift` from repo root.

**uDosDev workspace migration (v4):** [dev/udosdev-v4-upgrade-progress.md](dev/udosdev-v4-upgrade-progress.md) · [dev/udosdev-v4-upgrade-delta.md](dev/udosdev-v4-upgrade-delta.md) — archive path, symlink compatibility, task id **`[UDEV-R02]`**.

**Reading order (layers):** **Canon** ([GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)) → **Specs / engines** (§3 below) → **Delivery** (§5) → **Family handoff** ([specs/README.md](specs/README.md) § Family v4).

---

## 1. Start here

| Doc | Purpose |
| --- | --- |
| [QUICKSTART.md](QUICKSTART.md) | Install, launch scripts, first run |
| [ROADMAP.md](ROADMAP.md) | v3.0.x milestones (closed) vs **v4 journey** snapshot — actual vs still to do; active tranche |
| [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md) | What ships vs deferred (locked) |
| [dev-process-v4.md](dev-process-v4.md) | Locked dev structure: `TASKS.md`, `.local/` / `.compost/`, checklist |
| [dev/docs-v4-consolidation-plan.md](dev/docs-v4-consolidation-plan.md) | **v4 doc refactor** — inventory, planning-pack, hub, package README index |
| [workspace-and-family-repos-v4.md](workspace-and-family-repos-v4.md) | Workspace siblings, demo loop needs, split criteria |
| [repo-identity-and-rename-v4.md](repo-identity-and-rename-v4.md) | What this monorepo is for; rename / branding options (v4) |
| [specs/README.md](specs/README.md) § Family v4 | **uDosDev** spec copies (`TASK_SPEC`, `CONTACT_SCHEMA`, `SHELL_v4_*`, `SONIC_v4_*`, grid, GFM, **`INTEGRATION_v4_usxd-operational-gui`**) — integration, shared Shell TUI, **USXD → ThinUI GUI** |
| [../README.md](../README.md) | Repo overview + planning table |

---

## 2. System design

| Doc | Purpose |
| --- | --- |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Module boundaries, data flows, API sketch |
| [DATA-MODEL.md](DATA-MODEL.md) | Vault/spool/events, JSON schemas, truth model |
| [WP-BRIDGE.md](WP-BRIDGE.md) | Empire ↔ WordPress plugin contract |
| [FILE-TREE.md](FILE-TREE.md) | Target monorepo layout + scaffold status |

---

## 3. Specifications (display / USXD / render)

**Hub:** [specs/README.md](specs/README.md) — grouped links to all engine specs and schema artifacts.

**Canon (locked):** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md) — 80×30, 16×24, teletext bridge, surface kinds, UniversalSurfaceXD role.

**Router:** [DISPLAY_STACK.md](DISPLAY_STACK.md) — three-layer scale model + recommended read order.

| Topic | Doc |
| --- | --- |
| USXD YAML/JSON shape | [usxd_schema.md](usxd_schema.md) |
| View × render matrix | [view_engine.md](view_engine.md) |
| End-to-end pipeline | [RENDER_PIPELINE.md](RENDER_PIPELINE.md) |
| Spatial layout engine | [grid_engine.md](grid_engine.md) |
| Maps / regions / markers | [spatial_map_spec.md](spatial_map_spec.md) |
| Teletext raster / mosaic | [teletext_engine.md](teletext_engine.md) |

**Validation:** `npm run validate:usxd` (all USXD surfaces under `examples/`; `--verbose` via `validate:usxd:verbose`) · **ThinUI:** footer parity strip · **Lab:** `#/lab/teletext`.

---

## 4. Style and authoring

| Doc | Purpose |
| --- | --- |
| [style-guide.md](style-guide.md) | Colours, typography, naming, USXD frontmatter, ASCII vs teletext, OK Assist |

Legacy filename: [u_dos_v_3_style_guide.md](u_dos_v_3_style_guide.md) redirects here.

---

## 5. Delivery and planning

| Doc | Purpose |
| --- | --- |
| [DEMO.md](DEMO.md) | Gold path, operator steps, definition of done |
| [MILESTONES.md](MILESTONES.md) | Build-order checklists |
| [BACKLOG.md](BACKLOG.md) | v3.0.1 closure + active backlog |
| [ROADMAP.md](ROADMAP.md) | Post-demo themes (reliability, display stack, split repos) |
| [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md) | Future extraction checklist (`uDOS-host`, ThinUI, hivemind) |
| [media/README.md](media/README.md) | Optional screenshot/video drop zone (demo checklist) |

---

## 6. Schemas in repo

| Path | Purpose |
| --- | --- |
| `packages/schemas/` | `usxd-surface`, `feed`, `task`, `event`, `contact`, `user-link`, `provider-policy` |
| `packages/shared/` | `grid-canonical.ts` — viewport/tile/mosaic constants |
| `examples/usxd-surface-*.example.json` | USXD sample surfaces (AJV via `validate:usxd`) |

See [packages/schemas/README.md](../packages/schemas/README.md).

---

## 7. Implementation packages and apps

| Path | Role |
| --- | --- |
| [apps/host/README.md](../apps/host/README.md) | HTTP Host, storage, execution |
| [apps/thinui/README.md](../apps/thinui/README.md) | Vite + React operator shell |
| [apps/wordpress-plugin-empire-local/README.md](../apps/wordpress-plugin-empire-local/README.md) | Local WordPress bridge plugin |
| [packages/hivemind/README.md](../packages/hivemind/README.md) | Orchestration / task loop |
| [packages/sdk/README.md](../packages/sdk/README.md) | Host HTTP client |
| [packages/schemas/README.md](../packages/schemas/README.md) | JSON Schemas, AJV |
| [packages/shared/README.md](../packages/shared/README.md) | Shared constants (e.g. grid) |
| [infra/docker/README.md](../infra/docker/README.md) | Optional compose stack |
| [infra/scripts/README.md](../infra/scripts/README.md) | Infra helper scripts |
