# Rank Kiwi — Phase 3 Technical SEO Audit

**Date of Audit:** October 5, 2026  
**Auditor:** Antigravity AI  
**Target Domain:** [https://rankkiwi.com/](https://rankkiwi.com/)  
**Infrastructure Target:** Cloudflare Pages (Static Edge Hosting)

---

## 1. Overview & Rendering Strategy
- **Framework & Rendering:** Zero-framework, native HTML5 / CSS3 / ES2022 JavaScript architecture.
- **Rendering Strategy:** 100% Static Site Generation (SSG) / Pre-rendered HTML. No client-side JavaScript is required for initial document parsing, heading reading, or content indexing by search engine crawlers.
- **Routing System:** Clean directory-based static routes with trailing slashes (`/<route>/index.html` mapping to `https://rankkiwi.com/<route>/`).
- **CDN / Hosting:** Cloudflare Pages with edge SSL termination, HTTP/2, HTTP/3 (QUIC), and Brotli/Gzip compression.

---

## 2. URL Architecture & Canonicalization Audit

| Route Path | Indexable Status | Canonical URL | Observed Header Status | Findings / Notes |
|---|---|---|---|---|
| `/` | `index, follow` | `https://rankkiwi.com/` | `200 OK` (HTTP/2) | Authoritative root canonical. |
| `/docs/` | `index, follow` | `https://rankkiwi.com/docs/` | `200 OK` (HTTP/2) | Central docs hub with client search. |
| `/docs/getting-started/` | `index, follow` | `https://rankkiwi.com/docs/getting-started/` | `200 OK` (Local SSG) | Onboarding & UI tour. |
| `/docs/getting-started/your-first-analysis/` | `index, follow` | `https://rankkiwi.com/docs/getting-started/your-first-analysis/` | `200 OK` (Local SSG) | 9-step beginner analysis guide. |
| `/docs/instagram/` | `index, follow` | `https://rankkiwi.com/docs/instagram/` | `200 OK` (Local SSG) | Instagram platform research manual. |
| `/docs/youtube/` | `index, follow` | `https://rankkiwi.com/docs/youtube/` | `200 OK` (Local SSG) | YouTube video & Shorts research manual. |
| `/docs/understanding/outlier-score/` | `index, follow` | `https://rankkiwi.com/docs/understanding/outlier-score/` | `200 OK` (Local SSG) | Mathematical formula & median baselines. |
| `/docs/understanding/sorting-filtering/` | `index, follow` | `https://rankkiwi.com/docs/understanding/sorting-filtering/` | `200 OK` (Local SSG) | Sort dimensions & filter attributes. |
| `/docs/workflows/content-research/` | `index, follow` | `https://rankkiwi.com/docs/workflows/content-research/` | `200 OK` (Local SSG) | 6-step reverse-engineering blueprint. |
| `/docs/exports/` | `index, follow` | `https://rankkiwi.com/docs/exports/` | `200 OK` (Local SSG) | CSV, JSON, clipboard & media downloads. |
| `/docs/troubleshooting/` | `index, follow` | `https://rankkiwi.com/docs/troubleshooting/` | `200 OK` (Local SSG) | 12 standardized symptom guides & decision tree. |
| `/support/` | `index, follow` | `https://rankkiwi.com/support/` | `200 OK` (Local SSG) | Support & direct founder contact. |
| `/privacy/` | `index, follow` | `https://rankkiwi.com/privacy/` | `200 OK` (Local SSG) | Sandboxed browser client-side privacy policy. |
| `/terms/` | `index, follow` | `https://rankkiwi.com/terms/` | `200 OK` (Local SSG) | Terms of service. |
| `/disclaimer/` | `index, follow` | `https://rankkiwi.com/disclaimer/` | `200 OK` (Local SSG) | Non-affiliation trademark disclosures. |
| `/404.html` | `noindex, follow` | `NONE` (Explicitly omitted) | `404 Not Found` (Edge) | Branded error page, no self-canonical. |

---

## 3. Detailed Audit Findings

### A. Observed (Directly Confirmed)
1. **Canonical Scheme & Host:** `http://rankkiwi.com/` issues a `301 Moved Permanently` redirect to `https://rankkiwi.com/` directly without intermediate hops.
2. **Trailing Slash Convention:** Clean trailing slash policy (`/docs/`, `/support/`) matches Cloudflare Pages directory indexing architecture.
3. **Semantic Hierarchy:** All 16 HTML pages have exactly one `<h1>` tag properly aligned with the primary document topic.
4. **No Keyword Stuffing or Cloaking:** Content is 100% human-readable, task-oriented documentation with zero hidden text (`display: none` text blocks), zero off-screen keywords, and zero doorway pages.
5. **No Broken Links:** Python link validation confirmed zero broken internal links across the entire repository.
6. **Preconnect & Preload:** Critical above-the-fold assets (`/hero-poster.webp` and Google Fonts) are preconnected/preloaded appropriately.
7. **Client-Side Search Indexability:** The documentation search engine executes locally via client-side DOM queries without producing crawlable thin-search duplicate query parameter URLs (e.g. `?q=instagram`).

### B. Fixed (Addressed in Phase 3)
1. **Twitter Card Metadata:** Added missing `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` tags to `/docs/exports/` and `/docs/troubleshooting/`.
2. **BreadcrumbList Structured Data:** Injected JSON-LD `BreadcrumbList` schema across all nested documentation pages linking their true hierarchical parent/child trees for Google Search rich snippets.
3. **SoftwareApplication Schema:** Enriched homepage JSON-LD with `@type: ["SoftwareApplication", "WebApplication"]` and explicit operating system / browser requirements to ensure eligibility for Google's Software App rich result specification.
4. **Cloudflare Security Headers (`_headers`):** Created root `_headers` configuring `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
5. **Static Asset Caching Rules (`_headers`):** Declared 1-year immutable caching for static hashes in `/assets/*` and `.webp` images, while keeping HTML pages at `max-age=0, must-revalidate` to prevent stale documentation delivery.
6. **Cloudflare Redirect Rules (`_redirects`):** Created root `_redirects` file defining explicit 301 rules for non-trailing slash normalization and legacy aliases.
7. **Automated SEO Validator (`scripts/seo-validator.py`):** Built standalone Python test runner checking titles, descriptions, canonicals, H1 uniqueness, Open Graph, Twitter cards, sitemap synchronization, and structured data validity.
8. **Documentation & Architecture Guide (`/docs/technical-seo.md`):** Authored exhaustive technical guide for future content phases.

### C. Remaining (Requiring External / DNS Configuration)
1. **`www.` Subdomain DNS Record:** `curl -sI https://www.rankkiwi.com/` currently fails to resolve (`curl: (6) Could not resolve host`). The domain registrar / Cloudflare DNS needs a CNAME record pointing `www` to `rankkiwi.com` with a Cloudflare Page Rule / Redirect Rule to enforce 301 redirection to apex.
2. **Google Search Console Verification:** Verification DNS TXT record or HTML meta tag should be added once the owner connects the domain in GSC.

### D. Deferred (Intentionally Scheduled for Future Phases)
1. **Product-Led High-Intent Landing Pages:** `/instagram-analytics/`, `/youtube-analytics/`, and `/outlier-score/` deferred to Phase 4.
2. **Original Research Article Hub:** `/research/` and benchmark studies deferred to Phase 4/5.
3. **Competitive Comparison & Alternative Guides:** `/compare/` and `/alternatives/` deferred to Phase 5.
