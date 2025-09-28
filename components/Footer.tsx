// components/sections/FooterDark.tsx
"use client";

import React from "react";
import SafeLink from "@/components/nav/SafeLink";

export default function FooterDark(): React.JSX.Element {
  return (
    <footer className="bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="text-2xl font-semibold">Build with<br/>Green&nbsp;Sky</div>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-[0.14em] text-zinc-400">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><SafeLink href="/the-firm" className="hover:underline">The Firm</SafeLink></li>
              <li><SafeLink href="/people" className="hover:underline">Our People</SafeLink></li>
              <li><SafeLink href="/insights" className="hover:underline">Insights</SafeLink></li>
              <li><SafeLink href="/careers" className="hover:underline">Careers</SafeLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-[0.14em] text-zinc-400">Social</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="https://www.linkedin.com" className="hover:underline" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com" className="hover:underline" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://x.com" className="hover:underline" target="_blank" rel="noreferrer">X (Twitter)</a></li>
              <li><a href="https://facebook.com" className="hover:underline" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-[0.14em] text-zinc-400">Get in Touch</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><SafeLink href="/contact" className="hover:underline">Contact Us</SafeLink></li>
              <li><SafeLink href="/offices" className="hover:underline">Our Offices</SafeLink></li>
              <li><SafeLink href="/lp-login" className="hover:underline">Limited Partner Login</SafeLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/15" />

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[13px] text-zinc-400">
          <div>© {new Date().getFullYear()} Green Sky Management</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <SafeLink href="/transparency" className="hover:underline">Transparency & Disclosure</SafeLink>
            <SafeLink href="/legal" className="hover:underline">Legal</SafeLink>
            <SafeLink href="/privacy" className="hover:underline">Privacy Center</SafeLink>
            <SafeLink href="/security" className="hover:underline">Phishing & Fraud Awareness</SafeLink>
            <SafeLink href="/do-not-sell" className="hover:underline">Do Not Sell/Share My Personal Info</SafeLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
