// components/Footer.tsx
"use client";

import React from "react";
import SafeLink from "@/components/nav/SafeLink";
import ContactUsLink from "@/components/nav/ContactUsLink";

export default function Footer(): React.JSX.Element {
  return (
    <footer
      className="mt-24 border-t bg-zinc-950/90 text-[color:var(--footer-fg)]"
      style={{ borderColor: "var(--footer-border)" }}
    >
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Brand */}
        <div>
          <h3 className="font-semibold text-lg" style={{ color: "var(--footer-heading)" }}>
            Green Sky
          </h3>
          <p className="mt-2 text-sm">
            Investing in what matters most.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--footer-heading)" }}>
            The Firm
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <SafeLink href="/about" className="hover:text-[var(--accent)]">
                About
              </SafeLink>
            </li>
            <li>
              <SafeLink href="/people" className="hover:text-[var(--accent)]">
                People
              </SafeLink>
            </li>
            <li>
              <SafeLink href="/careers" className="hover:text-[var(--accent)]">
                Careers
              </SafeLink>
            </li>
          </ul>
        </div>

        {/* Column 3: Products */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--footer-heading)" }}>
            What We Do
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <SafeLink href="/businesses/re" className="hover:text-[var(--accent)]">
                Real Estate
              </SafeLink>
            </li>
            <li>
              <SafeLink href="/businesses/pe" className="hover:text-[var(--accent)]">
                Private Equity
              </SafeLink>
            </li>
            <li>
              <SafeLink href="/private-markets/credit" className="hover:text-[var(--accent)]">
                Private Credit
              </SafeLink>
            </li>
            <li>
              <SafeLink href="/transformation/tech" className="hover:text-[var(--accent)]">
                Transformative Strategies
              </SafeLink>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wide mb-3" style={{ color: "var(--footer-heading)" }}>
            Connect
          </h4>
          <div className="space-y-2">
            <ContactUsLink className="block w-fit rounded-md px-4 py-2 text-sm font-medium"
              style={{ backgroundColor: "var(--accent)", color: "#0b0b0b" }}
            />
            <SafeLink
              href="https://www.linkedin.com/"
              className="block w-fit text-sm hover:text-[var(--accent)]"
            >
              LinkedIn →
            </SafeLink>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="py-4 text-center text-xs"
        style={{
          color: "var(--footer-fg)",
          borderTop: "1px solid var(--footer-border)",
        }}
      >
        © {new Date().getFullYear()} Green Sky Management. All rights reserved.
      </div>
    </footer>
  );
}
