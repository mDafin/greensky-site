#!/usr/bin/env bash
set -euo pipefail

# Input MOV (you can change this if your source file has a different name)
INPUT="hero-source.mov"

# Output directory (public so Next.js can serve it)
OUTDIR="public"

# Ensure public directory exists
mkdir -p "$OUTDIR"

echo "🎬 Converting $INPUT → 4K hero.mp4..."
ffmpeg -i "$INPUT" \
  -vf "scale=3840:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 18 -preset slow -movflags +faststart \
  -maxrate 35M -bufsize 70M \
  -c:a aac -b:a 192k -ac 2 \
  "$OUTDIR/hero.mp4"

echo "🎬 Converting $INPUT → 1080p hero-1080.mp4..."
ffmpeg -i "$INPUT" \
  -vf "scale=1920:-2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 20 -preset slow -movflags +faststart \
  -maxrate 8M -bufsize 16M \
  -c:a aac -b:a 128k -ac 2 \
  "$OUTDIR/hero-1080.mp4"

echo "📸 Generating poster hero-poster.jpg..."
ffmpeg -ss 2 -i "$INPUT" -vframes 1 -q:v 2 \
  -vf "scale=1920:-2" "$OUTDIR/hero-poster.jpg"

echo "✅ Done! Files written to $OUTDIR:"
ls -lh "$OUTDIR"/hero*.*