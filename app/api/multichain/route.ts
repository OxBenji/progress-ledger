import { NextResponse } from "next/server";
import { apiMeta, getMultichainPlan } from "../../../lib/proof-ledger";

export const dynamic = "force-static";

export function GET() {
  const chains = getMultichainPlan();

  return NextResponse.json({
    ...apiMeta(),
    count: chains.length,
    chains,
  });
}
