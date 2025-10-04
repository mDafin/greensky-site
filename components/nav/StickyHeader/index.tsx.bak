// components/nav/StickyHeader.tsx
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/people", label: "People" },
  { href: "/offices", label: "Offices" },
  { href: "/security", label: "Security" },
  { href: "/privacy", label: "Privacy" },
  { href: "/legal", label: "Legal" },
];

export default function StickyHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="glass rounded-xl border border-slate-200 bg-white/45 backdrop-blur-lg">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="inline-flex items-center gap-2">
          <div
            aria-hidden
            className="h-6 w-6 rounded-xl bg-neutral-900"
            style={{ maskImage: "radial-gradient(circle at 30% 30%, #000 40%, transparent 41%)" }}
          />
          <span className="text-sm font-semibold tracking-tight text-neutral-800">Green Sky</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-[15px] text-neutral-700 hover:text-neutral-900 transition-colors duration-200 ease-swift",
                "underline-offset-[6px] hover:underline rounded-lg"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white active:scale-[0.98] transition duration-200 ease-swift"
        >
          <div className="h-4 w-4 relative">
            <span
              className={cn(
                "block h-[2px] w-5 bg-neutral-900 rounded absolute left-1/2 -translate-x-1/2 transition-transform",
                open ? "top-1/2 -rotate-45" : "top-[6px]"
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-5 bg-neutral-900 rounded absolute left-1/2 -translate-x-1/2 transition-opacity",
                open ? "top-1/2 opacity-0" : "top-[12px] opacity-100"
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-5 bg-neutral-900 rounded absolute left-1/2 -translate-x-1/2 transition-transform",
                open ? "top-1/2 rotate-45" : "top-[18px]"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-slate-200 px-2 py-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-[15px] text-neutral-800 hover:bg-white/60 transition-colors ease-swift"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
