/**
 * Rank Kiwi Alternatives Data Model
 * Source of truth for Phase 7 Alternatives System.
 */

export interface MarketAlternative {
  name: string;
  category: string;
  isRankKiwi: boolean;
  bestFor: string;
  platforms: string[];
  pricingSummary: string;
  majorStrength: string;
  majorLimitation: string;
  url: string;
}

export interface AlternativeTopic {
  slug: string;
  targetTool: string;
  targetCategory: string;
  targetOfficialUrl: string;
  targetPricingUrl: string;
  checkedDate: string;
  whyLookForAlternatives: string[];
  whatToolDoesWell: string[];
  marketAlternatives: MarketAlternative[];
}

export interface AlternativesRegistry {
  lastGlobalReview: string;
  editorialDisclosure: string;
  alternatives: AlternativeTopic[];
}

import alternativesData from './alternatives.json';

export const ALTERNATIVES_DATA: AlternativesRegistry = alternativesData as AlternativesRegistry;

export function getAlternativeBySlug(slug: string): AlternativeTopic | undefined {
  return ALTERNATIVES_DATA.alternatives.find((alt) => alt.slug === slug);
}
