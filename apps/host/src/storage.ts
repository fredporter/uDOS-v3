import fs from "node:fs";
import path from "node:path";

export type FeedItem = {
  schemaVersion: "1.0.0";
  id: string;
  source: "thinui" | "api" | "import" | "wp-bridge" | "demo-seed";
  raw: string;
  summary?: string;
  uri?: string;
  classification?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
};

export type TaskState =
  | "queued"
  | "ready"
  | "running"
  | "blocked"
  | "done"
  | "failed";

export type Task = {
  schemaVersion: "1.0.0";
  id: string;
  feedId: string;
  title: string;
  description?: string;
  state: TaskState;
  dependsOn: string[];
  toolId: string;
  toolInput?: Record<string, unknown>;
  outputRefs?: string[];
  error?: string;
  /** Structured code when `state === "failed"` (e.g. `tool_timeout`, `unknown_tool`). */
  errorCode?: string;
  review?: {
    status: "pass" | "fail" | "needs_fix";
    notes?: string;
  };
  createdAt: string;
  updatedAt?: string;
};

export type EventRecord = {
  schemaVersion: "1.0.0";
  id: string;
  type: string;
  timestamp: string;
  feedId?: string;
  taskId?: string;
  actor?: "user" | "host" | "hivemind" | "wordpress" | "system";
  payload?: Record<string, unknown>;
  severity?: "debug" | "info" | "warn" | "error";
};

export type StoreHooks = {
  /** Called after each event is appended to disk (for SSE broadcast). */
  onEventAppend?: (ev: EventRecord) => void;
};

export function createStores(dataRoot: string, hooks: StoreHooks = {}) {
  const feedPath = path.join(dataRoot, "spool", "feed-items.json");
  const tasksPath = path.join(dataRoot, "spool", "tasks.json");
  const eventsPath = path.join(dataRoot, "events", "log.json");

  function readFeedItems(): FeedItem[] {
    try {
      const raw = fs.readFileSync(feedPath, "utf8");
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed as FeedItem[];
    } catch {
      return [];
    }
  }

  function writeFeedItems(items: FeedItem[]): void {
    fs.mkdirSync(path.dirname(feedPath), { recursive: true });
    fs.writeFileSync(feedPath, JSON.stringify(items, null, 2), "utf8");
  }

  function readTasks(): Task[] {
    try {
      const raw = fs.readFileSync(tasksPath, "utf8");
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed as Task[];
    } catch {
      return [];
    }
  }

  function writeTasks(tasks: Task[]): void {
    fs.mkdirSync(path.dirname(tasksPath), { recursive: true });
    fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2), "utf8");
  }

  function readEvents(): EventRecord[] {
    try {
      const raw = fs.readFileSync(eventsPath, "utf8");
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return [];
      return parsed as EventRecord[];
    } catch {
      return [];
    }
  }

  function writeEvents(events: EventRecord[]): void {
    fs.mkdirSync(path.dirname(eventsPath), { recursive: true });
    fs.writeFileSync(eventsPath, JSON.stringify(events, null, 2), "utf8");
  }

  function appendEvent(ev: EventRecord): void {
    const all = readEvents();
    all.push(ev);
    writeEvents(all);
    hooks.onEventAppend?.(ev);
  }

  function updateFeedItem(
    feedId: string,
    patch: Partial<Pick<FeedItem, "classification" | "summary" | "updatedAt">>
  ): FeedItem | undefined {
    const items = readFeedItems();
    const idx = items.findIndex((f) => f.id === feedId);
    if (idx === -1) return undefined;
    const next = { ...items[idx], ...patch, updatedAt: new Date().toISOString() };
    items[idx] = next;
    writeFeedItems(items);
    return next;
  }

  return {
    feedPath,
    tasksPath,
    eventsPath,
    readFeedItems,
    writeFeedItems,
    readTasks,
    writeTasks,
    readEvents,
    appendEvent,
    updateFeedItem,
  };
}

export type Stores = ReturnType<typeof createStores>;
