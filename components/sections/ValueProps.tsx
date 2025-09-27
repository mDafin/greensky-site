// components/sections/ValueProps.tsx
"use client";

import React from "react";
import SafeLink from "@/components/nav/SafeLink";

type Item = {
  title: string;
  blurb: string;
  href: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
};

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M4 20h16v2H4zm2-2h12V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2zm6-10h2v2h-2zm0 4h2v2h-2zM8 8h2v2H8zm0 4h2v2H8z"
      />
    </svg>
  );
}

function GraphIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M3 3h2v18H3zm16 0h2v18h-2zM11 10h2v11h-2zm-4 4h2v7H7zm8-8h2v15h-2z"
      />
    </svg>
  );
}

function CreditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3H2zm0 5h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4 4h4v2H6z"
      />
    </svg>
  );
}

function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="m9 15 2-6 6-2-2 6zM12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2"
      />
    </svg>
  );
}

const ITEMS: Item[] = [
  {
    title: "Real Estate",
    blurb: "Core, core-plus, and opportunistic strategies across sectors and cycles.",
    href: "/businesses/re",
    Icon: BuildingIcon,
  },
  {
    title: "Private Equity",
    blurb: "Scale investing and operational excellence to unlock durable value.",
    href: "/businesses/pe",
    Icon: GraphIcon,
  },
  {
    title: "Private Credit",
    blurb: "Defensive income and flexible capital across market conditions.",
    href: "/private-markets/credit",
    Icon: CreditIcon,
  },
  {
    title: "Transformative Strategies",
    blurb: "Infrastructure, growth, and thematic investing in the trends that matter.",
    href: "/transformation/tech",
    Icon: CompassIcon,
  },
];

export default function ValueProps(): React.JSX.Element {
  return (
    <section aria-label="What we do" className="bg-transparent">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 lg:py-16">
        {/* Section header */}
        <div className="mb-8 lg:mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-zinc-900 dark:text-white text-2xl sm:text-3xl font-semibold tracking-tight">
              What We Do
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 mt-2 text-base">
              Scaled investing across real estate, private equity, private credit, and thematic strategies.
            </p>
          </div>
          <div className="hidden sm:block">
            <SafeLink
              href="/products"
              className="text-sm font-medium text-zinc-800 dark:text-accent hover:text-accent focus:text-accent focus:outline-none"
            >
              Explore products →
            </SafeLink>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {ITEMS.map(({ title, blurb, href, Icon }) => (
            <SafeLink
              key={title}
              href={href}
              className="group rounded-xl p-5 transition-colors"
              style={{
                backgroundColor: "color-mix(in oklab, var(--bg) 88%, transparent)",
                border: "1px solid color-mix(in oklab, var(--text) 12%, transparent)",
              }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--accent) 18%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-zinc-900 dark:text-white text-base font-semibold leading-tight group-hover:text-accent dark:group-hover:text-accent">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {blurb}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-800 dark:text-accent group-hover:text-accent">
                    Learn more <span aria-hidden>→</span>
                  </span>
                </div>
              </div>
            </SafeLink>
          ))}
        </div>

        {/* Mobile CTA mirror */}
        <div className="sm:hidden mt-6">
          <SafeLink
            href="/products"
            className="text-sm font-medium text-zinc-800 dark:text-accent hover:text-accent focus:text-accent focus:outline-none"
          >
            Explore products →
          </SafeLink>
        </div>
      </div>
    </section>
  );
}
