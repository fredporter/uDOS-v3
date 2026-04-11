# Architecture — uDOS v3.0.1

## System shape

```text
[ ThinUI ]
  visual control + graph + logs
        │
        ▼
[ Hivemind ]
  classify + plan + route + review
        │
        ▼
[ Host ]
  local API + execution + storage + WP runtime lifecycle
        │
        ▼
[ WordPress ]
  users + privacy + restricted pages + Empire bridge (plugin)
        │
        ▼
[ Persistent storage ]
  vault + spool + events + wp + backups
```

**Rule:** ThinUI and Hivemind do not own the disk truth. **Host** is the system of record for spool, tasks, events, and vault writes initiated by tools. WordPress owns its own DB/files under Host-provisioned paths.

**Family v4 boundary:** Governance and locked specs live in **uDosConnect** (`uDosDev/docs/specs/v4/`). **Round A (locked)** — [`ROUND_A_CORE_ARCHITECTURE_v4.md`](../uDosConnect/uDosDev/docs/specs/v4/ROUND_A_CORE_ARCHITECTURE_v4.md): uDosGo as reference implementation, uDosConnect as governance-only, vault as shared state. **This monorepo** ships the runnable Host + Hivemind + ThinUI integration and links that catalog from [specs/README.md](specs/README.md); it does not duplicate the full spec corpus in-tree.

---

## Module boundaries

### `apps/host`

**Owns**

- Process lifecycle for the local node (API server, optional workers).
- Storage root configuration and directory creation.
- HTTP API surface used by ThinUI, Hivemind, and bridge clients.
- Job/tool execution adapter (sandboxing depth is “basic” for v3.0.1).
- Append-only or table-backed **event log** and **task store**.
- Provider config **loading** (secrets from local env/files).
- WordPress **runtime wiring**: data path, optional Docker/PHP stack, health check, startup order.

**Does not own**

- LLM prompt policy beyond executing configured calls (orchestration policy lives in Hivemind).
- Visual presentation (ThinUI).

**Suggested internal layout** (see [FILE-TREE.md](FILE-TREE.md))

- `config/` — loader, validated config schema.
- `storage/` — vault/spool/events path helpers.
- `execution/` — runner, tool registry (small).
- `api/` — REST routes, SSE or polling for ThinUI.
- `wordpress/` — connector (REST URL, app passwords, health).
- `health/` — readiness/liveness.

### `packages/hivemind`

**Owns**

- Four-role loop: **Scout → Planner → Maker → Reviewer**.
- Task graph construction and state transitions (schema-aligned).
- Provider **selection requests** and budget checks (actual HTTP to providers may be delegated to Host to keep keys centralized — choose one pattern and document it in implementation).
- Emission of **events** describing decisions and transitions.

**Does not own**

- Direct filesystem writes to vault (only via Host APIs/tools).
- WordPress session management.

### `apps/thinui`

**Owns**

- Operator UI: three panels + manual actions.
- Client for Host API (via `packages/sdk`).

**Does not own**

- Business rules for task validity or provider choice (display + trigger only).

### `apps/wordpress-plugin-empire-local` (plugin source)

**Owns**

- PHP plugin **`udos-empire-local`**: REST routes, contact-user bridge, privacy callbacks, restricted page helpers.
- WordPress-native data: users, capabilities, pages, options where appropriate.

**Does not own**

- Host task graph or spool files (reads/writes through Host REST as designed).

### `packages/schemas`

**Owns**

- Canonical JSON (or TS) schemas for feed, task, event, contact, user-link, provider-policy.
- Version fields on each document where evolution is expected.

### `packages/sdk`

**Owns**

- Typed HTTP client for Host APIs used by ThinUI (and optionally Hivemind if in-process split later).

### `packages/shared`

**Owns**

- Constants, small utilities, shared types generated from schemas (optional in early milestones).

---

## Primary data flows

1. **Submit input** — ThinUI → Host (`POST` feed item) → spool + event.
2. **Orchestrate** — Hivemind polls or receives trigger → reads feed → Scout/Planner → tasks persisted via Host.
3. **Execute** — Maker → Host execution endpoint → tool runs → vault files + events.
4. **Review** — Reviewer → task status + event; ThinUI reflects state.
5. **Identity / privacy** — Optional path: Host or ThinUI links operator to WP login; plugin updates linked contact/user; restricted page shows consent or self-service.

---

## Network model (v3.0.1)

- **Local-first:** default `127.0.0.1` / `localhost`.
- **LAN:** optional bind for ThinUI and WP on a known hostname/IP; no public internet requirement for the demo.
- **Restricted pages:** available only to authenticated WP users (and/or local network policy documented in [DEMO.md](DEMO.md)).

---

## Display and surface contract (canonical)

Operator UI and portable surface documents share one **grid–graphics** contract: **80×30** viewport, **16×24 px** per cell, **teletext 2×3** as the canonical graphics bridge, and **UniversalSurfaceXD** for cross-runtime surface declarations. Themes are **render dialects**, not alternate architectures.

**Authoritative detail:** [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md), [DISPLAY_STACK.md](DISPLAY_STACK.md), [specs/README.md](specs/README.md), [style-guide.md](style-guide.md), and **[UniversalSurfaceXD](https://github.com/fredporter/UniversalSurfaceXD/blob/main/docs/decisions/UniversalSurfaceXD_v2-cannon.md)** (full portable surface narrative; optional sibling clone `../../UniversalSurfaceXD`).

---

## Provider data flow

- **OpenRouter** — primary flexible router.
- **OpenAI** — premium fallback.
- **Gemini or Mistral** — optional secondary.
- **Local / offline placeholder** — explicit “degraded” path for demos without keys.

Budget policy must emit **events** consumable by ThinUI (see [DATA-MODEL.md](DATA-MODEL.md)).

---

## Host HTTP API (current implementation)

Base URL: `http://127.0.0.1:8787` (or `PORT` / `UDOS_DATA_ROOT` as configured). CORS allows browser calls from ThinUI.

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/health`, `/api/v1/health` | Liveness + `dataRoot`, version |
| `GET` | `/api/v1/feed/items` | List feed items |
| `POST` | `/api/v1/feed/items` | Submit feed item (`raw`, optional `uri`, `source`, optional `metadata.surfaceRef`); runs pipeline (Hivemind + tools); `feed.received` echoes `surfaceRef` when set |
| `GET` | `/api/v1/tasks` | List tasks |
| `GET` | `/api/v1/events?limit=` | Recent events (tail of `events/log.json`) |
| `GET` | `/api/v1/events/stream` | **SSE** (`text/event-stream`): `event: snapshot` then `event: append` per new event |
| `GET` | `/api/v1/bridge/wordpress` | Host-side probe of `UDOS_WP_BASE_URL` → WP `udos-empire/v1/health` |
| `POST` | `/api/v1/bridge/wp-event` | WordPress → Host (requires `UDOS_BRIDGE_SECRET` + header `X-Udos-Bridge-Token`); types `wp.contact_linked`, `wp.profile_updated` |

### Host tool execution (v3.0.2)

| Variable | Default | Purpose |
|----------|---------|---------|
| `UDOS_TOOL_TIMEOUT_MS` | `60000` | Per-tool wall-clock cap (capped at 600000). |
| `UDOS_VAULT_NOTE_MAX_BYTES` | `524288` | Max UTF-8 size of assembled vault body per write (min 1024; capped at 50 MiB). |

Failed tools emit `tool.failed` with `payload.code`, `payload.retryable`, and `payload.error`; tasks store `error` + `errorCode`. See [DATA-MODEL.md](DATA-MODEL.md).

WordPress plugin REST is documented in [`apps/wordpress-plugin-empire-local/README.md`](../apps/wordpress-plugin-empire-local/README.md).

---

## Family v4 specifications (handoff)

Platform, task, contact, grid, GFM, Shell TUI, and Sonic mini-specs are maintained as **repo-tracked copies** under **`uDosConnect/uDosDev/docs/specs/v4/`** (sibling of this repo). They are the cross-family contract for:

- **Tasks and events** — [`TASK_SPEC_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/TASK_SPEC_v4.md) with Hivemind and Host persistence.
- **Contacts** — [`CONTACT_SCHEMA_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/CONTACT_SCHEMA_v4.md) with `packages/schemas` and the Empire ↔ WordPress bridge.
- **Grid and display** — [`uDos-Grid-Spec-v4-2-1.md`](../../uDosConnect/uDosDev/docs/specs/v4/uDos-Grid-Spec-v4-2-1.md) alongside [GRID-GRAPHICS-CANON.md](GRID-GRAPHICS-CANON.md) and [specs/README.md](specs/README.md).
- **Operator markdown** — [`GFM_Enhanced_Specification_v4.md`](../../uDosConnect/uDosDev/docs/specs/v4/GFM_Enhanced_Specification_v4.md).
- **Shell TUI** — [`SHELL_v4_command-palette.md`](../../uDosConnect/uDosDev/docs/specs/v4/SHELL_v4_command-palette.md), [`SHELL_v4_bubble-tea-tui.md`](../../uDosConnect/uDosDev/docs/specs/v4/SHELL_v4_bubble-tea-tui.md); primary implementation lane is **SonicScrewdriver**; uDosGo consumes the same behaviour when exposing a terminal shell over Host.
- **Sonic integration** — [`SONIC_v4_device-database.md`](../../uDosConnect/uDosDev/docs/specs/v4/SONIC_v4_device-database.md), [`SONIC_v4_ewaste-triage.md`](../../uDosConnect/uDosDev/docs/specs/v4/SONIC_v4_ewaste-triage.md) for catalog and triage semantics when the integration stack surfaces hardware data.
- **USXD → operational GUI** — [`INTEGRATION_v4_usxd-operational-gui.md`](../../uDosConnect/uDosDev/docs/specs/v4/INTEGRATION_v4_usxd-operational-gui.md): validated interchange → **`apps/thinui`** (React) and/or Bubble Tea (Shell/Sonic); UniversalSurfaceXD lab as reference.

**Index:** [`uDosConnect/uDosDev/docs/specs/v4/README.md`](../../uDosConnect/uDosDev/docs/specs/v4/README.md).
