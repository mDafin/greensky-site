// components/HeroVideo.tsx
"use client";
import React from "react";

export type HeroVideoProps = {
  poster?: string;
  tagline?: string;
  subline?: string;
};

export default function HeroVideo({
  poster = "/hero-poster.jpg",
  tagline = "Powering Global E-Commerce",
  subline = "Empowering global commerce with intelligent technology, enterprise security, and growth without limits.",
}: HeroVideoProps): React.JSX.Element {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        poster={poster}
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero-hevc.mp4" type='video/mp4; codecs="hvc1"' />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay tint (keeps background dark if video doesn’t load) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Copy */}
      <div className="relative z-10 flex min-h-screen items-center justify-center text-center px-4">
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