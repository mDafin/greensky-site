// components/ValueProps.tsx
"use client";

import React from "react";

type Pillar = { title: string; blurb: string; icon?: React.ReactNode };

export type ValuePropsProps = {
  /** "light" = pure white, "soft" = bg-zinc-50 (softer), "dark" = dark section */
  variant?: "light" | "soft" | "dark";
};

const pillars: Pillar[] = [
  {
    title: "Real Estate",
    blurb:
      "Creating long-term value across residential, commercial, and specialized assets with disciplined, cycle-aware strategies.",
  },
  {
    title: "Private Equity",
    blurb:
      "Backing exceptional teams and durable business models to scale, modernize, and compound returns.",
  },
  {
    title: "Credit & Income",
    blurb:
      "Providing flexible capital solutions and risk-managed income strategies across market cycles.",
  },
  {
    title: "Strategic Growth",
    blurb:
      "Investing behind secular trends—technology, infrastructure, and sustainability—to unlock transformative outcomes.",
  },
];

export default function ValueProps({ variant = "light" }: ValuePropsProps): React.JSX.Element {
  const isDark = variant === "dark";
  const isSoft = variant === "soft";
  const sectionClass = isDark
    ? "bg-zinc-900 text-white"
    : isSoft
    ? "bg-zinc-50 text-zinc-900"
    : "bg-white text-zinc-900";

  const mutedText = isDark ? "text-zinc-300" : "text-zinc-700";
  const cardClass = isDark
    ? "bg-zinc-900/60 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
    : "bg-white border border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.06)]";

  return (
    <section aria-labelledby="value-props-heading" className={`w-full py-16 sm:py-20 ${sectionClass}`}>
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <h2 id="value-props-heading" className="text-xl sm:text-2xl font-semibold tracking-tight">
          What We Do
        </h2>

        <p className={`mt-3 text-sm sm:text-base max-w-3xl ${mutedText}`}>
          A multi-asset platform focused on resilient cash flows, asymmetric opportunities, and disciplined risk.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className={`rounded-xl p-5 ${cardClass}`}>
              {p.icon ? (
                <div className="mb-3" style={{ color: "var(--accent, #57B6B2)" }}>
                  {p.icon}
                </div>
              ) : null}
              <h3 className="text-base sm:text-lg font-medium">{p.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>{p.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
