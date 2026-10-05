# Rank Kiwi — Phase 3 Redirect Map & Host Canonicalization

**Domain:** `rankkiwi.com`  
**Authoritative Protocol & Host:** `https://rankkiwi.com/`  
**Trailing Slash Policy:** Mandatory trailing slash on all directories.

---

## 1. Host & Scheme Normalization Rules

| Inbound Request Pattern | Target Destination | Status Code | Redirect Mechanism | Reason |
|---|---|---|---|---|
| `http://rankkiwi.com/*` | `https://rankkiwi.com/:splat` | `301 Moved Permanently` | Cloudflare Edge (Always Use HTTPS) | Enforce encrypted transport across all endpoints. |
| `http://www.rankkiwi.com/*` | `https://rankkiwi.com/:splat` | `301 Moved Permanently` | Cloudflare DNS CNAME + Redirect Rule | Eliminate duplicate hostname indexing and preserve PageRank. |
| `https://www.rankkiwi.com/*` | `https://rankkiwi.com/:splat` | `301 Moved Permanently` | Cloudflare Redirect Rule | Consolidate authority to apex canonical domain. |

---

## 2. Path & Trailing Slash Normalization

| Requested Path | Canonical Target | Status Code | Redirect Mechanism | Reason |
|---|---|---|---|---|
| `/docs` | `/docs/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/getting-started` | `/docs/getting-started/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/getting-started/your-first-analysis` | `/docs/getting-started/your-first-analysis/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/instagram` | `/docs/instagram/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/youtube` | `/docs/youtube/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/understanding/outlier-score` | `/docs/understanding/outlier-score/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/understanding/sorting-filtering` | `/docs/understanding/sorting-filtering/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/workflows/content-research` | `/docs/workflows/content-research/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/exports` | `/docs/exports/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/docs/troubleshooting` | `/docs/troubleshooting/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/support` | `/support/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/privacy` | `/privacy/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/terms` | `/terms/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |
| `/disclaimer` | `/disclaimer/` | `301 Moved Permanently` | Cloudflare Pages / `_redirects` | Enforce trailing slash consistency. |

---

## 3. Legacy Aliases & Safety Redirects

| Inbound Path | Canonical Target | Status Code | Redirect Mechanism | Reason |
|---|---|---|---|---|
| `/help` | `/docs/` | `301 Moved Permanently` | `_redirects` | Common user intuition alias routing to Documentation Hub. |
| `/help/*` | `/docs/troubleshooting/` | `301 Moved Permanently` | `_redirects` | Deep help route alias routing to Troubleshooting Hub. |
| `/faq` | `/docs/troubleshooting/` | `301 Moved Permanently` | `_redirects` | Frequently asked questions routed to diagnostic troubleshooting. |
| `/install` | `https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb` | `302 Found` | `_redirects` | Short marketing redirect for Chrome Web Store installation. |

---

## 4. Query Parameter Policy

- Tracking parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `ref`, `fbclid`, `gclid`) **MUST NOT** trigger redirects or alter the page content.
- Cloudflare Edge serves the pre-rendered static HTML with a self-referencing canonical tag pointing to the clean URL without parameters:
  - Example: Requesting `https://rankkiwi.com/?utm_source=twitter` renders HTML with `<link rel="canonical" href="https://rankkiwi.com/">`.
  - Result: Search engine crawlers attribute PageRank and indexation solely to the clean root canonical.
