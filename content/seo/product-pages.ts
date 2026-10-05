/**
 * Rank Kiwi Product-Led SEO Content Manifest
 * Source of truth for Phase 4 search-intent product landing pages.
 */

export interface ProductPageManifest {
  slug: string;
  pageType: 'product-led-seo';
  title: string;
  metaDescription: string;
  h1: string;
  searchIntent: string;
  audience: string[];
  primaryCTA: {
    label: string;
    url: string;
    target: '_blank' | '_self';
  };
  relatedDocs: Array<{ title: string; url: string }>;
  relatedPages: Array<{ title: string; url: string }>;
  schemaType: string[];
  publishedDate: string;
  modifiedDate: string;
}

export const PRODUCT_PAGES: ProductPageManifest[] = [
  {
    slug: '/instagram-analytics/',
    pageType: 'product-led-seo',
    title: 'Instagram Creator Research & Reels Analytics Extension — Rank Kiwi',
    metaDescription: 'Analyze Instagram creator profiles, rank Reels by view-to-median Outlier Score, isolate viral hooks, and export structured metrics in seconds with Rank Kiwi.',
    h1: 'Research Instagram creators without scrolling through hundreds of posts.',
    searchIntent: 'Analyze Instagram creator content, benchmark Reels engagement, discover viral outliers.',
    audience: ['Short-form creators', 'Instagram strategists', 'Social media managers', 'Creative agencies'],
    primaryCTA: {
      label: 'Add to Chrome — It\'s Free',
      url: 'https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb',
      target: '_blank'
    },
    relatedDocs: [
      { title: 'Instagram Research Guide', url: '/docs/instagram/' },
      { title: 'Understanding Outlier Score', url: '/docs/understanding/outlier-score/' },
      { title: 'Instagram Troubleshooting', url: '/docs/troubleshooting/#instagram-problems' }
    ],
    relatedPages: [
      { title: 'Outlier Score Explained', url: '/outlier-score/' },
      { title: 'Creator Content Research', url: '/creator-content-research/' },
      { title: 'YouTube Analytics', url: '/youtube-analytics/' }
    ],
    schemaType: ['SoftwareApplication', 'WebApplication', 'BreadcrumbList', 'FAQPage'],
    publishedDate: '2026-03-15',
    modifiedDate: '2026-10-05'
  },
  {
    slug: '/youtube-analytics/',
    pageType: 'product-led-seo',
    title: 'YouTube Channel & Shorts Outlier Analytics Extension — Rank Kiwi',
    metaDescription: 'Analyze YouTube channels, benchmark long-form videos and Shorts against median channel views, discover viral anomalies, and download HD thumbnails.',
    h1: 'Find the YouTube videos that actually outperformed the channel.',
    searchIntent: 'Analyze YouTube channel videos, discover viral Shorts outliers, benchmark relative performance.',
    audience: ['YouTubers', 'Shorts creators', 'Video editors', 'Channel managers', 'Thumbnail designers'],
    primaryCTA: {
      label: 'Add to Chrome — It\'s Free',
      url: 'https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb',
      target: '_blank'
    },
    relatedDocs: [
      { title: 'YouTube Research Guide', url: '/docs/youtube/' },
      { title: 'Thumbnail Downloads Guide', url: '/docs/exports/#thumbnails-download' },
      { title: 'YouTube Troubleshooting', url: '/docs/troubleshooting/#youtube-problems' }
    ],
    relatedPages: [
      { title: 'Outlier Score Explained', url: '/outlier-score/' },
      { title: 'Creator Content Research', url: '/creator-content-research/' },
      { title: 'Instagram Analytics', url: '/instagram-analytics/' }
    ],
    schemaType: ['SoftwareApplication', 'WebApplication', 'BreadcrumbList', 'FAQPage'],
    publishedDate: '2026-03-15',
    modifiedDate: '2026-10-05'
  },
  {
    slug: '/outlier-score/',
    pageType: 'product-led-seo',
    title: 'Outlier Score Explained: Creator-Relative Content Benchmarking — Rank Kiwi',
    metaDescription: 'Learn why raw views mislead and how Rank Kiwi calculates median-based Outlier Scores to identify true viral breakout content on Instagram and YouTube.',
    h1: 'Why raw views mislead — and how Outlier Score measures true performance.',
    searchIntent: 'What is an Outlier Score, why median beats average, creator-relative benchmarking.',
    audience: ['Data-driven creators', 'Growth strategists', 'Media buyers', 'Editorial directors'],
    primaryCTA: {
      label: 'Add to Chrome — It\'s Free',
      url: 'https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb',
      target: '_blank'
    },
    relatedDocs: [
      { title: 'Outlier Score Mathematical Formula', url: '/docs/understanding/outlier-score/' },
      { title: 'Sorting & Filtering Guide', url: '/docs/understanding/sorting-filtering/' },
      { title: 'Content Research Blueprint', url: '/docs/workflows/content-research/' }
    ],
    relatedPages: [
      { title: 'Instagram Analytics', url: '/instagram-analytics/' },
      { title: 'YouTube Analytics', url: '/youtube-analytics/' },
      { title: 'Creator Content Research', url: '/creator-content-research/' }
    ],
    schemaType: ['SoftwareApplication', 'WebApplication', 'BreadcrumbList', 'FAQPage'],
    publishedDate: '2026-03-15',
    modifiedDate: '2026-10-05'
  },
  {
    slug: '/creator-content-research/',
    pageType: 'product-led-seo',
    title: 'Creator Content Research Framework: Study Winning Outliers — Rank Kiwi',
    metaDescription: 'Stop scrolling and start researching. The 8-step framework to analyze top creators across Instagram and YouTube, deconstruct viral hooks, and ethically adapt winning formats.',
    h1: 'Turn creator content into structured research — not endless scrolling.',
    searchIntent: 'Systematic creator content research workflow, competitor analysis, hook deconstruction.',
    audience: ['Content strategists', 'Creative directors', 'Solo entrepreneurs', 'Editorial teams'],
    primaryCTA: {
      label: 'Add to Chrome — It\'s Free',
      url: 'https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb',
      target: '_blank'
    },
    relatedDocs: [
      { title: 'Content Research Blueprint', url: '/docs/workflows/content-research/' },
      { title: 'Exporting to Notion & Sheets', url: '/docs/exports/' },
      { title: 'Your First Analysis Walkthrough', url: '/docs/getting-started/your-first-analysis/' }
    ],
    relatedPages: [
      { title: 'Outlier Score Explained', url: '/outlier-score/' },
      { title: 'Instagram Analytics', url: '/instagram-analytics/' },
      { title: 'YouTube Analytics', url: '/youtube-analytics/' }
    ],
    schemaType: ['SoftwareApplication', 'WebApplication', 'BreadcrumbList', 'FAQPage'],
    publishedDate: '2026-03-15',
    modifiedDate: '2026-10-05'
  }
];
