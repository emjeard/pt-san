import type { SiteLocale } from "@/config/site";

/** Shared locale-aware route paths for navigation and footer links. */
export const routes = {
  home: { id: "/", en: "/en" },
  solutions: { id: "/solusi", en: "/en/solutions" },
  pricing: { id: "/harga", en: "/en/pricing" },
  services: { id: "/layanan", en: "/en/services" },
  caseStudies: { id: "/studi-kasus", en: "/en/case-studies" },
  blog: { id: "/blog", en: "/en/blog" },
  about: { id: "/tentang-kami", en: "/en/about" },
  contact: { id: "/kontak", en: "/en/contact" },
  privacy: { id: "/kebijakan-privasi", en: "/en/privacy" },
  terms: { id: "/ketentuan-layanan", en: "/en/terms" },
} as const;

export const routeFor = (key: keyof typeof routes, locale: SiteLocale): string =>
  routes[key][locale];

export const servicePath = (slug: string, locale: SiteLocale): string =>
  locale === "id" ? `/layanan/${slug}` : `/en/services/${slug}`;

export const solutionPath = (slug: string, locale: SiteLocale): string =>
  locale === "id" ? `/solusi/${slug}` : `/en/solutions/${slug}`;

export const caseStudyPath = (slug: string, locale: SiteLocale): string =>
  locale === "id" ? `/studi-kasus/${slug}` : `/en/case-studies/${slug}`;

export const blogPostPath = (slug: string, locale: SiteLocale): string =>
  locale === "id" ? `/blog/${slug}` : `/en/blog/${slug}`;

export type ContactPathOptions = {
  solutionId?: string;
  packageId?: string;
  type?: "custom";
};

export const contactPath = (
  locale: SiteLocale,
  options: ContactPathOptions = {},
): string => {
  const params = new URLSearchParams();
  if (options.solutionId) params.set("solution", options.solutionId);
  if (options.packageId) params.set("package", options.packageId);
  if (options.type) params.set("type", options.type);
  const query = params.toString();
  return `${routeFor("contact", locale)}${query ? `?${query}` : ""}`;
};

export const processHashPath = (locale: SiteLocale): string =>
  `${routes.home[locale]}#process`;

export const isValidHref = (href?: string): href is string =>
  Boolean(href && href.trim() && href !== "#");
