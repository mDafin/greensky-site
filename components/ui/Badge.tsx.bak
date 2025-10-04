// components/ui/Badge.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type BadgeProps = {
  variant?: "solid" | "outline" | "glass";
  className?: string;
  children: React.ReactNode;
};

export function Badge({
  variant = "solid",
  className,
  children,
}: BadgeProps) {
  const styles = {
    solid: "bg-brand-600 text-white",
    outline: "border border-slate-300 text-ink/80",
    glass: "glass text-ink/90",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
