// app/page.tsx
import React from "react";

import HeroVideo from "@/components/HeroVideo";                  // keep your working hero
import FirmSection from "@/components/sections/FirmSection";
import EcommerceTicker from "@/components/sections/EcommerceTicker";
import PeopleGrid from "@/components/people/PeopleGrid";
import FooterDark from "@/components/FooterDark";
import NewsInsightsLight from "@/components/sections/NewsInsightsLight"; // <-- new

export default function HomePage(): React.JSX.Element {
  return (
    <>
      {/* 1) DARK — Hero (video) */}
      <HeroVideo />

      {/* 2) LIGHT — Firm overview */}
      <FirmSection />

      {/* 3) DARK — E-Commerce band */}
      <EcommerceTicker />

      {/* 4) LIGHT — News & Insights */}
      <NewsInsightsLight />

      {/* 5) LIGHT — Our People (gray wrap to separate visually) */}
      <section className="bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-14 md:py-16">
          <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500 mb-2">
            Leadership
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-6">Our People</h3>
          <PeopleGrid />
        </div>
      </section>

      {/* 6) DARK — Footer */}
      <FooterDark />

      {/* Ticker keyframes used by EcommerceTicker */}
      <style>{`
        @keyframes homeTicker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </>
  );
}