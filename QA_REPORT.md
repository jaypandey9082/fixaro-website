# Fixaro Website QA Report

Date: 2026-06-29

## 1. Summary Verdict

The Fixaro website is code-ready for launch after the pricing-note fix in this QA pass. Core customer journeys, mobile layout, booking form message generation, service areas, service pages, SEO metadata, sitemap, robots, build, lint, and Lighthouse production checks passed.

Launch readiness is **Not Ready** only because `https://www.fixarosolutions.com` currently fails HTTPS certificate validation. Also, the final acceptance criteria requires 5 real user tests, which still need to be completed with `USER_TESTING_SCRIPT.md`.

## 2. Tested Routes

Tested locally on the production build and/or dev server:

- `/`
- `/#services`
- `/#pricing`
- `/#warranty`
- `/#service-areas`
- `/#contact`
- `/services/essential-ac-service`
- `/services/deep-cleaning-service`
- `/services/water-leakage-service`
- `/services/dust-removal-service`
- `/services/ac-checkup-inspection`
- `/services/power-issue-repair`
- `/services/stabilizer-fitting`
- `/services/less-no-cooling-repair`
- `/services/complete-gas-charging`
- `/services/gas-top-up`
- `/services/split-ac-installation`
- `/services/split-ac-uninstallation`
- `/ac-service-bangalore`
- `/ac-repair-bangalore`
- `/ac-gas-refilling-bangalore`
- `/ac-installation-bangalore`
- `/sitemap.xml`
- `/robots.txt`
- `/services/random-invalid-service`

Result: valid pages loaded, service/local pages had one H1, invalid service route returned the custom 404, sitemap and robots loaded.

## 3. Mobile Test Results

Tested widths: `360`, `375`, `390`, `414`, `430`, `768`.

Result: passed.

- No page-level horizontal scroll.
- Header is compact.
- Hero CTA appears early.
- Hero has no price cards.
- Inputs measured at 16px minimum font size.
- Sticky mobile CTA is present.
- Booking form, FAQ, pricing cards, service cards, warranty, service areas, and footer are usable.

## 4. Desktop Test Results

Tested widths: `1024`, `1280`, `1440`.

Result: passed.

- No page-level horizontal scroll.
- Header alignment, hero balance, service grid, pricing table, problem grid, warranty, service areas, booking two-column layout, and footer columns render correctly.

## 5. WhatsApp / Call Test Results

Result: passed.

- Main call href: `tel:+919187972801`.
- Second call href: `tel:+919187972802`.
- WhatsApp base: `https://wa.me/919187972801?text=`.
- WhatsApp links are generated through `createWhatsAppUrl`, which uses `encodeURIComponent`.
- Shared external CTA component applies `target="_blank"` and `rel="noopener noreferrer"`.
- Tested hero, service card, pricing, problem card, warranty support, service area, booking form, footer, and mobile sticky CTA link paths.

## 6. Booking Form Test Results

Result: passed.

Dummy booking submitted up to generated WhatsApp URL only. No WhatsApp message was sent.

Generated message included:

- Name: Test User
- Phone: 9876543210
- Area: Banaswadi
- Full address
- Landmark
- Pincode
- Google Maps link
- Service category: AC Service
- Service: Deep Cleaning Service
- Price shown: `₹649`
- Warranty: `15 Days Service Warranty`
- AC type: Split AC
- Brand: LG
- Preferred date/time
- Issue: Bad smell and low airflow
- Final line asks Fixaro to confirm availability.

Other-area flow:

- `Other` reveals the custom area field.
- Submitting without custom area triggers validation.
- Adding `Test Nagar` clears the custom area error.

Location flow:

- Code only uses `navigator.geolocation.getCurrentPosition`.
- It only fills a Google Maps link.
- No reverse geocoding, Google Maps API key, localStorage, or sessionStorage usage found.

## 7. SEO Test Results

Result: passed, except live www certificate issue listed below.

- Homepage title: `Fixaro AC Service Company | AC Service & Repair in Bangalore`.
- Homepage description is relevant.
- Service and local SEO pages have unique titles/descriptions.
- One H1 per content page.
- Sitemap includes homepage, service pages, and local SEO pages.
- Robots allows crawling and points to `https://fixarosolutions.com/sitemap.xml`.
- No localhost URLs found in rendered metadata, canonical URLs, sitemap, or robots.
- JSON-LD types verified: `HVACBusiness`, `Service`, `BreadcrumbList`, `FAQPage`.
- JSON-LD does not include fake reviews, ratings, address, opening hours, geo coordinates, or aggregateRating.

## 8. Accessibility Issues

Result: no blocking accessibility issues found.

- Form fields have labels.
- Required fields are visible.
- Errors are readable.
- Buttons and links use real interactive elements.
- Icon-only menu button has aria-label and aria-expanded.
- FAQ accordions use aria-expanded.
- Focus-visible styles are present.
- Tap targets are sized for mobile.
- Reduced motion is respected in motion components.
- Lighthouse accessibility score on production local build: `99`.

## 9. Performance Issues

Production Lighthouse on local `next start`:

- Performance: `92`
- Accessibility: `99`
- Best Practices: `100`
- SEO: `100`

No console warnings or errors were reported by Playwright console inspection. Development-only React DevTools/HMR logs appeared only while using `next dev`.

## 10. Bugs Found

1. Pricing section extra-charge note was too narrow for launch QA expectations.
   - It mentioned spare parts and extra materials, but not the full extra-charge list.

2. Live `www` domain fails HTTPS certificate validation.
   - `https://www.fixarosolutions.com` returned curl SSL error: certificate subject name does not match `www.fixarosolutions.com`.
   - This is a DNS/Vercel/domain certificate configuration issue, not a code issue.

## 11. Bugs Fixed

1. Updated the pricing section to use the shared `globalPriceNote`.
   - Pricing now clearly mentions spare parts, copper pipe, outdoor stand, drain pipe, electrical wire, gas leakage repair, core cutting, and replaced parts are charged extra after customer approval.

## 12. Remaining Recommendations

- Fix `www.fixarosolutions.com` DNS/certificate in hosting configuration.
- Complete 5 real mobile user tests using `USER_TESTING_SCRIPT.md`.
- Submit sitemap in Google Search Console.
- Request indexing for homepage, main local SEO pages, and top service pages.
- After deployment, rerun Lighthouse on the live production domain.

## 13. Launch Readiness Status

Status: **Not Ready**

Reason: code is ready, but `www.fixarosolutions.com` HTTPS certificate validation fails and 5 real user tests have not yet been completed.

