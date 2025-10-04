import { NextResponse } from "next/server";
import crypto from "node:crypto";

function hmac(data: string, key: string) {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { docId } = await req.json();
    if (!docId) return NextResponse.json({ error: "docId required" }, { status: 400 });

    const secret = process.env.AUTH_JWT_SECRET;
    if (!secret) return NextResponse.json({ error: "Server misconfig" }, { status: 500 });

    const ttl = Number(process.env.DOC_SIGN_TTL_SECONDS || 300) * 1000;
    const exp = String(Date.now() + ttl);
    const sig = hmac(`${docId}.${exp}`, secret);
    const url = `/api/docs/${encodeURIComponent(docId)}/download?exp=${encodeURIComponent(exp)}&sig=${encodeURIComponent(sig)}`;

    return NextResponse.json({ url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
