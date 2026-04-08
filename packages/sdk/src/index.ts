export type HealthResponse = {
  ok: boolean;
  service: string;
  version: string;
  dataRoot: string;
};

/** Matches `packages/schemas/feed.schema.json` FeedItem */
export type FeedItem = {
  schemaVersion: "1.0.0";
  id: string;
  source: "thinui" | "api" | "import" | "wp-bridge" | "demo-seed";
  raw: string;
  summary?: string;
  uri?: string;
  classification?: {
    intent?: string;
    labels?: string[];
    confidence?: number;
    [key: string]: unknown;
  };
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

/** Matches `packages/schemas/task.schema.json` Task */
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
  errorCode?: string;
  review?: {
    status: "pass" | "fail" | "needs_fix";
    notes?: string;
  };
  createdAt: string;
  updatedAt?: string;
};

/** Matches `packages/schemas/event.schema.json` Event (subset for clients) */
export type EventEntry = {
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

export type SubmitFeedItemInput = {
  raw: string;
  uri?: string;
  source?: FeedItem["source"];
};

export type VaultFileInfo = {
  path: string;
  bytes: number;
  mtimeMs: number;
};

export type HostClientOptions = {
  baseUrl: string;
  fetchImpl?: typeof fetch;
};

/**
 * Thin typed client for the local Host HTTP API.
 */
export function createHostClient(options: HostClientOptions) {
  const base = options.baseUrl.replace(/\/$/, "");
  const fetchFn = options.fetchImpl ?? globalThis.fetch;

  async function health(): Promise<HealthResponse> {
    const res = await fetchFn(`${base}/health`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`Host health failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as HealthResponse;
  }

  async function submitFeedItem(input: SubmitFeedItemInput): Promise<FeedItem> {
    const res = await fetchFn(`${base}/api/v1/feed/items`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`submitFeedItem failed: ${res.status} ${err}`);
    }
    return (await res.json()) as FeedItem;
  }

  async function listFeedItems(): Promise<{ items: FeedItem[] }> {
    const res = await fetchFn(`${base}/api/v1/feed/items`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`listFeedItems failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as { items: FeedItem[] };
  }

  async function listTasks(): Promise<{ tasks: Task[] }> {
    const res = await fetchFn(`${base}/api/v1/tasks`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`listTasks failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as { tasks: Task[] };
  }

  async function bridgeWordpress(): Promise<{
    host: boolean;
    wpBaseUrl?: string;
    ok: boolean;
    wordpress?: { ok?: boolean; service?: string; version?: string };
    error?: string;
  }> {
    const res = await fetchFn(`${base}/api/v1/bridge/wordpress`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`bridgeWordpress failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as {
      host: boolean;
      wpBaseUrl?: string;
      ok: boolean;
      wordpress?: { ok?: boolean; service?: string; version?: string };
      error?: string;
    };
  }

  async function listEvents(limit?: number): Promise<{ events: EventEntry[] }> {
    const q =
      typeof limit === "number" && Number.isFinite(limit)
        ? `?limit=${encodeURIComponent(String(limit))}`
        : "";
    const res = await fetchFn(`${base}/api/v1/events${q}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`listEvents failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as { events: EventEntry[] };
  }

  async function listVaultFiles(): Promise<{ files: VaultFileInfo[] }> {
    const res = await fetchFn(`${base}/api/v1/vault/files`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`listVaultFiles failed: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as { files: VaultFileInfo[] };
  }

  async function rerunTask(taskId: string): Promise<{ task: Task }> {
    const res = await fetchFn(
      `${base}/api/v1/tasks/${encodeURIComponent(taskId)}/rerun`,
      {
        method: "POST",
        headers: { Accept: "application/json" },
      }
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`rerunTask failed: ${res.status} ${text}`);
    }
    return (await res.json()) as { task: Task };
  }

  return {
    health,
    submitFeedItem,
    listFeedItems,
    listTasks,
    listEvents,
    listVaultFiles,
    rerunTask,
    bridgeWordpress,
  };
}
