# Quickstart — first-time setup

This page is the install + first-run path for a brand-new machine.

## Prerequisites

- Node.js `>=20` (`.nvmrc` is `22`)
- npm
- Docker Desktop + Compose v2 (only for WordPress / demo steps 8-9)

Optional (if you use nvm):

```bash
nvm use
```

## Install once

From repo root:

```bash
npm install
npm run doctor
```

`doctor` verifies Node/npm and reports Docker availability.

## First run (core demo)

```bash
npm run launch:open
```

This starts:

- Host: `http://127.0.0.1:8787`
- ThinUI: `http://127.0.0.1:5173`

Use `npm run launch` if you do not want the browser opened automatically.

## Verify the local loop

In a second terminal:

```bash
npm run demo:seed
```

Optional second scenario (email-thread intake): `npm run demo:seed:inbox` → vault file `thread-<feed-id>.md` (see [DEMO.md](DEMO.md) scenario B).

Expected:

- Feed item appears in ThinUI
- Tasks complete in Task panel
- Output panel shows `feed.*`, `tool.*`, `review.pass`
- A vault file appears at `.udos-data/vault/gold-<feed-id>.md`

## Optional WordPress setup (steps 8-9)

```bash
npm run wp:up
npm run demo:wp-bootstrap
```

Then:

1. Open `http://127.0.0.1:8080/wp-login.php`
2. Log in as Subscriber `demo` (password from terminal output or `demo/.wp-demo.env`)
3. Open `http://127.0.0.1:8080/empire-local-restricted/`
4. Run `npm run demo:wp-link` to link to `demo-contact-001`

Reference env file: `demo/wp-demo.env.example`.

## Convenience launchers

- macOS: `uDOS-Dev.command` / `uDOS-Dev+WP.command`
- Windows: `uDOS-Dev.cmd` / `uDOS-Dev+WP.cmd`

## Common setup options

- **External data root**

```bash
export UDOS_DATA_ROOT=/path/to/udos-data
npm run storage:init
```

- **ThinUI local overrides**: copy `apps/thinui/.env.example` to `apps/thinui/.env.local` and edit values.

## Troubleshooting

- Port conflict on `5173` or `8787`: stop the conflicting process.
- WordPress unreachable: ensure Docker is running, then `npm run wp:logs`.
- Bootstrap failure: wait for `http://127.0.0.1:8080`, then rerun `npm run demo:wp-bootstrap`.

## Documentation

After setup, use **[README.md](README.md)** for the full doc tree (specifications hub, style guide, architecture, demo).
