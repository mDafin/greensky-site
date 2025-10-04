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
