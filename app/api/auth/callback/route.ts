import { NextResponse } from "next/server";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

function hmac(data: string, key: string) {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { email, token } = await req.json();
    if (!email || !token) return NextResponse.json({ error: "email and token required" }, { status: 400 });

    const secret = process.env.AUTH_JWT_SECRET;
    if (!secret) return NextResponse.json({ error: "Server misconfig" }, { status: 500 });

    const [ts, sig] = token.split(".");
    if (!ts || !sig) return NextResponse.json({ error: "invalid token" }, { status: 400 });

    const expected = hmac(`${email}.${ts}`, secret);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return NextResponse.json({ error: "invalid token" }, { status: 403 });
    }
    if (Date.now() - Number(ts) > 10 * 60 * 1000) {
      return NextResponse.json({ error: "token expired" }, { status: 410 });
    }

    const jti = crypto.randomUUID();
    const jwtToken = jwt.sign({ sub: email, email, roles: ["lender"], jti }, secret, { expiresIn: "1d" });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("gs_session", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
