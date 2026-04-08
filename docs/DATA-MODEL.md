# Data model — uDOS v3.0.1

## Persistence layout (Host-owned)

Canonical on-disk layout (configurable root; default name illustrative):

```text
/udos-data
  /vault          # durable human-readable outputs (e.g. markdown, exports)
  /spool          # feed + rolled-up intake state
  /events         # append-only machine log (files or DB-backed mirror)
  /exports        # explicit export bundles (optional for demo)
  /wordpress      # WP DB, uploads, wp-content targets
  /backups        # snapshots / dumps (optional scripts)
```

### Truth model

| Layer | Role |
|-------|------|
| **Vault** | Human-readable durable artifacts the operator expects to keep. |
| **Spool** | Structured feed items and workflow rollups; may be JSON/SQLite. |
| **Events** | Append-only narrative of what happened (audit + ThinUI log). |
| **WordPress** | Identity, sessions, capabilities, restricted pages, plugin options. |

### v3 monorepo on-disk files (default `uDOS-v3/.udos-data`)

| Path | Contents |
|------|----------|
| `spool/feed-items.json` | Array of feed items |
| `spool/tasks.json` | Array of tasks |
| `events/log.json` | Array of events (ThinUI shows a tail via Host API) |
| `vault/gold-{feed-uuid}.md` | Gold-path markdown output from stub tools |

HTTP entry points for these are listed in [ARCHITECTURE.md](ARCHITECTURE.md) (Host HTTP API).

---

## Schemas (define first)

Source of truth files in `packages/schemas/`:

| Schema file | Entity |
|-------------|--------|
| `feed.schema.json` | Incoming item (raw + metadata + classification slot). |
| `task.schema.json` | Actionable unit: state, dependencies, tool id, linkage to feed. |
| `event.schema.json` | Anything that happened (typed, timestamped, correlates to task/feed). |
| `contact.schema.json` | Empire-side canonical contact record. |
| `user-link.schema.json` | Maps contact ↔ optional `WP_User`. |
| `provider-policy.schema.json` | Routing + budget rules and thresholds. |

All JSON documents SHOULD include:

- `schemaVersion` (string)
- `id` (string, UUID or ULID recommended)
- `createdAt` / `updatedAt` where mutable (ISO 8601)

---

## Task states (deterministic)

Minimum enum for v3.0.1:

- `queued`
- `ready`
- `running`
- `blocked`
- `done`
- `failed`

Transitions are owned by **Hivemind** logic but **persisted** by **Host**.

---

## Tool failure codes (v3.0.2)

When `tool.failed` fires, `payload` includes:

| Field | Meaning |
|-------|---------|
| `code` | Stable classifier (mirrors task `errorCode` when the task fails). |
| `error` | Human-readable message. |
| `retryable` | Hint for operators/automation (not a guarantee). |

Common `code` values: `tool_timeout`, `unknown_tool`, `io_error`, `resource_cap_exceeded`, `internal_error`.

## Persistence choice (v3.0.2)

**Decision:** Keep **JSON files** under `.udos-data` for feed, tasks, and events through v3.0.2. **SQLite** (or another single-DB consolidation) remains a later optimization if tail latency or file sprawl becomes painful; track in [BACKLOG.md](BACKLOG.md) if scope changes.

## Event types (suggested baseline)

Non-exhaustive; extend via `event.schema.json` `type` enum as needed:

- `feed.received`
- `feed.classified`
- `task.created`
- `task.state_changed`
- `tool.started` / `tool.finished` / `tool.failed`
- `provider.request` / `provider.response` (redact secrets)
- `budget.warning` / `budget.blocked`
- `review.pass` / `review.fail` / `review.needs_fix`
- `wp.contact_linked` / `wp.profile_updated`

---

## Provider + budget surfacing

Policy schema must allow ThinUI to answer (via aggregated events or summary endpoint):

- Default provider
- Cheapest eligible provider (for demo, may be static ordering)
- Premium fallback
- Behavior when a **budget threshold** is reached (e.g. block premium, switch model, or halt with clear event)

---

## WordPress data

- Standard WP tables for users, posts, pages, options.
- Plugin stores minimal bridge data (e.g. user meta, custom table, or option blobs) — see [WP-BRIDGE.md](WP-BRIDGE.md).

No requirement to duplicate full CRM history inside WP for v3.0.1.
