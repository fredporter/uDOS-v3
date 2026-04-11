import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CANONICAL_TILE_PX_H,
  CANONICAL_TILE_PX_W,
  CANONICAL_VIEWPORT_COLS,
  CANONICAL_VIEWPORT_ROWS,
  USXD_SCHEMA_VERSION,
  canonicalCanvasPx,
  resolveRetroForSingleLineInput,
} from "@udos/shared";
import {
  createHostClient,
  type EventEntry,
  type FeedItem,
  type Task,
} from "@udos/sdk";
import { ThemeSwitcher } from "./ThemeSwitcher";

const hostUrl =
  import.meta.env.VITE_UDOS_HOST_URL ?? "http://127.0.0.1:8787";

const wpBase = (import.meta.env.VITE_UDOS_WP_URL as string | undefined)?.replace(
  /\/$/,
  ""
);

const client = createHostClient({ baseUrl: hostUrl });

export function App() {
  const [health, setHealth] = useState<string>("…");
  const [bridge, setBridge] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [vaultFiles, setVaultFiles] = useState<
    { path: string; bytes: number; mtimeMs: number }[]
  >([]);
  const [draft, setDraft] = useState("");
  const [surfaceRef, setSurfaceRef] = useState("");
  const [busy, setBusy] = useState(false);
  const [rerunningId, setRerunningId] = useState<string | null>(null);
  const [live, setLive] = useState<
    "connecting" | "live" | "reconnecting" | "down"
  >("connecting");
  const [sseAttempt, setSseAttempt] = useState(0);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const [h, feed, t, ev, vf, br] = await Promise.all([
        client.health(),
        client.listFeedItems(),
        client.listTasks(),
        client.listEvents(100),
        client.listVaultFiles(),
        client.bridgeWordpress().catch((e) => ({
          host: true,
          ok: false,
          error: e instanceof Error ? e.message : String(e),
        })),
      ]);
      setHealth(JSON.stringify(h, null, 2));
      setBridge(JSON.stringify(br, null, 2));
      setItems(feed.items);
      setTasks(t.tasks);
      setEvents(ev.events);
      setVaultFiles(vf.files);
    } catch (e) {
      setHealth("—");
      setBridge("");
      setError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  const syncFeedTasks = useCallback(async () => {
    try {
      const [feed, t, vf] = await Promise.all([
        client.listFeedItems(),
        client.listTasks(),
        client.listVaultFiles(),
      ]);
      setItems(feed.items);
      setTasks(t.tasks);
      setVaultFiles(vf.files);
    } catch {
      /* ignore transient errors */
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const debounceRef = useRef<number>(0);
  const scheduleSync = useCallback(() => {
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => void syncFeedTasks(), 400);
  }, [syncFeedTasks]);

  useEffect(() => {
    const base = hostUrl.replace(/\/$/, "");
    const streamUrl = `${base}/api/v1/events/stream`;
    let es: EventSource | null = null;
    let reconnectTimer = 0;
    let stopped = false;
    const attemptRef = { n: 0 };
    const minDelayMs = 1000;
    const maxDelayMs = 30_000;

    const attachHandlers = (source: EventSource) => {
      source.addEventListener("open", () => {
        attemptRef.n = 0;
        setSseAttempt(0);
        setLive("live");
      });

      source.addEventListener("snapshot", (e) => {
        const raw = (e as MessageEvent).data as string;
        try {
          const data = JSON.parse(raw) as { events: EventEntry[] };
          setEvents(data.events);
          scheduleSync();
        } catch {
          /* ignore */
        }
      });

      source.addEventListener("append", (e) => {
        const raw = (e as MessageEvent).data as string;
        try {
          const ev = JSON.parse(raw) as EventEntry;
          setEvents((prev) => {
            const next = [...prev, ev];
            return next.length > 250 ? next.slice(-250) : next;
          });
          scheduleSync();
        } catch {
          /* ignore */
        }
      });

      source.onerror = () => {
        source.close();
        es = null;
        if (stopped) return;
        attemptRef.n += 1;
        setSseAttempt(attemptRef.n);
        setLive(attemptRef.n <= 1 ? "down" : "reconnecting");
        const delay = Math.min(
          maxDelayMs,
          minDelayMs * 2 ** Math.max(0, attemptRef.n - 1)
        );
        reconnectTimer = window.setTimeout(connect, delay);
      };
    };

    const connect = () => {
      if (stopped) return;
      window.clearTimeout(reconnectTimer);
      reconnectTimer = 0;
      if (attemptRef.n === 0) {
        setLive("connecting");
      } else {
        setLive("reconnecting");
      }
      const next = new EventSource(streamUrl);
      es = next;
      attachHandlers(next);
    };

    connect();

    const full = window.setInterval(() => void refresh(), 12000);

    return () => {
      stopped = true;
      window.clearTimeout(reconnectTimer);
      es?.close();
      window.clearInterval(full);
      window.clearTimeout(debounceRef.current);
    };
  }, [hostUrl, scheduleSync, refresh]);

  const providerSummary = useMemo(() => {
    let request: EventEntry | undefined;
    let response: EventEntry | undefined;
    for (let i = events.length - 1; i >= 0; i--) {
      const ev = events[i]!;
      if (!response && ev.type === "provider.response") response = ev;
      if (!request && ev.type === "provider.request") request = ev;
      if (request && response) break;
    }
    if (!request && !response) return null;
    return { request, response };
  }, [events]);

  const feedIdsForTasks = useMemo(() => {
    const ids = new Set(tasks.map((t) => t.feedId));
    const meta = items.filter((i) => ids.has(i.id));
    meta.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return meta.map((m) => m.id);
  }, [tasks, items]);

  const rerunOne = useCallback(
    async (taskId: string) => {
      setRerunningId(taskId);
      setError(null);
      try {
        await client.rerunTask(taskId);
        await refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setRerunningId(null);
      }
    },
    [refresh]
  );

  const submit = useCallback(async () => {
    const prepared = resolveRetroForSingleLineInput(draft);
    if (!prepared.raw) return;
    setBusy(true);
    setError(null);
    try {
      const metadata: Record<string, unknown> = {};
      if (surfaceRef.trim()) {
        metadata.surfaceRef = surfaceRef.trim();
      }
      if (prepared.wasRetroAlias) {
        metadata.retroAlias = {
          canonical: prepared.canonicalRetro,
          original: prepared.originalLine,
          modern: prepared.raw,
        };
      }
      await client.submitFeedItem({
        raw: prepared.raw,
        source: "thinui",
        ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
      });
      setDraft("");
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, [draft, surfaceRef, refresh]);

  const restrictedUrl =
    wpBase && wpBase.length > 0
      ? `${wpBase}/empire-local-restricted/`
      : null;

  const liveLabel =
    live === "live"
      ? "SSE event stream + periodic refresh"
      : live === "reconnecting"
        ? `SSE reconnecting (attempt ${sseAttempt}) — full refresh every 12s`
        : live === "down"
          ? "SSE disconnected — retrying with backoff + 12s refresh"
          : "connecting…";

  const canvas = canonicalCanvasPx();

  return (
    <div className="shell">
      <header className="top">
        <div>
          <h1>uDOS ThinUI</h1>
          <p className="muted">
            Host: <code>{hostUrl}</code> — {liveLabel}
          </p>
          {restrictedUrl ? (
            <p className="muted">
              WordPress:{" "}
              <a href={restrictedUrl} target="_blank" rel="noreferrer">
                restricted demo page
              </a>{" "}
              (log in as a subscriber to view)
            </p>
          ) : null}
        </div>
        <div className="top__actions">
          <ThemeSwitcher />
          <button type="button" onClick={() => void refresh()}>
            Refresh
          </button>
        </div>
      </header>

      {error ? (
        <div className="banner error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="panels">
        <section className="panel">
          <h2>Feed / Inbox</h2>
          <p className="muted">
            Submit a note; Hivemind classifies and plans tasks on the Host.
          </p>
          <textarea
            className="input"
            rows={4}
            placeholder="Notes or a single-line retro command (PEEK, DIR, POKE tool, …) — aliases expand to modern syntax…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={busy}
          />
          <div className="feed-surface-ref muted">
            <span>Optional USXD / layout handle (feed + `feed.received` event):</span>
            <input
              className="input input-inline"
              type="text"
              placeholder="e.g. usxd-surface-canonical"
              value={surfaceRef}
              onChange={(e) => setSurfaceRef(e.target.value)}
              disabled={busy}
              autoComplete="off"
            />
          </div>
          <div className="row">
            <button
              type="button"
              onClick={() => void submit()}
              disabled={busy || !draft.trim()}
            >
              {busy ? "Submitting…" : "Submit to Host"}
            </button>
          </div>
          <ul className="feed-list">
            {items.length === 0 ? (
              <li className="muted">No feed items yet.</li>
            ) : (
              [...items]
                .reverse()
                .map((it) => (
                  <li key={it.id}>
                    <span className="muted">{it.createdAt}</span>
                    {it.classification?.intent ? (
                      <div className="feed-meta">
                        intent:{" "}
                        <code>{String(it.classification.intent)}</code>
                      </div>
                    ) : null}
                    {typeof it.metadata?.surfaceRef === "string" ? (
                      <div className="feed-meta">
                        surfaceRef:{" "}
                        <code>{it.metadata.surfaceRef}</code>
                      </div>
                    ) : null}
                    {(() => {
                      const ra = it.metadata?.retroAlias as
                        | {
                            canonical?: string;
                            modern?: string;
                          }
                        | undefined;
                      if (!ra?.canonical || !ra?.modern) return null;
                      return (
                        <div className="feed-meta">
                          retro: <code>{ra.canonical}</code> →{" "}
                          <code>{ra.modern}</code>
                        </div>
                      );
                    })()}
                    <div className="feed-raw">{it.raw}</div>
                  </li>
                ))
            )}
          </ul>
        </section>
        <section className="panel">
          <h2>Task graph / Queue</h2>
          <p className="muted">
            Grouped by feed (newest first). Manual rerun re-runs the Maker tool for
            that step.
          </p>
          {tasks.length === 0 ? (
            <p className="muted">No tasks yet. Submit a feed item.</p>
          ) : (
            feedIdsForTasks.map((fid) => {
              const feedRow = items.find((i) => i.id === fid);
              const group = tasks.filter((t) => t.feedId === fid);
              return (
                <div key={fid} className="task-group">
                  <div className="task-group__head muted small">
                    Feed{" "}
                    <code>{fid.slice(0, 8)}…</code>
                    {feedRow ? (
                      <span>
                        {" "}
                        · {feedRow.createdAt}
                      </span>
                    ) : null}
                  </div>
                  <ul className="task-list">
                    {group.map((tk) => (
                      <li key={tk.id}>
                        <div className="task-row">
                          <span className={`pill pill--${tk.state}`}>
                            {tk.state}
                          </span>{" "}
                          <span className="task-title">{tk.title}</span>
                          {(tk.state === "done" || tk.state === "failed") ? (
                            <button
                              type="button"
                              className="btn-inline"
                              disabled={rerunningId === tk.id}
                              onClick={() => void rerunOne(tk.id)}
                            >
                              {rerunningId === tk.id ? "Rerunning…" : "Rerun"}
                            </button>
                          ) : null}
                        </div>
                        <div className="muted small">
                          <code>{tk.toolId}</code>
                          {tk.dependsOn.length ? (
                            <span>
                              {" "}
                              · deps: {tk.dependsOn.map((d) => d.slice(0, 8)).join(", ")}
                            </span>
                          ) : null}
                          {tk.outputRefs?.length ? (
                            <span>
                              {" "}
                              → {tk.outputRefs.join(", ")}
                            </span>
                          ) : null}
                          {tk.error ? (
                            <span className="err"> — {tk.error}</span>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </section>
        <section className="panel panel--output">
          <h2>Output / Event log</h2>
          <p className="muted">
            Live events via SSE (<code>/api/v1/events/stream</code>); provider
            stubs after classify.
          </p>
          {providerSummary ? (
            <div className="provider-strip">
              <div className="provider-strip__title">Provider / budget (latest)</div>
              {providerSummary.request ? (
                <pre className="pre pre--inline">
                  {JSON.stringify(providerSummary.request.payload, null, 2)}
                </pre>
              ) : null}
              {providerSummary.response ? (
                <pre className="pre pre--inline">
                  {JSON.stringify(providerSummary.response.payload, null, 2)}
                </pre>
              ) : null}
            </div>
          ) : (
            <p className="muted small">No provider events yet.</p>
          )}
          <div className="vault-strip">
            <div className="vault-strip__title">Vault files</div>
            {vaultFiles.length === 0 ? (
              <p className="muted small">No markdown in vault yet.</p>
            ) : (
              <ul className="vault-list">
                {vaultFiles.map((f) => (
                  <li key={f.path}>
                    <code>{f.path}</code>
                    <span className="muted small">
                      {" "}
                      · {(f.bytes / 1024).toFixed(1)} KiB
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ol className="event-log">
            {events.map((ev) => (
              <li key={ev.id}>
                <span className="muted">{ev.timestamp}</span>{" "}
                <code className="ev-type">{ev.type}</code>
                {ev.actor ? (
                  <span className="muted"> ({ev.actor})</span>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="muted">WordPress bridge (Host → WP REST)</p>
          <pre className="pre pre--compact">{bridge || "—"}</pre>
          <p className="muted">Host health</p>
          <pre className="pre pre--compact">{health}</pre>
        </section>
      </div>

      <footer className="parity-footer" aria-label="Display canon parity">
        <span>
          <code>{USXD_SCHEMA_VERSION}</code>
        </span>
        <span className="parity-footer__sep">·</span>
        <span>
          viewport {CANONICAL_VIEWPORT_COLS}×{CANONICAL_VIEWPORT_ROWS}
        </span>
        <span className="parity-footer__sep">·</span>
        <span>
          cell {CANONICAL_TILE_PX_W}×{CANONICAL_TILE_PX_H}px
        </span>
        <span className="parity-footer__sep">·</span>
        <span>
          canvas {canvas.width}×{canvas.height}px
        </span>
        <span className="parity-footer__sep">·</span>
        <a href="#/lab/teletext">Teletext lab</a>
      </footer>
    </div>
  );
}
