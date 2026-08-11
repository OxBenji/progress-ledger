import { NextRequest, NextResponse } from "next/server";
import { apiMeta, listReceiptSubmissions, queueReceiptSubmission } from "../../../../lib/proof-ledger";

export function GET() {
  const submissions = listReceiptSubmissions();

  return NextResponse.json({
    ...apiMeta(),
    count: submissions.length,
    persistence: "prototype_seed_queue",
    next_storage_step: "wire durable submission storage before accepting public production intake",
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

  return NextResponse.json(
    {
      ...apiMeta(),
      submission,
    },
    { status: submission.accepted_for_review ? 202 : 422 },
  );
}
