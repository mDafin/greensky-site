"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Puts data-theme="light|dark" on <html>, avoids UA color-scheme surprises,
 * and disables transition flicker on toggle.
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
