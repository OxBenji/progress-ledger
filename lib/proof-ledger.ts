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
