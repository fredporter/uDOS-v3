# Specifications — uDOS v3

**Purpose:** single entry for **display**, **layout**, **USXD**, and **render** specifications.  
**Doc map (full index):** [../README.md](../README.md)  
**Style & authoring:** [../style-guide.md](../style-guide.md)

**Family v4 (cross-repo):** canonical copies of platform, shell, Sonic, task, contact, and grid specs live under **[`uDosConnect/uDosDev/docs/specs/v4/`](../../../uDosConnect/uDosDev/docs/specs/v4/)** (sibling checkout). See [Family v4 specifications (uDosDev)](#family-v4-specifications-udosdev) below.

---

## Family v4 specifications (uDosDev)

These files are the **engineering handoff** line for the uDos family. They inform **schemas**, **Hivemind task syntax**, **ThinUI / teletext grid** alignment, **contact** payloads, **markdown (GFM Enhanced)** conventions, the **shared Shell TUI** (command palette + Bubble Tea), and the **USXD → operational GUI** pipeline (React ThinUI + optional Bubble Tea surfaces).

| Spec | Path (sibling `uDosConnect`) | Role in **uDosGo** (this monorepo) |
| --- | --- | --- |
| Core platform | [`uDos-Spec-v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/uDos-Spec-v4.md) | North star for Host / ThinUI / Hivemind boundaries; scope checks against [SCOPE-v3.0.1.md](../SCOPE-v3.0.1.md) |
| Round A — core architecture | [`ROUND_A_CORE_ARCHITECTURE_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/ROUND_A_CORE_ARCHITECTURE_v4.md) | **Locked** — uDosGo vs uDosConnect vs vault; maps to [ARCHITECTURE.md](../ARCHITECTURE.md) |
| Round B — product boundaries | [`ROUND_B_PRODUCT_BOUNDARIES_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/ROUND_B_PRODUCT_BOUNDARIES_v4.md) | **Locked** — Linkdown first, uMacDown, uChatDown, uFeedThru; sibling apps — context for vault + schemas only |
| Round C — physical layer | [`ROUND_C_PHYSICAL_LAYER_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/ROUND_C_PHYSICAL_LAYER_v4.md) | **Locked** — uRing / DIY / LEGO uNode; pairs with spatial ecosystem |
| Round D — publishing and graphics | [`ROUND_D_PUBLISHING_GRAPHICS_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/ROUND_D_PUBLISHING_GRAPHICS_v4.md) | **Locked** — uDosPublish, UVIL, Classic Modern; pairs with [`UNIVERSAL_VECTOR_IL_UVIL_v1.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UNIVERSAL_VECTOR_IL_UVIL_v1.md) |
| Round F — roadmap | [`ROUND_F_ROADMAP_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/ROUND_F_ROADMAP_v4.md) | **Locked** — parallel tracks, alpha fresh start, deferred v5+ |
| GFM Enhanced | [`GFM_Enhanced_Specification_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/GFM_Enhanced_Specification_v4.md) | Authoring rules for vault markdown, feed text, and operator-visible docs |
| Task syntax | [`TASK_SPEC_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/TASK_SPEC_v4.md) | Aligns Hivemind task graph + events with family task grammar |
| Contact schema | [`CONTACT_SCHEMA_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/CONTACT_SCHEMA_v4.md) | Informs `packages/schemas` contact shape + WordPress bridge |
| Unified data (WP / HubSpot / uDos) | [`UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md) | **Locked** — `wp_users` / `wp_usermeta` ↔ HubSpot ↔ `$user.*$`, `wp_udos_activity`, FDX; pairs with CONTACT_SCHEMA |
| Contacts DB template | [`contacts-db-template.txt`](../../../uDosConnect/uDosDev/docs/specs/v4/contacts-db-template.txt) | Reference layout for contact persistence / imports |
| Grid v4 | [`uDos-Grid-Spec-v4-2-1.md`](../../../uDosConnect/uDosDev/docs/specs/v4/uDos-Grid-Spec-v4-2-1.md) | Align with [GRID-GRAPHICS-CANON.md](../GRID-GRAPHICS-CANON.md) and `packages/shared` constants |
| Spatial + storage ecosystem | [`SPATIAL_STORAGE_ECOSYSTEM_v1.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_STORAGE_ECOSYSTEM_v1.md) | **Locked** — uCell, uTile / uGrid, uCoin, uRing; complements grid + PlaceRef; **v4.4.0** rounds plan |
| uSpace / cloud fallback | [`SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md) | **Locked** — spatial hosting tiers, view limits, free tier, illustrative `POKE`; pairs with spatial ecosystem |
| UniversalVectorIL (UVIL) | [`UNIVERSAL_VECTOR_IL_UVIL_v1.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UNIVERSAL_VECTOR_IL_UVIL_v1.md) | **Locked** — vector/schematic/tile/QR **`UniversalVectorIL/`** boundary vs uDosGo + USXD; optional **v4.8.0** alignment |
| Command palette | [`SHELL_v4_command-palette.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SHELL_v4_command-palette.md) | Shared **`:`** / **`/`** palette semantics when a Shell TUI fronts Host or tools |
| Bubble Tea TUI | [`SHELL_v4_bubble-tea-tui.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SHELL_v4_bubble-tea-tui.md) | Viewport tiers, keybindings, Lip Gloss themes — shared with **SonicScrewdriver** |
| Sonic device DB | [`SONIC_v4_device-database.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SONIC_v4_device-database.md) | Handoff for device catalog / SQLite expectations when integration consumes Sonic data |
| E-waste triage | [`SONIC_v4_ewaste-triage.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SONIC_v4_ewaste-triage.md) | Rules matrix for recovery / disposition flows surfaced in family UIs |
| USXD → operational GUI | [`INTEGRATION_v4_usxd-operational-gui.md`](../../../uDosConnect/uDosDev/docs/specs/v4/INTEGRATION_v4_usxd-operational-gui.md) | **Locked** — design → validate → generate → wire **`apps/thinui`** (React) + Shell/Sonic (Bubble Tea); USXD lab reference |
| uCode v4 | [`UCODE_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4.md) | **Locked** — language + Go/TS runtime; POKE/MCP; pairs with [uDos-variables-ucode-v4.md](uDos-variables-ucode-v4.md) |
| uCode v4 addendum | [`UCODE_v4_addendum-quotes-markup-symbols.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-quotes-markup-symbols.md) | **Locked** — quotes/escapes, markup output, paths, reserved `\\`, symbols, whitespace |
| uCode v4 addendum 2 | [`UCODE_v4_addendum-2-linking-navigation.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-2-linking-navigation.md) | **Locked** — linking / navigation (`@`, `::`, wikilinks, GitHub, sequence hints) |
| uCode v4 family lock | [`UCODE_v4_family-lock-2026-04-11.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_family-lock-2026-04-11.md) | **Locked** — pack inventory + implementation summary (2026-04-11) |
| uCode v4 addendum 3 | [`UCODE_v4_addendum-3-execution-runtime-sandboxing.md`](../../../uDosConnect/uDosDev/docs/specs/v4/UCODE_v4_addendum-3-execution-runtime-sandboxing.md) | **Locked** — execution modes, sandboxing, prompts, limits, logging, TUI alignment |
| v4.4–v4.8 rounds (planning) | [`uDos-v4-rounds-consolidated-execution-plan.md`](../../../uDosConnect/uDosDev/docs/future/uDos-v4-rounds-consolidated-execution-plan.md) | **Locked for planning** — dependency graph, deliverables, success criteria |

**Sibling products & family analysis (same `specs/v4/` folder):** listed in [uDosDev `README.md`](../../../uDosConnect/uDosDev/docs/specs/v4/README.md); not implemented inside uDosGo, but part of the **full v4 inventory** for cross-repo alignment.

| Spec | Path (sibling `uDosConnect`) | Role in **uDosGo** |
| --- | --- | --- |
| uChatDown | [`CHATDOWN_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/CHATDOWN_v4.md) | **uChatDown** product line (uDosDev spec filename **CHATDOWN_v4**) — context / family scope only |
| Linkdown | [`LINKDOWN_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/LINKDOWN_v4.md), [`LINKDOWN_v4_updates.md`](../../../uDosConnect/uDosDev/docs/specs/v4/LINKDOWN_v4_updates.md) | **Linkdown** editor — context only |
| uMacDown (Syncdown / native app) | [`SYNCDOWN_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SYNCDOWN_v4.md) | Native macOS client — clone **`~/Code/uMacDown`**; uDosDev **SYNCDOWN_v4** — context only |
| Product matrix | [`v4_PRODUCT_MATRIX.md`](../../../uDosConnect/uDosDev/docs/specs/v4/v4_PRODUCT_MATRIX.md) | Family product positioning — optional scope checks |
| Apple / sync-chat delta | [`v4-1-SYNC_CHAT_APPLE_UPDATE.md`](../../../uDosConnect/uDosDev/docs/specs/v4/v4-1-SYNC_CHAT_APPLE_UPDATE.md) | Sync / chat handoff — uMacDown & family context |
| MCP analysis | [`MCP-ANALYSIS-BRIEF.txt`](../../../uDosConnect/uDosDev/docs/specs/v4/MCP-ANALYSIS-BRIEF.txt) | MCP tooling analysis — governance artifact |

**Inventory parity:** Every file named in [uDosDev `docs/specs/v4/README.md`](../../../uDosConnect/uDosDev/docs/specs/v4/README.md) is linked from this page (audit **2026-04-10**). When that README gains entries, add a row here in the same pass.

**Index + decisions:** [`uDosConnect/uDosDev/docs/specs/v4/README.md`](../../../uDosConnect/uDosDev/docs/specs/v4/README.md) · [`DECISIONS-2026-04_v4.md`](../../../uDosConnect/uDosDev/docs/specs/v4/DECISIONS-2026-04_v4.md)

### uDosGo implementation specs (this repo)

| Document | Role |
| --- | --- |
| [uDos-variables-ucode-v4.md](uDos-variables-ucode-v4.md) | **Draft** — `$variable$` interpolation (Inkdown `$...$` math preserved), namespaces, phased roadmap, **uCode v4** `[VAR|…]` stub + scaffold for full command reference |
| [RETRO_COMMAND_ALIASES_v4.md](RETRO_COMMAND_ALIASES_v4.md) | **Locked** — retro BASIC-style CLI aliases (`PEEK`/`POKE`, `DIR`, `TYPE`, …); **`@udos/shared`** `retro-command-aliases.ts` |
| Sonic v4 (family) | [uDosDev `SONIC_SCREWDRIVER_v4_COMPLETE_BRIEF.md`](../../../uDosConnect/uDosDev/docs/specs/v4/SONIC_SCREWDRIVER_v4_COMPLETE_BRIEF.md) — locked umbrella; Ventoy/USXD/uDosDocs/**blocktext** |
| Colour — Sonic & USXD (family) | [uDosDev `COLOUR_SPEC_v4_ADDENDUM_SONIC_USXD.md`](../../../uDosConnect/uDosDev/docs/specs/v4/COLOUR_SPEC_v4_ADDENDUM_SONIC_USXD.md) |

---

## Canon (read first)

| Document | Role |
| --- | --- |
| [../GRID-GRAPHICS-CANON.md](../GRID-GRAPHICS-CANON.md) | **Locked** rules: 80×30, 16×24, teletext 2×3, LocId/PlaceRef, feed/story family, UniversalSurfaceXD pairing |
| [../DISPLAY_STACK.md](../DISPLAY_STACK.md) | Three-layer model + ordered reading list + pipeline one-liner |

---

## USXD and schema

| Document / artifact | Role |
| --- | --- |
| [../usxd_schema.md](../usxd_schema.md) | Human spec: `usxd/0.1`, `kind`, `grid.tile_px`, regions, validation |
| `packages/schemas/usxd-surface.schema.json` | JSON Schema (subset) |
| `examples/usxd-surface-canonical.example.json` | Canonical example |
| `examples/usxd-surface-minimal.example.json` | Minimal valid surface (schema floor) |
| `examples/usxd-ventoy-boot-menu.example.json` | Ventoy boot menu launcher (teletext, `uvil://` splash tile) — **[SONIC_SCREWDRIVER_v4_COMPLETE_BRIEF.md](../../../uDosConnect/uDosDev/docs/specs/v4/SONIC_SCREWDRIVER_v4_COMPLETE_BRIEF.md)** §8 |
| `npm run validate:usxd` | AJV check for **all** `usxd/0.1` surfaces under `examples/` (first step of `npm run build`); `validate:usxd:verbose` lists skips |
| `npm run validate:usxd:sibling` | If **`~/Code/UniversalSurfaceXD`** exists (or `UNIVERSAL_SURFACE_XD_ROOT`), runs that repo’s `ux:validate-surfaces`; otherwise **skip** (exit 0). |
| `npm run validate:usxd:parity` | `validate:usxd` **then** sibling lab check — use before integration merges when both clones are present. |

**Sibling repo:** **[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD)** — [cannon](https://github.com/fredporter/UniversalSurfaceXD/blob/main/docs/decisions/UniversalSurfaceXD_v2-cannon.md), [integrated template](https://github.com/fredporter/UniversalSurfaceXD/blob/main/docs/decisions/usxd_udos_integrated_template.md).

---

## Engines and pipeline

| Document | Role |
| --- | --- |
| [../view_engine.md](../view_engine.md) | View kinds × render modes, bindings, fallbacks |
| [../RENDER_PIPELINE.md](../RENDER_PIPELINE.md) | USXD → View → Layout → Raster → output |
| [../grid_engine.md](../grid_engine.md) | Spatial layout: snap, collision, layers (resolution-independent) |
| [../spatial_map_spec.md](../spatial_map_spec.md) | Named maps, regions, markers |
| [../teletext_engine.md](../teletext_engine.md) | 16×24 cell, 2×3 mosaic, canonical 80×30 default |

---

## Code parity

| Location | Role |
| --- | --- |
| `packages/shared/src/grid-canonical.ts` | Viewport, tile px, mosaic, `USXD_SCHEMA_VERSION`, fallback ladder labels |
| ThinUI footer | Live parity string (`usxd/0.1`, 80×30, 16×24, 1280×720) |
| ThinUI `#/lab/teletext` | Interactive teletext mosaic lab |

---

## Related (system docs)

| Document | Role |
| --- | --- |
| [../ARCHITECTURE.md](../ARCHITECTURE.md) | Host / Hivemind / ThinUI boundaries |
| [../DATA-MODEL.md](../DATA-MODEL.md) | Persistence, feed/task/event schemas |
