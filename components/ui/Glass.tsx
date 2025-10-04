"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/** Thin wrapper that guarantees the .glass class and passes through props */
export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

export function Glass({ as = "div", className, children, ...rest }: GlassProps) {
  const Comp = as as any;
  return (
    <Comp className={cn("glass rounded-[var(--radius,12px)]", className)} {...rest}>
      {children}
    </Comp>
  );
}
