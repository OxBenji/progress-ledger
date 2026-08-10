import { NextRequest, NextResponse } from "next/server";
import { apiMeta, getReceipt } from "../../../../lib/proof-ledger";

export const dynamic = "force-static";

type Context = {
  params: Promise<{
    receiptId: string;
  }>;
};

export async function GET(_request: NextRequest, context: Context) {
  const { receiptId } = await context.params;
  const receipt = getReceipt(receiptId);

  if (!receipt) {
    return NextResponse.json(
      {
        ...apiMeta(),
        error: "receipt_not_found",
        detail: `No receipt exists for ${receiptId}.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    ...apiMeta(),
    receipt,
  });
}
