# SEO & Rendering Notes

## Current setup (SPA)

This site is a **Vite + React single-page application (SPA)**. HTML is served as a minimal shell; page content and meta tags (title, description, canonical, hreflang) are applied client-side via `SEOHead` after JavaScript loads.

### Implications

- **Search engines** that execute JavaScript (Google, Bing) can index content, but discovery may be slower than static HTML.
- **Social crawlers** (some messaging apps, older bots) may only see the default `index.html` meta tags unless prerendering or SSR is added.
- **`public/sitemap.xml`** lists all public Indonesian and English routes with canonical `https://www.sansolution.tech` URLs. Regenerate with `npm run sitemap` before deploy.

## Recommended next step: prerender

The lowest-risk improvement for this stack is **static prerendering at build time**, without moving to a full SSR framework.

### Option A — `vite-plugin-prerender` (evaluate on upgrade)

```bash
npm install -D vite-plugin-prerender
```

Configure known routes (home, about, services index, each service slug, case studies, contact, legal pages) and output static HTML into `dist/`. **Only adopt if the plugin installs cleanly with your Vite version** — plugin maintenance varies; test `npm run build` after adding.

### Option B — post-build prerender service

Tools like [Rendertron](https://github.com/GoogleChrome/rendertron) or hosted prerender APIs can serve HTML snapshots to bots while keeping the SPA for users. Requires server/nginx configuration.

### Option C — migrate critical pages to SSR (larger change)

Next.js or Remix would give first-class SSR/SSG. This is a bigger architectural change and not required for initial launch if sitemap + client SEO head are in place.

## What we already do

- Locale-specific routes (`/` vs `/en/...`) with reciprocal hreflang in `SEOHead`
- `public/robots.txt` and generated `public/sitemap.xml`
- Branded 404 with `noindex`
- Breadcrumb JSON-LD on deeper pages

## Build checklist

1. `npm run sitemap` — refresh sitemap URLs
2. `npm run build` — Vite copies `public/` (including sitemap) to `dist/`
3. Verify canonical domain is `https://www.sansolution.tech` in production hosting
