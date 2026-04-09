# Repo identity and rename (v4)

**Status:** decision aid (2026-04)  
**Does not** rename the GitHub repository by itself — use the checklist at the end after a chosen name.

---

## uDos — expansion (canonical)

From v3 onward, the stylized name **uDos** expands to **Universal Device Operating Surface** (not “operating system”). **UDOs** (plural caps) is reserved in prose for **User Defined Objects** when that meaning is intended.

---

## What is different about *this* repo (today: `uDOS-v3`)?

| Repo | Role |
| --- | --- |
| **This monorepo** | **Runnable integration:** Host + ThinUI + Hivemind + shared packages + schemas + demo scripts in **one** tree — the **local-first loop** you can `doctor` / `launch`. |
| **uDOS-dev** | **Governance / workflow** only — no runtime. |
| **UniversalSurfaceXD** | **Design + interchange + browser lab** — not the Host runtime. |
| **uDOS-host / uDOS-thinui (v2 siblings)** | **Legacy / extraction references** — not the integration home for the v3-era demo (see [REPO-SPLIT-PREP.md](REPO-SPLIT-PREP.md)). |

So the **main point of difference** is: **this is the *run* repo** — the place the stack actually ships together for the demo. Names like “v3” in the **repository title** now collide with **dev-standard v4** and **UniversalSurfaceXD v4** — hence a rename is reasonable.

---

## Should the new name include “v4”?

Usually **no** for a **repository** name. Put **v4** in:

- `package.json` version (already **4.x** here for dev-standard),
- release tags,
- docs (`SCOPE-v3.0.1.md` can later become `SCOPE-v4.x.md` when the *demo* bumps).

The **GitHub repo name** should be **stable** and **versionless** so clones and CI do not churn every release.

---

## Naming ideas (tradeoffs)

| Name | Pros | Cons |
| --- | --- | --- |
| **`uDO3`** (stylized) | Short, memorable, “three” can mean *generation* | Reads like **semver v3** forever; clashes with “we’re on v4” unless you **define** uDO3 = product generation, not version |
| **`uDOS-run`** | Clear: this repo *runs* the stack | Slightly generic |
| **`uDOS-stack`** | Clear integration | Implies “all of uDOS” — set README scope |
| **`uDOS-local`** | Matches local-first story | May imply only localhost quirks |
| **`udos-integration`** | Neutral, accurate | Long; `udos` npm scope may confuse |
| **`uDOS`** (if available) | Minimal | Often taken; very broad |

**On “uDO3” while at “v4”:** workable only if you **publish one sentence everywhere**: *“uDO3 is the product/generation name; v4 is the dev-standard / release line.”* Otherwise prefer a **versionless** repo name + keep **3** / **4** only in **docs and tags**.

---

## Recommendation (pragmatic)

1. Pick a **versionless** GitHub repo name, e.g. **`uDOS-run`** or **`udos-integration`** (or **`uDO3`** only if you commit to the generation story above).
2. Keep **v3.0.1** as the **named demo tranche** inside docs until you ship the next named cut.
3. Rename **once**; then fix **workspace files**, **clone URLs**, and **cross-links** (see checklist).

---

## Rename checklist (when you execute)

1. **GitHub:** Settings → Repository name → new name (redirects old URL for a while).
2. **Local:** `git remote set-url origin git@github.com:fredporter/<new-name>.git` (or HTTPS).
3. **Family:** `uDOS-v3.code-workspace` → rename file to match (e.g. `uDOS-family.code-workspace`) and update `path` keys if folder names change.
4. **Docs:** global search `uDOS-v3`, `github.com/.../uDOS-v3` in **uDOS-dev**, **UniversalSurfaceXD**, **uDOS-docs**.
5. **npm** `name` in root `package.json`: align with repo (`"name": "udos-run"` etc.) if you want consistency (optional; breaking for workspace users).

---

## Related

- [dev-process-v4.md](dev-process-v4.md) — dev standard v4  
- [workspace-and-family-repos-v4.md](workspace-and-family-repos-v4.md) — sibling repos vs monorepo  
