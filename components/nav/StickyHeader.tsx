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
    id: "firm",
    label: "THE FIRM",
    columns: [
      {
        title: "Our Clients",
        links: [
          { label: "Institutional Investors", href: "/clients/institutional" },
          { label: "Financial Advisors", href: "/clients/advisors" },
          { label: "Family Offices", href: "/clients/family-offices" },
          { label: "Insurance", href: "/clients/insurance" },
        ],
      },
      {
        title: "The Firm",
        links: [
          { label: "Overview", href: "/about" },
          { label: "Our People", href: "/people" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        title: "Our Impact",
        links: [
          { label: "Sustainable Businesses", href: "/impact/sustainable" },
          { label: "Career Pathways", href: "/impact/career-pathways" },
          { label: "Foundation", href: "/impact/foundation" },
          { label: "LaunchPad", href: "/impact/launchpad" },
        ],
      },
    ],
  },
  {
    id: "what",
    label: "WHAT WE DO",
    columns: [
      {
        title: "Businesses",
        links: [
          { label: "Private Equity", href: "/businesses/pe" },
          { label: "Real Estate", href: "/businesses/re" },
          { label: "Credit & Insurance", href: "/businesses/credit" },
          { label: "Strategic Partners", href: "/businesses/sp" },
          { label: "Tactical Opportunities", href: "/businesses/tac-opp" },
          { label: "Infrastructure", href: "/businesses/infra" },
          { label: "Life Sciences", href: "/businesses/life-sciences" },
          { label: "Growth", href: "/businesses/growth" },
        ],
      },
      {
        title: "Transformation",
        links: [
          { label: "Technology & Innovation", href: "/transformation/tech" },
          { label: "Operating Team", href: "/transformation/operating-team" },
        ],
      },
      {
        title: "Products",
        links: [
          { label: "BREIT", href: "/products/breit" },
          { label: "BCRED", href: "/products/bcred" },
          { label: "BMACX", href: "/products/bmacx" },
          { label: "View All", href: "/products" },
        ],
      },
    ],
  },

  /* >>> SWAPPED ORDER: NEWS & INSIGHTS now before FINANCIAL ADVISORS <<< */
  {
    id: "news",
    label: "NEWS & INSIGHTS",
    columns: [
      {
        title: "News",
        links: [
          { label: "View All", href: "/news" },
          { label: "Press Releases", href: "/press" },
          { label: "In the News", href: "/in-the-news" },
        ],
      },
      {
        title: "Insights",
        links: [
          { label: "View All", href: "/insights" },
          { label: "Market Views", href: "/insights/market-views" },
          { label: "Pattern Recognition", href: "/insights/pattern-recognition" },
        ],
      },
      {
        title: "Essentials of Private Markets",
        links: [
          { label: "Overview", href: "/private-markets" },
          { label: "Private Equity", href: "/private-markets/pe" },
          { label: "Private Credit", href: "/private-markets/credit" },
          { label: "Private Real Estate", href: "/private-markets/re" },
          { label: "Private Infrastructure", href: "/private-markets/infra" },
        ],
      },
      {
        promo: true,
        title: "Infrastructure of the Future",
        text: "We spot trends early and invest at scale behind them.",
        cta: { label: "Learn More", href: "/themes/infrastructure-of-the-future" },
        // more reliable Unsplash URL pattern
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },

  /* FINANCIAL ADVISORS now follows NEWS & INSIGHTS */
  {
    id: "advisors",
    label: "FINANCIAL ADVISORS",
    columns: [
      {
        title: "Overview",
        links: [
          { label: "Why Green Sky", href: "/advisors" },
          { label: "How It Works", href: "/advisors/how-it-works" },
          { label: "FAQs", href: "/advisors/faq" },
        ],
      },
      {
        title: "Products",
        links: [
          { label: "BCRED", href: "/products/bcred" },
          { label: "BMACX", href: "/products/bmacx" },
          { label: "BREIT", href: "/products/breit" },
          { label: "View All Products", href: "/products" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Advisor Resources", href: "/advisors/resources" },
          { label: "Due Diligence", href: "/advisors/due-diligence" },
          { label: "Literature", href: "/advisors/literature" },
        ],
      },
      {
        promo: true,
        title: "Partner With Us",
        text: "Tools, education, and access to private markets for your clients.",
        cta: { label: "Get in Touch", href: "/contact" },
        image:
          "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
];

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  React.useEffect(() => {
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

export default function StickyHeader({
  compact = false,
}: {
  compact?: boolean;
}): React.JSX.Element {
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const logoHeight = compact ? 26 : 28;
  const logoWidth = Math.round(logoHeight * 4);

  return (
    <div
      ref={navRef}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled
          ? "bg-white/90 text-zinc-900 border-b border-black/10 backdrop-blur-sm dark:bg-zinc-900/80 dark:text-zinc-100 dark:border-white/10"
          : "bg-transparent text-zinc-900 dark:text-zinc-100"
      )}
    >
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        <div
          className={clsx(
            "flex items-center",
            compact ? "h-14 lg:h-[60px]" : "h-16 lg:h-[68px]"
          )}
        >
          {/* Brand (swap by header background, not by theme) */}
          <div className="shrink-0">
            <Link href="/" aria-label="Green Sky" className="inline-flex items-center">
              {/* Light logo for dark/transparent header (over hero) */}
              <Image
                src="/logo-light.svg"
                alt="Green Sky"
                width={logoWidth}
                height={logoHeight}
                priority
                className={clsx(scrolled ? "hidden" : "block")}
              />
              {/* Dark logo once header turns light on scroll */}
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
                    "text-zinc-800 dark:text-zinc-200",
                    "hover:text-accent focus:text-accent",
                    "after:absolute after:left-3 after:right-3 after:-bottom-[4px] after:h-[1px]",
                    openId === item.id
                      ? "after:bg-accent"
                      : "after:bg-transparent group-hover:after:bg-accent/70 group-focus:after:bg-accent/80",
                    "transition-colors duration-150 focus:outline-none"
                  )}
                  aria-expanded={openId === item.id}
                  aria-controls={`panel-${item.id}`}
                  onMouseEnter={() => setOpenId(item.id)}
                  onFocus={() => setOpenId(item.id)}
                  onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                >
                  {item.label}
                </button>

                {/* MEGA PANEL */}
                {openId === item.id && (
                  <div
                    id={`panel-${item.id}`}
                    onMouseLeave={() => setOpenId(null)}
                    role="region"
                    className={clsx(
                      "fixed left-1/2 -translate-x-1/2 z-[60]",
                      "top-[72px] md:top-[76px]",
                      "w-[min(1120px,calc(100vw-2rem))] rounded-xl",
                      "border border-black/10 bg-white/95 text-zinc-900",
                      "dark:border-white/10 dark:bg-zinc-900/95 dark:text-zinc-100",
                      "shadow-[0_30px_60px_rgba(0,0,0,0.45)] backdrop-blur supports-[backdrop-filter]:dark:bg-zinc-900/80"
                    )}
                  >
                    <div className="h-px w-full bg-black/10 dark:bg-white/12" />
                    <div className="px-6 md:px-7 lg:px-8 py-7">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                        {item.columns.map((col, idx) =>
                          "promo" in col && col.promo ? (
                            <SafeLink
                              key={idx}
                              href={col.cta?.href ?? "#"}
                              className={clsx(
                                "rounded-lg overflow-hidden grid grid-cols-5 transition-colors",
                                "hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                              )}
                              style={{
                                backgroundColor: "color-mix(in oklab, var(--bg) 94%, transparent)",
                                border:
                                  "1px solid color-mix(in oklab, var(--text) 12%, transparent)",
                              }}
                            >
                              <div className="col-span-3 p-5">
                                <h5 className="text-[15px] font-semibold leading-snug">
                                  {col.title}
                                </h5>
                                <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                                  {col.text}
                                </p>
                                <div className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-accent">
                                  <span>{col.cta?.label ?? "Learn More"}</span>
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
                                    className="object-cover"
                                  />
                                ) : null}
                              </div>
                            </SafeLink>
                          ) : (
                            <div key={idx}>
                              {"title" in col && (
                                <h4 className="text-[11px] font-medium mb-2.5 uppercase tracking-[0.14em] text-zinc-600 dark:text-zinc-400">
                                  {col.title}
                                </h4>
                              )}
                              <ul className="space-y-2">
                                {("links" in col ? col.links : []).map((link) => (
                                  <li key={link.label}>
                                    {isExternal(link.href) ? (
                                      <a
                                        href={link.href}
                                        className={clsx(
                                          "text-[14px] leading-snug focus:outline-none",
                                          "text-zinc-800 hover:text-accent focus:text-accent",
                                          "dark:text-zinc-100 dark:hover:text-accent dark:focus:text-accent"
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {link.label}
                                      </a>
                                    ) : (
                                      <SafeLink
                                        href={link.href}
                                        className={clsx(
                                          "text-[14px] leading-snug focus:outline-none",
                                          "text-zinc-800 hover:text-accent focus:text-accent",
                                          "dark:text-zinc-100 dark:hover:text-accent dark:focus:text-accent"
                                        )}
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
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-black/15 to-transparent dark:via-white/20" />
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Spacer */}
          <div className="ml-auto" />

          {/* Utility links */}
          <div className="hidden lg:flex items-center gap-4 mr-2">
            <SafeLink
              href="/shareholders"
              className="text-sm whitespace-nowrap text-zinc-800 hover:text-accent dark:text-zinc-200 dark:hover:text-accent"
            >
              Shareholders
            </SafeLink>
            <SafeLink
              href="/lp-login"
              className="text-sm whitespace-nowrap text-zinc-800 hover:text-accent dark:text-zinc-200 dark:hover:text-accent"
            >
              LP Login
            </SafeLink>
          </div>

          {/* Actions (Search only) */}
          <div className="hidden lg:flex items-center gap-2">
            <SearchButton />
          </div>

          {/* Mobile actions (Search only) */}
          <div className="lg:hidden ml-auto flex items-center gap-2">
            <SearchButton />
          </div>
        </div>
      </div>
    </div>
  );
}
