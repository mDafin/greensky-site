import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import MegaNavBlackstoneClone from "@/components/nav/MegaNavBlackstoneClone";

export const metadata: Metadata = {
  title: "Green Sky Management",
  description: "Private markets platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        {/* Sticky header with mega-nav */}
        <header className="sticky top-0 z-50">
          <MegaNavBlackstoneClone />
        </header>

        {/* Theme context wraps the app */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
