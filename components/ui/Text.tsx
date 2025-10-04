// components/ui/Text.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type TextVariant = "body" | "muted" | "lead" | "small" | "code";

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  variant?: TextVariant;
};

export function Text({
  variant = "body",
  className,
  ...props
}: TextProps) {
  const styles: Record<TextVariant, string> = {
    body: "text-base text-ink/90",
    muted: "text-sm text-ink/60",
    lead: "text-lg text-ink font-medium",
    small: "text-xs text-ink/70 uppercase tracking-wide",
    code: "font-mono text-sm text-pink-600 bg-slate-100 rounded px-1",
  };

  return (
    <p className={cn(styles[variant], className)} {...props} />
  );
}
