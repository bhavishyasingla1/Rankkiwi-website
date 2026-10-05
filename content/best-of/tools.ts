/**
 * Phase 8: Centralized Best-of Tool Profiles & Types
 * Rank Kiwi Marketing Website
 */

export interface ToolPricing {
  summary: string;
  model: 'Completely Free' | 'Freemium' | 'Paid (Free Trial)' | 'Enterprise';
  startingPrice: string;
  checkedAt: string;
  sourceUrl: string;
}

export interface ToolProfile {
  slug: string;
  name: string;
  category: string;
  platforms: string[];
  bestFor: string;
  badge: string;
  description: string;
  keyCapabilities: string[];
  mainLimitation: string;
  pricing: ToolPricing;
  bestSuitedTo: string;
  officialUrl: string;
  internalLinks?: {
    product?: string;
    outlier?: string;
    research?: string;
    comparison?: string;
    alternative?: string;
  };
}

export interface BestOfCategoryCriteria {
  id: string;
  label: string;
  weight: number; // 1-10 relative priority for this category
  description: string;
}

export interface BestOfCategoryConfig {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  thesis: string;
  coreDistinction: string;
  primaryWinner: string; // Tool slug
  specialistWinners: Array<{
    useCase: string;
    toolSlug: string;
    why: string;
  }>;
  criteria: BestOfCategoryCriteria[];
}

import toolsData from './tools.json';

export const TOOLS_REGISTRY: Record<string, ToolProfile> = toolsData.tools as Record<string, ToolProfile>;

export function getTool(slug: string): ToolProfile | undefined {
  return TOOLS_REGISTRY[slug];
}

export function getAllTools(): ToolProfile[] {
  return Object.values(TOOLS_REGISTRY);
}
