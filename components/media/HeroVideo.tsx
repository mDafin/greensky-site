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
  poster = "/videos/hero-poster.jpg",
  tagline = "Powering Global E-Commerce",
  subline = "Empowering global commerce with intelligent technology, enterprise security, and growth without limits.",
  respectReducedMotion = true,
}: HeroVideoProps): React.JSX.Element {
  const vidRef = React.useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = React.useState(false);

  // Memoize the reduced-motion media query once (safe for SSR/tests)
  const reducedMotionQuery = React.useMemo<MediaQueryList | null>(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return null;
    return window.matchMedia("(prefers-reduced-motion: reduce)");
  }, []);

  // Respect Reduced Motion (pause if user prefers reduced motion)
  React.useEffect((): () => void => {
    const v = vidRef.current;
    if (!v || !respectReducedMotion || !reducedMotionQuery) return () => {};

    const apply = (): void => {
      if (reducedMotionQuery.matches) {
        v.pause();
        v.removeAttribute("autoplay");
      } else if (canPlay) {
        void v.play().catch(() => {
          /* autoplay may be blocked; poster still shows */
        });
      }
    };

    apply();

    const onChange = (): void => apply();

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", onChange);
      return () => reducedMotionQuery.removeEventListener("change", onChange);
    }

    if ("addListener" in reducedMotionQuery) {
      // Legacy Safari
      reducedMotionQuery.addListener(onChange);
      return () => reducedMotionQuery.removeListener(onChange);
    }

    return () => {};
  }, [canPlay, respectReducedMotion, reducedMotionQuery]);

  // Pause out of viewport; play in viewport (unless reduced motion)
  React.useEffect((): () => void => {
    const v = vidRef.current;
    if (!v) return () => {};

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) {
          if (!reducedMotionQuery?.matches) {
            void v.play().catch(() => {});
          }
        } else {
          v.pause();
        }
      },
      { threshold: 0.2, rootMargin: "100px 0px 100px 0px" }
    );

    observer.observe(v);
    return () => observer.disconnect();
  }, [reducedMotionQuery]);

  // If the video errors, just fall back to the poster silently.
  React.useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const onError = () => v.pause();
    v.addEventListener("error", onError);
    return () => v.removeEventListener("error", onError);
  }, []);

  // Safari detection (only offer HEVC to Safari to avoid decode warnings elsewhere)
  const isSafari = React.useMemo<boolean>(() => {
    if (typeof navigator === "undefined") return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }, []);

  return (
    <section id="hero" aria-label="Hero" className="relative h-[100svh] w-full overflow-hidden bg-black">
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
        onCanPlay={() => setCanPlay(true)}
        // @ts-expect-error: not yet in TS lib; hint for some browsers
        decoding="async"
        aria-hidden="true"
      >
        {/* Match your file tree under /public/videos */}
        <source src="/videos/hero.webm" type="video/webm" />
        {isSafari && <source src="/videos/hero-h265.mp4" type='video/mp4; codecs="hvc1"' />}
        <source src="/videos/hero-h264.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay (ensures legible copy even if the poster is bright) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Copy */}
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
