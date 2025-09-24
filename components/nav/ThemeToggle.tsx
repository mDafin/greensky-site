"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "light" ? "dark" : "light";
  return (
    <button
      onClick={() => setTheme(next)}
      aria-label="Toggle theme"
      className="rounded-lg border border-white/15 px-2 py-1 text-sm"
      title="Toggle theme"
    >
      {theme === "light" ? "☾" : "☀︎"}
    </button>
  );
}
