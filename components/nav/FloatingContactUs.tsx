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
        "rounded-full px-4 py-2 text-sm font-medium",
        "shadow-lg backdrop-blur",
        "bg-[var(--accent)] text-black",
        "hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30",
        className,
      ].join(" ")}
    >
      {label}
    </button>
  );
}