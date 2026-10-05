#!/usr/bin/env python3
"""
Rank Kiwi Continuous Conversion Rate Optimisation (CRO) Validator
Validates CTA integrity, event taxonomy, experiment configurations, 
outbound Web Store links, and funnel instrumentation across all website pages.
"""

import os
import sys
import re
import json
import xml.etree.ElementTree as ET

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ACTIVE_STORE_URL = "https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb"

class CROValidator:
    def __init__(self):
        self.passed = 0
        self.warnings = 0
        self.failures = 0
        self.html_files = []

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
            if any(skip in root for skip in [".git", "node_modules", ".wrangler", "scratch"]):
                continue
            for f in files:
                if f.endswith(".html"):
                    self.html_files.append(os.path.join(root, f))
        self.html_files.sort()

    def audit_cro_json_schemas(self):
        print("\n1. Auditing CRO Infrastructure JSON Schemas...")
        cro_dir = os.path.join(WORKSPACE, "content", "cro")
        
        # 1.1 Taxonomy
        tax_path = os.path.join(cro_dir, "taxonomy.json")
        if not os.path.isfile(tax_path):
            self.log_fail("Missing content/cro/taxonomy.json")
        else:
            try:
                with open(tax_path, "r", encoding="utf-8") as f:
                    tax = json.load(f)
                assert tax.get("goals", {}).get("primary", {}).get("name") == "webstore_click"
                assert len(tax.get("goals", {}).get("secondary", [])) >= 5
                assert len(tax.get("goals", {}).get("micro", [])) >= 5
                assert len(tax.get("funnel", [])) == 7
                self.log_pass(f"Taxonomy JSON verified: primary='webstore_click', {len(tax['goals']['secondary'])} secondary goals, {len(tax['funnel'])} funnel stages")
            except Exception as e:
                self.log_fail(f"Invalid taxonomy.json schema: {e}")

        # 1.2 CTA Map
        cta_path = os.path.join(cro_dir, "cta-map.json")
        if not os.path.isfile(cta_path):
            self.log_fail("Missing content/cro/cta-map.json")
        else:
            try:
                with open(cta_path, "r", encoding="utf-8") as f:
                    cta_map = json.load(f)
                assert "pageConversionMap" in cta_map
                assert "homepage" in cta_map["pageConversionMap"]
                assert "instagramAnalytics" in cta_map["pageConversionMap"]
                assert "youtubeAnalytics" in cta_map["pageConversionMap"]
                self.log_pass(f"CTA Map JSON verified: {len(cta_map['pageConversionMap'])} page categories mapped")
            except Exception as e:
                self.log_fail(f"Invalid cta-map.json schema: {e}")

        # 1.3 Objections Map
        obj_path = os.path.join(cro_dir, "objections.json")
        if not os.path.isfile(obj_path):
            self.log_fail("Missing content/cro/objections.json")
        else:
            try:
                with open(obj_path, "r", encoding="utf-8") as f:
                    objs = json.load(f)
                assert len(objs.get("objections", [])) >= 8
                self.log_pass(f"Objections Map verified: {len(objs['objections'])} objections addressed")
            except Exception as e:
                self.log_fail(f"Invalid objections.json schema: {e}")

        # 1.4 Experiments Backlog
        exp_path = os.path.join(cro_dir, "experiments.json")
        if not os.path.isfile(exp_path):
            self.log_fail("Missing content/cro/experiments.json")
        else:
            try:
                with open(exp_path, "r", encoding="utf-8") as f:
                    exps = json.load(f)
                assert len(exps.get("experiments", [])) >= 5
                assert len(exps.get("doNotTestAgain", [])) >= 3
                for exp in exps["experiments"]:
                    ice = exp.get("ice", {})
                    assert "impact" in ice and "confidence" in ice and "ease" in ice
                self.log_pass(f"Experiments Backlog verified: {len(exps['experiments'])} experiments with ICE scores, {len(exps['doNotTestAgain'])} guardrails")
            except Exception as e:
                self.log_fail(f"Invalid experiments.json schema: {e}")

    def audit_client_script_telemetry(self):
        print("\n2. Auditing script.js CRO Telemetry Engine...")
        script_path = os.path.join(WORKSPACE, "script.js")
        with open(script_path, "r", encoding="utf-8") as f:
            js = f.read()

        required_patterns = [
            ("trackCROEvent", "Event telemetry function trackCROEvent defined"),
            ("webstore_click", "Primary conversion 'webstore_click' instrumented"),
            ("docs_click", "Secondary conversion 'docs_click' instrumented"),
            ("faq_expand", "Micro-conversion 'faq_expand' instrumented"),
            ("scroll_depth", "Micro-conversion 'scroll_depth' milestones instrumented"),
            ("workflow_step_click", "Interactive 'workflow_step_click' instrumented"),
            ("initExperiments", "Experiment assignment engine initExperiments defined"),
            ("window.rankkiwiTrack", "Public API window.rankkiwiTrack exported"),
            ("window.rankkiwiGetCROEvents", "Public API window.rankkiwiGetCROEvents exported"),
            ("window.dataLayer", "Google Tag Manager / GA4 dataLayer supported")
        ]

        for token, desc in required_patterns:
            if token in js:
                self.log_pass(desc)
            else:
                self.log_fail(f"Missing required JS token: {token}")

    def audit_page_conversion_links(self):
        print("\n3. Auditing Outbound CTAs and Chrome Web Store Links across HTML pages...")
        total_webstore_ctas = 0
        pages_checked = 0

        for fpath in self.html_files:
            rel = os.path.relpath(fpath, WORKSPACE)
            with open(fpath, "r", encoding="utf-8") as f:
                content = f.read()

            pages_checked += 1
            
            # Check for any old or broken extension IDs
            if "cmomlejmfgdfdcaingckhhkdgkbhkffl" in content:
                self.log_fail(f"{rel}: Contains obsolete extension ID cmomlejmfgdfdcaingckhhkdgkbhkffl")

            # Find all a tags targeting chromewebstore
            matches = re.findall(r'<a\s+[^>]*href=["\'](https://chromewebstore\.google\.com[^"\']*)["\'][^>]*>', content)
            for href in matches:
                total_webstore_ctas += 1
                if not href.startswith("https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl"):
                    self.log_fail(f"{rel}: Invalid Web Store destination URL: {href}")

            # Check that tags with chromewebstore have data-chrome-link
            tags = re.findall(r'<a\s+[^>]*https://chromewebstore\.google\.com[^>]*>', content)
            for tag in tags:
                if "data-chrome-link" not in tag:
                    self.log_fail(f"{rel}: Chrome Web Store CTA missing data-chrome-link attribute: {tag[:60]}...")
                if 'target="_blank"' not in tag:
                    self.log_warn(f"{rel}: Chrome Web Store CTA missing target=\"_blank\": {tag[:60]}...")
                if 'rel="noopener' not in tag and 'rel="noreferrer' not in tag:
                    self.log_fail(f"{rel}: Chrome Web Store CTA missing rel=\"noopener\": {tag[:60]}...")

        self.log_pass(f"Verified {total_webstore_ctas} outbound Web Store CTAs across {pages_checked} HTML pages")

    def run(self):
        print("=" * 60)
        print("  RANK KIWI CONTINUOUS CRO SYSTEM VALIDATOR (PHASE 9)")
        print("=" * 60)
        self.collect_html_files()
        self.audit_cro_json_schemas()
        self.audit_client_script_telemetry()
        self.audit_page_conversion_links()

        print("\n" + "=" * 60)
        print(f"  RESULTS: {self.passed} PASSED | {self.warnings} WARNINGS | {self.failures} FAILED")
        print("=" * 60)

        if self.failures > 0:
            print("\n❌ CRO VALIDATION FAILED WITH ERRORS.")
            sys.exit(1)
        else:
            print("\n✅ ALL CONTINUOUS CRO REQUIREMENTS PASSED PERFECTLY.\n")
            sys.exit(0)

if __name__ == "__main__":
    validator = CROValidator()
    validator.run()
