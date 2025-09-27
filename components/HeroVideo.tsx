// components/HeroVideo.tsx
"use client";

import React from "react";

export type HeroVideoProps = {
  /** Optional override; by default we use the boomerang files produced by make-hero-loop.sh */
  poster4k?: string;
  poster1080?: string;
  tagline?: string;
  subline?: string;
};

export default function HeroVideo({
  poster4k = "/hero-poster.jpg",           // produced by the script from hero.mp4
  poster1080 = "/hero-1080-poster.jpg",    // produced by the script from hero-1080.mp4
  tagline = "Investing in What Matters",
  subline = "Building value across real estate, private equity, and transformative strategies",
}: HeroVideoProps): React.JSX.Element {
  /**
   * We render two <video> tags and toggle which poster to show using media queries:
   *   - The first <video> targets >=1280px (desktop-ish) and uses the 4K boomerang sources
   *   - The second <video> is visible <1280px and uses the 1080p boomerang sources
   *
   * Both loop seamlessly thanks to how we generated the boomerang files.
   */
  return (
    <section id="hero" className="relative h-[90vh] w-full overflow-hidden">
      {/* 4K source for large screens */}
      <video
        className="absolute inset-0 hidden md:block h-full w-full object-cover"
        playsInline
        autoPlay
        loop
        muted
        preload="auto"
        poster={poster4k}
      >
        <source src="/hero-boomerang.webm" type="video/webm" />
        <source src="/hero-boomerang.mp4"  type="video/mp4" />
        {/* Optional extra: if you created HEVC fallback */}
        {/* <source src="/hero-hevc-boomerang.mp4" type="video/mp4" /> */}
      </video>

      {/* 1080 source for smaller screens */}
      <video
        className="absolute inset-0 md:hidden h-full w-full object-cover"
        playsInline
        autoPlay
        loop
        muted
        preload="auto"
        poster={poster1080}
      >
        <source src="/hero-1080-boomerang.webm" type="video/webm" />
        <source src="/hero-1080-boomerang.mp4"  type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            {tagline}
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-zinc-200 drop-shadow-md">
            {subline}
          </p>
        </div>
      </div>
    </section>
  );
}
