# ThinUI (`apps/thinui`)

Three-panel operator shell: Feed, Task graph/queue, Output/event log. Uses `packages/sdk` to talk to Host only.

## M1

- `npm run dev` — Vite on `5173`.
- `apps/thinui/.env.development` sets `VITE_UDOS_HOST_URL=http://127.0.0.1:8787`.

See [../../docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) and [../../docs/style-guide.md](../../docs/style-guide.md) (colours, USXD parity, teletext lab).

**Family v4 (GUI pipeline):** browser operator UI follows uDosDev [**INTEGRATION_v4_usxd-operational-gui**](../../../uDosConnect/uDosDev/docs/specs/v4/INTEGRATION_v4_usxd-operational-gui.md) — validated USXD → ThinUI; lab interchange remains **[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)**.

## Themes

- **Default (dark)** — original ThinUI styling (`styles.css`).
- **Classic Modern** — `classic-modern.css`; `html[data-thinui-theme="classic-modern"]`. Maps to family [**CLASSIC_MODERN_INSPIRATION_KIT_v1**](../../../uDosConnect/uDosDev/docs/specs/v4/CLASSIC_MODERN_INSPIRATION_KIT_v1.md) + Round D `--cm-*` foundation.
- **Switcher** — header control on main app and Teletext lab; choice stored in `localStorage` (`udos-thinui-theme`). Boot with `?theme=classic-modern` or `?theme=default`.

**Fonts:** `@font-face` loads Chicago / Geneva / Monaco from `/fonts/apple-fonts/…`. Symlink **`public/fonts`** → **`~/Code/fonts`** — see **[FONTS.md](FONTS.md)** (local-only; `public/fonts` is gitignored).
