# Arie Classic Events — editable website

Official domain: https://arieclassicevents.com/

This is a static website built with HTML, CSS, and vanilla JavaScript. No build process or package installation is required.

## 1. Run it locally
1. Download and extract the project ZIP.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension for a local preview.
4. Edit `index.html`, `styles.css`, and `script.js`. Refresh the browser to see changes.

## 2. Replace the image placeholders
The `images/` directories contain SVG placeholders, not real cake or event photographs. Replace these with your own optimized images.

Suggested workflow:
- Put the hero photo in `images/hero/`.
- Put cake images in `images/cakes/`.
- Put decoration images in `images/events/`.
- Put gallery images in `images/gallery/`.
- Put the About image in `images/about/`.

Update the corresponding `src` values in `index.html` and the hero background URL in `styles.css`. Keep descriptive filenames, use WebP or AVIF when practical, and use meaningful alt text. If you rename an image, update every reference to it.

The social share image should ideally be a real public 1200 × 630 image; update `og:image`, `twitter:image`, and the structured social image reference before launch.

## 3. Change the carousel
Open `script.js`. At the top, change:
`carouselIntervalMs: 3000`
- `3000` means 3 seconds.
- `5000` means 5 seconds.

The carousel has previous/next controls, dots, swipe gestures, pause/resume, hover/focus pause, and reduced-motion support. Add or remove slide figures and matching dots in `index.html` together.

## 4. Configure WhatsApp
The floating WhatsApp CTA uses `CONFIG.whatsappNumber` and `CONFIG.whatsappMessage` in `script.js`.

- `whatsappNumber` must be the correct WhatsApp-enabled number in international format with digits only, no `+`, spaces, or dashes.
- Verify the number is WhatsApp-enabled before publishing.
- Change the prefilled message to suit your enquiry process.

The current value uses the existing primary contact number, +256 701 983 907. Confirm that this is the intended WhatsApp number before launch.

## 5. Configure tracking IDs
Open `script.js`, then edit:
- `CONFIG.analytics.ga4MeasurementId` — Google Analytics 4 ID, format `G-XXXXXXXXXX`
- `CONFIG.pixels.metaPixelId` — Meta Pixel ID, digits only
- `CONFIG.pixels.tiktokPixelId` — TikTok Pixel ID from TikTok Ads Manager

Leave a value empty until you have the correct ID. The script loaders only activate when an ID passes basic format checks. This is not a substitute for consent management or privacy compliance. Before activating advertising/analytics tags, add an appropriate privacy notice and consent controls for the jurisdictions and audiences relevant to the business, and confirm the current platform requirements. Verify with Google Tag Assistant, Meta Pixel Helper, and TikTok Pixel Helper / Events Manager.

Google Search Console verification placeholder is in `index.html` inside the `<head>`. Paste the exact meta tag/token supplied by Search Console.

## 6. SEO, GEO and indexing checklist
The project includes:
- Descriptive title and meta description.
- Canonical URL for `https://arieclassicevents.com/`.
- Open Graph and Twitter metadata.
- JSON-LD structured data for the business and services.
- `robots.txt` and `sitemap.xml`.
- Semantic HTML and descriptive image alt text.
- Local service and location information in visible content.

Before launch:
1. Confirm the domain points to your host and HTTPS works.
2. Replace all image placeholders and update the social image URL.
3. Verify the physical address and phone numbers are accurate.
4. Check that no `noindex` directive or hosting rule blocks crawlers.
5. In Google Search Console, verify the domain property and submit `https://arieclassicevents.com/sitemap.xml`.
6. Inspect the homepage URL and request indexing after publishing.
7. Validate structured data with Google's Rich Results Test / Schema Markup Validator.
8. Keep the Google Business Profile information accurate and consistent with the site.
9. Add original useful content about the real services, cake ordering process, event types, service area, lead times, and FAQs. Do not publish made-up claims, locations, reviews, or prices.
10. Re-test mobile usability, performance, image loading, links, and analytics after deployment.

SEO/GEO note: no code can guarantee indexing, top rankings, or citations by AI systems. Google's published guidance says ordinary SEO fundamentals and useful, reliable, original content remain important for AI Search features. Avoid fake reviews, keyword stuffing, hidden text, or pages generated solely to manipulate rankings.

## 7. Domain and hosting
Deploy this folder to your chosen static host (Netlify, Vercel, or another provider). Connect `arieclassicevents.com` in the host's domain settings and follow the host's DNS instructions exactly. Do not change DNS records without checking the instructions for your domain registrar and hosting provider.

The canonical URL and sitemap currently use the apex domain `https://arieclassicevents.com/`. If you choose `www` as the canonical host, update canonical, structured data URLs, Open Graph URL, robots.txt, and sitemap.xml consistently, and configure a redirect from the other version.

## 8. Known limitations / checks
- The photographs are placeholders and must be replaced.
- The supplied customer testimonials are preserved from the reference site; confirm permission and accuracy before publishing.
- The address and phone details were supplied for this project; confirm they remain current.
- A real cookie/consent manager is not included. Add one appropriate to your actual tracking and legal requirements before enabling advertising pixels.
- Google indexing and ranking are not guaranteed. Submit the site and monitor Search Console after deployment.
- Browser-based visual and cross-device tests should be completed on the deployed site.


## Updated image paths

The HTML and CSS now use the real photographs in the `images/about`, `images/cakes`, `images/events`, `images/gallery`, and `images/hero` folders. Do not move those folders unless you also update the paths in `index.html` and `styles.css`.
