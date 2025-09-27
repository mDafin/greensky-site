#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------
# make-hero-loop.sh
# ------------------------------------------------------------
# Creates seamless boomerang loops for:
#  - public/hero.mp4       (4K master)
#  - public/hero-1080.mp4  (1080p master)
# Optional:
#  - public/hero-hevc.mov  (HEVC master) -> boomerang MP4 fallback
#
# Outputs (all in public/):
#  - hero-boomerang.webm, hero-boomerang.mp4, hero-poster.jpg
#  - hero-1080-boomerang.webm, hero-1080-boomerang.mp4, hero-1080-poster.jpg
#  - hero-hevc-boomerang.mp4 (if HEVC input exists)
#
# Requirements: ffmpeg
# Run from project root: ./scripts/make-hero-loop.sh
# ------------------------------------------------------------

PUBLIC_DIR="public"

FOURK_SRC="${PUBLIC_DIR}/hero.mp4"
FHD_SRC="${PUBLIC_DIR}/hero-1080.mp4"
HEVC_SRC="${PUBLIC_DIR}/hero-hevc.mov"   # optional (skip if not found)

# Boomerang filter: forward + reversed, but TRIM the first frame of the reverse
# to avoid double "bounce" frame (removes micro-stutter).
BOOMERANG_FILTER='[0:v]split=2[fwd][revsrc];[revsrc]reverse,trim=start_frame=1[rev];[fwd][rev]concat=n=2:v=1:a=0,format=yuv420p'

encode_webm_vp9 () {
  local in="$1"
  local out="$2"
  local crf="$3"    # VP9 quality target (lower=better; 28-34 typical)
  local cpu="$4"    # VP9 speed/quality tradeoff (0=best; 5=faster)
  echo "→ WEBM (VP9): ${out}"
  ffmpeg -y -i "${in}" \
    -filter_complex "${BOOMERANG_FILTER}" \
    -an \
    -c:v libvpx-vp9 -b:v 0 -crf "${crf}" \
    -row-mt 1 -tile-columns 2 -frame-parallel 1 -cpu-used "${cpu}" \
    -deadline good \
    "${out}"
}

encode_mp4_h264 () {
  local in="$1"
  local out="$2"
  local crf="$3"    # H.264 quality (18-24 typical; lower=better)
  local preset="$4" # slow/medium/faster
  echo "→ MP4 (H.264): ${out}"
  ffmpeg -y -i "${in}" \
    -filter_complex "${BOOMERANG_FILTER}" \
    -an \
    -c:v libx264 -crf "${crf}" -preset "${preset}" -pix_fmt yuv420p \
    -movflags +faststart \
    "${out}"
}

poster_from_midframe () {
  local in="$1"
  local out="$2"
  local width="$3"  # e.g. 3840/1920/1280
  echo "→ Poster: ${out}"
  ffmpeg -y -i "${in}" -frames:v 1 -vf "scale=${width}:-2" "${out}"
}

boomerang_from_hevc_to_h264 () {
  local in="$1"
  local out="$2"
  echo "→ MP4 (H.264) from HEVC source: ${out}"
  ffmpeg -y -i "${in}" \
    -filter_complex "${BOOMERANG_FILTER}" \
    -an \
    -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p \
    -movflags +faststart \
    "${out}"
}

# --- 4K master ---------------------------------------------------------------
if [[ -f "${FOURK_SRC}" ]]; then
  echo "=== Processing 4K: ${FOURK_SRC} ==="
  encode_webm_vp9  "${FOURK_SRC}" "${PUBLIC_DIR}/hero-boomerang.webm" 34 4
  encode_mp4_h264  "${FOURK_SRC}" "${PUBLIC_DIR}/hero-boomerang.mp4"  22 slow
  poster_from_midframe "${FOURK_SRC}" "${PUBLIC_DIR}/hero-poster.jpg" 1920
else
  echo "⚠️  Skipping 4K: ${FOURK_SRC} not found."
fi

# --- 1080p master ------------------------------------------------------------
if [[ -f "${FHD_SRC}" ]]; then
  echo "=== Processing 1080p: ${FHD_SRC} ==="
  encode_webm_vp9  "${FHD_SRC}" "${PUBLIC_DIR}/hero-1080-boomerang.webm" 30 4
  encode_mp4_h264  "${FHD_SRC}" "${PUBLIC_DIR}/hero-1080-boomerang.mp4"  20 slow
  poster_from_midframe "${FHD_SRC}" "${PUBLIC_DIR}/hero-1080-poster.jpg" 1280
else
  echo "⚠️  Skipping 1080p: ${FHD_SRC} not found."
fi

# --- Optional: HEVC master → H.264 MP4 boomerang (fallback) ------------------
if [[ -f "${HEVC_SRC}" ]]; then
  echo "=== Processing HEVC: ${HEVC_SRC} ==="
  boomerang_from_hevc_to_h264 "${HEVC_SRC}" "${PUBLIC_DIR}/hero-hevc-boomerang.mp4"
else
  echo "ℹ️  No HEVC master found at ${HEVC_SRC}; skipping."
fi

echo "✅ Done. Files written to ${PUBLIC_DIR}/"
