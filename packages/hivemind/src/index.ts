/**
 * Hivemind — Scout + Planner for uDOS v3 (deterministic demo loop).
 * Maker/Reviewer execution is owned by Host; this package only proposes work.
 */

export type TaskBlueprint = {
  title: string;
  /** Host-registered tool name */
  toolId: string;
  /** Dependency indices pointing at earlier entries in the same blueprint array */
  dependsOnIndices: number[];
};

export type ScoutClassification = {
  intent: string;
  labels: string[];
  confidence: number;
  /**
   * Host uses `vault/{vaultStem}-{feedId}.md` for stub tools (default stem: `gold`).
   */
  vaultStem?: string;
};

export type ScoutPlanResult = {
  classification: ScoutClassification;
  tasks: TaskBlueprint[];
};

function looksLikeEmailThread(raw: string): boolean {
  const t = raw.trim();
  if (/^From:\s/im.test(t) && /^Subject:\s/im.test(t)) return true;
  if (/^On .+ wrote:/im.test(t)) return true;
  const quotedLines = t.match(/^>\s?/gm);
  return (quotedLines?.length ?? 0) >= 3;
}

/**
 * Scout classifies the feed item; Planner expands it into a linear task graph (gold path, ≥3 tasks).
 */
export function scoutAndPlan(input: { id: string; raw: string }): ScoutPlanResult {
  const raw = input.raw.trim();
  const shortFeed = input.id.replace(/-/g, "").slice(0, 8);
  const thread = looksLikeEmailThread(raw);

  if (thread) {
    return {
      classification: {
        intent: "email_thread_intake",
        labels: [
          "demo",
          "scenario:inbox-thread",
          "v3.0.2",
          `feed:${shortFeed}`,
        ],
        confidence: 0.88,
        vaultStem: "thread",
      },
      tasks: [
        {
          title: "Ingest email thread: create vault markdown",
          toolId: "vault.write_note",
          dependsOnIndices: [],
        },
        {
          title: "Append thread summary (stub)",
          toolId: "vault.append_summary",
          dependsOnIndices: [0],
        },
        {
          title: "Extract follow-up bullets from thread",
          toolId: "vault.append_task_bullets",
          dependsOnIndices: [1],
        },
        {
          title: "Reviewer sign-off (stub pass)",
          toolId: "review.signoff",
          dependsOnIndices: [2],
        },
      ],
    };
  }

  const intent =
    raw.length > 400 ? "long_form_research" : "short_note_or_request";

  return {
    classification: {
      intent,
      labels: ["demo", "gold-path", "v3.0.1", `feed:${shortFeed}`],
      confidence: 0.92,
      vaultStem: "gold",
    },
    tasks: [
      {
        title: "Create vault markdown from feed body",
        toolId: "vault.write_note",
        dependsOnIndices: [],
      },
      {
        title: "Append an automatic summary section",
        toolId: "vault.append_summary",
        dependsOnIndices: [0],
      },
      {
        title: "Append stub extracted action items",
        toolId: "vault.append_task_bullets",
        dependsOnIndices: [1],
      },
      {
        title: "Reviewer sign-off (stub pass)",
        toolId: "review.signoff",
        dependsOnIndices: [2],
      },
    ],
  };
}
