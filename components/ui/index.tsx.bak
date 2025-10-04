// components/ui/Card.tsx
"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use the glass look (default: true) */
  glass?: boolean;
  /** Add a soft shadow (default: true) */
  shadow?: boolean;
  /** Add padding (default: true) */
  padded?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, shadow = true, padded = true, ...rest }, ref) => {
    const base = twMerge(
      glass
        ? "glass"
        : "bg-white text-neutral-900 dark:bg-ink/90 dark:text-on-dark",
      "rounded-[var(--radius)]",
      shadow && "shadow-soft",
      padded && "p-6",
      className
    );

    return <div ref={ref} className={base} {...rest} />;
  }
);
Card.displayName = "Card";

/* ---------- Subcomponents ---------- */

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, children, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge("mb-3 border-b border-white/20 pb-3", className)}
      {...props}
    >
      {title && <h3 className="text-lg font-semibold text-on-dark">{title}</h3>}
      {subtitle && (
        <p className="mt-1 text-sm text-on-dark-muted">{subtitle}</p>
      )}
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge("py-3", className)} {...props} />
));
CardBody.displayName = "CardBody";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge("text-sm text-on-dark-muted subtle", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge("mt-4 pt-3 border-t border-white/15", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";