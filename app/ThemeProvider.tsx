// app/ThemeProvider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Applies data-theme="light|dark" on <html>.
 * Keep this inside <body> in the root layout.
 */
export default function ThemeProvider({
  children,
}: { children: React.ReactNode }): React.JSX.Element {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      enableColorScheme={false}
      storageKey="gs-theme"
      themes={["light", "dark"]}
    >
      {children}
    </NextThemesProvider>
  );
}