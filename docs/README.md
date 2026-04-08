# uDOS v3.0.1 — planning pack (index)

**Scope:** this folder documents the **uDOS-v3 monorepo** demo. **UniversalSurfaceXD** (v2 UX spine, interchange, browser-mockup) is the sibling design/interchange repo; pair it when evolving surface documents or shared JSON contracts.

Public-facing planning cut for the **local-first demo**. Read in this order:

1. [QUICKSTART.md](QUICKSTART.md) — first-time setup and install/run path  
2. [SCOPE-v3.0.1.md](SCOPE-v3.0.1.md) — what ships vs deferred  
3. [ARCHITECTURE.md](ARCHITECTURE.md) — boundaries and flows  
4. [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md) — **locked** 80×30 viewport, 16×24 tiles, teletext bridge, UniversalSurfaceXD pairing  
5. [DISPLAY_STACK.md](DISPLAY_STACK.md) — **index** for grid / view / teletext / USXD / render pipeline specs  
6. [DATA-MODEL.md](DATA-MODEL.md) — disk layout + schemas  
7. [WP-BRIDGE.md](WP-BRIDGE.md) — WordPress + Empire plugin  
8. [DEMO.md](DEMO.md) — gold path + 9-step definition of done  
9. [MILESTONES.md](MILESTONES.md) — milestone checklists  
10. [BACKLOG.md](BACKLOG.md) — what shipped vs deferred (v3.0.1 closed)  
11. [FILE-TREE.md](FILE-TREE.md) — exact monorepo tree  
12. [ROADMAP.md](ROADMAP.md) — after v3.0.1  

### Display / USXD specs (same canon)

- [usxd_schema.md](usxd_schema.md) · [view_engine.md](view_engine.md) · [RENDER_PIPELINE.md](RENDER_PIPELINE.md)  
- [grid_engine.md](grid_engine.md) · [spatial_map_spec.md](spatial_map_spec.md) · [teletext_engine.md](teletext_engine.md)  
- [u_dos_v_3_style_guide.md](u_dos_v_3_style_guide.md)  
- Schema: `packages/schemas/usxd-surface.schema.json` · Example: `examples/usxd-surface-canonical.example.json`  

Product overview and repo entry: [../README.md](../README.md).
