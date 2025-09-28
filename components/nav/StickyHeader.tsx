// components/nav/StickyHeader.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import SearchButton from "@/components/nav/SearchButton";
import SafeLink from "@/components/nav/SafeLink";

type LinkItem = { label: string; href: string };
type Column =
  | { title: string; links: LinkItem[]; promo?: false }
  | { promo: true; title: string; text: string; cta?: LinkItem; image?: string };

const navData: { id: string; label: string; columns: Column[] }[] = [
  {
    id: "platform",
    label: "PLATFORM",
    columns: [
      {
        title: "Commerce Platform",
        links: [
          { label: "Overview", href: "/platform" },
          { label: "Storefront & Catalog", href: "/platform/storefront" },
          { label: "Checkout & APIs", href: "/platform/checkout" },
          { label: "Merchant Tools", href: "/platform/merchant-tools" },
        ],
      },
      {
        title: "Core Capabilities",
        links: [
          { label: "Globalization (Multi-Region)", href: "/platform/global" },
          { label: "Compliance & Security", href: "/platform/security" },
          { label: "Data & Analytics", href: "/platform/analytics" },
        ],
      },
      {
        title: "AI on Platform",
        links: [
          { label: "AI Search & Recommendations", href: "/platform/ai/recommendations" },
          { label: "AI Merchandising", href: "/platform/ai/merchandising" },
          { label: "AI Customer Service (Chat)", href: "/platform/ai/support" },
          // Added for clarity
          { label: "AI Personalization", href: "/platform/ai/personalization" },
        ],
      },
    ],
  },
  {
    id: "solutions",
    label: "SOLUTIONS",
    columns: [
      {
        title: "Operations",
        links: [
          { label: "Logistics & Fulfillment", href: "/solutions/logistics" },
          { label: "Inventory & OMS", href: "/solutions/oms" },
          { label: "Returns & Reverse Logistics", href: "/solutions/returns" },
        ],
      },
      {
        title: "Monetization",
        links: [
          { label: "Payments", href: "/solutions/payments" },
          { label: "Subscriptions", href: "/solutions/subscriptions" },
          { label: "B2B Invoicing", href: "/solutions/b2b-invoicing" },
        ],
      },
      {
        title: "AI Solutions",
        links: [
          { label: "AI Demand Forecasting", href: "/solutions/ai/forecasting" },
          { label: "AI Fraud Detection", href: "/solutions/ai/fraud" },
          { label: "Dynamic Pricing (AI)", href: "/solutions/ai/pricing" },
          // Added umbrella item
          { label: "AI Commerce Tools", href: "/solutions/ai" },
        ],
      },
    ],
  },
  {
    id: "industries",
    label: "INDUSTRIES",
    columns: [
      {
        title: "Where We Operate",
        links: [
          { label: "Retail & Brands", href: "/industries/retail" },
          { label: "DTC & Subscriptions", href: "/industries/dtc" },
          { label: "Marketplaces", href: "/industries/marketplaces" },
          { label: "B2B Commerce", href: "/industries/b2b" },
        ],
      },
      {
        title: "Regions",
        links: [
          { label: "North America", href: "/regions/na" },
          { label: "EMEA", href: "/regions/emea" },
          { label: "APAC", href: "/regions/apac" },
        ],
      },
      {
        promo: true,
        title: "Operate Globally, Locally",
        text: "Multi-storefront, multi-currency, and localized checkout out of the box.",
        cta: { label: "See how", href: "/platform/global" },
        image: "/nav/promo.jpg", // ensure this exists under /public/nav/promo.jpg
      },
    ],
  },
  {
    id: "resources",
    label: "RESOURCES",
    columns: [
      {
        title: "Learn",
        links: [
          { label: "Case Studies", href: "/resources/case-studies" },
          { label: "Guides & Playbooks", href: "/resources/guides" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Build",
        links: [
          { label: "Developer Docs", href: "/docs" },
          { label: "API Reference", href: "/docs/api" },
          { label: "Changelog", href: "/docs/changelog" },
        ],
      },
      {
        title: "AI Resources",
        links: [
          { label: "AI Implementation Guide", href: "/resources/ai/implementation" },
          { label: "Responsible AI & Safety", href: "/resources/ai/safety" },
          { label: "Benchmarks & Results", href: "/resources/ai/benchmarks" },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "COMPANY",
    columns: [
      {
        title: "About",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Leadership", href: "/people" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        title: "News & Investors",
        links: [
          { label: "News & Insights", href: "/insights" },
          { label: "Press", href: "/press" },
          { label: "Investors", href: "/investors" },
        ],
      },
      {
        title: "Trust Center",
        links: [
          { label: "Security", href: "/platform/security" },
          { label: "Compliance", href: "/platform/security#compliance" },
          { label: "Status", href: "/status" },
        ],
      },
    ],
  },
];

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const isExternal = (href: string) =>
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

export default function StickyHeader({ compact = false }: { compact?: boolean }): React.JSX.Element {
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setOpenId(null));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const logoHeight = compact ? 26 : 28;
  const logoWidth = Math.round(logoHeight * 4); // ~4:1

  return (
    <div
      ref={navRef}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        "border-b border-white/10 backdrop-blur",
        scrolled
          ? "bg-zinc-900/90 shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
          : "bg-zinc-900/80"
      )}
    >
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <div className={clsx("flex items-center", compact ? "h-14 lg:h-[60px]" : "h-16 lg:h-[68px]")}>
          {/* Brand — header always dark; swap logo per your preference */}
          <div className="shrink-0">
            <Link href="/" aria-label="Green Sky" className="inline-flex items-center">
              {/* Light logo at top */}
              <Image
                src="/logo-light.svg"
                alt="Green Sky"
                width={logoWidth}
                height={logoHeight}
                priority
                className={clsx(scrolled ? "hidden" : "block")}
              />
              {/* Dark logo after scroll */}
              <Image
                src="/logo-dark.svg"
                alt="Green Sky"
                width={logoWidth}
                height={logoHeight}
                priority
                className={clsx(scrolled ? "block" : "hidden")}
              />
            </Link>
          </div>

          {/* Primary nav */}
          <nav aria-label="Primary" className="ml-6 hidden lg:flex items-center gap-1.5">
            {navData.map((item) => (
              <div key={item.id} className="relative">
                <button
                  className={clsx(
                    "px-3 py-2 text-[12px] uppercase tracking-[0.12em] whitespace-nowrap relative group",
                    "text-zinc-100",
                    "hover:text-accent focus:text-accent",
                    "after:absolute after:left-3 after:right-3 after:-bottom-[4px] after:h-[1px]",
                    openId === item.id
                      ? "after:bg-accent"
                      : "after:bg-transparent group-hover:after:bg-accent/70 group-focus:after:bg-accent/80",
                    "transition-colors duration-150 focus:outline-none"
                  )}
                  aria-expanded={openId === item.id}
                  aria-haspopup="true"
                  aria-controls={`panel-${item.id}`}
                  onMouseEnter={() => setOpenId(item.id)}
                  onFocus={() => setOpenId(item.id)}
                  onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                >
                  {item.label}
                </button>

                {/* DARK MEGA PANEL */}
                {openId === item.id && (
                  <div
                    id={`panel-${item.id}`}
                    onMouseLeave={() => setOpenId(null)}
                    role="region"
                    className={clsx(
                      "fixed left-1/2 -translate-x-1/2 z-[60]",
                      "top-[72px] md:top-[76px]",
                      "w-[min(1120px,calc(100vw-2rem))] rounded-xl",
                      "border border-white/10 bg-zinc-900/95 text-white",
                      "shadow-[0_30px_60px_rgba(0,0,0,0.65)] backdrop-blur"
                    )}
                  >
                    <div className="h-px w-full bg-white/10" />
                    <div className="px-6 md:px-7 lg:px-8 py-7">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                        {item.columns.map((col, idx) =>
                          "promo" in col && col.promo ? (
                            <SafeLink
                              key={idx}
                              href={col.cta?.href ?? "#"}
                              className={clsx(
                                "rounded-lg overflow-hidden grid grid-cols-5 transition-colors",
                                "hover:bg-white/[0.04]"
                              )}
                              style={{
                                backgroundColor: "color-mix(in oklab, black 88%, transparent)",
                                border: "1px solid rgba(255,255,255,0.12)",
                              }}
                            >
                              <div className="col-span-3 p-5">
                                <h5 className="text-[15px] font-semibold leading-snug">{col.title}</h5>
                                <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-300">{col.text}</p>
                                <div className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-accent">
                                  <span>{col.cta?.label ?? "Learn more"}</span>
                                  <span aria-hidden>→</span>
                                </div>
                              </div>
                              <div className="col-span-2 relative min-h-36">
                                {col.image ? (
                                  <Image
                                    src={col.image}
                                    alt=""
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover opacity-90"
                                  />
                                ) : null}
                              </div>
                            </SafeLink>
                          ) : (
                            <div key={idx}>
                              {"title" in col && (
                                <h4 className="text-[11px] font-medium mb-2.5 uppercase tracking-[0.14em] text-zinc-400">
                                  {col.title}
                                </h4>
                              )}
                              <ul className="space-y-2">
                                {("links" in col ? col.links : []).map((link) => (
                                  <li key={link.label}>
                                    {isExternal(link.href) ? (
                                      <a
                                        href={link.href}
                                        className="text-[14px] leading-snug text-zinc-200 hover:text-accent focus:text-accent focus:outline-none"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {link.label}
                                      </a>
                                    ) : (
                                      <SafeLink
                                        href={link.href}
                                        className="text-[14px] leading-snug text-zinc-200 hover:text-accent focus:text-accent"
                                      >
                                        {link.label}
                                      </SafeLink>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Spacer */}
          <div className="ml-auto" />

          {/* Utility links */}
          <div className="hidden lg:flex items-center gap-4 mr-2">
            <SafeLink href="/pricing" className="text-sm whitespace-nowrap text-zinc-100 hover:text-accent">
              Pricing
            </SafeLink>
            <SafeLink href="/contact" className="text-sm whitespace-nowrap text-zinc-100 hover:text-accent">
              Contact
            </SafeLink>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <SearchButton />
          </div>

          {/* Mobile actions */}
          <div className="lg:hidden ml-auto flex items-center gap-2">
            <SearchButton />
          </div>
        </div>
      </div>
    </div>
  );
}