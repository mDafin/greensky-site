"use client";

import * as React from "react";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
type Variant = "glyph" | "wordmark" | "lockup";
type Tone = "white" | "teal" | "gold";

type Props = {
  variant?: Variant;
  tone?: Tone;
  size?: number;         // cap-height px
  href?: string;
  alt?: string;
  className?: string;
  ratioOverride?: number;
};

const RATIO: Record<Variant, number> = {
  glyph: 1,
  wordmark: 5.5,
  lockup: 6.2,
};

export default function Brand({
  variant = "wordmark",
  tone = "white",
  size = 22,
  href,
  alt = "Green Sky",
  className = "",
  ratioOverride,
}: Props): React.JSX.Element {
  const src = `/svg/${variant}-${tone}.svg`;
  const ratio = ratioOverride ?? RATIO[variant];
  const width = Math.round(size * ratio);

  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={size}
      style={{ height: `${size}px`, width: `${width}px` }}
      className={className}
      draggable={false}
    />
  );

  return href ? (
    <Link href={href} aria-label={alt} className="inline-flex items-center">
      {img}
    </Link>
  ) : (
    <span className="inline-flex items-center">{img}</span>
  );
}