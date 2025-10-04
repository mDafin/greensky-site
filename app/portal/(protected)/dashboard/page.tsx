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
