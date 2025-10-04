import * as React from "react";

/** Support an optional `as` prop for polymorphic components */
export type AsProp<C extends React.ElementType> = { as?: C };
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = Record<string, never>
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = Record<string, never>
> = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> };

export interface PolymorphicForwardRefComponent<
  DefaultElement extends React.ElementType,
  OwnProps = Record<string, never>
> {
  <C extends React.ElementType = DefaultElement>(
    props: PolymorphicComponentPropsWithRef<C, OwnProps>
  ): React.ReactElement | null;
  displayName?: string;
}
