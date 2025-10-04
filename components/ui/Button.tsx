// components/ui/Button.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Shared visual props                                                 */
/* ------------------------------------------------------------------ */
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "solid" | "glass";

type VisualProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
};

/* Padding/size map (Apple-ish proportions) */
const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 h-9 text-sm",
  md: "px-5 h-10 text-sm",
  lg: "px-6 h-12 text-[15px] leading-none", // hero CTA
};

/* Variant -> CSS classes (hooked to your globals.css) */
const variantClasses: Record<ButtonVariant, string> = {
  solid: "button-solid",
  glass: "button-glass",
};

/* Base utilities shared by both <button> and <a> */
const baseClasses =
  "inline-flex items-center justify-center rounded-full select-none " +
  "font-semibold tracking-tight transition-all duration-200 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-[color:var(--accent)]";

/* ------------------------------------------------------------------ */
/* <Button> — real HTML button                                        */
/* ------------------------------------------------------------------ */
export type ButtonProps = VisualProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">;

export function Button({
  size = "lg",
  variant = "solid",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* <LinkButton> — anchor styled like a button                         */
/* ------------------------------------------------------------------ */
export type LinkButtonProps = VisualProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "color"> & {
    href: string;
  };

export function LinkButton({
  size = "lg",
  variant = "glass",
  className,
  children,
  href,
  ...rest
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}