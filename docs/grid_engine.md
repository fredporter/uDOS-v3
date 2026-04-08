# GRID Engine — uDOS v3

**Confirmed:** 2026-04-09 · **Index:** [DISPLAY_STACK.md](DISPLAY_STACK.md) · **Canon:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)

---

# 0. Scale Clarification (Critical)

uDOS Grid Engine operates in the **spatial layout domain only**.

It must not be confused with:

- Character Grid (e.g. 80×30 cells)
- Teletext Cell (16 px × 24 px raster unit)

Definitions:

SPATIAL GRID
  = abstract layout space
  = variable size
  = used for tiles, maps, regions
  = NOT tied to pixels or character cells

CHARACTER GRID
  = array of cells (e.g. 80×30)
  = used for ASCII / teletext rendering

CELL
  = 16 px × 24 px
  = used only in teletext rendering

Rule:

- Grid Engine MUST NOT treat **16×24** as layout units — those are **raster pixels** per character cell (teletext), not spatial tile sizes.
- Grid Engine MUST remain **resolution-independent** at the spatial layer.

**Intersection with uDOS canon:** For many surfaces, the spatial grid **maps 1:1** onto the **canonical character viewport 80×30** (logical columns × rows). The Grid Engine still reasons in **integer tiles**; the **Teletext Engine** maps that viewport to **16×24 px** per cell. Maps and custom dashboards may use **different** spatial `cols`/`rows` and still export to 80×30 in **canonical** mode via projection.

---

# 1. Overview

The uDOS Grid Engine defines how spatial content is placed, snapped, layered, and resolved on a uDOS surface.

It is the primary layout engine for:

- tile view
- map view
- panel layouts
- dashboard surfaces
- USXD spatial rendering

The Grid Engine is distinct from the teletext character engine.

- **Grid Engine** = macro spatial layout
- **Teletext Engine** = raster character-cell rendering

---

# 2. Core Model

uDOS uses a **variable spatial surface**.

Example (not fixed):

```text
16 × 24 (example layout)
32 × 18
24 × 24
```

Coordinate model:

```text
x: 0 → width-1
y: 0 → height-1
```

Every spatial object occupies a rectangle:

```text
{x, y, w, h, layer}
```

---

# 3. Spatial Units

## 3.1 Tile Unit

A tile is the smallest standard layout unit in the Grid Engine.

```yaml
tile:
  x: int
  y: int
  w: int
  h: int
  layer: int
```

Rules:

- `x`, `y` are integer origins
- `w`, `h` are integer spans
- all tiles snap to the grid unless explicitly free-positioned

## 3.2 Bounds

Valid ranges (dependent on grid size):

```text
0 <= x <= grid_width - 1
0 <= y <= grid_height - 1
1 <= w <= grid_width
1 <= h <= grid_height
```

Constraint:

```text
x + w <= grid_width
y + h <= grid_height
```

---

# 4. Snap Model

Default behaviour is **hard snap**.

Snap modes:

```text
hard   = object must align to full grid cell
soft   = proposed move rounds to nearest cell
free   = no snap, advanced mode only
```

Recommended default:

```yaml
grid:
  cols: variable
  rows: variable
  snap: hard
```

---

# 5. Placement Rules

## 5.1 Standard Placement

Objects are placed from top-left origin.

Example:

```yaml
panel:
  x: 0
  y: 0
  w: 8
  h: 6
  layer: 1
```

## 5.2 Expansion

Objects may expand:

- horizontally
- vertically
- symmetrically

## 5.3 Overflow

Overflow is not allowed by default.

If overflow is attempted:

1. reject move, or
2. clamp to nearest valid bounds

---

# 6. Collision Model

## 6.1 Same-Layer Collision

Two objects on the same layer must not overlap.

Collision test:

```text
A intersects B if:
A.x < B.x + B.w
A.x + A.w > B.x
A.y < B.y + B.h
A.y + A.h > B.y
```

## 6.2 Layered Overlap

Overlap is permitted only when layers differ.

Example:

```text
Layer 1 = map surface
Layer 2 = data marker
Layer 3 = UI overlay
```

## 6.3 Resolution Strategies

Resolution order:

1. reject
2. nudge
3. reflow
4. layer shift

---

# 7. Layer System

Standard layer stack:

```text
0 = Base grid
1 = Surface
2 = Content
3 = Overlay
4 = UI
```

Layer rules:

- higher layer renders above lower
- opacity belongs to renderer, not layout
- same-layer overlap is invalid unless object type explicitly allows grouping

---

# 8. Object Types

Common spatial object types:

```text
note
task
panel
media
map_region
marker
table
form_block
story_card
slide_block
```

Suggested minimum schema:

```yaml
object:
  id: string
  type: string
  x: int
  y: int
  w: int
  h: int
  layer: int
  ref: string
```

---

# 9. Reflow Logic

Reflow is used when content changes size or when new tiles are inserted.

Reflow modes:

```text
none      = fixed layout
stack     = push downward
flow      = nearest available space
columnar  = preserve columns
```

Example stack logic:

```text
Tile A expands downward
→ Tile B below is pushed down
→ Tile C below B is pushed down
```

---

# 10. Column Logic

Columns are grid-constrained layout regions.

Examples:

```text
2-column = 8 / 8
3-column = 5 / 6 / 5
4-column = 4 / 4 / 4 / 4
```

Example:

```yaml
columns:
  - x: 0
    w: 8
  - x: 8
    w: 8
```

Rules:

- columns must fill the surface width unless intentionally partial
- gutter space must be explicit

---

# 11. Regions and Maps

A map is a named spatial plane.

Example:

```yaml
map:
  id: earth
  cols: variable
  rows: variable
```

Regions are bounded areas inside a map.

```yaml
region:
  id: qld
  x: 7
  y: 3
  w: 2
  h: 2
```

---

# 12. Spatial Geometry Examples

## 12.1 Earth Layer Example

```text
+----------------+
|                |
|       QLD      |
|        X       |
|                |
|   WA           |
|                |
+----------------+
```

Coordinate example:

```yaml
location:
  map: earth
  x: 8
  y: 4
  layer: 2
```

## 12.2 Space Layer Example

```text
+----------------+
|     Orbit      |
|   [SAT-01]     |
|        *       |
|      EARTH     |
|       O        |
|    [STATION]   |
+----------------+
```

---

# 13. Selection Model

Selection types:

```text
single
multi
region
layer
```

Actions:

- move
- resize
- group
- link
- assign layer

---

# 14. Resize Rules

Resize handles act on:

- width
- height
- both axes

Constraints:

- minimum size = 1×1
- object must stay in bounds
- collision must be rechecked after resize

---

# 15. Movement Rules

Movement may occur by:

- drag
- keyboard nudge
- command placement

Keyboard nudge:

```text
left  = x - 1
right = x + 1
up    = y - 1
down  = y + 1
```

---

# 16. Grouping

Groups are compound spatial objects.

```yaml
group:
  id: string
  objects:
    - obj_1
    - obj_2
```

Rules:

- group bounding box is derived from members
- moving a group moves all children

---

# 17. View-Specific Behaviour

## Tile View

- strict snap
- panel-based layout

## Map View

- supports named regions and markers
- coordinates are primary

## Story View

- card flow on grid
- may use vertical stack reflow

## Slide View

- fixed composition per surface
- overflow should be rejected

---

# 18. USXD Binding

Suggested schema:

```yaml
grid:
  cols: variable
  rows: variable
  snap: hard

objects:
  - id: hero_panel
    type: panel
    x: 0
    y: 0
    w: 8
    h: 6
    layer: 1
```

---

# 19. Validation Rules

- all objects must have bounds
- all bounds must fit inside grid
- same-layer collisions are invalid
- layer values must be integers
- view-specific constraints must be respected

---

# 20. Summary

The uDOS Grid Engine defines:

- variable spatial layout (not fixed to 16×24)
- tile snapping and bounds
- collision and overlap rules
- layer ordering
- map and region placement
- movement, resize, and grouping logic

---

**End of Grid Engine Spec**

