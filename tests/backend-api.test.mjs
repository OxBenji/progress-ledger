import assert from "node:assert/strict";
import test from "node:test";

async function fetchWorker(path, init) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, init),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("backend health endpoint exposes the API index", async () => {
  const response = await fetchWorker("/api/health");
  assert.equal(response.status, 200);

  const json = await response.json();
  assert.equal(json.ok, true);
  assert.equal(json.service, "progress-ledger");
  assert.ok(json.backend.endpoints.includes("/api/receipts"));
  assert.ok(json.backend.endpoints.includes("/api/agents/:agentId/passport"));
  assert.ok(json.backend.endpoints.includes("/api/receipts/submissions"));
});

test("backend serves receipts and receipt detail", async () => {
  const listResponse = await fetchWorker("/api/receipts?status=Proven");
  assert.equal(listResponse.status, 200);

  const listJson = await listResponse.json();
  assert.equal(listJson.service, "progress-ledger");
  assert.ok(listJson.count >= 1);
  assert.ok(listJson.receipts.every((receipt) => receipt.status === "Proven"));

  const detailResponse = await fetchWorker("/api/receipts/POP-0001");
  assert.equal(detailResponse.status, 200);

  const detailJson = await detailResponse.json();
  assert.equal(detailJson.receipt.id, "POP-0001");
});

test("backend validates receipt candidates", async () => {
  const response = await fetchWorker("/api/receipts/preview", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      receipt_id: "POP-0004",
      task_type: "agent-task",
      artifact: "https://github.com/OxBenji/progress-ledger/pull/4",
      check: "npm test",
      verifier: "repo maintainer",
      hash: "sha256:example",
      status: "pending",
    }),
  });
  assert.equal(response.status, 200);

  const json = await response.json();
  assert.equal(json.validation.ok, true);
  assert.equal(json.validation.next_step, "Ready for reviewer attestation.");
});

test("backend queues receipt submissions for review", async () => {
  const listResponse = await fetchWorker("/api/receipts/submissions");
  assert.equal(listResponse.status, 200);

  const listJson = await listResponse.json();
  assert.equal(listJson.persistence, "prototype_seed_queue");
  assert.ok(listJson.count >= 1);

  const response = await fetchWorker("/api/receipts/submissions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      receipt_id: "POP-0007",
      task_type: "agent-task",
      artifact: "https://github.com/OxBenji/progress-ledger/pull/example",
      check: "npm test + maintainer review note",
      verifier: "repo maintainer",
      hash: "sha256:pending",
      status: "pending",
    }),
  });
  assert.equal(response.status, 202);

  const json = await response.json();
  assert.match(json.submission.queue_id, /^QUEUE-[A-F0-9]{6}$/);
  assert.equal(json.submission.review_state, "ready_for_review");
  assert.equal(json.submission.accepted_for_review, true);
});

test("backend serves milestone rules and agent passport", async () => {
  const milestoneResponse = await fetchWorker("/api/milestones");
  assert.equal(milestoneResponse.status, 200);

  const milestoneJson = await milestoneResponse.json();
  assert.equal(milestoneJson.milestones.unlocks[0].code, "MS-01");

  const passportResponse = await fetchWorker("/api/agents/researcher-42/passport");
  assert.equal(passportResponse.status, 200);

  const passportJson = await passportResponse.json();
  assert.equal(passportJson.passport.agent_id, "agent:researcher-42");
  assert.ok(passportJson.passport.receipts.length >= 1);
});
