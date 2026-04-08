# uDOS v3 — Style Guide (Corrected)

**Confirmed:** 2026-04-09 · **Index:** [DISPLAY_STACK.md](DISPLAY_STACK.md) · **Canon:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)

---

# 0. Core Scale Model (Critical)

uDOS separates **three distinct layers of scale**:

```text
CELL (raster)
  = 16 px × 24 px
  = contains 2 × 3 mosaic blocks (teletext)

GRID (character grid)
  = variable size (e.g. 40×25, 80×30, 120×40)
  = measured in cells (columns × rows)

SPATIAL GRID (layout)
  = abstract layout system (tiles, maps)
  = NOT tied to pixel size
```

Rules:

- 16×24 refers ONLY to cell pixel size
- grids are NOT fixed to 16×24
- spatial layout ≠ character grid ≠ raster cells


Canonical distinction:

ASCII
  = symbolic layout (characters as symbols)

TELETEXT
  = raster layout (characters as pixel blocks)

---

# 1. Philosophy

- Everything is a file
- Everything is spatial
- Everything is composable
- Everything is time-aware
- Everything is renderable (text → grid → UI)

---

# 1.1 Naming Conventions

IDs:
  snake_case

Types:
  lowercase enums

Maps:
  earth, space, system, abstract

Files:
  kebab-case.md

---

# 2. Colour System

```
Primary        #0A0F1C
Surface        #121826
Elevated       #1B2436
Border         #2A3550

Blue           #4DA3FF
Purple         #8B5CF6
Teal           #2DD4BF
Orange         #FB923C
Red            #EF4444
Green          #22C55E

Text Primary   #E6EDF3
Text Secondary #9AA6B2
Text Muted     #6B7280
```

---

# 3. Typography

```
H1 32px
H2 24px
H3 18px
Body 14px
Mono 13px
```

Rules:

- Markdown = source of truth
- Monospace required for ASCII + teletext

---

# 4. Grid Concepts

## 4.1 Character Grid

```text
Example: 80 × 30
= 80 columns × 30 rows
= each cell = 16×24 px
```

## 4.2 Spatial Grid

Used for layout, tiles, and maps.

- variable size
- unit = logical tile
- not pixel-bound

## 4.3 Surface size examples

**Canonical (uDOS v3 interchange):**

```text
80 × 30 cells × 16×24 px → 1280 × 720 px
40 × 15 cells (mini)     → 640 × 360 px
```

**Other** character grids (40×25, 120×40, …) are valid for **adaptive** or legacy surfaces; they are not the default canon.

---

# 5. USXD (Universal Surface XD)

## Definition

USXD defines surfaces independent of render scale.

```yaml
---
id: surface_main
format: usxd
version: 3
view: tile
layer: 1
---
```

## Views

- tile
- list
- map
- form
- ascii
- teletext
- table
- slide
- story
- task

## Canonical Linking

```text
udos://vault/binder/file#block
[[file]]
[[file#block]]
```

---

# 6. ASCII System

ASCII = logical text layout on a grid

Example:

```ascii
+----------------+
| STATUS         |
+----------------+
| Tasks: 14      |
+----------------+
```

---

# 7. Teletext System (Correct Model)

## 7.1 Cell

```text
16 px × 24 px
```

## 7.2 Mosaic

```text
2 columns × 3 rows

++
++
++
```

## 7.3 Grid

Teletext renders on a **character grid**:

```text
Example: 80 × 30 cells
```

## 7.4 Composition

- UI built from repeated mosaic cells
- signage uses horizontal banding
- not ASCII box drawing

## 7.5 Mosaic Examples

Single cell (full):

```text
+
+
+
```

Left column:

```text
..
..
..
```

Top band:

```text
+
..
..
```

Composite band (signage):

```text
+++ ++++ ++++
+++ ++++ ++++
```

---

# 8. Tables & Columns

Markdown:

| Field | Type |
|------|------|
| id   | str  |

Grid:

```text
+------+------+
| id   | str  |
+------+------+
```

---

# 8.1 Layer Model

```text
Layer 0 → Base
Layer 1 → Content
Layer 2 → Overlay
Layer 3 → UI
```

---

# 9. Format Modes

Story:

```md
---
view: form
---
```

Slide:

```md
---
view: slide
---
```

Marp:

```md
---
marp: true
---
```

Task:

```md
- [ ] Task
```

---

# 9.1 Interaction Model

Core actions:

- drag → move
- snap → align to grid
- zoom → scale map/surface
- select → focus entity

---

# 10. Spatial Layout

Spatial systems operate independently of character grids.

```text
Map / Tiles / Layers
```

Example:

```yaml
location:
  map: earth
  x: 8
  y: 4
  layer: 2
```

---

# 11. OK Assist

Use ONLY:

- OK Assist

Never use:

- AI Assist

Command format:

```text
> OK ASSIST: VERB TARGET PARAMS
```

Example:

```text
> OK ASSIST: CREATE TASK
> OK ASSIST: MOVE TILE 2,3 → 4,5
```

---

# 12. System Summary

```text
Cell   = 16×24 px
Grid   = variable (e.g. 80×30)
Layout = spatial (tiles/maps)
```

---

**End of Corrected Style Guide**

