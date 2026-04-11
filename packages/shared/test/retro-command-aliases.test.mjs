import { test } from "node:test";
import assert from "node:assert/strict";
import {
  expandPokeLine,
  formatRetroHelpBanner,
  listRetroAliasNames,
  resolveRetroCommandLine,
} from "../dist/retro-command-aliases.js";

test("PEEK → mcp list (case-insensitive)", () => {
  assert.deepEqual(resolveRetroCommandLine("PEEK"), {
    line: "mcp list",
    wasRetroAlias: true,
    canonicalRetro: "PEEK",
  });
  assert.deepEqual(resolveRetroCommandLine("peek"), {
    line: "mcp list",
    wasRetroAlias: true,
    canonicalRetro: "PEEK",
  });
});

test("DIR with args appends to vault ls", () => {
  const r = resolveRetroCommandLine("DIR docs/");
  assert.equal(r.line, "vault ls docs/");
  assert.equal(r.wasRetroAlias, true);
  assert.equal(r.canonicalRetro, "DIR");
});

test("POKE expands comma-separated kwargs", () => {
  assert.equal(
    expandPokeLine('vault.search, query="project"'),
    'mcp call vault.search --query project',
  );
  assert.equal(
    expandPokeLine("vault.search, query=project"),
    "mcp call vault.search --query project",
  );
});

test("POKE line resolves", () => {
  const r = resolveRetroCommandLine('POKE vault.search, query="x"');
  assert.equal(r.line, "mcp call vault.search --query x");
  assert.equal(r.canonicalRetro, "POKE");
});

test("listRetroAliasNames includes POKE and sorts", () => {
  const n = listRetroAliasNames();
  assert.ok(n.includes("POKE"));
  assert.ok(n.includes("PEEK"));
  assert.deepEqual([...n], [...n].sort((a, b) => a.localeCompare(b)));
});

test("formatRetroHelpBanner is boxed and mentions PEEK", () => {
  const s = formatRetroHelpBanner();
  assert.match(s, /╔═+/);
  assert.match(s, /PEEK/);
  assert.match(s, /mcp list/);
});
