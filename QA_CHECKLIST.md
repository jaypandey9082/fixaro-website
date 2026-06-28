# Fixaro Launch QA Checklist

Domain: `fixarosolutions.com`  
WWW: `www.fixarosolutions.com`  
Main: `+91 91879 72801` / `tel:+919187972801`  
Second: `+91 91879 72802` / `tel:+919187972802`  
WhatsApp: `919187972801`

## 1. Mobile Viewport Checks

- Check `360`, `375`, `390`, `414`, `430`, and `768` px widths.
- Confirm no horizontal scrolling.
- Confirm text, buttons, cards, images, and forms fit inside the screen.
- Confirm sticky CTA does not hide important buttons or footer links.

## 2. Header/Menu Checks

- Confirm mobile menu opens and closes.
- Confirm menu includes Home, Services, Pricing, Warranty, Service Areas, Contact, Call Now, and WhatsApp Booking.
- Confirm homepage links scroll to the correct sections.
- Confirm inner-page links return to `/#services`, `/#pricing`, `/#warranty`, `/#service-areas`, and `/#contact`.

## 3. Hero Checks

- Confirm hero has no price cards.
- Confirm H1 says `Premium AC Service & Repair at Your Doorstep`.
- Confirm CTA buttons are visible early on mobile.
- Confirm trust badges remain readable.
- Confirm AC visual does not overflow.

## 4. Service Cards Checks

- Confirm service cards show correct price, warranty, duration, and image.
- Confirm only preview services show by default.
- Confirm View All Services works.
- Confirm Book buttons open WhatsApp with the right service message.
- Confirm View Details opens the service detail page.

## 5. Pricing Checks

- Confirm prices match `lib/data.ts`.
- Confirm mobile pricing uses cards, not a cramped table.
- Confirm category filters fit on mobile.
- Confirm price note says extra materials/spares are charged after approval.

## 6. Problem Section Checks

- Confirm six common problems show by default.
- Confirm View More Problems expands and collapses.
- Confirm problem-card prices and warranty notes are consistent with service data.
- Confirm WhatsApp help links use `919187972801`.

## 7. Warranty Checks

- Confirm "Warranty up to 60 Days" does not imply every service gets 60 days.
- Confirm AC Check-up / Inspection says No Warranty.
- Confirm gas warranty clearly says leak-free system only.
- Confirm installation warranty says workmanship warranty.
- Confirm exclusion note is visible.

## 8. Service Areas Checks

- Confirm featured areas are visible by default.
- Confirm hidden areas are searchable.
- Confirm availability wording says technician slots and exact location.
- Confirm area WhatsApp links use the main WhatsApp number.

## 9. Area Selector Checks

- Confirm booking form area selector is compact.
- Confirm initial list shows featured areas plus Other.
- Search `Lingarajapuram` and confirm it appears.
- Search `Fraser` and confirm `Frazer Town` appears.
- Select `Other` and confirm custom area input appears.
- Confirm custom area is required only when Other is selected.

## 10. Booking Form Checks

- Confirm Name, Phone, Area, Full address, Service category, Service, and AC type validation.
- Confirm Pincode is optional but must be 6 digits if filled.
- Confirm Google Maps link is optional.
- Confirm Use My Current Location only fills Google Maps link.
- Confirm location is not stored in `localStorage` or `sessionStorage`.
- Confirm no reverse geocoding or Google Maps API key is used.
- Confirm WhatsApp message includes final area, full address, price, warranty, preferred slot, and issue.

## 11. WhatsApp/Call Checks

- Confirm main call links use `tel:+919187972801`.
- Confirm second call links use `tel:+919187972802`.
- Confirm all WhatsApp links use `https://wa.me/919187972801?text=`.
- Confirm WhatsApp messages are readable and encoded.
- Confirm external WhatsApp links use `target="_blank"` and `rel="noopener noreferrer"`.

## 12. FAQ Checks

- Confirm preview FAQs show by default.
- Confirm View More FAQs works.
- Confirm accordion controls are easy to tap.
- Confirm FAQ JSON-LD has no fake reviews or ratings.

## 13. Footer Checks

- Confirm footer links are readable on mobile.
- Confirm phone links are correct.
- Confirm no fake address, GST, ratings, certifications, or review counts appear.
- Confirm sticky CTA does not hide footer content.

## 14. Service Detail Page Checks

- Check all `/services/[slug]` pages.
- Confirm unknown service slug returns 404.
- Confirm one H1, unique metadata, breadcrumbs, correct price, warranty, duration, FAQs, related services, WhatsApp CTA, and Call CTA.

## 15. Local SEO Page Checks

- Check `/ac-service-bangalore`, `/ac-repair-bangalore`, `/ac-gas-refilling-bangalore`, and `/ac-installation-bangalore`.
- Confirm one H1 and unique metadata per page.
- Confirm pricing, warranty, FAQ, WhatsApp CTA, and Call CTA are relevant.
- Confirm no keyword stuffing or fake claims.

## 16. SEO/Sitemap/Robots Checks

- Confirm `NEXT_PUBLIC_SITE_URL=https://fixarosolutions.com`.
- Confirm sitemap includes homepage, service pages, and local SEO pages.
- Confirm robots allows crawling and points to sitemap.
- Confirm canonical/metadata URLs do not use localhost.
- Confirm JSON-LD has no fake address, geo, hours, reviews, ratings, awards, or certifications.
- Confirm Google Search Console is set up for `fixarosolutions.com`.
- Confirm Google Search Console can inspect the homepage, sitemap, and key service pages.
- Confirm `/sitemap.xml` returns URLs on `https://fixarosolutions.com`.
- Confirm `/robots.txt` points to `https://fixarosolutions.com/sitemap.xml`.

## 16A. WWW Domain Checks

- Open `https://www.fixarosolutions.com/`.
- Confirm www redirects to `https://fixarosolutions.com/` or resolves correctly.
- Confirm www does not return 502.
- Confirm Search Console coverage includes the www behavior.

## 17. Performance Checks

- Confirm no remote competitor images.
- Confirm images have dimensions or reserved space.
- Confirm animations are subtle and reduced-motion friendly.
- Confirm inputs use at least 16px font size.
- Confirm build output has no broken routes.

## 18. Accessibility Checks

- Confirm one H1 per page.
- Confirm buttons and links have labels.
- Confirm icon-only buttons have aria labels.
- Confirm mobile menu uses `aria-expanded`.
- Confirm accordion buttons use `aria-expanded`.
- Confirm form labels and errors are readable.
- Confirm focus states are visible.
- Confirm no keyboard traps.

## 19. GitHub Readiness Checks

- Confirm repo can remain private.
- Confirm `.gitignore` excludes `node_modules`, `.next`, `out`, `.env`, `.env.local`, `.env.production`, `.vercel`, `.DS_Store`, and debug logs.
- Confirm README has setup, deployment, and environment notes.
- Confirm no secrets or API keys are committed.

## 20. Final Launch Checklist

- Run `npm run lint`.
- Run `npm run build`.
- Open homepage locally.
- Open key service pages locally.
- Open local SEO pages locally.
- Open `/not-found-test` locally and confirm the 404 page appears.
- Test Call Now.
- Test WhatsApp.
- Fill booking form.
- Test mobile menu.
- Test service area search.
- Test sitemap and robots.
- Deploy.
- Connect `fixarosolutions.com`.
- Retest the mobile booking journey on the live domain.
