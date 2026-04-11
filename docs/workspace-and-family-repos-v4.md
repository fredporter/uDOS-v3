# Workspace folders, v3 demo, and split criteria (v4)

**Purpose:** map **sibling repos** and **`uDosGo.code-workspace`** roots to roles, and when to **split** the monorepo back into sibling repos.

**Canonical local spine (2026+):** clone this monorepo as **`~/Code/uDosGo/`**; governance, public docs, and `v2-reference` live under **`~/Code/uDosConnect/`** — see **[uDosConnect: `docs/family-workspace-layout.md`](https://github.com/fredporter/uDosConnect/blob/main/docs/family-workspace-layout.md)**.

**Cursor workspaces:** open **[`uDosGo.code-workspace`](../uDosGo.code-workspace)** at repo root, or focused files under **[`workspaces/`](../workspaces/README.md)** (`uDOS-v4`, Linkdown-v4, uMacDown-v4 — paths relative to `workspaces/`).

## What the v3.0.1 demo needs inside **`uDosGo`** (this monorepo)

| Area | Needed for demo? |
| --- | --- |
| `apps/host`, `apps/thinui`, `packages/*` | **Yes** — core loop |
| `demo/`, `scripts/`, `infra/` | **Yes** — gold path |
| `docs/` | **Yes** — operator + canon |

## Sibling folders in the workspace (outside the monorepo root)

| Folder | Role for v3 demo | Upgrade / pull-in? |
| --- | --- | --- |
| **uDosDev** (under **uDosConnect**) | Roadmap, governance, family workflow | **No** runtime merge — link docs only |
| **uDOS-core** | Legacy contracts reference | Optional parity checks; **not** required to run v3 demo |
| **uDOS-host** (v2) | **Extraction target** for Host after demo | Keep aligned via [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md); do not duplicate runtime into monorepo unless extracting |
| **uDOS-thinui** (v2) | UX reference / diff | Same — reference until ThinUI is consumed from monorepo `apps/thinui` |
| **uDOS-empire**, **uDOS-docs**, **uDOS-workspace** | Bridges / docs / binder refs | Use as **reference**; no wholesale merge into v3 monorepo for v3.0.1 |
| **UniversalSurfaceXD** (v4 lab) | Surface JSON + designer | **Pair** for interchange — not merged into this monorepo |
| **uDOS-themes** | Theme forks | Optional visual parity — not blocking v3 demo loop |

**Rule:** the **runnable v3.0.1 demo** lives in **`uDosGo`**. Other repos are **siblings** for governance, design, or post-split extraction — not a second source of truth for runtime code during the monorepo phase.

## When to split (consider)

Use **[REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md)** when:

1. The **demo tranche is accepted** (stable Host + ThinUI + schemas + operator story).
2. **Independent semver and CI** per package are worth the overhead.
3. **Imports** can be repointed from workspaces to published packages or `file:` links without churn.

**Do not split early** if the team still needs **one branch** and **one doctor/launch** story — the monorepo exists to reduce coordination cost until the demo is solid ([README](README.md), [ROADMAP.md](ROADMAP.md)).

## Pulling *into* the monorepo

- **Default:** bring work **into `uDosGo` packages** via normal PRs (not by copying whole legacy trees).
- **Exception:** legacy **uDOS-host** / **uDOS-thinui** stay **read-only references** until you execute **REPO-SPLIT-PREP** in reverse (extract out), or consciously merge a bounded subset (document the boundary).

## UniversalSurfaceXD

- **Never** a substitute for `packages/schemas` in the monorepo — it is the **designer + interchange** lane.
- Tag releases (e.g. **UniversalSurfaceXD 4.4.x**) are independent of this monorepo’s **package version** — coordinate only at **contract** boundaries (USXD surface, grid canon).
