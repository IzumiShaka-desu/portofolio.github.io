#!/usr/bin/env bash
# Turn a photo into a manga-style panel: ink lines + halftone screentone + solid blacks.
# Usage: scripts/mangafy.sh <input-photo> <output.png> [crop-geometry] [width]
#   crop-geometry is ImageMagick syntax, e.g. 420x700+30+820 (WxH+X+Y on the original).
# Needs ImageMagick 6.9+ (convert).
set -euo pipefail

in="$1"
out="$2"
crop="${3:-}"
width="${4:-900}"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

prep=(-auto-orient)
[[ -n "$crop" ]] && prep+=(-crop "$crop" +repage)
convert "$in" "${prep[@]}" -resize "${width}x" -colorspace Gray -normalize "$tmp/gray.png"

# Ink lines from edges, slightly thickened.
convert "$tmp/gray.png" -blur 0x1.2 -canny 0x1.4+8%+22% -negate \
	-morphology Erode Disk:1 "$tmp/lines.png"

# Screentone for the midtones, lifted so highlights drop out to paper.
convert "$tmp/gray.png" -blur 0x0.8 -level 12%,82% -sigmoidal-contrast 4,55% \
	-ordered-dither h6x6a "$tmp/tone.png"

# Deep shadows become solid ink (hair, dark clothes).
convert "$tmp/gray.png" -blur 0x1.5 -threshold 17% "$tmp/blacks.png"

convert "$tmp/tone.png" "$tmp/lines.png" -compose Multiply -composite \
	"$tmp/blacks.png" -compose Multiply -composite \
	-colorspace Gray -depth 8 -define png:color-type=0 "$out"

echo "wrote $out"
