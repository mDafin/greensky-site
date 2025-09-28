// components/sections/FirmSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import SafeLink from "@/components/nav/SafeLink";

// relative import to avoid alias hiccups
import {
  FIRM_STATS,
  BUSINESS_TABS,
  FOOTPRINT,
  type Stat,
  type BusinessTab,
  type TabLink,
} from "../../data/firm";

/**
 * Blackstone-style vibe tweaks:
 * - Soft whites (bg-[#f7f7f5] banding), generous spacing, thin separators
 * - Small uppercase kickers, understated links, tight leading
 * - Buttons are quiet pills; selected tab is dark, others subtle
 * - Map card sits on a soft surface with ring + inner shadow; image is object-contain
 */
export default function FirmSection(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<string>(BUSINESS_TABS[0]?.id ?? "pe");

  return (
    <section id="the-firm" className="w-full bg-white text-zinc-900">
      {/* Hairline that eases out of the dark hero */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      {/* --- Top stats & intro (light) --- */}
      <div className="mx-auto max-w-[1160px] px-4 lg:px-6 py-12 md:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {FIRM_STATS.map((s: Stat) => (
            <div key={s.label} className="text-center">
              <div className="text-[22px] sm:text-[26px] font-semibold tracking-tight">{s.value}</div>
              <div className="mt-1 text-[12.5px] text-zinc-600">{s.label}</div>
              {s.footnote ? (
                <div className="mt-1 text-[11px] text-zinc-500">{s.footnote}</div>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-[15px] sm:text-[16px] leading-relaxed text-zinc-700">
          We serve institutions and individuals by building strong businesses that deliver lasting value.
        </p>
      </div>

      {/* --- Soft light band (like Blackstone’s quiet gray) --- */}
      <div className="bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1160px] px-4 lg:px-6 py-14 md:py-16">
          {/* Header row */}
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Our Businesses</div>
              <h2 className="mt-1 text-[20px] sm:text-[22px] font-semibold tracking-tight">
                Scale, modernization, and operational excellence
              </h2>
            </div>
            <SafeLink
              href="/products"
              className="text-[13px] underline underline-offset-[3px] decoration-zinc-300 hover:text-black"
            >
              View products
            </SafeLink>
          </div>

          {/* Tabs */}
          <div className="mt-5 overflow-x-auto">
            <div className="inline-flex rounded-full border border-black/10 bg-white p-1">
              {BUSINESS_TABS.map((tab: BusinessTab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      "px-3.5 sm:px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors",
                      isActive
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-700 hover:bg-zinc-100"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two-column: copy + media */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Copy */}
            <div className="md:col-span-3">
              {BUSINESS_TABS.map((tab: BusinessTab) =>
                tab.id === activeTab ? (
                  <div key={tab.id}>
                    <h3 className="text-[18px] sm:text-[20px] font-medium tracking-tight">{tab.headline}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">{tab.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tab.links?.map((l: TabLink) => (
                        <SafeLink
                          key={l.label}
                          href={l.href}
                          className="inline-flex items-center text-[13px] rounded-full border border-black/10 bg-white px-3 py-1.5 hover:bg-black/5"
                        >
                          {l.label} <span className="ml-1" aria-hidden>→</span>
                        </SafeLink>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* Media */}
            <div className="md:col-span-2">
              {BUSINESS_TABS.map((tab: BusinessTab) =>
                tab.id === activeTab ? (
                  <div
                    key={tab.id}
                    className="
                      relative aspect-[16/10] w-full overflow-hidden
                      rounded-xl border border-black/10 bg-white
                    "
                  >
                    <Image
                      src={tab.image.src}
                      alt={tab.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 40vw, 100vw"
                      priority={false}
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* --- Global footprint (refined card to match Blackstone aesthetic) --- */}
        <div className="bg-white">
          <div className="mx-auto max-w-[1160px] px-4 lg:px-6 py-14 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">Network</div>
                <h3 className="mt-1 text-[20px] sm:text-[22px] font-semibold tracking-tight">Global Footprint</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
                  We invest across regions with on-the-ground teams and local expertise.
                </p>
                <ul className="mt-4 text-[13.5px] text-zinc-700 grid grid-cols-2 gap-y-1">
                  {FOOTPRINT.regions.map((r: string) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <SafeLink
                    href="/about#locations"
                    className="text-[13px] underline underline-offset-[3px] decoration-zinc-300 hover:text-black"
                  >
                    View offices
                  </SafeLink>
                </div>
              </div>

              <div className="md:col-span-3">
                <div
                  className="
                    relative aspect-[16/9] w-full overflow-hidden
                    rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-50
                    ring-1 ring-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]
                    p-3
                  "
                >
                  {/* Subtle inner frame */}
                  <div className="absolute inset-0 rounded-[14px] border border-black/5 pointer-events-none" />
                  <Image
                    src={FOOTPRINT.map.src}
                    alt={FOOTPRINT.map.alt}
                    fill
                    priority
                    className="relative z-10 object-contain drop-shadow-sm"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{/* /soft band */}
    </section>
  );
}