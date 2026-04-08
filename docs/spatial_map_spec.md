# SPATIAL MAP Spec — uDOS v3

**Confirmed:** 2026-04-09 · **Index:** [DISPLAY_STACK.md](DISPLAY_STACK.md) · **Canon:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md) (LocId / PlaceRef)

---

# 0. Scale Clarification (Critical)

Spatial Maps operate in the **abstract spatial layout domain**.

They must not be confused with:

- Character Grids (e.g. 80×30 cells)
- Teletext Cells (16 px × 24 px raster units)

Definitions:

SPATIAL MAP
  = abstract coordinate system
  = variable size
  = used for geography, systems, and space

GRID ENGINE
  = layout system for tiles/regions
  = resolution-independent

CHARACTER GRID
  = rendering layer (ASCII / teletext)
  = not used for spatial logic

CELL
  = 16 px × 24 px
  = teletext raster unit only

Rules:

- Spatial Maps MUST NOT assume **pixel** dimensions (e.g. 16×24 px).
- Spatial Maps MUST NOT use character grid size as the authority for map math.

**Stable identity (transport):** When a map location is referenced in vaults, feeds, or USXD, prefer **LocId** / **PlaceRef** from the canon (`L{layer}-{cell}`, `<ANCHOR>:<SPACE>:<LOCID>…`) so rendering can target **80×30** or spatial `(x,y)` consistently. See [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md).

---

# 1. Overview

The Spatial Map System defines how uDOS represents **real-world, abstract, and cosmic coordinate spaces**.

It operates on top of the Grid Engine and enables:

- geographic mapping (Earth)
- abstract maps (projects, systems)
- orbital / space maps
- multi-layer spatial data

---

# 2. Core Concept

A **Map** is a named coordinate space.

```yaml
map:
  id: string
  type: enum
  cols: int   # optional, variable
  rows: int   # optional, variable
```

Map Types:

```text
earth
space
system
abstract
```

---

# 3. Map vs Grid Clarification

Spatial Maps are independent from both layout grids and rendering grids.

There are three distinct systems:

1. SPATIAL MAP
   → abstract coordinate space
   → used for regions, markers, relationships

2. GRID ENGINE
   → layout system (tiles, panels)
   → may overlay map but is separate

3. CHARACTER GRID
   → rendering layer (ASCII / teletext)
   → not used for spatial calculations

These systems must not be conflated.

---

# 4. Coordinate Model

Coordinates are discrete:

```yaml
location:
  map: earth
  x: 8
  y: 4
  layer: 2
```

Rules:

- origin = top-left
- x increases → right
- y increases → down

---

# 5. Regions

Regions define bounded areas.

```yaml
region:
  id: qld
  x: 7
  y: 3
  w: 2
  h: 2
```

Use cases:

- states
- zones
- departments
- clusters

---

# 6. Markers

Markers are point-based objects.

```yaml
marker:
  id: brisbane
  x: 8
  y: 4
  layer: 2
  ref: contact_001
```

---

# 7. Earth Map Example

```text
+----------------+
|                |
|      QLD       |
|       X        |
|                |
|   WA           |
|                |
+----------------+
```

```yaml
marker:
  id: brisbane
  map: earth
  x: 8
  y: 4
```

---

# 8. Space Map Example

```text
        [SAT-01]
            |
            v
+----------------+
|     EARTH      |
|       O        |
+----------------+
      /     \
     /       \
 [MOON]   [STATION]
```

---

# 9. Layering Model

```text
Layer 0 → Base Grid
Layer 1 → Map Surface
Layer 2 → Regions
Layer 3 → Markers
Layer 4 → UI
```

---

# 10. Multi-Map Linking

Maps can link to other maps.

```yaml
link:
  from: earth
  to: space
  type: zoom_out
```

---

# 11. Zoom Levels

Maps may support zoom abstraction.

```yaml
zoom:
  level: 1
  parent: world
```

Example:

- world → continent → country → city

---

# 12. Spatial Relationships

Relationships between objects:

```yaml
relation:
  type: near
  a: brisbane
  b: sydney
```

Types:

```text
near
inside
connected
orbiting
```

---

# 13. Orbit Model (Space)

```yaml
orbit:
  center: earth
  object: satellite_01
  radius: 3
```

---

# 14. Path / Route

```yaml
path:
  from: brisbane
  to: tokyo
  type: flight
```

---

# 15. USXD Binding

```yaml
map:
  id: earth
  cols: variable
  rows: variable

objects:
  - type: marker
    id: brisbane
    x: 8
    y: 4
```

---

# 16. Constraints

- coordinates must be integers
- objects must remain within bounds
- regions must not overlap unless layered

---

# 17. Summary

The Spatial Map System defines:

- coordinate spaces (earth, space, abstract)
- regions and markers
- layering of spatial data
- relationships and movement

---

**End of Spatial Map Spec**

