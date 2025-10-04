"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/** Simple, typed container (div by default) */
export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  wide?: boolean;
}

export function Container({
  as = "div",
  className,
  wide = false,
  children,
  ...rest
}: ContainerProps) {
  const Comp = as as any;
  return (
    <Comp
      className={cn("mx-auto px-6", wide ? "max-w-7xl" : "max-w-5xl", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
