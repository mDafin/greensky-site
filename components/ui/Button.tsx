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
