import {
  bounties,
  chainRows,
  innovationMoves,
  milestoneGuardrails,
  milestoneMarks,
  milestoneUnlocks,
  passportFacts,
  passportJson,
  receipts,
  reviewQueue,
} from "../app/content";

export type ApiError = {
  error: string;
  detail?: string;
};

export type ReceiptCandidate = {
  receipt_id?: unknown;
  task_type?: unknown;
  artifact?: unknown;
  check?: unknown;
  verifier?: unknown;
  hash?: unknown;
  status?: unknown;
};

export type QueuedReceiptSubmission = {
  queue_id: string;
  receipt_id: string;
  task_type: string;
  artifact: string;
  check: string;
  verifier: string;
  hash: string;
  status: string;
  review_state: string;
  next_action: string;
  source?: string;
  submitted_at?: string;
};

export const apiVersion = "0.1.0";

export function apiMeta() {
  return {
    service: "progress-ledger",
    version: apiVersion,
  };
}

export function listReceipts(filters?: { status?: string | null; track?: string | null }) {
  return receipts.filter((receipt) => {
    const statusMatch = filters?.status ? receipt.status.toLowerCase() === filters.status.toLowerCase() : true;
    const trackMatch = filters?.track ? receipt.track.toLowerCase() === filters.track.toLowerCase() : true;

    return statusMatch && trackMatch;
  });
}

export function getReceipt(receiptId: string) {
  return receipts.find((receipt) => receipt.id.toLowerCase() === receiptId.toLowerCase()) ?? null;
}

export function getMilestoneRules() {
  return {
    marks: milestoneMarks,
    unlocks: milestoneUnlocks,
    guardrails: milestoneGuardrails,
  };
}

export function getAgentPassport(agentId: string) {
  const normalizedAgentId = agentId.includes(":") ? agentId : `agent:${agentId}`;
  const isKnownAgent = normalizedAgentId === "agent:researcher-42";

  if (!isKnownAgent) {
    return null;
  }

  return {
    agent_id: normalizedAgentId,
    passport_version: apiVersion,
    status: "prototype",
    stats: passportFacts,
    receipts,
    milestones: [milestoneUnlocks[0]],
    innovation_moves: innovationMoves,
    canonical_json: JSON.parse(passportJson),
  };
}

export function getBackendIndex() {
  return {
    ...apiMeta(),
    endpoints: [
      "/api/health",
      "/api/receipts",
      "/api/receipts/:id",
      "/api/receipts/preview",
      "/api/receipts/submissions",
      "/api/milestones",
      "/api/agents/:agentId/passport",
      "/api/bounties",
      "/api/multichain",
    ],
    next_build_target: "persistent receipt submission queue",
  };
}

export function getBounties() {
  return bounties;
}

export function listReceiptSubmissions() {
  return reviewQueue;
}

export function getMultichainPlan() {
  return chainRows;
}

export function validateReceiptCandidate(candidate: ReceiptCandidate) {
  const requiredFields = ["receipt_id", "task_type", "artifact", "check", "verifier", "hash", "status"] as const;
  const missing = requiredFields.filter((field) => {
    const value = candidate[field];
    return typeof value !== "string" || value.trim().length === 0;
  });

  const status = typeof candidate.status === "string" ? candidate.status.toLowerCase() : "";
  const allowedStatuses = ["pending", "proven", "disputed", "failed-credit"];
  const statusIsValid = allowedStatuses.includes(status);

  return {
    ok: missing.length === 0 && statusIsValid,
    missing,
    invalid: statusIsValid ? [] : ["status"],
    allowed_statuses: allowedStatuses,
    next_step:
      missing.length === 0 && statusIsValid
        ? "Ready for reviewer attestation."
        : "Add the missing fields before a reviewer can inspect this receipt.",
  };
}

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function shortQueueHash(input: string) {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).toUpperCase().padStart(8, "0").slice(0, 6);
}

export function queueReceiptSubmission(candidate: ReceiptCandidate) {
  const validation = validateReceiptCandidate(candidate);
  const normalized = {
    receipt_id: asTrimmedString(candidate.receipt_id),
    task_type: asTrimmedString(candidate.task_type),
    artifact: asTrimmedString(candidate.artifact),
    check: asTrimmedString(candidate.check),
    verifier: asTrimmedString(candidate.verifier),
    hash: asTrimmedString(candidate.hash),
    status: asTrimmedString(candidate.status).toLowerCase(),
  };
  const queueHash = shortQueueHash(JSON.stringify(normalized));

  return {
    queue_id: `QUEUE-${queueHash}`,
    review_state: validation.ok ? "ready_for_review" : "needs_fields",
    accepted_for_review: validation.ok,
    candidate: normalized,
    validation,
    next_actions: validation.ok
      ? [
          "Assign a domain reviewer.",
          "Attach reviewer attestation.",
          "Open a dispute window before minting the receipt.",
        ]
      : [
          "Complete every required receipt field.",
          "Keep the status set to pending until a reviewer accepts the check.",
        ],
  };
}
