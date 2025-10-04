"use client";

import { useEffect, useRef, useState } from "react";

const EXIT_MS = 240;

export default function QuickSearch(): JSX.Element | null {
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const [closing, setClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey: ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) { e.preventDefault(); setOpen(true); }
      else if (e.key === "Escape") { setOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Presence (enter/exit)
  useEffect(() => {
    let t: number | null = null;
    if (open) {
      setPresent(true);
      setClosing(false);
      t = window.setTimeout(() => inputRef.current?.focus(), 16) as unknown as number;
    } else if (present) {
      setClosing(true);
      t = window.setTimeout(() => { setPresent(false); setClosing(false); }, EXIT_MS) as unknown as number;
    }
    return () => { if (t) window.clearTimeout(t); };
  }, [open, present]);

  if (!present) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[10vh]"
      role="dialog" aria-modal="true"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className={["absolute inset-0 bg-black/50", closing ? "backdrop-exit" : "backdrop-ready"].join(" ")} />

      {/* Panel */}
      <div
        className={[
          "relative w-[min(720px,92vw)] rounded-2xl border",
          "border-[color:var(--hairline-dark)]",
          "glass-surface shadow-glide",
          closing ? "shadow-soft" : "shadow-strong",
          "p-3.5",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <div className="text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="search"
            inputMode="search"
            placeholder="Search…"
            className="w-full bg-transparent outline-none text-[0.98rem] placeholder:text-muted"
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          />
          <kbd className="hidden sm:inline-flex select-none rounded border border-[color:var(--hairline-dark)] px-1.5 py-0.5 text-[11px] text-muted">⌘K</kbd>
        </div>
        <div className="mt-3 text-sm text-muted">
          Type to search. Press <span className="text-text">Esc</span> to close.
        </div>
      </div>
    </div>
  );
}