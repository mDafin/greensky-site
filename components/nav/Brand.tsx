// components/nav/Brand.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type Variant = "mark" | "word";

type BrandProps = {
  height?: number;
  variant?: Variant;
  href?: string;
  className?: string;
  /** When true (on dark backgrounds), show LIGHT logo; else show DARK logo */
  onDark?: boolean;
};

export default function Brand({
  height = 28,
  variant = "mark",
  href = "/",
  className = "",
  onDark = true, // header sits over dark hero initially
}: BrandProps): React.JSX.Element {
  const width = Math.round(height * (variant === "word" ? 6 : 4));
  const logos = {
    light: variant === "word" ? "/logo-light-word.svg" : "/logo-light.svg",
    dark:  variant === "word" ? "/logo-dark-word.svg"  : "/logo-dark.svg",
  };
  const src = onDark ? logos.light : logos.dark;

  return (
    <Link href={href} aria-label="Green Sky" className={`inline-flex items-center ${className}`}>
      <Image src={src} alt="Green Sky" width={width} height={height} priority />
    </Link>
  );
}
