/* Set this once when the published Chrome Web Store URL is available. */
const CHROME_STORE_URL = '[CHROME WEB STORE URL PLACEHOLDER]';

/*
 * Drop final RankKiwi screenshots here. Each key matches a data-screenshot-slot
 * in index.html, so assets can be replaced without changing the page layout.
 */
const PRODUCT_SCREENSHOTS = {
  hero: null,
  'how-it-works': null,
  showcase: null,
};

Object.entries(PRODUCT_SCREENSHOTS).forEach(([slot, image]) => {
  if (!image?.src) return;
  const frame = document.querySelector(`[data-screenshot-slot="${slot}"]`);
  if (!frame) return;
  const preview = document.createElement('img');
  preview.className = 'shot-image';
  preview.src = image.src;
  preview.alt = image.alt || 'RankKiwi product screenshot';
  preview.loading = image.loading || 'lazy';
  frame.querySelector('.shot-empty')?.replaceWith(preview);
});

document.querySelectorAll('[data-chrome-link]').forEach((link) => {
  link.href = CHROME_STORE_URL;
  if (CHROME_STORE_URL.startsWith('[')) {
    link.addEventListener('click', (event) => event.preventDefault());
    link.setAttribute('aria-label', 'Chrome Web Store link will be added soon');
  }
});

const header = document.querySelector('[data-header]');
const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

const menuButton = document.querySelector('[data-menu-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  menuButton.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  menuButton?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const delay = entry.target.dataset.delay || '0';
    entry.target.style.transitionDelay = `${delay}ms`;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

// Workflow carousel: auto-rotate every 2 seconds and allow clicking steps
const workflowSteps = document.querySelectorAll('#workflow-steps .step');
const carouselImages = document.querySelectorAll('.carousel-image');
let currentStep = 1;
let carouselInterval;

function showStep(stepNumber) {
  currentStep = stepNumber;
  
  // Update step active state
  workflowSteps.forEach(step => {
    step.classList.toggle('active', parseInt(step.dataset.step) === stepNumber);
  });
  
  // Update image visibility
  carouselImages.forEach(img => {
    img.classList.toggle('active', parseInt(img.dataset.step) === stepNumber);
  });
}

function nextStep() {
  const next = currentStep >= 3 ? 1 : currentStep + 1;
  showStep(next);
}

// Auto-rotate every 2 seconds
function startCarousel() {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(nextStep, 2000);
}

// Click step to show corresponding screenshot
workflowSteps.forEach(step => {
  step.addEventListener('click', () => {
    const stepNumber = parseInt(step.dataset.step);
    showStep(stepNumber);
    // Restart auto-rotation after manual click
    startCarousel();
  });
});

// Start carousel if elements exist
if (workflowSteps.length > 0 && carouselImages.length > 0) {
  startCarousel();
}
