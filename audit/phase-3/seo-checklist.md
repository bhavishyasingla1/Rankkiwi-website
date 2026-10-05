# Rank Kiwi — Engineering Technical SEO Checklist

Use this checklist whenever publishing a new page, revising an existing document, or refactoring site architecture.

---

## 1. Crawlability Checklist
- [ ] **robots.txt:** Verified page path is not blocked by any `Disallow` rule.
- [ ] **Resource Rendering:** Verified CSS, JavaScript, and images required to render the page are not blocked in `robots.txt`.
- [ ] **XML Sitemap:** Page URL is listed in `/sitemap.xml` with canonical HTTPS, trailing slash, and accurate `<lastmod>`.
- [ ] **Crawlable Links:** Internal links pointing to this page use real `<a href="/path/">` tags (not JavaScript click handlers).
- [ ] **Direct Status Code:** Requesting the URL returns a clean `200 OK` (not a 301/302 redirect or soft 404).

---

## 2. Indexability Checklist
- [ ] **Canonical URL:** Page contains `<link rel="canonical" href="https://rankkiwi.com/path/">` pointing to itself.
- [ ] **Trailing Slash:** Canonical URL and internal links strictly use a trailing slash for directories.
- [ ] **Robots Directive:** Page contains `<meta name="robots" content="index, follow, ...">` (or `noindex, follow` only if intentionally excluded utility/error page).
- [ ] **No Duplicate Paths:** Verified no alternate URL exists without a 301 redirect or identical canonical tag.
- [ ] **Clean URL Parameters:** Verified query strings (UTMs, filters) are ignored by canonical and do not create new indexable URLs.

---

## 3. Metadata & Social Previews
- [ ] **Unique Title:** Descriptive, engaging `<title>` tag under 60 characters without keyword stuffing.
- [ ] **Unique Meta Description:** Compelling `<meta name="description">` (120–160 characters) accurately summarizing page value.
- [ ] **Open Graph:** Includes `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`.
- [ ] **Twitter Card:** Includes `twitter:card="summary_large_image"`, `twitter:title`, `twitter:description`, `twitter:image`.
- [ ] **Favicon & App Icons:** Verified `/assets/favicon.svg` and `/assets/rankkiwi-icon.png` render in `<head>`.

---

## 4. Semantic Hierarchy & HTML Structure
- [ ] **Single H1:** Exactly one `<h1>` element on the page describing the primary topic.
- [ ] **Logical Heading Flow:** Subheadings use `<h2>`, followed by `<h3>` without skipping levels for visual styling.
- [ ] **Semantic Elements:** Layout structured using `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`.
- [ ] **Breadcrumbs:** Visible breadcrumb navigation with real links reflecting site depth (`Home > Docs > Topic`).
- [ ] **Descriptive Anchor Text:** Internal links explain destination context (no "click here" or "read more").

---

## 5. Structured Data (JSON-LD)
- [ ] **Syntax Validation:** JSON-LD script parses cleanly without syntax errors or missing commas.
- [ ] **Accurate Entities:** Uses appropriate Schema types (`SoftwareApplication`, `TechArticle`, `BreadcrumbList`, `Organization`).
- [ ] **No Fabricated Data:** Zero fake ratings, reviews, prices, awards, or fake testimonials.
- [ ] **BreadcrumbList Schema:** Matches visible breadcrumb items and URLs 1-to-1.

---

## 6. Performance & Core Web Vitals
- [ ] **Explicit Dimensions:** All `<img>` tags specify `width` and `height` or CSS `aspect-ratio` to prevent CLS.
- [ ] **Lazy Loading:** Below-the-fold media uses `loading="lazy"`; above-the-fold hero image does not.
- [ ] **WebP Formats:** Images compressed to modern `.webp` format at high visual quality and minimal file size.
- [ ] **Font Loading:** Google Fonts use `preconnect` and `font-display: swap` to prevent render-blocking FOIT.
- [ ] **Minified Assets:** Production builds link to `/styles.min.css`.

---

## 7. Accessibility Baseline
- [ ] **Keyboard Navigable:** All buttons, links, search bars, and modals can be reached and activated via <kbd>Tab</kbd> and <kbd>Enter</kbd>.
- [ ] **Visible Focus Rings:** Distinct outline indicator present on active interactive elements.
- [ ] **Alt Attributes:** All informational images have descriptive `alt` text; decorative images use `alt=""`.
- [ ] **Color Contrast:** Text meets WCAG AA standards against paper backgrounds and dark headers.
- [ ] **Responsive Down to 320px:** No horizontal viewport scrolling or broken tables on mobile viewports.

---

## 8. Automated Pre-Flight Check
Run terminal test before git commit:
```bash
python3 scripts/seo-validator.py
```
Expected output: **0 FAILURES**.
