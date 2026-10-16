import os
from PIL import Image

SHOTS_DIR = "assets/shots"
os.makedirs(SHOTS_DIR, exist_ok=True)

# Map timestamp pattern to target base name
TARGETS = {
    "11.27.26": "instagram-profile-redirect-modal",
    "11.27.31": "instagram-reels-analyze-button",
    "11.27.35": "instagram-reels-analyze-options",
    "11.27.38": "instagram-reels-collecting-progress",
    "11.27.44": "instagram-reels-finalizing-analysis",
    "11.27.46": "instagram-reels-outlier-grid",
    "11.27.50": "instagram-reels-sort-menu",
    "11.27.53": "instagram-reels-filter-modal",
    "11.27.59": "instagram-reels-export-menu",
    "11.28.07": "instagram-reels-batch-select",
    "11.28.20": "instagram-reel-detail-modal",
    "11.28.25": "instagram-reel-download-action",
    "11.28.52": "instagram-reels-inline-download",
    "11.28.54": "instagram-reels-download-tooltip",
    "11.29.15": "instagram-single-reel-download",
    "11.29.25": "instagram-explore-reel-download",
    "11.29.44": "youtube-channel-redirect-popup",
    "11.29.50": "youtube-videos-analyze-options",
    "11.29.53": "youtube-video-collection-progress",
    "11.30.04": "youtube-videos-outlier-grid",
    "11.30.08": "youtube-videos-filter-modal",
    "11.30.12": "youtube-videos-sort-menu",
    "11.30.25": "youtube-video-detail-modal",
    "11.30.32": "youtube-videos-export-menu",
}

found_files = [f for f in os.listdir("screenshots") if f.endswith(".png")]

for time_key, target_base in TARGETS.items():
    matched = [f for f in found_files if time_key in f]
    if not matched:
        print(f"Error: No file found matching timestamp {time_key}")
        continue
    
    src_name = matched[0]
    src_path = os.path.join("screenshots", src_name)
    
    with Image.open(src_path) as im:
        orig_w, orig_h = im.size
        # 2x version (original size, saved as WebP quality 85)
        path_2x = os.path.join(SHOTS_DIR, f"{target_base}@2x.webp")
        im.save(path_2x, format="WEBP", quality=85, method=6)
        
        # 1x version (scaled to max 1600px wide)
        if orig_w > 1600:
            scale = 1600.0 / orig_w
            new_w = 1600
            new_h = int(round(orig_h * scale))
            im_1x = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        else:
            new_w, new_h = orig_w, orig_h
            im_1x = im
        
        path_1x = os.path.join(SHOTS_DIR, f"{target_base}.webp")
        im_1x.save(path_1x, format="WEBP", quality=85, method=6)
        
        # Also generate PNG for og:image on key files
        if target_base in ["instagram-reels-outlier-grid", "youtube-videos-outlier-grid"]:
            path_png = os.path.join(SHOTS_DIR, f"{target_base}.png")
            im_1x.save(path_png, format="PNG", optimize=True)
        
        print(f"Processed: {src_name} -> {target_base}.webp ({new_w}x{new_h}) & @2x.webp ({orig_w}x{orig_h})")

print("All screenshots successfully converted and saved to assets/shots/!")
