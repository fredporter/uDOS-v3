# Demo — uDOS v3 (gold path + inbox thread)

## Purpose

One **gold-path** flow for README, screenshots, a short launch video, contributor onboarding, and PR positioning.

---

## The loop (canonical)

1. User submits an item (URL, note, email-like text, or short request).
2. **ThinUI** shows it in **Feed**.
3. **Hivemind** classifies (Scout) and creates tasks (Planner).
4. **Host** executes steps (Maker tools: fetch/parse, format, write).
5. Files and results are written to **vault**; **events** append to log.
6. If the scenario includes identity: **WordPress** updates linked contact/user state via **`udos-empire-local`**.
7. **ThinUI** shows outputs, status, provider/budget summary, and next actions (Reviewer outcome).

---

## Example input

Paste any of:

- A **URL**
- A **note**
- **Email-like** text
- A plain request, e.g.:

> Research this topic, create a markdown note, extract 3 tasks, and save it locally.

---

## Scenario B — inbox / email-thread intake (v3.0.2)

**Purpose:** Same Host tool chain and schemas as the gold path; Scout picks a different **intent**, **labels**, **task titles**, and **vault file stem** when the raw text looks like an email thread.

**Detection (deterministic stub):** Hivemind classifies as `email_thread_intake` when any of:

- Lines look like **`From:`** and **`Subject:`** headers, or
- A line matches **`On … wrote:`** (common reply wrapper), or
- There are **three or more** lines starting with **`>`** (quoted content).

**Outputs:**

| Output | Expected |
|--------|----------|
| Classification | `intent: email_thread_intake`, label `scenario:inbox-thread`, `classification.vaultStem: thread` |
| Vault file | `.udos-data/vault/thread-{feed-uuid}.md` (not `gold-*`) |
| Tasks | Four steps with inbox-oriented titles; same `toolId`s as scenario A |

**CLI (Host running):**

```bash
npm run demo:seed:inbox
# or
node demo/scripts/seed.mjs --input sample-inputs/inbox-thread.txt
```

Use `npm run demo:seed:inbox:dry` or `--dry-run` to verify paths only.

**ThinUI:** Paste the contents of `demo/sample-inputs/inbox-thread.txt` into the Feed panel. Confirm **Feed** shows `email_thread_intake` (in classification / intent where surfaced) and the **vault** list includes a `thread-*.md` file.

---

## Expected visible outputs (minimum)

| Output | Where / how |
|--------|-------------|
| One **markdown file** in vault | Path visible in Output panel + on disk under `/udos-data/vault/...` |
| **Extracted tasks** (e.g. 3) | Task graph / queue panel |
| **Event log trail** | Output / event panel + `/udos-data/events/` (implementation-defined format) |
| **Provider + budget summary** | Output panel (last model/provider, cumulative cost or token estimate, threshold message if hit) |
| **Graph/queue state** | ThinUI task panel: ready / blocked / running / done |

That set is enough for external communication without promising the full product.

---

## Operator checklist

Use this as the script for video and QA.

**Prereq:** complete [`QUICKSTART.md`](QUICKSTART.md) once at the repo root (`uDOS-v3/`).

1. **Start Host + ThinUI** (from repo root): `npm run launch` or `npm run dev` — Host `http://127.0.0.1:8787`, ThinUI `http://127.0.0.1:5173`. Optional: `npm run launch:wp` or `npm run wp:up` for WordPress at `http://127.0.0.1:8080` (Docker).
2. Open ThinUI; confirm **Host health** and (if WP is up) **WordPress bridge** JSON in the Output panel.
3. **Gold path via CLI:** with Host running, `npm run demo:seed` (or `node demo/scripts/seed.mjs --dry-run` to verify paths only). Env `UDOS_HOST_URL` overrides the Host base URL. Alternatively paste text from `demo/sample-inputs/gold-path-note.txt` into the Feed panel.
4. Observe **Feed** (classification intent), **Task graph** (four tasks → `done`), and **Output** (`feed.*`, `provider.*`, `tool.*`, `review.pass`).
5. Confirm vault file on disk: `.udos-data/vault/gold-<feed-uuid>.md` under the Host data root (see `GET /api/v1/health` → `dataRoot`).
6. **Scenario B (optional):** run `npm run demo:seed:inbox` or paste `demo/sample-inputs/inbox-thread.txt` in ThinUI. Confirm **`thread-<feed-uuid>.md`** under `vault/` and task titles that mention the thread / inbox (still four tools, all `done`).
7. **WordPress (optional):** activate **uDOS Empire Local**, create/log in as a **subscriber**, open `/empire-local-restricted/`. Link user to `demo-contact-001` via `POST /wp-json/udos-empire/v1/me/link` (authenticated), then `PATCH` contact consent as needed (see plugin README).

### Steps 8–9 (automated prep)

After `npm run wp:up` and the site responds in the browser:

1. **`npm run demo:wp-bootstrap`** — WP-CLI in Docker: installs core if needed, sets permalinks, activates **udos-empire-local**, creates Subscriber **`demo`**, writes **`demo/.wp-demo.env`** (gitignored) with an **application password** for REST when WP-CLI supports it.
2. **Step 8 (browser):** open `http://127.0.0.1:8080/wp-login.php` — log in as **`demo`** / **`demoLocal-DEMO-ONLY`** (defaults; override with env vars before bootstrap). Open **`/empire-local-restricted/`** and confirm gated content.
3. **Step 9 (CLI):** **`npm run demo:wp-link`** — loads `demo/.wp-demo.env` and `POST`s `{"contactId":"demo-contact-001"}` to `/me/link`, then prints **`GET /me/contact`**. Override base URL with `UDOS_WP_BASE_URL` if needed.

Defaults and env keys: [`demo/wp-demo.env.example`](../demo/wp-demo.env.example). Admin user (for WP dashboard) defaults to **`udosadmin`** / **`udosAdminLocal-DEMO-ONLY`**.

---

## Definition of done (9 steps)

v3.0.1 is **done** when someone can:

1. Start the local system.
2. Open ThinUI.
3. Submit **one** input.
4. Watch Hivemind **create tasks**.
5. Watch Host **execute** them.
6. See **files** written into the vault.
7. See **event history** and **provider usage**.
8. Access a **restricted local WP page** with login.
9. Observe a linked **Empire contact / WP user** flow.

Detailed milestone mapping: [MILESTONES.md](MILESTONES.md). Backlog / closure notes: [BACKLOG.md](BACKLOG.md).

---

## Screenshot / video checklist (M4)

Use for README, social, or a short launch video. Storing files in the repo is optional (e.g. `docs/media/` if you add them).

1. **ThinUI — Feed:** at least one item with classification intent visible.
2. **ThinUI — Tasks:** graph/queue with states (e.g. `done`) and optional **Rerun** control.
3. **ThinUI — Output:** event log, provider/budget strip, vault files list.
4. **WordPress — Restricted page:** logged-out (no access) vs logged-in Subscriber with content.
5. **Vault on disk:** Finder or terminal listing of `.udos-data/vault/gold-*.md` and, after scenario B, `thread-*.md` (path from Host `GET /health` → `dataRoot`).
