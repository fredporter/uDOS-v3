/**
 * uDos v4 — Retro BASIC-style command aliases (PEEK/POKE, DIR, TYPE, …).
 * Resolve to modern syntax before dispatch; case-insensitive on the first token.
 * @see docs/specs/RETRO_COMMAND_ALIASES_v4.md
 */

/** Retro token (uppercase) → modern command prefix (first line segment(s), no trailing space). */
export const RETRO_TO_MODERN: Readonly<Record<string, string>> = {
  PEEK: "mcp list",
  DIR: "vault ls",
  TYPE: "vault cat",
  EDIT: "vault edit",
  NEW: "vault new",
  COPY: "vault copy",
  MOVE: "vault move",
  KILL: "vault delete",
  FILES: "vault pick",
  STATUS: "system status",
  HISTORY: "system history",
  DASH: "system dash",
  REBOOT: "system reboot",
  REPAIR: "system repair",
  CLEAN: "clean all",
  TIDY: "tidy all",
  TEST: "shakedown",
  LOAD: "knowledge bank",
  FIND: "knowledge search",
  MEMORY: "knowledge memory",
  THEME: "display theme",
  PALETTE: "display palette",
  VIEW: "display viewport",
  LIST: "config show",
  LET: "config set",
  PRINT: "config get",
  ROLE: "config role",
  LOCATE: "space locate",
  MAP: "space map",
  GOTO: "space travel",
  UNDO: "session undo",
  REDO: "session redo",
  RESTORE: "session restore",
  SAVE: "session save",
  HELP: "help",
  BYE: "quit",
  END: "exit",
  CLS: "clear",
} as const;

/** Ordered rows for help text (modern → retro). */
export const RETRO_HELP_ROWS: ReadonlyArray<{
  modern: string;
  retro: string;
  description: string;
}> = [
  { modern: "mcp list", retro: "PEEK", description: "List MCP tools" },
  { modern: "mcp call", retro: "POKE", description: "Call MCP tool" },
  { modern: "vault ls", retro: "DIR", description: "List files" },
  { modern: "vault cat", retro: "TYPE", description: "Show file" },
  { modern: "vault edit", retro: "EDIT", description: "Edit file" },
  { modern: "vault new", retro: "NEW", description: "Create file" },
  { modern: "vault copy", retro: "COPY", description: "Copy file" },
  { modern: "vault move", retro: "MOVE", description: "Move/rename file" },
  { modern: "vault delete", retro: "KILL", description: "Delete file" },
  { modern: "vault pick", retro: "FILES", description: "File picker" },
  { modern: "system status", retro: "STATUS", description: "System status" },
  { modern: "system history", retro: "HISTORY", description: "Command history" },
  { modern: "system dash", retro: "DASH", description: "Dashboard" },
  { modern: "system reboot", retro: "REBOOT", description: "Restart" },
  { modern: "system repair", retro: "REPAIR", description: "Repair" },
  { modern: "clean all", retro: "CLEAN", description: "Clean all" },
  { modern: "tidy all", retro: "TIDY", description: "Tidy all" },
  { modern: "shakedown", retro: "TEST", description: "System test" },
  { modern: "knowledge bank", retro: "LOAD", description: "Load knowledge" },
  { modern: "knowledge search", retro: "FIND", description: "Search" },
  { modern: "knowledge memory", retro: "MEMORY", description: "Memory" },
  { modern: "display theme", retro: "THEME", description: "Theme" },
  { modern: "display palette", retro: "PALETTE", description: "Colour palette" },
  { modern: "display viewport", retro: "VIEW", description: "Viewport" },
  { modern: "config show", retro: "LIST", description: "List config" },
  { modern: "config set", retro: "LET", description: "Set config" },
  { modern: "config get", retro: "PRINT", description: "Get config" },
  { modern: "config role", retro: "ROLE", description: "Show role" },
  { modern: "space locate", retro: "LOCATE", description: "Set location" },
  { modern: "space map", retro: "MAP", description: "Show map" },
  { modern: "space travel", retro: "GOTO", description: "Travel" },
  { modern: "session undo", retro: "UNDO", description: "Undo" },
  { modern: "session redo", retro: "REDO", description: "Redo" },
  { modern: "session restore", retro: "RESTORE", description: "Restore session" },
  { modern: "session save", retro: "SAVE", description: "Save session" },
  { modern: "help", retro: "HELP", description: "Help" },
  { modern: "quit", retro: "BYE", description: "Exit" },
  { modern: "exit", retro: "END", description: "Exit" },
  { modern: "clear", retro: "CLS", description: "Clear screen" },
];

function kvToFlag(kv: string): string {
  const eq = kv.indexOf("=");
  if (eq < 0) return `--${kv}`;
  const key = kv.slice(0, eq).trim();
  let val = kv.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  if (/[\s"\\]/.test(val)) {
    return `--${key} ${JSON.stringify(val)}`;
  }
  return `--${key} ${val}`;
}

/**
 * `POKE vault.search, query="project"` → `mcp call vault.search --query project`
 * (comma-separated args after the tool id).
 */
export function expandPokeLine(rest: string): string {
  const t = rest.trim();
  if (!t) return "mcp call";
  const parts = t
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const tool = parts[0]!;
  const kvs = parts.slice(1);
  const flags = kvs.map(kvToFlag);
  return ["mcp", "call", tool, ...flags].join(" ");
}

export type RetroResolveResult = {
  line: string;
  wasRetroAlias: boolean;
  canonicalRetro?: string;
};

/**
 * If the first token is a retro alias, rewrite to the modern command line.
 * `POKE` is expanded with {@link expandPokeLine} on the remainder.
 */
export function resolveRetroCommandLine(input: string): RetroResolveResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { line: input, wasRetroAlias: false };
  }
  const firstSpace = /\s/.exec(trimmed);
  const firstEnd = firstSpace ? firstSpace.index! : trimmed.length;
  const firstRaw = trimmed.slice(0, firstEnd);
  const rest = trimmed.slice(firstEnd).trim();
  const key = firstRaw.toUpperCase();

  if (key === "POKE") {
    return {
      line: expandPokeLine(rest),
      wasRetroAlias: true,
      canonicalRetro: "POKE",
    };
  }

  const modern = RETRO_TO_MODERN[key];
  if (modern === undefined) {
    return { line: input, wasRetroAlias: false };
  }

  const combined = rest ? `${modern} ${rest}` : modern;
  return {
    line: combined,
    wasRetroAlias: true,
    canonicalRetro: key,
  };
}

/** Retro command names (uppercase), sorted — for tab completion. */
export function listRetroAliasNames(): string[] {
  const names = new Set<string>(Object.keys(RETRO_TO_MODERN));
  names.add("POKE");
  return [...names].sort((a, b) => a.localeCompare(b));
}

const HELP_INNER = 78;

function helpRow(text: string): string {
  const raw =
    text.length > HELP_INNER ? text.slice(0, HELP_INNER - 1) + "…" : text;
  return `║${raw.padEnd(HELP_INNER)}║`;
}

/**
 * Full `help`-style banner with modern → retro columns (boxed UTF-8).
 */
export function formatRetroHelpBanner(): string {
  const modW = Math.max(...RETRO_HELP_ROWS.map((r) => r.modern.length), 16);
  const retW = Math.max(...RETRO_HELP_ROWS.map((r) => r.retro.length), 10);

  const lines: string[] = [];
  const rule = "═".repeat(HELP_INNER);
  lines.push(`╔${rule}╗`);
  lines.push(
    helpRow("  📚 uDos v4 COMMAND REFERENCE (modern → retro)"),
  );
  lines.push(`╠${rule}╣`);
  lines.push(helpRow("  💾 Core commands (modern → retro)"));
  lines.push(helpRow(`  ${"─".repeat(74)}`));

  for (const r of RETRO_HELP_ROWS) {
    const body = `  ${r.modern.padEnd(modW)}  →  ${r.retro.padEnd(retW)}  -  ${r.description}`;
    lines.push(helpRow(body));
  }

  lines.push(`╠${rule}╣`);
  lines.push(helpRow("  💡 help <command>  — detailed help for a command"));
  lines.push(helpRow("  🔍 help search <term>  — search commands"));
  lines.push(helpRow("  📖 Docs: https://udos.space/docs"));
  lines.push(`╚${rule}╝`);
  return lines.join("\n");
}
