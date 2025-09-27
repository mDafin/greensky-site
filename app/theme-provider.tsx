"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Global theme provider
 * - Applies `class="light"` or `class="dark"` on <html>
 * - Default: dark (no system switching to keep branding tight)
 */
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="gs-theme"
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}