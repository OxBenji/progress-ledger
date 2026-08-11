"use client";

import { FormEvent, useState } from "react";

type SubmissionResponse = {
  submission?: {
    queue_id: string;
    review_state: string;
    accepted_for_review: boolean;
    validation: {
      ok: boolean;
      missing: string[];
      invalid: string[];
      next_step: string;
    };
    next_actions: string[];
  };
  persistence?: {
    persisted: boolean;
    detail: string;
    storage: {
      provider: string;
      durable: boolean;
      configured: boolean;
    };
  };
  error?: string;
  detail?: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "accepted" | "needs-work" | "error"; response: SubmissionResponse };

function getResultLabel(status: SubmitState["status"]) {
  switch (status) {
    case "accepted":
      return "Submission packet accepted for review";
    case "needs-work":
      return "Submission packet needs fields";
    case "error":
      return "Submission failed";
    default:
      return "Submission result";
  }
}

export function ReceiptSubmissionForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const resultLabel = getResultLabel(submitState.status);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const candidate = {
      receipt_id: String(formData.get("receipt_id") ?? "").trim(),
      task_type: String(formData.get("task_type") ?? "").trim(),
      artifact: String(formData.get("artifact") ?? "").trim(),
      check: String(formData.get("check") ?? "").trim(),
      verifier: String(formData.get("verifier") ?? "").trim(),
      hash: String(formData.get("hash") ?? "").trim(),
      status: String(formData.get("status") ?? "pending").trim(),
    };

    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/receipts/submissions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(candidate),
      });
      const json = (await response.json()) as SubmissionResponse;

      setSubmitState({
        status: response.ok ? "accepted" : "needs-work",
        response: json,
      });
    } catch {
      setSubmitState({
        status: "error",
        response: {
          error: "network_error",
          detail: "The submission API did not respond. Try again before sharing the packet.",
        },
      });
    }
  }

  return (
    <div className="submission-console">
      <form className="submission-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <span>Receipt ID</span>
            <input name="receipt_id" required defaultValue="POP-0007" />
          </label>
          <label>
            <span>Task type</span>
            <select name="task_type" required defaultValue="agent-task">
              <option value="agent-task">agent-task</option>
              <option value="math-proof">math-proof</option>
              <option value="code-eval">code-eval</option>
              <option value="compute-output">compute-output</option>
            </select>
          </label>
          <label>
            <span>Artifact</span>
            <textarea
              name="artifact"
              required
              defaultValue="https://github.com/OxBenji/progress-ledger/pull/example"
            />
          </label>
          <label>
            <span>Verification method</span>
            <textarea name="check" required defaultValue="npm test + maintainer review note" />
          </label>
          <label>
            <span>Requested verifier</span>
            <input name="verifier" required defaultValue="repo maintainer" />
          </label>
          <label>
            <span>Artifact hash</span>
            <input name="hash" required defaultValue="sha256:pending" />
          </label>
          <label>
            <span>Status</span>
            <select name="status" required defaultValue="pending">
              <option value="pending">pending</option>
              <option value="proven">proven</option>
              <option value="disputed">disputed</option>
              <option value="failed-credit">failed-credit</option>
            </select>
          </label>
        </div>
        <button className="button primary" type="submit" disabled={submitState.status === "submitting"}>
          {submitState.status === "submitting" ? "Checking packet" : "Check receipt packet"}
        </button>
      </form>

      <aside className={`submission-result ${submitState.status}`} aria-live="polite">
        <p className="eyebrow">{resultLabel}</p>
        {submitState.status === "idle" || submitState.status === "submitting" ? (
          <p>
            The API will validate required fields and return a queue packet.
            Nothing mints until a reviewer attests.
          </p>
        ) : (
          <>
            {submitState.response.submission ? (
              <div>
                <span className="data">{submitState.response.submission.queue_id}</span>
                <h3>{submitState.response.submission.review_state}</h3>
                <p>{submitState.response.submission.validation.next_step}</p>
                {submitState.response.persistence ? (
                  <p>
                    Storage: {submitState.response.persistence.persisted ? "persisted" : "not persisted"} via{" "}
                    <span className="data">{submitState.response.persistence.storage.provider}</span>
                  </p>
                ) : null}
              </div>
            ) : (
              <p>{submitState.response.detail ?? submitState.response.error}</p>
            )}
            <pre aria-label="Receipt submission API response">
              {JSON.stringify(submitState.response, null, 2)}
            </pre>
          </>
        )}
      </aside>
    </div>
  );
}
