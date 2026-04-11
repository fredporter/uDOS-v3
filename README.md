# uDOS v3.0.1 — Local-first demo (planning cut)

**Name:** **uDos** expands to **Universal Device Operating Surface**. The capital **D** is intentional (**uDos**, not `udos` or `uDOS` in new copy—see [docs/dev-process-v4.md](docs/dev-process-v4.md)).

**GitHub:** [https://github.com/fredporter/uDosGo](https://github.com/fredporter/uDosGo) — clone locally as **`~/Code/uDosGo/`** (family convention).

**Repo meta / dev standard:** root `package.json` **version 4.x** tracks the **family dev process** (see [docs/dev-process-v4.md](docs/dev-process-v4.md)). **v3.0.1** below is the **planning / demo release** name for this integration monorepo — not the same axis as UniversalSurfaceXD’s release line or **uDosDev** governance versioning.

**v3.0.1** is the first public-facing planning release for a **single, runnable local loop**: ThinUI submits and inspects work, Hivemind plans and routes it, Host executes and persists it, WordPress provides local identity, privacy, and restricted pages, and everything lands on a **mounted vault/workspace**.

This repository is the **v3 monorepo target**. Implementation may start empty; the **planning pack** lives under [`docs/`](docs/) and [`packages/schemas/`](packages/schemas/).

**Family v4 — Cursor / VS Code:** open **[`uDosGo.code-workspace`](uDosGo.code-workspace)** at the repo root (simple `../` paths to `~/Code/` siblings). **Focused lanes** (same repos, paths from `workspaces/`): [`workspaces/README.md`](workspaces/README.md) — `uDOS-v4.code-workspace`, `Linkdown-v4.code-workspace`, `uMacDown-v4.code-workspace`.

## One sentence

A local-first orchestration demo where ThinUI submits and inspects work, Hivemind plans it, Host executes it, WordPress handles identity/privacy/restricted local pages, and all outputs persist to a mounted vault/workspace.

## What ships in v3.0.1 (demo)

- **Host** — persistent node, storage root, HTTP API, job runner, event log, WordPress runtime wiring, health.
- **Hivemind** — feed intake, 4-role orchestration (Scout → Planner → Maker → Reviewer), provider routing, budget awareness, events via Host.
- **ThinUI** — Feed, Task graph/queue, Output/event log, manual triggers, links to restricted WP pages where needed.
- **WordPress (localhost)** — login, restricted pages, privacy export/erase hooks, Empire contact ↔ WP user bridge via **`udos-empire-local`**.
- **Storage** — `/udos-data` layout: vault, spool, events, exports, wordpress, backups.

Not the whole uDOS family. Not the full product vision. **One clean loop.**

## Planning documents

**Full index:** [docs/README.md](docs/README.md) — sections for start-here, system design, **specifications**, **style guide**, delivery, schemas.

| Doc | Purpose |
|-----|---------|
| [docs/QUICKSTART.md](docs/QUICKSTART.md) | First-time setup + install/run path |
| [docs/SCOPE-v3.0.1.md](docs/SCOPE-v3.0.1.md) | In scope / out of scope (locked) |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Boundaries, data flow, module contracts |
| [docs/specs/README.md](docs/specs/README.md) | **Specifications hub** (USXD, engines, schema paths, ThinUI lab) |
| [docs/specs/RETRO_COMMAND_ALIASES_v4.md](docs/specs/RETRO_COMMAND_ALIASES_v4.md) | **Locked** — retro CLI aliases (`PEEK`/`POKE`, …) + `@udos/shared` resolver |
| [docs/GRID-GRAPHICS-CANON.md](docs/GRID-GRAPHICS-CANON.md) | **Locked** 80×30, **16×24**, teletext bridge, UniversalSurfaceXD pairing |
| [docs/style-guide.md](docs/style-guide.md) | **Style guide** — tokens, typography, USXD `usxd/0.1` frontmatter, ASCII vs teletext |
| [docs/DEMO.md](docs/DEMO.md) | Gold-path scenario, expected outputs, operator steps |
| [docs/DATA-MODEL.md](docs/DATA-MODEL.md) | Persistence layout, schemas, truth model |
| [docs/WP-BRIDGE.md](docs/WP-BRIDGE.md) | Empire ↔ WordPress bridge design |
| [docs/MILESTONES.md](docs/MILESTONES.md) | Build order + checklist |
| [docs/BACKLOG.md](docs/BACKLOG.md) | v3.0.1 closure + deferred work |
| [docs/ROADMAP.md](docs/ROADMAP.md) | After v3.0.1 (split repos, depth) |
| [docs/REPO-SPLIT-PREP.md](docs/REPO-SPLIT-PREP.md) | Checklist for extracting Host / ThinUI / hivemind repos |
| [docs/FILE-TREE.md](docs/FILE-TREE.md) | Exact monorepo tree + scaffold notes |

## Schemas (first draft)

JSON Schema drafts live in [`packages/schemas/`](packages/schemas/): **`usxd-surface`** (`usxd/0.1`), `feed`, `task`, `event`, `contact`, `user-link`, `provider-policy`. Example surfaces: [`examples/usxd-surface-canonical.example.json`](examples/usxd-surface-canonical.example.json), [`examples/usxd-surface-minimal.example.json`](examples/usxd-surface-minimal.example.json) (`npm run validate:usxd` checks all USXD surfaces under `examples/`).

## Relation to sibling repos

The broader **uDos** family workspace may keep historical modules (`uDOS-host`, `uDOS-thinui`, …). **v3.0.1** consolidates the demo into this monorepo shape first; split back to separate repos only after the demo is solid.

See also: [`../uDosConnect/uDosDev/docs/v3-system-brief.md`](../uDosConnect/uDosDev/docs/v3-system-brief.md) (bootstrap brief; sibling under `~/Code/`).

## Companion: UniversalSurfaceXD (design + interchange)

Portable surface vocabulary, interchange JSON, Figma handoff, and the browser **UX designer** live in the open-source repo **[github.com/fredporter/UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)** (MIT). Optional local checkout: sibling **`../UniversalSurfaceXD`** under **`~/Code/`** (same level as this repo). This monorepo is the **runnable uDos integration**; UniversalSurfaceXD is the **composer + lab + interchange** side. Keep `packages/schemas` and ThinUI copy aligned with `UniversalSurfaceXD/interchange/` when contracts change.

## Quick start

Use [`docs/QUICKSTART.md`](docs/QUICKSTART.md) for complete first-time installation and setup.

Fast path:

```bash
npm install
npm run doctor
npm run launch:open
```

- Host: `http://127.0.0.1:8787`
- ThinUI: `http://127.0.0.1:5173`

Optional WordPress (steps 8-9):

```bash
npm run wp:up
npm run demo:wp-bootstrap
npm run demo:wp-link
```

Convenience launchers:

- macOS: `uDOS-Dev.command` / `uDOS-Dev+WP.command`
- Windows: `uDOS-Dev.cmd` / `uDOS-Dev+WP.cmd`

### Dev / prod without launchers

```bash
npm run dev            # Host + ThinUI (watch) — same as launch after install
npm run start          # build, then Host (node) + ThinUI (vite preview) — no watch
npm run host:dev       # Host only (tsx watch)
npm run thinui:dev     # ThinUI only
npm run host:start     # Host only (run `npm run build` first)
npm run demo:seed      # POST gold-path input to Host (needs Host running); --dry-run supported
npm run demo:seed:inbox   # POST inbox-thread sample → `thread-{id}.md` vault stem
npm run build          # sdk + hivemind + host + thinui (starts with validate:usxd)
npm run validate:usxd:verbose  # USXD validation + log skipped JSON under examples/
```

WordPress (Docker, optional): persistent tree matches Host at `./.udos-data/wordpress`.

```bash
npm run wp:up          # WordPress http://127.0.0.1:8080 + MySQL (see infra/docker/README.md)
npm run wp:down
```

Requires Docker. **Fast path (no browser wizard):** after `npm run wp:up`, run **`npm run demo:wp-bootstrap`** then log in as Subscriber **`demo`** (password printed to the terminal; also in `demo/.wp-demo.env`). For the contact link, run **`npm run demo:wp-link`**. Alternatively, complete the WordPress install wizard in the browser and activate **uDOS Empire Local** under Plugins.

**Bridge:** Host probes WordPress at `UDOS_WP_BASE_URL` (default `http://127.0.0.1:8080`) via `GET /api/v1/bridge/wordpress` → `GET /wp-json/udos-empire/v1/health`. ThinUI shows the JSON when `VITE_UDOS_WP_URL` is set (see `apps/thinui/.env.development`).

**Note:** `@udos/thinui` depends on `@udos/sdk` via `file:../../packages/sdk` for broad npm compatibility.
