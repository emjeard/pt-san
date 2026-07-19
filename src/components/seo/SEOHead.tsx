import { useEffect } from "react";
import type { SiteLocale } from "@/config/site";
import {
  absoluteUrl,
  buildHreflang,
  defaultOgImage,
} from "@/lib/seo";

export type SEOHeadProps = {
  title: string;
  description: string;
  canonicalPath: string;
  locale: SiteLocale;
  alternateIdPath: string;
  alternateEnPath: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

const upsertMeta = (
  key: string,
  content: string,
  type: "name" | "property" = "name",
): void => {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${type}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(type, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (
  rel: string,
  href: string,
  hreflang?: string,
): void => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const upsertJsonLd = (
  data: Record<string, unknown> | Record<string, unknown>[],
): (() => void) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo-head", "json-ld");
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
  return () => {
    script.remove();
  };
};

export const SEOHead = ({
  title,
  description,
  canonicalPath,
  locale,
  alternateIdPath,
  alternateEnPath,
  ogImage,
  jsonLd,
  noindex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = locale;

    upsertMeta("description", description);

    if (noindex) {
      upsertMeta("robots", "noindex, nofollow");
    } else {
      const robots = document.head.querySelector<HTMLMetaElement>(
        'meta[name="robots"]',
      );
      robots?.remove();
    }

    const canonical = absoluteUrl(canonicalPath);
    upsertLink("canonical", canonical);

    for (const link of buildHreflang(alternateIdPath, alternateEnPath)) {
      upsertLink("alternate", link.href, link.hreflang);
    }

    const image = ogImage ?? defaultOgImage();

    upsertMeta("og:title", title, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:url", canonical, "property");
    upsertMeta("og:image", image, "property");
    upsertMeta("og:locale", locale === "id" ? "id_ID" : "en_US", "property");
    upsertMeta("og:type", "website", "property");
    upsertMeta("og:site_name", "SAN Solution", "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", image);

    const cleanupJsonLd = jsonLd ? upsertJsonLd(jsonLd) : undefined;

    return () => {
      cleanupJsonLd?.();
    };
  }, [
    title,
    description,
    canonicalPath,
    locale,
    alternateIdPath,
    alternateEnPath,
    ogImage,
    jsonLd,
    noindex,
  ]);

  return null;
};
