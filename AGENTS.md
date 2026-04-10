# Agent notes (uDos)

**uDos** = **Universal Device Operating Surface** (canonical expansion from v3+). Capital **D** is intentional—do not “fix” to `udos` / `uDOS` in new work. From **dev standard v4**, prefer **uDos** in new/edited copy; leave historical **uDOS** until the file is revised ([dev-process-v4.md](docs/dev-process-v4.md)). Do not introduce a separate “UDO” / “UDOs” acronym in this family’s docs (reserved elsewhere in the market).

## Scope

- **This repo** is the **runnable integration monorepo** (Host, ThinUI, Hivemind, schemas, demo). On GitHub: **[uDos-Go](https://github.com/fredporter/uDos-Go)**. Local folder: **`~/Code/uDosGo/`**. Prefer **`main`**; short-lived branches only with a clear reason.
- **Not in scope:** UniversalSurfaceXD lab UI, private product binaries, full marketplace — see README and [SCOPE-v3.0.1.md](docs/SCOPE-v3.0.1.md).

## Dev standard (v4)

- **Tasks:** root [`TASKS.md`](TASKS.md) — Task Forge sections (Backlog / In Progress / Blocked / Done).
- **Process:** [`docs/dev-process-v4.md`](docs/dev-process-v4.md), checklist [`docs/dev-checklist-v4.md`](docs/dev-checklist-v4.md).
- **Scratch:** use **`.local/`** (untracked). **`.compost/`** for discarded file copies — both must remain **gitignored**.

## Pairing

- **Multi-root workspace (v4):** default **[`uDosGo.code-workspace`](uDosGo.code-workspace)** at repo root; **focused** variants in **[`workspaces/`](workspaces/README.md)** (`uDOS-v4`, Linkdown, Macdown — same sibling roots, paths relative to `workspaces/`).
- **Design / surfaces:** [UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD) (v4 lab) — grid/interchange alignment; **canon** text in [docs/GRID-GRAPHICS-CANON.md](docs/GRID-GRAPHICS-CANON.md).
- **Family workflow:** [uDos-Dev](https://github.com/fredporter/uDos-Dev) (submodule under uDosConnect) — governance only. **v4 rounds index:** [`uDosConnect/uDosDev/docs/v4-dev-rounds.md`](../uDosConnect/uDosDev/docs/v4-dev-rounds.md).

## Version field

Root `package.json` **version** is the **repo dev-standard / meta semver (v4+)**. The **v3.0.1** label in docs is the **planning/demo release** name — do not conflate the two in release notes.
