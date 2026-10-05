# Rank Kiwi — Product-Led Search Intent Architecture Map

This document establishes the strategic intent mapping, audience segmentation, and query differentiation across the four initial product-led SEO pages. Each page addresses a mutually exclusive user problem to ensure zero keyword cannibalization and maximum search-to-product conversion.

---

## Page 1: Instagram Creator Analytics & Research (`/instagram-analytics/`)

- **Primary Search Intent:** Transactional / Informational ("how to analyze Instagram creator content", "Instagram Reels analytics tool", "find top performing Instagram Reels")
- **Secondary Search Intents:** "Instagram competitor research", "analyze Instagram profile views", "Instagram video outlier detector"
- **Audience:** Short-form video creators, Instagram growth consultants, social media managers, creative agency strategists.
- **User's Core Problem:** Endless manual scrolling on competitor profiles to identify which Reels took off, inability to benchmark against normal creator reach, and hidden post metrics on native Instagram feeds.
- **User's Desired Outcome:** A quick, in-browser method to scan a creator's Reels catalog, rank posts by true reach multiplier, inspect hook captions, and export high-performing concepts into a swipe file.
- **Product Capability Satisfying Intent:** Client-side DOM scanner on Instagram `/reels/` and profile surfaces, median baseline calculation, view-to-median Outlier Score pill badges, date/view filters, MP4 Reel downloader, and CSV export.
- **Related Documentation:**
  - [`/docs/instagram/`](https://rankkiwi.com/docs/instagram/) (Instagram Research Manual)
  - [`/docs/understanding/outlier-score/`](https://rankkiwi.com/docs/understanding/outlier-score/) (Scoring formula)
  - [`/docs/troubleshooting/#instagram-problems`](https://rankkiwi.com/docs/troubleshooting/#instagram-problems) (Diagnostics)
- **Related Future Research:** "2026 Instagram Reels Benchmark: Median Engagement Rates Across 1,000 Niche Creators"
- **Primary CTA:** "Add to Chrome — Free" (direct Chrome Web Store installation)
- **Secondary CTA:** "Explore Instagram Documentation"

---

## Page 2: YouTube Creator Analytics & Research (`/youtube-analytics/`)

- **Primary Search Intent:** Transactional / Informational ("YouTube creator analytics extension", "find viral YouTube Shorts", "analyze YouTube channel video performance")
- **Secondary Search Intents:** "YouTube outlier video finder", "YouTube competitor video research", "how to see a YouTuber's most successful videos relative to channel size"
- **Audience:** Long-form YouTubers, Shorts creators, video editors, YouTube channel managers, agency thumbnail designers.
- **User's Core Problem:** Sorting by raw "Most Popular" on YouTube surfaces videos from 6 years ago that are no longer algorithmically relevant. Searching channels chronologically obscures which recent uploads broke through channel baselines.
- **User's Desired Outcome:** Isolate high-performing recent uploads and viral Shorts, compare views against channel median baselines, inspect title framing, and download maximum-resolution (1080p) thumbnail assets.
- **Product Capability Satisfying Intent:** YouTube channel observer for `/videos` and `/shorts` route trees, non-skewed median calculations, duration/date filtering, HD thumbnail image extraction (`maxresdefault.jpg`), and CSV/JSON exports.
- **Related Documentation:**
  - [`/docs/youtube/`](https://rankkiwi.com/docs/youtube/) (YouTube Research Manual)
  - [`/docs/understanding/outlier-score/`](https://rankkiwi.com/docs/understanding/outlier-score/) (Scoring formula)
  - [`/docs/exports/#thumbnails-download`](https://rankkiwi.com/docs/exports/#thumbnails-download) (Thumbnail downloads)
- **Related Future Research:** "The 5 Hook Archetypes Driving 10× Breakout Outliers on YouTube Shorts"
- **Primary CTA:** "Add to Chrome — Free" (direct Chrome Web Store installation)
- **Secondary CTA:** "Read YouTube Research Guide"

---

## Page 3: Understanding Outlier Score (`/outlier-score/`)

- **Primary Search Intent:** Conceptual / Educational ("what is an outlier score", "creator relative engagement rate", "why median is better than average in social analytics")
- **Secondary Search Intents:** "calculate viral outlier", "social media performance ratio", "benchmark content against creator baseline"
- **Audience:** Data-driven content creators, growth marketers, marketing science students, editorial directors.
- **User's Core Problem:** Evaluating posts using raw view counts creates severe false positives. A video with 200,000 views on MrBeast's channel is an underperformance, whereas the same 200,000 views on a 5,000-subscriber channel is an explosive 40× breakout. Average views are heavily distorted by extreme outliers.
- **User's Desired Outcome:** A statistically sound, clear framework to measure content performance relative to the individual creator's typical output, isolating true creative anomalies from baseline audience inertia.
- **Product Capability Satisfying Intent:** Non-parametric median baseline calculation (`Post Metric ÷ Creator Median Metric`), 1.0× to 20× tier categorization, and sample size dependency controls (25, 50, 100 sample presets).
- **Related Documentation:**
  - [`/docs/understanding/outlier-score/`](https://rankkiwi.com/docs/understanding/outlier-score/) (Complete technical documentation)
  - [`/docs/understanding/sorting-filtering/`](https://rankkiwi.com/docs/understanding/sorting-filtering/) (Sorting dimensions)
  - [`/docs/workflows/content-research/`](https://rankkiwi.com/docs/workflows/content-research/) (Applying scores to editorial strategy)
- **Related Future Research:** "Mathematical Proof: Why Arithmetic Mean Fails Creator Content Benchmarks"
- **Primary CTA:** "Add to Chrome — Free" (test Outlier Score live)
- **Secondary CTA:** "View Content Research Workflow"

---

## Page 4: Creator Content Research (`/creator-content-research/`)

- **Primary Search Intent:** Strategic / Workflow ("creator content research framework", "how to study competitor social content", "reverse engineer viral videos", "content research swipe file workflow")
- **Secondary Search Intents:** "social media competitor analysis workflow", "how to find content ideas that work", "analyze niche creators across Instagram and YouTube"
- **Audience:** Content strategists, creative directors, solo entrepreneurs, editorial teams seeking a repeatable research methodology.
- **User's Core Problem:** Creators either blindly copy whatever is on their algorithmic feed (which is tailored to their personal entertainment, not editorial intelligence) or spend hours manually recording spreadsheets without a systematic framework.
- **User's Desired Outcome:** A structured, repeatable 8-step workflow to discover creator libraries, establish historical baselines, isolate viral outliers, deconstruct pacing and hooks, and ethical apply insights to their own editorial calendar.
- **Product Capability Satisfying Intent:** Cross-platform research workspace unifying Instagram Reels and YouTube videos/Shorts, one-click clipboard and CSV export into Notion/Sheets, and safe media archiving.
- **Related Documentation:**
  - [`/docs/workflows/content-research/`](https://rankkiwi.com/docs/workflows/content-research/) (Operational Blueprint)
  - [`/docs/exports/`](https://rankkiwi.com/docs/exports/) (Exporting into Notion & Excel)
  - [`/docs/getting-started/your-first-analysis/`](https://rankkiwi.com/docs/getting-started/your-first-analysis/) (Walkthrough)
- **Related Future Research:** "The Ethical Swipe File: How Leading Creators Adapt Outlier Frameworks Without Plagiarism"
- **Primary CTA:** "Add to Chrome — Free" (launch the research workspace)
- **Secondary CTA:** "Read Complete Research Blueprint"
