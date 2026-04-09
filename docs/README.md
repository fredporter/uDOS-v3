# uDOS v3 — documentation

**Monorepo:** local-first demo (Host, Hivemind, ThinUI, optional WordPress).  
**Sibling design repo:** **[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)** (interchange, browser-mockup, MIT) — pair it for portable surface JSON and Figma workflows. Optional clone: `../UniversalSurfaceXD` next to this repo’s parent folder (see [`uDOS-v3.code-workspace`](../../uDOS-v3.code-workspace)).

This folder is the **authoritative doc tree** for v3. **Naming:** prefer **`kebab-case.md`** for new files ([style-guide.md](style-guide.md)).

---

## 1. Start here

| Doc | Purpose |
| --- | --- |
| [QUICKSTART.md](QUICKSTART.md) | Install, launch scripts, first run |
| [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md) | What ships vs deferred (locked) |
| [dev-process-v4.md](dev-process-v4.md) | Locked dev structure: `TASKS.md`, `.local/` / `.compost/`, checklist |
| [workspace-and-family-repos-v4.md](workspace-and-family-repos-v4.md) | Workspace siblings, demo loop needs, split criteria |
| [repo-identity-and-rename-v4.md](repo-identity-and-rename-v4.md) | What this monorepo is for; rename / branding options (v4) |
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
