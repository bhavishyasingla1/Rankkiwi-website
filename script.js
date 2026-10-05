/* Rank Kiwi Interactive Script */

const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl?utm_source=item-share-cb';
const SUPPORT_EMAIL = 'say@hibhavishya.in';

// Chrome Web Store links handler
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
    link.setAttribute('aria-label', 'Add Rank Kiwi to Chrome');
  }
});

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
let currentStep = 1;
let carouselTimer = null;

function setWorkflowStep(stepNum) {
  currentStep = stepNum;
  workflowSteps.forEach((step) => {
    step.classList.toggle('active', parseInt(step.dataset.step, 10) === stepNum);
  });
  carouselImages.forEach((img) => {
    img.classList.toggle('active', parseInt(img.dataset.step, 10) === stepNum);
  });
}

function startWorkflowRotation() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    const next = currentStep >= 3 ? 1 : currentStep + 1;
    setWorkflowStep(next);
  }, 3200);
}

if (workflowSteps.length > 0 && carouselImages.length > 0) {
  workflowSteps.forEach((step) => {
    step.addEventListener('click', () => {
      const stepNum = parseInt(step.dataset.step, 10);
      setWorkflowStep(stepNum);
      startWorkflowRotation();
    });
  });

  const stepsLayout = document.querySelector('.steps-layout');
  if (stepsLayout) {
    stepsLayout.addEventListener('mouseenter', () => {
      if (carouselTimer) clearInterval(carouselTimer);
    });
    stepsLayout.addEventListener('mouseleave', () => {
      startWorkflowRotation();
    });
  }

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
