# Workspace folders, v3 demo, and split criteria (v4)

**Purpose:** map the **uDOS-family / uDOS-v3.code-workspace** roots to roles, and when to **split** the monorepo back into sibling repos.

## What the v3.0.1 demo needs inside `uDOS-v3`

| Area | Needed for demo? |
| --- | --- |
| `apps/host`, `apps/thinui`, `packages/*` | **Yes** — core loop |
| `demo/`, `scripts/`, `infra/` | **Yes** — gold path |
| `docs/` | **Yes** — operator + canon |

## Sibling folders in the workspace (outside the monorepo root)

| Folder | Role for v3 demo | Upgrade / pull-in? |
| --- | --- | --- |
| **uDOS-dev** | Roadmap, governance, family workflow | **No** runtime merge — link docs only |
| **uDOS-core** | Legacy contracts reference | Optional parity checks; **not** required to run v3 demo |
| **uDOS-host** (v2) | **Extraction target** for Host after demo | Keep aligned via [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md); do not duplicate runtime into monorepo unless extracting |
| **uDOS-thinui** (v2) | UX reference / diff | Same — reference until ThinUI is consumed from monorepo `apps/thinui` |
| **uDOS-empire**, **uDOS-docs**, **uDOS-workspace** | Bridges / docs / binder refs | Use as **reference**; no wholesale merge into v3 monorepo for v3.0.1 |
| **UniversalSurfaceXD** (v4 lab) | Surface JSON + designer | **Pair** for interchange — not merged into uDOS-v3 |
| **uDOS-themes** | Theme forks | Optional visual parity — not blocking v3 demo loop |

**Rule:** the **runnable v3 demo** is **`uDOS-v3`**. Other repos are **siblings** for governance, design, or post-split extraction — not a second source of truth for runtime code during the monorepo phase.

## When to split (consider)

Use **[REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md)** when:

1. The **demo tranche is accepted** (stable Host + ThinUI + schemas + operator story).
2. **Independent semver and CI** per package are worth the overhead.
3. **Imports** can be repointed from workspaces to published packages or `file:` links without churn.

**Do not split early** if the team still needs **one branch** and **one doctor/launch** story — the monorepo exists to reduce coordination cost until the demo is solid ([README](README.md), [ROADMAP.md](ROADMAP.md)).

## Pulling *into* the monorepo

- **Default:** bring work **into `uDOS-v3` packages** via normal PRs (not by copying whole legacy trees).
- **Exception:** legacy **uDOS-host** / **uDOS-thinui** stay **read-only references** until you execute **REPO-SPLIT-PREP** in reverse (extract out), or consciously merge a bounded subset (document the boundary).

## UniversalSurfaceXD

- **Never** a substitute for `packages/schemas` in the monorepo — it is the **designer + interchange** lane.
- Tag releases (e.g. **v4.4.1**) are independent of uDOS-v3’s **package version** — coordinate only at **contract** boundaries (USXD surface, grid canon).
