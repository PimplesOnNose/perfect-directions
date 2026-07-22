#!/usr/bin/env python3
"""Generate Edge TTS MP3 narration for each story page."""
import asyncio
import os
import sys
import subprocess
import json
from pathlib import Path

# Voice choice: a friendly male narrator. en-US-BrianNeural is warm,
# approachable, casual and sincere — great for a kids' story read-aloud.
VOICE = "en-US-BrianNeural"
# Leave rate None to use the default voice pace (avoids CLI parsing quirks)
RATE = None

ROOT = Path(__file__).resolve().parent.parent
STORY_JS = ROOT / "src" / "data" / "story.js"
AUDIO_DIR = ROOT / "public" / "audio"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)


def extract_pages_from_js(path: Path):
    """Pull the narration strings out of story.js without a JS engine."""
    text = path.read_text()
    # crude parse: find `narration: "..."` lines (no nested quotes used here)
    pages = []
    for block in text.split("{"):
        for line in block.splitlines():
            line = line.strip()
            if line.startswith("narration:"):
                # capture the quoted string
                first = line.find('"')
                last = line.rfind('"')
                if first != -1 and last != -1 and last > first:
                    pages.append(line[first + 1 : last])
    return pages


async def synth(text: str, out_path: Path):
    cmd = ["edge-tts", "--voice", VOICE, "--text", text, "--write-media", str(out_path)]
    if RATE:
        cmd[1:1] = ["--rate", RATE]
    proc = await asyncio.create_subprocess_exec(
        *cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await proc.communicate()
    if proc.returncode != 0:
        print(f"❌ Failed {out_path.name}: {stderr.decode()}", file=sys.stderr)
        sys.exit(1)
    print(f"✅ {out_path.name} ({out_path.stat().st_size} bytes)")


async def main():
    narrations = extract_pages_from_js(STORY_JS)
    if not narrations:
        print("No narration found in story.js", file=sys.stderr)
        sys.exit(1)

    print(f"Found {len(narrations)} narrations. Voice: {VOICE}")
    for i, n in enumerate(narrations, 1):
        out = AUDIO_DIR / f"page{i}.mp3"
        await synth(n, out)
    print("All audio generated in", AUDIO_DIR)


if __name__ == "__main__":
    asyncio.run(main())
