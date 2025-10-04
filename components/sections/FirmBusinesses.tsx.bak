"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import SafeLink from "@/components/nav/SafeLink";
import { BUSINESS_TABS, type BusinessTab, type TabLink } from "../../data/firm";

export default function FirmBusinesses(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<string>(BUSINESS_TABS[0]?.id ?? "pe");

  return (
    <section className="bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-14 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Our Businesses</h2>
          <SafeLink href="/products" className="text-sm underline decoration-zinc-300 hover:text-black">
            View products
          </SafeLink>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="inline-flex rounded-xl border border-black/10 bg-white p-1">
            {BUSINESS_TABS.map((tab: BusinessTab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "px-3 sm:px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors",
                    isActive ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Copy */}
          <div className="md:col-span-3">
            {BUSINESS_TABS.map((tab: BusinessTab) =>
              tab.id === activeTab ? (
                <div key={tab.id}>
                  <h3 className="text-lg sm:text-xl font-medium">{tab.headline}</h3>
                  <p className="mt-2 text-zinc-700 leading-relaxed">{tab.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tab.links?.map((l: TabLink) => (
                      <SafeLink
                        key={l.label}
                        href={l.href}
                        className="inline-flex items-center text-sm rounded-md border border-black/10 bg-white px-3 py-1.5 hover:bg-black/5"
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
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white"
                >
                  <Image
                    src={tab.image.src}
                    alt={tab.image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
