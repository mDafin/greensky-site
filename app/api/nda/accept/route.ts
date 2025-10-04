import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Persist to DB / send server-side event to GTM-SS
  return NextResponse.json({ ok: true });
}
