# Productized Solutions Implementation Plan

## Current state

- Vite/React Router SPA with bilingual route helpers, reusable layout, existing service/case study/blog pages, and real contact/blog/client APIs.
- `SEOHead` updates document metadata after hydration; the build previously emitted one SPA shell and the sitemap used one package timestamp for every URL.
- The homepage led with custom engineering content and did not clearly separate ready solutions from custom work.

## Implemented scope

- Centralized typed catalog in `src/data/solutions.ts` for six solutions, SAN Site packages, prices, renewal values, feature scope, FAQs, route slugs, and SEO copy.
- Added bilingual `/solusi`, `/en/solutions`, six solution detail routes, `/harga`, and `/en/pricing`.
- Added reusable solution cards, SAN Site pricing cards, path-selection, custom engineering, process, and pricing summary components.
- Reordered the homepage around two buyer paths while retaining genuine trust, client, case study, FAQ, and contact sections.
- Added query-based contact preselection and structured WhatsApp messages without sending PII to analytics.

## SEO and delivery approach

- Kept the Vite architecture; no framework migration.
- Added `scripts/generate-static-pages.mjs` to emit route-specific HTML shells after Vite build with title, description, canonical, hreflang, JSON-LD, and a meaningful H1 before React hydration.
- Removed invented sitemap timestamps and deprecated priority/changefreq output; added the new canonical public routes and kept dashboard routes out.

## Validation and risk

- `npm test -- --run`: passed, 21 tests.
- `npm run lint`: passed with nine existing warnings and no errors.
- `npm run build`: passed; static shells generated for 70 public locale routes.
- Browser QA covered desktop/mobile homepage, primary solution journey, SAN Site detail, contact package preselection, mobile navigation, mobile pricing width, and a preview-server deep route.
- Remaining operational decisions: confirm final package scope/prices, domain and renewal policy, delivery wording, official company social profiles, content limits, and payment/order workflow.
