import { NextRequest, NextResponse } from "next/server";
import { apiMeta, validateReceiptCandidate } from "../../../../lib/proof-ledger";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ...apiMeta(),
        error: "invalid_json",
        detail: "Send a JSON receipt candidate.",
      },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      {
        ...apiMeta(),
        error: "invalid_receipt_candidate",
        detail: "Receipt candidate must be a JSON object.",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ...apiMeta(),
    validation: validateReceiptCandidate(body),
  });
}
