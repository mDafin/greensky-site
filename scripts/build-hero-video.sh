#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash scripts/build-hero-video.sh ./hero-source.mp4
# Outputs:
#   public/videos/hero.webm          (VP9)
#   public/videos/hero-h265.mp4      (HEVC / H.265)
#   public/videos/hero-h264.mp4      (H.264 fallback)
#   public/videos/hero-poster.jpg    (poster)

SRC="${1:-hero-source.mp4}"
OUT_DIR="public/videos"
mkdir -p "$OUT_DIR"

# Common scaling: clamp to 1080p max, preserve aspect
SCALE="scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease,format=yuv420p"

echo "→ Creating WebM (VP9, no audio) ..."
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -vf "$SCALE" \
  -c:v libvpx-vp9 -b:v 0 -crf 28 -row-mt 1 -pix_fmt yuv420p \
  -an \
  "${OUT_DIR}/hero.webm"

# Choose fastest HEVC encoder on macOS if available
if ffmpeg -hide_banner -encoders 2>/dev/null | grep -q hevc_videotoolbox; then
  echo "→ Creating HEVC (H.265 via hevc_videotoolbox, no audio) ..."
  ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
    -vf "$SCALE" \
    -c:v hevc_videotoolbox -b:v 3000k -maxrate 5000k -bufsize 6000k \
    -tag:v hvc1 \
    -pix_fmt yuv420p \
    -an -movflags +faststart \
    "${OUT_DIR}/hero-h265.mp4"
else
  echo "→ Creating HEVC (H.265 via libx265, no audio) ..."
  ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
    -vf "$SCALE" \
    -c:v libx265 -crf 24 -preset medium -pix_fmt yuv420p \
    -x265-params "aq-mode=1" \
    -tag:v hvc1 \
    -an -movflags +faststart \
    "${OUT_DIR}/hero-h265.mp4"
fi

echo "→ Creating H.264 fallback (widest compatibility, no audio) ..."
ffmpeg -y -hide_banner -loglevel error -i "$SRC" \
  -vf "$SCALE" \
  -c:v libx264 -crf 23 -preset veryslow -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  "${OUT_DIR}/hero-h264.mp4"

echo "→ Creating lightweight poster (first frame) ..."
ffmpeg -y -hide_banner -loglevel error -i "$SRC" -frames:v 1 -q:v 3 \
  "${OUT_DIR}/hero-poster.jpg"

echo "✅ Done. Files written to $OUT_DIR/"
