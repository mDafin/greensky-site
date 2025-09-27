// components/ValueProps.tsx
"use client";

import React from "react";

type Pillar = {
  title: string;
  blurb: string;
  icon?: React.ReactNode;
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

export default function ValueProps() {
  return (
    <section
      aria-labelledby="value-props-heading"
      className="relative w-full py-16 sm:py-20 bg-[var(--bg)] text-[var(--text)]"
    >
      {/* subtle top hairline to separate from hero */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <h2
          id="value-props-heading"
          className="text-xl sm:text-2xl font-semibold tracking-tight"
        >
          What We Do
        </h2>

        <p className="mt-3 text-sm sm:text-base text-muted max-w-3xl">
          A multi-asset platform focused on resilient cash flows, asymmetric opportunities, and disciplined risk.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-white/10 bg-[color:color-mix(in_oklab,var(--bg)_88%,transparent)] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
            >
              {/* optional icon slot */}
              {p.icon ? <div className="mb-3 text-accent">{p.icon}</div> : null}
              <h3 className="text-base sm:text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}