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
      <body className="antialiased bg-app">
        <ThemeProvider>
          <StickyHeader />
          <main>{children}</main>
          <ContactHost />
        </ThemeProvider>
      </body>
    </html>
  );
}
