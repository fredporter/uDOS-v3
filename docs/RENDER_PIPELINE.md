# RENDER Pipeline — uDOS v3

**Confirmed:** 2026-04-09 · **Index:** [DISPLAY_STACK.md](DISPLAY_STACK.md) · **Canon:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)

---

# 0. Purpose

The Render Pipeline defines how a **USXD surface** is transformed into a concrete output.

It connects:

- USXD (structure)
- View Engine (projection)
- Grid Engine (layout)
- Teletext Engine (raster)

---

# 1. Core Model

```text
USXD → View Engine → Layout Engine → Render Engine → Output
```

Stages:

1. Parse
2. Resolve View
3. Resolve Layout
4. Render
5. Output

---

# 2. Stage 1 — Parse

Input:

```yaml
USXD document
```

Actions:

- validate schema
- resolve defaults
- normalise data

Output:

```text
Normalized Surface Object
```

---

# 3. Stage 2 — View Resolution

Input:

- `view`
- `render.mode`

Output:

```text
Resolved View Model
```

Example:

```text
tile + grid      → spatial layout
list + ascii     → linear text view
slide + teletext → raster signage
```

---

# 4. Stage 3 — Layout Resolution

Engine: Grid Engine / Map System

Actions:

- place objects
- resolve layers
- apply transforms (list, story, table)

Output:

```text
Layout Tree
```

---

# 5. Stage 4 — Render

Branch by render mode:

## Grid

- panel layout
- spatial composition

## ASCII

- symbolic characters
- fixed-width alignment

## Teletext

- character grid (e.g. 80×30)
- each cell = 16×24 px
- each cell = 2×3 mosaic blocks

---

# 6. Teletext Rendering

## 6.1 Cell Model

```text
Cell = 16×24 px
Mosaic = 2×3 blocks
```

## 6.2 Raster Flow

```text
Layout → Cell Grid → Mosaic Fill → Pixel Output
```

## 6.3 Fallback Ladder

```text
Teletext → ASCII Block → Shades → ASCII
```

---

# 7. ASCII Rendering

Rules:

- monospace
- alignment preserved
- symbols represent structure

---

# 8. Output Types

```text
TUI
Web
Markdown
SVG
Canvas
```

---

# 9. Constraints

- source must remain unchanged
- layout must be deterministic
- render must respect cell boundaries

---

# 10. Minimal Example

```yaml
view: slide
render:
  mode: teletext
grid:
  cols: 80
  rows: 30
```

---

# 11. Summary

```text
USXD → View → Layout → Render → Output
```

---

**End of Render Pipeline Spec**