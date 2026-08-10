import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { ReadySolutionsSection } from "@/components/solutions/ReadySolutionsSection";
import { SitePricingCards } from "@/components/solutions/SitePricingCards";
import { routeFor, routes, solutionPath } from "@/lib/routes";
import { siteSolution } from "@/data/solutions";

const copy = {
  id: { title: "Solusi Digital Siap Pakai", subtitle: "Mulai dari website bisnis yang mudah diluncurkan hingga platform vertikal yang dapat berkembang bersama kebutuhan Anda.", seoTitle: "Solusi Digital untuk Bisnis | SAN Solution", seoDescription: "Jelajahi SAN Site, SAN Corporate, SAN Publisher, SAN Education, SAN Commerce, dan SAN Growth dengan scope serta harga mulai yang transparan.", home: "Beranda", solutions: "Solusi", siteTitle: "Mulai dari SAN Site", siteSubtitle: "Paket website bisnis profesional dengan harga tahun pertama mulai Rp699.000.", viewSite: "Lihat detail SAN Site", customTitle: "Butuh sesuatu yang lebih khusus?", customBody: "Gunakan layanan custom SAN untuk workflow, integrasi, dan sistem enterprise yang tidak cocok dengan paket standar.", customCta: "Lihat layanan custom" },
  en: { title: "Ready Digital Solutions", subtitle: "Start with a business website that is easy to launch, or a vertical platform that can grow with your needs.", seoTitle: "Digital Solutions for Business | SAN Solution", seoDescription: "Explore SAN Site, SAN Corporate, SAN Publisher, SAN Education, SAN Commerce, and SAN Growth with clear scope and starting prices.", home: "Home", solutions: "Solutions", siteTitle: "Start with SAN Site", siteSubtitle: "Professional business website packages from Rp699k for the first year.", viewSite: "View SAN Site", customTitle: "Need something more specific?", customBody: "Use SAN custom services for workflows, integrations, and enterprise systems that do not fit a standard package.", customCta: "View custom services" },
} as const;

export type SolutionsIndexPageProps = { locale: SiteLocale };

const SolutionsIndexPage = ({ locale }: SolutionsIndexPageProps) => {
  const content = copy[locale];
  return (
    <SiteLayout locale={locale} idPath={routes.solutions.id} enPath={routes.solutions.en}>
      <SEOHead title={content.seoTitle} description={content.seoDescription} canonicalPath={routes.solutions[locale]} locale={locale} alternateIdPath={routes.solutions.id} alternateEnPath={routes.solutions.en} />
      <div className="section-padding pb-0"><div className="container-narrow"><Breadcrumbs items={[{ label: content.home, href: routeFor("home", locale) }, { label: content.solutions }]} /></div></div>
      <section className="section-padding pb-16"><div className="container-narrow max-w-4xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{content.solutions}</p><h1 className="mt-3 text-4xl sm:text-5xl">{content.title}</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{content.subtitle}</p></div></section>
      <section className="section-padding bg-softmint/30" aria-labelledby="san-site-index-heading"><div className="container-narrow grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{content.siteTitle}</p><h2 id="san-site-index-heading" className="mt-3 text-3xl">{content.siteTitle}</h2><p className="mt-4 text-muted-foreground">{content.siteSubtitle}</p><Button asChild className="mt-6 min-h-11"><Link to={solutionPath(siteSolution.slug[locale], locale)}>{content.viewSite}</Link></Button></div><SitePricingCards locale={locale} compact /></div></section>
      <ReadySolutionsSection locale={locale} />
      <section className="section-padding"><div className="container-narrow rounded-2xl border border-border bg-darksection p-8 text-white md:p-12"><h2 className="text-3xl text-white">{content.customTitle}</h2><p className="mt-4 max-w-2xl text-white/75">{content.customBody}</p><Button asChild variant="secondary" className="mt-7 min-h-11"><Link to={routeFor("services", locale)}>{content.customCta}</Link></Button></div></section>
    </SiteLayout>
  );
};

export default SolutionsIndexPage;
