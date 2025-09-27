// components/nav/MegaNavBlackstoneClone.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import type { Route } from "next";

import SearchButton from "@/components/nav/SearchButton";
import ThemeToggle from "@/components/nav/ThemeToggle";
import Brand from "@/components/nav/Brand";

type LinkItem = { label: string; href: string }; // can be internal or external (we’ll narrow at render)

type Column =
  | { title: string; links: LinkItem[]; promo?: false }
  | { promo: true; title: string; text: string; cta?: LinkItem; image?: string };

const navData: { id: string; label: string; columns: Column[] }[] = [
  {
    id: "firm",
    label: "The Firm",
    columns: [
      {
        title: "The Firm",
        links: [
          { label: "Overview", href: "/about" },
          { label: "Our People", href: "/people" },
          { label: "Careers", href: "/careers" },
        ],
      },
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
    label: "What We Do",
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
  {
    id: "news",
    label: "News & Insights",
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
        image:
          "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "advisors",
    label: "Financial Advisors",
    columns: [
      {
        title: "Private Wealth at Green Sky",
        links: [{ label: "Overview", href: "/private-wealth" }],
      },
      {
        title: "University",
        links: [
          { label: "Overview", href: "/university" },
          { label: "Essentials", href: "/university/essentials" },
          { label: "Accessing Private Markets", href: "/university/accessing" },
          { label: "Allocating to Private Assets", href: "/university/allocating" },
          { label: "Insights", href: "/university/insights" },
          { label: "Events", href: "/university/events" },
          { label: "Continuing Education", href: "/university/ce" },
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

export default function MegaNavBlackstoneClone({ compact = false }: { compact?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setOpenId(null));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenId(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={navRef} className="w-full text-white">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* Bar */}
        <div className={clsx("flex items-center", compact ? "h-14 lg:h-[60px]" : "h-16 lg:h-[68px]")}>
          {/* Left: Brand */}
          <div className="shrink-0">
            <Brand height={compact ? 26 : 28} />
          </div>

          {/* RIGHT CLUSTER (nav + actions) */}
          <div className="ml-auto flex items-center gap-6">
            {/* Desktop primary nav */}
            <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
              {navData.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    className={clsx(
                      "px-3 py-2 text-[12.5px] uppercase tracking-[0.13em] text-zinc-200",
                      "hover:text-white focus:text-white focus:outline-none",
                      "relative after:absolute after:left-3 after:right-3 after:-bottom-[3px] after:h-[1px]",
                      openId === item.id
                        ? "after:bg-white"
                        : "after:bg-transparent group-hover:after:bg-white/70 focus:after:bg-white/80",
                      "transition-[color] duration-150"
                    )}
                    aria-expanded={openId === item.id}
                    aria-controls={`panel-${item.id}`}
                    onMouseEnter={() => setOpenId(item.id)}
                    onFocus={() => setOpenId(item.id)}
                    onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                  >
                    <span className="inline-flex items-center gap-2">
                      {item.label}
                      <svg
                        aria-hidden
                        className={clsx(
                          "h-[10px] w-[10px] transition-transform",
                          openId === item.id ? "rotate-180" : "rotate-0"
                        )}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.18l3.71-2.95a.75.75 0 1 1 .94 1.16l-4.24 3.37a.75.75 0 0 1-.94 0L5.21 8.39a.75.75 0 0 1 .02-1.18z" />
                      </svg>
                    </span>
                  </button>

                  {/* Mega Panel */}
                  {openId === item.id && (
                    <div
                      id={`panel-${item.id}`}
                      onMouseLeave={() => setOpenId(null)}
                      className="
                        z-[60] absolute left-1/2 -translate-x-1/2 mt-3
                        w-[86vw] max-w-6xl rounded-xl border border-white/10
                        bg-zinc-900/95 shadow-[0_30px_60px_rgba(0,0,0,0.55)]
                        backdrop-blur supports-[backdrop-filter]:bg-zinc-900/80
                      "
                      role="region"
                    >
                      <div className="h-px w-full bg-white/12" />
                      <div className="px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {item.columns.map((col, idx) =>
                            "promo" in col && col.promo ? (
                              <Link
                                key={idx}
                                href={(col.cta?.href ?? "#") as Route}
                                prefetch={false}
                                className="rounded-lg overflow-hidden border border-white/10 bg-zinc-800/60 hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-white/40 grid grid-cols-5"
                              >
                                <div className="col-span-3 p-5">
                                  <h5 className="text-white font-semibold">{col.title}</h5>
                                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{col.text}</p>
                                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-accent">
                                    <span>Learn More</span>
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
                              </Link>
                            ) : (
                              <div key={idx}>
                                {"title" in col && (
                                  <h4 className="text-[11px] font-medium text-zinc-400 mb-3 uppercase tracking-[0.14em]">
                                    {col.title}
                                  </h4>
                                )}
                                <ul className="space-y-[7px]">
                                  {("links" in col ? col.links : []).map((link) => {
                                    const external = isExternal(link.href);
                                    return (
                                      <li key={link.label}>
                                        {external ? (
                                          <a
                                            href={link.href}
                                            className="text-[14px] leading-[1.35] text-zinc-100 hover:text-white focus:text-white focus:outline-none"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {link.label}
                                          </a>
                                        ) : (
                                          <Link
                                            href={link.href as Route}
                                            prefetch={false}
                                            className="text-[14px] leading-[1.35] text-zinc-100 hover:text-white focus:text-white focus:outline-none"
                                          >
                                            {link.label}
                                          </Link>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  )}
                </div>
              ))}

              {/* Right side actions */}
              <div className="pl-3 ml-1 border-l border-white/10 flex items-center gap-2">
                <SearchButton />
                <ThemeToggle />
              </div>
            </nav>

            {/* Mobile actions */}
            <div className="lg:hidden flex items-center gap-2">
              <SearchButton />
              <button
                className="rounded-lg border border-white/15 px-3 py-2 text-sm"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen((v) => !v)}
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={clsx("lg:hidden border-t border-white/10 bg-zinc-900", mobileOpen ? "block" : "hidden")}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 space-y-6">
          {navData.map((item) => (
            <details key={item.id} className="group">
              <summary className="list-none cursor-pointer select-none text-base font-medium text-white/90 py-2 flex items-center justify-between">
                {item.label}
                <span className="ml-2 transition-transform group-open:rotate-180">▾</span>
              </summary>

              <div className="pl-2 pt-2 grid grid-cols-1 gap-6">
                {item.columns.map((col, idx) =>
                  "promo" in col && col.promo ? null : (
                    <div key={idx}>
                      {"title" in col && <h5 className="text-xs uppercase tracking-wide text-zinc-400 mb-2">{col.title}</h5>}
                      <ul className="space-y-2">
                        {("links" in col ? col.links : []).map((l) => {
                          const external = isExternal(l.href);
                          return external ? (
                            <li key={l.label}>
                              <a className="text-zinc-100" href={l.href} target="_blank" rel="noopener noreferrer">
                                {l.label}
                              </a>
                            </li>
                          ) : (
                            <li key={l.label}>
                              <Link className="text-zinc-100" href={l.href as Route} prefetch={false}>
                                {l.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )
                )}
              </div>
            </details>
          ))}

          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <Link href={"/shareholders" as Route} className="text-base" prefetch={false}>
              Shareholders
            </Link>
            <Link href={"/lp-login" as Route} className="text-base" prefetch={false}>
              LP Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}