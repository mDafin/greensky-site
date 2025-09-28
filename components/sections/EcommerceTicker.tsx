// components/sections/EcommerceTicker.tsx
"use client";

import React from "react";
import SafeLink from "@/components/nav/SafeLink";

export default function EcommerceTicker(): React.JSX.Element {
  return (
    <section className="bg-zinc-900 text-white min-h-[85vh] flex flex-col justify-between">
      {/* Top content */}
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">Commerce Platform</div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold leading-tight">
            Enterprise infrastructure for digital commerce
          </h2>
          <p className="mt-3 text-zinc-300 max-w-prose">
            We power global merchants with scalable storefronts, AI-driven logistics, secure payments,
            and growth solutions designed for the next generation of commerce.
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

      {/* Smooth marquee */}
      <div className="border-t border-white/10">
        <div className="relative overflow-hidden">
          {/* Track: duplicate content for seamless loop */}
          <div className="marquee-track">
            <span className="marquee-item">Build commerce with Green Sky</span>
            <span className="marquee-item">AI-powered logistics at global scale</span>
            <span className="marquee-item">Seamless payments for every market</span>
            <span className="marquee-item">Unlock growth with data-driven insights</span>

            {/* duplicate */}
            <span className="marquee-item" aria-hidden>Build commerce with Green Sky</span>
            <span className="marquee-item" aria-hidden>AI-powered logistics at global scale</span>
            <span className="marquee-item" aria-hidden>Seamless payments for every market</span>
            <span className="marquee-item" aria-hidden>Unlock growth with data-driven insights</span>
          </div>
        </div>
      </div>

      {/* Local CSS (GPU-friendly + reduced motion) */}
      <style jsx>{`
        .marquee-track {
          display: inline-flex;
          gap: 2rem;
          white-space: nowrap;
          padding: 2rem 0;
          font-weight: 600;
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: rgba(255,255,255,0.8);
          /* GPU layer + hinting */
          will-change: transform;
          transform: translate3d(0, 0, 0);
          /* The magic: animate only transform, linear, long duration */
          animation: marquee-move 32s linear infinite;
        }
        .marquee-item {
          margin-inline: 2rem;
        }
        @keyframes marquee-move {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        /* Accessibility: respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}