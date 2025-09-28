"use client";

import React from "react";
import { FIRM_STATS, type Stat } from "../../data/firm";

export default function FirmIntro(): React.JSX.Element {
  return (
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {FIRM_STATS.map((s: Stat) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold">{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm text-zinc-600">{s.label}</div>
              {s.footnote ? (
                <div className="mt-1 text-[11px] text-zinc-500">{s.footnote}</div>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-8 text-[15px] sm:text-base text-zinc-700 max-w-3xl">
          We serve institutions and individuals by building strong businesses that deliver lasting value.
        </p>
      </div>
    </section>
  );
}
