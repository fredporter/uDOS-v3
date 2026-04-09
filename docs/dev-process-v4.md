# Dev process — locked structure (v4)

**Status:** family standard (2026-04)  
**Applies to:** this monorepo and sibling repos under the same workflow.

## What “v4” means here

- **Repo meta version** `4.x` (see root `package.json` **version**) tracks the **dev process and tooling contract**, not a rename of the **v3.0.1 demo / planning** product line (see [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md)).
- **UniversalSurfaceXD v4** is the companion design/interchange lab: [github.com/fredporter/UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD) — pair for surface JSON and Figma workflows.

## Locked layout

| Zone | Role |
| --- | --- |
| **`.local/`** | Untracked thinking, scratch, experiments (must stay out of Git). |
| **`.compost/`** | Untracked decay pile for replaced files (optional). |
| **`TASKS.md`** | Single active task surface (Task Forge: Backlog → In Progress → Blocked → Done). |
| **`/docs/`**, **`/apps/`**, **`/packages/`** | Tracked system code and canonical docs. |

Flow: **`.local` → `TASKS.md` → `/src` (or apps/packages) → `.compost`**.

## Companion norms

- **Checklist:** [dev-checklist-v4.md](dev-checklist-v4.md) (pre / during / post dev pass).
- **Split / family:** [workspace-and-family-repos-v4.md](workspace-and-family-repos-v4.md) — which sibling repos matter for the v3 demo, upgrades, and when to extract from the monorepo.
- **Extraction checklist (existing):** [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md).

## Agent / editor notes

See root **[AGENTS.md](../AGENTS.md)** for Cursor and automation boundaries.
