// components/ui/Input.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full rounded-[var(--radius)] border border-slate-300",
          "bg-white px-3 py-2 text-sm text-ink/90 shadow-sm",
          "focus:border-brand-400 focus:ring-2 focus:ring-brand-400 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
