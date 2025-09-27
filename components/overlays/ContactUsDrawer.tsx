"use client";

import React from "react";
import clsx from "clsx";

export type ContactUsDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactUsDrawer({
  open,
  onClose,
}: ContactUsDrawerProps): React.JSX.Element | null {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <aside
        className={clsx(
          "absolute right-0 top-0 h-full w-full sm:w-[420px]",
          "bg-zinc-950/95 supports-[backdrop-filter]:bg-zinc-950/80 backdrop-blur",
          "border-l border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]",
          "transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="text-white text-base font-semibold">Contact Us</h2>
          <button
            type="button"
            aria-label="Close contact drawer"
            className="rounded px-2 py-1 text-zinc-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4 text-sm">
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <label className="block">
              <span className="block text-zinc-400 mb-1">Name</span>
              <input
                type="text"
                required
                className="w-full rounded-md bg-zinc-900/70 text-white placeholder:text-zinc-500 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </label>

            <label className="block">
              <span className="block text-zinc-400 mb-1">Email</span>
              <input
                type="email"
                required
                className="w-full rounded-md bg-zinc-900/70 text-white placeholder:text-zinc-500 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </label>

            <label className="block">
              <span className="block text-zinc-400 mb-1">Message</span>
              <textarea
                rows={4}
                className="w-full rounded-md bg-zinc-900/70 text-white placeholder:text-zinc-500 border border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </label>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="rounded-md px-4 py-2 text-sm font-medium bg-[var(--accent)] text-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Send
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md px-3 py-2 text-sm text-zinc-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </aside>
    </div>
  );
}