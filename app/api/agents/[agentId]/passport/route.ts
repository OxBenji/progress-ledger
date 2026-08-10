import { NextRequest, NextResponse } from "next/server";
import { apiMeta, getAgentPassport } from "../../../../../lib/proof-ledger";

export const dynamic = "force-static";

type Context = {
  params: Promise<{
    agentId: string;
  }>;
};

export async function GET(_request: NextRequest, context: Context) {
  const { agentId } = await context.params;
  const passport = getAgentPassport(agentId);

  if (!passport) {
    return NextResponse.json(
      {
        ...apiMeta(),
        error: "agent_passport_not_found",
        detail: `No prototype passport exists for ${agentId}.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    ...apiMeta(),
    passport,
  });
}
