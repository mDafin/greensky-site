#!/usr/bin/env bash
set -euo pipefail

# Usage: bash package_site.sh /path/to/site [--include-node-modules]

SRC_DIR="${1:-.}"
INCLUDE_NODE="${2:-}"

# Where to save the finished archives
OUT_DIR="$HOME/Desktop/archives"
mkdir -p "$OUT_DIR"

CHUNK_SIZE=$((50*1024*1024)) # 50 MB
TS="$(date +"%Y%m%d-%H%M%S")"
BASENAME="$(basename "$(realpath "$SRC_DIR")")"
OUT_BASE="${BASENAME}-${TS}"

# Default exclusions
EXCLUDES=(
  --exclude='.git'
  --exclude='.DS_Store'
  --exclude='node_modules'
  --exclude='.next'
  --exclude='dist'
  --exclude='build'
  --exclude='.turbo'
  --exclude='.vercel'
  --exclude='coverage'
  --exclude='.cache'
)

# If user asks for node_modules, skip that exclusion
if [[ "$INCLUDE_NODE" == "--include-node-modules" ]]; then
  EXCLUDES=(--exclude='.git' --exclude='.DS_Store')
fi

echo "→ Packaging '$SRC_DIR' into $OUT_DIR/${OUT_BASE}.tar.gz ..."
tar -czf "$OUT_DIR/${OUT_BASE}.tar.gz" "${EXCLUDES[@]}" -C "$(dirname "$(realpath "$SRC_DIR")")" "$BASENAME"

echo "→ Generating checksum ..."
shasum -a 256 "$OUT_DIR/${OUT_BASE}.tar.gz" > "$OUT_DIR/${OUT_BASE}.tar.gz.sha256"

echo "→ Splitting into 50 MB parts ..."
split -b "$CHUNK_SIZE" -a 3 -d "$OUT_DIR/${OUT_BASE}.tar.gz" "$OUT_DIR/${OUT_BASE}.part."

echo "→ Creating parts manifest ..."
(
  printf "archive=%s\n" "${OUT_BASE}.tar.gz"
  printf "checksum_sha256=%s\n" "$(cut -d' ' -f1 "$OUT_DIR/${OUT_BASE}.tar.gz.sha256")"
  printf "chunk_size_bytes=%d\n" "$CHUNK_SIZE"
  printf "parts=\n"
  for f in "$OUT_DIR/${OUT_BASE}.part."*; do
    printf "  - %s %s\n" "$(shasum -a 256 "$f" | awk '{print $1}')" "$(basename "$f")"
  done
) > "$OUT_DIR/${OUT_BASE}.manifest.txt"

# Remove the big tar.gz so you’re left only with the parts + manifest + checksum
rm -f "$OUT_DIR/${OUT_BASE}.tar.gz"

cat <<EOF

✅ Done. All files are saved in: $OUT_DIR

Files created:
  - ${OUT_BASE}.part.000, ${OUT_BASE}.part.001, ...
  - ${OUT_BASE}.tar.gz.sha256
  - ${OUT_BASE}.manifest.txt

Reassemble on any machine:
  cat ${OUT_BASE}.part.* > ${OUT_BASE}.tar.gz
  shasum -a 256 -c ${OUT_BASE}.tar.gz.sha256   # should say OK
  tar -xzf ${OUT_BASE}.tar.gz
EOF
