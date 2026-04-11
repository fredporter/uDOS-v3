# uDos v4 — focused workspaces (uDosGo)

These files live in **`workspaces/`** so paths use **`../`** (uDosGo repo root) and **`../../…`** (siblings under `~/Code/`).

**Default / full family:** prefer the repo-root **[`../uDosGo.code-workspace`](../uDosGo.code-workspace)** when you want the same roots with simpler relative paths (open from `~/Code/uDosGo/`).

| File | Use |
| --- | --- |
| [`uDOS-v4.code-workspace`](./uDOS-v4.code-workspace) | Full v4 ecosystem (same roots as `uDosGo.code-workspace`, paths from `workspaces/`) |
| [`Linkdown-v4.code-workspace`](./Linkdown-v4.code-workspace) | Editor + uChatDown |
| [`uMacDown-v4.code-workspace`](./uMacDown-v4.code-workspace) | uMacDown + uChatDown + USXD lab |

## Expected `~/Code/` layout

| Folder | Notes |
| --- | --- |
| `Linkdown`, `Linkdown-premium`, `uMacDown`, `uChatDown`, `uFeedThru`, `UniversalSurfaceXD`, `uDosConnect`, `SonicScrewdriver`, `Ventoy`, `uHomeNest` | Sibling clones |

## Scripts

See **[`../../uDosConnect/scripts/v4-dev/README.md`](../../uDosConnect/scripts/v4-dev/README.md)** (`update-all-repos.sh`, `check-tasks-md.sh`, etc.).
