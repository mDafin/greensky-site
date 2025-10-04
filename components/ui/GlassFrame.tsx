"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

type GlassFrameProps = {
  children: React.ReactNode;
  className?: string;
  /** Boost perceived clarity/contrast (applies subtle overlay) */
  sharp?: boolean;
  /** Rounded radius token; defaults to var(--radius) */
  radiusClassName?: string; // e.g. "rounded-2xl"
  /** Turn off vignette if you want edge-to-edge */
  vignette?: boolean;
  /** Light or dark pane tint */
  tone?: "light" | "dark";
};

export default function GlassFrame({
  children,
  className,
  sharp = true,
  radiusClassName = "rounded-2xl",
  vignette = true,
  tone = "dark",
}: GlassFrameProps) {
  return (
    <div
      className={twMerge(
        "relative overflow-hidden",
        radiusClassName,
        "ring-1 ring-black/5 shadow-soft",
        className
      )}
      style={{
        // lets you tweak globally from CSS variables
        // @ts-expect-error CSS vars allowed
        "--glass-alpha": "0.5",
        "--glass-blur": "18px",
      }}
    >
      {/* the “pane” */}
      <div
        aria-hidden
        className={twMerge(
          "pointer-events-none absolute inset-0",
          "backdrop-blur-[var(--glass-blur)]",
          tone === "dark" ? "bg-black/20" : "bg-white/30",
        )}
        style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08)" }}
      />

      {/* highlights at edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* optional crisp overlay */}
      {sharp && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            mixBlendMode: "overlay",
            filter: "contrast(1.06) saturate(1.05) brightness(1.02)",
            opacity: 0.6,
          }}
        />
      )}

      {/* vignette */}
      {vignette && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.22) 100%)",
          }}
        />
      )}

      {/* content layer */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .backdrop-blur-[var(--glass-blur)] {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
        }
      `}</style>
    </div>
  );
}