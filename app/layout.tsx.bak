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
