/* Rank Kiwi Interactive Script & Continuous CRO Engine (Phase 9) */

const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb';
const SUPPORT_EMAIL = 'say@hibhavishya.in';

// ==========================================================================
// 1. CRO Conversion Telemetry & Event Dispatcher
// ==========================================================================
function getPageType() {
  const p = window.location.pathname.toLowerCase();
  if (p === '/' || p === '' || p === '/index.html') return 'homepage';
  if (p.includes('/instagram-analytics')) return 'product_instagram';
  if (p.includes('/youtube-analytics')) return 'product_youtube';
  if (p.includes('/outlier-score')) return 'product_outlier_score';
  if (p.includes('/creator-content-research')) return 'product_research';
  if (p === '/compare/' || p === '/compare') return 'comparison_hub';
  if (p.startsWith('/compare/')) return 'comparison_detail';
  if (p === '/alternatives/' || p === '/alternatives') return 'alternatives_hub';
  if (p.startsWith('/alternatives/')) return 'alternatives_detail';
  if (p === '/best/' || p === '/best') return 'best_of_hub';
  if (p.startsWith('/best-')) return 'best_of_detail';
  if (p === '/research/' || p === '/research') return 'research_hub';
  if (p.startsWith('/research/')) return 'research_article';
  if (p === '/docs/' || p === '/docs') return 'docs_hub';
  if (p.startsWith('/docs/')) return 'docs_article';
  if (p.startsWith('/support')) return 'support';
  if (p.startsWith('/privacy') || p.startsWith('/terms') || p.startsWith('/disclaimer')) return 'legal';
  if (document.title.toLowerCase().includes('404')) return 'error_404';
  return 'content';
}

function getPageSlug() {
  return window.location.pathname.replace(/^\/|\/$/g, '') || 'home';
}

function getDeviceType() {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w <= 1024) return 'tablet';
  return 'desktop';
}

function getCTAPosition(el) {
  if (el.dataset.ctaPosition) return el.dataset.ctaPosition;
  if (el.closest('.site-header, [data-header]')) return 'nav';
  if (el.closest('.hero-actions, .hero')) return 'hero';
  if (el.closest('.pricing-card, .pricing-section')) return 'pricing';
  if (el.closest('.final-cta')) return 'final';
  if (el.closest('.site-footer')) return 'footer';
  if (el.closest('.docs-article, .docs-content')) return 'docs';
  if (el.closest('main')) return 'contextual';
  return 'general';
}

function getCTAName(el) {
  if (el.dataset.ctaName) return el.dataset.ctaName;
  const txt = el.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 32);
  return txt || 'cta_button';
}

function trackCROEvent(eventName, customParams = {}) {
  const payload = {
    event: eventName,
    page_type: getPageType(),
    page_slug: getPageSlug(),
    device_type: getDeviceType(),
    timestamp: new Date().toISOString(),
    experiment_id: window.__rankKiwiActiveExpId || null,
    variant_id: window.__rankKiwiActiveVariant || null,
    ...customParams
  };

  // Google Tag Manager / GA4 DataLayer integration
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  // Standard DOM CustomEvent for internal scripts or test runners
  try {
    window.dispatchEvent(new CustomEvent('rankkiwi_cro_event', { detail: payload }));
  } catch (e) {}

  // Local telemetry buffer for audit & inspection
  window.__rankKiwiCROEvents = window.__rankKiwiCROEvents || [];
  window.__rankKiwiCROEvents.push(payload);
  if (window.__rankKiwiCROEvents.length > 100) {
    window.__rankKiwiCROEvents.shift();
  }

  return payload;
}

// Public API for programmatic debugging and automated verification
window.rankkiwiTrack = trackCROEvent;
window.rankkiwiGetCROEvents = () => window.__rankKiwiCROEvents || [];

// ==========================================================================
// 2. A/B Testing & Lightweight Experiment Router
// ==========================================================================
const ACTIVE_EXPERIMENTS = [
  {
    id: 'exp_hp_hero_cta_v1',
    pages: ['/', '/index.html'],
    selector: '.hero-actions [data-chrome-link]',
    variants: {
      control: { label: 'Add to Chrome', ariaLabel: 'Add Rank Kiwi to Chrome' },
      treatment: { label: 'Add to Chrome', ariaLabel: 'Add Rank Kiwi to Chrome' }
    }
  }
];

function initExperiments() {
  const currentPath = window.location.pathname;
  ACTIVE_EXPERIMENTS.forEach((exp) => {
    const isMatch = exp.pages.some((p) => p === currentPath || (p === '/' && (currentPath === '' || currentPath === '/index.html')));
    if (!isMatch) return;

    const urlParams = new URLSearchParams(window.location.search);
    const override = urlParams.get(`rk_${exp.id}`) || urlParams.get('rk_variant');
    let assignedVariant = override;

    if (!assignedVariant) {
      try {
        assignedVariant = localStorage.getItem(`rk_${exp.id}`);
        if (!assignedVariant || (assignedVariant !== 'control' && assignedVariant !== 'treatment')) {
          assignedVariant = Math.random() < 0.5 ? 'control' : 'treatment';
          localStorage.setItem(`rk_${exp.id}`, assignedVariant);
        }
      } catch (e) {
        assignedVariant = 'control';
      }
    }

    window.__rankKiwiActiveExpId = exp.id;
    window.__rankKiwiActiveVariant = assignedVariant;

    // Apply variant safely with zero layout shift
    const targetEl = document.querySelector(exp.selector);
    if (targetEl && assignedVariant === 'treatment' && exp.variants.treatment) {
      if (exp.variants.treatment.label) {
        targetEl.textContent = exp.variants.treatment.label;
      }
      if (exp.variants.treatment.ariaLabel) {
        targetEl.setAttribute('aria-label', exp.variants.treatment.ariaLabel);
      }
    }

    trackCROEvent('experiment_assigned', {
      experiment_id: exp.id,
      variant_id: assignedVariant
    });
  });
}

// ==========================================================================
// 3. CTA & Conversion Click Tracking
// ==========================================================================
// Chrome Web Store links handler (Primary Conversion)
document.querySelectorAll('[data-chrome-link]').forEach((link) => {
  link.href = CHROME_STORE_URL;
  if (CHROME_STORE_URL.startsWith('[')) {
    link.addEventListener('click', (event) => {
      // If placeholder, scroll to hero or show informative notification
      event.preventDefault();
      const hero = document.querySelector('.hero');
      if (hero && window.location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    link.setAttribute('aria-label', 'Rank Kiwi is coming soon to the Chrome Web Store');
  } else {
    link.setAttribute('aria-label', link.getAttribute('aria-label') || 'Add Rank Kiwi to Chrome');
  }

  link.addEventListener('click', () => {
    trackCROEvent('webstore_click', {
      cta_name: getCTAName(link),
      cta_position: getCTAPosition(link),
      href: link.href
    });
  });
});

// Secondary & General CTA tracking
document.addEventListener('click', (e) => {
  const target = e.target.closest('a, button');
  if (!target) return;

  // Skip webstore links already handled above
  if (target.hasAttribute('data-chrome-link') || (target.href && target.href.includes('chromewebstore.google.com'))) {
    return;
  }

  const href = target.getAttribute('href') || '';

  // Secondary Conversion: Documentation click
  if (href.startsWith('/docs') || href.includes('/docs/')) {
    trackCROEvent('docs_click', {
      cta_name: getCTAName(target),
      cta_position: getCTAPosition(target),
      href: href
    });
    return;
  }

  // Secondary Conversion: Comparison view click
  if (href.startsWith('/compare') || href.includes('/compare/')) {
    trackCROEvent('comparison_view', {
      cta_name: getCTAName(target),
      cta_position: getCTAPosition(target),
      href: href
    });
    return;
  }

  // Secondary Conversion: Outlier Score view click
  if (href.includes('/outlier-score')) {
    trackCROEvent('outlier_score_view', {
      cta_name: getCTAName(target),
      cta_position: getCTAPosition(target),
      href: href
    });
    return;
  }

  // Micro-conversion: Social / developer outbound link
  if (target.classList.contains('social-icon-link') || target.classList.contains('author-link') || href.includes('bhavishyasingla.com')) {
    trackCROEvent('social_click', {
      cta_name: getCTAName(target),
      cta_position: 'footer',
      href: href
    });
    return;
  }

  // General internal CTA clicks
  if (target.classList.contains('button') || target.classList.contains('text-button') || target.dataset.ctaName) {
    trackCROEvent('website_cta_click', {
      cta_name: getCTAName(target),
      cta_position: getCTAPosition(target),
      href: href
    });
  }
});

// Micro-conversion: FAQ Accordion Expand
document.querySelectorAll('.accordion details, details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      const summary = detail.querySelector('summary');
      const question = summary ? summary.textContent.replace(/\+/g, '').trim() : 'faq_question';
      trackCROEvent('faq_expand', {
        cta_position: 'faq',
        question: question.slice(0, 60)
      });
    }
  });
});

// Micro-conversion: Scroll Depth Milestones (25%, 50%, 75%, 100%)
(function initScrollDepthTracking() {
  const milestonesReached = { 25: false, 50: false, 75: false, 100: false };
  let scrollThrottleTimer = null;

  const checkScrollDepth = () => {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
    const winHeight = window.innerHeight;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const currentDepth = Math.min(100, Math.round(((scrollY + winHeight) / docHeight) * 100));

    [25, 50, 75, 100].forEach((milestone) => {
      if (!milestonesReached[milestone] && currentDepth >= milestone) {
        milestonesReached[milestone] = true;
        trackCROEvent('scroll_depth', {
          depth_percent: milestone
        });
      }
    });
  };

  window.addEventListener('scroll', () => {
    if (!scrollThrottleTimer) {
      scrollThrottleTimer = setTimeout(() => {
        checkScrollDepth();
        scrollThrottleTimer = null;
      }, 250);
    }
  }, { passive: true });
})();

// Sticky Header elevation on scroll
const header = document.querySelector('[data-header]');
const handleScrollHeader = () => {
  if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
};
handleScrollHeader();
window.addEventListener('scroll', handleScrollHeader, { passive: true });

// Mobile Navigation Toggle
const menuButton = document.querySelector('[data-menu-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('is-open');
  menuButton.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    menuButton?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

// Scroll Reveal Animations
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || '0';
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Ensure Hero Video Autoplays
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.muted = true;
  const playPromise = heroVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      const playOnTouch = () => {
        heroVideo.play().catch(() => {});
      };
      window.addEventListener('click', playOnTouch, { once: true });
      window.addEventListener('touchstart', playOnTouch, { once: true });
    });
  }
}

// Workflow Carousel in How It Works section
const workflowSteps = document.querySelectorAll('#workflow-steps .step');
const carouselImages = document.querySelectorAll('.carousel-image');
const carouselDots = document.querySelectorAll('.carousel-dot-btn');

let currentStep = 1;
let carouselTimer = null;
const ROTATION_INTERVAL = 3800;

function setWorkflowStep(stepNum) {
  currentStep = stepNum;

  workflowSteps.forEach((step) => {
    const isStepActive = parseInt(step.dataset.step, 10) === stepNum;
    step.classList.toggle('active', isStepActive);
    step.setAttribute('aria-selected', isStepActive ? 'true' : 'false');

    // Trigger restart of CSS progress animation on active step
    const bar = step.querySelector('.step-progress-bar');
    if (bar) {
      bar.style.animation = 'none';
      if (isStepActive) {
        void bar.offsetWidth; // Force DOM reflow
        bar.style.animation = `stepProgress ${ROTATION_INTERVAL}ms linear forwards`;
      }
    }
  });

  carouselImages.forEach((img) => {
    img.classList.toggle('active', parseInt(img.dataset.step, 10) === stepNum);
  });

  carouselDots.forEach((dot) => {
    const isDotActive = parseInt(dot.dataset.step, 10) === stepNum;
    dot.classList.toggle('active', isDotActive);
    dot.setAttribute('aria-selected', isDotActive ? 'true' : 'false');
  });
}

function startWorkflowRotation() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    const next = currentStep >= 3 ? 1 : currentStep + 1;
    setWorkflowStep(next);
  }, ROTATION_INTERVAL);
}

if (workflowSteps.length > 0 && carouselImages.length > 0) {
  workflowSteps.forEach((step) => {
    const handleStepSelect = () => {
      const stepNum = parseInt(step.dataset.step, 10);
      setWorkflowStep(stepNum);
      startWorkflowRotation();
      trackCROEvent('workflow_step_click', {
        step_number: stepNum,
        cta_position: 'how_it_works'
      });
    };

    step.addEventListener('click', handleStepSelect);
    step.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleStepSelect();
      }
    });
  });

  carouselDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const stepNum = parseInt(dot.dataset.step, 10);
      setWorkflowStep(stepNum);
      startWorkflowRotation();
      trackCROEvent('workflow_step_click', {
        step_number: stepNum,
        cta_position: 'how_it_works_dot'
      });
    });
  });

  // Re-sync animation when page visibility changes (avoid background tab freeze)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (carouselTimer) clearInterval(carouselTimer);
    } else {
      setWorkflowStep(currentStep);
      startWorkflowRotation();
    }
  });

  // Initialize and trigger Step 1 rotation
  setWorkflowStep(1);
  startWorkflowRotation();
}

// Docs Sidebar Active Link Spy
const docsArticles = document.querySelectorAll('.docs-article');
const docsLinks = document.querySelectorAll('.docs-nav-link');

if (docsArticles.length > 0 && docsLinks.length > 0 && 'IntersectionObserver' in window) {
  const docsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        docsLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' });

  docsArticles.forEach((article) => docsObserver.observe(article));
}

// ==========================================================================
// Client-Side Documentation Search Engine
// ==========================================================================
const DOCS_SEARCH_INDEX = [
  {
    title: 'Getting Started Quickstart',
    category: 'Getting Started',
    url: '/docs/getting-started/',
    desc: 'Install the extension and run your first Instagram or YouTube creator analysis in minutes.',
    keywords: 'install chrome web store pin extension setup quickstart getting started introduction'
  },
  {
    title: 'Your First Analysis Walkthrough',
    category: 'Getting Started',
    url: '/docs/getting-started/your-first-analysis/',
    desc: 'Step-by-step beginner guide: choose a creator, select sample size, inspect results, and export.',
    keywords: 'first analysis beginner step by step tutorial walkthrough sample size how to start'
  },
  {
    title: 'Understanding the Workspace & UI',
    category: 'Getting Started',
    url: '/docs/getting-started/#workspace',
    desc: 'Visual breakdown of analysis controls, filter panels, outlier grids, and export dialogs.',
    keywords: 'workspace ui tour controls buttons cards layout modal panel interface'
  },
  {
    title: 'Instagram Outlier Research Overview',
    category: 'Instagram',
    url: '/docs/instagram/',
    desc: 'How Rank Kiwi detects creator profiles, scans Reels, and extracts public performance metrics.',
    keywords: 'instagram reels profiles posts carousels views likes comments detection'
  },
  {
    title: 'Instagram Metrics Reference',
    category: 'Instagram',
    url: '/docs/instagram/#metrics',
    desc: 'Complete table of visible metrics: plays/views, likes, comments, captions, and Outlier Scores.',
    keywords: 'instagram metrics table plays views likes comments caption timestamps public data'
  },
  {
    title: 'Instagram Limitations & Private Profiles',
    category: 'Instagram',
    url: '/docs/instagram/#limitations',
    desc: 'Understanding public page scope, private profile restrictions, and platform DOM shifts.',
    keywords: 'instagram limitations private accounts restrictions dom changes missing posts'
  },
  {
    title: 'YouTube Outlier Research Overview',
    category: 'YouTube',
    url: '/docs/youtube/',
    desc: 'How Rank Kiwi analyzes channel video catalogs, YouTube Shorts, and benchmark views.',
    keywords: 'youtube channels videos shorts views likes comments outlier discovery'
  },
  {
    title: 'YouTube Metrics & Capabilities',
    category: 'YouTube',
    url: '/docs/youtube/#metrics',
    desc: 'Reference guide to YouTube video statistics, publish dates, thumbnails, and Outlier Scores.',
    keywords: 'youtube metrics video statistics shorts thumbnail resolution publish dates'
  },
  {
    title: 'YouTube Limitations & Surface Support',
    category: 'YouTube',
    url: '/docs/youtube/#limitations',
    desc: 'Surface compatibility: channel homepage vs /videos tab vs /shorts tab.',
    keywords: 'youtube limitations channel tabs detection unsupported surfaces'
  },
  {
    title: 'Understanding Outlier Score',
    category: 'Understanding',
    url: '/docs/understanding/outlier-score/',
    desc: 'Why creator-relative median performance reveals breakout anomaly content without average skew.',
    keywords: 'outlier score formula median baseline typical performance math 1.0x 3.2x 5.8x breakout viral'
  },
  {
    title: 'What Outlier Score Does NOT Mean',
    category: 'Understanding',
    url: '/docs/understanding/outlier-score/#what-it-does-not-mean',
    desc: 'Important conceptual distinctions: Outlier Score is not an algorithm hack or future view guarantee.',
    keywords: 'outlier score limitations guarantees algorithm virality predictions myths'
  },
  {
    title: 'Sorting & Filtering Results',
    category: 'Understanding',
    url: '/docs/understanding/sorting-filtering/',
    desc: 'Sort by views, likes, comments, or Outlier Score. Filter by dates, content formats, and view count.',
    keywords: 'sorting filtering views likes comments oldest newest custom filters date range'
  },
  {
    title: 'Practical Content Research Workflow',
    category: 'Workflows',
    url: '/docs/workflows/content-research/',
    desc: 'The complete creator research framework: Creator → Analyze → Sort → Study Outliers → Export.',
    keywords: 'research workflow study hooks format patterns creator content strategy best practice'
  },
  {
    title: 'CSV, JSON & Clipboard Exports',
    category: 'Exports',
    url: '/docs/exports/',
    desc: 'Export structured creator data to Google Sheets, Microsoft Excel, Notion, or custom JSON pipelines.',
    keywords: 'export csv json clipboard download google sheets excel notion data export'
  },
  {
    title: 'Downloading Instagram Reels & YouTube Thumbnails',
    category: 'Exports',
    url: '/docs/exports/#downloads',
    desc: 'Directly download public creator Reel video files and maximum resolution video thumbnails.',
    keywords: 'download reel video thumbnail image offline asset study'
  },
  {
    title: 'Troubleshooting Hub & Decision Tree',
    category: 'Troubleshooting',
    url: '/docs/troubleshooting/',
    desc: 'Visual decision tree and systematic symptom guides to solve extension issues without support.',
    keywords: 'troubleshooting fix error broken not working stuck missing decision tree diagnostics'
  },
  {
    title: 'Fix: Rank Kiwi Not Appearing on Page',
    category: 'Troubleshooting',
    url: '/docs/troubleshooting/#not-appearing',
    desc: 'Step-by-step fix when the extension button or analysis overlay does not render on a creator profile.',
    keywords: 'not appearing missing button overlay icon puzzle pin extension active'
  },
  {
    title: 'Fix: Unsupported Page or Surface',
    category: 'Troubleshooting',
    url: '/docs/troubleshooting/#unsupported-page',
    desc: 'Supported URL patterns for Instagram profile grids and YouTube video channel catalogs.',
    keywords: 'unsupported page url format profile feed post surface error'
  },
  {
    title: 'Fix: Analysis Is Stuck or Incomplete',
    category: 'Troubleshooting',
    url: '/docs/troubleshooting/#analysis-stuck',
    desc: 'How to safely abort or refresh when dynamic infinite scrolling pauses during scanning.',
    keywords: 'analysis stuck paused scanning incomplete abort reload infinite scroll'
  },
  {
    title: 'Fix: Missing Metrics or Views Showing 0',
    category: 'Troubleshooting',
    url: '/docs/troubleshooting/#missing-metrics',
    desc: 'Why some feed photos hide views, and how switching to the Reels tab provides full view counts.',
    keywords: 'missing metrics 0 views zero plays likes empty values reels tab'
  },
  {
    title: 'Fix: Extension Context Invalidated',
    category: 'Troubleshooting',
    url: '/docs/troubleshooting/#context-invalidated',
    desc: 'Chrome extension update handling: simply refresh the browser tab to reconnect the worker.',
    keywords: 'extension context invalidated error chrome refresh reload tab update'
  }
];

const searchInput = document.querySelector('[data-docs-search-input]');
const searchResults = document.querySelector('[data-docs-search-results]');

if (searchInput && searchResults) {
  const performDocsSearch = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.classList.remove('is-open');
      searchResults.innerHTML = '';
      return;
    }

    const words = q.split(/\s+/).filter(Boolean);
    const matches = DOCS_SEARCH_INDEX.filter((item) => {
      const corpus = `${item.title} ${item.desc} ${item.category} ${item.keywords}`.toLowerCase();
      return words.every((w) => corpus.includes(w));
    });

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div class="docs-search-empty">
          No documentation matches for "<strong>${escapeHtml(query)}</strong>".<br />
          <span style="font-size: 12px; margin-top: 6px; display: inline-block;">
            Try searching for "Reels", "Outlier Score", "CSV", or visit our <a href="/docs/troubleshooting/" style="color: var(--green); text-decoration: underline;">Troubleshooting Center</a>.
          </span>
        </div>
      `;
    } else {
      searchResults.innerHTML = matches.slice(0, 7).map((item) => `
        <a href="${item.url}" class="docs-search-item">
          <div class="docs-search-item-header">
            <span class="docs-search-item-title">${escapeHtml(item.title)}</span>
            <span class="docs-search-item-category">${escapeHtml(item.category)}</span>
          </div>
          <p class="docs-search-item-desc">${escapeHtml(item.desc)}</p>
        </a>
      `).join('');
    }

    searchResults.classList.add('is-open');
  };

  searchInput.addEventListener('input', (e) => {
    performDocsSearch(e.target.value);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      searchResults.classList.add('is-open');
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('is-open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults.classList.remove('is-open');
    }
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// ==========================================================================
// Cookie & Privacy Consent Banner (Microsoft Clarity & Google Analytics)
// Solid on-brand light green aesthetic with user choice persistence
// ==========================================================================
function initCookieBanner() {
  const CONSENT_KEY = 'rankkiwi_cookie_consent';
  const existingConsent = localStorage.getItem(CONSENT_KEY);

  // If user already decided, apply state to clarity & gtag and exit
  if (existingConsent) {
    if (existingConsent === 'granted' || existingConsent === 'accepted') {
      if (typeof window.clarity === 'function') window.clarity('consent');
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
      }
    } else if (existingConsent === 'declined') {
      if (typeof window.clarity === 'function') window.clarity('consent', false);
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
      }
    }
    return;
  }

  // Construct banner DOM
  const banner = document.createElement('aside');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Cookie and privacy notice');
  banner.innerHTML = `
    <div class="cookie-banner-header">
      <span class="cookie-banner-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          <path d="M8.5 8.5v.01" />
          <path d="M16 15.5v.01" />
          <path d="M12 12v.01" />
          <path d="M11 17v.01" />
          <path d="M7 13v.01" />
        </svg>
        Cookie &amp; Privacy Notice
      </span>
    </div>
    <p class="cookie-banner-body">
      We improve our products and website experience using Microsoft Clarity and Google Analytics to see how you use our site. By using our site, you agree that we and Microsoft can collect and use this data. Our <a href="/privacy/">Privacy Statement</a> has more details.
    </p>
    <div class="cookie-banner-actions">
      <button type="button" class="cookie-btn-decline" id="cookie-btn-decline">Decline</button>
      <button type="button" class="cookie-btn-accept" id="cookie-btn-accept">Accept</button>
    </div>
  `;

  document.body.appendChild(banner);

  // Trigger smooth entrance animation after short delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      banner.classList.add('is-visible');
    }, 150);
  });

  const hideBanner = () => {
    banner.classList.remove('is-visible');
    setTimeout(() => {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 350);
  };

  const acceptBtn = banner.querySelector('#cookie-btn-accept');
  const declineBtn = banner.querySelector('#cookie-btn-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      if (typeof window.clarity === 'function') window.clarity('consent');
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
      }
      if (typeof trackCROEvent === 'function') {
        trackCROEvent('cookie_consent', { consent_status: 'accepted' });
      }
      hideBanner();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'declined');
      if (typeof window.clarity === 'function') window.clarity('consent', false);
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
      }
      if (typeof trackCROEvent === 'function') {
        trackCROEvent('cookie_consent', { consent_status: 'declined' });
      }
      hideBanner();
    });
  }
}

// Initialize continuous CRO A/B experiments & Cookie banner
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initExperiments();
    initCookieBanner();
  });
} else {
  initExperiments();
  initCookieBanner();
}



