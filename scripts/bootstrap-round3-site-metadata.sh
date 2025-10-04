#!/usr/bin/env bash
set -euo pipefail

echo ">> Round 3: Site-wide metadata + OG/Twitter + icons"

# Ensure dirs
mkdir -p app public public/og

# ------------------------------------------------------------------------------
# public/og/default.svg (OG/Twitter placeholder — replace anytime)
# ------------------------------------------------------------------------------
cat > public/og/default.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0b0b"/>
      <stop offset="1" stop-color="#111113"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(80,80)">
    <rect x="0" y="0" rx="16" width="120" height="120" fill="#0B0B0B" stroke="#2AB99F" stroke-width="2"/>
    <path d="M18 63c0-25 20-45 45-45 15 0 28 8 36 19a5 5 0 0 1-8 6 34 34 0 0 0-28-15c-19 0-35 16-35 35s16 35 35 35c12 0 23-6 29-16h-22a5 5 0 1 1 0-10h32c3 0 5 2 5 5 0 24-21 42-44 42-25 0-45-20-45-45z" fill="#2AB99F"/>
  </g>
  <text x="240" y="120" fill="#fafafa" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica" font-size="56" font-weight="700">Green Sky</text>
  <text x="240" y="178" fill="#a1a1aa" font-family="ui-sans-serif, system-ui" font-size="28">Secure, modern, lender-ready commerce</text>
</svg>
EOF

# ------------------------------------------------------------------------------
# app/icon.svg (Next will use this for favicon / app icon)
# ------------------------------------------------------------------------------
cat > app/icon.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
  <rect width="256" height="256" rx="48" fill="#0B0B0B"/>
  <path d="M48 135c0-45 36-81 81-81 27 0 51 14 65 35a10 10 0 0 1-16 12 61 61 0 0 0-49-27c-34 0-61 27-61 61s27 61 61 61c21 0 40-10 51-28h-40a10 10 0 1 1 0-20h58c5 0 10 4 10 10 0 43-39 76-80 76-45 0-81-36-81-81z" fill="#2AB99F"/>
</svg>
EOF

# ------------------------------------------------------------------------------
# app/manifest.webmanifest (minimal PWA manifest; optional but nice for SEO)
# ------------------------------------------------------------------------------
cat > app/manifest.webmanifest <<'EOF'
{
  "name": "Green Sky",
  "short_name": "Green Sky",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0b0b0b",
  "theme_color": "#0b0b0b",
  "icons": [
    { "src": "/icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any" }
  ]
}
EOF

# ------------------------------------------------------------------------------
# app/layout.tsx (site-wide metadata + Analytics + consent Script)
#  - Overwrites existing file. We keep your Analytics import and placement.
# ------------------------------------------------------------------------------
cat > app/layout.tsx <<'EOF'
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Analytics from "@/app/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "http://localhost:3000"),
  title: {
    default: "Green Sky",
    template: "%s — Green Sky",
  },
  description:
    "Green Sky Management – Secure, modern, and lender-ready e-commerce platform with real estate expertise.",
  applicationName: "Green Sky",
  generator: "Next.js",
  referrer: "no-referrer",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Green Sky",
    title: "Green Sky — Intelligent commerce, enterprise security",
    description:
      "Secure, modern, lender-ready e-commerce platform with real estate expertise.",
    url: "/",
    images: [
      {
        url: "/og/default.svg",
        width: 1200,
        height: 630,
        alt: "Green Sky — Secure, modern, lender-ready e-commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Sky — Intelligent commerce, enterprise security",
    description:
      "Secure, modern, lender-ready e-commerce platform with real estate expertise.",
    images: ["/og/default.svg"],
    creator: "@yourhandle",
  },
  category: "technology",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Consent defaults: analytics off until user updates */}
        <Script id="consent-defaults" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'granted',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
          `}
        </Script>

        {/* Your analytics component (kept above children as requested) */}
        <Analytics />
        {children}
      </body>
    </html>
  );
}
EOF

echo ">> Done (Round 3)."
echo "What changed:"
echo "  • Site-wide metadata (title template, robots, OpenGraph, Twitter) in app/layout.tsx"
echo "  • Added app/icon.svg (used by Next for favicon/app icon)"
echo "  • Added public/og/default.svg (OG/Twitter image placeholder)"
echo "  • Added app/manifest.webmanifest (optional PWA/SEO nicety)"
echo
echo "Tips:"
echo "  • Set NEXT_PUBLIC_BASE_URL (or BASE_URL) in .env.local for absolute OG URLs"
echo "  • Replace /public/og/default.svg with a real 1200x630 PNG/JPG when ready"
