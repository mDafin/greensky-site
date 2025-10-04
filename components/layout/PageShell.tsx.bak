// components/layout/PageShell.tsx
import React from "react";

export function PageShell({
  title,
  kicker,
  children,
  aside,
}: {
  title: string;
  kicker?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="py-16 md:py-24">
      {kicker && (
        <p className="text-sm uppercase tracking-[.12em] text-ink/60">{kicker}</p>
      )}
      <h1 className="h1 mt-2">{title}</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8 prose prose-neutral max-w-none">
          {children}
        </div>
        <aside className="md:col-span-4">
          {aside ?? null}
        </aside>
      </div>
    </section>
  );
}
