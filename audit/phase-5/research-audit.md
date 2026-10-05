# Rank Kiwi Research System — Phase 5 Audit & Compliance Report

**Audit Date:** October 5, 2026  
**Auditor / Author:** Bhavishya Singla  
**System Status:** Production Ready (100% Passing SEO & Metadata Validation)  
**Corpus / Project:** [Rank Kiwi Website](https://rankkiwi.com/)

---

## 1. Executive Summary & Objective

Phase 5 establishes the **Rank Kiwi Research Hub & Data Analysis Center** (`/research/`). The primary objective is to build a first-party editorial research asset providing original quantitative analysis of creator content performance, format dynamics, and distribution outliers—rather than generating a generic content-marketing blog.

This audit validates:
1. **Critical Honesty Compliance:** Strict demarcation between third-party source datasets (Buffer, Socialinsider, vidIQ), Rank Kiwi derived analysis/calculations, and true first-party telemetry.
2. **Mathematical Precision:** Programmatic verification of all derived ratios (`10.82×`, `6.48×`, `4.11×`, `2.45×`, `2.08×`, `1.39×`, `1 in 769`), retaining two decimal places and displaying underlying equations.
3. **Epistemological Rigor:** Complete adherence to "No Causation Without Evidence" and "No Algorithmic Folklore" rules, cross-referencing official platform recommendation architecture.
4. **Information Architecture & Discovery:** Seamless integration into navigation, homepage flywheel preview, XML sitemap, machine-readable manifests (`site-map.json`, `site-map.ts`), and LLM discovery specifications (`llms.txt`, `llms-full.txt`).
5. **Accessibility & Crawlability:** All data tables implemented as crawlable HTML text, all charts rendered as native SVG/CSS with text alternatives.

---

## 2. Published Research Catalog

The Phase 5 research library consists of seven core pages:

| URL Path | Type / Domain | Primary Dataset Source | Sample Size | Headline Finding / Multiplier |
| :--- | :--- | :--- | :--- | :--- |
| `/research/` | Research Hub | Aggregated | 75M+ combined | Central search, filter, and flywheel index |
| `/research/methodology/` | Standards & Transparency | Framework | N/A | Definition of badges, rounding, and honesty rules |
| `/research/instagram-reels-vs-carousels/` | Instagram Formats | Buffer | 4,000,000+ posts | Reels +36% reach vs Carousels +12% engagement |
| `/research/instagram-views-by-account-size/` | Instagram Scaling | Socialinsider | 5 Follower Tiers | Carousels 2.08× views over images at 1K–5K |
| `/research/one-video-is-not-a-channel/` | YouTube Distribution | vidIQ | 448,413 channels | Best of first 10 is **10.82×** median of first video |
| `/research/youtube-upload-frequency/` | YouTube Cadence | vidIQ | 10,210,278 channels | 12+/mo uploads correlate with **4.11×** view growth |
| `/research/youtube-channel-size/` | YouTube Census | vidIQ | 61,186,246 channels | Only 0.13% reach 1M subs (**Roughly 1 in 770**) |

---

## 3. Centralized Research Datasets (`content/research/data/`)

To prevent statistic drift across headlines, paragraphs, charts, and metadata, all numerical values are anchored in centralized JSON datasets:

### 3.1 `content/research/data/instagram-format.json`
- **Publisher:** Buffer (Oct 2024 study, Jan 2022–Oct 2024 window, 4M+ posts).
- **Source Values:**
  - Reels Reach vs Carousels: `+36%`
  - Reels Reach vs Single Images: `+125%`
  - Carousels Engagement vs Reels: `+12%`
  - Carousels Engagement vs Single Images: `+114%`
- **Rank Kiwi Derived Multipliers:**
  - Reels Reach Multiplier vs Images: `1 + (125 ÷ 100) = 2.25×`
  - Carousels Engagement Multiplier vs Images: `1 + (114 ÷ 100) = 2.14×`

### 3.2 `content/research/data/instagram-views.json`
- **Publisher:** Socialinsider (2024 benchmark across 5 follower tiers).
- **Exact Source Values (Average Views):**
  - `1K–5K`: Carousel 527, Reels 470, Image 253
  - `5K–10K`: Carousel 1,050, Reels 750, Image 660
  - `10K–50K`: Carousel 2,470, Reels 2,340, Image 1,470
  - `50K–100K`: Carousel 7,950, Reels 5,840, Image 4,855
  - `100K–1M`: Carousel 23,760, Reels 16,325, Image 17,150
- **Rank Kiwi Derived Multipliers:**
  - `1K–5K` Carousel vs Image: `527 ÷ 253 = 2.083004...` &rarr; `2.08×`
  - `100K–1M` Carousel vs Image: `23,760 ÷ 17,150 = 1.385423...` &rarr; `1.39×`
  - `100K–1M` vs `1K–5K` Reels: `16,325 ÷ 470 = 34.73404...` &rarr; `34.73×`

### 3.3 `content/research/data/youtube-first-10.json`
- **Publisher:** vidIQ (448,413 channels created early 2025 with &ge;10 uploads in first 90 days).
- **Exact Source Values (30-day Median Views):**
  - Long-form Video: First `180`, Tenth `272`, Best of First 10 `1,948`
  - Shorts: First `1,362`, Tenth `1,344`, Best of First 10 `8,832`
- **Rank Kiwi Derived Multipliers:**
  - Long-form Best vs First: `1,948 ÷ 180 = 10.8222...` &rarr; `10.82×`
  - Long-form Tenth vs First: `272 ÷ 180 = 1.5111...` &rarr; `1.51×`
  - Shorts Best vs First: `8,832 ÷ 1,362 = 6.4845...` &rarr; `6.48×`
  - Shorts Tenth vs First: `1,344 ÷ 1,362 = 0.9867...` &rarr; `0.99×`

### 3.4 `content/research/data/youtube-frequency.json`
- **Publisher:** vidIQ (10,210,278 channels with &ge;1K subscribers, April 2025–March 2026).
- **Exact Source Values (Median Monthly Growth):**
  - `<1/mo`: View Growth `0.53%`, Sub Growth `0.00%`
  - `1–3/mo`: View Growth `0.89%`, Sub Growth `0.10%`
  - `4–7/mo`: View Growth `1.32%`, Sub Growth `0.39%`
  - `8–11/mo`: View Growth `1.70%`, Sub Growth `0.63%`
  - `12+/mo`: View Growth `2.18%`, Sub Growth `0.91%`
- **Rank Kiwi Derived Multipliers:**
  - `12+/mo` vs `<1/mo`: `2.18 ÷ 0.53 = 4.1132...` &rarr; `4.11×`
  - `12+/mo` vs `1–3/mo`: `2.18 ÷ 0.89 = 2.4494...` &rarr; `2.45×`

### 3.5 `content/research/data/youtube-subscriber-distribution.json`
- **Publisher:** vidIQ (61,186,246 public channels with &ge;1 subscriber, July 20, 2026 snapshot).
- **Exact Source Values:**
  - `&ge; 100`: 41,748,268 (68.20%) &rarr; 31.80% ahead
  - `&ge; 500`: 29,649,907 (48.50%) &rarr; 51.50% ahead
  - `&ge; 1,000`: 24,813,187 (40.60%) &rarr; 59.40% ahead
  - `&ge; 10,000`: 4,836,743 (7.90%) &rarr; 92.10% ahead
  - `&ge; 100,000`: 792,376 (1.30%) &rarr; 98.70% ahead
  - `&ge; 1,000,000`: 79,570 (0.13%) &rarr; 99.87% ahead
  - `&ge; 10,000,000`: 3,082 (0.005%)
  - `&ge; 100,000,000`: 17 (0.000028%)
- **Rank Kiwi Derived Multipliers:**
  - 1M Milestone Ratio: `100 ÷ 0.13 = 769.23` &rarr; "Roughly 1 in 770 channels in this analyzed sample had at least 1 million subscribers."

---

## 4. UI Components & Visual Standards Compliance

All research pages implement the standardized Phase 5 component design system:
1. **Source vs Analysis Badges:**
   - `.badge-source`: Subtle neutral badge identifying raw publisher data.
   - `.badge-analysis`: Lime/forest badge identifying derived Rank Kiwi ratios.
   - `.badge-firstparty`: Reserved strictly for genuine internal Rank Kiwi telemetry.
2. **Key Finding Box (`.key-finding-box`):**
   Prominent summary at the top of each article highlighting the core empirical finding and clarifying derived calculations.
3. **Calculation Box (`.calc-box`):**
   Three-column responsive grid displaying source inputs, operation arrow, and derived result, accompanied by an explicit attribution caption.
4. **Crawlable Data Tables (`.research-table-wrap`, `.research-table`):**
   Semantic HTML tables with `<caption>`, `<thead>`, `<th>` with scopes, and monospace right-aligned numerical cells.
5. **Native SVG/CSS Visualizations (`.research-chart-container`):**
   Responsive charts built with clean CSS bar widths matching exact numerical data, eliminating external chart dependencies and rendering cleanly across mobile viewports.
6. **The Research-Product Flywheel (`.flywheel-flow`):**
   Visual walkthrough demonstrating how macro benchmarks lead to creator analysis and outlier discovery.

---

## 5. Automated Quality Assurance & Technical SEO

Execution of the automated validator suite (`python3 scripts/seo-validator.py`) verified:

```text
==================================================
  RESULTS: 189 PASSED | 0 WARNINGS | 0 FAILED
==================================================

✅ ALL TECHNICAL SEO CRITERIA PASSED SUCCESSFULLY.
```

- **Metadata Verification:** Unique `<title>`, `<meta name="description">`, and matching canonical tags with trailing slashes across all 7 research pages.
- **Headings & Semantics:** Exactly one `<h1>` per page with hierarchical `<h2>` and `<h3>` tags.
- **Open Graph & Twitter Cards:** Full Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`) and Twitter Cards.
- **Schema.org:** Valid JSON-LD structured data on all pages (`CollectionPage` on hub, `TechArticle` on studies and methodology, and `BreadcrumbList` on all).
- **XML Sitemap:** All 26 canonical site URLs registered with correct `lastmod` timestamps.

---

## 6. Sourced Citations & Attribution Directory

1. **Buffer Research:**
   *Title:* "Data Shows Instagram Reels are Best For Reach — But Not Engagement"  
   *Author/Publisher:* Buffer Inc.  
   *Date:* October 2024  
   *URL:* [https://buffer.com/resources/instagram-reels-vs-carousels/](https://buffer.com/resources/instagram-reels-vs-carousels/)

2. **Socialinsider Research:**
   *Title:* "Instagram Views Per Content Format Benchmark" & "Instagram Reels Analytics Guide"  
   *Publisher:* Socialinsider  
   *Date:* 2023–2024  
   *URL:* [https://www.socialinsider.io/blog/instagram-reels-analytics/](https://www.socialinsider.io/blog/instagram-reels-analytics/)

3. **vidIQ First 10 Videos Study:**
   *Title:* "What Happens When You Post Your First 10 Videos on YouTube"  
   *Publisher:* vidIQ  
   *Date:* Early 2025  
   *URL:* [https://vidiq.com/blog/post/first-10-videos-youtube/](https://vidiq.com/blog/post/first-10-videos-youtube/)

4. **vidIQ Upload Frequency Study:**
   *Title:* "How Often Should You Upload to YouTube (Data Study)"  
   *Publisher:* vidIQ  
   *Date:* July 2026 (Observation period: Apr 2025 – Mar 2026)  
   *URL:* [https://vidiq.com/blog/post/how-often-should-you-upload-to-youtube/](https://vidiq.com/blog/post/how-often-should-you-upload-to-youtube/)

5. **vidIQ Global Channel Census:**
   *Title:* "How Many YouTube Channels Exist by Subscriber Milestone"  
   *Publisher:* vidIQ  
   *Date:* July 20, 2026  
   *URL:* [https://vidiq.com/blog/post/how-many-youtube-channels-exist/](https://vidiq.com/blog/post/how-many-youtube-channels-exist/)

6. **YouTube Official Engineering Documentation:**
   *Title:* "How YouTube Recommendations Work" & "Understand your content performance"  
   *Publisher:* Google / YouTube Help Center  
   *URL:* [https://support.google.com/youtube/answer/11186055](https://support.google.com/youtube/answer/11186055)

---

## 7. Sign-off & Next Phase Readiness

Phase 5 has met all editorial, mathematical, and technical criteria without exceptions. 
Per Rule 126, subsequent phases (Competitor Comparisons & Alternatives) remain staged for future execution.
