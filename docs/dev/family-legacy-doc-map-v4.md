# Family docs — legacy layers, drift, and `.compost` (v4)

**Role:** One map for **where truth lives**, what is **historical archive**, what is **optional sibling** (different GitHub repo), and how to **retire** replaced prose without polluting `docs/`.

**Related:** [dev-process-v4.md](dev-process-v4.md) (`.local` / `.compost`), [docs-v4-consolidation-plan.md](docs-v4-consolidation-plan.md), [repo-identity-and-rename-v4.md](../repo-identity-and-rename-v4.md).

---

## 1. Definitions

| Term | Meaning |
| --- | --- |
| **Authoritative** | Current contract for new work — edit here when behaviour changes. |
| **Archive (tracked)** | Kept in-repo on purpose — **do not `.compost`**; may use banners (“historical”, “v2”). |
| **Drift** | Stale names (`uDOS-family`, `uDOS-v3` URL) or wrong paths — fix when touching the file, or file a TASKS item. |
| **Optional sibling** | Another **repository** (e.g. **`uDOS-host`** contracts) — not the same as **uDos-Go** integration; links OK when the distinction is stated. |
| **`.compost/`** | **Untracked** local decay — copy superseded files here before deleting or replacing; never commit `.compost/`. |

---

## 2. By location (~/Code family)

### uDosGo (this monorepo)

| Location | Class | Notes |
| --- | --- | --- |
| `docs/**` | **Authoritative** | v4 working line; v3.0.1 is a *demo cut* label, not the dev-standard version. |
| `examples/udos-v3.0.1-planning-pack/docs/**` | **Pointer only** (2026-04) | Duplicate bodies removed from git; [`README.md`](../../examples/udos-v3.0.1-planning-pack/docs/README.md) points at repo-root `docs/`. Restore old snapshots from backup if needed. |
| Mentions of `uDOS-host` / `uDOS-thinui` in `docs/` | **Intentional** | Future **extraction** targets per [REPO-SPLIT-PREP.md](../REPO-SPLIT-PREP.md) — not drift. |

### uDosConnect

| Location | Class | Notes |
| --- | --- | --- |
| `uDosDev/docs/specs/v4/**` | **Authoritative** | Governance copies of v4 specs (Obsidian → git handoff). |
| `uDosDev/docs/**` (non-v4) | **Mixed** | Some files still say `~/Code/uDOS-family/` — map to `~/Code/uDosConnect/` + `~/Code/uDosGo/` when editing ([family-workspace-layout.md](../../../uDosConnect/docs/family-workspace-layout.md)). |
| `v2-reference/**` | **Tracked archive** | **Do not `.compost`** — intentional v2 snapshot; teach new work from v4 paths instead. |
| `uDosDev/@dev/inbox/**` | **Scratch / intake** | Gitignored or local; not canonical product docs. |
| `uDosDev/workspaces/archive/v2/**` | **Archive** | Old `.code-workspace` era — reference only. |

### UniversalSurfaceXD

| Location | Class | Notes |
| --- | --- | --- |
| `docs/**`, `interchange/**` | **Authoritative** | USXD lab + interchange. |
| `npm run ux:validate-udos-host-contracts` | **Optional** | Validates **`fredporter/uDOS-host`** contract JSON — **orthogonal** to **uDos-Go**; resolver tries `../uDOS-host` or legacy nested path. Documented in distribution docs — not an error. |
| **Drift** | TASKS **[USXD-R00]**, **[USXD-R11]** | Retire stale `uDOS-family` paths in done-items; prefer **uDos-Go** where integration is meant. |

### SonicScrewdriver

| Location | Class | Notes |
| --- | --- | --- |
| `README.md`, `docs/**`, `wiki/**` | **Authoritative** | Many **`uDOS-host`** / **`uDOS-family`** mentions describe the **Linux host runtime repo** and historical layout — **separate product** from **uDos-Go**. |
| **Drift** | Optional doc sweep | When describing “integration monorepo”, prefer **uDos-Go** / **`~/Code/uDosGo/`**; keep **`uDOS-host`** where the actual host repo is meant. |

### uChatDown

| Location | Class | Notes |
| --- | --- | --- |
| `TASKS.md`, `docs/**` | **Authoritative** | Fewer legacy strings in quick scan; align with uDosDev **CHATDOWN_v4** via spec hub in uDosGo [specs/README.md](../specs/README.md). |

### `~/Code/` root (not a git repo)

| File | Class | Notes |
| --- | --- | --- |
| `Dev-tasks.md`, `Dev-workflow.md`, `Dev-checklist.md` | **Universal UDN spec** | Large, project-agnostic **Task / UDN** references — **not** obsolete; do **not** move to `.compost` without an explicit replacement home. |
| `WORKSPACES.md` | **Authoritative** | Multi-root picker table — maintain when workspaces change. |
| **Stray duplicates** | If you copy-paste an entire repo `README` here | **Candidate for `~/Code/.compost/`** after confirming the repo copy is canonical. |

---

## 3. Names that are *not* always errors

| String | When it is correct |
| --- | --- |
| **`uDOS-host`** | The separate GitHub repo for host runtime / contract JSON — not **uDos-Go**. |
| **`uDOS-v3`** (URL) | Historical URL in rename docs or migration notes only. |
| **`Syncdown-app`** | Historical folder name for the native app; **clone** **`~/Code/uMacDown`**. uDosDev [SYNCDOWN_v4.md](../../../uDosConnect/uDosDev/docs/specs/v4/SYNCDOWN_v4.md) may still say “Macdown” in prose until that pack is revised. |
| **`uDos-Go`** | GitHub display / link for integration monorepo ([uDosGo](https://github.com/fredporter/uDosGo)). |

---

## 4. Maintainer checklist (repeat when specs or layouts shift)

1. **Grep** (from each repo root, when touching docs):
   - `uDOS-family`, `uDOS-v3` (as path), `syncdown` (lowercase folder), `sonic-v1`
2. **uDosGo:** run [specs/README.md](../specs/README.md) inventory vs [uDosDev `specs/v4/README.md`](../../../uDosConnect/uDosDev/docs/specs/v4/README.md) when the latter changes.
3. **UniversalSurfaceXD:** advance [TASKS.md](../../../UniversalSurfaceXD/TASKS.md) **USXD-R00** / **USXD-R11** when editing distribution / vocabulary docs.
4. **`.compost` workflow:** before deleting a superseded **tracked** doc, `cp` into `.compost/` with a dated subfolder name, then remove or stub the original in one commit.

5. **Automated hint scan (uDosGo):** `npm run doc:drift` — prints matches for legacy hints under `docs/` + root `README.md` / `AGENTS.md` / `TASKS.md` (allowlists rename/consolidation meta files). **Last baseline:** 2026-04-11 — uDosGo had **no** stray hits outside meta; re-run after large doc edits.

---

## 5. Compost *candidates* (do not batch-delete without review)

- **Superseded full-file rewrites** of a doc that still lives under `docs/` — keep one canonical file; park the old full copy under `.compost/` locally.
- **Accidental duplicates** at `~/Code/` root (e.g. second copy of a repo README) — move to **`~/Code/.compost/archive-YYYY-MM/`** after confirming.
- **Planning pack** — duplicate `docs/*.md` bodies **removed** from git (2026-04); pointer-only [`examples/udos-v3.0.1-planning-pack/docs/README.md`](../../examples/udos-v3.0.1-planning-pack/docs/README.md).

**Never compost:** `uDosConnect/v2-reference/` (tracked archive), uDosDev **`specs/v4/`**, or the universal **`Dev-*.md`** UDN specs unless replaced by a newer canonical path.

---

## 6. Operator assessment — needed vs inherited (2026-04)

| Item | Verdict | Action |
| --- | --- | --- |
| **`~/Code/Dev-tasks.md` / `Dev-workflow.md` / `Dev-checklist.md`** | **Keep** (or one canonical home later) | Universal **UDN / Task** spec (~2.5k lines combined) — **not** a stale duplicate of `uDosGo/docs/dev-checklist-v4.md` (that file is the **short** monorepo checklist). Do not delete unless you merge into a single repo and update all references. |
| **`~/Code/WORKSPACES.md`** | **Keep** | Current multi-root picker; small and maintained. |
| **`uDosGo` planning pack nested `docs/*.md` (duplicates)** | **Not needed in git** | **Removed** from the repo; canonical **`docs/`** only. Backups retain historical text. |
| **`uDosConnect/v2-reference/` (~74MB)** | **Keep in tree** | **Tracked archive** — intentional; not “junk.” Do not delete to save space without a deliberate archive policy. |
| **`uDosConnect/.../uDosDev/@dev/inbox/`** | **Local / submodule scratch** | Often large experimental drops (e.g. v2.6 trees). Safe to delete **locally** if you do not use them; confirm submodule rules before nuking inside **`uDosDev`**. |
| **Legacy names in Sonic / USXD docs (`uDOS-host`, `uDOS-family`)** | **Context-dependent** | Often **correct** (separate host repo). Tidy wording only when you touch those files — see [TASKS.md](../../TASKS.md) **`[UDGO-R03]`**. |
