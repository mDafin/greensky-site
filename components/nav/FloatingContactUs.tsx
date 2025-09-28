// components/nav/FloatingContactUs.tsx
"use client";

import React from "react";

export type FloatingContactUsProps = {
  onClick?: () => void;
  label?: string;
  className?: string;
};

export default function FloatingContactUs({
  onClick,
  label = "Contact Us",
  className = "",
}: FloatingContactUsProps): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
        "fixed right-4 bottom-4 z-[60]",
        "rounded-full px-4 py-2 text-sm font-medium shadow-lg backdrop-blur",
        "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/40",
        className,
      ].join(" ")}
      style={{ backgroundColor: "var(--accent)", color: "#0b0b0b" }}
    >
      {label}
    </button>
  );
}
