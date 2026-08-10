import { NextResponse } from "next/server";
import { apiMeta, getBackendIndex } from "../../../lib/proof-ledger";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({
    ok: true,
    ...apiMeta(),
    backend: getBackendIndex(),
  });
}
