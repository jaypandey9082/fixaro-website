# Fixaro AC Service Company Website

Premium Next.js website for Fixaro AC Service Company in Bangalore / Bengaluru.

## Commands

```bash
npm install
npm run dev
npm run build
npm run start
```

Local development usually runs at:

```bash
http://localhost:3000
```

## Environment

Set the public production site URL before deployment:

```bash
NEXT_PUBLIC_SITE_URL=https://fixarosolutions.com
```

## Where To Update Content

- Services and prices: `lib/data.ts`
- Phone numbers: `lib/data.ts` and `lib/whatsapp.ts`
- WhatsApp number: `lib/whatsapp.ts`
- Service areas: `lib/data.ts`
- SEO config: `lib/seo.ts`
- Logo and images: `public/images`

## Booking Form Location Sharing

Customers can tap "Use My Current Location" to add an approximate Google Maps link to the WhatsApp booking message. The website requests location only after that click, does not store it in browser storage, and does not send it to any server or API.

## Deployment Notes

- Deploy from a private GitHub repo.
- Connect the custom domain `fixarosolutions.com`.
- Set `NEXT_PUBLIC_SITE_URL=https://fixarosolutions.com` in the hosting environment.
- Test `/sitemap.xml`.
- Test `/robots.txt`.
- Test WhatsApp links.
- Test call links.
- Test the complete mobile booking journey on Android Chrome and iPhone Safari.

## Brand Guardrail

Do not add fake reviews or fake ratings. Add real Google reviews only after connecting a verified source later.
