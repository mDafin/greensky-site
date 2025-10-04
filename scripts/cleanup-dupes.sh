#!/usr/bin/env bash
set -euo pipefail

echo ">> Normalizing component folders…"
mkdir -p components/ui components/media lib

# ------------------------------ lib/cn.ts
cat > lib/cn.ts <<'EOF'
/**
 * Small className merge helper.
 * If you're using tailwind-merge, swap this to use twMerge() instead.
 */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
EOF

# ------------------------------ components/ui/Button.tsx
cat > components/ui/Button.tsx <<'EOF'
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const button = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400 " +
    "disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[var(--radius,12px)]",
  {
    variants: {
      variant: {
        solid: "bg-brand-600 text-white hover:bg-brand-700 active:scale-[.98] shadow",
        glass:
          "glass text-ink/90 hover:bg-white/70 active:scale-[.98] border border-white/40",
        outline:
          "border border-slate-300 text-ink/90 bg-white hover:bg-slate-50 active:scale-[.98]",
        link: "text-brand-700 underline-offset-4 hover:underline px-0 h-auto",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        xl: "h-12 px-6 text-[15px] leading-[1.1]",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
      full: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  as?: React.ElementType;
}

export function Button({
  as: Comp = "button",
  className,
  variant,
  size,
  full,
  ...rest
}: ButtonProps) {
  return (
    <Comp className={cn(button({ variant, size, full }), className)} {...rest} />
  );
}
EOF

# ------------------------------ components/ui/Card.tsx
cat > components/ui/Card.tsx <<'EOF'
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/** Base card (semantic <section> by default for SEO) */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  glass?: boolean;
  shadow?: boolean;
  padded?: boolean;
}

export function Card({
  as = "section",
  className,
  glass = true,
  shadow = true,
  padded = true,
  children,
  ...rest
}: CardProps) {
  const Comp = as as any;
  return (
    <Comp
      className={cn(
        glass ? "glass" : "bg-white dark:bg-ink/90",
        "rounded-[var(--radius,12px)]",
        shadow && "shadow-soft",
        padded && "p-6",
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Optional header; pass a visible <h3> or use the title prop */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function CardHeader({
  as = "header",
  title,
  className,
  children,
  ...rest
}: CardHeaderProps) {
  const Comp = as as any;
  return (
    <Comp className={cn("mb-3", className)} {...rest}>
      {title ? (
        <h3 className="text-lg font-semibold leading-tight text-neutral-900">
          {title}
        </h3>
      ) : (
        children
      )}
    </Comp>
  );
}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

export function CardContent({
  as = "div",
  className,
  children,
  ...rest
}: CardContentProps) {
  const Comp = as as any;
  return (
    <Comp
      className={cn("text-slate-700/90 dark:text-slate-200/90 subtle", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Footer provided for future use; keep exported to avoid churn */
export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

export function CardFooter({
  as = "footer",
  className,
  children,
  ...rest
}: CardFooterProps) {
  const Comp = as as any;
  return (
    <Comp className={cn("mt-4 pt-3 border-t border-slate-200/70", className)} {...rest}>
      {children}
    </Comp>
  );
}
EOF

# ------------------------------ components/ui/Container.tsx
cat > components/ui/Container.tsx <<'EOF'
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/** Simple, typed container (div by default) */
export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  wide?: boolean;
}

export function Container({
  as = "div",
  className,
  wide = false,
  children,
  ...rest
}: ContainerProps) {
  const Comp = as as any;
  return (
    <Comp
      className={cn("mx-auto px-6", wide ? "max-w-7xl" : "max-w-5xl", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
EOF

# ------------------------------ components/ui/Glass.tsx
cat > components/ui/Glass.tsx <<'EOF'
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/** Thin wrapper that guarantees the .glass class and passes through props */
export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

export function Glass({ as = "div", className, children, ...rest }: GlassProps) {
  const Comp = as as any;
  return (
    <Comp className={cn("glass rounded-[var(--radius,12px)]", className)} {...rest}>
      {children}
    </Comp>
  );
}
EOF

# ------------------------------ components/media/HeroLogoCard.tsx (only write if missing)
if [ ! -f components/media/HeroLogoCard.tsx ]; then
cat > components/media/HeroLogoCard.tsx <<'EOF'
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
  src = "/logo-dark.svg",
  alt = "Green Sky logo",
  className,
  brandHex = "#2ab99f",
  durationSec = 8,
}: HeroLogoCardProps) {
  const style = {
    // @ts-expect-error CSS var passthrough
    "--glow-brand": brandHex,
    "--glow-dur": `${durationSec}s`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative glass rounded-2xl overflow-hidden shadow-soft",
        "flex items-center justify-center",
        "w-[200px] md:w-[240px] lg:w-[280px]",
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
            rgba(255, 255, 255, 0.35) 0%,
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
          .glow-shift { animation: none; }
        }
      `}</style>
    </div>
  );
}
EOF
fi

echo ">> Components normalized."
echo "   - components/ui/{Button,Card,Container,Glass}.tsx"
echo "   - lib/cn.ts"
echo "   - components/media/HeroLogoCard.tsx (created if missing)"
echo ">> Done."
