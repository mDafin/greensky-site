// components/sections/FirmSection.tsx
"use client";

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

/* --------------------------- E-commerce: tab data -------------------------- */
/* Uses your existing placeholders:
   /public/firm/platform.jpg
   /public/firm/fulfillment.jpg
   /public/firm/payments.jpg
   /public/firm/growth.jpg
   and /public/firm/map.jpg for the footprint block. */
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
  regions: [
    "North America",
    "Latin America",
    "Europe",
    "Middle East",
    "Africa",
    "APAC",
  ],
  map: { src: "/firm/map.jpg", alt: "Global presence map" },
};

/* --------------------------------- Component ------------------------------- */
export default function FirmSection(): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState<BusinessTab["id"]>("platform");

  return (
    <section id="the-firm" className="w-full bg-white text-zinc-900">
      {/* Intro */}
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            The Firm
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">
            A unified platform for global e-commerce
          </h2>
          <p className="mt-3 text-[15px] sm:text-base text-zinc-700">
            We help brands and merchants launch modern storefronts, fulfill faster with AI,
            accept payments everywhere, and grow lifetime value—on one platform.
          </p>
          <div className="mt-5 flex gap-3">
            <SafeLink
              href="/platform"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: "var(--accent,#57B6B2)", color: "#0b0b0b" }}
            >
              Explore the Platform
            </SafeLink>
            <SafeLink
              href="/contact"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium border border-black/10 hover:bg-black/5"
            >
              Talk to Sales
            </SafeLink>
          </div>
        </div>
      </div>

      {/* Tabs + Media on soft light surface */}
      <div className="bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 md:py-14">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold">Our Businesses</h3>
            <SafeLink
              href="/products"
              className="text-sm underline decoration-zinc-300 hover:text-black"
            >
              View products
            </SafeLink>
          </div>

          {/* Tabs */}
          <div className="mt-4 overflow-x-auto">
            <div className="inline-flex rounded-xl border border-black/10 bg-white p-1">
              {BUSINESS_TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={
                      "px-3 sm:px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-colors " +
                      (isActive ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100")
                    }
                    aria-pressed={isActive}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Copy */}
            <div className="md:col-span-3">
              {BUSINESS_TABS.map((tab) =>
                tab.id === activeTab ? (
                  <div key={tab.id}>
                    <h4 className="text-lg sm:text-xl font-medium">{tab.headline}</h4>
                    <p className="mt-2 text-zinc-700 leading-relaxed">{tab.body}</p>
                    {!!tab.links?.length && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tab.links.map((l) => (
                          <SafeLink
                            key={l.label}
                            href={l.href}
                            className="inline-flex items-center text-sm rounded-md border border-black/10 bg-white px-3 py-1.5 hover:bg-black/5"
                          >
                            {l.label} <span className="ml-1" aria-hidden>→</span>
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
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white"
                  >
                    <Image
                      src={tab.image.src}
                      alt={tab.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 40vw, 100vw"
                      priority
                    />
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
                <h3 className="text-xl sm:text-2xl font-semibold">Global Footprint</h3>
                <p className="mt-2 text-zinc-700">
                  We operate across regions with local expertise, partner networks, and on-the-ground support.
                </p>
                <ul className="mt-4 text-sm text-zinc-700 grid grid-cols-2 gap-1">
                  {FOOTPRINT.regions.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <SafeLink href="/about#locations" className="text-sm underline hover:text-black">
                    View offices
                  </SafeLink>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white">
                  <Image
                    src={FOOTPRINT.map.src}
                    alt={FOOTPRINT.map.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* /soft light surface */}
    </section>
  );
}