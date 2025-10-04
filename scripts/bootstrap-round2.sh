#!/usr/bin/env bash
set -euo pipefail

echo ">> Round 2: SEO + branding updates"

# Ensure dirs that we will write to
mkdir -p public
mkdir -p app/portal
mkdir -p app/portal/\(public\)/request-access
mkdir -p app/portal/\(public\)/callback
mkdir -p app/portal/\(protected\)/dashboard

# --------------------------------------------------------------------------------
# public/logo-dark.svg  (simple crisp glyph — replace with your brand when ready)
# --------------------------------------------------------------------------------
cat > public/logo-dark.svg <<'EOF'
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Green Sky">
  <rect width="44" height="44" rx="12" fill="#0B0B0B"/>
  <path d="M11.5 23.2c0-6.4 5-11.6 11.6-11.6 3.9 0 7.3 2 9.3 5a1.4 1.4 0 01-2.3 1.6 8.8 8.8 0 00-7-3.8c-4.9 0-8.9 4-8.9 8.9 0 4.9 4 8.9 8.9 8.9 3.1 0 5.9-1.6 7.4-4.1h-5.7a1.4 1.4 0 110-2.8h8.3c.8 0 1.4.6 1.4 1.4 0 6.2-5.5 10.9-11.4 10.9-6.6 0-11.6-5.2-11.6-11.6z" fill="#2AB99F"/>
</svg>
EOF

# --------------------------------------------------------------------------------
# app/portal/page.tsx  (PUBLIC landing – NDA + login; now with metadata + logo)
# --------------------------------------------------------------------------------
cat > app/portal/page.tsx <<'EOF'
"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green Sky — Secure Partner & Lender Portal",
  description:
    "Confidential access for lenders and partners. NDA click-wrap and secure sign-in to view diligence materials.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Green Sky — Partner & Lender Portal",
    description:
      "Confidential access for lenders and partners with NDA and secure magic-link sign-in.",
    type: "website",
  },
};

export default function PortalLandingPage() {
  const [accepted, setAccepted] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Top */}
      <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo-dark.svg"
              alt="Green Sky"
              width={28}
              height={28}
              priority
              className="rounded-xl"
            />
            <span className="font-semibold tracking-wide">Green Sky — Portal</span>
          </a>
          <a href="/" className="text-sm text-slate-300 hover:text-white">
            Back to site
          </a>
        </div>
      </header>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-6 py-10 md:py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold">Secure Partner & Lender Access</h1>
          <p className="mt-2 text-slate-300">
            Confidential materials. Do not share or redistribute. Access requires agreement to
            the NDA and verification.
          </p>

          {/* NDA Block */}
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">Non-Disclosure Agreement (Click-Wrap)</h2>
            <div
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 h-44 overflow-y-auto text-sm text-slate-300"
              id="nda-scroll"
            >
              <p className="mb-3">
                <strong>Confidentiality.</strong> By accessing this portal, you agree to maintain
                the confidentiality of all materials and data herein (the “Confidential
                Information”) and to use such information solely for diligence and evaluation
                purposes.
              </p>
              <p className="mb-3">
                <strong>No Distribution.</strong> You agree not to disclose, copy, or distribute any
                materials without written authorization from Green Sky.
              </p>
              <p className="mb-3">
                <strong>Security.</strong> You will implement reasonable safeguards to prevent
                unauthorized access and will promptly notify Green Sky of any suspected breach.
              </p>
              <p className="mb-3">
                <strong>Return/Destruction.</strong> Upon request, you will return or destroy
                Confidential Information and certify destruction.
              </p>
              <p className="mb-3">
                <strong>Reservation of Rights.</strong> No license or other rights are granted by
                disclosure of Confidential Information.
              </p>
              <p className="mb-3">
                By checking the box below and continuing, you acknowledge and agree to this
                click-wrap NDA.
              </p>
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
                  const el = document.getElementById("nda-scroll");
                  el?.setAttribute("data-gtm-event", "nda_accept");
                } catch {}
              }}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold transition ${
                accepted
                  ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-[1.02]"
                  : "bg-white/10 text-slate-400 cursor-not-allowed"
              }`}
              aria-disabled={!accepted}
            >
              Accept NDA & Continue
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-white/10" />

          {/* Login Methods */}
          <div
            aria-disabled={!accepted}
            className={`${accepted ? "opacity-100" : "opacity-50 pointer-events-none"}`}
          >
            <h2 className="text-lg font-semibold">Sign In</h2>
            <p className="mt-1 text-sm text-slate-300">
              Use your verified email or Single Sign-On provided during onboarding.
            </p>

            <form
              className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]"
              onSubmit={async (e) => {
                e.preventDefault();
                const r = await fetch("/api/auth/magic-link", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                const data = await r.json().catch(() => ({} as any));
                (document.body as any).dataset.gtmEvent = "magic_link_requested";
                if ((data as any)?.url) window.location.href = (data as any).url;
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

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-slate-400">
          © {new Date().getFullYear()} Green Sky. Confidential. All access subject to NDA.
        </div>
      </footer>
    </main>
  );
}
EOF

# --------------------------------------------------------------------------------
# app/portal/(public)/request-access/page.tsx  (metadata + consistent header)
# --------------------------------------------------------------------------------
cat > app/portal/\(public\)/request-access/page.tsx <<'EOF'
"use client";

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Request Access — Green Sky Portal",
  description: "Request access to Green Sky’s partner & lender portal.",
  robots: { index: false, follow: false },
};

export default function RequestAccessPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <a href="/portal" className="flex items-center gap-3">
            <Image src="/logo-dark.svg" alt="Green Sky" width={28} height={28} priority />
            <span className="font-semibold tracking-wide">Green Sky — Portal</span>
          </a>
          <a href="/" className="text-sm text-slate-300 hover:text-white">Back to site</a>
        </div>
      </header>

      <section className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Request Access</h1>
        <p className="mt-2 text-slate-300 text-sm">
          Submit your details; our team will review and provision access if appropriate.
        </p>
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

# --------------------------------------------------------------------------------
# app/portal/(public)/callback/page.tsx  (metadata)
# --------------------------------------------------------------------------------
cat > app/portal/\(public\)/callback/page.tsx <<'EOF'
"use client";

import React, { useEffect, useState } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifying — Green Sky Portal",
  description: "Finalizing secure sign-in.",
  robots: { index: false, follow: false },
};

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
        setTimeout(() => (window.location.href = "/portal/dashboard"), 800);
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

# --------------------------------------------------------------------------------
# app/portal/(protected)/layout.tsx  (metadata template for protected area)
# --------------------------------------------------------------------------------
cat > app/portal/\(protected\)/layout.tsx <<'EOF'
import React from "react";
import { requireSession } from "@/lib/auth";
import { requireRole } from "@/lib/rbac";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Green Sky — Portal",
    template: "%s — Green Sky Portal",
  },
  description: "Authenticated partner & lender portal.",
  robots: { index: false, follow: false },
};

type Props = { children: React.ReactNode };

export default async function PortalLayout({ children }: Props) {
  const session = await requireSession();
  requireRole(session.roles, ["lender", "partner", "counsel", "admin"]);

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <a href="/portal" className="flex items-center gap-3">
              <img src="/logo-dark.svg" alt="Green Sky" width="28" height="28" />
              <span className="font-semibold tracking-wide">Green Sky — Portal</span>
            </a>
            <div className="text-sm text-slate-300">{session.email}</div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
EOF

# --------------------------------------------------------------------------------
# app/portal/(protected)/dashboard/page.tsx  (metadata for dashboard)
# --------------------------------------------------------------------------------
cat > app/portal/\(protected\)/dashboard/page.tsx <<'EOF'
import React from "react";
import { requireSession } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview of your portal activity.",
  robots: { index: false, follow: false },
};

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

echo ">> Done (Round 2)."
echo "What changed:"
echo "  • Added metadata (title/description/robots) to all portal routes"
echo "  • Swapped header dot for /public/logo-dark.svg"
echo "  • Protected layout now uses a title template and keeps noindex"
echo
echo "Next:"
echo "  1) Start dev: npm run dev"
echo "  2) Visit /portal (public) → Request magic link"
echo "  3) After callback, you’ll land on /portal/dashboard"
