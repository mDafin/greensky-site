// components/FooterDark.tsx
"use client";

import React from "react";
import Image from "next/image";
import SafeLink from "@/components/nav/SafeLink";

export default function FooterDark(): React.JSX.Element {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo */}
        <div className="md:col-span-1">
          <div className="relative h-20 sm:h-24 md:h-28 w-64 sm:w-72 md:w-80">
            <Image
              src="/logo-light.svg"
              alt="Green Sky Management"
              fill
              className="object-contain"
              priority
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, 16rem"
            />
          </div>
          <p className="mt-6 text-sm text-zinc-400 max-w-xs">
            Powering growth in global e-commerce through logistics, payments, and AI-driven solutions.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-3">Solutions</h4>
            <ul className="space-y-2">
              <li><SafeLink href="/commerce">Commerce Platform</SafeLink></li>
              <li><SafeLink href="/logistics">Logistics & Fulfillment</SafeLink></li>
              <li><SafeLink href="/payments">Payments</SafeLink></li>
              <li><SafeLink href="/growth">Growth Solutions</SafeLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2">
              <li><SafeLink href="/about">About Us</SafeLink></li>
              <li><SafeLink href="/careers">Careers</SafeLink></li>
              <li><SafeLink href="/impact">Impact</SafeLink></li>
              <li><SafeLink href="/contact">Contact</SafeLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><SafeLink href="/insights">News & Insights</SafeLink></li>
              <li><SafeLink href="/support">Support</SafeLink></li>
              <li><SafeLink href="/privacy">Privacy Policy</SafeLink></li>
              <li><SafeLink href="/terms">Terms of Use</SafeLink></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10 mt-10">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-zinc-400">
          <div>© {new Date().getFullYear()} Green Sky Management. All rights reserved.</div>
          <div className="mt-3 sm:mt-0 flex gap-4">
            <SafeLink href="/linkedin">LinkedIn</SafeLink>
            <SafeLink href="/twitter">Twitter</SafeLink>
            <SafeLink href="/instagram">Instagram</SafeLink>
          </div>
        </div>
      </div>
    </footer>
  );
}