"use client";
import * as React from "react";

type Props = {
  poster?: string;
  webmSrc?: string;
  hevcSrc?: string;
  mp4Src?: string;
  className?: string;
  ariaLabel?: string;
};

export default function BackgroundVideo({
  poster = "/videos/hero-poster.jpg",
  webmSrc = "/videos/hero.webm",
  hevcSrc = "/videos/hero-h265.mp4",
  mp4Src = "/videos/hero-h264.mp4",
  className,
  ariaLabel = "Decorative background video",
}: Props) {
  return (
    <video
      className={[
        "absolute inset-0 -z-10 h-full w-full object-cover",
        "pointer-events-none", // ensure it never captures clicks
        className,
      ].join(" ")}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
    >
      <source src={webmSrc} type="video/webm" />
      <source src={hevcSrc} type='video/mp4; codecs="hvc1"' />
      <source src={mp4Src} type="video/mp4" />
    </video>
  );
}
