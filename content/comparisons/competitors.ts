/**
 * Rank Kiwi Competitor Data Model & Benchmark Registry
 * 
 * Central source of truth for competitor features, pricing, platforms, and editorial analysis.
 * All pricing and features verified against official documentation as of October 5, 2026.
 */

export interface CompetitorPricing {
  freeTier: string;
  paidPlanName: string;
  monthlyPrice: string;
  yearlyPrice: string;
  paidFeatures: string;
}

export interface CompetitorFeatures {
  instagram: string;
  youtube: string;
  tiktok: string;
  facebook: string;
  outlierScore: string;
  sortingAndFiltering: string;
  csvJsonExport: string;
  contentDownloads: string;
  transcription: string;
  historicalDepth: string;
  accountRequired: string;
  executionModel: string;
}

export interface CompetitorEntry {
  name: string;
  slug: string;
  category: string;
  relationship: 'Direct Alternative' | 'Broader Analytics Platform' | 'Social Management Suite' | 'YouTube-Focused Intelligence' | 'First-Party Owned Analytics';
  officialUrl: string;
  pricingUrl: string;
  docsUrl: string;
  checkedDate: string;
  platforms: string[];
  pricing: CompetitorPricing;
  features: CompetitorFeatures;
  strengths: string[];
  limitations: string[];
  bestFor: string;
  notBestFor: string;
}

export interface ComparisonRegistry {
  lastGlobalReview: string;
  disclaimer: string;
  competitors: CompetitorEntry[];
}

import competitorsData from './competitors.json';

export const COMPETITORS_REGISTRY: ComparisonRegistry = competitorsData as ComparisonRegistry;

export function getCompetitorBySlug(slug: string): CompetitorEntry | undefined {
  return COMPETITORS_REGISTRY.competitors.find(c => c.slug === slug);
}
