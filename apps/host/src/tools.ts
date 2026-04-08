import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { FeedItem, Task } from "./storage.js";
import { getVaultNoteMaxBytes } from "./host-env.js";
import { ToolExecutionError } from "./tool-errors.js";

export type ToolContext = {
  dataRoot: string;
  feed: FeedItem;
  task: Task;
  vaultRelPath: string;
};

function vaultAbs(dataRoot: string, rel: string): string {
  return path.join(dataRoot, "vault", rel);
}

function assertBodyWithinCap(body: string, label: string): void {
  const max = getVaultNoteMaxBytes();
  const bytes = Buffer.byteLength(body, "utf8");
  if (bytes > max) {
    throw new ToolExecutionError(
      "resource_cap_exceeded",
      `${label} exceeds UDOS_VAULT_NOTE_MAX_BYTES (${max} bytes; got ${bytes})`,
      false
    );
  }
}

async function readUtf8IfExists(abs: string): Promise<string> {
  try {
    return await readFile(abs, "utf8");
  } catch (e) {
    const code =
      e && typeof e === "object" && "code" in e
        ? (e as NodeJS.ErrnoException).code
        : "";
    if (code === "ENOENT") return "";
    throw e;
  }
}

/**
 * Async vault tools (timeout applied in `tool-runner.ts`).
 */
export async function runToolAsync(
  ctx: ToolContext
): Promise<{ outputRefs: string[] }> {
  const { dataRoot, feed, task } = ctx;
  const rel = ctx.vaultRelPath;
  const abs = vaultAbs(dataRoot, rel);

  try {
    await mkdir(path.dirname(abs), { recursive: true });

    switch (task.toolId) {
      case "vault.write_note": {
        const intent =
          feed.classification && typeof feed.classification.intent === "string"
            ? feed.classification.intent
            : "";
        const title =
          intent === "email_thread_intake"
            ? `# Inbox thread capture`
            : `# Gold-path note`;
        const body = [
          title,
          ``,
          `**Feed:** ${feed.id}`,
          ``,
          feed.raw.trim(),
          ``,
        ].join("\n");
        assertBodyWithinCap(body, "vault.write_note");
        await writeFile(abs, body, "utf8");
        return { outputRefs: [`vault/${rel}`] };
      }
      case "vault.append_summary": {
        const prior = await readUtf8IfExists(abs);
        const snippet = feed.raw.trim().slice(0, 320);
        const block = [
          prior,
          ``,
          `## Summary`,
          ``,
          snippet.length < feed.raw.trim().length
            ? `${snippet}…`
            : snippet,
          ``,
        ].join("\n");
        assertBodyWithinCap(block, "vault.append_summary");
        await writeFile(abs, block, "utf8");
        return { outputRefs: [`vault/${rel}`] };
      }
      case "vault.append_task_bullets": {
        const prior = await readUtf8IfExists(abs);
        const topic = feed.raw.trim().slice(0, 80);
        const topicEllipsis = feed.raw.trim().length > 80 ? "…" : "";
        const block = [
          prior,
          ``,
          `## Extracted tasks (3)`,
          ``,
          `- [ ] Research and gather sources on: _${topic}${topicEllipsis}_`,
          `- [ ] Write or update the markdown note under vault with conclusions`,
          `- [ ] Extract and track follow-up actions in ThinUI / Host`,
          ``,
        ].join("\n");
        assertBodyWithinCap(block, "vault.append_task_bullets");
        await writeFile(abs, block, "utf8");
        return { outputRefs: [`vault/${rel}`] };
      }
      case "review.signoff": {
        const prior = await readUtf8IfExists(abs);
        if (prior.includes("\n## Reviewer\n")) {
          return { outputRefs: [`vault/${rel}`] };
        }
        const block = [
          prior,
          ``,
          `## Reviewer`,
          ``,
          `**Status:** pass`,
          ``,
          `Stub reviewer: output meets demo bar for v3.0.1 gold path.`,
          ``,
        ].join("\n");
        assertBodyWithinCap(block, "review.signoff");
        await writeFile(abs, block, "utf8");
        return { outputRefs: [`vault/${rel}`] };
      }
      default:
        throw new ToolExecutionError(
          "unknown_tool",
          `unknown_tool:${task.toolId}`,
          false
        );
    }
  } catch (e) {
    if (e instanceof ToolExecutionError) throw e;
    const msg = e instanceof Error ? e.message : String(e);
    throw new ToolExecutionError("io_error", msg, true);
  }
}

const VAULT_STEM_RE = /^[a-z][a-z0-9_-]{0,31}$/;

/**
 * Resolves `vault/{stem}-{feedId}.md` from persisted feed classification (`vaultStem`).
 * Invalid or missing values fall back to `gold`.
 */
export function vaultRelPathForFeed(
  feedId: string,
  classification: Record<string, unknown> | undefined
): string {
  const raw =
    classification && typeof classification.vaultStem === "string"
      ? classification.vaultStem.trim().toLowerCase()
      : "gold";
  const stem = VAULT_STEM_RE.test(raw) ? raw : "gold";
  return `${stem}-${feedId}.md`;
}
