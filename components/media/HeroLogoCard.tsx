// components/media/HeroLogoCard.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type HeroLogoCardProps = {
  src?: string;
  alt?: string;
  className?: string;
  brandHex?: `#${string}`;
  durationSec?: number;
};

export default function HeroLogoCard({
  src = "/logo-white.png", // <-- updated filename
  alt = "Green Sky logo",
  className,
  brandHex = "#2ab99f",
  durationSec = 8,
}: HeroLogoCardProps) {
  const style = {
    "--glow-brand": brandHex,
    "--glow-dur": `${durationSec}s`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative glass rounded-2xl overflow-hidden shadow-soft flex items-center justify-center w-[200px] md:w-[240px] lg:w-[280px]",
        className
      )}
      style={style}
      aria-label="Brand logo on liquid glass card"
    >
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        priority
        className="relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]"
      />
      {/* overlays (glow + noise etc.) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.00) 70%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 glow-shift" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-black/10 mix-blend-overlay"
      />
      <style jsx global>{`
        .glow-shift {
          background: radial-gradient(
            60% 60% at 50% 50%,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          animation: glowShift var(--glow-dur, 8s) ease-in-out infinite;
          filter: blur(28px);
          opacity: 0.8;
        }
        @keyframes glowShift {
          0%,
          70% {
            background: radial-gradient(
              60% 60% at 50% 50%,
              rgba(255, 255, 255, 0.35) 0%,
              rgba(255, 255, 255, 0) 70%
            );
          }
          82% {
            background: radial-gradient(
              60% 60% at 50% 50%,
              color-mix(in oklab, var(--glow-brand, #2ab99f) 65%, white) 0%,
              transparent 70%
            );
          }
          100% {
            background: radial-gradient(
              60% 60% at 50% 50%,
              rgba(255, 255, 255, 0.35) 0%,
              rgba(255, 255, 255, 0) 70%
            );
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .glow-shift {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}