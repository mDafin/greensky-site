// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import ThemeProvider from "./theme-provider";
import StickyHeader from "@/components/nav/StickyHeader";
import ContactHost from "@/components/overlays/ContactHost";

export const metadata: Metadata = {
  title: "Green Sky Management",
  description: "Private markets platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {/* Sticky nav at top */}
          <StickyHeader />

          <main>
            {/* Hero section with boomerang video */}
            <section className="relative h-[70vh] w-full overflow-hidden">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/hero-poster.jpg"
              >
                {/* Prefer 4K boomerang created by the script */}
                <source src="/hero-boomerang.webm" type="video/webm" />
                <source src="/hero-boomerang.mp4" type="video/mp4" />

                {/* If you also created 1080 boomerang, this is a helpful fallback */}
                <source src="/hero-1080-boomerang.webm" type="video/webm" />
                <source src="/hero-1080-boomerang.mp4" type="video/mp4" />

                {/* Last-resort fallback to original master */}
                <source src="/hero.mp4" type="video/mp4" />
              </video>

              {/* Overlay text */}
              <div className="relative z-10 flex h-full items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-4xl sm:text-5xl font-semibold text-white">
                    Investing in What Matters
                  </h1>
                  <p className="mt-3 text-lg sm:text-xl text-zinc-200">
                    Building value across real estate, private equity, and transformative strategies
                  </p>
                </div>
              </div>

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </section>

            {/* All page content */}
            {children}
          </main>

          {/* Floating contact + drawer */}
          <ContactHost />
        </ThemeProvider>
      </body>
    </html>
  );
}
