#!/usr/bin/env bash
set -euo pipefail

OUT="${1:-doctor_report.txt}"

say() { printf "%s\n" "$*" | tee -a "$OUT" >/dev/null; }
hdr() { printf "\n## %s\n" "$*" | tee -a "$OUT" >/dev/null; }
sep() { printf -- "----------------------------------------\n" | tee -a "$OUT" >/dev/null; }

# Reset report
: > "$OUT"
say "# Next.js CSS/Layout Doctor Report"
say "# Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
sep

hdr "Environment"
{ 
  echo "node:    $(command -v node >/dev/null 2>&1 && node -v || echo 'missing')"
  echo "npm:     $(command -v npm  >/dev/null 2>&1 && npm -v  || echo 'missing')"
  echo "pnpm:    $(command -v pnpm >/dev/null 2>&1 && pnpm -v || echo 'missing')"
  echo "yarn:    $(command -v yarn >/dev/null 2>&1 && yarn -v || echo 'missing')"
  echo "next:    $(npx --yes next --version 2>/dev/null || echo 'unknown')"
} | tee -a "$OUT" >/dev/null

sep
hdr "Key files present?"
for f in package.json next.config.js next.config.mjs postcss.config.js postcss.config.cjs tailwind.config.js tailwind.config.cjs app/layout.tsx app/layout.ts app/globals.css styles/globals.css global.css; do
  [ -e "$f" ] && echo "✓ $f" || echo "· $f (not found)"
done | tee -a "$OUT" >/dev/null

sep
hdr "Dependencies (selected)"
if [ -f package.json ]; then
  node -e 'const p=require("./package.json"); const d=Object.assign({},p.dependencies,p.devDependencies); console.log(JSON.stringify(Object.fromEntries(Object.entries(d||{}).filter(([k])=>["next","react","react-dom","tailwindcss","postcss","autoprefixer","@next/font","next/font"].includes(k))),null,2));' \
  | tee -a "$OUT" >/dev/null
else
  echo "package.json not found" | tee -a "$OUT" >/dev/null
fi

sep
hdr "Global CSS import checks"
grep -RIn --include='*.{ts,tsx,js,jsx}' -E 'import\s+["'\''].*global(s)?\.css["'\'']' . || true | tee -a "$OUT" >/dev/null
say "↑ If anything besides the root app/layout imports globals, that’s a red flag."

sep
hdr "Tailwind directive multiplicity (@tailwind base/components/utilities)"
grep -RIn --include='*.css' -E '@tailwind\s+(base|components|utilities)' . | tee -a "$OUT" >/dev/null
say "↑ These typically belong in ONE global stylesheet only."

sep
hdr "Suspicious resets/selectors that can wipe styles"
grep -RIn --include='*.css' -E '\*\s*\{\s*all\s*:\s*unset|:where\(\*\)|\*\s*\{[^}]*display\s*:\s*contents' . || true | tee -a "$OUT" >/dev/null

sep
hdr "Custom @layer usage (possible order conflicts)"
grep -RIn --include='*.css' -E '@layer\s+(base|components|utilities)' . | tee -a "$OUT" >/dev/null
say "↑ Conflicting @layer base blocks across multiple files can reorder preflight."

sep
hdr "next/font mixed with external font links?"
grep -RIn --include='*.{ts,tsx,js,jsx}' -E 'from\s+["'\'']next/font|@next/font' . || true | tee -a "$OUT" >/dev/null
grep -RIn --include='*.{tsx,jsx,html}' -E '<link[^>]+fonts\.googleapis\.com' . || true | tee -a "$OUT" >/dev/null
say "↑ Using next/font and Google Fonts <link> together often causes duplication/CLS."

sep
hdr "Tailwind content config (purge accuracy)"
if [ -f tailwind.config.js ] || [ -f tailwind.config.cjs ]; then
  FILE=$( [ -f tailwind.config.js ] && echo tailwind.config.js || echo tailwind.config.cjs )
  echo "— $FILE —" | tee -a "$OUT" >/dev/null
  cat "$FILE" | sed -n '1,200p' | tee -a "$OUT" >/dev/null
  say "↑ Ensure content includes app/**/*.{js,ts,jsx,tsx,mdx} and components/**/*"
else
  echo "Tailwind config not found" | tee -a "$OUT" >/dev/null
fi

sep
hdr "PostCSS plugin order"
for f in postcss.config.js postcss.config.cjs; do
  [ -f "$f" ] && { echo "— $f —" | tee -a "$OUT" >/dev/null; sed -n '1,200p' "$f" | tee -a "$OUT" >/dev/null; }
done
say "↑ Preferred order: postcss-import (optional) → tailwindcss → autoprefixer. Extra plugins can reorder rules."

sep
hdr "Root layout sanity"
if [ -f app/layout.tsx ] || [ -f app/layout.ts ]; then
  L=$( [ -f app/layout.tsx ] && echo app/layout.tsx || echo app/layout.ts )
  echo "— $L (first 80 lines) —" | tee -a "$OUT" >/dev/null
  sed -n '1,80p' "$L" | tee -a "$OUT" >/dev/null
  if head -n 3 "$L" | grep -q "'use client'"; then
    say "WARNING: Root layout is a client component. This can increase breakage risk."
  fi
else
  echo "No app/layout file detected." | tee -a "$OUT" >/dev/null
fi

sep
hdr "Accidental global CSS in components"
grep -RIn --include='*.{ts,tsx,js,jsx}' -E 'import\s+["'\''].*\.css["'\'']' ./components ./src 2>/dev/null || true | tee -a "$OUT" >/dev/null
say "↑ Components should import module.css, not global.css."

sep
hdr "Hydration / strict mode flags in next.config"
for f in next.config.js next.config.mjs; do
  [ -f "$f" ] && { echo "— $f —" | tee -a "$OUT" >/dev/null; sed -n '1,200p' "$f" | tee -a "$OUT" >/dev/null; }
done

sep
hdr "Build test (no emit)"
if command -v npx >/dev/null 2>&1; then
  (npx --yes next build >/tmp/next_build.log 2>&1 && echo "Build: OK") || echo "Build: FAILED"
  echo "--- next build (tail) ---" | tee -a "$OUT" >/dev/null
  tail -n 120 /tmp/next_build.log | tee -a "$OUT" >/dev/null
else
  echo "npx not available; skipping build test." | tee -a "$OUT" >/dev/null
fi

sep
say "Done. Report: $OUT"
