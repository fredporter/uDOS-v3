# uDOS v4 — focused workspaces (uDos-Go)

These files live in **`workspaces/`** so paths use **`../`** (uDos-Go repo root) and **`../../…`** (siblings under `~/Code/`).

**Default / full family:** prefer the repo-root **[`../uDosGo.code-workspace`](../uDosGo.code-workspace)** when you want the same roots with simpler relative paths (open from `~/Code/uDosGo/`).

| File | Use |
| --- | --- |
| [`uDOS-v4.code-workspace`](./uDOS-v4.code-workspace) | Full v4 ecosystem (same roots as `uDosGo.code-workspace`, paths from `workspaces/`) |
| [`Linkdown-v4.code-workspace`](./Linkdown-v4.code-workspace) | Editor + Chatdown |
| [`Macdown-v4.code-workspace`](./Macdown-v4.code-workspace) | macOS app + Chatdown + USXD lab |

## Expected `~/Code/` layout

| Folder | Notes |
| --- | --- |
| `Linkdown`, `Linkdown-premium`, `Syncdown-app`, `Chatdown`, `UniversalSurfaceXD`, `uDosConnect`, `SonicScrewdriver`, `Ventoy` | Sibling clones |

## Scripts

See **[`../../uDosConnect/scripts/v4-dev/README.md`](../../uDosConnect/scripts/v4-dev/README.md)** (`update-all-repos.sh`, `check-tasks-md.sh`, etc.).
