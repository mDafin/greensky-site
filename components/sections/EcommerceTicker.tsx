// components/sections/EcommerceTicker.tsx
"use client";

import React from "react";
import SafeLink from "@/components/nav/SafeLink";

const items = [
  "Build commerce with Green Sky",
  "AI-powered logistics at global scale",
  "Seamless payments for every market",
  "Enterprise-ready growth solutions",
  "Commerce APIs built for scale",
];

export default function EcommerceTicker(): React.JSX.Element {
  return (
    <section
      aria-label="E-Commerce Platform"
      className="
        relative w-full h-[100svh]
        bg-zinc-900 text-white
        flex flex-col
      "
    >
      {/* Top content area — vertically centered */}
      <div className="flex-1 flex items-center">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* Left copy */}
            <div className="md:col-span-3">
              <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                Commerce Platform
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold leading-tight">
                Enterprise infrastructure for digital commerce
              </h2>
              <p className="mt-3 text-zinc-300 max-w-prose">
                We power global merchants with scalable storefronts, AI-driven logistics, secure
                payments, and growth solutions designed for the next generation of commerce.
              </p>
              <div className="mt-5">
                <SafeLink
                  href="/platform"
                  className="inline-flex items-center text-sm rounded-md px-4 py-2 font-medium bg-white text-zinc-900 hover:bg-zinc-200"
                >
                  Explore Platform
                </SafeLink>
              </div>
            </div>

            {/* Right product list */}
            <div className="md:col-span-2 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur p-2">
              {[
                { label: "Commerce Platform", href: "/platform" },
                { label: "Logistics & AI Fulfillment", href: "/solutions/fulfillment" },
                { label: "Payments", href: "/solutions/payments" },
                { label: "Growth Solutions", href: "/solutions/growth" },
              ].map((p) => (
                <SafeLink
                  key={p.label}
                  href={p.href}
                  className="group block px-4 py-3 rounded-lg hover:bg-white/5 focus:bg-white/5 focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[15px]">{p.label}</span>
                    <span
                      aria-hidden
                      className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-sm group-hover:bg-white group-hover:text-zinc-900"
                    >
                      →
                    </span>
                  </div>
                </SafeLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee band */}
      <div className="relative border-t border-white/10">
        {/* Edge fade masks (soften start/end) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-zinc-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-zinc-900 to-transparent" />

        <div className="relative overflow-hidden">
          <div
            className="whitespace-nowrap will-change-transform py-8 text-4xl sm:text-5xl md:text-6xl font-semibold text-white/80"
            style={{ animation: "commerceMarquee 28s linear infinite" }}
          >
            {/* duplicate the items to create a continuous loop */}
            {[...items, ...items].map((text, i) => (
              <span key={i} className="mx-8">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes local to this component (not styled-jsx) */}
      <style>{`
        @keyframes commerceMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  );
}