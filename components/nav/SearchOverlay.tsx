// components/overlays/SearchOverlay.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import SafeLink from "@/components/nav/SafeLink";

export type SearchResult = {
  label: string;
  href: string;
  section?: string;
};

export type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
  /** Full search index; overlay filters it locally */
  source: SearchResult[];
  /** Optional starting text */
  initialQuery?: string;
};

export default function SearchOverlay({
  open,
  onClose,
  source,
  initialQuery = "",
}: SearchOverlayProps): React.JSX.Element | null {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState(initialQuery);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    setQuery(initialQuery);
  }, [open, initialQuery]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Click outside panel closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return source.slice(0, 12);
    return source
      .filter((r) => {
        const hay = `${r.label} ${r.section ?? ""}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 24);
  }, [query, source]);

  if (!open) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[80] flex items-start justify-center",
        "bg-black/60 backdrop-blur-sm"
      )}
      aria-modal="true"
      role="dialog"
      aria-label="Search"
    >
      {/* Panel */}
      <div
        ref={panelRef}
        className={clsx(
          "mt-24 w-full max-w-2xl rounded-xl",
          "border border-white/10",
          "bg-zinc-900/95 supports-[backdrop-filter]:bg-zinc-900/80",
          "shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
        )}
      >
        {/* Header with input */}
        <div className="px-4 py-3 border-b border-white/10">
          <label className="block text-[12px] text-zinc-400 mb-2">
            Search the site
          </label>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) onClose();
            }}
            placeholder="Type to search…"
            className={clsx(
              "w-full rounded-md bg-zinc-800/70 text-white",
              "placeholder:text-zinc-400",
              "border border-white/10",
              "px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            )}
            aria-label="Search input"
          />
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-zinc-400">
              No results found.
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {results.map((r) => (
                <li key={`${r.href}-${r.label}`}>
                  <SafeLink
                    href={r.href}
                    onClick={onClose}
                    className="block px-4 py-3 hover:bg-white/5 focus:bg-white/10 focus:outline-none"
                  >
                    <div className="font-medium text-white">{r.label}</div>
                    {r.section ? (
                      <div className="text-[12px] text-zinc-400">{r.section}</div>
                    ) : null}
                  </SafeLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/10 text-[12px] text-zinc-400">
          Press <kbd className="px-1 py-0.5 bg-white/10 rounded">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
}