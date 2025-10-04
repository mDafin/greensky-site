// components/nav/MobileMenu/index.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type MobileLink = { href: string; label: string; image?: string; eyebrow?: string };
export type MobileGroup = { title: string; links: MobileLink[] };

type Props = {
  open: boolean;
  onClose: () => void;
  items?: MobileLink[];     // fallback if you don't pass groups
  groups?: MobileGroup[];   // preferred
  pathname: string | null;
};

const EXIT_MS = 240;

export default function MobileMenu({ open, onClose, items, groups, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [present, setPresent] = useState(open);
  const [ready, setReady] = useState(false);
  const [closing, setClosing] = useState(false);

  // Enter/Exit presence for smooth closing
  useEffect(() => {
    let t: number | null = null;
    if (open) {
      setPresent(true);
      setClosing(false);
      t = window.setTimeout(() => setReady(true), 16) as unknown as number;
    } else if (present) {
      setReady(false);
      setClosing(true);
      t = window.setTimeout(() => { setPresent(false); setClosing(false); }, EXIT_MS) as unknown as number;
    }
    return () => { if (t) window.clearTimeout(t); };
  }, [open, present]);

  // ESC closes
  useEffect(() => {
    if (!present) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [present, onClose]);

  // Autofocus on mount
  useEffect(() => {
    if (!present || !ready) return;
    const first = panelRef.current?.querySelector<HTMLElement>("input,button,[href],select,textarea,[tabindex]:not([tabindex='-1'])");
    first?.focus();
  }, [present, ready]);

  const baseGroups: MobileGroup[] = useMemo(() => {
    if (groups?.length) return groups;
    const flat = items ?? [];
    return flat.length ? [{ title: "Menu", links: flat }] : [];
  }, [groups, items]);

  if (!present) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" onClick={onClose}>
      {/* Backdrop */}
      <div
        className={[
          "absolute inset-0 bg-black/50",
          "transition-opacity",
          ready && !closing ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={[
          "absolute right-0 top-0 h-full w-[86%] max-w-sm",
          "rounded-none glass-surface border-l border-[color:var(--hairline-dark)]",
          "shadow-[0_24px_60px_rgba(0,0,0,.55)]",
          "transition-transform duration-200 ease-out",
          ready && !closing ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 pt-3 pb-2 border-b border-[color:var(--hairline-dark)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-[-0.01em]">Menu</span>
            <button
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[color:color-mix(in_oklab,var(--text)_8%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <nav className="p-2 space-y-2 overflow-y-auto h-[calc(100%-3.5rem)]" aria-label="Mobile">
          {baseGroups.length ? baseGroups.map((g) => (
            <section key={g.title} className="rounded-xl px-2 py-1">
              <div className="px-2 py-2 text-[0.92rem] font-semibold tracking-[-0.01em] text-text/90">
                {g.title}
              </div>
              <div className="space-y-1.5">
                {g.links.map((lnk) => {
                  const active = pathname === lnk.href;
                  const isThumb = !!lnk.image;
                  return isThumb ? (
                    <Link
                      key={lnk.href}
                      href={lnk.href}
                      onClick={onClose}
                      className={[
                        "flex gap-3 rounded-xl overflow-hidden border transition-colors",
                        "border-[color:var(--hairline-dark)] hover:border-[color:var(--hairline-light)]",
                        active ? "bg-[color:color-mix(in_oklab,var(--text)_6%,transparent)]" : "",
                      ].join(" ")}
                    >
                      <div className="relative h-14 w-20 shrink-0">
                        <Image src={lnk.image!} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="py-2 pr-3 min-w-0">
                        {lnk.eyebrow && (
                          <div className="text-[10px] uppercase tracking-[0.14em] text-muted leading-3 mb-1">
                            {lnk.eyebrow}
                          </div>
                        )}
                        <div className="text-[0.95rem] font-medium tracking-[-0.01em] line-clamp-2">
                          {lnk.label}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      key={lnk.href}
                      href={lnk.href}
                      onClick={onClose}
                      className={[
                        "block rounded-xl px-3.5 py-3 text-[0.98rem] transition-colors",
                        active
                          ? "bg-[color:color-mix(in_oklab,var(--text)_6%,transparent)] text-text"
                          : "text-muted hover:text-text hover:bg-[color:color-mix(in_oklab,var(--text)_6%,transparent)]",
                      ].join(" ")}
                      aria-current={active ? "page" : undefined}
                    >
                      {lnk.label}
                    </Link>
                  );
                })}
              </div>
            </section>
          )) : (
            <div className="px-4 py-6 text-muted text-sm">No links.</div>
          )}

          {/* Footer actions */}
          <div className="mt-2 border-t border-[color:var(--hairline-dark)] pt-2">
            <Link
              href="/login"
              onClick={onClose}
              className="block rounded-xl px-3.5 py-3 text-[0.98rem] text-muted hover:text-text hover:bg-[color:color-mix(in_oklab,var(--text)_6%,transparent)] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/request-access"
              onClick={onClose}
              className="mt-2 inline-flex h-10 items-center rounded-xl bg-accent px-3.5 text-[0.95rem] font-medium text-[var(--on-dark)] hover:bg-[var(--accent-hover)]"
            >
              Request access
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}