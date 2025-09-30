/**
 * ======================================================================
 * File: components/sections/NewsInsightsLight.tsx
 * Purpose: Light “News & Insights” band (polished: dates, blur, JSON-LD)
 * Owner: Web  |  Status: Production
 *
 * Upgrades:
 *  - <time> semantics (ISO dateTime) for a11y/SEO
 *  - Next/Image blur placeholders (neutral low-fi)
 *  - ARIA: title links reference meta for better context
 *  - JSON-LD Article list emitted inline (no deps)
 * ======================================================================
 */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import SafeLink from "@/components/nav/SafeLink";

/* ------------------------------- Utilities -------------------------------- */
const NEUTRAL_BLUR =
  "data:image/svg+xml;base64," +
  // simple 16x12 neutral rectangle (very small)
  Buffer.from(
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='12'>
       <rect width='16' height='12' fill='#f4f4f5'/>
     </svg>`
  ).toString("base64");

type Story = {
  img: string;
  title: string;
  tag: string;
  /** ISO date (YYYY-MM-DD) for <time>, plus display string */
  dateISO: string;
  dateDisplay: string;
  href: string;
};

const stories: Story[] = [
  {
    img: "/news/one.jpg",
    title: "Life Lessons from a Founder",
    tag: "Firm News",
    dateISO: "2025-09-12",
    dateDisplay: "Sep 12, 2025",
    href: "/insights/life-lessons",
  },
  {
    img: "/news/two.jpg",
    title: "Market Views: Expanding Access to Private Markets",
    tag: "Market Views",
    dateISO: "2025-08-18",
    dateDisplay: "Aug 18, 2025",
    href: "/insights/market-views-expanding-access",
  },
  {
    img: "/news/three.jpg",
    title: "A Mid-Year Megatrends Update",
    tag: "Investment Strategy",
    dateISO: "2025-07-30",
    dateDisplay: "Jul 30, 2025",
    href: "/insights/midyear-megatrends",
  },
  {
    img: "/news/four.jpg",
    title: "Navigating Private Assets in a Changing Market",
    tag: "Investment Strategy",
    dateISO: "2025-07-16",
    dateDisplay: "Jul 16, 2025",
    href: "/insights/navigating-private-assets",
  },
];

export default function NewsInsightsLight(): React.JSX.Element {
  // Build minimal Article JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: stories.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Article",
        headline: s.title,
        datePublished: s.dateISO,
        url: s.href,
        image: s.img,
        author: { "@type": "Organization", name: "Green Sky" },
        publisher: { "@type": "Organization", name: "Green Sky" },
      },
    })),
  };

  return (
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-14 md:py-16">
        {/* Top announcement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-2">
              Earnings
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
              Green Sky Announces Third-Quarter 2025 Investor Call
            </h2>
            <div className="mt-3 flex gap-4 text-sm">
              <SafeLink
                href="/press/3q25"
                className="underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
              >
                View press release
              </SafeLink>
              <SafeLink
                href="/webcast/3q25"
                className="underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
              >
                Register for webcast
              </SafeLink>
            </div>
          </div>

          {/* Announcement image (optimized) */}
          <div className="relative aspect-[4/5] md:aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white">
            <Image
              src="/news/quarter.jpg"
              alt="Quarterly announcement hero"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={NEUTRAL_BLUR}
              draggable={false}
            />
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mt-12">
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-2">
            News &amp; Insights
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 leading-tight">
            Featured Stories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((s) => {
              const metaId = `story-meta-${s.dateISO.replaceAll("-", "")}`;
              return (
                <article
                  key={s.href}
                  className="group rounded-xl overflow-hidden border border-black/10 bg-white transition-[background-color,transform,opacity] duration-200 [transition-timing-function:var(--ease-fluid, cubic-bezier(.22,.61,.36,1))] hover:bg-black/[0.04]"
                >
                  {/* Primary click area (image + title) */}
                  <Link
                    href={s.href}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
                    aria-describedby={metaId}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={s.img}
                        alt={s.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        placeholder="blur"
                        blurDataURL={NEUTRAL_BLUR}
                        draggable={false}
                        fetchPriority="low"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-4">
                      <div id={metaId} className="text-[12px] text-zinc-500">
                        <span className="sr-only">{s.title} — </span>
                        {s.tag} •{" "}
                        <time dateTime={s.dateISO}>{s.dateDisplay}</time>
                      </div>
                      <h4 className="mt-1 font-medium leading-snug group-hover:underline">
                        {s.title}
                      </h4>
                    </div>
                  </Link>

                  {/* Sibling action (separate anchor; no nesting) */}
                  <div className="px-4 pb-4">
                    <SafeLink
                      href={s.href}
                      className="inline-flex items-center gap-1 text-sm text-[hsl(var(--accent))] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
                      aria-label={`Read ${s.title}`}
                    >
                      Read <span aria-hidden>→</span>
                    </SafeLink>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* JSON-LD (SEO) */}
      <script
        type="application/ld+json"
        // eslint-disable-next
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reduced motion guard for this section only */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .group,
          .group * {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}