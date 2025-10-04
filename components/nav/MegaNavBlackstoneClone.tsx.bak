// components/nav/MegaNavBlackstoneClone.tsx
"use client";

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import Brand from "@/components/nav/Brand";

type Item = { label: string; href: string; seeAll?: boolean };
type Section = { title: string; links: readonly Item[] };

const PRIMARY_LINKS: readonly Section[] = [
  {
    title: "The Firm",
    links: [
      { label: "Overview", href: "/about" },
      { label: "Our People", href: "/people" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact", seeAll: true },
    ],
  },
  {
    title: "What We Do",
    links: [
      { label: "Commerce Platform", href: "/platform" },
      { label: "Logistics & AI Fulfillment", href: "/solutions/fulfillment" },
      { label: "Payments", href: "/solutions/payments" },
      { label: "Growth Solutions", href: "/solutions/growth", seeAll: true },
    ],
  },
  {
    title: "News & Insights",
    links: [
      { label: "Newsroom", href: "/news" },
      { label: "Insights", href: "/insights" },
      { label: "Press", href: "/press" },
      { label: "Events", href: "/events", seeAll: true },
    ],
  },
] as const;

const INVESTOR_SECTION: Section = {
  title: "Investors",
  links: [
    { label: "Shareholders", href: "/shareholders" },
    { label: "LP Login", href: "/lp-login" },
    { label: "Disclosures", href: "/disclosures" },
    { label: "Security", href: "/legal/security", seeAll: true },
  ],
};

// Promo tile for the mega panel
const PROMO = {
  image:
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop",
  title: "Infrastructure of the Future",
  text: "We spot enduring shifts early and invest at scale behind them.",
  cta: { label: "Learn more", href: "/themes/infrastructure-of-the-future" },
};

export default function MegaNavBlackstoneClone(): React.JSX.Element {
  const [scrolled, setScrolled] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const rootRef = React.useRef<HTMLElement | null>(null);
  const triggerRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const firstLinkRef = React.useRef<HTMLAnchorElement | null>(null);

  // Hover-intent helpers
  const hoverTimerRef = React.useRef<number | null>(null);
  const pendingIdxRef = React.useRef<number | null>(null);

  const hasOpen = openIdx !== null || mobileOpen;

  // Scroll state (drives logo + bar styles)
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setCompact(y > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Click outside to close dropdowns
  React.useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpenIdx(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  // ESC closes things
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIdx(null);
        setMobileOpen(false);
        if (openIdx !== null) triggerRefs.current[openIdx]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  // Body scroll lock for mobile drawer
  React.useEffect(() => {
    const html = document.documentElement;
    if (mobileOpen) {
      const prev = html.style.overflow;
      html.style.overflow = "hidden";
      return () => {
        html.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Focus first link when a panel opens
  React.useEffect(() => {
    if (openIdx === null) return;
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 8);
    return () => window.clearTimeout(t);
  }, [openIdx]);

  // Hover intent
  const clearHoverTimer = () => {
    if (hoverTimerRef.current) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    pendingIdxRef.current = null;
  };
  const handleEnter = (i: number) => {
    clearHoverTimer();
    pendingIdxRef.current = i;
    hoverTimerRef.current = window.setTimeout(() => {
      if (pendingIdxRef.current === i) setOpenIdx(i);
      hoverTimerRef.current = null;
    }, 110);
  };
  const handleLeave = (i: number) => {
    clearHoverTimer();
    setOpenIdx((v) => (v === i ? null : v));
  };

  return (
    <header
      ref={rootRef}
      className={clsx(
        "sticky top-0 z-50 backdrop-blur",
        "border-b border-white/10",
        scrolled ? "bg-zinc-950/95 shadow-[0_2px_14px_rgba(0,0,0,0.25)]" : "bg-zinc-950/80",
        "transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]"
      )}
      role="navigation"
      aria-label="Primary"
      data-scrolled={scrolled ? "true" : "false"}
      data-logo-mode={scrolled ? "normal" : "inverted"}
      data-glow={hasOpen || scrolled ? "on" : "off"}
    >
      {/* Ambient top glow */}
      <div aria-hidden className="ambient" />

      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="brand-one" aria-label="Green Sky">
          <Brand height={compact ? 26 : 28} />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium">
          {[...PRIMARY_LINKS, INVESTOR_SECTION].map((section, i) => {
            const open = openIdx === i;
            const btnId = `nav-btn-${i}`;
            const panelId = `nav-panel-${i}`;
            return (
              <div
                key={section.title}
                className="relative"
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={() => handleLeave(i)}
              >
                <button
                  id={btnId}
                  ref={(el) => {
                    triggerRefs.current[i] = el;
                  }}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  className={clsx(
                    "navLink transition-colors duration-200 px-2 py-2",
                    scrolled ? "text-zinc-100 hover:text-white" : "text-zinc-300 hover:text-[var(--accent)]"
                  )}
                  onClick={() => setOpenIdx((v) => (v === i ? null : i))}
                >
                  {section.title}
                </button>

                {/* Mega Panel */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  data-open={open ? "true" : "false"}
                  className="
                    mega
                    absolute left-1/2 -translate-x-1/2 mt-2
                    w-[92vw] max-w-6xl rounded-2xl border border-white/10
                    bg-zinc-950/98 backdrop-blur
                    shadow-[0_30px_60px_rgba(0,0,0,0.55)]
                  "
                >
                  <div className="caret" />

                  <div className="px-6 py-6 md:px-8 md:py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                      {/* Group the three link columns as a 3-col grid (md+) */}
                      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {PRIMARY_LINKS.map((col, colIdx) => (
                          <div key={col.title} className="min-w-0">
                            <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-400 mb-3 secTitle">
                              {col.title}
                            </div>
                            <ul className="space-y-1.5">
                              {col.links.map((l, li) => {
                                const isSeeAll = l.seeAll === true;
                                const common =
                                  "linkRow group rounded-md px-3 py-2 flex items-center justify-between " +
                                  (isSeeAll
                                    ? "text-zinc-300 hover:text-white"
                                    : "text-zinc-100 hover:text-white");
                                return (
                                  <li key={`${col.title}-${l.href}`}>
                                    <Link
                                      href={l.href}
                                      prefetch={false}
                                      className={common}
                                      ref={colIdx === 0 && li === 0 ? firstLinkRef : undefined}
                                    >
                                      <span className="truncate">
                                        {isSeeAll ? `See all ${col.title}` : l.label}
                                      </span>
                                      <span
                                        aria-hidden
                                        className="ml-3 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 text-[11px] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                                      >
                                        →
                                      </span>
                                      {/* soft glow highlight */}
                                      <span aria-hidden className="glow" />
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Promo column with soft divider */}
                      <div className="min-w-0 promoCol">
                        <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-400 mb-3 secTitle">
                          Featured
                        </div>
                        <Link
                          href={PROMO.cta.href}
                          prefetch={false}
                          className="promoCard group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
                        >
                          <div className="promoMedia">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={PROMO.image} alt="" className="promoImg" />
                            <span aria-hidden className="promoGlow" />
                          </div>
                          <div className="p-4">
                            <div className="text-base text-white font-medium leading-snug">
                              {PROMO.title}
                            </div>
                            <p className="mt-1 text-sm text-zinc-300 leading-relaxed">{PROMO.text}</p>
                            <div className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--accent)]">
                              {PROMO.cta.label} <span aria-hidden>→</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Mobile actions */}
        <div className="md:hidden">
          <button
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen(true)}
            className="rounded-md border border-white/15 px-3 py-2 text-sm text-zinc-200 hover:text-white"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile drawer + backdrop */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        data-open={mobileOpen ? "true" : "false"}
        className="drawerRoot md:hidden"
      >
        <button
          aria-label="Close menu"
          className="drawerBackdrop"
          onClick={() => setMobileOpen(false)}
        />
        <div className="drawerPanel">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="brand-one">
              <Brand height={22} />
            </div>
            <button
              className="rounded-md border border-white/15 px-3 py-1.5 text-sm text-zinc-200 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Close
            </button>
          </div>
          <nav className="px-4 py-4 space-y-6">
            {[...PRIMARY_LINKS, INVESTOR_SECTION].map((section, i) => (
              <div key={i}>
                <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-400 mb-2">
                  {section.title}
                </div>
                <ul className="space-y-1">
                  {section.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        prefetch={false}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-2 py-2 text-base text-zinc-100 hover:bg-white/5"
                      >
                        {l.seeAll ? `See all ${section.title}` : l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Promo inline on mobile */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-400 mb-2">Featured</div>
              <Link
                href={PROMO.cta.href}
                prefetch={false}
                className="block rounded-xl border border-white/10 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PROMO.image} alt="" className="w-full h-40 object-cover" />
                <div className="p-3">
                  <div className="text-white font-medium">{PROMO.title}</div>
                  <p className="text-sm text-zinc-300">{PROMO.text}</p>
                </div>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      <style jsx>{`
        /* Ambient top glow (subtle) */
        .ambient {
          position: absolute;
          inset: -30px 0 auto 0;
          height: 90px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 350ms ease;
          background: radial-gradient(
            120% 70% at 50% 0%,
            rgba(87, 182, 178, 0.18) 0%,
            rgba(87, 182, 178, 0.1) 25%,
            rgba(0, 0, 0, 0) 60%
          );
          -webkit-mask: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.05) 60%,
            transparent
          );
          mask: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.05) 60%,
            transparent
          );
        }
        [data-glow="on"] .ambient {
          opacity: 1;
        }

        /* Logo color control (works for svg or img) */
        .brand-one svg,
        .brand-one img {
          transition: filter 0.22s ease, opacity 0.22s ease;
        }
        [data-logo-mode="inverted"] .brand-one svg,
        [data-logo-mode="inverted"] .brand-one img {
          filter: invert(1) brightness(2) saturate(0);
        }
        [data-logo-mode="normal"] .brand-one svg,
        [data-logo-mode="normal"] .brand-one img {
          filter: none;
        }

        /* Nav links + underline */
        [data-scrolled="false"] .navLink {
          color: rgba(255, 255, 255, 0.86);
        }
        [data-scrolled="false"] .navLink:hover {
          color: var(--accent);
        }
        [data-scrolled="true"] .navLink {
          color: rgb(212 212 216);
        }
        [data-scrolled="true"] .navLink:hover {
          color: white;
        }

        .navLink {
          position: relative;
          outline: none;
        }
        .navLink::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 180ms ease;
          background: currentColor;
        }
        .navLink:hover::after,
        .navLink:focus-visible::after {
          transform: scaleX(1);
        }
        [data-scrolled="false"] .navLink::after {
          background: var(--accent);
        }

        /* Mega panel animation & subtle chroma frame */
        .mega {
          opacity: 0;
          transform: translate(-50%, 6px) scale(0.985);
          pointer-events: none;
          transition: opacity 160ms ease, transform 160ms ease;
          will-change: opacity, transform;
          background:
            linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)) padding-box,
            linear-gradient(180deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.08)) border-box;
        }
        .mega[data-open="true"] {
          opacity: 1;
          transform: translate(-50%, 0) scale(1);
          pointer-events: auto;
        }

        /* Subtle vignette */
        .mega::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            120% 100% at 50% 0%,
            rgba(87, 182, 178, 0.12),
            rgba(87, 182, 178, 0.04) 35%,
            transparent 60%
          );
          pointer-events: none;
          opacity: 0.6;
        }

        /* Caret (diamond) */
        .mega .caret {
          position: absolute;
          top: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 14px;
          background: rgba(9, 9, 11, 0.98);
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          transform-origin: center;
          rotate: 45deg;
          border-radius: 2px 0 0 0;
          filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
          transition: transform 160ms ease;
        }
        .mega[data-open="true"] .caret {
          transform: translateX(-50%) translateY(1px) rotate(45deg);
        }

        /* Section titles */
        .secTitle {
          position: relative;
          letter-spacing: 0.14em;
        }
        .secTitle::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -10px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.18) 20%,
            transparent 80%
          );
          opacity: 0.8;
        }

        /* Link rows: underline motion + soft glow */
        .linkRow {
          position: relative;
          overflow: hidden;
        }
        .linkRow::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 6px;
          height: 1px;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 180ms ease;
          background: linear-gradient(90deg, var(--accent), rgba(255, 255, 255, 0.7));
          opacity: 0.85;
        }
        .linkRow:hover::after,
        .linkRow:focus-visible::after {
          transform: scaleX(1);
        }
        .linkRow:hover span[aria-hidden],
        .linkRow:focus-visible span[aria-hidden] {
          transform: translateX(2px);
        }
        .glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            80% 140% at 0% 50%,
            rgba(87, 182, 178, 0.16),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 160ms ease;
          pointer-events: none;
        }
        .linkRow:hover .glow,
        .linkRow:focus-visible .glow {
          opacity: 0.9;
        }
        .linkRow:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px color(display-p3 0.34 0.72 0.7 / 0.55);
        }

        /* Promo card */
        .promoCard {
          position: relative;
          transform: translateY(0);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }
        .promoCard:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 42px rgba(0, 0, 0, 0.45);
        }
        .promoMedia {
          position: relative;
          height: 9rem;
          overflow: hidden;
        }
        .promoImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1);
          transition: transform 2.4s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .promoCard:hover .promoImg {
          transform: scale(1.03);
        }
        .promoGlow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            120% 120% at 70% 30%,
            rgba(87, 182, 178, 0.18),
            transparent 60%
          );
          mix-blend-mode: screen;
          opacity: 0;
          transition: opacity 220ms ease;
        }
        .promoCard:hover .promoGlow {
          opacity: 1;
        }

        /* Soft internal divider before promo column (desktop only) */
        .promoCol {
          position: relative;
          padding-left: 0;
        }
        @media (min-width: 768px) {
          .promoCol {
            padding-left: 1.5rem;
          }
          .promoCol::before {
            content: "";
            position: absolute;
            left: 0;
            top: -2px;
            bottom: -2px;
            width: 1px;
            background: linear-gradient(
              180deg,
              transparent,
              rgba(255, 255, 255, 0.12) 12%,
              rgba(255, 255, 255, 0.12) 88%,
              transparent
            );
            opacity: 0.9;
          }
        }

        /* Mobile drawer */
        .drawerRoot {
          position: fixed;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr auto;
          pointer-events: none;
        }
        .drawerBackdrop {
          pointer-events: auto;
          background: rgba(0, 0, 0, 0.35);
          opacity: 0;
          transition: opacity 160ms ease;
        }
        .drawerPanel {
          pointer-events: auto;
          width: min(88vw, 360px);
          height: 100%;
          background: rgba(24, 24, 27, 0.98);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          transform: translateX(100%);
          transition: transform 200ms ease;
          will-change: transform;
        }
        .drawerRoot[data-open="true"] .drawerBackdrop {
          opacity: 1;
        }
        .drawerRoot[data-open="true"] .drawerPanel {
          transform: translateX(0);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ambient,
          .navLink::after,
          .mega,
          .mega .caret,
          .glow,
          .promoImg,
          .promoGlow,
          .drawerBackdrop,
          .drawerPanel {
            transition: none !important;
          }
        }
        /* Touch: hide hover-only underline */
        @media (pointer: coarse) {
          .navLink::after {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
