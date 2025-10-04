// components/sections/FirmSection.tsx
"use client";

/**
 * ======================================================================
 * File: components/sections/FirmSection.tsx
 * Purpose: “The Firm” overview with tabbed businesses + global footprint
 * Style: Apple-calm — ambient gradient, soft glow, quiet lift on hover
 * Notes:
 *  - No global CSS required; all styles are local via <style jsx>
 *  - Keeps ARIA tabs and keyboard nav (←/→/Home/End)
 *  - Mobile-first, reduced-motion safe
 * ======================================================================
 */

import React from "react";
import Image from "next/image";
import SafeLink from "@/components/nav/SafeLink";

/* ---------------------------------- Types --------------------------------- */
type TabLink = { label: string; href: string };
type BusinessTab = {
  id: "platform" | "fulfillment" | "payments" | "growth";
  label: string;
  headline: string;
  body: string;
  links?: TabLink[];
  image: { src: string; alt: string };
};

/* --------------------------- Business: tab data ---------------------------- */
const BUSINESS_TABS: BusinessTab[] = [
  {
    id: "platform",
    label: "Commerce Platform",
    headline: "Launch, localize, and scale storefronts globally.",
    body:
      "A unified storefront and catalog system with internationalization, multi-currency, inventory, and content built in. Headless APIs for engineers; fast templates for marketers.",
    links: [
      { label: "Platform Overview", href: "/platform" },
      { label: "Headless APIs", href: "/platform/apis" },
      { label: "Multi-Region Setup", href: "/platform/regions" },
    ],
    image: { src: "/firm/platform.jpg", alt: "Commerce platform storefronts" },
  },
  {
    id: "fulfillment",
    label: "Logistics & AI Fulfillment",
    headline: "Faster delivery with AI-assisted routing and network selection.",
    body:
      "Promise-dates at checkout, smart batching, and label optimization. Orders route to the best 3PL or node automatically while minimizing cost and emissions.",
    links: [
      { label: "Logistics OS", href: "/solutions/logistics" },
      { label: "3PL Network", href: "/solutions/3pl" },
      { label: "Sustainability", href: "/impact/supply-chain" },
    ],
    image: { src: "/firm/fulfillment.jpg", alt: "AI logistics & fulfillment" },
  },
  {
    id: "payments",
    label: "Payments",
    headline: "Frictionless checkout with intelligent retries and risk controls.",
    body:
      "One integration for cards, wallets, and local methods. Adaptive authorization improves acceptance; built-in risk tools cut fraud and chargebacks without hurting conversion.",
    links: [
      { label: "Payments Docs", href: "/solutions/payments" },
      { label: "Methods & Wallets", href: "/solutions/payments#methods" },
      { label: "Risk & Compliance", href: "/legal/security" },
    ],
    image: { src: "/firm/payments.jpg", alt: "Payments and checkout" },
  },
  {
    id: "growth",
    label: "Growth Solutions",
    headline: "Acquire, retain, and expand LTV across channels.",
    body:
      "Audience sync, offer orchestration, merchandising intelligence, and A/B testing. Convert traffic into customers and customers into advocates.",
    links: [
      { label: "Growth Playbooks", href: "/solutions/growth" },
      { label: "Merch Intelligence", href: "/solutions/growth#merch" },
      { label: "Case Studies", href: "/resources/case-studies" },
    ],
    image: { src: "/firm/growth.jpg", alt: "Growth analytics and insights" },
  },
];

const FOOTPRINT = {
  regions: ["North America", "Latin America", "Europe", "Middle East", "Africa", "APAC"],
  map: { src: "/firm/map.jpg", alt: "Global presence map" },
};

// Tiny neutral blur placeholder
const NEUTRAL_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMTInIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzEyJyBmaWxsPScjZjRmNGY1Jy8+PC9zdmc+";

/* --------------------------------- Component ------------------------------- */
export default function FirmSection(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<BusinessTab["id"]>("platform");

  // Keyboard navigation for tabs (←/→/Home/End)
  const tabRefs = React.useRef<Record<BusinessTab["id"], HTMLButtonElement | null>>({
    platform: null,
    fulfillment: null,
    payments: null,
    growth: null,
  });

  const ids = BUSINESS_TABS.map((t) => t.id);
  const onKeyTabs = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIdx = ids.indexOf(activeTab);
    if (currentIdx < 0) return;

    let nextIdx = currentIdx;
    switch (e.key) {
      case "ArrowRight":
        nextIdx = (currentIdx + 1) % ids.length;
        break;
      case "ArrowLeft":
        nextIdx = (currentIdx - 1 + ids.length) % ids.length;
        break;
      case "Home":
        nextIdx = 0;
        break;
      case "End":
        nextIdx = ids.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    const nextId = ids[nextIdx] as BusinessTab["id"];
    setActiveTab(nextId);
    tabRefs.current[nextId]?.focus();
  };

  return (
    <section id="the-firm" className="w-full bg-white text-zinc-900">
      {/* ===== Ambient header (subtle) ===== */}
      <div className="ambient" aria-hidden />

      {/* Intro */}
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">The Firm</div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold leading-tight">
            A unified platform for global e-commerce
          </h2>
          <p className="mt-3 text-[15px] sm:text-base text-zinc-700 leading-relaxed">
            We help brands and merchants launch modern storefronts, fulfill faster with AI, accept
            payments everywhere, and grow lifetime value—on one platform.
          </p>
          <div className="mt-5 flex gap-3">
            <SafeLink
              href="/platform"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              style={{ backgroundColor: "var(--accent,#57B6B2)", color: "#0b0b0b" }}
            >
              Explore the Platform
            </SafeLink>
            <SafeLink
              href="/contact"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border border-black/10 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Talk to Sales
            </SafeLink>
          </div>
        </div>
      </div>

      {/* Tabs + Media on soft light surface */}
      <div className="section-surface text-zinc-900">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-14">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold leading-tight">Our Businesses</h3>
            <SafeLink href="/products" className="text-sm underline decoration-zinc-300 hover:text-black">
              View products
            </SafeLink>
          </div>

          {/* Tabs */}
          <div className="mt-4 overflow-x-auto" role="tablist" aria-label="Business areas" onKeyDown={onKeyTabs}>
            <div className="tabsShell inline-flex rounded-xl border border-black/10 bg-white p-1">
              {BUSINESS_TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    id={`tab-${tab.id}`}
                    ref={(el) => {
                      tabRefs.current[tab.id] = el; // ensure void return for Ref type
                    }}
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      "px-3 sm:px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors " +
                      (isActive ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100 focus:bg-zinc-100")
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panels */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Copy */}
            <div className="md:col-span-3">
              {BUSINESS_TABS.map((tab) =>
                tab.id === activeTab ? (
                  <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`}>
                    <h4 className="text-lg sm:text-xl font-medium leading-tight">{tab.headline}</h4>
                    <p className="mt-2 text-zinc-700 leading-relaxed">{tab.body}</p>
                    {!!tab.links?.length && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tab.links.map((l) => (
                          <SafeLink
                            key={l.label}
                            href={l.href}
                            className="inline-flex items-center text-sm rounded-md border border-black/10 bg-white px-3 py-1.5 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                          >
                            {l.label} <span className="ml-1" aria-hidden>
                              →
                            </span>
                          </SafeLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null
              )}
            </div>

            {/* Media */}
            <div className="md:col-span-2">
              {BUSINESS_TABS.map((tab) =>
                tab.id === activeTab ? (
                  <div
                    key={tab.id}
                    className="mediaCard relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white"
                  >
                    <Image
                      src={tab.image.src}
                      alt={tab.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 40vw, 100vw"
                      placeholder="blur"
                      blurDataURL={NEUTRAL_BLUR}
                      priority={false}
                      draggable={false}
                    />
                    <span aria-hidden className="mediaGlow" />
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* Global footprint (light) */}
        <div className="bg-white">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-14">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-2">
                <h3 className="text-xl sm:text-2xl font-semibold leading-tight">Global Footprint</h3>
                <p className="mt-2 text-zinc-700">
                  We operate across regions with local expertise, partner networks, and on-the-ground support.
                </p>
                <ul className="mt-4 text-sm text-zinc-700 grid grid-cols-2 gap-1">
                  {FOOTPRINT.regions.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <SafeLink href="/about#locations" className="text-sm underline decoration-zinc-300 hover:text-black">
                    View offices
                  </SafeLink>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="motifCard relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white">
                  {/* Map image */}
                  <Image
                    src={FOOTPRINT.map.src}
                    alt={FOOTPRINT.map.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder="blur"
                    blurDataURL={NEUTRAL_BLUR}
                    draggable={false}
                  />
                  {/* Subtle screen-blend motif */}
                  <span aria-hidden className="motifOverlay" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* /soft light surface */}

      {/* Local styles (ambient gradient, glows, motion/contrast guards) */}
      <style jsx>{`
        /* Ambient accent behind the intro block */
        .ambient {
          position: absolute;
          inset: 0 0 auto 0;
          height: 220px;
          background:
            radial-gradient(60% 100% at 8% 0%, rgba(87, 182, 178, 0.14), transparent 65%),
            radial-gradient(36% 70% at 92% 0%, rgba(87, 182, 178, 0.10), transparent 70%);
          pointer-events: none;
        }

        /* Soft section surface */
        .section-surface {
          background: linear-gradient(to bottom, #fafafa, #ffffff);
        }

        /* Media card glow (very subtle) */
        .mediaCard { position: relative; }
        .mediaGlow {
          position: absolute; inset: 0;
          background: radial-gradient(120% 120% at 70% 30%, rgba(87, 182, 178, 0.16), transparent 60%);
          mix-blend-mode: screen;
          opacity: 0; transition: opacity 220ms ease;
          pointer-events: none;
        }
        .mediaCard:hover .mediaGlow { opacity: 1; }

        /* Footprint motif overlay (grid-lines + soft tint) */
        .motifCard { position: relative; }
        .motifOverlay {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
          background-size: 18px 18px;
          mix-blend-mode: multiply;
          opacity: 0.4;
          pointer-events: none;
        }

        /* Reduced-motion guard */
        @media (prefers-reduced-motion: reduce) {
          .mediaGlow, .motifOverlay { transition: none !important; }
        }

        /* High-contrast tweaks (local-only; no :global) */
        @media (prefers-contrast: more) {
          .tabsShell,
          .mediaCard,
          .motifCard {
            border-color: rgba(0, 0, 0, 0.30) !important;
          }
        }
      `}</style>
    </section>
  );
}