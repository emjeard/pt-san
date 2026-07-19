import type { SiteLocale } from "@/config/site";

/** Shared locale-aware route paths for navigation and footer links. */
export const routes = {
  home: { id: "/", en: "/en" },
  services: { id: "/layanan", en: "/en/services" },
  caseStudies: { id: "/studi-kasus", en: "/en/case-studies" },
  about: { id: "/tentang-kami", en: "/en/about" },
  contact: { id: "/kontak", en: "/en/contact" },
  privacy: { id: "/kebijakan-privasi", en: "/en/privacy" },
  terms: { id: "/ketentuan-layanan", en: "/en/terms" },
} as const;

export const routeFor = (key: keyof typeof routes, locale: SiteLocale): string =>
  routes[key][locale];

export const servicePath = (slug: string, locale: SiteLocale): string =>
  locale === "id" ? `/layanan/${slug}` : `/en/services/${slug}`;

export const caseStudyPath = (slug: string, locale: SiteLocale): string =>
  locale === "id" ? `/studi-kasus/${slug}` : `/en/case-studies/${slug}`;

export const processHashPath = (locale: SiteLocale): string =>
  `${routes.home[locale]}#process`;

export const isValidHref = (href?: string): href is string =>
  Boolean(href && href.trim() && href !== "#");
