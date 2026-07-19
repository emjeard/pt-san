import { siteConfig } from "@/config/site";

export type PageSEO = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
};

export type HreflangLink = {
  hreflang: "id" | "en" | "x-default";
  href: string;
};

const normalizePath = (path: string): string => {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.endsWith("/") && withLeading.length > 1
    ? withLeading.slice(0, -1)
    : withLeading;
};

/** Build an absolute URL using the canonical www domain. */
export const absoluteUrl = (path = "/"): string => {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const normalized = normalizePath(path);
  if (normalized === "/") return `${base}/`;
  return `${base}${normalized}`;
};

/** Build a canonical URL for a given path. */
export const buildCanonical = (path = "/"): string => absoluteUrl(path);

/** Build reciprocal hreflang links for Indonesian and English page pairs. */
export const buildHreflang = (idPath: string, enPath: string): HreflangLink[] => {
  const idHref = absoluteUrl(idPath);
  const enHref = absoluteUrl(enPath);

  return [
    { hreflang: "id", href: idHref },
    { hreflang: "en", href: enHref },
    { hreflang: "x-default", href: idHref },
  ];
};

/** Default Open Graph image URL. */
export const defaultOgImage = (): string =>
  absoluteUrl("/og-san-solution.jpg");

/** Merge partial SEO data with site defaults. */
export const mergePageSEO = (
  partial: Partial<PageSEO> & Pick<PageSEO, "title" | "description">,
  path = "/",
): PageSEO => ({
  title: partial.title,
  description: partial.description,
  canonical: partial.canonical ?? buildCanonical(path),
  ogImage: partial.ogImage ?? defaultOgImage(),
  noindex: partial.noindex ?? false,
});

/** Generate BreadcrumbList JSON-LD items. */
export const breadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
