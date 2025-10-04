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
