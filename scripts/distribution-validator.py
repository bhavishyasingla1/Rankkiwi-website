#!/usr/bin/env python3
"""
Rank Kiwi Continuous Distribution & Content Ecosystem Validator (Phase 10)
Validates content architecture, repurposing matrices, traceable claims, 
distribution templates, UTM parameters, and canonical link integrity.
"""

import os
import sys
import re
import json

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BASE_URL = "https://rankkiwi.com"

class DistributionValidator:
    def __init__(self):
        self.passed = 0
        self.warnings = 0
        self.failures = 0
        self.dist_dir = os.path.join(WORKSPACE, "content", "distribution")

    def log_pass(self, msg):
        self.passed += 1
        print(f"  [PASS] {msg}")

    def log_warn(self, msg):
        self.warnings += 1
        print(f"  [WARN] {msg}")

    def log_fail(self, msg):
        self.failures += 1
        print(f"  [FAIL] {msg}")

    def check_canonical_resolves(self, url):
        """Verifies a canonical URL corresponds to an existing HTML file in the workspace."""
        if not url.startswith(BASE_URL):
            return False, f"URL does not start with {BASE_URL}"
        
        path = url.replace(BASE_URL, "").strip("/")
        if not path:
            target = os.path.join(WORKSPACE, "index.html")
        else:
            target = os.path.join(WORKSPACE, path, "index.html")
            if not os.path.isfile(target):
                target = os.path.join(WORKSPACE, f"{path}.html")
        
        if os.path.isfile(target):
            return True, target
        return False, f"No file at {target}"

    def audit_ecosystem(self):
        print("\n1. Auditing Ecosystem Specification (ecosystem.json)...")
        fpath = os.path.join(self.dist_dir, "ecosystem.json")
        if not os.path.isfile(fpath):
            self.log_fail("Missing content/distribution/ecosystem.json")
            return
        
        try:
            with open(fpath, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # Check Pillars
            pillars = data.get("contentPillars", [])
            assert len(pillars) == 8, f"Expected 8 content pillars, got {len(pillars)}"
            self.log_pass(f"Verified all 8 content pillars ({', '.join([p['id'] for p in pillars[:3]])}...)")

            # Check Channels
            channels = data.get("channels", {})
            required_channels = ["website_seo", "linkedin", "x_twitter", "instagram", "youtube", "newsletter", "communities_reddit"]
            for ch in required_channels:
                assert ch in channels, f"Missing channel: {ch}"
            self.log_pass(f"Verified all {len(channels)} distribution channel strategies")

            # Check Content Mix
            mix = data.get("contentMix", {})
            total_mix = sum(mix.values())
            assert total_mix == 100, f"Content mix must sum to 100%, got {total_mix}%"
            self.log_pass(f"Verified content mix ratios: {mix}")

            # Check Franchises
            franchises = data.get("franchises", [])
            assert len(franchises) >= 5, f"Expected at least 5 franchises, got {len(franchises)}"
            self.log_pass(f"Verified {len(franchises)} recurring content franchises")

        except Exception as e:
            self.log_fail(f"Invalid ecosystem.json: {e}")

    def audit_repurposing_matrix(self):
        print("\n2. Auditing Repurposing Matrix (repurposing-matrix.json)...")
        fpath = os.path.join(self.dist_dir, "repurposing-matrix.json")
        if not os.path.isfile(fpath):
            self.log_fail("Missing content/distribution/repurposing-matrix.json")
            return

        try:
            with open(fpath, "r", encoding="utf-8") as f:
                data = json.load(f)

            matrix = data.get("matrix", [])
            assert len(matrix) >= 5, f"Expected at least 5 repurposed flagship assets, got {len(matrix)}"

            for item in matrix:
                slug = item.get("sourceSlug")
                url = item.get("canonicalUrl")
                angles = item.get("repurposingAngles", {})

                # Verify canonical resolves
                ok, reason = self.check_canonical_resolves(url)
                if not ok:
                    self.log_fail(f"Invalid canonical URL for '{slug}': {reason}")
                else:
                    self.log_pass(f"Canonical URL verified: {url}")

                # Verify all 6 distribution formats are mapped
                for fmt in ["linkedIn", "x_twitter", "instagram", "youtube", "newsletter", "community"]:
                    assert fmt in angles, f"Missing format '{fmt}' in '{slug}'"

            self.log_pass(f"All {len(matrix)} flagship assets successfully atomized across 6 distinct distribution formats")

        except Exception as e:
            self.log_fail(f"Invalid repurposing-matrix.json: {e}")

    def audit_sources_and_claims(self):
        print("\n3. Auditing Sources & Claims Database (sources-claims.json)...")
        fpath = os.path.join(self.dist_dir, "sources-claims.json")
        if not os.path.isfile(fpath):
            self.log_fail("Missing content/distribution/sources-claims.json")
            return

        try:
            with open(fpath, "r", encoding="utf-8") as f:
                data = json.load(f)

            sources = data.get("sources", [])
            assert len(sources) >= 4, f"Expected at least 4 source citations, got {len(sources)}"

            total_claims = 0
            for src in sources:
                assert src.get("sampleSize"), f"Missing sample size in {src.get('sourceId')}"
                assert src.get("datasetType"), f"Missing dataset type in {src.get('sourceId')}"
                claims = src.get("claims", [])
                total_claims += len(claims)
                for cl in claims:
                    assert cl.get("attributionRule"), f"Missing attribution rule in claim {cl.get('claimId')}"
                    assert cl.get("caveats"), f"Missing caveats in claim {cl.get('claimId')}"

            self.log_pass(f"Verified {len(sources)} verified sources and {total_claims} traceable factual claims")

        except Exception as e:
            self.log_fail(f"Invalid sources-claims.json: {e}")

    def audit_backlog(self):
        print("\n4. Auditing Content Backlog (backlog.json)...")
        fpath = os.path.join(self.dist_dir, "backlog.json")
        if not os.path.isfile(fpath):
            self.log_fail("Missing content/distribution/backlog.json")
            return

        try:
            with open(fpath, "r", encoding="utf-8") as f:
                data = json.load(f)

            items = data.get("items", [])
            assert len(items) >= 5, f"Expected at least 5 backlog items, got {len(items)}"

            for item in items:
                assert item.get("opportunityScore", 0) > 0, f"Missing opportunity score in {item.get('id')}"
                assert item.get("priority") in ["P0", "P1", "P2", "P3", "P4", "P5"], f"Invalid priority in {item.get('id')}"
                assert item.get("status") in data.get("pipelineStates", []), f"Invalid status in {item.get('id')}"
                if item.get("canonicalUrl"):
                    ok, reason = self.check_canonical_resolves(item.get("canonicalUrl"))
                    if not ok:
                        self.log_fail(f"Invalid backlog canonical URL for '{item.get('id')}': {reason}")

            self.log_pass(f"Verified {len(items)} prioritized backlog assets with valid pipeline states")

        except Exception as e:
            self.log_fail(f"Invalid backlog.json: {e}")

    def audit_attribution_and_templates(self):
        print("\n5. Auditing Attribution & Native Templates (attribution.json & templates.json)...")
        attr_path = os.path.join(self.dist_dir, "attribution.json")
        tpl_path = os.path.join(self.dist_dir, "templates.json")

        try:
            with open(attr_path, "r", encoding="utf-8") as f:
                attr = json.load(f)
            assert "utm_source" in attr.get("utmStructure", {})
            assert len(attr.get("urlBuilderExamples", [])) >= 4
            self.log_pass("Verified UTM attribution parameters and URL examples")

            with open(tpl_path, "r", encoding="utf-8") as f:
                tpl = json.load(f)
            assert "dataDrop" in tpl.get("templates", {})
            assert "visualSystem" in tpl
            assert len(tpl.get("publicationChecklist", {}).get("accuracy", [])) >= 3
            self.log_pass("Verified native templates, visual palette, and pre-publication checklists")

        except Exception as e:
            self.log_fail(f"Invalid attribution or templates: {e}")

    def run(self):
        print("=" * 65)
        print("  RANK KIWI DISTRIBUTION & CONTENT ECOSYSTEM VALIDATOR (PHASE 10)")
        print("=" * 65)
        self.audit_ecosystem()
        self.audit_repurposing_matrix()
        self.audit_sources_and_claims()
        self.audit_backlog()
        self.audit_attribution_and_templates()

        print("\n" + "=" * 65)
        print(f"  RESULTS: {self.passed} PASSED | {self.warnings} WARNINGS | {self.failures} FAILED")
        print("=" * 65)

        if self.failures > 0:
            print("\n❌ DISTRIBUTION ECOSYSTEM VALIDATION FAILED.\n")
            sys.exit(1)
        else:
            print("\n✅ ALL DISTRIBUTION & CONTENT ECOSYSTEM REQUIREMENTS PASSED.\n")
            sys.exit(0)

if __name__ == "__main__":
    validator = DistributionValidator()
    validator.run()
