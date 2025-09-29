// components/FooterDark.tsx
"use client";

import React from "react";
import Image from "next/image";
import SafeLink from "@/components/nav/SafeLink";

export default function FooterDark(): React.JSX.Element {
  return (
    <footer className="bg-zinc-900 text-white">
      {/* Top */}
      <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + tagline */}
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
          <p className="mt-6 text-sm leading-relaxed text-zinc-400 max-w-xs">
            Powering growth in global e-commerce through logistics, payments, and AI-driven solutions.
          </p>
        </div>

        {/* Link columns */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wide text-zinc-400">
              Solutions
            </h4>
            <ul className="mt-4 space-y-2">
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/commerce">Commerce Platform</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/logistics">Logistics &amp; Fulfillment</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/payments">Payments</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/growth">Growth Solutions</SafeLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wide text-zinc-400">
              Company
            </h4>
            <ul className="mt-4 space-y-2">
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/about">About Us</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/careers">Careers</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/impact">Impact</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/contact">Contact</SafeLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wide text-zinc-400">
              Resources
            </h4>
            <ul className="mt-4 space-y-2">
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/insights">News &amp; Insights</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/support">Support</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/privacy">Privacy Policy</SafeLink></li>
              <li><SafeLink className="hover:text-[#57B6B2] hover:underline transition-colors" href="/terms">Terms of Use</SafeLink></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 mt-8">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-400 gap-4">
          <div>© {new Date().getFullYear()} Green Sky Management. All rights reserved.</div>

          {/* Social (teal glow; no extra deps) */}
          <div className="flex gap-4">
            <SafeLink
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-800 hover:bg-[#57B6B2] hover:text-zinc-900 transition-all duration-300 icon-glow"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 
                  2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-11.47 16H5.06V10.5h2.47V19ZM6.3 
                  9.42A1.43 1.43 0 1 1 7.73 8a1.43 1.43 0 0 1-1.43 1.43ZM19 19h-2.47v-4.5c0-1.07-.02-2.45-1.49-2.45-1.5 
                  0-1.73 1.17-1.73 2.37V19H10.8V10.5h2.37v1.16h.03a2.6 2.6 0 0 1 2.34-1.29c2.51 
                  0 2.97 1.65 2.97 3.79V19Z"
                />
              </svg>
            </SafeLink>

            <SafeLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-800 hover:bg-[#57B6B2] hover:text-zinc-900 transition-all duration-300 icon-glow"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21 5.5c-.7.3-1.5.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.9-2.6 1.1C16.9 4.3 15.8 4 14.7 4c-2.2 0-4 
                  1.8-4 4 0 .3 0 .7.1 1-3.3-.2-6.3-1.8-8.3-4.2-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.6 1.8 3.4-.6 0-1.2-.2-1.7-.5v.1c0 
                  2 1.4 3.7 3.3 4.1-.3.1-.7.2-1 .2-.2 0-.5 0-.7-.1.5 1.7 2.1 2.9 3.9 3-1.5 1.2-3.4 1.9-5.4 1.9H3c1.9 1.2 4.2 
                  1.9 6.6 1.9 8 0 12.4-6.6 12.4-12.4v-.6c.9-.7 1.5-1.3 2-2.1Z"
                />
              </svg>
            </SafeLink>

            <SafeLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-800 hover:bg-[#57B6B2] hover:text-zinc-900 transition-all duration-300 icon-glow"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 
                  0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 
                  7a3.5 3.5 0 0 0 0-7Zm5-1.75a1 1 0 1 1 0 2a1 1 0 0 1 0-2Z"
                />
              </svg>
            </SafeLink>
          </div>
        </div>
      </div>

      {/* Teal glow animation */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          .icon-glow {
            animation: badgePulse 6s ease-in-out infinite;
          }
          .icon-glow :global(svg) {
            animation: pulseGlow 2.6s ease-in-out infinite;
          }
          @keyframes pulseGlow {
            0% { filter: none; }
            50% {
              filter:
                drop-shadow(0 0 6px rgba(87,182,178,0.55))
                drop-shadow(0 0 12px rgba(87,182,178,0.35));
            }
            100% { filter: none; }
          }
          @keyframes badgePulse {
            0% { box-shadow: 0 0 0 rgba(87,182,178,0); }
            50% { box-shadow: 0 0 20px rgba(87,182,178,0.15); }
            100% { box-shadow: 0 0 0 rgba(87,182,178,0); }
          }
        }
      `}</style>
    </footer>
  );
}