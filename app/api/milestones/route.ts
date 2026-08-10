import { NextResponse } from "next/server";
import { apiMeta, getMilestoneRules } from "../../../lib/proof-ledger";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    ...apiMeta(),
    milestones: getMilestoneRules(),
  });
}
