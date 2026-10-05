# Rank Kiwi Website — Phase 1: Foundation, Design System, Information Architecture & Technical Baseline

## 1. Overview & Scope Confirmation
- **Project Scope:** Website-only (`https://rankkiwi.com/`).
- **Untouched Components:** The Chrome extension itself, extraction algorithms for Instagram and YouTube, permissions, manifest, collectors, content scripts, popup, background service worker, and extension build system remain entirely intact and unmodified.
- **Objective:** Establish an authoritative, consistent, technically sound foundation for Rank Kiwi that preserves the established visual identity while preparing the architecture for upcoming documentation, research, comparisons, alternatives, and editorial pages.

---

## 2. Current State Audit
Prior to Phase 1 changes, the website consisted of a high-aesthetic landing page and five subpages:
- **Homepage (`/`):** Contained core hero video, interactive 3-step workflow carousel, 4 feature cards, showcase grids for Instagram & YouTube outliers, Outlier Score bar visualization, custom filters preview, pricing card ($0 Free), privacy overview, FAQ accordion, and final call-to-action.
  - *Identified Issues:* Hero headline ("Get more views") leaned into growth-hacking promise rather than pure creator research tool positioning; Outlier Score lacked explicit creator-relative median baseline clarification; footer lacked resources and direct troubleshooting links; interactive keyboard focus indicators were default browser styling.
- **Documentation (`/docs/`):** Single-page documentation containing getting started, platform guides, sorting, filtering, exporting, and downloads.
  - *Identified Issues:* Lacked breadcrumbs; lacked formal troubleshooting section and corresponding sidebar links; inline styles were used on active nav links; footer lacked synchronized structured categories.
- **Support (`/support/`):** Contact page with founder email and social links.
  - *Identified Issues:* Lacked breadcrumb navigation; footer was inconsistent with the expanded product navigation hierarchy.
- **Legal Pages (`/privacy/`, `/terms/`, `/disclaimer/`):**
  - *Identified Issues:* Lacked breadcrumbs; footer categories needed synchronization.
- **Error Handling:** No dedicated `404.html` page existed.
- **Design Tokens:** Values were scattered across multiple variable names without standardized scale tokens (`--space-1` through `--space-20`, `--text-xs` through `--text-5xl`).

---

## 3. Design System & Token Architecture
All design tokens have been consolidated into `:root` in `styles.css` (and mirrored in `styles.min.css`), preserving the exact visual identity:

### 3.1 Color Palette
| Token | Value | Semantic Role |
| :--- | :--- | :--- |
| `--ink` | `#111827` | Primary text and headings |
| `--ink-secondary` | `#374151` | Subtitles, captions, lead text |
| `--muted` | `#475345` | Secondary information, body descriptions |
| `--line` | `#e3e8e0` | Subtle borders and dividers |
| `--line-strong` | `#cdd6c8` | Prominent card borders and active outlines |
| `--paper` | `#ffffff` | Clean background surface |
| `--wash` | `#f8faf6` | Secondary card and section backgrounds |
| `--kiwi-green` | `#cbf990` | Signature electric kiwi lime |
| `--kiwi-green-hover`| `#baf378` | Interactive hover accent |
| `--kiwi-wash` | `#f2faea` | Subtle lime tint for badges and highlights |
| `--kiwi-border` | `#d2f2b2` | Accent border for badges and cards |
| `--kiwi-dark` | `#01370b` | Forest green for primary buttons and text |
| `--kiwi-dark-hover` | `#084a14` | Deep forest hover state |

### 3.2 Typography Scale
- **Families:**
  - Display & Body: `'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
  - Monospace: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
- **Scale:**
  - `--text-xs`: `11px` (Eyebrows, micro badges, table headers)
  - `--text-sm`: `12.5px` (Captions, metadata, small buttons)
  - `--text-base`: `14.5px` (Standard body text, lead descriptions)
  - `--text-lg`: `16px` (Card titles, subsections)
  - `--text-xl`: `18px` (Prominent card headers, metric amounts)
  - `--text-2xl`: `22px` (Section subtitles, small H2)
  - `--text-3xl`: `28px` (Standard section H2 headings)
  - `--text-4xl`: `36px` (Documentation page H1)
  - `--text-5xl`: `clamp(30px, 3.8vw, 44px)` (Homepage Hero H1)
- **Line Heights:**
  - `--line-tight`: `1.15` (Headings)
  - `--line-normal`: `1.5` (Body copy)
  - `--line-relaxed`: `1.65` (Long-form reading)

### 3.3 Spacing Scale
Consolidated into `--space-1` (`4px`), `--space-2` (`8px`), `--space-3` (`12px`), `--space-4` (`16px`), `--space-5` (`20px`), `--space-6` (`24px`), `--space-8` (`32px`), `--space-10` (`40px`), `--space-12` (`48px`), `--space-16` (`64px`), `--space-20` (`80px`).

### 3.4 Radii & Elevation
- `--radius-sm`: `8px` (Badges, code blocks, small cards)
- `--radius-md`: `12px` (Tables, inner panels)
- `--radius`: `16px` (Feature and article cards)
- `--radius-lg`: `20px` (Product visual stage, final CTA)
- `--radius-xl`: `24px` (Large container wrappers)
- `--radius-full`: `9999px` (Pills, badges)
- `--shadow-sm`: `0 4px 14px rgba(17, 24, 39, 0.04)`
- `--shadow`: `0 16px 36px rgba(17, 24, 39, 0.07)`
- `--shadow-lg`: `0 24px 48px -12px rgba(17, 24, 39, 0.1)`

### 3.5 Breakpoints
- `960px`: Multi-column grids collapse to dual/single column, sticky sidebars convert to static inline headers.
- `720px`: Navigation collapses to accessible hamburger menu, cards expand to full available container width.
- `480px`: Action button stacks become vertical 100% width, Outlier Score rows stack labels vertically to eliminate horizontal overflow.

---

## 4. Reusable Template System
The following reusable component patterns have been implemented in `styles.css` and are ready for Phase 2 page creation:
1. **Header & Navigation:** Sticky header with backdrop blur, real crawlable `<a>` links, brand lockup, and consistent primary CTA (`Add to Chrome`).
2. **Footer Navigation Layer:** Standardized 4-column architecture (`Product`, `Resources`, `Legal & Trust`, `Contact`) with working URLs across all pages.
3. **Breadcrumbs (`.breadcrumbs`):** Semantic `<nav aria-label="Breadcrumb">` with `<ol>` and `<li>` elements, supporting microdata and schema markup.
4. **Cards (`.feature-card`, `.article-card`, `.research-card`, `.comparison-card`):** Consistent hover elevations, subtle borders, card tags, title, description, and metadata footers.
5. **Data & Comparison Tables (`.table-wrap`, `.data-table`):** Responsive scroll wrappers with distinct Kiwi header washes, hover rows, and clear numerical alignments.
6. **Callouts & Alerts (`.callout`, `.callout-tip`, `.callout-warning`):** Visual indicators for notes, tips, and diagnostic caveats.
7. **Code & Syntax Blocks (`.code-block`, `<code>`):** Dark terminal style with copy readability.
8. **Author & Meta Blocks (`.author-block`, `.meta-block`):** Structured author credentials, publication dates, and reading metrics.
9. **Troubleshooting Blocks (`.troubleshoot-block`):** Standardized diagnostic framework (`Problem`, `Symptoms`, `Why It Happens`, `Exact Fix`, `If That Did Not Work`, `When to Contact Support`).
10. **State Boxes (`.state-box`):** Clean empty and error state styling used by `404.html`.

---

## 5. Information Architecture & URL Routing
A centralized route manifest is established at `/src/content/site-map.ts` (and mirrored in `/src/content/site-map.json`):

### 5.1 Active Public Pages
- `/` — Homepage (Positioning: "Stop guessing what works. Study what does.")
- `/docs/` — Comprehensive documentation and diagnostics
- `/support/` — Help, bug reporting, and community links
- `/privacy/` — Client-side privacy policy
- `/terms/` — Terms of service
- `/disclaimer/` — Non-affiliation and platform disclosures
- `/404.html` — Custom 404 page

### 5.2 Planned Future Architecture (Phase 2+)
```
rankkiwi.com/
├── instagram-analytics/
├── youtube-analytics/
├── outlier-score/
├── how-it-works/
├── docs/
│   ├── getting-started/
│   ├── instagram/
│   ├── youtube/
│   ├── sorting-filtering/
│   ├── outlier-score/
│   ├── export-downloads/
│   └── troubleshooting/
├── research/
├── compare/
│   └── rank-kiwi-vs-sort-feed/
├── alternatives/
│   └── sort-feed-alternative/
└── best/
    └── free-instagram-analytics-tools/
```

All future URLs adhere to the canonical rules: lowercase, descriptive, hyphen-separated, trailing-slash normalized, and free of extraneous query strings.

---

## 6. Technical SEO Foundation
- **Canonicals:** Self-referencing canonical `<link rel="canonical" href="...">` present across all public indexable pages.
- **Indexability Directives:** Indexable pages specify `index, follow, max-image-preview:large`. The 404 page specifies `noindex, follow`.
- **Title Tags & Descriptions:**
  - Unique, informative, non-keyword-stuffed titles and meta descriptions across all routes.
- **Social Metadata:** Complete Open Graph (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:site_name`) and Twitter Card (`summary_large_image`) tags on all pages.
- **Sitemap & Robots:**
  - `sitemap.xml`: Validated XML containing all 6 canonical public indexable URLs with accurate `lastmod` dates (`2026-10-05`).
  - `robots.txt`: Verified RFC 9309 compliance, permitting major crawlers and pointing to `https://rankkiwi.com/sitemap.xml`.
- **Structured Data:**
  - `WebApplication` and `Organization` schemas on homepage.
  - `TechArticle` schema on documentation.
  - `ContactPage` schema on support.
  - `BreadcrumbList` schema representing site hierarchy.
  - `FAQPage` schema on homepage.

---

## 7. Accessibility Baseline
- **Keyboard Navigation:** Universal `:focus-visible` ring (`2px solid var(--kiwi-dark)`, offset `2px`) ensures full visibility without affecting mouse clicks.
- **Skip Links:** Dedicated `.skip-link` targets the primary content on every page (`#main`, `#docs-content`, `#support-main`, `#legal-main`, `#main-404`).
- **Semantic HTML:** Appropriate use of `<main>`, `<header>`, `<footer>`, `<aside>`, `<nav>`, `<article>`, and `<section>`.
- **Heading Order:** Single `<h1>` per page, followed by logical `<h2>` and `<h3>` hierarchy.
- **Media Attributes:** All images and SVG icons include descriptive `alt` or `aria-hidden="true"` attributes along with explicit `width` and `height` to prevent layout shifts.
- **Reduced Motion:** Verified `@media (prefers-reduced-motion: reduce)` rules disable transitions and animations for users requesting reduced motion.

---

## 8. Performance Baseline
- **Asset Optimization:** Critical poster image and logo assets preloaded or in WebP format; hero video specifies `preload="metadata"` and fallback poster.
- **CSS Delivery:** Source `styles.css` minified to `styles.min.css` (~30KB), loading in a single non-blocking stylesheet request.
- **Font Optimization:** Preconnected to `fonts.googleapis.com` and `fonts.gstatic.com` with `font-display: swap` to minimize render blocking.
- **Cumulative Layout Shift (CLS):** Dimensions reserved for all images, video frames, and card media.
- **Core Web Vitals Expectations:** LCP < 2.0s, CLS < 0.05, INP < 150ms.

---

## 9. Outstanding Issues (Deferred to Later Phases)
1. **Deep Content Pages:** Creation of dedicated standalone sub-routes (`/docs/instagram/`, `/docs/youtube/`, `/research/`) will take place in Phase 2.
2. **First-Party Research Datasets:** No simulated or fabricated research numbers have been introduced. Original empirical datasets from real creator analyses will be developed in the dedicated research phase.
3. **Comparison Pages:** Competitor teardowns and head-to-head evaluation matrices will be developed when competitor parity data is compiled.
4. **Dynamic Search in Docs:** Client-side search index across documentation articles will be added once documentation content expands into multi-page architecture.
