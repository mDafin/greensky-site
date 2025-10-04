// components/FooterDark.tsx
"use client";

import React from "react";
import Link from "next/link";
import SafeLink from "@/components/nav/SafeLink";
import Brand from "@/components/nav/Brand";

/* ------------------------------ Config ------------------------------ */

const YEAR = new Date().getFullYear();

const COLS: Array<{
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    title: "The Firm",
    links: [
      { label: "Overview", href: "/about" },
      { label: "Our People", href: "/people" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "What We Do",
    links: [
      { label: "Commerce Platform", href: "/platform" },
      { label: "Logistics & AI Fulfillment", href: "/solutions/fulfillment" },
      { label: "Payments", href: "/solutions/payments" },
      { label: "Growth Solutions", href: "/solutions/growth" },
    ],
  },
  {
    title: "News & Insights",
    links: [
      { label: "Newsroom", href: "/news" },
      { label: "Insights", href: "/insights" },
      { label: "Press", href: "/press" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Investors",
    links: [
      { label: "Shareholders", href: "/shareholders" },
      { label: "LP Login", href: "/lp-login" },
      { label: "Disclosures", href: "/disclosures" },
      { label: "Security", href: "/legal/security" },
    ],
  },
];

/* ------------------------------ Social Button ------------------------------ */

type SocialLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
  newTab?: boolean;
};

function SocialLink({
  href,
  label,
  children,
  newTab = true,
}: SocialLinkProps): React.JSX.Element {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className="
        group relative inline-flex h-10 w-10 items-center justify-center
        rounded-full bg-white/10 text-white
        ring-1 ring-inset ring-white/15
        hover:bg-white hover:text-zinc-900
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
      "
    >
      {/* Accent glow driven by --accent (from Tailwind theme) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full blur-lg opacity-20 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 85%, white 0%), transparent 70%)",
        }}
      />
      <span className="relative inline-flex [&>svg]:h-5 [&>svg]:w-5">
        {children}
      </span>
    </a>
  );
}

/* ------------------------------ Component ------------------------------ */

export default function FooterDark(): React.JSX.Element {
  return (
    <footer
      className="relative bg-zinc-950 text-zinc-200 border-t border-white/10"
      role="contentinfo"
    >
      <div className="pointer-events-none absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-black/0 to-black/35" />

      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-10 md:py-14">
        {/* Brand row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex flex-col items-start gap-4">
            <div className="opacity-90">
              <Brand height={28} />
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <SocialLink
                href="https://linkedin.com/company/yourcompany"
                label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.84-2.2 3.8-2.2 4.06 0 4.8 2.67 4.8 6.14V24h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.84-2.72 3.76V24h-4V8z" />
                </svg>
              </SocialLink>

              <SocialLink href="https://x.com/yourhandle" label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2H21l-6.5 7.43L22.5 22H15.9l-5.07-6.54L4.9 22H2.14l7.09-8.1L1.5 2h6.76l4.57 6.08L18.24 2Z" />
                </svg>
              </SocialLink>

              <SocialLink
                href="https://youtube.com/@yourchannel"
                label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.38.57A3.01 3.01 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .62 5.8 3.01 3.01 0 0 0 2.12 2.13C4.42 20.5 12 20.5 12 20.5s7.7 0 9.38-.57A3.01 3.01 0 0 0 23.5 17.8 31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
            Building the infrastructure for modern commerce — globally, securely,
            and with conviction.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 md:pt-10">
          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                {col.title}
              </div>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => {
                  const C = l.external ? SafeLink : Link;
                  const props = l.external
                    ? {
                        href: l.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : { href: l.href, prefetch: false };
                  return (
                    <li key={l.label}>
                      <C
                        {...props}
                        className="text-sm text-zinc-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[4px] inline-flex items-center gap-1"
                      >
                        {l.label}
                        <span aria-hidden className="opacity-60">›</span>
                      </C>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal + Language row */}
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-xs text-zinc-400">© {YEAR} Green Sky. All rights reserved.</div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <ul className="flex flex-wrap items-center gap-4 text-xs">
              <li>
                <Link
                  href="/legal/privacy"
                  prefetch={false}
                  className="text-zinc-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[4px]"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  prefetch={false}
                  className="text-zinc-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[4px]"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/disclosures"
                  prefetch={false}
                  className="text-zinc-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[4px]"
                >
                  Disclosures
                </Link>
              </li>
              <li className="pl-4 ml-2 border-l border-white/10">
                <SafeLink
                  href="mailto:security@yourdomain.com"
                  className="text-zinc-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[4px]"
                >
                  Report a security issue
                </SafeLink>
              </li>
            </ul>

            {/* Language selector */}
            <select
              aria-label="Switch language"
              className="bg-zinc-900 text-xs text-zinc-300 border border-white/10 rounded px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}