# Local font store (Classic Modern)

ThinUI serves retro fonts from **`/fonts/...`** (Vite `public/`). The **Classic Modern** theme expects files under `apple-fonts/`:

| Face | Files used |
| --- | --- |
| Chicago (UI / bold) | `apple-fonts/ChicagoFLF.ttf`, `apple-fonts/pixChicago.ttf` |
| Geneva (body) | `apple-fonts/geneva_9.ttf` |
| Monaco (code) | `apple-fonts/monaco.ttf` |

## Point at `~/Code/fonts`

From the monorepo root (`uDosGo/`, with `fonts/` as a sibling folder under `~/Code/`):

```bash
ln -sf ../fonts apps/thinui/public/fonts
```

That maps **`~/Code/fonts`** → **`apps/thinui/public/fonts`** so URLs resolve (e.g. `/fonts/apple-fonts/ChicagoFLF.ttf`).

- **Do not commit** the symlink or copied binaries; `apps/thinui/public/fonts` is gitignored.
- If the symlink is missing, the UI still works: the browser falls back to system fonts (`classic-modern.css` uses `font-display: swap`).

## Optional query

- `?theme=classic-modern` — boot straight into Classic Modern (stored in `localStorage`).
