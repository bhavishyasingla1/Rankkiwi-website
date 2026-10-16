import os

entries = [
    {
        "num": 1,
        "filename": "Screenshot 2026-10-14 at 11.27.26 AM.png",
        "platform": "Instagram",
        "screen": "Instagram profile page redirect modal",
        "ui": "Rank Kiwi popup modal: 'Open an Instagram Reels tab to analyze Reels.', green 'Open Reels' button, '100% Free & Client-Side' footer. Background shows @natgeo main profile grid.",
        "step": "Step 2: Open an Instagram Reels tab, or Explore (also relevant to Step 15: Troubleshooting states)",
        "alt": "Instagram profile page popup prompting the user to navigate to the Reels tab before analyzing",
        "caption": "Rank Kiwi prompts you to open the creator's Reels tab because analysis works exclusively on Reels.",
        "pages": "None (Flagged - do not use on site)",
        "problems": "FLAGGED: Shows Instagram profile posts/carousels grid in the background behind the modal. Do not use on site per product rules."
    },
    {
        "num": 2,
        "filename": "Screenshot 2026-10-14 at 11.27.31 AM.png",
        "platform": "Instagram",
        "screen": "Instagram Reels tab with injected floating Analyze button",
        "ui": "Instagram @natgeo Reels grid, top-right floating green button '⚡ Analyze Reels ∨', close button '✕', Reel video thumbnails with view counts.",
        "step": "Step 3: Choose sample size and click Analyze",
        "alt": "Instagram Reels tab displaying the floating Analyze Reels button injected by the Rank Kiwi extension",
        "caption": "Open any creator's Reels tab and click the Analyze Reels button to configure your analysis.",
        "pages": "Homepage, docs/getting-started/index.html, docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html",
        "problems": "None. Sharp, shows Reels tab only with floating UI."
    },
    {
        "num": 3,
        "filename": "Screenshot 2026-10-14 at 11.27.35 AM.png",
        "platform": "Instagram",
        "screen": "Analyze Options dropdown menu on Instagram Reels",
        "ui": "Floating Analyze Options dropdown: Posts to analyze options (25, 50, 100, Custom), Sort by options (Views, Likes, Comments, Outlier Score, Oldest), green '⚡ Analyze' button, 'Analyzing @natgeo • Reels'.",
        "step": "Step 3: Choose sample size and click Analyze",
        "alt": "Instagram Reels Analyze Options dropdown menu with sample sizes from 25 to Custom and sort controls",
        "caption": "Select sample size and sorting criteria from the Analyze Options dropdown before starting collection.",
        "pages": "docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html, docs/understanding/sorting-filtering/index.html",
        "problems": "None. Clear UI controls and legible text."
    },
    {
        "num": 4,
        "filename": "Screenshot 2026-10-14 at 11.27.38 AM.png",
        "platform": "Instagram",
        "screen": "Reels collection progress modal",
        "ui": "Centered progress modal: Rank Kiwi icon, 'Collecting Reels...', counter '12 / 25', green progress bar, 'Stop Collection' button. Blurred Reels background.",
        "step": "Step 4: Collection progress",
        "alt": "Instagram Reels collection progress modal showing 12 of 25 Reels collected with an active progress bar",
        "caption": "Rank Kiwi scans recent Reels client-side in your browser, displaying live count and collection status.",
        "pages": "Homepage, docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html",
        "problems": "None. Clear progress state."
    },
    {
        "num": 5,
        "filename": "Screenshot 2026-10-14 at 11.27.44 AM.png",
        "platform": "Instagram",
        "screen": "Reels analysis finalizing progress modal",
        "ui": "Centered progress modal: Rank Kiwi icon, 'Preparing results... Finalizing analysis...', complete green progress bar, 'Stop Collection' button.",
        "step": "Step 4: Collection progress",
        "alt": "Instagram Reels analysis finalizing progress modal calculating creator median metrics in the browser",
        "caption": "The extension computes creator-relative medians to finalize Outlier Scores before rendering results.",
        "pages": "docs/getting-started/your-first-analysis/index.html, docs/troubleshooting/index.html",
        "problems": "None. Clear completion state."
    },
    {
        "num": 6,
        "filename": "Screenshot 2026-10-14 at 11.27.46 AM.png",
        "platform": "Instagram",
        "screen": "Viral Outlier Reels results modal grid",
        "ui": "Header 'Viral Outlier Reels - Showing 25 Reels by @natgeo', Filters 1 badge, Sort by Outlier Score dropdown, Clear all, Select, Download, Export 25 buttons. 8 Reel cards showing 1.0x Outlier badges, 1.2M views, 88K likes, 152 comments.",
        "step": "Step 5: Results grid with Outlier Score badges",
        "alt": "Instagram Reels results grid ranked by Outlier Score with views, likes, and engagement metrics",
        "caption": "Browse analyzed Reels ranked by Outlier Score to discover top-performing formats and outlier topics.",
        "pages": "Homepage, docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html, instagram-analytics/index.html, outlier-score/index.html",
        "problems": "None. Crisp results grid on Reels tab."
    },
    {
        "num": 7,
        "filename": "Screenshot 2026-10-14 at 11.27.50 AM.png",
        "platform": "Instagram",
        "screen": "Sort menu dropdown on Instagram Reels results grid",
        "ui": "Results grid with open Sort by dropdown: Outlier Score (checked), Views, Likes, Comments, Oldest. Visible Reel cards in background.",
        "step": "Step 6: Sorting",
        "alt": "Instagram Reels results grid with sort menu dropdown open showing Outlier Score, views, and likes",
        "caption": "Switch sorting between Outlier Score, total views, likes, comments, or release date instantly.",
        "pages": "docs/understanding/sorting-filtering/index.html, docs/instagram/index.html",
        "problems": "None. Clear menu state."
    },
    {
        "num": 8,
        "filename": "Screenshot 2026-10-14 at 11.27.53 AM.png",
        "platform": "Instagram",
        "screen": "Interactive Filters modal on Instagram Reels",
        "ui": "Filters dialog: tabs for Views, Likes, Comments, Outlier (selected). Histogram distribution bars, dual range sliders, Min 1.0x - Max 1.0x inputs, Clear all, green 'Show 25 Reels' button.",
        "step": "Step 7: Filtering",
        "alt": "Instagram Reels filter dialog showing interactive Outlier Score distribution histogram with range slider",
        "caption": "Narrow down Reel results with interactive histogram filters across views, likes, comments, or Outlier Score.",
        "pages": "Homepage, docs/understanding/sorting-filtering/index.html, docs/instagram/index.html",
        "problems": "None. Clean interactive filter UI."
    },
    {
        "num": 9,
        "filename": "Screenshot 2026-10-14 at 11.27.59 AM.png",
        "platform": "Instagram",
        "screen": "Export menu on Instagram Reels results modal",
        "ui": "Export 25 dropdown: Excel (download icon, copy icon), CSV (download icon, copy icon), JSON (download icon, copy icon). Results cards visible underneath.",
        "step": "Step 14: Export (copy, CSV, Excel, JSON)",
        "alt": "Instagram Reels results modal export menu providing Excel, CSV, and JSON download and clipboard options",
        "caption": "Export full Reel metrics into Excel, CSV, or JSON spreadsheets, or copy data straight to your clipboard.",
        "pages": "docs/exports/index.html, docs/instagram/index.html, creator-content-research/index.html",
        "problems": "None. Complete export options visible."
    },
    {
        "num": 10,
        "filename": "Screenshot 2026-10-14 at 11.28.07 AM.png",
        "platform": "Instagram",
        "screen": "Batch selection mode on Instagram Reels results",
        "ui": "Header 'Selected 3 of 25 Reels', 'Select All', green 'Download 3' button, 'Export 3' button, 'Cancel' button. Checkboxes checked on 3 Reel thumbnail cards.",
        "step": "Step 9: Download a Reel (Reels tab) / Step 14: Export",
        "alt": "Instagram Reels results in selection mode with 3 videos chosen for batch MP4 download or spreadsheet export",
        "caption": "Select specific Reels to batch download video files or export a curated subset of content.",
        "pages": "docs/instagram/explore-downloads/index.html, docs/exports/index.html, docs/instagram/index.html",
        "problems": "None. Clear multi-selection state."
    },
    {
        "num": 11,
        "filename": "Screenshot 2026-10-14 at 11.28.20 AM.png",
        "platform": "Instagram",
        "screen": "Instagram Reel detail modal and video player",
        "ui": "Reel detail modal: 9:16 vertical video player preview, natgeo username, 'Published Oct 7, 2026', metric cards for VIEWS 1.2M, LIKES 88K, COMMENTS 152, OUTLIER SCORE 1.0x, CAPTION box with Copy Caption button, Copy URL, Open in Instagram, green Download Reel button.",
        "step": "Step 8: Reel detail modal and player",
        "alt": "Instagram Reel detail modal showing 1.2M views, 88K likes, 1.0x Outlier Score, caption, and download action",
        "caption": "Inspect detailed Reel analytics, read and copy captions, and download the MP4 video directly.",
        "pages": "Homepage, docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html, instagram-analytics/index.html",
        "problems": "None. Complete detail modal with player."
    },
    {
        "num": 12,
        "filename": "Screenshot 2026-10-14 at 11.28.25 AM.png",
        "platform": "Instagram",
        "screen": "Instagram Reel detail modal with Download button hover",
        "ui": "Same as 11.28.20 AM with cursor hovering on green 'Download Reel' button, highlighting action.",
        "step": "Step 9: Download a Reel (Reels tab)",
        "alt": "Instagram Reel detail modal highlighting the Download Reel button next to views, likes, and caption stats",
        "caption": "Download high-definition Reel videos directly to your device from the detail modal.",
        "pages": "docs/instagram/explore-downloads/index.html",
        "problems": "Near-duplicate of 11.28.20 AM; use where download action is emphasized."
    },
    {
        "num": 13,
        "filename": "Screenshot 2026-10-14 at 11.28.52 AM.png",
        "platform": "Instagram",
        "screen": "Instagram native Reels tab with inline download shortcuts",
        "ui": "Instagram @natgeo Reels grid. Hovered video card displays injected green download button (top right), caption copy button and download button (bottom right), view counts (758K, 564K, 554K, 1.7M).",
        "step": "Step 9: Download a Reel (Reels tab)",
        "alt": "Instagram creator Reels grid showing injected inline download and caption copy icons on video cards",
        "caption": "Download Reels and copy captions directly from the creator's Reels tab without running full analysis.",
        "pages": "Homepage, docs/instagram/explore-downloads/index.html, docs/instagram/index.html",
        "problems": "None. Demonstrates inline overlay features."
    },
    {
        "num": 14,
        "filename": "Screenshot 2026-10-14 at 11.28.54 AM.png",
        "platform": "Instagram",
        "screen": "Instagram Reels tab inline download with tooltip",
        "ui": "Same as 11.28.52 AM with black tooltip 'Download Reel' visible over the injected green download button.",
        "step": "Step 9: Download a Reel (Reels tab)",
        "alt": "Instagram Reels tab with the Download Reel tooltip displayed over the injected quick download button",
        "caption": "Hovering over any Reel thumbnail reveals the one-click Download Reel shortcut button.",
        "pages": "docs/instagram/explore-downloads/index.html",
        "problems": "Variant of 11.28.52 AM."
    },
    {
        "num": 15,
        "filename": "Screenshot 2026-10-14 at 11.29.15 AM.png",
        "platform": "Instagram",
        "screen": "Instagram single Reel viewer with injected download button",
        "ui": "URL instagram.com/reel/DeCOar9gqof/. Video player on left, author natgeo and comments on right. Injected green download button with tooltip 'Download Reel' at top right of video player.",
        "step": "Step 9: Download a Reel (Reels tab)",
        "alt": "Instagram single Reel viewer showing injected Download Reel button on the top right of the video player",
        "caption": "Save Reels while watching them in Instagram's native single Reel view with the injected download button.",
        "pages": "docs/instagram/explore-downloads/index.html, docs/instagram/index.html",
        "problems": "None. Shows single Reel view overlay."
    },
    {
        "num": 16,
        "filename": "Screenshot 2026-10-14 at 11.29.25 AM.png",
        "platform": "Instagram",
        "screen": "Instagram Reels / Explore feed with injected download button",
        "ui": "URL instagram.com/reels/DeCOar9gqof/. Fullscreen vertical Reels player, navigation arrows, like/comment counts (123 likes, 365 shares), injected green download button with tooltip 'Download Reel' top right.",
        "step": "Step 10: Download a Reel from Explore, before analysis",
        "alt": "Instagram Reels feed displaying injected Download Reel button overlay on vertical video player",
        "caption": "Download Reels directly from Instagram Explore and the vertical Reels feed before running any analysis.",
        "pages": "docs/instagram/explore-downloads/index.html, docs/instagram/index.html, instagram-analytics/index.html",
        "problems": "None. Clearly demonstrates Explore / feed download before analysis."
    },
    {
        "num": 17,
        "filename": "Screenshot 2026-10-14 at 11.29.44 AM.png",
        "platform": "YouTube",
        "screen": "YouTube channel Home tab with extension popup redirect",
        "ui": "URL youtube.com/@NatGeo. Extension popup: 'Analysis is available in Videos or Shorts.', two green buttons: 'Open Videos' and 'Open Shorts', footer 'RankKiwi • 100% Free & Client-Side'. NatGeo channel header.",
        "step": "Step 11: YouTube channel: videos, then Shorts (also relevant to Step 15: Troubleshooting states)",
        "alt": "YouTube channel popup prompting the user to open Videos or Shorts tabs to begin performance analysis",
        "caption": "When opening Rank Kiwi on a YouTube channel home page, one-click shortcuts guide you to Videos or Shorts.",
        "pages": "docs/youtube/index.html, docs/getting-started/index.html, docs/troubleshooting/index.html",
        "problems": "None. Clean channel home redirect state."
    },
    {
        "num": 18,
        "filename": "Screenshot 2026-10-14 at 11.29.50 AM.png",
        "platform": "YouTube",
        "screen": "YouTube Videos tab with Analyze Options dropdown",
        "ui": "URL youtube.com/@NatGeo/videos#rk-analyze. Floating green button '⚡ Analyze Videos ∧', Analyze Options menu: Posts to analyze (25 selected, 50, 100, Custom), Sort by (Views, Likes, Comments, Outlier Score selected, Oldest), green '⚡ Analyze' button, 'Analyzing @NatGeo • Videos'.",
        "step": "Step 11: YouTube channel: videos, then Shorts / Step 3: Choose sample size and click Analyze",
        "alt": "YouTube Videos tab showing the Analyze Options menu with sample sizes and Outlier Score sorting options",
        "caption": "Select video sample sizes and sorting criteria on any YouTube channel before running your analysis.",
        "pages": "docs/youtube/index.html, docs/getting-started/your-first-analysis/index.html, docs/understanding/sorting-filtering/index.html",
        "problems": "None. Clear options menu on YouTube surface."
    },
    {
        "num": 19,
        "filename": "Screenshot 2026-10-14 at 11.29.53 AM.png",
        "platform": "YouTube",
        "screen": "YouTube video data collection progress modal",
        "ui": "Centered progress modal: Rank Kiwi icon, 'Fetching video statistics...', subtext '3 / 25 • Fetching Likes & Comments...', green progress bar, 'Stop Collection' button. Blurred YouTube channel background.",
        "step": "Step 4: Collection progress / Step 11: YouTube channel: videos, then Shorts",
        "alt": "YouTube collection progress modal gathering video statistics including views, likes, and comment counts",
        "caption": "Rank Kiwi extracts engagement metrics for YouTube videos in real time with an live progress monitor.",
        "pages": "docs/youtube/index.html, docs/getting-started/your-first-analysis/index.html",
        "problems": "None. Clear progress state."
    },
    {
        "num": 20,
        "filename": "Screenshot 2026-10-14 at 11.30.04 AM.png",
        "platform": "YouTube",
        "screen": "Viral Outlier Videos results modal on YouTube",
        "ui": "Header 'Viral Outlier Videos - Showing 25 Videos by @NatGeo', Filters 1 badge, Sort by Outlier Score dropdown, Select, Download Thumbnails, Export 25 buttons. 6 video cards with green Outlier Score badges: Cleopatra (5.8x, 2.1M views, 19K likes), Expedition Amelia (5.0x, 1.8M views), Steve Boyes (3.0x, 1.1M views), Mapping Nile (2.2x), Smuggling Deals (1.9x), Africa (1.8x).",
        "step": "Step 5: Results grid with Outlier Score badges / Step 11: YouTube channel: videos",
        "alt": "YouTube Viral Outlier Videos grid displaying performance multipliers from 5.8x to 1.8x with view counts",
        "caption": "Identify breakout YouTube videos that outpaced the creator's channel median by up to 5.8x.",
        "pages": "Homepage, docs/youtube/index.html, docs/getting-started/your-first-analysis/index.html, youtube-analytics/index.html, outlier-score/index.html",
        "problems": "None. Very strong outlier scores (5.8x, 5.0x, 3.0x). Ideal for hero and feature showcases."
    },
    {
        "num": 21,
        "filename": "Screenshot 2026-10-14 at 11.30.08 AM.png",
        "platform": "YouTube",
        "screen": "Filters modal on YouTube results grid",
        "ui": "Filters dialog: tabs Views, Likes (selected), Comments, Outlier. Interactive histogram distribution of likes, slider range Min 238 to Max 19294, Clear all, green 'Show 25 Videos' button.",
        "step": "Step 7: Filtering / Step 11: YouTube channel: videos",
        "alt": "YouTube filter modal showing likes distribution histogram with range slider controls from 238 to 19294",
        "caption": "Filter analyzed YouTube videos by likes, views, comments, or Outlier Score with interactive range sliders.",
        "pages": "Homepage, docs/youtube/index.html, docs/understanding/sorting-filtering/index.html",
        "problems": "None. Crisp filter controls."
    },
    {
        "num": 22,
        "filename": "Screenshot 2026-10-14 at 11.30.12 AM.png",
        "platform": "YouTube",
        "screen": "Sort menu dropdown on YouTube results grid",
        "ui": "Open sort dropdown over YouTube results grid: Views, Likes, Comments, Outlier Score (checked), Oldest. Video cards visible underneath.",
        "step": "Step 6: Sorting / Step 11: YouTube channel: videos",
        "alt": "YouTube results grid with the sort dropdown menu displaying options for views, likes, and Outlier Score",
        "caption": "Re-rank YouTube results by Outlier Score, view count, likes, comments, or date in a single click.",
        "pages": "docs/youtube/index.html, docs/understanding/sorting-filtering/index.html",
        "problems": "None. Clear dropdown menu."
    },
    {
        "num": 23,
        "filename": "Screenshot 2026-10-14 at 11.30.25 AM.png",
        "platform": "YouTube",
        "screen": "YouTube video detail modal with thumbnail download",
        "ui": "Modal with video preview on left. Right: title 'World\'s Ultimate Destinations: Guizhou Season 2', NatGeo, Published Oct 1, 2026. Metric cards: VIEWS 110K, LIKES 862, COMMENTS 42, OUTLIER SCORE 0.3x. Description box with Copy Description button, Copy URL, Open in YouTube, green 'Download Thumbnail' button.",
        "step": "Step 12: YouTube details: description, views, likes, comments / Step 13: Thumbnail download",
        "alt": "YouTube video detail modal displaying 110K views, 862 likes, description copy, and thumbnail download action",
        "caption": "Inspect detailed YouTube video metrics, copy full descriptions, and download full-resolution thumbnails.",
        "pages": "docs/youtube/index.html, youtube-analytics/index.html",
        "problems": "None. Detailed video breakdown with thumbnail download."
    },
    {
        "num": 24,
        "filename": "Screenshot 2026-10-14 at 11.30.32 AM.png",
        "platform": "YouTube",
        "screen": "Export menu on YouTube results modal",
        "ui": "Export 25 dropdown menu: Excel (download icon, copy icon), CSV (download icon, copy icon), JSON (download icon, copy icon). Video cards in background.",
        "step": "Step 14: Export (copy, CSV, Excel, JSON)",
        "alt": "YouTube results modal export menu providing Excel, CSV, and JSON download and clipboard copy options",
        "caption": "Export YouTube video statistics to Excel, CSV, or JSON formats, or copy rows straight to your clipboard.",
        "pages": "docs/exports/index.html, docs/youtube/index.html, creator-content-research/index.html",
        "problems": "None. Clear export options."
    }
]

md = """# Rank Kiwi Screenshot Manifest & Analysis

This manifest documents and audits all 24 raw screenshot captures in `/screenshots/` as required by Step 1 and Step 2 of the asset update plan.

## Product Accuracy & Scope Rules
- **Instagram**: Reels only. No regular feed posts or carousels. Analysis operates from a creator's dedicated Reels tab. Reels in Explore can be downloaded before any analysis.
- **YouTube**: Videos and Shorts. Thumbnail download, description, views, likes, comments.
- **Outlier Score**: Compares each item to that creator's own median performance (not platform averages).
- **Client-Side & Free**: 100% free, no account registration required, runs client-side in the browser.
- **Visual Accuracy**: Only describe what is visibly confirmed in the screenshot. If a feature or claim is not visible, do not state it. If any screenshot displays posts or carousels, flag it and do not use it on the website.

---

## Complete Screenshot Catalog

"""

for e in entries:
    md += f"""### {e['num']}. `{e['filename']}`
- **Platform**: {e['platform']}
- **Screen Shown**: {e['screen']}
- **Visible UI Elements**: {e['ui']}
- **User-Flow Step**: {e['step']}
- **Alt Text** ({len(e['alt'])} chars): `{e['alt']}`
- **Caption**: {e['caption']}
- **Intended Pages**: {e['pages']}
- **Problems / Quality Audit**: {e['problems']}

"""

md += """---

## User Flow Mapping (Step 2)

| Step # | Flow Step Description | Screenshots Available | Status |
|:---|:---|:---|:---|
| 1 | Install and pin the extension | *None* (No dedicated store/pin screenshot captured) | Step omitted from screenshots |
| 2 | Open an Instagram Reels tab, or Explore | `Screenshot 2026-10-14 at 11.27.26 AM.png` (Flagged - shows posts grid behind redirect popup) | Flagged / Skip |
| 3 | Choose sample size and click Analyze | `Screenshot 2026-10-14 at 11.27.31 AM.png`, `Screenshot 2026-10-14 at 11.27.35 AM.png` | Available (Instagram) |
| 4 | Collection progress | `Screenshot 2026-10-14 at 11.27.38 AM.png`, `Screenshot 2026-10-14 at 11.27.44 AM.png` | Available (Instagram) |
| 5 | Results grid with Outlier Score badges | `Screenshot 2026-10-14 at 11.27.46 AM.png`, `Screenshot 2026-10-14 at 11.30.04 AM.png` | Available (Instagram & YouTube) |
| 6 | Sorting | `Screenshot 2026-10-14 at 11.27.50 AM.png`, `Screenshot 2026-10-14 at 11.30.12 AM.png` | Available (Instagram & YouTube) |
| 7 | Filtering | `Screenshot 2026-10-14 at 11.27.53 AM.png`, `Screenshot 2026-10-14 at 11.30.08 AM.png` | Available (Instagram & YouTube) |
| 8 | Reel detail modal and player | `Screenshot 2026-10-14 at 11.28.20 AM.png`, `Screenshot 2026-10-14 at 11.28.25 AM.png` | Available (Instagram) |
| 9 | Download a Reel (Reels tab) | `Screenshot 2026-10-14 at 11.28.07 AM.png`, `Screenshot 2026-10-14 at 11.28.52 AM.png`, `Screenshot 2026-10-14 at 11.28.54 AM.png`, `Screenshot 2026-10-14 at 11.29.15 AM.png` | Available (Instagram) |
| 10 | Download a Reel from Explore, before analysis | `Screenshot 2026-10-14 at 11.29.25 AM.png` | Available (Instagram) |
| 11 | YouTube channel: videos, then Shorts | `Screenshot 2026-10-14 at 11.29.44 AM.png`, `Screenshot 2026-10-14 at 11.29.50 AM.png`, `Screenshot 2026-10-14 at 11.29.53 AM.png` | Available (YouTube) |
| 12 | YouTube details: description, views, likes, comments | `Screenshot 2026-10-14 at 11.30.25 AM.png` | Available (YouTube) |
| 13 | Thumbnail download | `Screenshot 2026-10-14 at 11.30.25 AM.png` | Available (YouTube) |
| 14 | Export (copy, CSV, Excel, JSON) | `Screenshot 2026-10-14 at 11.27.59 AM.png`, `Screenshot 2026-10-14 at 11.30.32 AM.png` | Available (Instagram & YouTube) |
| 15 | Troubleshooting states (if captured) | `Screenshot 2026-10-14 at 11.27.26 AM.png` (Flagged), `Screenshot 2026-10-14 at 11.29.44 AM.png` | Available (YouTube navigation modal) |

---

## Flagged Screenshots (Do Not Use)
- **`Screenshot 2026-10-14 at 11.27.26 AM.png`**: While this captures Rank Kiwi's prompt directing the user to navigate from a profile grid to the Reels tab, the underlying background page contains Instagram photo posts and carousels. Per product constraints, it is flagged and excluded from publication on user-facing pages.
"""

with open("docs/screenshot-manifest.md", "w") as f:
    f.write(md)

print("docs/screenshot-manifest.md written successfully!")
