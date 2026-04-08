# Repo split prep (v3.0.2+)

This document records **boundaries and a checklist** for extracting `uDOS-v3` into sibling repos when you accept the demo tranche. It does **not** perform a split.

## Target repos (from [ROADMAP.md](ROADMAP.md))

| Extract | Suggested repo | Contents |
|---------|----------------|----------|
| Host runtime | `uDOS-host` | `apps/host` → package root, Host-only scripts, Docker references as needed |
| Planner / Scout | `uDOS-hivemind` (optional) | `packages/hivemind` |
| Operator UI | `uDOS-thinui` | `apps/thinui` |
| Contracts | Published or subtree | `packages/schemas`, `packages/sdk`, `packages/shared` |

## Pre-split checklist

1. **Semver:** Assign independent versions per package (`@udos/host`, `@udos/hivemind`, etc.); root stays a workspace or meta-repo.
2. **Imports:** Replace workspace aliases with published packages or `file:` / git submodules for `@udos/sdk`, `@udos/shared`, `@udos/hivemind`.
3. **CI:** Copy minimal `build` + `validate:usxd` (if ThinUI/shared still needed) into each repo; document cross-repo release order.
4. **Docs:** Move Host HTTP table to host repo README; keep family-level [DEMO.md](DEMO.md) in a meta repo or duplicate a slim operator guide per repo.
5. **Env / data root:** Single source of truth for `UDOS_DATA_ROOT` and demo scripts lives with Host; ThinUI keeps `VITE_UDOS_HOST_URL` only.
6. **WordPress:** Plugin path today is under `apps/wordpress-plugin-empire-local` — decide whether it ships with Host repo or stays in a small `uDOS-empire-local` package.

## Out of scope (unchanged)

Full sync engine, marketplace, mobile clients, and family-wide module parity remain **post-split** depth work per [BACKLOG.md](BACKLOG.md).
