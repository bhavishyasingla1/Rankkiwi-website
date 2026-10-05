# Rank Kiwi Global Visual System & Design Standard

This document is the engineering and design specification for the Rank Kiwi website visual grammar, design tokens, typography, color theory, layout, and component system.

---

## 1. Visual Philosophy & Benchmark

Rank Kiwi is designed to feel:
**clean → minimal → symmetrical → consistent → premium → focused → easy to scan**

The visual benchmark prioritizes:
- **Restrained headline scale** (no giant, inflated headings).
- **Compact navigation density** (quiet, functional navbar).
- **Concise supporting text** (avoiding walls of copy).
- **Strong hierarchy without visual aggression**.
- **Deliberate whitespace and optical symmetry**.
- **Cohesive Rank Kiwi green brand identity** without monochromatic monotony.

---

## 2. Design Tokens

### Color Palette

```css
:root {
  /* Brand Green (Primary Accent) */
  --brand-primary: #01370b;          /* Deep Forest Green (16.5:1 contrast on white) */
  --brand-primary-hover: #084a14;    /* Active / hover state */
  --brand-accent: #cbf990;           /* Signature Kiwi Lime highlight */
  --brand-accent-hover: #baf378;     /* Accent hover */
  --brand-accent-dim: #e4f9c5;       /* Accent subtle */
  --brand-soft: #f2faea;             /* Soft kiwi wash background */
  --brand-border: #d2f2b2;           /* Soft kiwi border */
  --brand-border-strong: rgba(1, 55, 11, 0.2);

  /* Neutrals */
  --surface-page: #ffffff;           /* Clean white */
  --surface-card: #ffffff;           /* Card white */
  --surface-wash: #f8faf6;           /* Subtle warm neutral */
  --surface-muted: #f1f5f9;          /* Neutral slate wash */
  --text-primary: #111827;           /* Main dark text */
  --text-secondary: #374151;         /* Secondary text */
  --text-muted: #475345;             /* Muted copy */
  --text-caption: #64748b;           /* Meta & timestamps */
  --text-inverse: #ffffff;           /* On dark/brand green */
  --border-default: #e3e8e0;         /* Default border */
  --border-strong: #cdd6c8;          /* Emphasized border */

  /* Semantic Status */
  --color-success-text: #166534;
  --color-success-bg: #f0fdf4;
  --color-success-border: #bbf7d0;
  --color-error-text: #991b1b;
  --color-error-bg: #fef2f2;
  --color-error-border: #fee2e2;
  --color-warning-text: #9a3412;
  --color-warning-bg: #fffbeb;
  --color-warning-border: #fde68a;
}
```

### Color Theory Hierarchy
- **Strong Green (`#01370b`)**: Primary CTA button, primary brand moment, high-contrast dark badges.
- **Medium / Lime Accent (`#cbf990`)**: Live status indicators, pill highlight tags, key metrics callout accents.
- **Soft Green (`#f2faea`)**: Feature cards, highlighted table rows, brand callouts, selected states.
- **Neutrals (`#ffffff`, `#f8faf6`, `#111827`, `#475345`)**: Reading surfaces, body text, long-form content.

---

## 3. Global Typography Scale

| Token | Desktop Size | Mobile Size | Line Height | Weight | Role |
|---|---|---|---|---|---|
| `--font-size-display` | `clamp(28px, 3.2vw, 38px)` | `28px` | `1.15` | `800` | Homepage Hero H1 |
| `--font-size-h1` | `clamp(24px, 2.6vw, 32px)` | `24px` | `1.18` | `800` | Standard Page H1 |
| `--font-size-h2` | `clamp(18px, 2vw, 24px)` | `18px` | `1.24` | `700` | Major Section Headings |
| `--font-size-h3` | `16px` | `15px` | `1.35` | `600` | Card Titles / Subsections |
| `--font-size-h4` | `14.5px` | `14px` | `1.4` | `600` | Micro headings |
| `--font-size-lead` | `15px` | `14px` | `1.5` | `400 / 500` | Hero Subtitles / Lede |
| `--font-size-body` | `14px` | `14px` | `1.55` | `400` | Standard Body Paragraphs |
| `--font-size-body-sm`| `13px` | `13px` | `1.5` | `400` | Dense tables / Sidebars |
| `--font-size-label` | `12.5px - 13.5px`| `12px` | `1.2` | `600` | Navigation / Buttons |
| `--font-size-caption`| `11px - 11.5px` | `11px` | `1.2` | `700` | Eyebrows / Status tags |

---

## 4. Spacing & Container System

### Spacing Scale
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-5`: 20px
- `space-6`: 24px
- `space-8`: 32px
- `space-10`: 40px
- `space-12`: 48px
- `space-16`: 64px

### Container Widths
- `wrap-prose` / `container-sm`: `max-width: 740px` (Docs, Research, Methodology)
- `wrap-narrow` / `container-md`: `max-width: 920px` (Hero content, FAQs)
- `wrap` / `container-lg`: `max-width: 1140px` (Grids, tables, full-width layouts)
- Gutter padding: `margin-inline: auto; width: min(1140px, calc(100% - 48px));` (mobile: `calc(100% - 32px)`).

---

## 5. Standard Component Library

### 1. Header (`.site-header`)
- Fixed sticky header, height ~58px.
- Compact navigation links (13.5px font, weight 500).
- Primary brand CTA (`Add to Chrome`) in `.button-small`.
- Accessible mobile drawer toggle (`.menu-toggle`).

### 2. Buttons
- `.button`: Height 40px, background `var(--brand-primary)`, color `#ffffff`, font-size 13.5px, weight 600, radius 6px.
- `.button-small`: Height 34px, font-size 12.5px, padding 0 14px.
- `.button-quiet`: White background, border `1px solid var(--border-strong)`, color `var(--text-primary)`.
- `.text-button`: Inline link with brand-colored hover transition.

### 3. Cards
- `.card` / `.card-default`: Clean white surface, 1px border `var(--border-default)`, radius 10px, 24px padding.
- `.card-muted`: Neutral wash background `var(--surface-wash)`.
- `.card-brand`: Soft kiwi wash `var(--brand-soft)` with border `var(--brand-border)`.
- `.card-highlight`: Deep forest green `var(--brand-primary)` with white text and kiwi lime accents.

### 4. Footer (`.site-footer`)
Standard 5-column information architecture across all 48 pages:
1. **Brand & Socials**: Logo, positioning, author link, creator social channels.
2. **Product**: Home, Instagram Analytics, YouTube Analytics, Outlier Score, Creator Research.
3. **Learn & Docs**: Documentation, Getting Started, Troubleshooting, Workflows.
4. **Compare & Research**: All Comparisons, Alternatives Hub, Best Tools, Research Hub.
5. **Legal & Support**: Privacy Policy, Terms of Service, Disclaimer, Support Email.

---

## 6. Accessibility & Performance Guardrails
- All text meets WCAG AA / AAA contrast standards (minimum 4.5:1, brand button is 16.5:1).
- Clear `:focus-visible` outline rings on all interactive elements.
- Semantic HTML heading hierarchy (strictly one `<h1>` per page, sequential `<h2>` and `<h3>`).
- 0 JavaScript overhead introduced; pure CSS tokens and responsive flex/grid layouts.
