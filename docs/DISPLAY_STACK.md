# Display stack — confirmed specs (uDOS v3)

**Status:** cross-doc index  
**Confirmed:** 2026-04-09  
**Canon:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)

This file is the **router** for the display / layout / render documentation set. All documents below agree on the **three-layer scale model**:

| Layer | Meaning | Typical use |
| --- | --- | --- |
| **Spatial layout** | Abstract integer grid (tiles, maps); variable size; not pixels | Grid Engine, Spatial Map |
| **Character grid** | Columns × rows of **logical cells** for text/teletext | 80×30 **canonical** viewport |
| **Raster cell** | **16×24 px** per character cell; **2×3** teletext mosaic inside | Teletext Engine, ThinUI/CSS tokens |

**Rule:** Spatial **(x,y,w,h)** counts are **not** pixel dimensions. **16×24** is **only** the teletext/HTML raster for one character cell. Canonical **viewport** for interoperability is **80×30** ([GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)).

---

## Spec documents (read order)

1. [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md) — locked rules, LocId/PlaceRef, USXD role, feed/story family.
2. [usxd_schema.md](usxd_schema.md) — YAML-oriented USXD root, grid, render, teletext, spatial objects.
3. [view_engine.md](view_engine.md) — view kinds × render modes, engine binding, fallbacks.
4. [RENDER_PIPELINE.md](RENDER_PIPELINE.md) — USXD → View → Layout → Raster → output.
5. [grid_engine.md](grid_engine.md) — spatial layout, snap, collision, layers (resolution-independent).
6. [spatial_map_spec.md](spatial_map_spec.md) — named maps, regions, markers (abstract coordinates).
7. [teletext_engine.md](teletext_engine.md) — 16×24 cell, 2×3 mosaic, Acorn-style blocks.
8. [u_dos_v_3_style_guide.md](u_dos_v_3_style_guide.md) — colours, typography, naming, ASCII vs teletext posture.

---

## Machine-readable schema

- **JSON Schema (monorepo):** `packages/schemas/usxd-surface.schema.json` — validates a **minimal** `usxd/0.1` surface document (subset of [usxd_schema.md](usxd_schema.md)).
- **TypeScript constants:** `packages/shared/src/grid-canonical.ts` — canonical viewport, tile px, mosaic constants.

---

## Sibling repo

Portable surface declaration narrative and YAML examples: **UniversalSurfaceXD** — `docs/decisions/UniversalSurfaceXD_v2-cannon.md` (note filename **cannon**), `usxd_udos_integrated_template.md`.

---

## Pipeline (one line)

```text
USXD → View Engine → Grid Engine (spatial) / Spatial Map → Teletext or ASCII renderer → TUI | ThinUI | Markdown | SVG
```

See [RENDER_PIPELINE.md](RENDER_PIPELINE.md) and [view_engine.md](view_engine.md).
