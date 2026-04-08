import type { ToolContext } from "./tools.js";
import { runToolAsync } from "./tools.js";
import { getToolTimeoutMs } from "./host-env.js";
import { ToolExecutionError } from "./tool-errors.js";

export async function runToolWithTimeout(
  ctx: ToolContext
): Promise<{ outputRefs: string[] }> {
  const ms = getToolTimeoutMs();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(
        new ToolExecutionError(
          "tool_timeout",
          `Tool exceeded UDOS_TOOL_TIMEOUT_MS (${ms}ms)`,
          true
        )
      );
    }, ms);
  });
  try {
    return await Promise.race([runToolAsync(ctx), timeoutPromise]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}
