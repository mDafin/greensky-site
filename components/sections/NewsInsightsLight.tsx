// components/sections/NewsInsightsLight.tsx
"use client";

import React from "react";
import Image from "next/image";

export default function NewsInsightsLight(): React.JSX.Element {
  const stories = [
    {
      img: "/news/one.jpg", // keep your existing filenames
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
    <section className="bg-white text-zinc-900">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-14 md:py-16">
        {/* Top announcement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-2">
              Earnings
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold leading-snug">
              Green Sky Announces Third-Quarter 2025 Investor Call
            </h2>
            <div className="mt-3 flex gap-4 text-sm">
              <a href="/press/3q25" className="underline hover:text-black">
                View press release
              </a>
              <a href="/webcast/3q25" className="underline hover:text-black">
                Register for webcast
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/5] md:aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white">
            <Image
              src="/news/quarter.jpg"
              alt="Quarterly announcement hero"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mt-12">
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-2">
            News & Insights
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6">Featured Stories</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="group rounded-xl overflow-hidden border border-black/10 bg-white hover:bg-black/5 transition-colors"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[12px] text-zinc-500">
                    {s.tag} • {s.date}
                  </div>
                  <div className="mt-1 font-medium leading-snug group-hover:underline">
                    {s.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}