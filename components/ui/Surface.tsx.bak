"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Add padding inside the surface container (default: true) */
  padding?: boolean;
  /** Add soft shadow (default: true) */
  shadow?: boolean;
  /** 
   * Variant of surface:
   *  - auto  → light in light mode, dark in dark mode (theme-aware)
   *  - light → always solid light surface
   *  - dark  → always solid dark surface (optionally deeper with level=1)
   */
  variant?: "auto" | "light" | "dark";
  /** For `variant="dark"`, choose base dark (0) or deeper panel (1). Default: 0 */
  level?: 0 | 1;
}

const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  (
    { className, padding = true, shadow = true, variant = "auto", level = 0, ...props },
    ref
  ) => {
    const variantClass =
      variant === "auto"
        ? "surface-light dark:surface-dark"
        : variant === "light"
        ? "surface-light"
        : level === 1
        ? "surface-dark-2"
        : "surface-dark";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius)]",
          variantClass,
          shadow && "shadow-soft",
          padding && "p-4",
          className
        )}
        {...props}
      />
    );
  }
);

Surface.displayName = "Surface";

export { Surface };
