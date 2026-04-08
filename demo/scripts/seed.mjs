#!/usr/bin/env node
/**
 * Seeds a demo scenario by POSTing a sample file to the Host.
 *
 * Env:
 *   UDOS_HOST_URL — Host base URL (default http://127.0.0.1:8787)
 *
 * Flags:
 *   --dry-run — print paths and payload preview only; no HTTP
 *   --input <path> — sample file (absolute, cwd-relative, or under demo/ if relative)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demoRoot = path.join(__dirname, "..");
const sampleWorkspace = path.join(demoRoot, "sample-workspace");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

let inputRel = path.join("sample-inputs", "gold-path-note.txt");
const inputIdx = args.indexOf("--input");
if (inputIdx !== -1 && args[inputIdx + 1]) {
  inputRel = args[inputIdx + 1];
}

function resolveInputFile(rel) {
  if (path.isAbsolute(rel)) return rel;
  const fromDemo = path.join(demoRoot, rel);
  if (fs.existsSync(fromDemo)) return fromDemo;
  const fromCwd = path.join(process.cwd(), rel);
  if (fs.existsSync(fromCwd)) return fromCwd;
  return fromDemo;
}

const inputFile = resolveInputFile(inputRel);

const base = (process.env.UDOS_HOST_URL ?? "http://127.0.0.1:8787").replace(
  /\/$/,
  ""
);

fs.mkdirSync(sampleWorkspace, { recursive: true });

let raw;
try {
  raw = fs.readFileSync(inputFile, "utf8").trim();
} catch (e) {
  console.error("[demo:seed] cannot read", inputFile, e);
  process.exit(1);
}

if (!raw) {
  console.error("[demo:seed] empty input file:", inputFile);
  process.exit(1);
}

if (dryRun) {
  console.log("[demo:seed] dry-run — no request sent");
  console.log("[demo:seed] UDOS_HOST_URL →", base);
  console.log("[demo:seed] input file:", inputFile);
  console.log("[demo:seed] POST →", `${base}/api/v1/feed/items`);
  console.log("[demo:seed] sample workspace:", sampleWorkspace);
  console.log(
    "[demo:seed] body preview:",
    raw.slice(0, 240) + (raw.length > 240 ? "…" : "")
  );
  process.exit(0);
}

let dataRoot = "(unknown)";
try {
  const h = await fetch(`${base}/api/v1/health`, {
    headers: { Accept: "application/json" },
  });
  if (h.ok) {
    const j = await h.json();
    if (j && typeof j.dataRoot === "string") {
      dataRoot = j.dataRoot;
    }
  }
} catch {
  // continue; POST may still work for LAN edge cases
}

const res = await fetch(`${base}/api/v1/feed/items`, {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ raw, source: "demo-seed" }),
});

const text = await res.text();
if (!res.ok) {
  console.error("[demo:seed] POST failed", res.status, text);
  process.exit(1);
}

let body;
try {
  body = JSON.parse(text);
} catch {
  console.error("[demo:seed] invalid JSON:", text.slice(0, 200));
  process.exit(1);
}

const id = body && typeof body.id === "string" ? body.id : "?";
const classification =
  body && typeof body === "object" && body.classification && typeof body.classification === "object"
    ? body.classification
    : {};
const stem =
  typeof classification.vaultStem === "string"
    ? classification.vaultStem
    : "gold";
const vaultRel = `vault/${stem}-${id}.md`;

console.log("[demo:seed] ok");
console.log("[demo:seed] Host data root:", dataRoot);
console.log("[demo:seed] feed id:", id);
console.log("[demo:seed] classification intent:", classification.intent ?? "(none)");
console.log("[demo:seed] vault file:", path.join(dataRoot, vaultRel));
console.log("[demo:seed] sample workspace:", sampleWorkspace);
