"use client";

import React from "react";
import Image from "next/image";
import SafeLink from "@/components/nav/SafeLink";
import { LOGOS } from "../../data/firm";

export default function ImpactLogosLight(): React.JSX.Element {
  return (
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-14 md:py-16">
        {/* ESG / Impact copy + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-wide text-zinc-500">Impact</div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold">
              Building sustainable businesses & career pathways
            </h2>
            <p className="mt-3 text-zinc-700 leading-relaxed max-w-2xl">
              We invest behind long-term trends—technology, infrastructure, and sustainability—
              to unlock durable value for our investors, partners, and communities.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <SafeLink
                href="/impact/sustainable"
                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: "var(--accent,#57B6B2)", color: "#0b0b0b" }}
              >
                Our Approach
              </SafeLink>
              <SafeLink
                href="/impact"
                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border border-black/10 hover:bg-black/5"
              >
                Learn More
              </SafeLink>
            </div>
          </div>

          {/* Supporting visual (optional) */}
          <div className="md:col-span-2">
            <div className="relative w-full aspect-[16/10] rounded-xl border border-black/10 overflow-hidden bg-zinc-50">
              <Image
                src="/firm/impact.jpg"           // replace with a real image when ready
                alt="Sustainable infrastructure"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        {/* Logos grid */}
        <div className="mt-8">
          <div className="text-sm font-medium text-zinc-800">Selected Partners & Portfolio</div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {LOGOS.slice(0, 12).map((logo) => (
              <div key={logo.alt} className="relative h-[34px] sm:h-[38px] grayscale opacity-80">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <SafeLink href="/portfolio" className="text-sm underline decoration-zinc-300 hover:text-black">
              View full portfolio
            </SafeLink>
          </div>
        </div>
      </div>
    </section>
  );
}