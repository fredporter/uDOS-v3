# Agent notes (uDos)

**uDos** = **Universal Device Operating Surface** (canonical expansion from v3+). Capital **D** is intentional—do not “fix” to `udos` / `uDOS` in new work. From **dev standard v4**, prefer **uDos** in new/edited copy; leave historical **uDOS** until the file is revised ([dev-process-v4.md](docs/dev-process-v4.md)). Do not introduce a separate “UDO” / “UDOs” acronym in this family’s docs (reserved elsewhere in the market).

## Scope

- **This repo** is the **runnable integration monorepo** (Host, ThinUI, Hivemind, schemas, demo). On GitHub: **[uDosGo](https://github.com/fredporter/uDosGo)** (`fredporter/uDosGo`). Local folder: **`~/Code/uDosGo/`**. Prefer **`main`**; short-lived branches only with a clear reason.
- **Not in scope:** UniversalSurfaceXD lab UI, private product binaries, full marketplace — see README and [SCOPE-v3.0.1.md](docs/SCOPE-v3.0.1.md).

## Dev standard (v4)

- **Tasks:** root [`TASKS.md`](TASKS.md) — Task Forge sections (Backlog / In Progress / Blocked / Done).
- **Process:** [`docs/dev-process-v4.md`](docs/dev-process-v4.md), checklist [`docs/dev-checklist-v4.md`](docs/dev-checklist-v4.md).
- **Scratch:** use **`.local/`** (untracked). **`.compost/`** for discarded file copies — both must remain **gitignored**. **Doc consolidation plan:** [`docs/dev/docs-v4-consolidation-plan.md`](docs/dev/docs-v4-consolidation-plan.md).

## Pairing

- **Multi-root workspace (v4):** default **[`uDosGo.code-workspace`](uDosGo.code-workspace)** at repo root; **focused** variants in **[`workspaces/`](workspaces/README.md)** (`uDOS-v4`, Linkdown-v4, uMacDown-v4 — same sibling roots, paths relative to `workspaces/`).
- **Design / surfaces:** [UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD) (v4 lab) — grid/interchange alignment; **canon** text in [docs/GRID-GRAPHICS-CANON.md](docs/GRID-GRAPHICS-CANON.md).
- **Family workflow:** [uDosDev](https://github.com/fredporter/uDosDev) (submodule under uDosConnect) — governance only. **v4 rounds index:** [`uDosConnect/uDosDev/docs/v4-dev-rounds.md`](../uDosConnect/uDosDev/docs/v4-dev-rounds.md).
- **Family v4 specs (tasks, contacts, grid, GFM, Shell TUI, Sonic, USXD→GUI):** [`uDosConnect/uDosDev/docs/specs/v4/`](../uDosConnect/uDosDev/docs/specs/v4/) — map to this repo in [`docs/specs/README.md`](docs/specs/README.md) § Family v4; [`docs/ROADMAP.md`](docs/ROADMAP.md) § Family v4 alignment; **Round A (locked):** [`ROUND_A_CORE_ARCHITECTURE_v4.md`](../uDosConnect/uDosDev/docs/specs/v4/ROUND_A_CORE_ARCHITECTURE_v4.md); **USXD → ThinUI + Shell:** [`INTEGRATION_v4_usxd-operational-gui.md`](../uDosConnect/uDosDev/docs/specs/v4/INTEGRATION_v4_usxd-operational-gui.md). **Spatial + storage (locked):** [`SPATIAL_STORAGE_ECOSYSTEM_v1.md`](../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_STORAGE_ECOSYSTEM_v1.md). **uSpace / cloud fallback (locked):** [`SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md`](../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md). **Unified data WP / HubSpot / uDos (locked):** [`UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md`](../uDosConnect/uDosDev/docs/specs/v4/UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md). **UniversalVectorIL / UVIL (locked boundary):** [`UNIVERSAL_VECTOR_IL_UVIL_v1.md`](../uDosConnect/uDosDev/docs/specs/v4/UNIVERSAL_VECTOR_IL_UVIL_v1.md). **uCode v4 (locked):** [`UCODE_v4.md`](../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4.md), [`UCODE_v4_family-lock-2026-04-11.md`](../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_family-lock-2026-04-11.md), addenda [`UCODE_v4_addendum-quotes-markup-symbols.md`](../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-quotes-markup-symbols.md), [`UCODE_v4_addendum-2-linking-navigation.md`](../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-2-linking-navigation.md), [`UCODE_v4_addendum-3-execution-runtime-sandboxing.md`](../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-3-execution-runtime-sandboxing.md). **Rounds v4.4–v4.8 (planning):** [`uDos-v4-rounds-consolidated-execution-plan.md`](../uDosConnect/uDosDev/docs/future/uDos-v4-rounds-consolidated-execution-plan.md). **Variables in markdown:** [`docs/specs/uDos-variables-ucode-v4.md`](docs/specs/uDos-variables-ucode-v4.md).

## Version field

Root `package.json` **version** is the **repo dev-standard / meta semver (v4+)**. The **v3.0.1** label in docs is the **planning/demo release** name — do not conflate the two in release notes.
