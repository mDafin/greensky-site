"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Add padding inside the glass container */
  padding?: boolean;
  /** Variant of glass: 
   *  - auto → theme-aware (light in light mode, dark in dark mode) 
   *  - light → always frosted white
   *  - dark → always frosted dark
   */
  variant?: "auto" | "light" | "dark";
}

const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  ({ className, padding = true, variant = "auto", ...props }, ref) => {
    // Choose correct glass style
    const variantClass =
      variant === "light"
        ? "glass-light"
        : variant === "dark"
        ? "glass-dark"
        : "glass"; // auto (default)

    return (
      <div
        ref={ref}
        className={cn(variantClass, "rounded-[var(--radius)]", padding && "p-4", className)}
        {...props}
      />
    );
  }
);

Glass.displayName = "Glass";

export { Glass };
