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
