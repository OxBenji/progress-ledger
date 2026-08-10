import { NextRequest, NextResponse } from "next/server";
import { apiMeta, listReceipts } from "../../../lib/proof-ledger";

export function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  const track = request.nextUrl.searchParams.get("track");
  const data = listReceipts({ status, track });

  return NextResponse.json({
    ...apiMeta(),
    count: data.length,
    filters: { status, track },
    receipts: data,
  });
}
