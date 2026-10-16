# Rank Kiwi Screenshot Manifest & Analysis

This manifest documents and audits all 24 raw screenshot captures in `/screenshots/` as required by Step 1 and Step 2 of the asset update plan.

## Product Accuracy & Scope Rules
- **Instagram**: Reels only. No regular feed posts or carousels. Analysis operates from a creator's dedicated Reels tab. Reels in Explore can be downloaded before any analysis.
- **YouTube**: Videos and Shorts. Thumbnail download, description, views, likes, comments.
- **Outlier Score**: Compares each item to that creator's own median performance (not platform averages).
- **Client-Side & Free**: 100% free, no account registration required, runs client-side in the browser.
- **Visual Accuracy**: Only describe what is visibly confirmed in the screenshot. If a feature or claim is not visible, do not state it. If any screenshot displays posts or carousels, flag it and do not use it on the website.

---

## Complete Screenshot Catalog

### 1. `Screenshot 2026-10-14 at 11.27.26 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Instagram profile page redirect modal
- **Visible UI Elements**: Rank Kiwi popup modal: 'Open an Instagram Reels tab to analyze Reels.', green 'Open Reels' button, '100% Free & Client-Side' footer. Background shows @natgeo main profile grid.
- **User-Flow Step**: Step 2: Open an Instagram Reels tab, or Explore (also relevant to Step 15: Troubleshooting states)
- **Alt Text** (93 chars): `Instagram profile page popup prompting the user to navigate to the Reels tab before analyzing`
- **Caption**: Rank Kiwi prompts you to open the creator's Reels tab because analysis works exclusively on Reels.
- **Intended Pages**: None (Flagged - do not use on site)
- **Problems / Quality Audit**: FLAGGED: Shows Instagram profile posts/carousels grid in the background behind the modal. Do not use on site per product rules.

### 2. `Screenshot 2026-10-14 at 11.27.31 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Instagram Reels tab with injected floating Analyze button
- **Visible UI Elements**: Instagram @natgeo Reels grid, top-right floating green button '⚡ Analyze Reels ∨', close button '✕', Reel video thumbnails with view counts.
- **User-Flow Step**: Step 3: Choose sample size and click Analyze
- **Alt Text** (100 chars): `Instagram Reels tab displaying the floating Analyze Reels button injected by the Rank Kiwi extension`
- **Caption**: Open any creator's Reels tab and click the Analyze Reels button to configure your analysis.
- **Intended Pages**: Homepage, docs/getting-started/index.html, docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html
- **Problems / Quality Audit**: None. Sharp, shows Reels tab only with floating UI.

### 3. `Screenshot 2026-10-14 at 11.27.35 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Analyze Options dropdown menu on Instagram Reels
- **Visible UI Elements**: Floating Analyze Options dropdown: Posts to analyze options (25, 50, 100, Custom), Sort by options (Views, Likes, Comments, Outlier Score, Oldest), green '⚡ Analyze' button, 'Analyzing @natgeo • Reels'.
- **User-Flow Step**: Step 3: Choose sample size and click Analyze
- **Alt Text** (99 chars): `Instagram Reels Analyze Options dropdown menu with sample sizes from 25 to Custom and sort controls`
- **Caption**: Select sample size and sorting criteria from the Analyze Options dropdown before starting collection.
- **Intended Pages**: docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html, docs/understanding/sorting-filtering/index.html
- **Problems / Quality Audit**: None. Clear UI controls and legible text.

### 4. `Screenshot 2026-10-14 at 11.27.38 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Reels collection progress modal
- **Visible UI Elements**: Centered progress modal: Rank Kiwi icon, 'Collecting Reels...', counter '12 / 25', green progress bar, 'Stop Collection' button. Blurred Reels background.
- **User-Flow Step**: Step 4: Collection progress
- **Alt Text** (102 chars): `Instagram Reels collection progress modal showing 12 of 25 Reels collected with an active progress bar`
- **Caption**: Rank Kiwi scans recent Reels client-side in your browser, displaying live count and collection status.
- **Intended Pages**: Homepage, docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html
- **Problems / Quality Audit**: None. Clear progress state.

### 5. `Screenshot 2026-10-14 at 11.27.44 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Reels analysis finalizing progress modal
- **Visible UI Elements**: Centered progress modal: Rank Kiwi icon, 'Preparing results... Finalizing analysis...', complete green progress bar, 'Stop Collection' button.
- **User-Flow Step**: Step 4: Collection progress
- **Alt Text** (100 chars): `Instagram Reels analysis finalizing progress modal calculating creator median metrics in the browser`
- **Caption**: The extension computes creator-relative medians to finalize Outlier Scores before rendering results.
- **Intended Pages**: docs/getting-started/your-first-analysis/index.html, docs/troubleshooting/index.html
- **Problems / Quality Audit**: None. Clear completion state.

### 6. `Screenshot 2026-10-14 at 11.27.46 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Viral Outlier Reels results modal grid
- **Visible UI Elements**: Header 'Viral Outlier Reels - Showing 25 Reels by @natgeo', Filters 1 badge, Sort by Outlier Score dropdown, Clear all, Select, Download, Export 25 buttons. 8 Reel cards showing 1.0x Outlier badges, 1.2M views, 88K likes, 152 comments.
- **User-Flow Step**: Step 5: Results grid with Outlier Score badges
- **Alt Text** (94 chars): `Instagram Reels results grid ranked by Outlier Score with views, likes, and engagement metrics`
- **Caption**: Browse analyzed Reels ranked by Outlier Score to discover top-performing formats and outlier topics.
- **Intended Pages**: Homepage, docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html, instagram-analytics/index.html, outlier-score/index.html
- **Problems / Quality Audit**: None. Crisp results grid on Reels tab.

### 7. `Screenshot 2026-10-14 at 11.27.50 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Sort menu dropdown on Instagram Reels results grid
- **Visible UI Elements**: Results grid with open Sort by dropdown: Outlier Score (checked), Views, Likes, Comments, Oldest. Visible Reel cards in background.
- **User-Flow Step**: Step 6: Sorting
- **Alt Text** (97 chars): `Instagram Reels results grid with sort menu dropdown open showing Outlier Score, views, and likes`
- **Caption**: Switch sorting between Outlier Score, total views, likes, comments, or release date instantly.
- **Intended Pages**: docs/understanding/sorting-filtering/index.html, docs/instagram/index.html
- **Problems / Quality Audit**: None. Clear menu state.

### 8. `Screenshot 2026-10-14 at 11.27.53 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Interactive Filters modal on Instagram Reels
- **Visible UI Elements**: Filters dialog: tabs for Views, Likes, Comments, Outlier (selected). Histogram distribution bars, dual range sliders, Min 1.0x - Max 1.0x inputs, Clear all, green 'Show 25 Reels' button.
- **User-Flow Step**: Step 7: Filtering
- **Alt Text** (104 chars): `Instagram Reels filter dialog showing interactive Outlier Score distribution histogram with range slider`
- **Caption**: Narrow down Reel results with interactive histogram filters across views, likes, comments, or Outlier Score.
- **Intended Pages**: Homepage, docs/understanding/sorting-filtering/index.html, docs/instagram/index.html
- **Problems / Quality Audit**: None. Clean interactive filter UI.

### 9. `Screenshot 2026-10-14 at 11.27.59 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Export menu on Instagram Reels results modal
- **Visible UI Elements**: Export 25 dropdown: Excel (download icon, copy icon), CSV (download icon, copy icon), JSON (download icon, copy icon). Results cards visible underneath.
- **User-Flow Step**: Step 14: Export (copy, CSV, Excel, JSON)
- **Alt Text** (103 chars): `Instagram Reels results modal export menu providing Excel, CSV, and JSON download and clipboard options`
- **Caption**: Export full Reel metrics into Excel, CSV, or JSON spreadsheets, or copy data straight to your clipboard.
- **Intended Pages**: docs/exports/index.html, docs/instagram/index.html, creator-content-research/index.html
- **Problems / Quality Audit**: None. Complete export options visible.

### 10. `Screenshot 2026-10-14 at 11.28.07 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Batch selection mode on Instagram Reels results
- **Visible UI Elements**: Header 'Selected 3 of 25 Reels', 'Select All', green 'Download 3' button, 'Export 3' button, 'Cancel' button. Checkboxes checked on 3 Reel thumbnail cards.
- **User-Flow Step**: Step 9: Download a Reel (Reels tab) / Step 14: Export
- **Alt Text** (107 chars): `Instagram Reels results in selection mode with 3 videos chosen for batch MP4 download or spreadsheet export`
- **Caption**: Select specific Reels to batch download video files or export a curated subset of content.
- **Intended Pages**: docs/instagram/explore-downloads/index.html, docs/exports/index.html, docs/instagram/index.html
- **Problems / Quality Audit**: None. Clear multi-selection state.

### 11. `Screenshot 2026-10-14 at 11.28.20 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Instagram Reel detail modal and video player
- **Visible UI Elements**: Reel detail modal: 9:16 vertical video player preview, natgeo username, 'Published Oct 7, 2026', metric cards for VIEWS 1.2M, LIKES 88K, COMMENTS 152, OUTLIER SCORE 1.0x, CAPTION box with Copy Caption button, Copy URL, Open in Instagram, green Download Reel button.
- **User-Flow Step**: Step 8: Reel detail modal and player
- **Alt Text** (107 chars): `Instagram Reel detail modal showing 1.2M views, 88K likes, 1.0x Outlier Score, caption, and download action`
- **Caption**: Inspect detailed Reel analytics, read and copy captions, and download the MP4 video directly.
- **Intended Pages**: Homepage, docs/getting-started/your-first-analysis/index.html, docs/instagram/index.html, instagram-analytics/index.html
- **Problems / Quality Audit**: None. Complete detail modal with player.

### 12. `Screenshot 2026-10-14 at 11.28.25 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Instagram Reel detail modal with Download button hover
- **Visible UI Elements**: Same as 11.28.20 AM with cursor hovering on green 'Download Reel' button, highlighting action.
- **User-Flow Step**: Step 9: Download a Reel (Reels tab)
- **Alt Text** (105 chars): `Instagram Reel detail modal highlighting the Download Reel button next to views, likes, and caption stats`
- **Caption**: Download high-definition Reel videos directly to your device from the detail modal.
- **Intended Pages**: docs/instagram/explore-downloads/index.html
- **Problems / Quality Audit**: Near-duplicate of 11.28.20 AM; use where download action is emphasized.

### 13. `Screenshot 2026-10-14 at 11.28.52 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Instagram native Reels tab with inline download shortcuts
- **Visible UI Elements**: Instagram @natgeo Reels grid. Hovered video card displays injected green download button (top right), caption copy button and download button (bottom right), view counts (758K, 564K, 554K, 1.7M).
- **User-Flow Step**: Step 9: Download a Reel (Reels tab)
- **Alt Text** (99 chars): `Instagram creator Reels grid showing injected inline download and caption copy icons on video cards`
- **Caption**: Download Reels and copy captions directly from the creator's Reels tab without running full analysis.
- **Intended Pages**: Homepage, docs/instagram/explore-downloads/index.html, docs/instagram/index.html
- **Problems / Quality Audit**: None. Demonstrates inline overlay features.

### 14. `Screenshot 2026-10-14 at 11.28.54 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Instagram Reels tab inline download with tooltip
- **Visible UI Elements**: Same as 11.28.52 AM with black tooltip 'Download Reel' visible over the injected green download button.
- **User-Flow Step**: Step 9: Download a Reel (Reels tab)
- **Alt Text** (100 chars): `Instagram Reels tab with the Download Reel tooltip displayed over the injected quick download button`
- **Caption**: Hovering over any Reel thumbnail reveals the one-click Download Reel shortcut button.
- **Intended Pages**: docs/instagram/explore-downloads/index.html
- **Problems / Quality Audit**: Variant of 11.28.52 AM.

### 15. `Screenshot 2026-10-14 at 11.29.15 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Instagram single Reel viewer with injected download button
- **Visible UI Elements**: URL instagram.com/reel/DeCOar9gqof/. Video player on left, author natgeo and comments on right. Injected green download button with tooltip 'Download Reel' at top right of video player.
- **User-Flow Step**: Step 9: Download a Reel (Reels tab)
- **Alt Text** (103 chars): `Instagram single Reel viewer showing injected Download Reel button on the top right of the video player`
- **Caption**: Save Reels while watching them in Instagram's native single Reel view with the injected download button.
- **Intended Pages**: docs/instagram/explore-downloads/index.html, docs/instagram/index.html
- **Problems / Quality Audit**: None. Shows single Reel view overlay.

### 16. `Screenshot 2026-10-14 at 11.29.25 AM.png`
- **Platform**: Instagram
- **Screen Shown**: Instagram Reels / Explore feed with injected download button
- **Visible UI Elements**: URL instagram.com/reels/DeCOar9gqof/. Fullscreen vertical Reels player, navigation arrows, like/comment counts (123 likes, 365 shares), injected green download button with tooltip 'Download Reel' top right.
- **User-Flow Step**: Step 10: Download a Reel from Explore, before analysis
- **Alt Text** (94 chars): `Instagram Reels feed displaying injected Download Reel button overlay on vertical video player`
- **Caption**: Download Reels directly from Instagram Explore and the vertical Reels feed before running any analysis.
- **Intended Pages**: docs/instagram/explore-downloads/index.html, docs/instagram/index.html, instagram-analytics/index.html
- **Problems / Quality Audit**: None. Clearly demonstrates Explore / feed download before analysis.

### 17. `Screenshot 2026-10-14 at 11.29.44 AM.png`
- **Platform**: YouTube
- **Screen Shown**: YouTube channel Home tab with extension popup redirect
- **Visible UI Elements**: URL youtube.com/@NatGeo. Extension popup: 'Analysis is available in Videos or Shorts.', two green buttons: 'Open Videos' and 'Open Shorts', footer 'RankKiwi • 100% Free & Client-Side'. NatGeo channel header.
- **User-Flow Step**: Step 11: YouTube channel: videos, then Shorts (also relevant to Step 15: Troubleshooting states)
- **Alt Text** (100 chars): `YouTube channel popup prompting the user to open Videos or Shorts tabs to begin performance analysis`
- **Caption**: When opening Rank Kiwi on a YouTube channel home page, one-click shortcuts guide you to Videos or Shorts.
- **Intended Pages**: docs/youtube/index.html, docs/getting-started/index.html, docs/troubleshooting/index.html
- **Problems / Quality Audit**: None. Clean channel home redirect state.

### 18. `Screenshot 2026-10-14 at 11.29.50 AM.png`
- **Platform**: YouTube
- **Screen Shown**: YouTube Videos tab with Analyze Options dropdown
- **Visible UI Elements**: URL youtube.com/@NatGeo/videos#rk-analyze. Floating green button '⚡ Analyze Videos ∧', Analyze Options menu: Posts to analyze (25 selected, 50, 100, Custom), Sort by (Views, Likes, Comments, Outlier Score selected, Oldest), green '⚡ Analyze' button, 'Analyzing @NatGeo • Videos'.
- **User-Flow Step**: Step 11: YouTube channel: videos, then Shorts / Step 3: Choose sample size and click Analyze
- **Alt Text** (103 chars): `YouTube Videos tab showing the Analyze Options menu with sample sizes and Outlier Score sorting options`
- **Caption**: Select video sample sizes and sorting criteria on any YouTube channel before running your analysis.
- **Intended Pages**: docs/youtube/index.html, docs/getting-started/your-first-analysis/index.html, docs/understanding/sorting-filtering/index.html
- **Problems / Quality Audit**: None. Clear options menu on YouTube surface.

### 19. `Screenshot 2026-10-14 at 11.29.53 AM.png`
- **Platform**: YouTube
- **Screen Shown**: YouTube video data collection progress modal
- **Visible UI Elements**: Centered progress modal: Rank Kiwi icon, 'Fetching video statistics...', subtext '3 / 25 • Fetching Likes & Comments...', green progress bar, 'Stop Collection' button. Blurred YouTube channel background.
- **User-Flow Step**: Step 4: Collection progress / Step 11: YouTube channel: videos, then Shorts
- **Alt Text** (103 chars): `YouTube collection progress modal gathering video statistics including views, likes, and comment counts`
- **Caption**: Rank Kiwi extracts engagement metrics for YouTube videos in real time with an live progress monitor.
- **Intended Pages**: docs/youtube/index.html, docs/getting-started/your-first-analysis/index.html
- **Problems / Quality Audit**: None. Clear progress state.

### 20. `Screenshot 2026-10-14 at 11.30.04 AM.png`
- **Platform**: YouTube
- **Screen Shown**: Viral Outlier Videos results modal on YouTube
- **Visible UI Elements**: Header 'Viral Outlier Videos - Showing 25 Videos by @NatGeo', Filters 1 badge, Sort by Outlier Score dropdown, Select, Download Thumbnails, Export 25 buttons. 6 video cards with green Outlier Score badges: Cleopatra (5.8x, 2.1M views, 19K likes), Expedition Amelia (5.0x, 1.8M views), Steve Boyes (3.0x, 1.1M views), Mapping Nile (2.2x), Smuggling Deals (1.9x), Africa (1.8x).
- **User-Flow Step**: Step 5: Results grid with Outlier Score badges / Step 11: YouTube channel: videos
- **Alt Text** (103 chars): `YouTube Viral Outlier Videos grid displaying performance multipliers from 5.8x to 1.8x with view counts`
- **Caption**: Identify breakout YouTube videos that outpaced the creator's channel median by up to 5.8x.
- **Intended Pages**: Homepage, docs/youtube/index.html, docs/getting-started/your-first-analysis/index.html, youtube-analytics/index.html, outlier-score/index.html
- **Problems / Quality Audit**: None. Very strong outlier scores (5.8x, 5.0x, 3.0x). Ideal for hero and feature showcases.

### 21. `Screenshot 2026-10-14 at 11.30.08 AM.png`
- **Platform**: YouTube
- **Screen Shown**: Filters modal on YouTube results grid
- **Visible UI Elements**: Filters dialog: tabs Views, Likes (selected), Comments, Outlier. Interactive histogram distribution of likes, slider range Min 238 to Max 19294, Clear all, green 'Show 25 Videos' button.
- **User-Flow Step**: Step 7: Filtering / Step 11: YouTube channel: videos
- **Alt Text** (102 chars): `YouTube filter modal showing likes distribution histogram with range slider controls from 238 to 19294`
- **Caption**: Filter analyzed YouTube videos by likes, views, comments, or Outlier Score with interactive range sliders.
- **Intended Pages**: Homepage, docs/youtube/index.html, docs/understanding/sorting-filtering/index.html
- **Problems / Quality Audit**: None. Crisp filter controls.

### 22. `Screenshot 2026-10-14 at 11.30.12 AM.png`
- **Platform**: YouTube
- **Screen Shown**: Sort menu dropdown on YouTube results grid
- **Visible UI Elements**: Open sort dropdown over YouTube results grid: Views, Likes, Comments, Outlier Score (checked), Oldest. Video cards visible underneath.
- **User-Flow Step**: Step 6: Sorting / Step 11: YouTube channel: videos
- **Alt Text** (103 chars): `YouTube results grid with the sort dropdown menu displaying options for views, likes, and Outlier Score`
- **Caption**: Re-rank YouTube results by Outlier Score, view count, likes, comments, or date in a single click.
- **Intended Pages**: docs/youtube/index.html, docs/understanding/sorting-filtering/index.html
- **Problems / Quality Audit**: None. Clear dropdown menu.

### 23. `Screenshot 2026-10-14 at 11.30.25 AM.png`
- **Platform**: YouTube
- **Screen Shown**: YouTube video detail modal with thumbnail download
- **Visible UI Elements**: Modal with video preview on left. Right: title 'World's Ultimate Destinations: Guizhou Season 2', NatGeo, Published Oct 1, 2026. Metric cards: VIEWS 110K, LIKES 862, COMMENTS 42, OUTLIER SCORE 0.3x. Description box with Copy Description button, Copy URL, Open in YouTube, green 'Download Thumbnail' button.
- **User-Flow Step**: Step 12: YouTube details: description, views, likes, comments / Step 13: Thumbnail download
- **Alt Text** (108 chars): `YouTube video detail modal displaying 110K views, 862 likes, description copy, and thumbnail download action`
- **Caption**: Inspect detailed YouTube video metrics, copy full descriptions, and download full-resolution thumbnails.
- **Intended Pages**: docs/youtube/index.html, youtube-analytics/index.html
- **Problems / Quality Audit**: None. Detailed video breakdown with thumbnail download.

### 24. `Screenshot 2026-10-14 at 11.30.32 AM.png`
- **Platform**: YouTube
- **Screen Shown**: Export menu on YouTube results modal
- **Visible UI Elements**: Export 25 dropdown menu: Excel (download icon, copy icon), CSV (download icon, copy icon), JSON (download icon, copy icon). Video cards in background.
- **User-Flow Step**: Step 14: Export (copy, CSV, Excel, JSON)
- **Alt Text** (100 chars): `YouTube results modal export menu providing Excel, CSV, and JSON download and clipboard copy options`
- **Caption**: Export YouTube video statistics to Excel, CSV, or JSON formats, or copy rows straight to your clipboard.
- **Intended Pages**: docs/exports/index.html, docs/youtube/index.html, creator-content-research/index.html
- **Problems / Quality Audit**: None. Clear export options.

---

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
