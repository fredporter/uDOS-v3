# Demo assets (v3.0.1)

- **`sample-inputs/`** — paste-ready prompts and URLs for the gold-path scenario.
- **`sample-workspace/`** — optional pre-seeded vault layout documentation or empty placeholder.
- **`scripts/seed.mjs`** — `npm run demo:seed` POSTs `sample-inputs/gold-path-note.txt` by default. **`--input <path>`** selects another file (resolved under `demo/` or cwd). **`npm run demo:seed:inbox`** posts `sample-inputs/inbox-thread.txt` (email-thread scenario → `thread-*.md` vault). `UDOS_HOST_URL` overrides the Host base (default `http://127.0.0.1:8787`). Use `--dry-run` to print paths without HTTP.
- **`scripts/wp-bootstrap.mjs`** — `npm run demo:wp-bootstrap` (Docker **wpcli** profile): WordPress core install, permalinks, activate **udos-empire-local**, Subscriber **`demo`**, writes **`demo/.wp-demo.env`** (gitignored).
- **`scripts/wp-link-demo.mjs`** — `npm run demo:wp-link`: REST link to **`demo-contact-001`** using application password from `.wp-demo.env`.
- **`wp-demo.env.example`** — documented defaults / env keys for steps 8–9.

See [../docs/DEMO.md](../docs/DEMO.md) for the full operator script (including steps 8–9).
