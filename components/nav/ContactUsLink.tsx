"use client";

import React from "react";

export type ContactUsLinkProps = {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export default function ContactUsLink({
  onClick,
  className,
  style,
  children
}: ContactUsLinkProps): React.JSX.Element {
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => {
        if (onClick) onClick();
        // Always broadcast for the drawer
        window.dispatchEvent(new CustomEvent("openContactDrawer"));
      }}
    >
      {children}
    </button>
  );
}
