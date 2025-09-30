// components/HeroVideo.tsx
"use client";
import React from "react";

export type HeroVideoProps = {
  poster?: string;
  tagline?: string;
  subline?: string;
  /** If true, pause the video for users who prefer reduced motion (default: true). */
  respectReducedMotion?: boolean;
};

export default function HeroVideo({
  poster = "/hero-poster.jpg",
  tagline = "Powering Global E-Commerce",
  subline = "Empowering global commerce with intelligent technology, enterprise security, and growth without limits.",
  respectReducedMotion = true,
}: HeroVideoProps): React.JSX.Element {
  const vidRef = React.useRef<HTMLVideoElement | null>(null);

  // Respect Reduced Motion: show poster, don't animate video.
  React.useEffect(() => {
    if (!respectReducedMotion) return;
    const mq =
      typeof window !== "undefined" ? window.matchMedia?.("(prefers-reduced-motion: reduce)") : null;

    const apply = () => {
      const v = vidRef.current;
      if (!v) return;
      if (mq?.matches) {
        v.pause();
        v.removeAttribute("autoplay");
      } else {
        v.play().catch(() => {
          /* autoplay may be blocked; poster still shows */
        });
      }
    };

    apply();
    mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, [respectReducedMotion]);

  // If the video errors, just fall back to the poster silently.
  React.useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const onError = () => v.pause();
    v.addEventListener("error", onError);
    return () => v.removeEventListener("error", onError);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Video */}
      <video
        ref={vidRef}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        autoPlay
        muted
        loop
        preload="metadata"
        disablePictureInPicture
        poster={poster}
      >
        <source src="/hero.webm" type="video/webm" />
        <source src="/hero-hevc.mp4" type='video/mp4; codecs="hvc1"' />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay (ensures legible copy even if the poster is bright) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Copy */}
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