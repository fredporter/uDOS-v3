# uDOS v3 — Grid and graphics canon

**Status:** locked for uDOS v3  
**Updated:** 2026-04-09  
**Spec index:** [DISPLAY_STACK.md](DISPLAY_STACK.md)  
**Pair spec:** [UniversalSurfaceXD v2 cannon](../../UniversalSurfaceXD/docs/decisions/UniversalSurfaceXD_v2-cannon.md) (portable surface declaration; filename uses **cannon**)

This document is the **implementation-facing** copy of the grid–graphics contract for the **uDOS-v3 monorepo** (Host, Hivemind, ThinUI, schemas). **UniversalSurfaceXD** carries the cross-repo, transportable surface schema narrative; both stay aligned.

---

## Canon (drop-in wording)

uDOS v3 defines interactive and document-linked surfaces through a shared **grid–graphics model**. The canonical surface grid is **80×30** (character grid). Each grid cell is rendered as a **16×24 px raster cell**.

The canonical 80×30 grid is a **character grid (rendering grid)**, not the spatial layout grid used by the Grid Engine.

CELL
  = raster unit (16×24 px)

GRID CELL
  = position in character grid

TILE
  = logical surface unit (may map to one or more grid cells)

The canonical graphics encoding for tile art is the **teletext 2×3 mosaic mask** model, with a required fallback ladder of **Teletext → ASCII block → Shades → ASCII**.

Spatial identity is expressed independently of rendering through **LocId** and **PlaceRef**. Surface composition is expressed through **UniversalSurfaceXD**, the portable surface declaration format shared across TUI, ThinUI, browser, Markdown, and SVG export targets. **Themes and adapters** map the same canonical surface into different render dialects without altering semantics.

**First-class surface kinds** (v3 / USXD v0.1 family): launcher, panel, table, list, board, timeline, feed, story, step-form, slide, map, workflow, recovery, handoff.

---

## Locked rules

1. **Canonical viewport** = **80×30** (columns × rows).
2. **Canonical mini viewport** = **40×15** (half-scale layouts where used).
3. **Canonical tile raster** = **16×24 px** per cell (not square).
4. **Canonical graphics encoding** = **teletext 2×3** mosaic masks (authoritative graphics bridge).
5. **Fallback ladder** = Teletext → ASCII block → Shades → ASCII (required for transport/recovery).
6. **UniversalSurfaceXD** = canonical **portable surface format** (not a renderer, not a theme, not business logic).
7. **Story**, **step-form**, and **slide** = **one content family**, three render modes (shared attributes; see USXD doc §10).
8. **Feed** = **first-class surface kind** (meaningful change streams; not raw logs).
9. **Themes** = **render dialects** (appearance + adapter hints), not alternate app architectures.

---

## Why 16×24 (not square)

- **Text-first surfaces** match retro terminal and monospace proportions better than a 16×16 fiction.
- **Teletext 2×3** divides the tile cleanly: **16 → 8 px** per column, **24 → 8 px** per row → **8×8 px** per teletext subcell inside one cell.
- Wide glyph rule:

  - width = 2 cells
  - height = 1 cell
  - raster = 32×24 px

  This ensures wide glyphs (e.g. emoji) remain visually coherent.

---

## Spatial / layout layer

| Concept | Definition |
| --- | --- |
| Viewport grid | **80 × 30** |
| Mini grid | **40 × 15** |
| Cell addressing | Columns **AA–DC**, rows **10–39** (locked spatial scheme) |
| **LocId** | `L{layer}-{cell}[-Z{z}]` |
| **PlaceRef** | `<ANCHOR>:<SPACE>:<LOCID>[:D<n>][:I<id>]` |

Layers remain canonical and transportable. Surface UIs use the same grid vocabulary as maps/panels where addressing matters.

---

## Graphics layer

| Concept | Definition |
| --- | --- |
| Tile raster | **16 × 24 px** per occupied grid cell |
| Default footprint | 1×1 cell |
| Wide footprint | **2×1** cells → **32×24 px** |
| Canonical encoding | Unicode **teletext 2×3** mosaics |
| Subcell raster | **8×8 px** per teletext subcell (2×3 inside 16×24) |

**Fallback ladder (required):** Teletext → ASCII block → Shades → ASCII.

---

## Rendering layer

- **Canonical snapshots** render against fixed **80×30**; deterministic output for tests and exports.
- **Adaptive** mode may respond to terminal width; **canonical exports** do not depend on probing runtime size.
- **Markdown:** diagrams use **fenced text blocks** where applicable; no semantic drift between renderers.
- **SVG / vector:** optional **export** lane; not the semantic source of truth for surface content.

---

## Story / form / presentation layer

- **Step-form** is the preferred pattern for guided flows: **one primary action per step**, **progress mandatory** on multi-step flows.
- **Story**, **step-form**, and **slide** share one family (narrative vs input vs presentation emphasis). Shared fields include steps/frames, title, lede, body, media, choices, input, progress, confirm, notes, transitions, adapter hints (see USXD).

---

## Feed / spool layer

- **Feeds** = meaningful **change streams** (distinct from execution **logs**).
- **Spools** = local buffering and transformation layer (non-canonical); not canonical memory by themselves.
- Feed-oriented UIs (browser, digest, spool manager) are **first-class** surface kinds, not log viewers dressed as feeds.

---

## UniversalSurfaceXD (role)

**UniversalSurfaceXD** is the portable declaration format for uDOS display surfaces. It describes identity, view kind, grid, regions, objects, graphics encoding, bindings, fallbacks, and **adapter hints** for TUI, ThinUI, browser, Markdown, and SVG.

Authoritative detail, YAML schema shape, examples, and validation rules:  
**[UniversalSurfaceXD_v2-cannon.md](../../UniversalSurfaceXD/docs/decisions/UniversalSurfaceXD_v2-cannon.md)**

Integrated bootstrap types + sample (legacy `cell` replaced by **tile width/height**):  
**[universal_surface_xd_bootstrap.md](../../UniversalSurfaceXD/docs/decisions/universal_surface_xd_bootstrap.md)**  
**[usxd_udos_integrated_template.md](../../UniversalSurfaceXD/docs/decisions/usxd_udos_integrated_template.md)**

---

## Region roles (composition)

Surfaces compose from a shared set of canonical region **roles**: header, nav, primary, secondary, status, footer, overlay, modal, canvas, legend, inspector, timeline, queue, controls. Kinds differ by which roles appear (feed vs step-form vs map vs workflow — see USXD §12).

---

## Theme mapping (dialects, not forks)

Theme families (examples: **thinui-c64**, **thinui-teletext**, **thinui-nes-sonic**, **material3-surface**) map the **same** UniversalSurfaceXD structure to different visual dialects. Tokens, density, and adapters change; **semantics and grid** do not.

---

## uDOS-v3 implementation notes

- **`packages/schemas`:** evolve JSON/TS contracts so feed/task/event surfaces can reference **surface id**, **kind**, and **grid metadata** without duplicating business state.
- **`apps/thinui`:** treat **80×30** and **16×24** as the default layout coordinate system for panel chrome and fixed views unless explicitly in adaptive mode.
- **Tests:** prefer **canonical** dimensions for screenshot/golden tests to avoid drift.

---

## See also

- [DISPLAY_STACK.md](DISPLAY_STACK.md) — display / grid / teletext doc router  
- [ARCHITECTURE.md](ARCHITECTURE.md) — system boundaries  
- [README.md](README.md) — doc index  
- [DATA-MODEL.md](DATA-MODEL.md) — disk and schema layout  
- [usxd_schema.md](usxd_schema.md) — USXD YAML schema (human spec)  
- `packages/schemas/usxd-surface.schema.json` — JSON Schema subset `usxd/0.1`  
