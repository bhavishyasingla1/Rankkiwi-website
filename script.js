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
      control: { html: 'Add to Chrome <span class="btn-microcopy">It’s free</span>', ariaLabel: 'Add Rank Kiwi to Chrome - It is free' },
      treatment: { html: 'Add to Chrome <span class="btn-microcopy">It’s free</span>', ariaLabel: 'Add Rank Kiwi to Chrome - It is free' }
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
      if (exp.variants.treatment.html) {
        targetEl.innerHTML = exp.variants.treatment.html;
      } else if (exp.variants.treatment.label) {
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

// Dismiss mobile menu on outside tap
document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('is-open')) {
    const header = document.querySelector('[data-header]');
    if (header && !header.contains(e.target)) {
      navLinks.classList.remove('is-open');
      menuButton?.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  }
});

// Dismiss mobile menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks?.classList.contains('is-open')) {
    navLinks.classList.remove('is-open');
    menuButton?.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
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

// ==========================================================================
// Hero Video & Dynamic Platform Switcher (Instagram vs YouTube)
// ==========================================================================
const heroTabInsta = document.getElementById('hero-tab-instagram');
const heroTabYt = document.getElementById('hero-tab-youtube');
const heroVideoInsta = document.getElementById('hero-video-instagram');
const heroVideoYt = document.getElementById('hero-video-youtube');
const heroBadgeText = document.getElementById('hero-badge-text');
const heroPlayPauseBtn = document.getElementById('hero-play-pause-btn');
const heroRestartBtn = document.getElementById('hero-restart-btn');
const heroCtrlLabel = document.getElementById('hero-ctrl-label');
const heroIconPause = heroPlayPauseBtn?.querySelector('.icon-pause');
const heroIconPlay = heroPlayPauseBtn?.querySelector('.icon-play');
const heroStage = document.getElementById('hero-stage');

let currentHeroPlatform = 'instagram';
let isHeroUserPaused = false;

function getActiveHeroVideo() {
  return currentHeroPlatform === 'youtube' ? heroVideoYt : heroVideoInsta;
}

function updateHeroPlayButtonState(isPlaying) {
  if (!heroPlayPauseBtn) return;
  if (isPlaying) {
    if (heroIconPause) heroIconPause.style.display = 'inline-block';
    if (heroIconPlay) heroIconPlay.style.display = 'none';
    if (heroCtrlLabel) heroCtrlLabel.textContent = 'Pause';
    heroPlayPauseBtn.setAttribute('aria-label', 'Pause demonstration');
  } else {
    if (heroIconPause) heroIconPause.style.display = 'none';
    if (heroIconPlay) heroIconPlay.style.display = 'inline-block';
    if (heroCtrlLabel) heroCtrlLabel.textContent = 'Play';
    heroPlayPauseBtn.setAttribute('aria-label', 'Play demonstration');
  }
}

function switchHeroPlatform(platform) {
  if (platform === currentHeroPlatform) return;
  currentHeroPlatform = platform;

  const isYt = platform === 'youtube';

  // Update tabs
  heroTabInsta?.classList.toggle('active', !isYt);
  heroTabInsta?.setAttribute('aria-selected', !isYt ? 'true' : 'false');
  heroTabYt?.classList.toggle('active', isYt);
  heroTabYt?.setAttribute('aria-selected', isYt ? 'true' : 'false');

  // Update status badge
  if (heroBadgeText) {
    heroBadgeText.textContent = isYt
      ? 'YouTube Shorts & Videos Demo • Full Workflow'
      : 'Instagram Reels Demo • Live Extension';
  }

  // Swap video active classes and manage playback
  if (isYt) {
    if (heroVideoInsta) {
      heroVideoInsta.pause();
      heroVideoInsta.currentTime = 0;
      heroVideoInsta.classList.remove('active');
    }
    if (heroVideoYt) {
      heroVideoYt.classList.add('active');
      heroVideoYt.currentTime = 0;
      if (!isHeroUserPaused) {
        heroVideoYt.play().then(() => updateHeroPlayButtonState(true)).catch(() => updateHeroPlayButtonState(false));
      }
    }
  } else {
    if (heroVideoYt) {
      heroVideoYt.pause();
      heroVideoYt.currentTime = 0;
      heroVideoYt.classList.remove('active');
    }
    if (heroVideoInsta) {
      heroVideoInsta.classList.add('active');
      heroVideoInsta.currentTime = 0;
      if (!isHeroUserPaused) {
        heroVideoInsta.play().then(() => updateHeroPlayButtonState(true)).catch(() => updateHeroPlayButtonState(false));
      }
    }
  }

  trackCROEvent('hero_platform_switch', {
    platform: platform,
    cta_position: 'hero_tabs'
  });
}

// Event Listeners for Hero Tabs
heroTabInsta?.addEventListener('click', () => switchHeroPlatform('instagram'));
heroTabYt?.addEventListener('click', () => switchHeroPlatform('youtube'));

// Keyboard navigation between hero platform tabs
[heroTabInsta, heroTabYt].forEach((tab) => {
  tab?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const target = tab === heroTabInsta ? heroTabYt : heroTabInsta;
      target?.focus();
      switchHeroPlatform(target.dataset.platform);
    }
  });
});

// Hero Play/Pause Toggle
heroPlayPauseBtn?.addEventListener('click', () => {
  const activeVideo = getActiveHeroVideo();
  if (!activeVideo) return;

  if (activeVideo.paused) {
    isHeroUserPaused = false;
    activeVideo.play().then(() => updateHeroPlayButtonState(true)).catch(() => {});
  } else {
    isHeroUserPaused = true;
    activeVideo.pause();
    updateHeroPlayButtonState(false);
  }
});

// Hero Restart Button
heroRestartBtn?.addEventListener('click', () => {
  const activeVideo = getActiveHeroVideo();
  if (!activeVideo) return;
  activeVideo.currentTime = 0;
  isHeroUserPaused = false;
  activeVideo.play().then(() => updateHeroPlayButtonState(true)).catch(() => {});
});

// Autoplay first hero video safely
if (heroVideoInsta) {
  heroVideoInsta.muted = true;
  heroVideoInsta.play().then(() => updateHeroPlayButtonState(true)).catch(() => {
    updateHeroPlayButtonState(false);
    const playOnTouch = () => {
      heroVideoInsta.play().then(() => updateHeroPlayButtonState(true)).catch(() => {});
    };
    window.addEventListener('click', playOnTouch, { once: true });
    window.addEventListener('touchstart', playOnTouch, { once: true });
  });
}

// Pause hero video when scrolled out of view to save battery & CPU
if (heroStage && 'IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const activeVideo = getActiveHeroVideo();
      if (!activeVideo) return;
      if (entry.isIntersecting) {
        if (!isHeroUserPaused && activeVideo.paused) {
          activeVideo.play().then(() => updateHeroPlayButtonState(true)).catch(() => {});
        }
      } else {
        if (!activeVideo.paused) {
          activeVideo.pause();
          updateHeroPlayButtonState(false);
        }
      }
    });
  }, { threshold: 0.2 });
  heroObserver.observe(heroStage);
}

// ==========================================================================
// Video-Led Workflow Player in How It Works section
// ==========================================================================
const workflowSteps = document.querySelectorAll('#workflow-steps .step');
const carouselVideoWraps = document.querySelectorAll('.carousel-video-wrap');
const workflowVideos = document.querySelectorAll('.workflow-video');
const carouselDots = document.querySelectorAll('.carousel-dot-btn');
const workflowPlayPauseBtn = document.getElementById('workflow-play-pause-btn');
const workflowCtrlLabel = document.getElementById('workflow-ctrl-label');
const workflowIconPause = workflowPlayPauseBtn?.querySelector('.icon-pause');
const workflowIconPlay = workflowPlayPauseBtn?.querySelector('.icon-play');

let currentStep = 1;
let isWorkflowAutoPlay = true;

function setWorkflowStep(stepNum, shouldPlay = true) {
  currentStep = stepNum;

  // Update step cards
  workflowSteps.forEach((step) => {
    const isStepActive = parseInt(step.dataset.step, 10) === stepNum;
    step.classList.toggle('active', isStepActive);
    step.setAttribute('aria-selected', isStepActive ? 'true' : 'false');

    const bar = step.querySelector('.step-progress-bar');
    if (bar && !isStepActive) {
      bar.style.transform = 'scaleX(0)';
      bar.style.animation = 'none';
    }
  });

  // Update video wrappers and playback
  carouselVideoWraps.forEach((wrap) => {
    const isWrapActive = parseInt(wrap.dataset.step, 10) === stepNum;
    wrap.classList.toggle('active', isWrapActive);

    const vid = wrap.querySelector('video');
    if (vid) {
      if (isWrapActive) {
        vid.currentTime = 0;
        if (shouldPlay && isWorkflowAutoPlay) {
          vid.play().catch(() => {});
        }
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    }
  });

  // Update dots
  carouselDots.forEach((dot) => {
    const isDotActive = parseInt(dot.dataset.step, 10) === stepNum;
    dot.classList.toggle('active', isDotActive);
    dot.setAttribute('aria-selected', isDotActive ? 'true' : 'false');
  });
}

// Sync progress bar directly with video playback
workflowVideos.forEach((vid, idx) => {
  const stepNum = idx + 1;
  const stepEl = workflowSteps[idx];
  const bar = stepEl?.querySelector('.step-progress-bar');

  vid.addEventListener('timeupdate', () => {
    if (currentStep === stepNum && vid.duration && bar) {
      const progress = vid.currentTime / vid.duration;
      bar.style.transform = `scaleX(${progress})`;
    }
  });

  // Advance to next step automatically on video completion
  vid.addEventListener('ended', () => {
    if (isWorkflowAutoPlay) {
      const next = currentStep >= 3 ? 1 : currentStep + 1;
      setWorkflowStep(next, true);
    }
  });
});

// Step click events
workflowSteps.forEach((step) => {
  const handleStepSelect = () => {
    const stepNum = parseInt(step.dataset.step, 10);
    setWorkflowStep(stepNum, true);
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

// Dots click events
carouselDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const stepNum = parseInt(dot.dataset.step, 10);
    setWorkflowStep(stepNum, true);
    trackCROEvent('workflow_step_click', {
      step_number: stepNum,
      cta_position: 'how_it_works_dot'
    });
  });
});

// Workflow Play/Pause toggle
workflowPlayPauseBtn?.addEventListener('click', () => {
  isWorkflowAutoPlay = !isWorkflowAutoPlay;
  const activeWrap = document.querySelector(`.carousel-video-wrap[data-step="${currentStep}"]`);
  const activeVid = activeWrap?.querySelector('video');

  if (isWorkflowAutoPlay) {
    if (workflowIconPause) workflowIconPause.style.display = 'inline-block';
    if (workflowIconPlay) workflowIconPlay.style.display = 'none';
    if (workflowCtrlLabel) workflowCtrlLabel.textContent = 'Auto-play';
    activeVid?.play().catch(() => {});
  } else {
    if (workflowIconPause) workflowIconPause.style.display = 'none';
    if (workflowIconPlay) workflowIconPlay.style.display = 'inline-block';
    if (workflowCtrlLabel) workflowCtrlLabel.textContent = 'Paused';
    activeVid?.pause();
  }
});

// Mobile touch swipe support
const workflowCarousel = document.getElementById('workflow-carousel');
if (workflowCarousel) {
  let wfStartX = 0;
  let wfStartY = 0;
  workflowCarousel.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      wfStartX = e.touches[0].clientX;
      wfStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  workflowCarousel.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - wfStartX;
    const dy = e.changedTouches[0].clientY - wfStartY;
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) {
        const next = currentStep >= 3 ? 1 : currentStep + 1;
        setWorkflowStep(next, true);
      } else {
        const prev = currentStep <= 1 ? 3 : currentStep - 1;
        setWorkflowStep(prev, true);
      }
    }
  }, { passive: true });
}

// Pause How It Works videos when scrolled out of view
const howSection = document.getElementById('how-it-works');
if (howSection && 'IntersectionObserver' in window) {
  const howObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const activeWrap = document.querySelector(`.carousel-video-wrap[data-step="${currentStep}"]`);
      const activeVid = activeWrap?.querySelector('video');
      if (entry.isIntersecting) {
        if (isWorkflowAutoPlay) {
          activeVid?.play().catch(() => {});
        }
      } else {
        activeVid?.pause();
      }
    });
  }, { threshold: 0.25 });
  howObserver.observe(howSection);
}

// Set initial step 1 without auto-play until user scrolls into view
setWorkflowStep(1, false);

// ==========================================================================
// ==========================================================================
// Creator Research Stacked Deck Swapper (Glitch-Free GPU Stacking)
// ==========================================================================
const creatorDeck = document.getElementById('creator-deck');
const deckCards = document.querySelectorAll('.deck-card');
const prevDeckBtn = document.getElementById('deck-prev-btn');
const nextDeckBtn = document.getElementById('deck-next-btn');
const prevDeckBtnMobile = document.getElementById('deck-prev-btn-mobile');
const nextDeckBtnMobile = document.getElementById('deck-next-btn-mobile');
const deckDots = document.querySelectorAll('.deck-dot');

let currentDeckIndex = 0; // 0 = Instagram (front), 1 = YouTube (back)
let isDeckAnimating = false;

function swapDeckCards() {
  if (isDeckAnimating || deckCards.length < 2) return;
  isDeckAnimating = true;

  const cardFront = document.querySelector('.deck-card.card-front');
  const cardBack = document.querySelector('.deck-card.card-back');

  if (!cardFront || !cardBack) {
    isDeckAnimating = false;
    return;
  }

  // 1. Immediately elevate incoming back card on top and transition smoothly
  cardBack.classList.add('is-stacking-top');
  cardFront.classList.add('is-stacking-under');

  setTimeout(() => {
    // 2. Commit the active front and resting back classes with zero layout shift
    cardFront.classList.remove('card-front', 'is-stacking-under');
    cardFront.classList.add('card-back');

    cardBack.classList.remove('card-back', 'is-stacking-top');
    cardBack.classList.add('card-front');

    currentDeckIndex = parseInt(cardBack.dataset.index, 10);

    // Update switcher dots
    deckDots.forEach((dot, idx) => {
      const isActive = idx === currentDeckIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    isDeckAnimating = false;
  }, 220);
}

if (deckCards.length > 0) {
  // Desktop navigation buttons
  prevDeckBtn?.addEventListener('click', () => swapDeckCards());
  nextDeckBtn?.addEventListener('click', () => swapDeckCards());

  // Mobile navigation buttons
  prevDeckBtnMobile?.addEventListener('click', () => swapDeckCards());
  nextDeckBtnMobile?.addEventListener('click', () => swapDeckCards());

  // Touch Swipe on cards
  if (creatorDeck) {
    let deckStartX = 0;
    let deckStartY = 0;
    creatorDeck.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        deckStartX = e.touches[0].clientX;
        deckStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    creatorDeck.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 0) return;
      const dx = e.changedTouches[0].clientX - deckStartX;
      const dy = e.changedTouches[0].clientY - deckStartY;
      if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        swapDeckCards();
      }
    }, { passive: true });
  }

  // Clicking anywhere on the layered back card pops it cleanly on top
  deckCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      if (card.classList.contains('card-back')) {
        swapDeckCards();
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (card.classList.contains('card-back')) {
          e.preventDefault();
          swapDeckCards();
        }
      }
    });
  });

  // Switcher indicator dots
  deckDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIdx = parseInt(dot.dataset.target, 10);
      if (targetIdx !== currentDeckIndex) {
        swapDeckCards();
      }
    });
  });
}

// ==========================================================================
// ==========================================================================
// Outlier Score Animated Vertical Histogram
// ==========================================================================
const outlierSection = document.getElementById('outlier-score');
const scoreCard = document.querySelector('.score-card');
const histogramBars = document.querySelectorAll('.histogram-bar');

let hasAnimatedHistogram = false;

function triggerHistogramAnimation() {
  if (!scoreCard) return;
  scoreCard.classList.add('is-animated');
  histogramBars.forEach((bar) => {
    const targetHeight = bar.dataset.height || '0%';
    bar.style.height = targetHeight;
  });
}

const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (isReducedMotion) {
  // Reduced motion: set final state immediately without transitions
  triggerHistogramAnimation();
} else if (outlierSection && scoreCard && 'IntersectionObserver' in window) {
  const outlierObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimatedHistogram) {
        hasAnimatedHistogram = true;
        triggerHistogramAnimation();
        outlierObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  outlierObserver.observe(outlierSection);
} else if (scoreCard) {
  triggerHistogramAnimation();
}

// Docs Sidebar Accordion & Mobile Drawer
document.querySelectorAll('.docs-nav-header').forEach((header) => {
  header.addEventListener('click', () => {
    const group = header.closest('.docs-nav-group');
    if (group) {
      group.classList.toggle('is-open');
    }
  });
});

const docsMobileToggle = document.querySelector('[data-docs-mobile-toggle]');
const docsSidebar = document.querySelector('.docs-sidebar');
const docsMobileCloseBtns = document.querySelectorAll('[data-docs-mobile-close], .docs-drawer-close, .docs-mobile-close');

// Create backdrop element dynamically if documentation sidebar exists
let docsBackdrop = document.querySelector('.docs-mobile-backdrop');
if (!docsBackdrop && docsSidebar) {
  docsBackdrop = document.createElement('div');
  docsBackdrop.className = 'docs-mobile-backdrop';
  docsBackdrop.setAttribute('aria-hidden', 'true');
  document.body.appendChild(docsBackdrop);
}

function openDocsDrawer() {
  if (docsSidebar) {
    docsSidebar.classList.add('is-mobile-open');
    document.body.classList.add('docs-drawer-open');
    if (docsMobileToggle) {
      docsMobileToggle.setAttribute('aria-expanded', 'true');
    }
  }
}

function closeDocsDrawer() {
  if (docsSidebar) {
    docsSidebar.classList.remove('is-mobile-open');
    document.body.classList.remove('docs-drawer-open');
    if (docsMobileToggle) {
      docsMobileToggle.setAttribute('aria-expanded', 'false');
    }
  }
}

if (docsMobileToggle && docsSidebar) {
  docsMobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (docsSidebar.classList.contains('is-mobile-open')) {
      closeDocsDrawer();
    } else {
      openDocsDrawer();
    }
  });
}

docsMobileCloseBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeDocsDrawer();
  });
});

if (docsBackdrop) {
  docsBackdrop.addEventListener('click', () => {
    closeDocsDrawer();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('docs-drawer-open')) {
    closeDocsDrawer();
  }
});

if (docsSidebar) {
  docsSidebar.querySelectorAll('.docs-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeDocsDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && docsSidebar.classList.contains('is-mobile-open')) {
      closeDocsDrawer();
    }
  });
}

// Docs Table of Contents (TOC) & Sidebar Active Link Spy
const tocLinks = document.querySelectorAll('.docs-toc-link, .docs-nav-link');
const tocSections = document.querySelectorAll('.docs-article, .docs-section');

if (tocLinks.length > 0 && tocSections.length > 0 && 'IntersectionObserver' in window) {
  const docsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          tocLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -55% 0px' });

  tocSections.forEach((section) => docsObserver.observe(section));
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
    desc: 'How Rank Kiwi detects creator profiles, extracts video Reels, calculates baseline medians, and previews Reels with soundwaves in a 9:16 player.',
    keywords: 'instagram reels profiles video player mp4 download views likes comments soundwave relay baseline'
  },
  {
    title: 'Download Reels from Instagram Explore',
    category: 'Instagram',
    url: '/docs/instagram/explore-downloads/',
    desc: 'Save original MP4 videos directly from Instagram Explore and creator profiles without watermarks or proxy servers.',
    keywords: 'explore downloads download reels mp4 video save offline reference client-side privacy direct v1.0.1'
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
    desc: 'How Rank Kiwi analyzes channel video catalogs and Shorts with creator anti-leakage validation and live stats enrichment.',
    keywords: 'youtube channels videos shorts views likes comments outlier discovery enricher creator validator'
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
    title: 'Excel, CSV, JSON & Clipboard Exports',
    category: 'Exports',
    url: '/docs/exports/',
    desc: 'Export structured creator data to native Excel (.xlsx), CSV, Google Sheets, Notion, or custom JSON pipelines.',
    keywords: 'export excel xlsx csv json clipboard download google sheets numbers notion data export'
  },
  {
    title: 'Downloading Instagram Reels & YouTube Thumbnails',
    category: 'Exports',
    url: '/docs/exports/#reels-download',
    desc: 'Directly download public creator Reel video files (MP4, single & batch) and maximum resolution YouTube thumbnails.',
    keywords: 'download reel video mp4 batch download thumbnail maxresdefault offline asset study'
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
      if (document.activeElement === searchInput) {
        searchInput.blur();
      }
    }
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
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

// ==========================================================================
// Hero Concept Outlier Demo Animation
// ==========================================================================
function initHeroConceptDemo() {
  const counterEl = document.getElementById('hero-outlier-counter');
  const barEl = document.getElementById('demo-outlier-bar');
  const badgeEl = document.getElementById('demo-outlier-badge');
  const replayBtn = document.getElementById('demo-replay-btn');
  const demoWrap = document.getElementById('concept-demo');

  if (!counterEl || !barEl) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let hasAnimated = false;

  function runDemoAnimation() {
    if (prefersReduced) {
      counterEl.textContent = '6.2×';
      barEl.style.height = '94%';
      return;
    }

    // Reset initial state
    barEl.style.transition = 'none';
    barEl.style.height = '30%';
    counterEl.textContent = '1.0×';
    if (badgeEl) badgeEl.style.transform = 'translateX(-50%) scale(0.9)';

    // Trigger animation
    requestAnimationFrame(() => {
      barEl.style.transition = 'height 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
      barEl.style.height = '94%';
      if (badgeEl) {
        badgeEl.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        badgeEl.style.transform = 'translateX(-50%) scale(1)';
      }

      const startTime = performance.now();
      const duration = 1400;
      const startVal = 1.0;
      const targetVal = 6.2;

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentScore = (startVal + (targetVal - startVal) * ease).toFixed(1);
        counterEl.textContent = `${currentScore}×`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counterEl.textContent = '6.2×';
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      runDemoAnimation();
    });
  }

  if (demoWrap && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          runDemoAnimation();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(demoWrap);
  } else {
    runDemoAnimation();
  }
}

// ==========================================================================
// Research Stats Count-Up Animation
// ==========================================================================
function initStatCountUp() {
  const statElements = document.querySelectorAll('.stat-count');
  if (statElements.length === 0 || !('IntersectionObserver' in window)) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);

      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-count') || '0');
      const format = el.getAttribute('data-format');
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 1400;

      if (prefersReduced || isNaN(target) || target <= 0) {
        if (format === 'k') {
          el.textContent = `${Math.round(target / 1000)}k`;
        } else if (decimals > 0) {
          el.textContent = target.toFixed(decimals);
        } else {
          el.textContent = target.toLocaleString();
        }
        return;
      }

      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;

        if (format === 'k') {
          const inK = Math.round(current / 1000);
          el.textContent = `${inK}k`;
        } else if (decimals > 0) {
          el.textContent = current.toFixed(decimals);
        } else {
          el.textContent = Math.round(current).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          if (format === 'k') {
            el.textContent = `${Math.round(target / 1000)}k`;
          } else if (decimals > 0) {
            el.textContent = target.toFixed(decimals);
          } else {
            el.textContent = target.toLocaleString();
          }
        }
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.3 });

  statElements.forEach((el) => observer.observe(el));
}

// ==========================================================================
// Sticky Header Nav CTA Reveal
// ==========================================================================
function initStickyNavCTA() {
  const header = document.querySelector('[data-header]');
  const hero = document.querySelector('.hero');
  if (!header || !hero || !('IntersectionObserver' in window)) return;

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    });
  }, { threshold: 0.1 });

  heroObserver.observe(hero);
}

// ==========================================================================
// Copy Documentation as Markdown
// ==========================================================================
function nodeToMarkdown(node) {
  if (!node) return '';
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent.replace(/\s+/g, ' ');
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  const tag = node.tagName.toLowerCase();

  // Exclude non-content elements
  if (['script', 'style', 'button', 'nav', 'noscript'].includes(tag)) return '';
  if (node.classList && (
    node.classList.contains('docs-pagination') || 
    node.classList.contains('btn-copy-markdown') ||
    node.classList.contains('docs-sidebar') ||
    node.classList.contains('skip-link') ||
    node.classList.contains('site-header') ||
    node.classList.contains('site-footer') ||
    node.classList.contains('docs-search')
  )) {
    return '';
  }

  const children = Array.from(node.childNodes).map(nodeToMarkdown).join('');

  switch (tag) {
    case 'h1':
      return `\n\n# ${children.trim()}\n\n`;
    case 'h2':
      return `\n\n## ${children.trim()}\n\n`;
    case 'h3':
      return `\n\n### ${children.trim()}\n\n`;
    case 'h4':
      return `\n\n#### ${children.trim()}\n\n`;
    case 'p':
      return `\n\n${children.trim()}\n\n`;
    case 'strong':
    case 'b':
      return `**${children.trim()}**`;
    case 'em':
    case 'i':
      return `*${children.trim()}*`;
    case 'code':
      if (node.parentElement && node.parentElement.tagName.toLowerCase() === 'pre') {
        return children;
      }
      return ` \`${children.trim()}\` `;
    case 'pre':
      return `\n\n\`\`\`\n${node.textContent.trim()}\n\`\`\`\n\n`;
    case 'blockquote':
      return `\n\n> ${children.trim().replace(/\n/g, '\n> ')}\n\n`;
    case 'ul':
      return `\n\n${children.trim()}\n\n`;
    case 'ol':
      return `\n\n${children.trim()}\n\n`;
    case 'li': {
      const parentTag = node.parentElement ? node.parentElement.tagName.toLowerCase() : 'ul';
      if (parentTag === 'ol') {
        const idx = Array.from(node.parentElement.children).indexOf(node) + 1;
        return `${idx}. ${children.trim()}\n`;
      }
      return `- ${children.trim()}\n`;
    }
    case 'table': {
      const rows = Array.from(node.querySelectorAll('tr'));
      if (rows.length === 0) return '';
      let out = '\n\n';
      rows.forEach((row, rowIdx) => {
        const cells = Array.from(row.querySelectorAll('th, td')).map(c => c.textContent.trim().replace(/\|/g, '\\|'));
        out += `| ${cells.join(' | ')} |\n`;
        if (rowIdx === 0) {
          out += `| ${cells.map(() => '---').join(' | ')} |\n`;
        }
      });
      return out + '\n\n';
    }
    case 'figure':
    case 'figcaption':
      return `\n\n*${children.trim()}*\n\n`;
    case 'img': {
      const alt = node.getAttribute('alt') || 'Screenshot';
      let src = node.getAttribute('src') || '';
      if (src && !src.startsWith('http')) {
        src = new URL(src, window.location.origin).href;
      }
      return `\n\n![${alt}](${src})\n\n`;
    }
    case 'a': {
      let href = node.getAttribute('href') || '';
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
        href = new URL(href, window.location.origin).href;
      }
      return `[${children.trim()}](${href})`;
    }
    case 'hr':
      return `\n\n---\n\n`;
    default:
      return children;
  }
}

function initCopyMarkdownButtons() {
  document.querySelectorAll('[data-copy-markdown]').forEach(btn => {
    btn.addEventListener('click', () => {
      const titleEl = document.querySelector('.docs-header-bar h1') || document.querySelector('h1');
      const title = titleEl ? titleEl.textContent.trim() : document.title;
      const url = window.location.href.split('#')[0];
      const descEl = document.querySelector('.docs-header-bar p:not(.eyebrow)');
      const desc = descEl ? descEl.textContent.trim() : '';

      let md = `# ${title}\n\n`;
      md += `> **Documentation Source:** [${url}](${url})\n`;
      md += `> **Rank Kiwi** — Chrome Extension for Creator Outlier Research\n\n`;
      if (desc) {
        md += `${desc}\n\n---\n\n`;
      }

      const content = document.querySelector('.docs-content') || document.querySelector('.docs-container') || document.querySelector('main');
      if (content) {
        md += nodeToMarkdown(content);
      }

      md = md.replace(/\n{3,}/g, '\n\n').trim() + '\n';

      const copySuccess = () => {
        btn.classList.add('copied');
        const textSpan = btn.querySelector('.copy-text');
        const originalText = textSpan ? textSpan.textContent : 'Copy as Markdown';
        if (textSpan) textSpan.textContent = 'Copied as Markdown!';

        const icon = btn.querySelector('.copy-icon');
        if (icon) {
          icon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
        }

        setTimeout(() => {
          btn.classList.remove('copied');
          if (textSpan) textSpan.textContent = originalText;
          if (icon) {
            icon.innerHTML = '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>';
          }
        }, 2500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(md).then(copySuccess).catch(() => {
          fallbackCopyText(md);
          copySuccess();
        });
      } else {
        fallbackCopyText(md);
        copySuccess();
      }
    });
  });
}

function fallbackCopyText(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

// ==========================================================================
// Privacy Policy Scope Switcher (Extension vs. Website)
// ==========================================================================
function initPrivacyScopeSwitcher() {
  const nav = document.querySelector('.privacy-scope-nav');
  if (!nav || nav.dataset.initialized === 'true') return;
  nav.dataset.initialized = 'true';

  const buttons = nav.querySelectorAll('.privacy-scope-btn');
  const sections = document.querySelectorAll('.legal-content section[data-privacy-scope]');
  const banner = document.getElementById('privacy-summary-banner');
  const bannerTitle = document.getElementById('privacy-banner-title');
  const bannerDesc = document.getElementById('privacy-banner-desc');

  const configs = {
    all: {
      title: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> Complete Privacy Policy: Chrome Extension &amp; Website',
      desc: 'Rank Kiwi clearly separates <strong>Chrome Extension execution</strong> (which is 100% local, sandboxed, and collects zero personal data) from our <strong>Marketing Website</strong> (rankkiwi.com, which uses standard privacy-respecting analytics and cookie consent). Use the buttons above to filter by environment.',
      bannerClass: 'is-all'
    },
    extension: {
      title: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Chrome Extension Privacy: 100% Client-Side Local Sandbox',
      desc: 'The Rank Kiwi Chrome extension operates entirely in your local browser sandbox. It has no central backend database, does not store or transmit your research, does not access passwords, and requires zero account sign-up. All calculations and exports stay on your device.',
      bannerClass: 'is-extension'
    },
    website: {
      title: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Marketing Website Privacy: Telemetry, Heatmaps &amp; Cookies',
      desc: 'Applies strictly to visitors browsing the rankkiwi.com marketing website. We use Google Analytics (gtag.js) for aggregate traffic counts and Microsoft Clarity for session replay to optimize page layouts. You can freely accept or decline tracking via our cookie banner.',
      bannerClass: 'is-website'
    }
  };

  function setScope(scope, updateHash = true) {
    if (!configs[scope]) scope = 'all';

    buttons.forEach(btn => {
      const match = btn.dataset.scope === scope;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    sections.forEach(sec => {
      const secScope = sec.dataset.privacyScope;
      if (scope === 'all') {
        sec.classList.remove('is-hidden');
      } else if (secScope === 'both' || secScope === scope) {
        sec.classList.remove('is-hidden');
      } else {
        sec.classList.add('is-hidden');
      }
    });

    if (banner && configs[scope]) {
      banner.className = `privacy-summary-banner ${configs[scope].bannerClass}`;
      if (bannerTitle) bannerTitle.innerHTML = configs[scope].title;
      if (bannerDesc) bannerDesc.innerHTML = configs[scope].desc;
    }

    if (updateHash) {
      try {
        if (scope === 'all') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } else {
          history.replaceState(null, '', `#${scope}`);
        }
      } catch (e) {}
    }
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setScope(btn.dataset.scope, true);
    });
  });

  // Handle initial URL hash or query parameters
  function getRequestedScope() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const query = (urlParams.get('scope') || urlParams.get('tab') || urlParams.get('view') || '').toLowerCase();
    const target = hash || query;

    if (target === 'extension' || target === 'chrome' || target === 'chrome-extension' || target === 'action') {
      return 'extension';
    }
    if (target === 'website' || target === 'site' || target === 'cookies') {
      return 'website';
    }
    return 'all';
  }

  setScope(getRequestedScope(), false);

  window.addEventListener('hashchange', () => {
    setScope(getRequestedScope(), false);
  });
}

// ==========================================================================
// 10. Custom Filters Interactive Showcase Component
// ==========================================================================
function initInteractiveFilterModal() {
  const container = document.getElementById('filter-modal-interactive');
  if (!container) return;

  const SAMPLE_REELS = [
    { id: 1, views: 3820000, likes: 403483, comments: 8420, outlier: 8.2 },
    { id: 2, views: 2450000, likes: 289000, comments: 5120, outlier: 6.4 },
    { id: 3, views: 1890000, likes: 215000, comments: 4390, outlier: 5.1 },
    { id: 4, views: 1420000, likes: 178000, comments: 3840, outlier: 4.3 },
    { id: 5, views: 1180000, likes: 142000, comments: 2950, outlier: 3.7 },
    { id: 6, views: 980000, likes: 119000, comments: 2410, outlier: 3.2 },
    { id: 7, views: 820000, likes: 98500, comments: 1980, outlier: 2.8 },
    { id: 8, views: 710000, likes: 86400, comments: 1750, outlier: 2.5 },
    { id: 9, views: 630000, likes: 74200, comments: 1530, outlier: 2.2 },
    { id: 10, views: 560000, likes: 67100, comments: 1390, outlier: 2.0 },
    { id: 11, views: 490000, likes: 59400, comments: 1220, outlier: 1.8 },
    { id: 12, views: 430000, likes: 52100, comments: 1080, outlier: 1.6 },
    { id: 13, views: 380000, likes: 46300, comments: 950, outlier: 1.5 },
    { id: 14, views: 340000, likes: 41200, comments: 840, outlier: 1.4 },
    { id: 15, views: 300000, likes: 36800, comments: 760, outlier: 1.3 },
    { id: 16, views: 270000, likes: 33100, comments: 690, outlier: 1.2 },
    { id: 17, views: 240000, likes: 29800, comments: 620, outlier: 1.1 },
    { id: 18, views: 215000, likes: 26900, comments: 550, outlier: 1.05 },
    { id: 19, views: 190000, likes: 24100, comments: 490, outlier: 1.0 },
    { id: 20, views: 170000, likes: 21800, comments: 440, outlier: 0.95 },
    { id: 21, views: 150000, likes: 19500, comments: 390, outlier: 0.9 },
    { id: 22, views: 130000, likes: 17600, comments: 340, outlier: 0.85 },
    { id: 23, views: 110000, likes: 15900, comments: 290, outlier: 0.8 },
    { id: 24, views: 92000, likes: 14500, comments: 240, outlier: 0.75 },
    { id: 25, views: 78000, likes: 13783, comments: 180, outlier: 0.7 }
  ];

  const FILTER_CONFIGS = {
    likes: {
      name: 'Likes',
      minBound: 10000,
      maxBound: 410000,
      defaultMin: 10000,
      defaultMax: 410000,
      step: 500,
      isFloat: false,
      formatVal: (v) => Math.round(v).toString(),
      parseVal: (str) => parseInt(str.replace(/[^0-9]/g, ''), 10),
      bars: [53, 59, 60, 59, 56, 52, 47, 42, 38, 34, 31, 28, 26, 24, 21, 20, 18, 17, 14, 11, 10, 8, 8, 8, 8, 8, 11, 12, 14, 17, 18, 17]
    },
    views: {
      name: 'Views',
      minBound: 50000,
      maxBound: 4000000,
      defaultMin: 50000,
      defaultMax: 4000000,
      step: 10000,
      isFloat: false,
      formatVal: (v) => Math.round(v).toString(),
      parseVal: (str) => parseInt(str.replace(/[^0-9]/g, ''), 10),
      bars: [38, 48, 58, 60, 57, 52, 46, 41, 36, 32, 28, 25, 23, 20, 18, 16, 14, 13, 11, 10, 9, 8, 8, 9, 12, 16, 20, 24, 22, 18, 14, 10]
    },
    comments: {
      name: 'Comments',
      minBound: 100,
      maxBound: 9000,
      defaultMin: 100,
      defaultMax: 9000,
      step: 25,
      isFloat: false,
      formatVal: (v) => Math.round(v).toString(),
      parseVal: (str) => parseInt(str.replace(/[^0-9]/g, ''), 10),
      bars: [58, 60, 52, 45, 38, 32, 27, 23, 19, 16, 14, 12, 10, 9, 8, 8, 7, 7, 7, 7, 8, 9, 11, 13, 15, 14, 12, 11, 9, 8, 7, 6]
    },
    outlier: {
      name: 'Outlier',
      minBound: 0.5,
      maxBound: 8.5,
      defaultMin: 0.5,
      defaultMax: 8.5,
      step: 0.1,
      isFloat: true,
      formatVal: (v) => Number(v).toFixed(1) + '×',
      parseVal: (str) => parseFloat(str.replace(/[^0-9.]/g, '')),
      bars: [18, 28, 44, 58, 60, 54, 46, 39, 33, 28, 23, 19, 16, 14, 12, 11, 9, 8, 8, 7, 8, 10, 13, 16, 20, 24, 26, 22, 17, 13, 10, 8]
    }
  };

  let currentMetric = 'likes';
  let currentMin = FILTER_CONFIGS.likes.defaultMin;
  let currentMax = FILTER_CONFIGS.likes.defaultMax;

  const metricBtns = container.querySelectorAll('.filter-metric-btn');
  const barsContainer = document.getElementById('filter-histogram-bars');
  const sliderContainer = document.getElementById('filter-slider-container');
  const thumbMin = document.getElementById('filter-thumb-min');
  const thumbMax = document.getElementById('filter-thumb-max');
  const sliderMin = document.getElementById('filter-slider-min');
  const sliderMax = document.getElementById('filter-slider-max');
  const sliderRange = document.getElementById('filter-slider-range');
  const inputMin = document.getElementById('filter-input-min');
  const inputMax = document.getElementById('filter-input-max');
  const clearBtn = document.getElementById('filter-clear-btn');
  const submitBtn = document.getElementById('filter-submit-btn');
  const closeBtn = document.getElementById('filter-close-btn');
  const dismissedNotice = document.getElementById('filter-panel-dismissed');
  const panelBody = document.getElementById('filter-panel-body');
  const reopenBtn = document.getElementById('filter-reopen-btn');

  // Build 32 initial histogram bars
  if (barsContainer) {
    barsContainer.innerHTML = '';
    for (let i = 0; i < 32; i++) {
      const bar = document.createElement('div');
      bar.className = 'filter-hist-bar';
      bar.dataset.index = i;
      barsContainer.appendChild(bar);
    }
  }

  function updateHistogram() {
    const cfg = FILTER_CONFIGS[currentMetric];
    if (!barsContainer || !cfg) return;
    const bars = barsContainer.querySelectorAll('.filter-hist-bar');
    const rangeSpan = cfg.maxBound - cfg.minBound;

    bars.forEach((bar, i) => {
      const heightPx = cfg.bars[i] || 15;
      bar.style.height = `${(heightPx / 60) * 100}%`;

      // Determine bin bounds
      const binStart = cfg.minBound + (i / 32) * rangeSpan;
      const binEnd = cfg.minBound + ((i + 1) / 32) * rangeSpan;

      // Dim bar if entirely outside current [currentMin, currentMax]
      if (binEnd < currentMin || binStart > currentMax) {
        bar.classList.add('is-dimmed');
      } else {
        bar.classList.remove('is-dimmed');
      }
    });
  }

  function updateSliderVisuals() {
    const cfg = FILTER_CONFIGS[currentMetric];
    if (!cfg || !sliderRange) return;
    const rangeSpan = cfg.maxBound - cfg.minBound;
    const leftPct = Math.max(0, Math.min(100, ((currentMin - cfg.minBound) / rangeSpan) * 100));
    const rightPct = Math.max(0, Math.min(100, ((currentMax - cfg.minBound) / rangeSpan) * 100));

    sliderRange.style.left = `${leftPct}%`;
    sliderRange.style.width = `${Math.max(0, rightPct - leftPct)}%`;

    if (thumbMin) {
      thumbMin.style.left = `${leftPct}%`;
      thumbMin.setAttribute('aria-valuenow', currentMin);
      thumbMin.setAttribute('aria-valuemin', cfg.minBound);
      thumbMin.setAttribute('aria-valuemax', currentMax);
    }
    if (thumbMax) {
      thumbMax.style.left = `${rightPct}%`;
      thumbMax.setAttribute('aria-valuenow', currentMax);
      thumbMax.setAttribute('aria-valuemin', currentMin);
      thumbMax.setAttribute('aria-valuemax', cfg.maxBound);
    }

    if (sliderMin) {
      sliderMin.value = currentMin;
    }
    if (sliderMax) {
      sliderMax.value = currentMax;
    }
  }

  function updateInputs() {
    const cfg = FILTER_CONFIGS[currentMetric];
    if (!cfg) return;
    if (inputMin) inputMin.value = cfg.formatVal(currentMin);
    if (inputMax) inputMax.value = cfg.formatVal(currentMax);
  }

  function updateResultsCount() {
    if (!submitBtn) return;
    const matching = SAMPLE_REELS.filter(reel => {
      const val = reel[currentMetric];
      return val >= currentMin && val <= currentMax;
    });
    const count = matching.length;
    submitBtn.textContent = `Show ${count} Reel${count === 1 ? '' : 's'}`;
  }

  function syncAll() {
    updateHistogram();
    updateSliderVisuals();
    updateInputs();
    updateResultsCount();
  }

  function setMetric(metricKey) {
    if (!FILTER_CONFIGS[metricKey]) return;
    currentMetric = metricKey;
    const cfg = FILTER_CONFIGS[metricKey];
    currentMin = cfg.defaultMin;
    currentMax = cfg.defaultMax;

    // Update buttons
    metricBtns.forEach(btn => {
      const isActive = btn.dataset.metric === metricKey;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update slider attributes
    if (sliderMin && sliderMax) {
      sliderMin.min = cfg.minBound;
      sliderMin.max = cfg.maxBound;
      sliderMin.step = cfg.step;

      sliderMax.min = cfg.minBound;
      sliderMax.max = cfg.maxBound;
      sliderMax.step = cfg.step;
    }

    syncAll();
  }

  // Metric button click handlers
  metricBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setMetric(btn.dataset.metric);
    });
  });

  // Dual Slider Pointer Drag Engine (Flawless on Mobile touch and Desktop mouse)
  let activeDragThumb = null;

  function getSliderPercentage(clientX) {
    if (!sliderContainer) return 0;
    const rect = sliderContainer.getBoundingClientRect();
    const relX = clientX - rect.left;
    return Math.max(0, Math.min(1, relX / rect.width));
  }

  function valueFromPercentage(pct) {
    const cfg = FILTER_CONFIGS[currentMetric];
    if (!cfg) return 0;
    const rawVal = cfg.minBound + pct * (cfg.maxBound - cfg.minBound);
    let stepped = Math.round(rawVal / cfg.step) * cfg.step;
    if (cfg.isFloat) {
      stepped = Math.round(stepped * 10) / 10;
    }
    return Math.max(cfg.minBound, Math.min(cfg.maxBound, stepped));
  }

  function updateThumbFromClientX(clientX) {
    const cfg = FILTER_CONFIGS[currentMetric];
    if (!cfg || !activeDragThumb) return;

    const pct = getSliderPercentage(clientX);
    let val = valueFromPercentage(pct);

    if (activeDragThumb === 'min') {
      val = Math.min(val, currentMax - cfg.step);
      val = Math.max(cfg.minBound, val);
      currentMin = val;
    } else if (activeDragThumb === 'max') {
      val = Math.max(val, currentMin + cfg.step);
      val = Math.min(cfg.maxBound, val);
      currentMax = val;
    }
    syncAll();
  }

  function handlePointerDown(e) {
    if (!sliderContainer) return;
    const cfg = FILTER_CONFIGS[currentMetric];
    if (!cfg) return;

    e.preventDefault();
    try {
      sliderContainer.setPointerCapture(e.pointerId);
    } catch (_) {}

    const pct = getSliderPercentage(e.clientX);
    const clickVal = valueFromPercentage(pct);

    if (e.target === thumbMin) {
      activeDragThumb = 'min';
    } else if (e.target === thumbMax) {
      activeDragThumb = 'max';
    } else {
      const distMin = Math.abs(clickVal - currentMin);
      const distMax = Math.abs(clickVal - currentMax);
      if (distMin < distMax) {
        activeDragThumb = 'min';
      } else if (distMax < distMin) {
        activeDragThumb = 'max';
      } else {
        activeDragThumb = clickVal <= (currentMin + currentMax) / 2 ? 'min' : 'max';
      }
    }

    updateThumbFromClientX(e.clientX);

    if (activeDragThumb === 'min' && thumbMin) {
      thumbMin.classList.add('is-dragging');
      thumbMin.style.zIndex = '20';
      if (thumbMax) thumbMax.style.zIndex = '10';
    } else if (activeDragThumb === 'max' && thumbMax) {
      thumbMax.classList.add('is-dragging');
      thumbMax.style.zIndex = '20';
      if (thumbMin) thumbMin.style.zIndex = '10';
    }
  }

  function handlePointerMove(e) {
    if (!activeDragThumb) return;
    e.preventDefault();
    updateThumbFromClientX(e.clientX);
  }

  function handlePointerUp(e) {
    if (!activeDragThumb) return;
    try {
      if (sliderContainer.hasPointerCapture(e.pointerId)) {
        sliderContainer.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    if (thumbMin) thumbMin.classList.remove('is-dragging');
    if (thumbMax) thumbMax.classList.remove('is-dragging');
    activeDragThumb = null;
  }

  if (sliderContainer) {
    sliderContainer.addEventListener('pointerdown', handlePointerDown);
    sliderContainer.addEventListener('pointermove', handlePointerMove);
    sliderContainer.addEventListener('pointerup', handlePointerUp);
    sliderContainer.addEventListener('pointercancel', handlePointerUp);
  }

  // Keyboard accessibility
  function handleThumbKeydown(e, thumbType) {
    const cfg = FILTER_CONFIGS[currentMetric];
    if (!cfg) return;
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      delta = cfg.step;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      delta = -cfg.step;
    } else if (e.key === 'Home') {
      if (thumbType === 'min') currentMin = cfg.minBound;
      else currentMax = currentMin + cfg.step;
      syncAll();
      e.preventDefault();
      return;
    } else if (e.key === 'End') {
      if (thumbType === 'max') currentMax = cfg.maxBound;
      else currentMin = currentMax - cfg.step;
      syncAll();
      e.preventDefault();
      return;
    }

    if (delta !== 0) {
      e.preventDefault();
      if (thumbType === 'min') {
        currentMin = Math.max(cfg.minBound, Math.min(currentMax - cfg.step, currentMin + delta));
      } else {
        currentMax = Math.min(cfg.maxBound, Math.max(currentMin + cfg.step, currentMax + delta));
      }
      syncAll();
    }
  }

  if (thumbMin) {
    thumbMin.addEventListener('keydown', (e) => handleThumbKeydown(e, 'min'));
  }
  if (thumbMax) {
    thumbMax.addEventListener('keydown', (e) => handleThumbKeydown(e, 'max'));
  }

  // Min input text editing
  if (inputMin) {
    inputMin.addEventListener('change', () => {
      const cfg = FILTER_CONFIGS[currentMetric];
      let val = cfg.parseVal(inputMin.value);
      if (isNaN(val)) val = cfg.minBound;
      val = Math.max(cfg.minBound, Math.min(currentMax - cfg.step, val));
      currentMin = val;
      syncAll();
    });
    inputMin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') inputMin.blur();
    });
  }

  // Max input text editing
  if (inputMax) {
    inputMax.addEventListener('change', () => {
      const cfg = FILTER_CONFIGS[currentMetric];
      let val = cfg.parseVal(inputMax.value);
      if (isNaN(val)) val = cfg.maxBound;
      val = Math.min(cfg.maxBound, Math.max(currentMin + cfg.step, val));
      currentMax = val;
      syncAll();
    });
    inputMax.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') inputMax.blur();
    });
  }

  // Clear all button handler
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      setMetric('likes');
    });
  }

  // Primary action button handler
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const originalText = submitBtn.textContent;
      submitBtn.classList.add('is-applied');
      submitBtn.textContent = '✓ Filters Applied';

      trackCROEvent('custom_filter_applied', {
        metric: currentMetric,
        min: currentMin,
        max: currentMax,
        matching_count: SAMPLE_REELS.filter(r => r[currentMetric] >= currentMin && r[currentMetric] <= currentMax).length
      });

      setTimeout(() => {
        submitBtn.classList.remove('is-applied');
        updateResultsCount();
      }, 1400);
    });
  }

  // Close & Reopen handlers
  if (closeBtn && dismissedNotice && panelBody) {
    closeBtn.addEventListener('click', () => {
      panelBody.style.display = 'none';
      dismissedNotice.style.display = 'block';
    });
  }

  if (reopenBtn && dismissedNotice && panelBody) {
    reopenBtn.addEventListener('click', () => {
      dismissedNotice.style.display = 'none';
      panelBody.style.display = 'block';
    });
  }

  // Initial setup
  setMetric('likes');
}

// Initialize continuous CRO A/B experiments, animations, & Cookie banner
function initAllFeatures() {
  initExperiments();
  initCookieBanner();
  initHeroConceptDemo();
  initStatCountUp();
  initStickyNavCTA();
  initCopyMarkdownButtons();
  initPrivacyScopeSwitcher();
  initInteractiveFilterModal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllFeatures);
} else {
  initAllFeatures();
}



