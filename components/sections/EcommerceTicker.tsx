/**
* ============================================================================
* File: components/sections/EcommerceTicker.tsx
* Purpose: Single-track marquee (no overlap) with calm Apple-like glide
* Owner: Web | Status: Production
* ============================================================================
*/

"use client";

import React from "react";
import SafeLink from "@/components/nav/SafeLink";

/* ------------------------------ Content ------------------------------ */

const LINKS = [
  { label: "Commerce Platform", href: "/platform" },
  { label: "Logistics & AI Fulfillment", href: "/solutions/fulfillment" },
  { label: "Payments", href: "/solutions/payments" },
  { label: "Growth Solutions", href: "/solutions/growth" },
] as const;

// One strong set (no rotation)
const LINES: readonly string[] = [
  "Your storefront is global the moment you launch—no borders, no delays.",
  "AI predicts demand, routes inventory, and sets prices that flex with the market.",
  "Checkout is instant, trusted, and invisible; fraud is stopped before it starts.",
  "From cart to doorstep, logistics stay fast, accurate, and low-cost.",
];

/* ------------------------------ Component ------------------------------ */

type Props = {
  /** Seconds for one full loop. Slower feels more premium. */
  speedSec?: number;
  /** Force motion even if user prefers reduced motion. Default false. */
  forceMotion?: boolean;
};

// CSS var helper for TS
type CSSVars = { ["--speed"]?: string };

export default function EcommerceTicker({
  speedSec = 60, // slower = calmer
  forceMotion = false,
}: Props): React.JSX.Element {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

  const marqueeStyle: React.CSSProperties & CSSVars = { "--speed": `${speedSec}s` };

  return (
    <section className="bg-zinc-900 text-white min-h-[85vh] flex flex-col justify-between">
      {/* Top content (polished) */}
      <div className="hero-wrap relative">
        {/* vignette */}
        <div aria-hidden className="hero-vignette" />

        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-5 gap-8 items-start relative z-[1]">
          <div className="md:col-span-3">
            {/* Headline left-aligned */}
            <h2 className="leading-tight">
              <span className="headline">
                Enterprise infrastructure for digital commerce
              </span>
            </h2>

            {/* “Commerce Platform” centered underneath with soft rise-in */}
            <div
              className="mt-3 text-[11px] uppercase tracking-[0.14em] text-zinc-400 text-center label-rise"
              data-motion={forceMotion || !prefersReduced ? "on" : "off"}
            >
              Commerce Platform
            </div>

            <p className="mt-4 text-zinc-300 max-w-prose">
              We power global merchants with scalable storefronts, AI-driven logistics, secure
              payments, and growth solutions designed for the next generation of commerce.
            </p>

            {/* tiny trust row (quiet) */}
            <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
              <li className="badge">
                <span className="dot" /> PCI-DSS compliant
              </li>
              <li className="badge">
                <span className="dot" /> 99.99% uptime
              </li>
              <li className="badge">
                <span className="dot" /> SOC 2 Type II
              </li>
            </ul>

            <div className="mt-6">
              <SafeLink
                href="/platform"
                className="inline-flex items-center text-sm rounded-md px-4 py-2 font-medium bg-white text-zinc-900 hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              >
                Explore Platform
              </SafeLink>
            </div>
          </div>

          {/* Capability quick-links */}
          <div className="md:col-span-2 w-full rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur p-2">
            {LINKS.map((p) => (
              <SafeLink
                key={p.label}
                href={p.href}
                className="cap-row group block px-4 py-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px]">{p.label}</span>
                  <span
                    aria-hidden
                    className="cap-arrow ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/25 text-sm"
                  >
                    →
                  </span>
                </div>
                {/* soft inner glow */}
                <span aria-hidden className="cap-glow" />
              </SafeLink>
            ))}
          </div>
        </div>
      </div>

      {/* --------- Single-track Marquee (no overlap) --------- */}
      <div className="border-t border-white/10">
        <div className="relative overflow-hidden">
          <div
            className="marquee"
            data-motion={forceMotion || !prefersReduced ? "on" : "off"}
            style={marqueeStyle}
            aria-hidden="true"
          >
            {/* One belt only. We duplicate the content inline to make the loop seamless. */}
            <div className="belt">
              {LINES.map((t, i) => (
                <span key={`L-${i}`} className="chip">
                  {t}
                </span>
              ))}
              {LINES.map((t, i) => (
                <span key={`L2-${i}`} className="chip" aria-hidden>
                  {t}
                </span>
              ))}
            </div>

            {/* Optional soft fade edges for elegance */}
            <div className="edge edge--left" />
            <div className="edge edge--right" />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ---------- Top block polish ---------- */
        .hero-wrap {
          position: relative;
        }
        .hero-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              120% 80% at 20% 0%,
              rgba(87, 182, 178, 0.14),
              transparent 55%
            ),
            radial-gradient(
              120% 80% at 80% 0%,
              rgba(87, 182, 178, 0.08),
              transparent 60%
            );
          opacity: 0.55;
          pointer-events: none;
        }

        .headline {
          display: inline-block;
          font-weight: 700;
          font-size: clamp(1.5rem, 3.2vw, 2.25rem);
          letter-spacing: -0.015em;
          background: linear-gradient(
            90deg,
            #fff 0%,
            #e9fcfb 30%,
            rgba(255, 255, 255, 0.9) 60%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          position: relative;
          padding-bottom: 8px;
        }
        .headline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 38%; /* balanced with centered label below */
          height: 2px;
          background: linear-gradient(90deg, var(--accent), rgba(255, 255, 255, 0.7));
          opacity: 0.9;
          border-radius: 999px;
        }

        /* Centered sublabel animation */
        .label-rise {
          opacity: 0;
          transform: translateY(6px);
          animation: rise 520ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms forwards;
        }
        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Respect Reduced Motion unless forceMotion=true via data-motion="on" */
        .label-rise[data-motion="off"] {
          animation: none !important;
          opacity: 1;
          transform: none;
        }

        .badge {
          position: relative;
          padding-left: 0.9rem;
        }
        .badge .dot {
          position: absolute;
          left: 0;
          top: 0.45em;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 0 2px rgba(87, 182, 178, 0.15);
        }

        /* Capability rows */
        .cap-row {
          position: relative;
          overflow: hidden;
          transition: background-color 160ms ease, transform 160ms ease;
          will-change: transform;
        }
        .cap-row:hover {
          background: rgba(255, 255, 255, 0.07);
          transform: translateY(-1px);
        }
        .cap-arrow {
          transition: transform 160ms ease, background-color 160ms ease, color 160ms ease,
            border-color 160ms ease;
          opacity: 0.9;
        }
        .cap-row:hover .cap-arrow {
          transform: translateX(2px);
          background: white;
          color: #0b0b0b;
          border-color: transparent;
        }
        .cap-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            80% 180% at 0% 50%,
            rgba(87, 182, 178, 0.16),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 160ms ease;
        }
        .cap-row:hover .cap-glow,
        .cap-row:focus-visible .cap-glow {
          opacity: 1;
        }

        /* ---------- Marquee ---------- */
        .marquee {
          position: relative;
          height: clamp(3rem, 6vw, 4rem);
          padding: 0.6rem 0;
          overflow: hidden;
          --speed: 60s;
        }

        .belt {
          position: relative;
          display: inline-flex;
          white-space: nowrap;
          gap: 2rem;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
          min-width: 200%; /* ensures enough width for loop */
          animation: slide var(--speed) linear infinite;
        }

        .chip {
          display: inline-block;
          flex-shrink: 0; /* never compress text */
          white-space: nowrap; /* keep each phrase intact */
          font-weight: 600;
          font-size: clamp(1.25rem, 3.8vw, 2.4rem); /* auto-tunes on mobile */
          color: rgba(255, 255, 255, 0.9);
          margin: 0 1.5rem;
          user-select: none;
          pointer-events: none;
          text-rendering: optimizeLegibility;
        }

        @keyframes slide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          } /* 200% width -> shift by half */
        }

        /* Subtle edge fades (optional) */
        .edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 12vw;
          pointer-events: none;
          background: linear-gradient(to right, rgba(24, 24, 27, 0.95), transparent);
        }
        .edge--left {
          left: 0;
        }
        .edge--right {
          right: 0;
          background: linear-gradient(to left, rgba(24, 24, 27, 0.95), transparent);
        }

        /* Honor Reduced Motion unless forceMotion is true */
        .marquee[data-motion="off"] .belt {
          animation: none !important;
        }

        /* Preference guards */
        @media (prefers-reduced-motion: reduce) {
          .cap-row,
          .cap-arrow,
          .cap-glow,
          .headline::after {
            transition: none !important;
          }
        }

        @media (prefers-contrast: more) {
          .headline::after {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}