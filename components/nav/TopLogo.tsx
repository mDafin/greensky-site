"use client";

import * as React from "react";
import Brand from "./Brand";

/**
 * Standalone, centered logo that lives BELOW the sticky header.
 * Uses CSS var --header-h (set by StickyHeader) to position itself.
 * - White at very top → Gold after scroll
 * - Hides while a nav dropdown is open (data-nav-open="true" on <html> or <body>)
 * - Hides when large headings/heroes are close to the top band
 */
export default function TopLogo(): React.JSX.Element {
  const [atTop, setAtTop] = React.useState(true);
  const [hidden, setHidden] = React.useState(false);

  // Tone swap by scroll
  React.useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide while nav dropdown is open
  React.useEffect(() => {
    const readOpen = () =>
      document.documentElement.getAttribute("data-nav-open") === "true" ||
      document.body.getAttribute("data-nav-open") === "true";

    const apply = () => setHidden(readOpen());
    const obs = new MutationObserver(apply);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-nav-open"] });
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-nav-open"] });
    apply();
    return () => obs.disconnect();
  }, []);

  // Also hide when a large heading/hero is very close to the top band
  React.useEffect(() => {
    const sel = "h1, h2, [data-hero], [data-artwork]";
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
    if (!els.length) return;

    const marginTop = 84;
    const onScroll = () => {
      const y = window.scrollY;
      let overlap = false;
      for (const el of els) {
        const top = el.getBoundingClientRect().top + y;
        if (top > y && top < y + marginTop) { overlap = true; break; }
      }
      const open =
        document.documentElement.getAttribute("data-nav-open") === "true" ||
        document.body.getAttribute("data-nav-open") === "true";
      setHidden(open ? true : overlap);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const tone = atTop ? "white" : "gold";

  return (
    <div
      className={[
        // NOTE: top uses the header height variable + a small gap so it sits BELOW the bar
        "fixed left-0 right-0 z-40 flex justify-center pointer-events-none",
        "transition-opacity duration-150",
        hidden ? "opacity-0" : "opacity-100",
      ].join(" ")}
      style={{ top: "calc(var(--header-h, 40px) + 6px)" }}
      aria-hidden={hidden}
    >
      <Brand
        variant="lockup"
        tone={tone}
        size={22}
        alt="Green Sky"
        className="pointer-events-auto"
      />
    </div>
  );
}