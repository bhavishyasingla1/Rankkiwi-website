#!/usr/bin/env python3
"""
Rank Kiwi Global Brand Consistency & Visual System Harmonizer
Applies centralized design tokens, standardized typography scale,
5-column footer information architecture, and global header across all HTML pages.
"""

import os
import glob
import re

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

GLOBAL_HEADER = """    <!-- SITE HEADER -->
    <header class="site-header" data-header>
      <div class="wrap nav">
        <a class="brand" href="/" aria-label="Rank Kiwi home">
          <img src="/assets/rankkiwi-icon-96.webp" alt="Rank Kiwi logo" class="brand-logo" width="24" height="24" fetchpriority="high" />
          <span>Rank Kiwi</span>
        </a>

        <div class="nav-links" id="nav-links" data-nav-links>
          <a href="/#how-it-works">How it works</a>
          <a href="/#features">Features</a>
          <a href="/research/">Research</a>
          <a href="/docs/">Docs</a>
          <a class="button button-small" data-chrome-link href="https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb" target="_blank" rel="noopener">Add to Chrome</a>
        </div>

        <div class="nav-right">
          <a class="button button-small" data-chrome-link href="https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb" target="_blank" rel="noopener">Add to Chrome</a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle navigation" data-menu-toggle>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>"""

GLOBAL_FOOTER = """    <!-- SITE FOOTER -->
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand-col">
          <a class="brand" href="/" aria-label="Rank Kiwi home">
            <img src="/assets/rankkiwi-icon-96.webp" alt="Rank Kiwi logo" class="brand-logo" width="24" height="24" loading="lazy" decoding="async" />
            <span>Rank Kiwi</span>
          </a>
          <p>Research creator profiles and spot viral outlier content on Instagram and YouTube.</p>
          <div class="footer-socials">
            <a class="social-icon-link" href="https://www.instagram.com/bhavishyasingla1/" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a class="social-icon-link" href="https://www.linkedin.com/in/bhavishyasingla1/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a class="social-icon-link" href="https://www.youtube.com/@bhavishyasingla1" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
            </a>
            <a class="social-icon-link" href="https://bhavishyasingla.com/" target="_blank" rel="noopener" aria-label="Bhavishya Singla Website">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <b>Product</b>
          <a href="/">Home</a>
          <a href="/instagram-analytics/">Instagram Analytics</a>
          <a href="/youtube-analytics/">YouTube Analytics</a>
          <a href="/outlier-score/">Outlier Score</a>
          <a href="/creator-content-research/">Creator Research</a>
        </div>

        <div>
          <b>Learn &amp; Docs</b>
          <a href="/docs/">Documentation</a>
          <a href="/docs/getting-started/">Getting Started</a>
          <a href="/docs/getting-started/your-first-analysis/">First Analysis</a>
          <a href="/docs/troubleshooting/">Troubleshooting</a>
          <a href="/docs/exports/">Exports Guide</a>
        </div>

        <div>
          <b>Research &amp; Compare</b>
          <a href="/research/">Research Hub</a>
          <a href="/research/methodology/">Methodology</a>
          <a href="/compare/">Tool Comparisons</a>
          <a href="/alternatives/">Alternatives Hub</a>
          <a href="/best/">Best Software Guides</a>
        </div>

        <div>
          <b>Legal &amp; Support</b>
          <a href="/support/">Help &amp; Support</a>
          <a href="/privacy/">Privacy Policy</a>
          <a href="/terms/">Terms of Service</a>
          <a href="/disclaimer/">Disclaimer</a>
          <a href="mailto:say@hibhavishya.in">say@hibhavishya.in</a>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <p>&copy; 2026 Rank Kiwi. Not affiliated with Meta, Instagram, Google, or YouTube.</p>
        <p>Made with <span class="footer-heart">&#10084;&#65039;</span> by <a class="author-link" href="https://bhavishyasingla.com/" target="_blank" rel="noopener">Bhavishya Singla</a></p>
      </div>
    </footer>"""

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    orig = content

    # 1. Standardize Header
    header_pattern = re.compile(r"(?:<!--\s*(?:SITE\s+)?HEADER\s*-->\s*)*<header\s+class=[\"']site-header[\"'][^>]*>.*?</header>", re.DOTALL)
    if header_pattern.search(content):
        content = header_pattern.sub(GLOBAL_HEADER, content, count=1)

    # 2. Standardize Footer (matching <footer class="site-footer"...> up to closing </footer>)
    footer_pattern = re.compile(r"(?:<!--\s*(?:SITE\s+)?FOOTER\s*-->\s*)*<footer\s+class=[\"']site-footer[\"'][^>]*>.*?</footer>", re.DOTALL)
    if footer_pattern.search(content):
        content = footer_pattern.sub(GLOBAL_FOOTER, content, count=1)

    # 3. Clean up inline font-sizes on headings so global type scale applies
    # H1 font-size clamp cleanup
    content = re.sub(
        r'<h1([^>]*)style=[\x27\x22]([^\x27\x22]*?)font-size\s*:\s*clamp\([^)]+\)\s*;?\s*(line-height\s*:\s*[^;]+;?\s*)?([^\x27\x22]*)[\x27\x22]',
        r'<h1\1style="\2\4"',
        content
    )
    # H2 font-size cleanup
    content = re.sub(
        r'<h2([^>]*)style=[\x27\x22]([^\x27\x22]*?)font-size\s*:\s*(?:clamp\([^)]+\)|[0-9.]+(?:px|rem))\s*;?\s*(line-height\s*:\s*[^;]+;?\s*)?([^\x27\x22]*)[\x27\x22]',
        r'<h2\1style="\2\3"',
        content
    )
    # H3 font-size cleanup
    content = re.sub(
        r'<h3([^>]*)style=[\x27\x22]([^\x27\x22]*?)font-size\s*:\s*(?:clamp\([^)]+\)|[0-9.]+(?:px|rem))\s*;?\s*(line-height\s*:\s*[^;]+;?\s*)?([^\x27\x22]*)[\x27\x22]',
        r'<h3\1style="\2\3"',
        content
    )

    # Clean up empty style="" or style=" " attributes
    content = re.sub(r'\s*style=[\x27\x22]\s*[\x27\x22]', '', content)

    # 4. Harmonize legacy palette values in product pages
    content = content.replace("#e2ddd5", "var(--line)")
    content = content.replace("#4a5548", "var(--muted)")
    content = content.replace("#6b7768", "var(--caption)")
    content = content.replace("#2d382b", "var(--ink)")
    content = content.replace("#f2efe9", "var(--wash)")
    content = content.replace("#64748b", "var(--caption)")
    content = content.replace("#475569", "var(--muted)")
    content = content.replace("#475345", "var(--muted)")
    content = content.replace("#cbd5e1", "var(--line)")
    content = content.replace("#374151", "var(--ink-secondary)")
    content = content.replace("#f8faf6", "var(--wash)")
    content = content.replace("#fafafa", "var(--surface-muted)")
    content = content.replace("#f8fafc", "var(--surface-muted)")
    content = content.replace("#01370b", "var(--kiwi-dark)")
    # Replace #cbf990 in styles but preserve meta theme-color
    meta_theme = '<meta name="theme-color" content="#cbf990" />'
    meta_placeholder = '__META_THEME_COLOR_PLACEHOLDER__'
    content = content.replace(meta_theme, meta_placeholder)
    content = content.replace("#cbf990", "var(--kiwi-green)")
    content = content.replace(meta_placeholder, meta_theme)

    # 5. Harmonize hero lead, lede, and hero-text inline font-size overrides
    content = re.sub(r'class=[\x27\x22](lede|hero-lead|hero-text)[\x27\x22]\s*style=[\x27\x22][^\x27\x22]*?font-size:[^\x27\x22]*?[\x27\x22]', r'class="\1"', content)

    # 6. Harmonize hero CTA button inline font-size and padding overrides
    content = re.sub(r'(class=[\x27\x22][^\x27\x22]*button[^\x27\x22]*[\x27\x22])\s*style=[\x27\x22][^\x27\x22]*?font-size:\s*1\.05rem;?[^\x27\x22]*?[\x27\x22]', r'\1', content)
    content = re.sub(r'style=[\x27\x22][^\x27\x22]*?font-size:\s*1\.05rem;?[^\x27\x22]*?[\x27\x22]\s*(class=[\x27\x22][^\x27\x22]*button[^\x27\x22]*[\x27\x22])', r'\1', content)

    # 7. Harmonize section-head p and section-intro p inline overrides
    content = re.sub(r'<p\s+style=[\x27\x22]color:\s*var\(--muted\);\s*font-size:\s*1\.05rem;?[\x27\x22]>', r'<p>', content)
    content = re.sub(r'<h4([^>]*)style=[\x27\x22]margin:\s*18px\s+0\s+8px\s+0;\s*font-size:\s*14px;?[\x27\x22]', r'<h4\1>', content)
    content = re.sub(r'<h1([^>]*)style=[\x27\x22]max-width:\s*900px;\s*margin-bottom:\s*20px;?[\x27\x22]', r'<h1\1>', content)
    content = re.sub(r'<h1([^>]*)style=[\x27\x22]margin-bottom:\s*18px;?[\x27\x22]', r'<h1\1>', content)

    # Clean up empty style="" or style=" " attributes
    content = re.sub(r'\s*style=[\x27\x22]\s*[\x27\x22]', '', content)

    if content != orig:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

def main():
    html_files = sorted(glob.glob(os.path.join(WORKSPACE, "**/*.html"), recursive=True))
    modified = 0
    for f in html_files:
        if process_file(f):
            modified += 1
            print(f"Harmonized: {os.path.relpath(f, WORKSPACE)}")
    print(f"\nDone! Harmonized {modified} of {len(html_files)} files.")

if __name__ == "__main__":
    main()
