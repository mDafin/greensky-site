"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchButton from "@/components/nav/SearchButton";
import ThemeToggle from "@/components/nav/ThemeToggle";
import clsx from "clsx";

type LinkItem = { label: string; href: string };
type Column =
  | { title: string; links: LinkItem[]; promo?: false }
  | { promo: true; title: string; text: string; cta?: LinkItem; image?: string };

const navData: {
  id: string;
  label: string;
  columns: Column[];
}[] = [
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
          { label: "Operating Team", href: "/transformation/operating-team" },
          { label: "Technology & Innovation", href: "/transformation/tech" },
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

function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
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

export default function MegaNavBlackstoneClone() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(navRef, () => setOpenId(null));

  // Esc closes
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
    <div ref={navRef} className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Logo */}
          <a href="/" className="shrink-0">
            <img src="/logo.svg" alt="Green Sky Management" className="h-7 w-auto" />
          </a>

          {/* Desktop primary nav */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
            {navData.map((item) => (
              <div key={item.id} className="relative">
                <button
                  className={clsx(
                    "px-2 py-1 text-sm tracking-wide hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40",
                    openId === item.id && "opacity-100"
                  )}
                  aria-expanded={openId === item.id}
                  aria-controls={`panel-${item.id}`}
                  onMouseEnter={() => setOpenId(item.id)}
                  onFocus={() => setOpenId(item.id)}
                  onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                >
                  <span className="inline-flex items-center gap-1">
                    {item.label}
                    <span aria-hidden>▾</span>
                  </span>
                </button>

                {/* Mega panel */}
                {openId === item.id && (
                  <div
                    id={`panel-${item.id}`}
                    onMouseLeave={() => setOpenId(null)}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-[86vw] max-w-6xl rounded-xl border border-white/10 bg-zinc-900/95 shadow-mega backdrop-blur supports-[backdrop-filter]:bg-zinc-900/80"
                    role="region"
                  >
                    <div className="px-8 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {item.columns.map((col, idx) =>
                          "promo" in col && col.promo ? (
                            <a
                              key={idx}
                              href={col.cta?.href ?? "#"}
                              className="rounded-lg overflow-hidden border border-white/10 bg-zinc-800/60 hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-white/40"
                            >
                              <div className="grid grid-cols-5">
                                <div className="col-span-3 p-5">
                                  <h5 className="text-white font-semibold">{col.title}</h5>
                                  <p className="mt-2 text-sm text-zinc-300">{col.text}</p>
                                  <div className="mt-4 inline-flex items-center gap-2 text-sm">
                                    <span>Learn More</span>
                                    <span aria-hidden>→</span>
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  {col.image && (
                                    <img alt="" src={col.image} className="h-full w-full object-cover" />
                                  )}
                                </div>
                              </div>
                            </a>
                          ) : (
                            <div key={idx}>
                              <h4 className="text-sm font-medium text-zinc-300 mb-3 uppercase tracking-wide">
                                {("title" in col && col.title) || ""}
                              </h4>
                              <ul className="space-y-2">
                                {("links" in col ? col.links : []).map((link) => (
                                  <li key={link.label}>
                                    <a
                                      href={link.href}
                                      className="text-zinc-100 hover:text-white focus:text-white focus:outline-none"
                                    >
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                )}
              </div>
            ))}

            {/* Right side: Search + Theme toggle */}
            <SearchButton />
            <ThemeToggle />
          </nav>

          {/* Mobile toggles */}
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

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={clsx(
          "lg:hidden border-t border-white/10 bg-zinc-900",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 space-y-6">
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
                      {"title" in col && (
                        <h5 className="text-xs uppercase tracking-wide text-zinc-400 mb-2">{col.title}</h5>
                      )}
                      <ul className="space-y-2">
                        {("links" in col ? col.links : []).map((l) => (
                          <li key={l.label}>
                            <a className="text-zinc-100" href={l.href}>
                              {l.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>
            </details>
          ))}

          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <a href="/shareholders" className="text-base">
              Shareholders
            </a>
            <a href="/lp-login" className="text-base">
              LP Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
