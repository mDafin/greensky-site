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
