# TASKS.md — uDosGo

Task Forge layout (family dev standard **v4**). **Family rounds index:** [`../uDosConnect/uDosDev/docs/v4-dev-rounds.md`](../uDosConnect/uDosDev/docs/v4-dev-rounds.md) (sibling layout under `~/Code/`).

## Backlog

## In Progress

## Blocked

## Done

- [x] [UDGO-T001] **GitHub branding sweep** — canonical **`fredporter/uDosGo`** documented in [`docs/repo-identity-and-rename-v4.md`](docs/repo-identity-and-rename-v4.md); **`uDosDev`** links use **`fredporter/uDosDev`** (not `uDos-Dev`); workspace + `package.json` already aligned; optional repo rename deferred per checklist in same doc #infra

- [x] [UDGO-UDEV-ARCH] **uDosDev `@dev` archive** — progress + delta in [`docs/dev/udosdev-v4-upgrade-progress.md`](docs/dev/udosdev-v4-upgrade-progress.md), [`docs/dev/udosdev-v4-upgrade-delta.md`](docs/dev/udosdev-v4-upgrade-delta.md); uDosDev **`[UDEV-R02]`** (tracked tree → `docs/archive/pre-v4-atdev/`, root `@dev` symlink) #docs

- [x] [UDGO-R03] **Legacy doc drift** — `npm run doc:drift` ([`scripts/check-doc-drift.mjs`](scripts/check-doc-drift.mjs)); §4–5 in [docs/dev/family-legacy-doc-map-v4.md](docs/dev/family-legacy-doc-map-v4.md) updated (2026-04-11). uDosGo `docs/` clean for `uDOS-family` / `uDOS-v3` / `sonic-v1` / stray `syncdown` outside meta · **USXD-R00/R11** remain on [UniversalSurfaceXD/TASKS.md](../UniversalSurfaceXD/TASKS.md) for that repo #docs

- [x] [UDGO-R02] **Family v4 specs** — hub parity with [`uDosConnect/uDosDev/docs/specs/v4/README.md`](../uDosConnect/uDosDev/docs/specs/v4/README.md) inventory (audit **2026-04-10**): second table for Chatdown / Linkdown / Macdown / matrix / MCP / Apple delta; **inventory parity** note in [`docs/specs/README.md`](docs/specs/README.md); [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) boundary; [`apps/thinui/README.md`](apps/thinui/README.md) + [`packages/schemas/README.md`](packages/schemas/README.md) handoff lines · *Maintenance:* when uDosDev README adds rows, extend hub table same pass #core #docs

- [x] [UDGO-R01] Grid + USXD validation parity with UniversalSurfaceXD lab — `npm run validate:usxd:sibling` + `validate:usxd:parity` ([`scripts/validate-usxd-sibling-lab.mjs`](scripts/validate-usxd-sibling-lab.mjs)); table in [`docs/specs/README.md`](docs/specs/README.md) #core

- [x] [UDGO-R00] Repo identity + docs sweep: **uDos-Go** / **uDosGo** in new copy; **`https://github.com/fredporter/uDosGo`** canonical; root `package.json` **`name`** → `udos-go`; fixed **`../uDosConnect/uDosDev/docs/v3-system-brief.md`** link from README #docs

- [x] [UDGO-DOC-CP01] **Docs P0** — [docs/dev/docs-v4-consolidation-plan.md](docs/dev/docs-v4-consolidation-plan.md) § P0: link audit from `docs/README.md`; fix stale workspace / family paths in touched `docs/` #docs

- [x] [UDGO-DOC-CP02] **Docs P1** — `examples/udos-v3.0.1-planning-pack/` frozen with banner + nested `docs/README.md` pointer to repo-root `docs/` #docs

- [x] [UDGO-DOC-CP03] **Docs P2–P3** — Hub “doc layers” + §7 implementation packages table in `docs/README.md` per plan #docs

- [x] [UDGO-DOC-CP04] **Docs P4** — Style stub [u_dos_v_3_style_guide.md](docs/u_dos_v_3_style_guide.md); ThinUI links [style-guide.md](docs/style-guide.md) #docs

- [x] [UDGO-WS] Multi-root workspaces: repo-root **`uDosGo.code-workspace`** + **`workspaces/`** (`uDOS-v4`, Linkdown-v4, Macdown-v4); removed duplicate `~/Code/uDosGo.code-workspace` / `uDosFamily.code-workspace` #docs
