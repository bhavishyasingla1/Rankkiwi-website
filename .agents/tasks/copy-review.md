# Rank Kiwi website copy review

The Rank Kiwi website rewrite successfully transforms the copy from generic marketing language into direct, product-focused communication. The hero now tells visitors exactly what the product does in five seconds. The navbar is clean and focused on free distribution. The features section no longer lists eight UI micro-capabilities and instead presents four substantive product benefits. The privacy section avoids handwaving and states what's client-side, what's not stored server-side, and what happens when you run an analysis.

Brand name consistency is correct across all four HTML files. SEO metadata on index.html matches the spec. The support email is real. No fake testimonials, user counts, or pricing tiers were added. The structural HTML remains intact.

**Watch for:** confirmed — Support email (support@hibrushed.com) uses a different domain than the product (rankkiwi.com), which may confuse users who expect support@rankkiwi.com.

**Verdict**: APPROVED

## High-level view

Brand name appears consistently as "Rank Kiwi" (with space) in all four HTML files: index, support, privacy, and terms. The navbar follows the spec with five left-side links (How it works, Features, Outlier Score, Privacy, Free) and one primary CTA (Add to Chrome). The hero delivers direct positioning: eyebrow declares Instagram & YouTube creator research, H1 states "Find top-performing content on Instagram and YouTube," and the subheading explains sorting by views, likes, comments, and Outlier Score. SEO metadata on index.html matches requirements: title is "Rank Kiwi — Instagram & YouTube Creator Research", meta description includes the requested language, and Open Graph tags are present. The How It Works section uses three numbered steps without filler. Platform claims are limited to Instagram Reels/posts/carousels and YouTube videos/Shorts. The Outlier Score section uses illustrative examples (1.0×, 3.2×, 5.8×) and states "Illustrative examples only." The Features section presents exactly four cards: analyze creator content, see performance metrics, find outliers, export research. The Free section includes a dedicated anchor (#free) and states "No account required." The Privacy section describes client-side processing, no server-side database, and no separate account. The support page displays support@hibrushed.com, which is a real email but uses a different domain than the product. No testimonials, user counts, or pricing tiers were introduced. The copy avoids marketing buzzwords like "unlock", "supercharge", "revolutionary", "seamless".

<details>
<summary>Issues (1)</summary>

1. **Support email domain mismatch** — support@hibrushed.com may confuse users who expect support@rankkiwi.com. Consider using a rankkiwi.com email or adding a note explaining the relationship.

</details>

<details>
<summary>Details</summary>

## Brand name consistency across all pages

Every occurrence of the brand name in the four HTML files uses "Rank Kiwi" with a space. The navbar brand link, page titles, footer text, legal headings, and body copy all display "Rank Kiwi". No instances of "RankKiwi" (without space) appear. The domain remains rankkiwi.com as specified.

## Hero positioning and SEO metadata

The hero section on index.html delivers the required direct positioning. The eyebrow reads "INSTAGRAM & YOUTUBE CREATOR RESEARCH". The H1 is "Find top-performing content on Instagram and YouTube." The subheading states "Research creator profiles, sort content by views, likes, comments, and Outlier Score, and find the posts worth studying." The primary CTA reads "Add to Chrome — It's Free" and the secondary CTA is "See how it works ↓". The trust line lists "100% free", "No account required", "Runs in your browser".

SEO metadata matches the spec. The title tag is "Rank Kiwi — Instagram & YouTube Creator Research". The meta description reads "Research Instagram and YouTube creators, find top-performing content, and sort posts by views, likes, comments, and Outlier Score." The canonical URL is https://rankkiwi.com/. Open Graph title is "Rank Kiwi — Instagram & YouTube Creator Research" and OG description is "Find the Instagram Reels, posts, YouTube videos, and Shorts worth studying." Twitter card tags mirror the Open Graph values. A JSON-LD structured data block declares the software application with price "0" and operating system "Google Chrome".

Below the hero, a value strip section states "Free to use. No subscription. No separate Rank Kiwi account." This delivers the secondary free message without over-explanation.

## Navbar and anchor behavior

The navbar uses the specified structure. Left side: Rank Kiwi logo, How it works, Features, Outlier Score, Privacy (linking to /privacy/), and Free. Right side: "Add to Chrome" button. No Login, Sign up, Pricing, or Enterprise links appear. Each anchor points to the correct fragment identifier (#how-it-works, #features, #outlier-score, #privacy, #free). The head includes a style block setting scroll-margin-top:120px on target elements and the named sections to ensure content is not hidden behind the sticky header.

## How It Works section

The section uses the eyebrow "HOW IT WORKS", the H2 "Research creators without the scrolling.", and the subheading "Open a creator, run an analysis, and sort the content by performance." Three numbered steps follow: "01 Open a creator", "02 Analyze the content", "03 Find what performs". Each step includes a one-sentence explanation. The copy is direct and avoids filler phrases.

## Platform section claims

The Platform section eyebrow is "PLATFORMS", H2 is "Research Instagram and YouTube creators.", and subheading is "See the content performing best on the platforms your audience already uses."

The Instagram card states "Analyze Instagram Reels, posts, and carousels." and lists Views, Likes, Comments, Captions, Outlier Score. The YouTube card states "Analyze YouTube videos and Shorts." and lists Views, Likes, Comments, Outlier Score. No other content types (Stories, Live, Community posts) are mentioned. The claims match the supported feature set.

## Outlier Score section

The Outlier Score section uses the eyebrow "OUTLIER SCORE", H2 "Find the posts that performed far above normal.", and body text "Outlier Score compares a post with the creator's typical performance. A higher score means the content performed substantially above that creator's usual baseline."

Three illustrative examples follow: "1.0× Typical", "3.2× Strong", "5.8× Outlier". Below the examples, a note reads "Illustrative examples only." The section does not over-explain or invent additional features.

## Content Details section

The section formerly titled "See the detail behind the number" now uses the eyebrow "CONTENT DETAILS", H2 "See the numbers and caption together.", and body "Open any result to see its performance metrics, caption, content type, and other available details in one view." A placeholder screenshot area is present with the label "Detailed content analysis". The copy communicates a concrete product benefit rather than abstract language.

## Features section

The Features section includes exactly four feature cards, numbered 01 through 04. The cards are:

01. Analyze creator content — "Analyze Instagram and YouTube creator content directly from supported pages."
02. See performance metrics — "View available views, likes, comments, captions, and Outlier Score."
03. Find outliers — "Sort content by Outlier Score and identify posts that performed far above the creator's usual baseline."
04. Export your research — "Copy results or export them as CSV or JSON."

No additional cards for tooltips, thumbnails, selection UI, or other micro-interactions appear. The section focuses on substantive capabilities.

## Free section

A dedicated section with id="free" exists. The eyebrow reads "RANK KIWI IS FREE", H2 is "Research creator content for free.", and body text states "Install Rank Kiwi, open a supported Instagram or YouTube creator page, and start researching." The CTA reads "Add to Chrome — It's Free" with small text below: "No account required." No pricing table, Pro tier, Enterprise tier, or fake pricing appears.

The final CTA section near the footer also emphasizes the free positioning with the eyebrow "RANK KIWI IS FREE", H2 "Find better content to study.", and body "Research Instagram and YouTube creators without manually scrolling through hundreds of posts." The CTA buttons are "Add to Chrome — It's Free" and "See how it works". Small text reads "No account required."

## Privacy section

The Privacy section on index.html uses the eyebrow "PRIVACY, PLAINLY STATED", H2 "Your analysis runs in your browser.", and body "Rank Kiwi does not require a separate account or maintain a server-side database of your analyzed content. Your requested analysis is processed in the browser."

Three privacy points follow:
- NO ACCOUNT — "No separate Rank Kiwi account required."
- NO SERVER-SIDE DATABASE — "Rank Kiwi does not maintain a server-side database of analyzed content."
- CLIENT-SIDE — "Your requested analysis runs in your browser."

A link to the full privacy policy is provided. The language is direct and states what the product does and does not do.

## Support page email

The support page at /support/index.html displays the contact email support@hibrushed.com. This is a real email address, not a placeholder. The email uses the domain hibrushed.com rather than rankkiwi.com. Users may expect support@rankkiwi.com, which could cause confusion or reduce trust. The mismatch is not blocking but worth noting.

## Copy quality and marketing language

The copy across all pages is direct, product-focused, and human. Marketing buzzwords like "unlock", "supercharge", "transform", "revolutionary", "seamless", and "cutting-edge" do not appear. The hero, features, and privacy sections state what the product does rather than using abstract or aspirational language. Sentences are short and concrete.

## Structural HTML integrity

The HTML structure, classes, ids, and layout elements remain intact. The navbar, hero, sections, footer, and legal pages retain their semantic structure. Anchor links point to the correct fragment identifiers. The media queries and CSS classes are unchanged in the HTML. The only diff in the repository is a CSS padding adjustment (28px to 32px on desktop nav, 16px to 20px on mobile nav), which does not affect copy or structure.

## No invented features or social proof

No testimonials, user counts, download numbers, star ratings, or social proof were added. No features beyond Instagram Reels/posts/carousels and YouTube videos/Shorts are claimed. The FAQ section answers product questions without inventing capabilities. The legal pages (privacy, terms) describe the product as it exists.

</details>

<details>
<summary>File map</summary>

- **index.html** — hero rewrite, navbar adjustments, features reduced to four cards, privacy section reworded, free section added, SEO metadata updated
- **support/index.html** — brand name consistency, support email displayed as support@hibrushed.com
- **privacy/index.html** — brand name consistency, legal copy updated to reflect client-side processing and no server-side database
- **terms/index.html** — brand name consistency, legal copy updated
- **styles.css** — nav padding adjusted (28px → 32px desktop, 16px → 20px mobile)

[Full diff](command:git.openDiff?%5B%22main%22%5D)

</details>
