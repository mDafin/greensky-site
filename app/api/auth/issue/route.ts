import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

export async function POST(req: Request) {
  try {
    const { email, roles } = await req.json();
    if (!email || !Array.isArray(roles)) {
      return NextResponse.json({ error: "email and roles required" }, { status: 400 });
    }
    const secret = process.env.AUTH_JWT_SECRET;
    if (!secret) return NextResponse.json({ error: "Server misconfig" }, { status: 500 });

    const jti = crypto.randomUUID();
    const token = jwt.sign({ sub: email, email, roles, jti }, secret, { expiresIn: "1d" });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("gs_session", token, {
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
