import { NextRequest, NextResponse } from "next/server";
import { apiMeta, queueReceiptSubmission } from "../../../../lib/proof-ledger";
import {
  getSubmissionStorageStatus,
  listStoredReceiptSubmissions,
  persistReceiptSubmission,
} from "../../../../lib/receipt-submission-storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const { storage, submissions } = await listStoredReceiptSubmissions();

  return NextResponse.json({
    ...apiMeta(),
    count: submissions.length,
    persistence: storage.provider,
    storage,
    next_storage_step: storage.configured ? "reviewer attestations and dispute windows" : "attach Upstash Redis env vars",
    submissions,
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ...apiMeta(),
        error: "invalid_json",
        detail: "Send a JSON receipt submission.",
      },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      {
        ...apiMeta(),
        error: "invalid_receipt_submission",
        detail: "Receipt submission must be a JSON object.",
      },
      { status: 400 },
    );
  }

  const submission = queueReceiptSubmission(body);
  const persistence = submission.accepted_for_review
    ? await persistReceiptSubmission(submission)
    : {
        storage: getSubmissionStorageStatus(),
        persisted: false,
        detail: "Submission is incomplete and was not persisted.",
      };

  return NextResponse.json(
    {
      ...apiMeta(),
      submission,
      persistence,
    },
    { status: submission.accepted_for_review ? 202 : 422 },
  );
}
