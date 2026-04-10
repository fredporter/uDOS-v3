# uDosDev v4 upgrade — delta

**Role:** Before/after snapshot for the **`@dev`** → **`docs/archive/pre-v4-atdev/`** move (**2026-04**).

| Item | Before | After |
| --- | --- | --- |
| Tracked dev workspace | `@dev/…` (directory under repo root) | `docs/archive/pre-v4-atdev/…` |
| Repo root `@dev` | directory | **Symlink** → `docs/archive/pre-v4-atdev/` |
| Local inbox | `@dev/inbox/` (gitignored) | Unchanged pattern; still under symlink target when present |
| Active v4 workflow | `docs/proposals/`, `docs/decisions/`, `docs/promotions/`, `docs/process/` | Unchanged |
| Operator progress | — | This repo: **`docs/dev/udosdev-v4-upgrade-progress.md`**, **`udosdev-v4-upgrade-delta.md`** |

**Windows:** symlinks require appropriate git/clone settings or Developer Mode; if `@dev` does not resolve, use the real path **`docs/archive/pre-v4-atdev/`**.
