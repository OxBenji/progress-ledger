import { NextResponse } from "next/server";
import { apiMeta, getBounties } from "../../../lib/proof-ledger";

export const dynamic = "force-static";

export function GET() {
  const bounties = getBounties();

  return NextResponse.json({
    ...apiMeta(),
    count: bounties.length,
    bounties,
  });
}
