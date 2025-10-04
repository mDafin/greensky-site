import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { cookies, headers } from "next/headers";
import { watermarkPdf } from "@/lib/watermark";
import { isSignatureRevoked } from "@/lib/revocation";

function hmac(data: string, key: string) {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

function verifySignature(docId: string, exp: string, sig: string, key: string) {
  const expected = hmac(`${docId}.${exp}`, key);
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function GET(req: Request, { params }: { params: { docId: string } }) {
  try {
    const url = new URL(req.url);
    const sig = url.searchParams.get("sig");
    const exp = url.searchParams.get("exp");
    if (!sig || !exp) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

    const secret = process.env.AUTH_JWT_SECRET;
    if (!secret) return NextResponse.json({ error: "Server misconfig" }, { status: 500 });

    const expires = Number(exp);
    if (!Number.isFinite(expires) || Date.now() > expires) {
      return NextResponse.json({ error: "Link expired" }, { status: 410 });
    }

    if (!verifySignature(params.docId, exp, sig, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    if (await isSignatureRevoked({ docId: params.docId, sig })) {
      return NextResponse.json({ error: "Link revoked" }, { status: 403 });
    }

    const baseDir = process.env.DOC_STORAGE_DIR || path.join(process.cwd(), "storage", "docs");
    const filePath = path.join(baseDir, `${params.docId}.pdf`);
    const buf = await fs.readFile(filePath);

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("gs_session")?.value || "unknown";
    const hdrs = await headers();
    const ip = hdrs.get("x-forwarded-for") || "0.0.0.0";

    const watermark = `Confidential • ${new Date().toISOString()} • IP:${ip} • Token:${sessionToken.slice(0, 12)}…`;
    const stamped = await watermarkPdf(new Uint8Array(buf), watermark);

    console.log(JSON.stringify({ evt: "doc_download", docId: params.docId, ip, ts: Date.now() }));

    return new NextResponse(Buffer.from(stamped), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${params.docId}.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e: any) {
    const status = e?.status || 500;
    return NextResponse.json({ error: e?.message || "Server error" }, { status });
  }
}
