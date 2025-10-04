"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { NavMenu } from "../nav-data";

/** Public type so StickyHeader can import it */
export type FrostLevel = "base" | "soft" | "strong";

export type NavDropdownProps = {
  menu: NavMenu;
  onClose: () => void;
  /** play exit opacity/translate */
  closing?: boolean;
  /** glass strength (affects bg/blur) */
  frostLevel?: FrostLevel;
  /** let header keep the panel open while pointer hovers panel */
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
};

/**
 * Megapanel with thumbnails + glass.
 * - Right column shows Featured + Guides (md+)
 * - Gradient placeholder if an image is missing
 * - ESC closes, optional "closing" animation
 */
export default function NavDropdown({
  menu,
  onClose,
  closing = false,
  frostLevel = "base",
  onPointerEnter,
  onPointerLeave,
}: NavDropdownProps) {
  const sections = useMemo(() => menu.sections ?? [], [menu.sections]);
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // glass strength
  const glass = (() => {
    switch (frostLevel) {
      case "soft":
        return "bg-[color:color-mix(in_oklab,var(--bg)_84%,transparent)] backdrop-blur";
      case "strong":
        return "bg-[color:color-mix(in_oklab,var(--bg)_92%,transparent)] backdrop-blur-lg";
      default:
        return "bg-[color:color-mix(in_oklab,var(--bg)_88%,transparent)] backdrop-blur";
    }
  })();

  const Thumb = ({
    src,
    sizes,
    className = "",
  }: { src?: string; sizes: string; className?: string }) => {
    if (!src) {
      return (
        <div
          className={[
            "h-full w-full",
            "bg-[linear-gradient(135deg,rgba(255,255,255,.10),rgba(255,255,255,.02))]",
          ].join(" ")}
        />
      );
    }
    return (
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className={["object-cover", className].join(" ")}
      />
    );
  };

  return (
    <div
      className="relative"
      role="menu"
      aria-label={`${menu.label} menu`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {/* Full-width glass panel */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-screen mt-2">
        {/* hover bridge under the trigger row */}
        <div className="absolute -top-2 left-0 right-0 h-2" aria-hidden="true" />

        <div
          ref={panelRef}
          className={[
            "mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12",
            "rounded-2xl border border-[color:var(--hairline-dark)]",
            glass,
            "shadow-[0_24px_60px_rgba(0,0,0,.55)]",
            "transition-[opacity,transform] duration-150 ease-out",
            closing ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0",
          ].join(" ")}
        >
          <div className="grid gap-7 p-5 md:grid-cols-[2fr,2fr] lg:grid-cols-[2fr,2fr,1.5fr]">
            {/* Sections (left / middle) */}
            <div className="md:col-span-2 grid gap-7 sm:grid-cols-2">
              {sections.map((sec, sIdx) => (
                <div key={sIdx} className="min-w-0">
                  {sec.title && (
                    <div className="mb-1.5 text-[11px] uppercase tracking-[0.14em] text-muted">
                      {sec.title}
                    </div>
                  )}
                  <ul className="divide-y divide-[color:var(--hairline-dark)] rounded-xl border border-[color:var(--hairline-dark)] bg-[color:color-mix(in_oklab,var(--bg)_96%,transparent)]">
                    {sec.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          className="flex items-start gap-3 px-3.5 py-3 rounded-xl outline-none transition-colors hover:bg-[color:color-mix(in_oklab,var(--text)_5%,transparent)] focus:bg-[color:color-mix(in_oklab,var(--text)_5%,transparent)]"
                        >
                          {it.icon && <it.icon className="mt-[2px] text-muted" />}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-[0.95rem] font-medium tracking-[-0.01em] leading-6">
                                {it.label}
                              </span>
                              <svg className="ml-0.5" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            {it.desc && (
                              <div className="text-sm text-muted leading-5 line-clamp-2">
                                {it.desc}
                              </div>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right column: Featured + Guides (visible md+) */}
            {(menu.featured?.length || menu.guides?.length) && (
              <aside className="hidden md:block">
                {/* Featured */}
                {menu.featured?.length ? (
                  <>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-muted mb-1.5">
                      Featured
                    </div>
                    <div className="space-y-3 mb-4">
                      {menu.featured.map((f) => (
                        <Link
                          key={f.href}
                          href={f.href}
                          className="block rounded-xl border border-[color:var(--hairline-dark)] overflow-hidden hover:border-[color:var(--hairline-light)] transition-colors"
                        >
                          <div className="relative w-full h-28">
                            <Thumb src={f.image} sizes="(min-width: 768px) 360px, 90vw" className="img-fade-soft" />
                          </div>
                          <div className="p-3">
                            {f.eyebrow && (
                              <div className="text-[11px] uppercase tracking-[0.14em] text-muted">
                                {f.eyebrow}
                              </div>
                            )}
                            <div className="text-[0.98rem] font-semibold tracking-[-0.01em] leading-6">
                              {f.title}
                            </div>
                            {f.desc && (
                              <div className="text-sm text-muted leading-5 line-clamp-2">
                                {f.desc}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : null}

                {/* Recent Guides */}
                {menu.guides?.length ? (
                  <>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-muted mb-1.5">
                      Recent guides
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {menu.guides.map((g) => (
                        <Link
                          key={g.href}
                          href={g.href}
                          className="group rounded-xl border border-[color:var(--hairline-dark)] overflow-hidden hover:border-[color:var(--hairline-light)] transition-colors"
                        >
                          <div className="relative w-full h-20">
                            <Thumb src={g.image} sizes="180px" className="img-fade-soft" />
                          </div>
                          <div className="p-2.5">
                            {g.eyebrow && (
                              <div className="text-[10px] uppercase tracking-[0.14em] text-muted">
                                {g.eyebrow}
                              </div>
                            )}
                            <div className="text-[0.9rem] font-medium tracking-[-0.01em] leading-[1.25rem] line-clamp-2">
                              {g.title}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : null}
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}