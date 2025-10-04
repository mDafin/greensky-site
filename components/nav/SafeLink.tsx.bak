"use client";

import React from "react";
import NextLink, { type LinkProps } from "next/link";

/**
 * Accept plain string paths (e.g. "/about") or an object with pathname/query.
 * We normalize to Next.js's LinkProps["href"] without using `any`.
 */
type Href =
  | string
  | {
      pathname: string;
      query?: Record<string, string | number | boolean | null | undefined>;
    };

export type SafeLinkProps = {
  href: Href;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  id?: string;
  role?: string;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-current"?: React.AriaAttributes["aria-current"];
  "data-test"?: string;
};

function normalizeHref(href: Href): LinkProps["href"] {
  // Next.js allows either a string ("/path") or a URL object with pathname/query.
  if (typeof href === "string") return href;
  // Our object shape is compatible with LinkProps["href"]; narrow via typed assert (no `any`).
  return href as LinkProps["href"];
}

export default function SafeLink({
  href,
  className,
  style,
  children,
  prefetch,
  scroll,
  replace,
  target,
  rel,
  onClick,
  id,
  role,
  tabIndex,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
  "data-test": dataTest,
}: SafeLinkProps): React.JSX.Element {
  return (
    <NextLink
      href={normalizeHref(href)}
      className={className}
      style={style}
      prefetch={prefetch}
      scroll={scroll}
      replace={replace}
      target={target}
      rel={rel}
      onClick={onClick}
      id={id}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      data-test={dataTest}
    >
      {children}
    </NextLink>
  );
}