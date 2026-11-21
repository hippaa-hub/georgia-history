#!/usr/bin/env python3
"""Shrink tools/raw/*.png into public/img/*.webp (960px wide) so the app stays small and works offline."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
src, dst = root / "tools/raw/art", root / "public/img"
dst.mkdir(parents=True, exist_ok=True)
total = 0
for p in sorted(src.glob("*.png") if False else [q for q in src.glob("*.png") if not q.stem.startswith("_")]):
    out = dst / ("art-" + p.stem + ".webp")
    im = Image.open(p).convert("RGB")
    im.thumbnail((256, 256) if p.stem.startswith("icon-") else (960, 960))
    im.save(out, "WEBP", quality=72, method=6)
    total += out.stat().st_size
    print(f"{out.name}  {out.stat().st_size // 1024} KB")
print(f"total {total // 1024} KB")

# Tell the app which painted illustrations exist (anything else falls back to the SVG drawing).
import json
names = sorted(p.stem for p in src.glob("*.png") if not p.stem.startswith("_"))
(root / "src/content/illustrations.json").write_text(json.dumps(names, indent=1) + "\n")
print(f"{len(names)} illustrations listed")
