#!/usr/bin/env bash
set -euo pipefail

# Requirements:
#   - ImageMagick: `convert`
#   - potrace
# macOS: brew install imagemagick potrace

# Inputs live in /public, SVGs go to /public/svg
ROOT="${1:-public}"
OUT="$ROOT/svg"
mkdir -p "$OUT"

# Target gold color (tweak if needed)
# Classic “muted gold” with good contrast on dark: #CBA94E
GOLD_HEX="${GOLD_HEX:-#CBA94E}"

# Forms and variants we support
FORMS=(glyph wordmark lockup)
VARIANTS=(white teal gold)

# --- helper: recolor a mono logo to solid color while preserving original alpha ---
recolor_to() {
  local in_png="$1" out_png="$2" hex="$3"
  # Paint a solid fill and copy original alpha onto it
  convert "$in_png" \
    \( -clone 0 -alpha extract \) \
    -delete 0 \
    -size x1 xc:"$hex" -alpha off \
    -compose copyopacity -composite \
    "$out_png"
}

# --- step 1: ensure gold PNGs exist (derive from teal or white if missing) ---
echo "==> Checking/creating gold PNGs in '$ROOT'…"
for form in "${FORMS[@]}"; do
  gold_png="$ROOT/${form}-gold.png"
  teal_png="$ROOT/${form}-teal.png"
  white_png="$ROOT/${form}-white.png"

  if [[ -f "$gold_png" ]]; then
    echo "✓ $gold_png exists"
    continue
  fi

  if [[ -f "$teal_png" ]]; then
    echo "→ Creating $gold_png from $teal_png (fill $GOLD_HEX)"
    recolor_to "$teal_png" "$gold_png" "$GOLD_HEX"
  elif [[ -f "$white_png" ]]; then
    echo "→ Creating $gold_png from $white_png (fill $GOLD_HEX)"
    recolor_to "$white_png" "$gold_png" "$GOLD_HEX"
  else
    echo "• Skipped: no base PNG found for '$form' (need ${form}-teal.png or ${form}-white.png)"
  fi
done

# --- step 2: vectorize all variants to SVG using potrace ---
# We binarize with a threshold; adjust if edges look off
THRESH="${THRESH:-60%}"  # 50–70% usually good
echo "==> Vectorizing to SVG in '$OUT' (threshold=$THRESH)…"

for form in "${FORMS[@]}"; do
  for variant in "${VARIANTS[@]}"; do
    in_png="$ROOT/${form}-${variant}.png"
    out_svg="$OUT/${form}-${variant}.svg"

    if [[ -f "$in_png" ]]; then
      echo "→ $in_png  →  $out_svg"
      convert "$in_png" -alpha extract -threshold "$THRESH" -monochrome -compress none pbm:- \
        | potrace -s --flat --longcoding --turdsize 10 -o "$out_svg"
    else
      echo "• Skipped: $in_png not found"
    fi
  done
done

echo "Done. SVGs are in $OUT"