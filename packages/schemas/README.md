# `packages/schemas`

Canonical JSON Schema drafts for v3.0.1. Consume from Host, Hivemind, ThinUI, and tooling; evolve with `schemaVersion` on each document.

| File | Purpose |
|------|---------|
| `usxd-surface.schema.json` | **USXD** portable surface subset (`schemaVersion: usxd/0.1`); see `docs/usxd_schema.md`, `docs/DISPLAY_STACK.md` |
| `feed.schema.json` | Incoming inbox/feed item |
| `task.schema.json` | Task graph node |
| `event.schema.json` | Append-only audit/event |
| `contact.schema.json` | Empire canonical contact |
| `user-link.schema.json` | Contact ↔ WP user mapping |
| `provider-policy.schema.json` | Routing + budget rules |

**Example:** `examples/usxd-surface-canonical.example.json` — canonical 80×30 teletext panel.
