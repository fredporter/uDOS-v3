/**
 * Host process limits for tool execution (v3.0.2 reliability).
 */

export function getToolTimeoutMs(): number {
  const n = Number(process.env.UDOS_TOOL_TIMEOUT_MS);
  if (Number.isFinite(n) && n > 0) return Math.min(n, 600_000);
  return 60_000;
}

/** Max UTF-8 byte length for a single vault write body (after assembly). */
export function getVaultNoteMaxBytes(): number {
  const n = Number(process.env.UDOS_VAULT_NOTE_MAX_BYTES);
  if (Number.isFinite(n) && n >= 1024) return Math.min(n, 50 * 1024 * 1024);
  return 512 * 1024;
}
