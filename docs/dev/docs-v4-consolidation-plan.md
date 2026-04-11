# uDosGo — documentation v4 consolidation (plan)

**Status:** Adopted (execution plan)  
**Role:** Systematic refactor of **in-repo** documentation so v4 is easy to navigate, duplicates are intentional or removed, and superseded material lands in **`.compost/`** (gitignored) per [dev-process-v4.md](../dev-process-v4.md).

**Execution:** [TASKS.md](../../TASKS.md) — ids **`[UDGO-DOC-CP*]`** · **family specs:** [`uDosConnect/uDosDev/docs/specs/v4/`](../../../uDosConnect/uDosDev/docs/specs/v4/).

---

## 1. Goals

| Goal | Done when |
| --- | --- |
| **Single spine** | A reader can start at [docs/README.md](../README.md) and reach every *current* contract without guessing folder names. |
| **v4 naming** | New/edited prose prefers **uDos** / **uDos-Go** (display) and **[uDosGo](https://github.com/fredporter/uDosGo)** (URL); legacy **uDOS** only where historical. |
| **No silent duplicates** | Either one canonical file + stub pointers, or an explicit “snapshot / archive” label. |
| **.compost discipline** | Superseded full-file copies and exploratory rewrites go to **`.compost/`**, not parallel trees in `docs/`. |

---

## 2. Repository map (today)

| Area | Path | Notes |
| --- | --- | --- |
| **Canonical doc tree** | `docs/` | Mostly **flat** (not deeply nested); hub is [README.md](../README.md). |
| **Specs hub + family v4** | [docs/specs/README.md](../specs/README.md) | Links to **uDosDev** `docs/specs/v4/`. |
| **Media drop** | [docs/media/README.md](../media/README.md) | Optional assets for demo/docs. |
| **Planning pack snapshot** | `examples/udos-v3.0.1-planning-pack/` | **Pointer only** under `docs/` (2026-04): duplicate bodies removed; canonical tree is repo-root `docs/`. |
| **Package / app docs** | `apps/*/README.md`, `packages/*/README.md`, `infra/*/README.md` | Good local context; not all linked from `docs/README.md`. |
| **Root README** | [README.md](../../README.md) | Demo + quick start; must stay aligned with `docs/QUICKSTART.md`. |

**Conclusion:** “Poorly organised” is less about deep nesting than **parallel copies** (planning pack) and **mixed v3 / v4 headings** in the same tree.

---

## 3. Phased work

### Phase P0 — Inventory & link audit (1–2 sessions)

- [x] Build a **link inventory**: from `docs/README.md`, follow every internal link; fix 404s and stale workspace names (`uDOS-v3.code-workspace` → **`uDosGo.code-workspace`** where applicable).
- [x] Grep for **`uDOS-family`**, **`uDOS-v3`** (repo URL), **`uDOS-host`** in `docs/` — replace with **uDosGo** / **uDosConnect** / explicit “optional legacy clone” only where still true. *(Intentional legacy mentions may remain in rename aids and this plan.)*
- [x] Confirm **[uDosGo](https://github.com/fredporter/uDosGo)** appears in root [README.md](../../README.md) and [AGENTS.md](../../AGENTS.md) (done in recent passes — re-verify on branch).

**Exit:** `docs/README.md` intro reads **v4 working line** + correct GitHub URL; no broken relative links in hub tables.

---

### Phase P1 — Planning pack resolution (`examples/udos-v3.0.1-planning-pack/`)

**Problem:** Nested `docs/` under `examples/` duplicates top-level `docs/` and will drift.

**Options (pick one per release; document choice in pack README):**

| Option | Action |
| --- | --- |
| **A — Archive label** | Add a bold banner: *frozen snapshot; do not edit; canonical docs are `docs/` at repo root.* Stop copying updates into the pack. |
| **B — Shrink** | Keep only `examples/udos-v3.0.1-planning-pack/README.md` + pointer list; move redundant `docs/*.md` copies to **`.compost/`** or delete if identical to git history. |
| **C — Single symlink** | Not portable on all OSes in Git; **avoid** unless team standardises. |

**Exit:** One paragraph in pack **README** states authority; duplicate files removed or clearly frozen. *(2026-04: banner + pointer; **2026-04-10** — duplicate `docs/*.md` bodies **removed** from git; backups retain snapshots.)*

---

### Phase P2 — `docs/README.md` hub restructure

- [x] Rename top section mentally to **“v4 start here”** while keeping **v3.0.1** demo scope rows where they describe the *demo cut*, not the *dev standard*.
- [x] Add a **short** “Doc layers” subsection: **Canon (locked)** → **Specs / engines** → **Delivery** → **Family handoff (uDosDev)**.
- [x] Ensure [specs/README.md](../specs/README.md) § Family v4 is linked once in hub (avoid duplicate tables).

**Exit:** New contributor hits one page and understands order of reading.

---

### Phase P3 — Package & app README index

- [x] Add a table to `docs/README.md` § 6 or new § “Implementation packages” linking `apps/host`, `apps/thinui`, `packages/hivemind`, `packages/sdk`, `packages/schemas`, `infra/docker` READMEs (one line each).
- [x] Align first lines of those READMEs with **uDos** naming where touched. *(ThinUI + `infra/docker` titles/paths; further package README passes optional.)*

**Exit:** No orphan README that contradicts `docs/ARCHITECTURE.md`.

---

### Phase P4 — Legacy filenames & style guide

- [x] [u_dos_v_3_style_guide.md](../u_dos_v_3_style_guide.md) — keep as stub or merge redirect only; **do not** maintain two full style guides.
- [x] [style-guide.md](../style-guide.md) — canonical; cross-link from ARCHITECTURE and ThinUI README.

**Exit:** One style authority in `docs/`.

---

## 4. `.compost/` and `.local/` policy (reminder)

| Material | Where |
| --- | --- |
| Scratch, experiments, WIP rewrites | **`.local/`** (untracked) |
| Superseded full doc copies, large paste-exports, abandoned restructures | **`.compost/`** (untracked) |
| **Never** duplicate an entire `docs/` subtree inside `.compost` long term — prefer **one** archive file + date stamp in `.compost/README.txt` (optional) |

---

## 5. Relationship to family v4 specs

- **Governance copies** stay in **`uDosConnect/uDosDev/docs/specs/v4/`** — this monorepo **links**, not forks, except where implementation demands inline excerpt.
- **Spatial / storage ecosystem (locked):** [`SPATIAL_STORAGE_ECOSYSTEM_v1.md`](../../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_STORAGE_ECOSYSTEM_v1.md) — **uCell**, **uTile** / **uGrid**, **uCoin**, **uRing**; referenced from the family roadmap and **v4.4.0** consolidated rounds plan for PlaceRef / map / NFC alignment.
- **uSpace / cloud fallback (locked):** [`SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md`](../../uDosConnect/uDosDev/docs/specs/v4/SPATIAL_HOSTING_USPACE_CLOUD_FALLBACK_v1.md) — cloud tiers, view limits, free tier, illustrative **`space.publish`** hooks.
- **Unified data WP / HubSpot / uDos (locked):** [`UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md`](../../uDosConnect/uDosDev/docs/specs/v4/UNIFIED_DATA_SCHEMA_WP_HUBSPOT_uDOS_v1.md) — `wp_users`, `wp_usermeta`, **`$user.*$`**, `wp_udos_activity`, FDX-shaped payloads.
- **TASKS:** [UDGO-R02](../../TASKS.md) tracks spec drift; consolidation **does not** replace that — it makes `docs/` easier to keep aligned.

---

## 6. Success criteria (program)

- [x] `docs/README.md` is the obvious entry; **no** unexplained duplicate doc trees under `examples/` without a banner.
- [x] **TASKS** items **`[UDGO-DOC-CP*]`** can be checked off with PR-sized batches.
- [x] AGENTS + dev-process still accurate for **`.compost/`** use after consolidation.

---

## 7. One-line summary

> **Flatten authority in `docs/`, resolve the planning-pack duplicate tree, link package READMEs from the hub, and park superseded prose in `.compost/` — execute in P0→P4 order.**
