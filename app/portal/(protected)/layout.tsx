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
