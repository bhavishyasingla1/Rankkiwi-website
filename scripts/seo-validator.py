#!/usr/bin/env python3
"""
Rank Kiwi Automated Technical SEO & Metadata Validator
Validates HTML files, sitemaps, canonicals, headings, links, assets, and structured data.
"""

import os
import sys
import re
import json
import xml.etree.ElementTree as ET

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BASE_URL = "https://rankkiwi.com"

class SEOValidator:
    def __init__(self):
        self.passed = 0
        self.warnings = 0
        self.failures = 0
        self.html_files = []
        self.titles = {}
        self.descriptions = {}
        self.canonicals = {}

    def log_pass(self, msg):
        self.passed += 1
        print(f"  [PASS] {msg}")

    def log_warn(self, msg):
        self.warnings += 1
        print(f"  [WARN] {msg}")

    def log_fail(self, msg):
        self.failures += 1
        print(f"  [FAIL] {msg}")

    def collect_html_files(self):
        for root, dirs, files in os.walk(WORKSPACE):
            if any(skip in root for skip in [".git", "node_modules", ".wrangler"]):
                continue
            for f in files:
                if f.endswith(".html"):
                    self.html_files.append(os.path.join(root, f))
        self.html_files.sort()

    def audit_file_metadata(self, filepath):
        rel_path = os.path.relpath(filepath, WORKSPACE)
        is_404 = "404.html" in rel_path

        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # 1. Title Check
        title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
        if not title_match or not title_match.group(1).strip():
            self.log_fail(f"{rel_path}: Missing or empty <title>")
        else:
            title = title_match.group(1).strip()
            if not is_404:
                if title in self.titles:
                    self.log_fail(f"{rel_path}: Duplicate title detected (matches {self.titles[title]})")
                else:
                    self.titles[title] = rel_path
            self.log_pass(f"{rel_path}: Title verified ('{title[:40]}...')")

        # 2. Meta Description Check
        desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content="([^"]+)"', content, re.IGNORECASE)
        if not desc_match:
            desc_match = re.search(r"<meta\s+name=['\"]description['\"]\s+content='([^']+)'", content, re.IGNORECASE)
        if not desc_match:
            desc_match = re.search(r'<meta\s+content="([^"]+)"\s+name=["\']description["\']', content, re.IGNORECASE)

        if not desc_match or not desc_match.group(1).strip():
            self.log_fail(f"{rel_path}: Missing or empty meta description")
        else:
            desc = desc_match.group(1).strip()
            if not is_404:
                if desc in self.descriptions:
                    self.log_fail(f"{rel_path}: Duplicate description detected (matches {self.descriptions[desc]})")
                else:
                    self.descriptions[desc] = rel_path
            self.log_pass(f"{rel_path}: Description verified ({len(desc)} chars)")

        # 3. Canonical Tag Check
        canon_match = re.search(r'<link\s+[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']', content, re.IGNORECASE)
        if not canon_match:
            canon_match = re.search(r'<link\s+[^>]*href=["\']([^"\']+)["\'][^>]*rel=["\']canonical["\']', content, re.IGNORECASE)

        if is_404:
            if canon_match:
                self.log_fail(f"{rel_path}: 404 error page MUST NOT specify a canonical tag")
            else:
                self.log_pass(f"{rel_path}: 404 page correctly omits canonical tag")
        else:
            if not canon_match:
                self.log_fail(f"{rel_path}: Missing canonical tag")
            else:
                canon_url = canon_match.group(1).strip()
                if not canon_url.startswith("https://rankkiwi.com"):
                    self.log_fail(f"{rel_path}: Canonical URL does not use production HTTPS host ({canon_url})")
                elif not canon_url.endswith("/") and not canon_url.endswith(".html"):
                    self.log_fail(f"{rel_path}: Canonical URL violates trailing slash policy ({canon_url})")
                else:
                    self.canonicals[rel_path] = canon_url
                    self.log_pass(f"{rel_path}: Canonical tag valid ({canon_url})")

        # 4. Heading Hierarchy (H1 Count)
        h1_matches = re.findall(r"<h1[^>]*>(.*?)</h1>", content, re.IGNORECASE | re.DOTALL)
        if len(h1_matches) == 0:
            self.log_fail(f"{rel_path}: Missing <h1> heading")
        elif len(h1_matches) > 1:
            self.log_fail(f"{rel_path}: Multiple <h1> headings found ({len(h1_matches)})")
        else:
            h1_clean = re.sub(r"<[^>]+>", "", h1_matches[0]).strip()
            self.log_pass(f"{rel_path}: Exactly one <h1> verified ('{h1_clean[:40]}...')")

        # 5. Open Graph & Twitter Card Metadata
        if not is_404:
            og_title = bool(re.search(r'property=["\']og:title["\']', content))
            og_desc = bool(re.search(r'property=["\']og:description["\']', content))
            og_img = bool(re.search(r'property=["\']og:image["\']', content))
            og_url = bool(re.search(r'property=["\']og:url["\']', content))
            tw_card = bool(re.search(r'name=["\']twitter:card["\']', content))

            if og_title and og_desc and og_img and og_url and tw_card:
                self.log_pass(f"{rel_path}: Open Graph and Twitter Card tags complete")
            else:
                missing = []
                if not og_title: missing.append("og:title")
                if not og_desc: missing.append("og:description")
                if not og_img: missing.append("og:image")
                if not og_url: missing.append("og:url")
                if not tw_card: missing.append("twitter:card")
                self.log_fail(f"{rel_path}: Missing social tags: {', '.join(missing)}")

        # 6. JSON-LD Structured Data
        if not is_404:
            schema_blocks = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', content, re.DOTALL)
            if not schema_blocks:
                self.log_warn(f"{rel_path}: No JSON-LD structured data block found")
            else:
                for block in schema_blocks:
                    try:
                        data = json.loads(block.strip())
                        self.log_pass(f"{rel_path}: Valid JSON-LD structured data parsed")
                    except json.JSONDecodeError as err:
                        self.log_fail(f"{rel_path}: JSON-LD syntax error: {err}")

        # 7. Images / Media Dimensions & Alt Text
        imgs = re.findall(r"<img\s+([^>]+)>", content, re.IGNORECASE)
        for img_attrs in imgs:
            src_m = re.search(r'src=["\']([^"\']+)["\']', img_attrs)
            alt_m = re.search(r'alt=["\']([^"\']*)["\']', img_attrs)
            if not alt_m:
                self.log_warn(f"{rel_path}: <img> missing alt attribute ({src_m.group(1) if src_m else 'unknown'})")
            if src_m:
                src = src_m.group(1)
                if not src.startswith("http"):
                    if src.startswith("/"):
                        local_path = os.path.join(WORKSPACE, src.lstrip("/"))
                    else:
                        local_path = os.path.join(os.path.dirname(filepath), src.split("?")[0])
                    if not os.path.exists(local_path):
                        self.log_fail(f"{rel_path}: Image file does not exist locally: {src}")

        # 8. Internal Links Resolution
        links = re.findall(r'<a\s+[^>]*href=["\']([^"\']+)["\']', content, re.IGNORECASE)
        for link in links:
            if link.startswith(("#", "mailto:", "tel:", "javascript:")) or link.startswith("http"):
                continue
            clean_link = link.split("#")[0].split("?")[0]
            if not clean_link:
                continue
            if clean_link.startswith("/"):
                target = os.path.join(WORKSPACE, clean_link.lstrip("/"))
            else:
                target = os.path.join(os.path.dirname(filepath), clean_link)
            
            if os.path.isdir(target):
                index_target = os.path.join(target, "index.html")
                if not os.path.exists(index_target):
                    self.log_fail(f"{rel_path}: Link '{link}' points to directory without index.html ({target})")
            elif not os.path.exists(target):
                self.log_fail(f"{rel_path}: Broken internal link '{link}' (target not found at {target})")

    def audit_sitemap(self):
        sitemap_path = os.path.join(WORKSPACE, "sitemap.xml")
        if not os.path.exists(sitemap_path):
            self.log_fail("sitemap.xml not found")
            return

        try:
            tree = ET.parse(sitemap_path)
            root = tree.getroot()
            ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            urls = root.findall("sm:url", ns)
            self.log_pass(f"sitemap.xml parsed successfully with {len(urls)} URLs")

            for u in urls:
                loc = u.find("sm:loc", ns)
                lastmod = u.find("sm:lastmod", ns)
                if loc is None or not loc.text:
                    self.log_fail("Sitemap contains empty <loc> entry")
                    continue
                url_str = loc.text.strip()
                if not url_str.startswith("https://rankkiwi.com"):
                    self.log_fail(f"Sitemap URL not using canonical host: {url_str}")
                
                # Check that local file exists
                rel = url_str.replace("https://rankkiwi.com/", "")
                if rel == "":
                    target = os.path.join(WORKSPACE, "index.html")
                elif rel.endswith("/"):
                    target = os.path.join(WORKSPACE, rel, "index.html")
                else:
                    target = os.path.join(WORKSPACE, rel)

                if not os.path.exists(target):
                    self.log_fail(f"Sitemap URL '{url_str}' does not correspond to an existing local file ({target})")
                else:
                    self.log_pass(f"Sitemap URL verified: {url_str}")

                if lastmod is not None and lastmod.text:
                    if not re.match(r"^\d{4}-\d{2}-\d{2}$", lastmod.text.strip()):
                        self.log_warn(f"Sitemap lastmod not in standard YYYY-MM-DD format: {lastmod.text}")

        except Exception as e:
            self.log_fail(f"Failed to parse sitemap.xml: {e}")

    def audit_robots_txt(self):
        robots_path = os.path.join(WORKSPACE, "robots.txt")
        if not os.path.exists(robots_path):
            self.log_fail("robots.txt not found")
            return

        with open(robots_path, "r", encoding="utf-8") as f:
            content = f.read()

        if "Sitemap: https://rankkiwi.com/sitemap.xml" in content:
            self.log_pass("robots.txt references correct canonical sitemap.xml")
        else:
            self.log_fail("robots.txt missing or incorrect Sitemap reference")

        if "Disallow: /assets/" in content or "Disallow: /styles" in content or "Disallow: /script.js" in content:
            self.log_fail("robots.txt is blocking critical CSS/JS/images required for Googlebot rendering")
        else:
            self.log_pass("robots.txt allows search engine crawlers to fetch all CSS/JS/image rendering assets")

    def run(self):
        print("==================================================")
        print("  RANK KIWI AUTOMATED TECHNICAL SEO VALIDATOR")
        print("==================================================")
        self.collect_html_files()
        print(f"\n1. Auditing {len(self.html_files)} HTML pages...")
        for hf in self.html_files:
            self.audit_file_metadata(hf)

        print("\n2. Auditing XML Sitemap...")
        self.audit_sitemap()

        print("\n3. Auditing Robots.txt...")
        self.audit_robots_txt()

        print("\n==================================================")
        print(f"  RESULTS: {self.passed} PASSED | {self.warnings} WARNINGS | {self.failures} FAILED")
        print("==================================================")

        if self.failures > 0:
            print("\n❌ SEO VALIDATION FAILED: Please fix above critical errors.\n")
            return 1
        else:
            print("\n✅ ALL TECHNICAL SEO CRITERIA PASSED SUCCESSFULLY.\n")
            return 0

if __name__ == "__main__":
    validator = SEOValidator()
    sys.exit(validator.run())
