#!/usr/bin/env bash
set -euo pipefail

echo ">> Creating folders…"
mkdir -p \
  "app/portal/(public)" "app/portal/(public)/request-access" "app/portal/(public)/callback" \
  "app/portal/(protected)" \
  app/api/nda/accept app/api/auth/magic-link app/api/auth/callback app/api/auth/issue app/api/auth/logout \
  app/api/docs/sign "app/api/docs/[docId]/download" \
  lib storage/docs storage \
  scripts

echo ">> Writing files…"

# ------------------------------ app/portal/(public)/page.tsx
cat > "app/portal/(public)/page.tsx" <<'EOF'
"use client";

import React, { useState } from "react";

export default function PortalLandingPage() {
  const [accepted, setAccepted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-xl bg-cyan-400/20 ring-1 ring-cyan-300/30" />
            <span className="font-semibold tracking-wide">Green Sky — Portal</span>
          </div>
          <a href="/" className="text-sm text-slate-300 hover:text-white">Back to site</a>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-10 md:py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold">Secure Partner & Lender Access</h1>
          <p className="mt-2 text-slate-300">Confidential materials. Do not share or redistribute. Access requires agreement to the NDA and verification.</p>

          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">Non-Disclosure Agreement (Click-Wrap)</h2>
            <div id="nda-scroll" className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 h-44 overflow-y-auto text-sm text-slate-300">
              <p className="mb-3"><strong>Confidentiality.</strong> By accessing this portal, you agree to maintain the confidentiality of all materials and data herein (the “Confidential Information”) and to use such information solely for diligence and evaluation purposes.</p>
              <p className="mb-3"><strong>No Distribution.</strong> You agree not to disclose, copy, or distribute any materials without written authorization from Green Sky.</p>
              <p className="mb-3"><strong>Security.</strong> You will implement reasonable safeguards to prevent unauthorized access and will promptly notify Green Sky of any suspected breach.</p>
              <p className="mb-3"><strong>Return/Destruction.</strong> Upon request, you will return or destroy Confidential Information and certify destruction.</p>
              <p className="mb-3"><strong>Reservation of Rights.</strong> No license or other rights are granted by disclosure of Confidential Information.</p>
              <p className="mb-3">By checking the box below and continuing, you acknowledge and agree to this click-wrap NDA.</p>
            </div>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
                onChange={(e) => setAccepted(e.target.checked)}
                data-gtm-event="nda_checkbox_toggle"
              />
              <span>I have read and agree to the NDA above.</span>
            </label>

            <button
              disabled={!accepted}
              onClick={async () => {
                try {
                  await fetch("/api/nda/accept", { method: "POST" });
                  document.getElementById("nda-scroll")?.setAttribute("data-gtm-event", "nda_accept");
                } catch {}
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold transition ${accepted ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-[1.02]" : "bg-white/10 text-slate-400 cursor-not-allowed"}`}
              aria-disabled={!accepted}
            >
              Accept NDA & Continue
            </button>
          </div>

          <div className="my-8 h-px w-full bg-white/10" />

          <div aria-disabled={!accepted} className={`${accepted ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
            <h2 className="text-lg font-semibold">Sign In</h2>
            <p className="mt-1 text-sm text-slate-300">Use your verified email or Single Sign-On provided during onboarding.</p>

            <form
              className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]"
              onSubmit={async (e) => {
                e.preventDefault();
                const r = await fetch("/api/auth/magic-link", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                const data = await r.json().catch(() => ({}));
                (document.body as any).dataset.gtmEvent = "magic_link_requested";
                if (data?.url) window.location.href = data.url;
                else alert("If your email is authorized, a secure sign-in link has been sent.");
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-slate-100 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="h-11 rounded-xl bg-cyan-400 text-slate-950 font-semibold px-5 shadow-lg shadow-cyan-500/20"
                data-gtm-event="magic_link_submit"
              >
                Email Magic Link
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                data-gtm-event="sso_click"
                onClick={() => alert("SSO placeholder — connect your IdP (Okta, Entra, Google)")}
              >
                Continue with SSO
              </button>
              <a
                href="/portal/request-access"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                data-gtm-event="request_access_click"
              >
                Request Access
              </a>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Access is monitored and logged. Unauthorized use is prohibited.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-slate-400">
          © {new Date().getFullYear()} Green Sky. Confidential. All access subject to NDA.
        </div>
      </footer>
    </main>
  );
}
EOF

# ------------------------------ app/portal/(public)/request-access/page.tsx
cat > "app/portal/(public)/request-access/page.tsx" <<'EOF'
"use client";

export default function RequestAccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Request Access</h1>
        <p className="mt-2 text-slate-300 text-sm">Submit your details; our team will review and provision access if appropriate.</p>
        <form
          className="mt-6 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Submitted — our team will follow up.");
          }}
        >
          <input className="h-11 rounded-xl bg-white/5 border border-white/10 px-4" placeholder="Full Name" required />
          <input className="h-11 rounded-xl bg-white/5 border border-white/10 px-4" type="email" placeholder="Work Email" required />
          <input className="h-11 rounded-xl bg-white/5 border border-white/10 px-4" placeholder="Company" required />
          <textarea className="rounded-xl bg-white/5 border border-white/10 px-4 py-3" placeholder="Context / Purpose" rows={4} />
          <button className="h-11 rounded-xl bg-cyan-400 text-slate-950 font-semibold">Submit</button>
        </form>
      </section>
    </main>
  );
}
EOF

# ------------------------------ app/portal/(public)/callback/page.tsx
cat > "app/portal/(public)/callback/page.tsx" <<'EOF'
"use client";

import React, { useEffect, useState } from "react";

export default function PortalCallbackPage({
  searchParams,
}: {
  searchParams: { email?: string; token?: string };
}) {
  const [status, setStatus] = useState("Verifying token…");

  useEffect(() => {
    const email = searchParams?.email || "";
    const token = searchParams?.token || "";
    if (!email || !token) {
      setStatus("Missing parameters");
      return;
    }
    fetch("/api/auth/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token }),
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        setStatus("Signed in — redirecting…");
        setTimeout(() => (window.location.href = "/portal"), 800);
      })
      .catch(() => setStatus("Token invalid or expired."));
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 grid place-items-center">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">{status}</div>
    </main>
  );
}
EOF

# ------------------------------ app/portal/(protected)/layout.tsx
cat > "app/portal/(protected)/layout.tsx" <<'EOF'
import React from "react";
import { requireSession } from "@/lib/auth";
import { requireRole } from "@/lib/rbac";

export const metadata = { title: "Green Sky — Portal" };

type Props = { children: React.ReactNode };

export default async function PortalLayout({ children }: Props) {
  const session = await requireSession();
  requireRole(session.roles, ["lender", "partner", "counsel", "admin"]);

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-xl bg-cyan-400/20 ring-1 ring-cyan-300/30" />
              <span className="font-semibold tracking-wide">Green Sky — Portal</span>
            </div>
            <div className="text-sm text-slate-300">{session.email}</div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
EOF

# ------------------------------ app/portal/(protected)/page.tsx
cat > "app/portal/(protected)/page.tsx" <<'EOF'
import React from "react";
import { requireSession } from "@/lib/auth";

export default async function PortalDashboardPage() {
  const session = await requireSession();
  return (
    <section>
      <h1 className="text-2xl font-semibold">Portal Dashboard</h1>
      <p className="mt-2 text-slate-300 text-sm">Welcome, {session.email}. Your access is logged.</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat k="Activity Growth" v="+87% YoY" />
        <Stat k="Uptime" v="99.9%" />
        <Stat k="Disputes" v="-37%" />
        <Stat k="Retention" v="92%" />
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-xs text-slate-400">{k}</div>
      <div className="mt-1 text-xl font-semibold">{v}</div>
    </div>
  );
}
EOF

# ------------------------------ API: NDA accept
cat > app/api/nda/accept/route.ts <<'EOF'
import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Persist to DB / send server-side event to GTM-SS
  return NextResponse.json({ ok: true });
}
EOF

# ------------------------------ API: auth/magic-link
cat > app/api/auth/magic-link/route.ts <<'EOF'
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
EOF

# ------------------------------ API: auth/callback
cat > app/api/auth/callback/route.ts <<'EOF'
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
EOF

# ------------------------------ API: auth/issue
cat > app/api/auth/issue/route.ts <<'EOF'
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
EOF

# ------------------------------ API: auth/logout
cat > app/api/auth/logout/route.ts <<'EOF'
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("gs_session", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}
EOF

# ------------------------------ API: docs/sign
cat > app/api/docs/sign/route.ts <<'EOF'
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
EOF

# ------------------------------ API: docs/[docId]/download
cat > "app/api/docs/[docId]/download/route.ts" <<'EOF'
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
EOF

# ------------------------------ lib/rbac.ts
cat > lib/rbac.ts <<'EOF'
export type Role = "lender" | "partner" | "counsel" | "admin";

export const ROLES: Role[] = ["lender", "partner", "counsel", "admin"];

export function hasRole(userRoles: Role[] | undefined, required: Role | Role[]): boolean {
  if (!userRoles || userRoles.length === 0) return false;
  const req = Array.isArray(required) ? required : [required];
  return req.some((r) => userRoles.includes(r));
}

export function requireRole(userRoles: Role[] | undefined, required: Role | Role[]): void {
  if (!hasRole(userRoles, required)) {
    const needed = Array.isArray(required) ? required.join(", ") : required;
    throw Object.assign(new Error(`Forbidden: requires role ${needed}`), { status: 403 });
  }
}
EOF

# ------------------------------ lib/auth.ts
cat > lib/auth.ts <<'EOF'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import type { Role } from "./rbac";

type SessionPayload = {
  sub: string;
  email: string;
  roles: Role[];
  jti?: string;
  iat?: number;
  exp?: number;
};

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs_session")?.value;
  if (!token) return null;
  try {
    const secret = process.env.AUTH_JWT_SECRET;
    if (!secret) throw new Error("Missing AUTH_JWT_SECRET");
    const payload = jwt.verify(token, secret) as SessionPayload;
    return payload;
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  return session;
}
EOF

# ------------------------------ lib/watermark.ts
cat > lib/watermark.ts <<'EOF'
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function watermarkPdf(input: Uint8Array, watermarkText: string): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(input);
  const pages = pdf.getPages();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const text = watermarkText;
    const fontSize = Math.max(24, Math.min(width, height) * 0.04);
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = fontSize;

    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: (height - textHeight) / 2,
      size: fontSize,
      font,
      color: rgb(0.8, 0.1, 0.1),
      rotate: { type: "degrees", angle: 45 },
      opacity: 0.18,
    });
  });

  const out = await pdf.save();
  return out;
}
EOF

# ------------------------------ lib/revocation.ts
cat > lib/revocation.ts <<'EOF'
import fs from "node:fs/promises";
import path from "node:path";

type Revocations = {
  signatures: { key: string; revokedAt: number }[]; // key = `${docId}:${sig}`
  sessions: { jti: string; revokedAt: number }[];
};

const DEFAULT_PATH = path.join(process.cwd(), "storage", "revocations.json");

async function ensureFile() {
  const file = process.env.REVOCATION_FILE || DEFAULT_PATH;
  try {
    await fs.access(file);
  } catch {
    const empty: Revocations = { signatures: [], sessions: [] };
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, JSON.stringify(empty, null, 2));
  }
  return file;
}

async function readAll(): Promise<Revocations> {
  const file = await ensureFile();
  const raw = await fs.readFile(file, "utf8");
  try {
    return JSON.parse(raw) as Revocations;
  } catch {
    return { signatures: [], sessions: [] };
  }
}

async function writeAll(data: Revocations) {
  const file = await ensureFile();
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

export async function revokeSignature({ docId, sig }: { docId: string; sig: string }) {
  const data = await readAll();
  const key = `${docId}:${sig}`;
  if (!data.signatures.find((x) => x.key === key)) {
    data.signatures.push({ key, revokedAt: Date.now() });
    await writeAll(data);
  }
}

export async function isSignatureRevoked({ docId, sig }: { docId: string; sig: string }) {
  const data = await readAll();
  const key = `${docId}:${sig}`;
  return !!data.signatures.find((x) => x.key === key);
}

export async function revokeSessionJti(jti: string) {
  const data = await readAll();
  if (!data.sessions.find((x) => x.jti === jti)) {
    data.sessions.push({ jti, revokedAt: Date.now() });
    await writeAll(data);
  }
}

export async function isSessionRevoked(jti: string) {
  const data = await readAll();
  return !!data.sessions.find((x) => x.jti === jti);
}
EOF

# ------------------------------ middleware.ts
cat > middleware.ts <<'EOF'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/portal")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    res.headers.set("Cache-Control", "private, no-store");
    res.headers.set("Referrer-Policy", "no-referrer");
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  }
  return res;
}

export const config = { matcher: ["/portal/:path*"] };
EOF

# ------------------------------ next.config.js
cat > next.config.js <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
EOF

# ------------------------------ scripts/admin.mjs
cat > scripts/admin.mjs <<'EOF'
#!/usr/bin/env node
import fs from "node:fs/promises";
import fssync from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const REVOCATION_FILE = process.env.REVOCATION_FILE || path.join(process.cwd(), "storage", "revocations.json");
const DEFAULT_TTL = Number(process.env.DOC_SIGN_TTL_SECONDS || 300);

if (!AUTH_JWT_SECRET) {
  console.error("[ERR] AUTH_JWT_SECRET env var is required.");
  process.exit(1);
}

function hmacHex(data, key) {
  return crypto.createHmac("sha256", key).update(data).digest("hex");
}

async function ensureRevocationFile() {
  const dir = path.dirname(REVOCATION_FILE);
  await fs.mkdir(dir, { recursive: true });
  if (!fssync.existsSync(REVOCATION_FILE)) {
    const empty = { signatures: [], sessions: [] };
    await fs.writeFile(REVOCATION_FILE, JSON.stringify(empty, null, 2));
  }
}

async function readRevocations() {
  await ensureRevocationFile();
  const raw = await fs.readFile(REVOCATION_FILE, "utf8");
  try { return JSON.parse(raw); } catch { return { signatures: [], sessions: [] }; }
}

async function writeRevocations(data) {
  await ensureRevocationFile();
  await fs.writeFile(REVOCATION_FILE, JSON.stringify(data, null, 2));
}

function parseArgs(argv) {
  const [, , cmd, ...rest] = argv;
  const opts = {};
  for (let i = 0; i < rest.length; i++) {
    const k = rest[i];
    if (k.startsWith("--")) {
      const key = k.slice(2);
      const val = rest[i + 1] && !rest[i + 1].startsWith("--") ? rest[++i] : true;
      opts[key] = val;
    }
  }
  return { cmd, opts };
}

function out(obj) { console.log(JSON.stringify(obj, null, 2)); }

async function cmdHelp() {
  console.log(`Admin CLI

Commands:
  help
  sign-doc --docId DOC123 [--ttl 600]
  revoke-signature --docId DOC123 --sig <hex>
  revoke-session --jti <uuid>
  mint-session --email user@co.com --roles lender,partner [--days 1]
  verify-session --token <jwt>
  list-revocations --type signatures|sessions

Env:
  AUTH_JWT_SECRET (required)
  BASE_URL (default: ${BASE_URL})
  REVOCATION_FILE (default: ${REVOCATION_FILE})
  DOC_SIGN_TTL_SECONDS (default: ${DEFAULT_TTL})
`);
}

async function cmdSignDoc({ docId, ttl }) {
  if (!docId) { console.error("--docId required"); process.exit(1); }
  const expMs = Date.now() + (Number(ttl || DEFAULT_TTL) * 1000);
  const exp = String(expMs);
  const sig = hmacHex(`${docId}.${exp}`, AUTH_JWT_SECRET);
  const pathUrl = `/api/docs/${encodeURIComponent(docId)}/download?exp=${encodeURIComponent(exp)}&sig=${encodeURIComponent(sig)}`;
  const fullUrl = `${BASE_URL}${pathUrl}`;
  out({ docId, exp, sig, url: fullUrl, path: pathUrl });
}

async function cmdRevokeSignature({ docId, sig }) {
  if (!docId || !sig) { console.error("--docId and --sig required"); process.exit(1); }
  const data = await readRevocations();
  const key = `${docId}:${sig}`;
  if (!data.signatures.find((x) => x.key === key)) data.signatures.push({ key, revokedAt: Date.now() });
  await writeRevocations(data);
  out({ ok: true, revoked: key });
}

async function cmdRevokeSession({ jti }) {
  if (!jti) { console.error("--jti required"); process.exit(1); }
  const data = await readRevocations();
  if (!data.sessions.find((x) => x.jti === jti)) data.sessions.push({ jti, revokedAt: Date.now() });
  await writeRevocations(data);
  out({ ok: true, revoked: jti });
}

async function cmdMintSession({ email, roles, days }) {
  if (!email) { console.error("--email required"); process.exit(1); }
  const roleArr = typeof roles === "string"
    ? roles.split(",").map((r) => r.trim()).filter(Boolean)
    : ["lender"];
  const jti = crypto.randomUUID();
  const expiresIn = days ? `${Number(days) * 24}h` : "24h";
  const token = jwt.sign({ sub: email, email, roles: roleArr, jti }, AUTH_JWT_SECRET, { expiresIn });
  const setCookie = `gs_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${24 * 60 * 60}`;
  out({ email, roles: roleArr, jti, token, setCookie });
}

async function cmdVerifySession({ token }) {
  if (!token) { console.error("--token required"); process.exit(1); }
  try {
    const payload = jwt.verify(token, AUTH_JWT_SECRET);
    out({ valid: true, payload });
  } catch (e) {
    out({ valid: false, error: String((e && (e as any).message) || e) });
    process.exitCode = 1;
  }
}

async function cmdListRevocations({ type }) {
  const data = await readRevocations();
  if (type === "signatures") out(data.signatures);
  else if (type === "sessions") out(data.sessions);
  else out(data);
}

(async function main() {
  const { cmd, opts } = parseArgs(process.argv);
  switch (cmd) {
    case "help":
    case undefined: await cmdHelp(); break;
    case "sign-doc": await cmdSignDoc(opts); break;
    case "revoke-signature": await cmdRevokeSignature(opts); break;
    case "revoke-session": await cmdRevokeSession(opts); break;
    case "mint-session": await cmdMintSession(opts); break;
    case "verify-session": await cmdVerifySession(opts); break;
    case "list-revocations": await cmdListRevocations(opts); break;
    default:
      console.error(`[ERR] Unknown command: ${cmd}`);
      await cmdHelp();
      process.exit(1);
  }
})();
EOF
chmod +x scripts/admin.mjs

echo ">> Done."
echo "Next steps:"
echo "  1) Ensure .env.local has AUTH_JWT_SECRET, BASE_URL, (optional) DOC_SIGN_TTL_SECONDS."
echo "  2) Place PDFs in storage/docs/*.pdf"
echo "  3) Start dev server:  npm run dev"
echo "  4) Visit /portal (public) → request magic link → /portal (protected)"
