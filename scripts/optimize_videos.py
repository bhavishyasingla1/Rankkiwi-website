#!/usr/bin/env python3
"""
Optimize product videos for web delivery.
Converts original .mov files to faststart web-friendly MP4s with matching WebP posters.
Original files in 'Detailed product videos' are strictly preserved and untouched.
"""

import os
import subprocess
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(BASE_DIR, "Detailed product videos")
OUT_DIR = os.path.join(BASE_DIR, "assets", "videos")
POSTER_DIR = os.path.join(OUT_DIR, "posters")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(POSTER_DIR, exist_ok=True)

VIDEO_MAPPINGS = [
    {
        "src": "full insta analyses new hero video.mov",
        "dest": "hero-instagram.mp4",
        "poster": "hero-instagram.webp",
        "poster_time": "00:00:01.0"
    },
    {
        "src": "full youtube analyses.mov",
        "dest": "hero-youtube.mp4",
        "poster": "hero-youtube.webp",
        "poster_time": "00:00:01.0"
    },
    {
        "src": "Pin Extension.mov",
        "dest": "pin-extension.mp4",
        "poster": "pin-extension.webp",
        "poster_time": "00:00:00.5"
    },
    {
        "src": "Analyse.mov",
        "dest": "analyse-reels.mp4",
        "poster": "analyse-reels.webp",
        "poster_time": "00:00:01.0"
    },
    {
        "src": "Video player reel after analyses.mov",
        "dest": "reel-player-modal.mp4",
        "poster": "reel-player-modal.webp",
        "poster_time": "00:00:01.0"
    },
    {
        "src": "download reel after analyses.mov",
        "dest": "download-reel-analyses.mp4",
        "poster": "download-reel-analyses.webp",
        "poster_time": "00:00:01.0"
    },
    {
        "src": "download in reel tab of creator.mov",
        "dest": "download-creator-reels-tab.mp4",
        "poster": "download-creator-reels-tab.webp",
        "poster_time": "00:00:01.0"
    },
    {
        "src": "download in reel tab before analyses.mov",
        "dest": "download-reel-tab-direct.mp4",
        "poster": "download-reel-tab-direct.webp",
        "poster_time": "00:00:01.0"
    },
    {
        "src": "download before analyses when we click on reel and it opens on creator tab on behind.mov",
        "dest": "download-explore-reel.mp4",
        "poster": "download-explore-reel.webp",
        "poster_time": "00:00:01.0"
    }
]

def process_all():
    ffmpeg_bin = "/opt/homebrew/bin/ffmpeg"
    
    for item in VIDEO_MAPPINGS:
        src_path = os.path.join(SRC_DIR, item["src"])
        dest_path = os.path.join(OUT_DIR, item["dest"])
        poster_webp = os.path.join(POSTER_DIR, item["poster"])
        poster_jpg = os.path.join(POSTER_DIR, item["poster"].replace(".webp", ".jpg"))
        
        print(f"\nProcessing {item['src']} -> {item['dest']}...")
        
        # 1. Video encode to MP4 (1920 width, faststart, crf 22)
        if not os.path.exists(dest_path):
            cmd = [
                ffmpeg_bin, "-y",
                "-i", src_path,
                "-vf", "scale=1920:-2",
                "-c:v", "libx264",
                "-crf", "22",
                "-preset", "medium",
                "-movflags", "+faststart",
                "-an",
                dest_path
            ]
            subprocess.run(cmd, check=True)
            print(f"Generated video: {dest_path} ({os.path.getsize(dest_path)/1024/1024:.2f} MB)")
        else:
            print(f"Video already exists: {dest_path}")
            
        # 2. Extract poster frame to JPG and convert to WebP
        if not os.path.exists(poster_webp):
            cmd_poster = [
                ffmpeg_bin, "-y",
                "-ss", item["poster_time"],
                "-i", src_path,
                "-vf", "scale=1920:-2",
                "-vframes", "1",
                "-q:v", "2",
                poster_jpg
            ]
            subprocess.run(cmd_poster, check=True, stderr=subprocess.DEVNULL)
            
            img = Image.open(poster_jpg)
            img.save(poster_webp, "WEBP", quality=85)
            if os.path.exists(poster_jpg):
                os.remove(poster_jpg)
            print(f"Generated poster: {poster_webp} ({os.path.getsize(poster_webp)/1024:.1f} KB)")
        else:
            print(f"Poster already exists: {poster_webp}")

if __name__ == "__main__":
    process_all()
