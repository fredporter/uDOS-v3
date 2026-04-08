import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { createStores } from "./storage.js";
import type { EventRecord, FeedItem } from "./storage.js";
import { processFeedPipeline, rerunTask } from "./pipeline.js";

const VERSION = "0.5.0";
const PORT = Number(process.env.PORT) || 8787;
const WP_BASE_URL = (process.env.UDOS_WP_BASE_URL ?? "http://127.0.0.1:8080").replace(
  /\/$/,
  ""
);

/** Shared secret for `POST /api/v1/bridge/wp-event` (WordPress → Host). */
const BRIDGE_SECRET = process.env.UDOS_BRIDGE_SECRET ?? "";

const ALLOWED_WP_BRIDGE_TYPES = new Set([
  "wp.contact_linked",
  "wp.profile_updated",
]);

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
);

const DATA_ROOT = process.env.UDOS_DATA_ROOT
  ? path.resolve(process.env.UDOS_DATA_ROOT)
  : path.join(REPO_ROOT, ".udos-data");

const STORAGE_DIRS = [
  "vault",
  "spool",
  "events",
  "exports",
  "wordpress",
  "backups",
] as const;

function ensureStorageLayoutSync(): void {
  fs.mkdirSync(DATA_ROOT, { recursive: true });
  for (const dir of STORAGE_DIRS) {
    fs.mkdirSync(path.join(DATA_ROOT, dir), { recursive: true });
  }
}

function listVaultMarkdownFiles(): {
  path: string;
  bytes: number;
  mtimeMs: number;
}[] {
  const dir = path.join(DATA_ROOT, "vault");
  if (!fs.existsSync(dir)) return [];
  const out: { path: string; bytes: number; mtimeMs: number }[] = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    let st: fs.Stats;
    try {
      st = fs.statSync(full);
    } catch {
      continue;
    }
    if (st.isFile() && name.endsWith(".md")) {
      out.push({ path: `vault/${name}`, bytes: st.size, mtimeMs: st.mtimeMs });
    }
  }
  return out.sort((a, b) => b.mtimeMs - a.mtimeMs);
}

/** Active SSE connections (event log live updates). */
const sseSockets = new Set<http.ServerResponse>();

function broadcastSseEvent(ev: EventRecord): void {
  const line = `event: append\ndata: ${JSON.stringify(ev)}\n\n`;
  for (const res of sseSockets) {
    if (res.writableEnded) {
      sseSockets.delete(res);
      continue;
    }
    try {
      res.write(line);
    } catch {
      sseSockets.delete(res);
    }
  }
}

const stores = createStores(DATA_ROOT, {
  onEventAppend: broadcastSseEvent,
});

const FEED_SOURCES = new Set<FeedItem["source"]>([
  "thinui",
  "api",
  "import",
  "wp-bridge",
  "demo-seed",
]);

function corsHeaders(req: http.IncomingMessage): Record<string, string> {
  const origin = req.headers.origin;
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function sendJson(
  res: http.ServerResponse,
  req: http.IncomingMessage,
  status: number,
  body: unknown
): void {
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    ...corsHeaders(req),
  };
  res.writeHead(status, headers);
  res.end(JSON.stringify(body));
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c as Buffer));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function handleBridgeWpEvent(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> {
  if (!BRIDGE_SECRET) {
    sendJson(res, req, 503, {
      error: "bridge_ingest_disabled",
      message: "Set UDOS_BRIDGE_SECRET to accept WordPress bridge events.",
    });
    return;
  }
  const hdr = req.headers["x-udos-bridge-token"];
  const token =
    typeof hdr === "string"
      ? hdr
      : Array.isArray(hdr)
        ? hdr[0] ?? ""
        : "";
  if (token !== BRIDGE_SECRET) {
    sendJson(res, req, 401, { error: "unauthorized" });
    return;
  }
  let body: unknown;
  try {
    const text = await readBody(req);
    body = text.length ? JSON.parse(text) : {};
  } catch {
    sendJson(res, req, 400, { error: "invalid_json" });
    return;
  }
  const type =
    typeof body === "object" &&
    body !== null &&
    "type" in body &&
    typeof (body as { type: unknown }).type === "string"
      ? (body as { type: string }).type
      : "";
  if (!ALLOWED_WP_BRIDGE_TYPES.has(type)) {
    sendJson(res, req, 400, {
      error: "invalid_type",
      allowed: [...ALLOWED_WP_BRIDGE_TYPES],
    });
    return;
  }
  const payload =
    typeof body === "object" &&
    body !== null &&
    "payload" in body &&
    typeof (body as { payload: unknown }).payload === "object" &&
    (body as { payload: unknown }).payload !== null
      ? (body as { payload: Record<string, unknown> }).payload
      : {};
  stores.appendEvent({
    schemaVersion: "1.0.0",
    id: randomUUID(),
    type,
    timestamp: new Date().toISOString(),
    actor: "wordpress",
    payload,
    severity: "info",
  });
  sendJson(res, req, 201, { ok: true, type });
}

async function fetchWordPressBridge(): Promise<{
  ok: boolean;
  wordpress?: unknown;
  error?: string;
}> {
  const target = `${WP_BASE_URL}/wp-json/udos-empire/v1/health`;
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 4000);
  try {
    const r = await fetch(target, {
      signal: ac.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);
    if (!r.ok) {
      return { ok: false, error: `wordpress_http_${r.status}` };
    }
    const wordpress = await r.json();
    return { ok: true, wordpress };
  } catch (e) {
    clearTimeout(timer);
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

async function handleFeedItems(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  method: string
): Promise<boolean> {
  if (method === "GET") {
    const items = stores.readFeedItems();
    sendJson(res, req, 200, { items });
    return true;
  }

  if (method === "POST") {
    let body: unknown;
    try {
      const text = await readBody(req);
      body = text.length ? JSON.parse(text) : {};
    } catch {
      sendJson(res, req, 400, { error: "invalid_json" });
      return true;
    }

    const raw =
      typeof body === "object" &&
      body !== null &&
      "raw" in body &&
      typeof (body as { raw: unknown }).raw === "string"
        ? (body as { raw: string }).raw.trim()
        : "";

    if (!raw) {
      sendJson(res, req, 400, { error: "validation_error", field: "raw" });
      return true;
    }

    let source: FeedItem["source"] = "api";
    if (
      typeof body === "object" &&
      body !== null &&
      "source" in body &&
      typeof (body as { source: unknown }).source === "string" &&
      FEED_SOURCES.has((body as { source: string }).source as FeedItem["source"])
    ) {
      source = (body as { source: FeedItem["source"] }).source;
    }

    let uri: string | undefined;
    if (
      typeof body === "object" &&
      body !== null &&
      "uri" in body &&
      typeof (body as { uri: unknown }).uri === "string" &&
      (body as { uri: string }).uri.trim()
    ) {
      uri = (body as { uri: string }).uri.trim();
    }

    const now = new Date().toISOString();
    const item: FeedItem = {
      schemaVersion: "1.0.0",
      id: randomUUID(),
      source,
      raw,
      createdAt: now,
      ...(uri ? { uri } : {}),
    };

    const items = stores.readFeedItems();
    items.push(item);
    stores.writeFeedItems(items);

    const updated = await processFeedPipeline(stores, DATA_ROOT, item);

    sendJson(res, req, 201, updated);
    return true;
  }

  sendJson(res, req, 405, { error: "method_not_allowed" });
  return true;
}

async function route(
  req: http.IncomingMessage,
  res: http.ServerResponse
): Promise<void> {
  const url = req.url ?? "/";
  const method = req.method ?? "GET";

  if (method === "OPTIONS") {
    res.writeHead(204, corsHeaders(req));
    res.end();
    return;
  }

  let pathname = url;
  try {
    pathname = new URL(url, "http://127.0.0.1").pathname;
  } catch {
    pathname = url.split("?")[0] ?? "/";
  }

  if (method === "GET" && (url === "/health" || url === "/api/v1/health")) {
    sendJson(res, req, 200, {
      ok: true,
      service: "udos-host",
      version: VERSION,
      dataRoot: DATA_ROOT,
    });
    return;
  }

  if (pathname === "/api/v1/feed/items") {
    await handleFeedItems(req, res, method);
    return;
  }

  if (pathname === "/api/v1/tasks" && method === "GET") {
    sendJson(res, req, 200, { tasks: stores.readTasks() });
    return;
  }

  const taskRerunMatch = pathname.match(/^\/api\/v1\/tasks\/([^/]+)\/rerun$/);
  if (taskRerunMatch && method === "POST") {
    const taskId = decodeURIComponent(taskRerunMatch[1] ?? "");
    if (!taskId) {
      sendJson(res, req, 400, { error: "missing_task_id" });
      return;
    }
    const result = await rerunTask(stores, DATA_ROOT, taskId);
    if (!result.ok) {
      const status =
        result.code === "not_found"
          ? 404
          : result.code === "tool_failed"
            ? 422
            : 500;
      sendJson(res, req, status, {
        error: result.message,
        code: result.code,
        ...(result.toolErrorCode
          ? { toolErrorCode: result.toolErrorCode }
          : {}),
      });
      return;
    }
    sendJson(res, req, 200, { task: result.task });
    return;
  }

  if (pathname === "/api/v1/vault/files" && method === "GET") {
    sendJson(res, req, 200, { files: listVaultMarkdownFiles() });
    return;
  }

  if (pathname === "/api/v1/events" && method === "GET") {
    const all = stores.readEvents();
    const limit = Math.min(
      200,
      Math.max(1, Number(new URL(url, "http://127.0.0.1").searchParams.get("limit")) || 80)
    );
    const slice = all.slice(-limit);
    sendJson(res, req, 200, { events: slice });
    return;
  }

  if (pathname === "/api/v1/events/stream" && method === "GET") {
    const origin = req.headers.origin;
    const headers: Record<string, string> = {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
      "Access-Control-Allow-Origin": origin ?? "*",
    };
    res.writeHead(200, headers);
    const all = stores.readEvents();
    const cap = 120;
    const slice = all.slice(-cap);
    res.write(`event: snapshot\ndata: ${JSON.stringify({ events: slice })}\n\n`);
    sseSockets.add(res);
    const ping = setInterval(() => {
      if (res.writableEnded) {
        clearInterval(ping);
        return;
      }
      try {
        res.write(": ping\n\n");
      } catch {
        clearInterval(ping);
        sseSockets.delete(res);
      }
    }, 25000);
    const onClose = (): void => {
      clearInterval(ping);
      sseSockets.delete(res);
    };
    req.on("close", onClose);
    req.on("aborted", onClose);
    return;
  }

  if (pathname === "/api/v1/bridge/wordpress" && method === "GET") {
    const bridge = await fetchWordPressBridge();
    sendJson(res, req, 200, {
      host: true,
      wpBaseUrl: WP_BASE_URL,
      ...bridge,
    });
    return;
  }

  if (pathname === "/api/v1/bridge/wp-event" && method === "POST") {
    await handleBridgeWpEvent(req, res);
    return;
  }

  sendJson(res, req, 404, { error: "not_found", path: url });
}

ensureStorageLayoutSync();

const server = http.createServer((req, res) => {
  void route(req, res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `[udos-host] listening on http://127.0.0.1:${PORT} (data: ${DATA_ROOT})`
  );
});
