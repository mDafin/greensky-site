// components/HeroVideo.tsx
"use client";

import React from "react";

export type HeroVideoProps = {
  poster?: string;
  srcWebm?: string;
  srcMp4?: string;
  tagline?: string;
  subline?: string;
};

export default function HeroVideo({
  poster = "/hero-poster.jpg",
  srcWebm = "/hero-boomerang.webm",
  srcMp4 = "/hero-boomerang.mp4",
  tagline = "Investing in What Matters",
  subline = "Building value across real estate, private equity, and transformative strategies",
}: HeroVideoProps): React.JSX.Element {
  const ref = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const play = async () => { try { await v.play(); } catch {} };
    play();
    const onVis = () => { if (document.visibilityState === "visible") v.play().catch(() => {}); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section className="relative h-[58vh] md:h-[70vh] w-full overflow-hidden bg-black">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={srcWebm} type="video/webm" />
        <source src={srcMp4} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            {tagline}
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-zinc-200 drop-shadow-md">{subline}</p>
        </div>
      </div>
    </section>
  );
}
