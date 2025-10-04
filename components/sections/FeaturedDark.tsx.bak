"use client";

import React from "react";
import Image from "next/image";
import SafeLink from "@/components/nav/SafeLink";
import { FEATURED_INSIGHT } from "../../data/firm";

export default function FeaturedDark(): React.JSX.Element {
  return (
    <section className="bg-zinc-900 text-white">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
          {/* Editorial card */}
          <article className="md:col-span-3 rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-8">
            <div className="text-xs uppercase tracking-wide text-zinc-300">
              {FEATURED_INSIGHT.kicker}
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold leading-tight">
              {FEATURED_INSIGHT.title}
            </h3>
            <p className="mt-3 text-zinc-200 text-base leading-relaxed">
              {FEATURED_INSIGHT.summary}
            </p>
            <div className="mt-6">
              <SafeLink
                href={FEATURED_INSIGHT.href}
                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: "var(--accent,#57B6B2)", color: "#0b0b0b" }}
              >
                Read Insight
              </SafeLink>
            </div>
          </article>

          {/* Visual card (optional image placeholder) */}
          <div className="md:col-span-2">
            <div className="relative h-[220px] sm:h-full min-h-[220px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <Image
                src="/firm/impact.jpg" // swap if you prefer a different art direction
                alt="Editorial visual"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover opacity-95"
                priority
              />
              {/* subtle vignette for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
          </div>
        </div>

        {/* Divider + secondary links (optional) */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
          <SafeLink href="/insights" className="underline underline-offset-2 decoration-white/30 hover:decoration-white">
            View all insights
          </SafeLink>
          <span className="text-white/40">•</span>
          <SafeLink href="/news" className="underline underline-offset-2 decoration-white/30 hover:decoration-white">
            Latest news
          </SafeLink>
        </div>
      </div>
    </section>
  );
}