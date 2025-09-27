// components/overlays/ContactUsRailButton.tsx
"use client";

import React from "react";
import { openContactDrawer } from "@/components/overlays/contactBus";

export default function ContactUsRailButton() {
  return (
    <button
      type="button"
      onClick={openContactDrawer}
      aria-label="Contact Us"
      title="Contact Us"
      className="
        hidden lg:flex
        fixed right-3 top-1/3 z-[55]
        rotate-[-90deg] origin-right
        rounded-b-lg
        px-3 py-2
        text-sm font-medium
        shadow-md
        transition
        hover:opacity-95 focus:opacity-95 focus:outline-none
      "
      style={{ backgroundColor: "var(--accent)", color: "#0b0b0b" }}
    >
      Contact&nbsp;Us
    </button>
  );
}