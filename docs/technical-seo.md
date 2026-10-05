# Rank Kiwi Technical SEO Developer Guide

This document defines the architectural standards, metadata contracts, and automated validation procedures governing all public pages on [https://rankkiwi.com/](https://rankkiwi.com/).

---

## 1. Core Principles
1. **People-First Content:** Pages are built to solve genuine user research tasks. No thin doorway pages, no keyword-stuffed copy, and no automated content farms.
2. **Deterministic Static Pre-rendering:** 100% of indexable content (headings, body text, tables, images, metadata) must exist in the static HTML response before JavaScript execution.
3. **Single Canonical Authority:** Every indexable URL belongs to `https://rankkiwi.com/` with a strictly enforced trailing slash on directory routes.
4. **Zero Broken Links / Zero Soft 404s:** All navigation links point directly to final canonical endpoints without redirect hops. Non-existent pages return an authentic HTTP 404 status.

---

## 2. Metadata Contract

Every public HTML document must declare the following metadata block within the `<head>` element:

```html
<!-- Character Encoding & Responsive Viewport -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Primary SEO Metadata -->
<title>[Descriptive Topic] — Rank Kiwi Documentation</title>
<meta name="description" content="[Unique 120-160 character description describing page utility without hype.]">
<link rel="canonical" href="https://rankkiwi.com/[route]/">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

<!-- Open Graph (Facebook / LinkedIn) -->
<meta property="og:type" content="article"> <!-- or "website" on root -->
<meta property="og:url" content="https://rankkiwi.com/[route]/">
<meta property="og:title" content="[Descriptive Topic] — Rank Kiwi Documentation">
<meta property="og:description" content="[Match or refine description.]">
<meta property="og:image" content="https://rankkiwi.com/assets/og-image.png">
<meta property="og:site_name" content="Rank Kiwi">
<meta property="og:locale" content="en_US">

<!-- Twitter / X Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Descriptive Topic] — Rank Kiwi Documentation">
<meta name="twitter:description" content="[Match description.]">
<meta name="twitter:image" content="https://rankkiwi.com/assets/og-image.png">
```

---

## 3. Structured Data (JSON-LD) Specification

Rank Kiwi uses JSON-LD blocks to provide search engine crawlers with an unambiguous entity graph. Never fabricate reviews, ratings, prices, or author credentials.

### A. Homepage (`/index.html`)
- `@type: ["SoftwareApplication", "WebApplication"]`
- `WebSite`
- `Organization` (Publisher & founder entity)

### B. Documentation Articles (`/docs/*`)
Every documentation page embeds a combined array containing `TechArticle` and `BreadcrumbList`:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Page Headline",
    "description": "Page Description",
    "url": "https://rankkiwi.com/docs/[slug]/",
    "inLanguage": "en-US",
    "publisher": {
      "@type": "Organization",
      "name": "Rank Kiwi",
      "url": "https://rankkiwi.com/"
    },
    "datePublished": "2026-03-15",
    "dateModified": "2026-10-05"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://rankkiwi.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Docs",
        "item": "https://rankkiwi.com/docs/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Current Page",
        "item": "https://rankkiwi.com/docs/[slug]/"
      }
    ]
  }
]
```

---

## 4. URL Architecture & Normalization

1. **Lowercase Only:** URLs must never contain uppercase characters (`/docs/instagram/`, never `/docs/Instagram/`).
2. **Hyphen Separators:** Use hyphens, never underscores or camelCase (`your-first-analysis`, not `your_first_analysis`).
3. **Trailing Slashes:** Every directory-based page route must terminate in a trailing slash (`/docs/exports/`).
4. **Edge Normalization:**
   - Handled via `_redirects` and Cloudflare Pages rules.
   - Non-trailing slash requests automatically 301 redirect to the slashed canonical version.

---

## 5. Security & Caching Headers (`_headers`)

All edge response headers are declared in `/_headers`:
- **HSTS:** `max-age=31536000; includeSubDomains; preload`
- **X-Content-Type-Options:** `nosniff`
- **X-Frame-Options:** `DENY`
- **Referrer-Policy:** `strict-origin-when-cross-origin`
- **HTML Caching:** `public, max-age=0, must-revalidate` (instant updates on redeploy).
- **Static Asset Caching (`/assets/*`, `.webp`, `.mp4`):** `public, max-age=31536000, immutable`.

---

## 6. Sitemaps & Robots Specification

1. **`robots.txt`:**
   - Located at root `/robots.txt`.
   - Allows all major search bots (`Googlebot`, `Bingbot`, `Applebot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`).
   - Declares `Sitemap: https://rankkiwi.com/sitemap.xml`.
   - Never blocks CSS, JS, or image rendering assets.
2. **`sitemap.xml`:**
   - Must only include canonical, 200 OK, indexable URLs.
   - Never include 404 pages, redirects, or noindex legal/utility pages.
   - Requires accurate `<lastmod>YYYY-MM-DD</lastmod>` dates.

---

## 7. Automated SEO Validation Workflow

Before merging or deploying any new page or content update, run the automated test suite:

```bash
python3 scripts/seo-validator.py
```

The validator verifies:
- Uniqueness and length of `<title>` and `<meta name="description">`
- Self-referencing canonical URLs matching production HTTPS and trailing slash policies
- Heading hierarchy (exactly one `<h1>` per page)
- Open Graph and Twitter Card tags
- Local asset resolution for all `<img>` tags
- Local link resolution for all internal `<a>` tags
- Full XML parsing and route verification of `sitemap.xml`
- Robots.txt crawlability compliance
