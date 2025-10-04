// components/ui/Card.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/* Base Card                                                                  */
/* -------------------------------------------------------------------------- */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
  glass?: boolean;
  padded?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, shadow = true, glass = false, padded = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius)]",
        glass
          ? "glass"
          : "bg-white dark:bg-ink/90",
        shadow && "shadow-soft",
        padded && "p-6",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/* -------------------------------------------------------------------------- */
/* Subcomponents                                                              */
/* -------------------------------------------------------------------------- */

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-3", className)}
      {...props}
    >
      {/* Shorthand title/subtitle if passed as props */}
      {title && <h3 className="h3 text-ink/90">{title}</h3>}
      {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("h3 text-ink/90", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-slate-700/90 subtle", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pt-3 border-t border-slate-200 text-sm text-muted", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */
export { Card, CardHeader, CardTitle, CardContent, CardFooter };