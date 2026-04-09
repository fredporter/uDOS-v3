# Agent notes (uDOS-v3)

**uDos** = **Universal Device Operating Surface** (canonical expansion from v3+). **UDOs** = User Defined Objects when that noun is intended. From **dev standard v4**, prefer **uDos** in new/edited copy; leave historical **uDOS** until the file is revised ([dev-process-v4.md](docs/dev-process-v4.md)).

## Scope

- **This repo** is the **runnable v3 monorepo** (Host, ThinUI, Hivemind, schemas, demo). Prefer **`main`**; short-lived branches only with a clear reason.
- **Not in scope:** UniversalSurfaceXD lab UI, private product binaries, full marketplace — see README and [SCOPE-v3.0.1.md](docs/SCOPE-v3.0.1.md).

## Dev standard (v4)

- **Tasks:** root [`TASKS.md`](TASKS.md) — Task Forge sections (Backlog / In Progress / Blocked / Done).
- **Process:** [`docs/dev-process-v4.md`](docs/dev-process-v4.md), checklist [`docs/dev-checklist-v4.md`](docs/dev-checklist-v4.md).
- **Scratch:** use **`.local/`** (untracked). **`.compost/`** for discarded file copies — both must remain **gitignored**.

## Pairing

- **Design / surfaces:** [UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD) (v4 lab) — grid/interchange alignment; **canon** text in [docs/GRID-GRAPHICS-CANON.md](docs/GRID-GRAPHICS-CANON.md).
- **Family workflow:** [uDOS-dev](https://github.com/fredporter/uDOS-dev) — governance only.

## Version field

Root `package.json` **version** is the **repo dev-standard / meta semver (v4+)**. The **v3.0.1** label in docs is the **planning/demo release** name — do not conflate the two in release notes.
