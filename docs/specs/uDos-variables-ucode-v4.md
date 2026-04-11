# uDos Variables v4 — Inkdown formula heritage & uCode bridge

**Status:** Draft — roadmapped dev spec (**uDosGo** integration monorepo)  
**Base:** Inkdown-style `$...$` inline formula syntax (preserved from editor heritage; see **uMacDown** / Inkdown product context in family docs)  
**Extension:** `$variable$`, `{$variable$}`, nested fields, optional filters — **without** deprecating math formulas  
**Goal:** Lightweight substitution across markdown surfaces, **uCode v4** session keys, and spatial/gameplay context — precursor to full uCode evaluator in [`uDosConnect/uDosDev/docs/future/uDos-v4-gameplay-chatdown-development-cycle-brief.md`](../../../uDosConnect/uDosDev/docs/future/uDos-v4-gameplay-chatdown-development-cycle-brief.md) (family future brief)

**Related family specs:** [Round A — core architecture v4](../../../uDosConnect/uDosDev/docs/specs/v4/ROUND_A_CORE_ARCHITECTURE_v4.md) · **[UCODE v4](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4.md)** (full language + commands) · [GFM Enhanced](../../../uDosConnect/uDosDev/docs/specs/v4/GFM_Enhanced_Specification_v4.md) · [CONTACT_SCHEMA_v4](../../../uDosConnect/uDosDev/docs/specs/v4/CONTACT_SCHEMA_v4.md) · [Unified data WP / HubSpot / uDos v1](../../../uDosConnect/uDosDev/docs/specs/v4/UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md) · [uDos-Grid](../../../uDosConnect/uDosDev/docs/specs/v4/uDos-Grid-Spec-v4-2-1.md) · [Spatial + storage ecosystem v1](../../../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_STORAGE_ECOSYSTEM_v1.md) · [uSpace / cloud fallback v1](../../../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md) · [UniversalVectorIL (UVIL) v1](../../../uDosConnect/uDosDev/docs/specs/v4/UNIVERSAL_VECTOR_IL_UVIL_v1.md) · [TASK_SPEC_v4](../../../uDosConnect/uDosDev/docs/specs/v4/TASK_SPEC_v4.md)

---

## 1. Original Inkdown formula syntax (unchanged behaviour)

| Setting | Behaviour |
| --- | --- |
| Use `$` for inline formulas | Toggle / preference in **uMacDown** (Inkdown) settings |
| `$content$` with closing `$` | Inline math / LaTeX-style formula rendering |

**Original purpose:** Math formulas (e.g. `$E = mc^2$`).

**What we keep:** A lexer that already tokenises `$...$` pairs — extended, not replaced.

---

## 2. Variable interpolation (new behaviour)

Preserve math where the inner span is clearly **not** a simple identifier (see §6).

### 2.1 Syntax options

| Syntax | Purpose | Example |
| --- | --- | --- |
| `$variable$` | Simple inline reference | `Hello $USER-NAME$` |
| `{$variable$}` | Same, with optional wrapping for tooling | `{$DATE$}` |
| `$variable.field$` | Nested field | `$contact.email$` |
| `$variable\|filter$` | Pipe filters (template-style) | `$date\|format:YYYY-MM-DD$` |

**v4.0 recommendation (minimal):** ship `$NAME$` and `$a.b$` before filters.

### 2.2 Distinguish math vs variable (heuristic)

| Pattern | Behaviour |
| --- | --- |
| Token looks like **identifier path** (alphanumeric, `-`, `_`, `.`; no spaces) | **Variable** |
| Contains `=`, operators, LaTeX (`\`), or clear math | **Formula** |
| Ambiguous | Resolver may treat as **literal** or **variable** per product setting — document the choice in ThinUI / uMacDown |

---

## 3. uDos variable namespaces (predefined sets)

Names are **normative for documentation**; runtime registry in **uDosGo** may subset by surface.

### 3.1 Core

| Variable | Source | Example |
| --- | --- | --- |
| `$USER-ROLE$` | Session / host | `WIZARD` |
| `$USER-LEVEL$` | Session | `100` |
| `$SESSION-ID$` | Session | `a1b2c3d4` |
| `$TIMESTAMP$` | Clock | `2026-04-11T10:00:00Z` |
| `$DATE$` | Clock (date part) | `2026-04-11` |

### 3.2 Contact ([CONTACT_SCHEMA_v4](../../../uDosConnect/uDosDev/docs/specs/v4/CONTACT_SCHEMA_v4.md))

| Variable | Example |
| --- | --- |
| `$contact.first_name$` | `George` |
| `$contact.last_name$` | `Rivers` |
| `$contact.company$` | `Venue Co` |
| `$contact.email$` | `george@venue.co` |
| `$contact.phone$` | `+61 2 1234 5678` |

### 3.3 Story / form (when story/step UI is active)

| Variable | Example |
| --- | --- |
| `$story.title$` | `Launch Prep` |
| `$story.step$` | `2` |
| `$story.total_steps$` | `5` |
| `$form.field_name$` | user input |

### 3.4 Spatial (grid canon / PlaceRef)

| Variable | Example |
| --- | --- |
| `$location.place_ref$` | `EARTH:SUR:L305-DA11` |
| `$location.layer$` | `L305` |
| `$location.cell$` | `DA11` |
| `$location.anchor$` | `EARTH` |

### 3.5 Gameplay (future — aligns with [gameplay gap analysis](../../../uDosConnect/uDosDev/docs/future/gameplay-v4-gap-analysis-v2-integration.md))

| Variable | Example |
| --- | --- |
| `$gameplay.lens$` | `explorer` |
| `$gameplay.skin$` | `retro` |
| `$gameplay.score$` | `1250` |
| `$gameplay.level$` | `3` |
| `$gameplay.health$` | `85%` |

### 3.6 Project / tasks

| Variable | Example |
| --- | --- |
| `$project.name$` | `Launch Prep` |
| `$project.status$` | `active` |
| `$task.count$` | `12` |

---

## 4. Where values come from

### 4.1 Built-in (system)

Environment, host session, resolved contact id, current grid context.

### 4.2 Document definition (optional)

**Start with YAML frontmatter** (already on the GFM Enhanced path):

```markdown
---
variables:
  PROJECT-NAME: "Launch Prep"
  TARGET-DATE: "2026-04-15"
  CONTACT-ID: cnt_01
---

# $PROJECT-NAME$
```

Later: HTML comment `<!-- var: NAME = value -->` or dedicated code fence — **deferred** until frontmatter path is stable.

### 4.3 Session variables (uCode v4)

Set/get via **uCode** — see **§10 Commands reference (stub)**. Session-only unless persisted by an explicit product action.

---

## 5. Formula application on variables (later phases)

Math with interpolated variables, string/date helpers, `$if(...)$` — **not** required for first ThinUI / Host slice.

| Phase | Scope |
| --- | --- |
| **Phase B** | Nested fields + session uCode |
| **Phase C** | `$ $a$ + $b$ $`, `$upper($x$)$`, conditionals |

---

## 6. Parsing & rendering

### 6.1 In markdown preview (ThinUI / family editors)

| Syntax | Rendered |
| --- | --- |
| `$E = mc^2$` | Math |
| `$USER-NAME$` | Resolved value or placeholder |
| Nested math with variables | After Phase C |

### 6.2 Export

| Mode | Behaviour |
| --- | --- |
| **Resolve** | Emit static markdown |
| **Preserve** | Keep `$VAR$` for templates |

### 6.3 MCP / **uDosGo**

- Variable **registry** read/write via agreed MCP tools (tool names TBD with implementation).
- Template helper may expose `render` with a variable map — same spec, server-side.

**No “handoff to Linkdown” as the integration hinge** — **uDosGo** is the runnable core; **uMacDown** / **uChatDown** / **Linkdown** (and **uFeedThru** when applicable) consume the same rules when they opt in.

---

## 7. Integration (family)

| Surface | Role |
| --- | --- |
| **uDosGo** (`apps/thinui`, Host) | Registry, preview resolution, MCP exposure |
| **uMacDown** | Inkdown formula toggle + variable preview (product timeline) |
| **uChatDown** | Document panel + chat may resolve session variables |
| **SonicScrewdriver** | Device fields as `$device.*$` in templates |
| **Gameplay** | `$gameplay.*$` when lens/skin/runtime exists |

---

## 8. Implementation roadmap (uDosGo-oriented)

Labels align with **family meta** / monorepo milestones — adjust dates in [TASKS.md](../../TASKS.md).

| Phase | Scope | Deliverables (this repo) |
| --- | --- | --- |
| **A — Minimal** | Preserve math; detect variables; core + frontmatter | Parser hook in render pipeline; tests; doc this spec |
| **B** | Nested paths; session via uCode `[VAR|…]` | Session store API; MCP read/write stubs |
| **C** | Formula application; string/date; conditionals | Extended evaluator; export modes |

---

## 9. Example

**Source:**

```markdown
---
variables:
  PROJECT-NAME: "Launch Prep"
  TARGET-DATE: "2026-04-15"
---

# $PROJECT-NAME$

**Due:** $TARGET-DATE$

**Place:** $location.place_ref$
```

**Rendered (illustrative):** values substituted when context provides them.

---

## 10. uCode v4 — commands and grammar (canonical)

The **complete** uCode v4 language — command DSL, scripting keywords, `POKE`/MCP, symbol rules, Go package layout, and future TypeScript `.mdx` bridge — is **locked** in uDosDev:

- **[`UCODE_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4.md)** (`~/Code/uDosConnect/uDosDev/docs/specs/v4/UCODE_v4.md`)
- **[`UCODE_v4_addendum-quotes-markup-symbols.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-quotes-markup-symbols.md)** — quotes, escapes, markup/HTML mapping, path backslashes, reserved `\\`, whitespace, continuation (**locked**)
- **[`UCODE_v4_addendum-2-linking-navigation.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-2-linking-navigation.md)** — `@workspace`, `::` schemes, wikilinks, navigation hints (**locked**)
- **[`UCODE_v4_family-lock-2026-04-11.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_family-lock-2026-04-11.md)** — pack inventory + implementation summary (**locked**)
- **[`UCODE_v4_addendum-3-execution-runtime-sandboxing.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-3-execution-runtime-sandboxing.md)** — execution modes, prompts, sandboxing, limits (**locked**)

This document (**uDos Variables**) only defines **`$variable$` interpolation** in markdown surfaces and how namespaces map to family schemas. Session `LET` / inline `$x$` behaviour follows **UCODE v4** when the interpreter is present.

---

## 11. One-line summary (this doc)

**Inkdown `$...$` math stays.** **uDos Variables v4** adds `$VAR$` and dotted paths for core, contact, story, spatial, gameplay, and project keys — with frontmatter first; full **uCode v4** surface is **[UCODE_v4.md](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4.md)** plus addenda (quotes/markup, linking draft, execution/sandboxing). **uDosGo** owns registry + MCP shape; uMacDown / uChatDown / ThinUI are consumers.
