// components/nav/Brand.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Variant = "mark" | "word";

type BrandProps = {
  height?: number;
  variant?: Variant;
  /** When true, DARK theme shows the LIGHT logo, and LIGHT theme shows the DARK logo. */
  invertInDark?: boolean;
  /** Destination href — keep it simple with string paths (Next 15 is fine). */
  href?: string;
  className?: string;
};

export default function Brand({
  height = 32,
  variant = "mark",
  invertInDark = false,
  href = "/",
  className = "",
}: BrandProps): React.JSX.Element {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Maintain layout during hydration
  const width = Math.round(height * (variant === "word" ? 6 : 4));
  if (!mounted) return <div style={{ height, width }} aria-hidden />;

  // Base assets expected in /public
  const logos = {
    light: variant === "word" ? "/logo-light-word.svg" : "/logo-light.svg",
    dark: variant === "word" ? "/logo-dark-word.svg" : "/logo-dark.svg",
  };

  // Normal (no invert): dark->dark, light->light
  // Inverted:           dark->light, light->dark
  const src =
    theme === "dark"
      ? invertInDark
        ? logos.light
        : logos.dark
      : invertInDark
      ? logos.dark
      : logos.light;

  return (
    <Link href={href} aria-label="Green Sky" className={`inline-flex items-center ${className}`}>
      <Image src={src} alt="Green Sky" width={width} height={height} priority />
    </Link>
  );
}
