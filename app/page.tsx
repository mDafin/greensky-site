// app/page.tsx
import React from "react";
import Image from "next/image";

import HeroVideo from "@/components/HeroVideo";
import FirmSection from "@/components/sections/FirmSection";
import PeopleGrid from "@/components/people/PeopleGrid";
import FooterDark from "@/components/Footer";

/** 3) DARK — Private Wealth (full-bleed, tall, with bottom marquee) */
function PrivateWealthFullBleed(): React.JSX.Element {
  return (
    <section className="relative bg-zinc-950 text-white">
      {/* subtle vignette to add depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0.06)_0%,transparent_55%)]" />

      {/* content column; tall like a full section */}
      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6 min-h-[90vh] md:min-h-[95vh] flex flex-col justify-center gap-10 pt-24 pb-36">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Left copy */}
          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">
              Private Wealth
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold leading-tight">
              Institutional quality for individual investors
            </h2>
            <p className="mt-4 text-zinc-300 max-w-prose">
              We partner with financial advisors to unlock access to private markets for their
              clients. Our flagship products are designed with the needs of individual investors
              in mind.
            </p>
            <div className="mt-6">
              <a
                href="/products"
                className="inline-flex items-center text-sm rounded-md px-4 py-2 font-medium bg-white text-zinc-900 hover:bg-zinc-200"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Right product list (card on dark) */}
          <div className="md:col-span-2 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur p-2">
            {[
              { label: "Green Sky Real Estate Income Trust (GREIT)", href: "/products/greit" },
              { label: "Green Sky Private Credit Fund (GSPC)", href: "/products/gspc" },
              { label: "Green Sky Multi-Asset Credit & Income (GSMACI)", href: "/products/gsmaci" },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                className="group block px-4 py-3 rounded-lg hover:bg-white/5 focus:bg-white/5 focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px]">{p.label}</span>
                  <span
                    aria-hidden
                    className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-sm group-hover:bg-white group-hover:text-zinc-900"
                  >
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* bottom marquee pinned to the section edge */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10">
        <div className="relative overflow-hidden">
          <div
            className="whitespace-nowrap will-change-transform py-8 text-[7vw] sm:text-5xl md:text-6xl font-semibold text-white/80"
            style={{ animation: "homeTicker 28s linear infinite" }}
          >
            <span className="mx-8">Build wealth with Green Sky</span>
            <span className="mx-8">Institutional access for individual investors</span>
            <span className="mx-8">Private markets, made approachable</span>
            <span className="mx-8">Build wealth with Green Sky</span>
            <span className="mx-8">Institutional access for individual investors</span>
            <span className="mx-8">Private markets, made approachable</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 4) LIGHT — News & Insights + People (polished) */
function NewsInsightsLight(): React.JSX.Element {
  const stories = [
    {
      img: "/news/one.jpg",
      title: "Life Lessons from a Founder",
      tag: "Firm News",
      date: "Sep 12, 2025",
      href: "/insights/life-lessons",
    },
    {
      img: "/news/two.jpg",
      title: "Market Views: Expanding Access to Private Markets",
      tag: "Market Views",
      date: "Aug 18, 2025",
      href: "/insights/market-views-expanding-access",
    },
    {
      img: "/news/three.jpg",
      title: "A Mid-Year Megatrends Update",
      tag: "Investment Strategy",
      date: "Jul 30, 2025",
      href: "/insights/midyear-megatrends",
    },
    {
      img: "/news/four.jpg",
      title: "Navigating Private Assets in a Changing Market",
      tag: "Investment Strategy",
      date: "Jul 16, 2025",
      href: "/insights/navigating-private-assets",
    },
  ];

  return (
    <section aria-labelledby="news-heading" className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-14 md:py-16">
        {/* Top announcement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border-b border-zinc-200 pb-10 md:pb-12 mb-10 md:mb-12">
          <div className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-2">Earnings</div>
            <h2 id="news-heading" className="text-2xl sm:text-3xl font-semibold leading-snug">
              Green Sky Announces Third-Quarter 2025 Investor Call
            </h2>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <a
                href="/press/3q25"
                className="underline underline-offset-[3px] decoration-zinc-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded"
              >
                View press release
              </a>
              <a
                href="/webcast/3q25"
                className="underline underline-offset-[3px] decoration-zinc-300 hover:text-black focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded"
              >
                Register for webcast
              </a>
            </div>
          </div>

          {/* Optimized image */}
          <div className="relative aspect-[4/5] md:aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
            <Image
              src="/news/quarter.jpg"
              alt="Earnings call announcement"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Featured Stories */}
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-2">News & Insights</div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6">Featured Stories</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="group block rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-zinc-300"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[11px] uppercase tracking-wide text-zinc-500 mb-1">
                    {s.tag} · {s.date}
                  </div>
                  <div className="text-[15px] sm:text-base font-medium text-zinc-900 group-hover:underline underline-offset-[3px]">
                    {s.title}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Our People (existing cards) */}
          <div className="mt-16">
            <PeopleGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage(): React.JSX.Element {
  return (
    <>
      {/* 1) DARK — Hero (single video handled inside component) */}
      <HeroVideo />

      {/* 2) LIGHT — Firm overview */}
      <FirmSection />

      {/* 3) DARK — Private Wealth full-bleed */}
      <PrivateWealthFullBleed />

      {/* 4) LIGHT — News & People */}
      <NewsInsightsLight />

      {/* 5) DARK — Footer (global component) */}
      <FooterDark />

      {/* Global keyframes for ticker */}
      <style>{`
        @keyframes homeTicker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </>
  );
}