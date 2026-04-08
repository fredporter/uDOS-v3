import { randomUUID } from "node:crypto";
import { scoutAndPlan } from "@udos/hivemind";
import type { FeedItem, Stores, Task, TaskState } from "./storage.js";
import { defaultVaultRelPath } from "./tools.js";
import { runToolWithTimeout } from "./tool-runner.js";
import { normalizeToolFailure } from "./tool-errors.js";

const VERSION_TAG = "udos-host-pipeline/0.6.0";

function nowIso(): string {
  return new Date().toISOString();
}

function push(
  stores: Stores,
  partial: Omit<import("./storage.js").EventRecord, "schemaVersion" | "id" | "timestamp"> & {
    id?: string;
    timestamp?: string;
  }
): void {
  stores.appendEvent({
    schemaVersion: "1.0.0",
    id: partial.id ?? randomUUID(),
    timestamp: partial.timestamp ?? nowIso(),
    type: partial.type,
    feedId: partial.feedId,
    taskId: partial.taskId,
    actor: partial.actor,
    payload: { ...partial.payload, pipeline: VERSION_TAG },
    severity: partial.severity ?? "info",
  });
}

function recordToolFailure(
  stores: Stores,
  feedId: string,
  taskId: string,
  toolId: string,
  failure: { code: string; message: string; retryable: boolean },
  extraPayload?: Record<string, unknown>
): void {
  const fresh = stores.readTasks();
  const tr = fresh.find((x) => x.id === taskId);
  if (tr) {
    tr.state = "failed";
    tr.error = failure.message;
    tr.errorCode = failure.code;
    tr.updatedAt = nowIso();
    stores.writeTasks(fresh);
  }
  push(stores, {
    type: "tool.failed",
    feedId,
    taskId,
    actor: "host",
    payload: {
      toolId,
      error: failure.message,
      code: failure.code,
      retryable: failure.retryable,
      ...extraPayload,
    },
    severity: "error",
  });
}

function setTaskState(
  stores: Stores,
  taskId: string,
  state: TaskState,
  feedId: string
): void {
  const tasks = stores.readTasks();
  const t = tasks.find((x) => x.id === taskId);
  if (!t) return;
  const prev = t.state;
  t.state = state;
  t.updatedAt = nowIso();
  stores.writeTasks(tasks);
  push(stores, {
    type: "task.state_changed",
    feedId,
    taskId,
    actor: "host",
    payload: { from: prev, to: state },
  });
}

/**
 * After a feed item is persisted, run Scout → Planner → Maker → Reviewer (stub).
 * Mutates stores; returns the updated feed item.
 */
export async function processFeedPipeline(
  stores: Stores,
  dataRoot: string,
  feed: FeedItem
): Promise<FeedItem> {
  const plan = scoutAndPlan({ id: feed.id, raw: feed.raw });

  push(stores, {
    type: "feed.received",
    feedId: feed.id,
    actor: "user",
    payload: { source: feed.source, bytes: feed.raw.length },
  });

  const classified = stores.updateFeedItem(feed.id, {
    classification: plan.classification as unknown as Record<string, unknown>,
  });
  const feedRow = classified ?? feed;

  push(stores, {
    type: "feed.classified",
    feedId: feed.id,
    actor: "hivemind",
    payload: { classification: plan.classification },
  });

  push(stores, {
    type: "provider.request",
    feedId: feed.id,
    actor: "hivemind",
    payload: {
      provider: "openrouter",
      model: "stub/demo",
      phase: "plan",
      budgetRemainingUsd: 5,
    },
  });
  push(stores, {
    type: "provider.response",
    feedId: feed.id,
    actor: "host",
    payload: {
      provider: "openrouter",
      model: "stub/demo",
      estimatedCostUsd: 0,
      note: "Offline stub; replace with real provider in later milestones.",
    },
  });

  const allTasks = stores.readTasks();
  const createdIds: string[] = [];
  const createdAt = nowIso();

  for (let i = 0; i < plan.tasks.length; i++) {
    const bp = plan.tasks[i]!;
    const id = randomUUID();
    createdIds.push(id);
    const dependsOn = bp.dependsOnIndices.map((j) => createdIds[j]!).filter(Boolean);
    const row: Task = {
      schemaVersion: "1.0.0",
      id,
      feedId: feed.id,
      title: bp.title,
      state: i === 0 ? "ready" : "queued",
      dependsOn,
      toolId: bp.toolId,
      createdAt,
    };
    allTasks.push(row);
    push(stores, {
      type: "task.created",
      feedId: feed.id,
      taskId: id,
      actor: "hivemind",
      payload: { title: bp.title, toolId: bp.toolId },
    });
  }
  stores.writeTasks(allTasks);

  const vaultRel = defaultVaultRelPath(feed.id);
  const ordered = createdIds
    .map((id) => stores.readTasks().find((t) => t.id === id))
    .filter((t): t is Task => t !== undefined);

  for (const task of ordered) {
    if (task.state === "queued") {
      setTaskState(stores, task.id, "ready", feed.id);
    }

    setTaskState(stores, task.id, "running", feed.id);

    push(stores, {
      type: "tool.started",
      feedId: feed.id,
      taskId: task.id,
      actor: "host",
      payload: { toolId: task.toolId },
    });

    try {
      const { outputRefs } = await runToolWithTimeout({
        dataRoot,
        feed: feedRow,
        task,
        vaultRelPath: vaultRel,
      });
      const fresh = stores.readTasks();
      const tr = fresh.find((x) => x.id === task.id);
      if (tr) {
        tr.outputRefs = outputRefs;
        tr.updatedAt = nowIso();
        stores.writeTasks(fresh);
      }
      push(stores, {
        type: "tool.finished",
        feedId: feed.id,
        taskId: task.id,
        actor: "host",
        payload: { toolId: task.toolId, outputRefs },
      });

      setTaskState(stores, task.id, "done", feed.id);

      if (task.toolId === "review.signoff") {
        const onceMore = stores.readTasks();
        const tr2 = onceMore.find((x) => x.id === task.id);
        if (tr2) {
          tr2.review = { status: "pass", notes: "Stub reviewer sign-off." };
          tr2.updatedAt = nowIso();
          stores.writeTasks(onceMore);
        }
        push(stores, {
          type: "review.pass",
          feedId: feed.id,
          taskId: task.id,
          actor: "hivemind",
          payload: { toolId: task.toolId },
        });
      }
    } catch (e) {
      const failure = normalizeToolFailure(e);
      recordToolFailure(stores, feed.id, task.id, task.toolId, failure);
      break;
    }
  }

  return stores.readFeedItems().find((f) => f.id === feed.id) ?? feedRow;
}

/**
 * Re-execute a single task’s tool (manual control / recovery). Does not rebuild the graph.
 */
export async function rerunTask(
  stores: Stores,
  dataRoot: string,
  taskId: string
): Promise<
  | { ok: true; task: Task }
  | {
      ok: false;
      code: "not_found" | "tool_failed" | "internal";
      message: string;
      toolErrorCode?: string;
    }
> {
  const tasks = stores.readTasks();
  const task = tasks.find((x) => x.id === taskId);
  if (!task) return { ok: false, code: "not_found", message: "task_not_found" };
  const feed = stores.readFeedItems().find((f) => f.id === task.feedId);
  if (!feed) return { ok: false, code: "not_found", message: "feed_not_found" };

  const vaultRel = defaultVaultRelPath(feed.id);

  setTaskState(stores, task.id, "running", feed.id);

  push(stores, {
    type: "tool.started",
    feedId: feed.id,
    taskId: task.id,
    actor: "host",
    payload: { toolId: task.toolId, manualRerun: true },
  });

  try {
    const { outputRefs } = await runToolWithTimeout({
      dataRoot,
      feed,
      task,
      vaultRelPath: vaultRel,
    });
    const fresh = stores.readTasks();
    const tr = fresh.find((x) => x.id === task.id);
    if (tr) {
      tr.outputRefs = outputRefs;
      tr.updatedAt = nowIso();
      tr.error = undefined;
      tr.errorCode = undefined;
      stores.writeTasks(fresh);
    }
    push(stores, {
      type: "tool.finished",
      feedId: feed.id,
      taskId: task.id,
      actor: "host",
      payload: { toolId: task.toolId, outputRefs, manualRerun: true },
    });

    setTaskState(stores, task.id, "done", feed.id);

    if (task.toolId === "review.signoff") {
      const onceMore = stores.readTasks();
      const tr2 = onceMore.find((x) => x.id === task.id);
      if (tr2) {
        tr2.review = { status: "pass", notes: "Stub reviewer sign-off (rerun)." };
        tr2.updatedAt = nowIso();
        stores.writeTasks(onceMore);
      }
      push(stores, {
        type: "review.pass",
        feedId: feed.id,
        taskId: task.id,
        actor: "hivemind",
        payload: { toolId: task.toolId, manualRerun: true },
      });
    }

    const final = stores.readTasks().find((x) => x.id === taskId);
    if (!final) {
      return { ok: false, code: "internal", message: "task_missing_after_rerun" };
    }
    return { ok: true, task: final };
  } catch (e) {
    const failure = normalizeToolFailure(e);
    recordToolFailure(stores, feed.id, task.id, task.toolId, failure, {
      manualRerun: true,
    });
    return {
      ok: false,
      code: "tool_failed",
      message: failure.message,
      toolErrorCode: failure.code,
    };
  }
}
