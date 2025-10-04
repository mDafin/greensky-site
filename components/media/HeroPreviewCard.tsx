"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type HeroPreviewCardProps = {
  /** Path to the still image (generated from ffmpeg script). */
  src: string;
  /** Optional alt text for accessibility */
  alt?: string;
  /** Optional extra classes to override defaults */
  className?: string;
  /** Width + height for proper optimization */
  width?: number;
  height?: number;
};

export default function HeroPreviewCard({
  src,
  alt = "Preview still from hero video",
  className,
  width = 1280,
  height = 720,
}: HeroPreviewCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl overflow-hidden shadow-soft relative group",
        className
      )}
    >
      {/* Optimized static still */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover card-preview transition-transform duration-500 group-hover:scale-[1.02]"
        priority
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 card-overlay" />
    </div>
  );
}
