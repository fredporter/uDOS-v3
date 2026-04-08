# VIEW Engine — uDOS v3

**Confirmed:** 2026-04-09 · **Index:** [DISPLAY_STACK.md](DISPLAY_STACK.md) · **Canon:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md)

---

# 0. Purpose

The View Engine defines how a single **USXD** surface is resolved into one or more concrete views.

It controls how the same source document can be presented as:

- tile view
- list view
- map view
- story view
- slide view
- task view
- table view
- ASCII render
- teletext render

The View Engine does not replace the Grid Engine, Teletext Engine, or Spatial Map System.
It orchestrates them.

---

# 1. Core Principle

A USXD file is the **source of truth**.

Views are derived projections of that source.

```text
USXD source
  -> view selection
  -> render binding
  -> engine resolution
  -> output surface
```

This means:

- content stays canonical
- presentation can change
- one file may support multiple views

---

# 2. Architectural Separation

The View Engine coordinates three distinct layers:

```text
VIEW
  = presentation model
  = tile / list / map / story / slide / task / table

RENDER MODE
  = rendering pipeline
  = grid / ascii / teletext

ENGINE
  = execution system
  = Grid Engine / Teletext Engine / Spatial Map System
```

Rule:

- `view` decides how content is organised
- `render.mode` decides how it is drawn
- the bound engine performs layout/render resolution

---

# 3. Input Model

Minimum USXD input:

```yaml
id: dashboard_main
type: surface
format: usxd
version: 3
view: tile
render:
  mode: teletext
grid:
  cols: 80
  rows: 30
```

Optional inputs:

- `layout`
- `objects`
- `layers`
- `location`
- `table`
- `time`
- `teletext`
- `ascii`

---

# 4. Resolution Pipeline

The View Engine resolves in this order:

## 4.1 Parse

- read USXD frontmatter
- validate root fields
- validate conditional fields

## 4.2 Select View

- determine `view`
- determine `render.mode`
- resolve default fallbacks if omitted

## 4.3 Bind Engine

```text
tile   -> Grid Engine
list   -> Grid Engine or linear renderer
map    -> Spatial Map System
story  -> Grid Engine or linear sequence renderer
slide  -> Grid Engine with fixed frame rules
task   -> task renderer / list renderer
table  -> table renderer

ascii      -> ASCII renderer
teletext   -> Teletext Engine
grid       -> Grid Engine
```

## 4.4 Resolve Layout

- compute regions
- place objects
- apply layer ordering
- apply view-specific transformation rules

## 4.5 Render Output

- output visual surface
- output text surface
- output teletext cell grid
- output map surface

---

# 5. View Types

## 5.1 Tile View

Tile view is the default spatial composition mode.

Characteristics:

- object-based layout
- layer-aware
- grid-snapped by default
- suitable for dashboards and spatial note systems

Typical binding:

```yaml
view: tile
render:
  mode: grid
```

## 5.2 List View

List view linearises content into a vertical flow.

Characteristics:

- reading-first
- order over position
- spatial coordinates may be ignored or transformed into sequence order

Typical binding:

```yaml
view: list
render:
  mode: grid
```

## 5.3 Map View

Map view renders content inside an abstract or named coordinate system.

Characteristics:

- uses `location`, `map_id`, `region`, `marker`
- prioritises coordinate relationships
- may overlay grid or marker systems

Typical binding:

```yaml
view: map
render:
  mode: grid
```

## 5.4 Story View

Story view resolves content into a narrative progression.

Characteristics:

- step-based
- sequential
- may use cards or panels
- suitable for walkthroughs, forms, and guided flows

Typical binding:

```yaml
view: story
render:
  mode: grid
```

## 5.5 Slide View

Slide view resolves the surface as a frame-by-frame presentation.

Characteristics:

- fixed composition per frame
- overflow rejected or clipped
- suitable for decks and Marp-like output

Typical binding:

```yaml
view: slide
render:
  mode: grid
```

## 5.6 Task View

Task view prioritises operational items.

Characteristics:

- status-oriented
- due dates and priorities surfaced
- spatial position optional

Typical binding:

```yaml
view: task
render:
  mode: grid
```

## 5.7 Table View

Table view presents structured row/column data.

Characteristics:

- schema-first
- good for records, indexes, logs
- may render as markdown table, fixed grid table, or teletext data grid

Typical binding:

```yaml
view: table
render:
  mode: grid
```

---

# 6. Render Modes

## 6.1 Grid Mode

Grid mode uses the Grid Engine or equivalent structured layout renderer.

Use when:

- spatial layout matters
- panels/cards/tiles are primary
- slide or story surfaces need positioned blocks

## 6.2 ASCII Mode

ASCII mode renders symbolic text layout on a character grid.

Use when:

- portability matters
- terminal-native output is needed
- visual structure can be conveyed with characters as symbols

Rule:

```text
ASCII = symbolic layout
```

## 6.3 Teletext Mode

Teletext mode renders onto a variable character grid made of fixed 16 px × 24 px cells.

Use when:

- high-density signage is needed
- mosaic block rendering is desired
- newsroom or display-band output is preferred

Rule:

```text
TELETEXT = raster layout using 2×3 mosaic cells
```

---

# 7. View × Render Compatibility

Recommended compatibility matrix:

```text
view   \ render   | grid | ascii | teletext
-------------------------------------------
tile / panel      |  yes |  opt  |   opt
list              |  yes |  yes  |   opt
board             |  yes |  opt  |   opt
map               |  yes |  opt  |   no
feed              |  yes |  yes  |   opt
workflow          |  yes |  opt  |   opt
story / step-form |  yes |  yes  |   opt
slide             |  yes |  opt  |   yes
task              |  yes |  yes  |   opt
table             |  yes |  yes  |   yes
launcher          |  yes |  opt  |   opt
timeline          |  yes |  yes  |   opt
recovery / handoff|  yes |  yes  |   opt
```

Interpretation:

- `yes` = primary supported path
- `opt` = secondary or simplified path
- `no` = generally unsuitable

---

# 8. Transform Rules

The View Engine may transform the same source data differently depending on selected view.

## 8.1 Spatial to List

```text
objects with x/y coordinates
  -> sorted into linear order
  -> rendered top-to-bottom
```

## 8.2 Spatial to Story

```text
objects / blocks
  -> grouped into steps
  -> rendered as narrative sequence
```

## 8.3 Task Projection

```text
task objects
  -> ordered by status / due / priority
```

## 8.4 Table Projection

```text
object set
  -> projected into rows and columns
```

---

# 9. Fallback Rules

If `view` is missing:

```text
default -> tile
```

If `render.mode` is missing:

```text
default -> grid
```

If a requested combination is unsupported:

1. choose nearest supported render mode
2. emit warning
3. preserve source data unchanged

---

# 10. Layer Resolution

Layer rules are preserved across views where meaningful.

```text
Layer 0 -> Base
Layer 1 -> Content
Layer 2 -> Overlay
Layer 3 -> UI
```

In linear views:

- layer may influence emphasis rather than z-order

In slide/map/tile views:

- layer preserves draw order

---

# 11. Canonical Output Principle

The View Engine must never mutate canonical content merely to satisfy a view.

Allowed:

- reorder for presentation
- group for clarity
- clip visually
- project structure into rows or sequences

Not allowed:

- rewrite source meaning
- drop required data silently
- collapse distinct objects without trace

---

# 12. Teletext Projection Rules

When rendering teletext:

- character grid size must be explicit
- cell size remains fixed at 16 px × 24 px
- teletext block geometry remains 2 × 3
- signage bands should be built from repeated mosaic cells
- ASCII brackets/boxes should not be substituted for mosaic panels

---

# 13. ASCII Projection Rules

When rendering ASCII:

- use symbolic characters only
- preserve alignment on the character grid
- box drawing is acceptable
- content should remain readable in plain text editors

---

# 14. Map Projection Rules

When rendering map view:

- `map_id` must resolve to a spatial map
- `location` fields take precedence over list order
- markers and regions are positioned by coordinates
- rendering grid, if any, is supportive not authoritative

---

# 15. Slide Projection Rules

When rendering slide view:

- each frame is fixed
- overflow should be rejected, clipped, or pushed to next frame
- story order may become slide order
- teletext slide output is permitted for signage/deck hybrids

---

# 16. Task Projection Rules

When rendering task view:

Sort priority:

1. status
2. due date
3. priority
4. manual order

Presentation may include:

- grouped states
- queue display
- compact ASCII list
- teletext operations board

---

# 17. Minimal Examples

## 17.1 Tile + Grid

```yaml
view: tile
render:
  mode: grid
```

## 17.2 Table + ASCII

```yaml
view: table
render:
  mode: ascii
grid:
  cols: 80
  rows: 30
```

## 17.3 Slide + Teletext

```yaml
view: slide
render:
  mode: teletext
grid:
  cols: 80
  rows: 30
teletext:
  cell_width: 16
  cell_height: 24
  mosaic:
    cols: 2
    rows: 3
    style: acorn
```

---

# 18. Validation Rules

- `view` must be one of the supported view types
- `render.mode` must be one of the supported render modes
- `grid` required for ASCII and teletext output
- `teletext` required when `render.mode = teletext`
- incompatible view/render combinations must warn or fallback
- source content must remain canonical

---

# 19. Summary

The View Engine is the orchestration layer that turns one USXD source into multiple valid projections.

```text
USXD -> View Engine -> Bound Engine -> Output
```

It defines:

- view selection
- render mode selection
- engine binding
- projection rules
- fallback and validation behaviour

---

**End of View Engine Spec**

