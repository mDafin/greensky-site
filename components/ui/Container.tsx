// components/ui/Container.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/** Polymorphic helpers */
type AsProp<C extends React.ElementType> = { as?: C };
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
export type PolymorphicComponentProps<C extends React.ElementType, P = Record<string, never>> =
  React.PropsWithChildren<P & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, P>>;

type ContainerOwnProps = { className?: string; wide?: boolean };

export type ContainerProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProps<C, ContainerOwnProps>;

export function Container<C extends React.ElementType = "div">({
  as,
  className,
  wide = false,
  children,
  ...props
}: ContainerProps<C>) {
  const Comp = (as || "div") as React.ElementType;
  return (
    <Comp
      className={cn("mx-auto px-6", wide ? "max-w-7xl" : "max-w-5xl", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
