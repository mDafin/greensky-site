import { NextResponse } from "next/server";
import crypto from "node:crypto";

function hmac(data: string, key: string) {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

    const secret = process.env.AUTH_JWT_SECRET;
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    if (!secret) return NextResponse.json({ error: "Server misconfig" }, { status: 500 });

    const ts = String(Date.now());
    const sig = hmac(`${email}.${ts}`, secret);
    const token = `${ts}.${sig}`;
    const url = `${baseUrl}/portal/callback?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

    // In production: email the link instead of returning it.
    return NextResponse.json({ url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
