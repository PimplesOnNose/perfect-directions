#!/usr/bin/env python3
"""Generate comic-style illustrations for each story page via Cloudflare Workers AI."""
import os
import sys
import json
import base64
import re
import requests
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STORY_JS = ROOT / "src" / "data" / "story.js"
IMG_DIR = ROOT / "public" / "images"
IMG_DIR.mkdir(parents=True, exist_ok=True)

# Load credentials
env_path = Path.home() / ".pi" / "agent" / ".env"
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ[k.strip()] = v.strip().strip('"')

ACCOUNT_ID = os.environ["CLOUDFLARE_ID"]
API_KEY = os.environ["CLOUDFLARE_API_KEY"]
MODEL = "@cf/black-forest-labs/flux-1-schnell"
API_URL = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/run/{MODEL}"

# Aspect ratio: landscape works for storybook pages
WIDTH = 1280
HEIGHT = 768


def extract_scenes(path: Path):
    text = path.read_text()
    # match `scene: "..."` blocks (may contain both " and ' — we only used ")
    scenes = []
    for m in re.finditer(r'scene:\s*"(.+?)"\s*,', text, re.DOTALL):
        scenes.append(m.group(1))
    return scenes


def gen_image(prompt: str, out_path: Path):
    # Use a photo-negative-prompts to keep style consistent
    payload = {
        "prompt": prompt,
        "width": WIDTH,
        "height": HEIGHT,
        "num_steps": 4,
        "guidance": 7.0,
        "negative_prompt": "3d render, photographic, scary, dark, edgy, busy, cluttered, photorealism",
    }
    resp = requests.post(
        API_URL,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=120,
    )
    data = resp.json()
    if "result" in data and "image" in data["result"]:
        img_bytes = base64.b64decode(data["result"]["image"])
        out_path.write_bytes(img_bytes)
        print(f"✅ {out_path.name} ({len(img_bytes)} bytes)")
    else:
        print(f"❌ {out_path.name}: {data}", file=sys.stderr)
        sys.exit(1)


def main():
    scenes = extract_scenes(STORY_JS)
    if not scenes:
        print("No scenes found in story.js", file=sys.stderr)
        sys.exit(1)
    print(f"Found {len(scenes)} scenes. Generating with {MODEL}...")
    for i, scene in enumerate(scenes, 1):
        out = IMG_DIR / f"page{i}.png"
        if out.exists() and out.stat().st_size > 10000:
            print(f"⏭ {out.name} already exists, skipping")
            continue
        gen_image(scene, out)
    print("All images saved to", IMG_DIR)


if __name__ == "__main__":
    main()
