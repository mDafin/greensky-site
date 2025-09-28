"use client";

import React from "react";

type IntroVideoProps = {
  srcWebm: string;
  srcMp4: string;
  poster: string;
  className?: string; // section height
  children?: React.ReactNode; // centered overlay
};

export default function IntroVideo({
  srcWebm,
  srcMp4,
  poster,
  className = "h-[58vh] md:h-[70vh]",
  children,
}: IntroVideoProps): React.JSX.Element {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Harden autoplay for Safari/iOS/desktop
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Ensure muted + playsInline for autoplay
    v.muted = true;
    v.playsInline = true;

    // Try to play immediately
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // Some browsers block autoplay until metadata loaded
        const onCanPlay = async () => {
          try { await v.play(); } catch { /* ignore */ }
          v.removeEventListener("canplay", onCanPlay);
        };
        v.addEventListener("canplay", onCanPlay);
      }
    };

    tryPlay();

    // If user switches tabs and returns, keep it rolling
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        v.play().catch(() => {/* noop */});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section className={`relative w-full overflow-hidden bg-black ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        // Helpful for iOS/Safari
        disableRemotePlayback
      >
        <source src={srcWebm} type="video/webm" />
        <source src={srcMp4} type="video/mp4" />
      </video>

      {/* Legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        {children}
      </div>
    </section>
  );
}
