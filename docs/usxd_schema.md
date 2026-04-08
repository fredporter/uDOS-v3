# USXD Schema — uDOS v3 (confirmed)

**Confirmed:** 2026-04-09 · **Index:** [DISPLAY_STACK.md](DISPLAY_STACK.md) · **Canon:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)  
**JSON Schema:** `packages/schemas/usxd-surface.schema.json` (`schemaVersion`: **`usxd/0.1`**)

---

# 0. Scale model (must not conflate)

```text
SPATIAL LAYOUT
  = tiles / maps / regions as integer (x,y,w,h)
  = abstract; not pixel-bound

CHARACTER GRID
  = cols × rows of logical cells for ASCII / teletext
  = uDOS canonical: 80 × 30 (mini: 40 × 15)

RASTER CELL (teletext)
  = 16 px × 24 px per character cell
  = 2 × 3 mosaic blocks inside (8×8 px per subcell)
```

USXD may carry **both** a character `grid` (for render) and **spatial** `objects` (for layout). They are related by **projection**, not identity.

---

# 1. Overview

**USXD** (Universal Surface XD) is the canonical **surface + layout + render binding** schema for uDOS v3 documents. Runtime business state (tasks, events) lives elsewhere; USXD describes **how** a surface is composed and rendered.

---

# 2. Root document (YAML frontmatter or JSON)

```yaml
schemaVersion: "usxd/0.1"
id: string                    # stable surface id
type: surface
title: string
kind: <surface kind>          # see §3
mode: canonical | adaptive    # canonical = fixed grid for export/tests

# Optional transport identity (when anchored)
place:
  place_ref: string | null    # e.g. EARTH:SUR:L305-DA11

created: timestamp | null
updated: timestamp | null
```

- **`schemaVersion`:** use **`usxd/0.1`** for new documents; validate with `usxd-surface.schema.json`.
- **`mode`:** **`canonical`** requires **`grid.cols` = 80** and **`grid.rows` = 30** and **`tile_px` = 16×24** unless a documented exception applies.

---

# 3. Surface kinds (first class)

Aligned with [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md):

```text
launcher
panel
table
list
board
timeline
feed
story
step-form      # input-first; one primary action per step when multi-step
slide
map
workflow
recovery
handoff
```

**Story / step-form / slide** share one **content family** (three render emphases); see canon and UniversalSurfaceXD cannon §10.

---

# 4. Character grid + tile raster

Used when `render.mode` is `ascii` or `teletext`, or when anchoring layout to the canonical viewport.

```yaml
grid:
  cols: int                   # canonical: 80
  rows: int                   # canonical: 30
  tile_px:
    w: int                    # canonical: 16
    h: int                    # canonical: 24
```

**Adaptive** surfaces may omit strict 80×30 but must declare explicit `cols`/`rows` for any raster output.

---

# 5. Spatial layout (Grid Engine objects)

Independent logical grid; often maps 1:1 to character grid for dashboards.

```yaml
layout:
  type: spatial
  snap: hard | soft | free

objects:
  - id: string
    type: note | task | panel | media | map_region | marker | form_block | story_card | slide_block | table | ...
    x: int
    y: int
    w: int
    h: int
    layer: int
    ref: string | null         # vault link or object id
```

---

# 6. Render binding

```yaml
render:
  mode: grid | ascii | teletext
```

| `mode` | Role |
| --- | --- |
| `grid` | Structured layout (Grid Engine / panel composition) |
| `ascii` | Symbolic monospace on character grid |
| `teletext` | Mosaic raster on character grid |

See [view_engine.md](view_engine.md) for view × render matrix.

---

# 7. Teletext block

Required when `render.mode: teletext`.

```yaml
teletext:
  cell_width: 16              # px
  cell_height: 24             # px
  mosaic:
    cols: 2
    rows: 3
    style: acorn
  fallback:
    - ascii-block
    - shades
    - ascii
```

Canonical **fallback ladder** (full text): Teletext → ASCII block → Shades → ASCII ([GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)).

---

# 8. ASCII block

Required when `render.mode: ascii`.

```yaml
ascii:
  mono: true
```

---

# 9. Location (map view)

```yaml
location:
  map: string
  x: int
  y: int
  layer: int
```

Use with `kind: map` or map-bound objects. Prefer **PlaceRef** / **LocId** in canon strings when crossing systems ([GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)).

---

# 10. Regions (USXD composition)

Optional named rectangles on the **character grid** (0-based), roles from canon:

```yaml
regions:
  - id: header
    x: 0
    y: 0
    w: 80
    h: 3
    role: header | nav | primary | secondary | status | footer | overlay | modal | canvas | legend | inspector | timeline | queue | controls
```

---

# 11. Layers metadata

```yaml
layers:
  - id: int
    name: string
    visible: bool
```

---

# 12. Table schema

```yaml
table:
  columns:
    - name: string
      type: string
  rows:
    - [value1, value2]
```

---

# 13. Column layout

```yaml
columns:
  count: int
  widths: [int]
```

---

# 14. Time binding

```yaml
time:
  due: timestamp | null
  start: timestamp | null
  end: timestamp | null
  event: string | null
```

---

# 15. Validation rules

- **`schemaVersion`** required; **`usxd/0.1`** for new files.
- **`kind`** must be one of §3.
- **`grid`** + **`tile_px`** required when `mode: canonical` or when `render.mode` ∈ `{ ascii, teletext }`.
- **`teletext`** block required when `render.mode: teletext`.
- **`ascii`** block required when `render.mode: ascii`.
- Spatial **`objects`** require integer `x, y, w, h, layer`.
- **`place_ref`** format should match PlaceRef grammar when present.

---

# 16. Minimal canonical example

```yaml
schemaVersion: "usxd/0.1"
id: dashboard_main
type: surface
title: Main
kind: panel
mode: canonical
render:
  mode: teletext
grid:
  cols: 80
  rows: 30
  tile_px: { w: 16, h: 24 }
teletext:
  cell_width: 16
  cell_height: 24
  mosaic: { cols: 2, rows: 3, style: acorn }
  fallback: [ascii-block, shades, ascii]
```

---

**End of USXD Schema (confirmed)**
