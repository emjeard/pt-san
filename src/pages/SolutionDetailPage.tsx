import { Link, useParams } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Check } from "lucide-react";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { SitePricingCards } from "@/components/solutions/SitePricingCards";
import { formatStartingPrice, getSolutionBySlug, type Solution } from "@/data/solutions";
import { getCaseStudyById } from "@/data/caseStudies";
import { t } from "@/data/translations";
import { absoluteUrl } from "@/config/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { contactPath, routeFor, routes, caseStudyPath, solutionPath } from "@/lib/routes";
import { trackEvent } from "@/lib/analytics";
import NotFound from "@/pages/NotFound";

const labels = {
  id: { home: "Beranda", solutions: "Solusi", audience: "Cocok untuk", problem: "Tantangan yang diselesaikan", included: "Yang termasuk", addOns: "Pilihan add-on", pricing: "Harga mulai", process: "Cara kerja", related: "Studi kasus terkait", faq: "Pertanyaan umum", customDomain: "Domain termasuk bergantung pada ekstensi dan ketersediaan.", cta: "Konsultasikan kebutuhan", priceNote: "Harga akhir bergantung pada scope, integrasi, konten, hosting, dan kebutuhan custom." },
  en: { home: "Home", solutions: "Solutions", audience: "Suitable for", problem: "The problem it solves", included: "What is included", addOns: "Optional add-ons", pricing: "Starting price", process: "How it works", related: "Related case studies", faq: "Frequently asked questions", customDomain: "Domain inclusion depends on extension and availability.", cta: "Discuss your needs", priceNote: "Final pricing depends on scope, integrations, content, hosting, and custom requirements." },
} as const;

const fallbackFaq = (solution: Solution, locale: SiteLocale) => [
  { question: locale === "id" ? "Apa yang menentukan harga akhir?" : "What determines the final price?", answer: locale === "id" ? `${t(solution.title, locale)} dimulai dari harga yang tercantum. Scope, integrasi, volume konten, hosting, dan kebutuhan custom dapat memengaruhi harga akhir.` : `${t(solution.title, locale)} starts at the stated price. Scope, integrations, content volume, hosting, and custom requirements can affect the final price.` },
  { question: locale === "id" ? "Apakah solusi ini bisa dikembangkan?" : "Can this solution be expanded?", answer: locale === "id" ? "Bisa. Kebutuhan lanjutan dapat dibahas sebagai add-on atau diarahkan ke layanan custom SAN." : "Yes. Further requirements can be discussed as add-ons or moved to SAN custom services." },
];

export type SolutionDetailPageProps = { locale: SiteLocale };

const SolutionDetailPage = ({ locale }: SolutionDetailPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? getSolutionBySlug(slug, locale) : undefined;
  if (!solution) return <NotFound />;
  const copy = labels[locale];
  const idPath = solutionPath(solution.slug.id, "id");
  const enPath = solutionPath(solution.slug.en, "en");
  const relatedStudies = solution.relatedCaseStudyIds.map(getCaseStudyById).filter(Boolean);
  const faqs = solution.faq.length > 0 ? solution.faq : fallbackFaq(solution, locale);
  const breadcrumb = breadcrumbJsonLd([
    { name: copy.home, path: routeFor("home", locale) },
    { name: copy.solutions, path: routeFor("solutions", locale) },
    { name: t(solution.title, locale), path: solutionPath(solution.slug[locale], locale) },
  ]);
  const serviceJsonLd = { "@context": "https://schema.org", "@type": "Service", name: t(solution.title, locale), serviceType: t(solution.eyebrow, locale), description: t(solution.summary, locale), url: absoluteUrl(solutionPath(solution.slug[locale], locale)), provider: { "@type": "Organization", name: "SAN Solution", url: absoluteUrl("/") }, areaServed: { "@type": "Country", name: "Indonesia" }, offers: { "@type": "Offer", price: solution.startingPrice, priceCurrency: "IDR", url: absoluteUrl(solutionPath(solution.slug[locale], locale)) } };

  return (
    <SiteLayout locale={locale} idPath={idPath} enPath={enPath}>
      <SEOHead title={t(solution.seo.title, locale)} description={t(solution.seo.description, locale)} canonicalPath={solutionPath(solution.slug[locale], locale)} locale={locale} alternateIdPath={idPath} alternateEnPath={enPath} jsonLd={[serviceJsonLd, breadcrumb]} />
      <article>
        <div className="section-padding pb-0"><div className="container-narrow"><Breadcrumbs items={[{ label: copy.home, href: routeFor("home", locale) }, { label: copy.solutions, href: routeFor("solutions", locale) }, { label: t(solution.title, locale) }]} /></div></div>
        <header className="section-padding pb-16"><div className="container-narrow grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{t(solution.eyebrow, locale)}</p><h1 className="mt-4 text-4xl sm:text-5xl">{t(solution.title, locale)}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t(solution.summary, locale)}</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild className="min-h-11 gap-2"><Link to={contactPath(locale, { solutionId: solution.id })} onClick={() => trackEvent("solution_cta_click", { solution_id: solution.id, locale, source_section: "solution_hero" })}>{copy.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button><Button asChild variant="outline" className="min-h-11"><Link to={routeFor("pricing", locale)}>{locale === "id" ? "Lihat harga" : "View pricing"}</Link></Button></div></div><div className="rounded-2xl border border-primary/20 bg-softmint/50 p-7"><p className="text-sm font-semibold uppercase tracking-wider text-primary">{copy.pricing}</p><p className="mt-3 text-3xl font-bold">{formatStartingPrice(solution.startingPrice, solution.billing, locale)}</p><p className="mt-3 text-sm text-muted-foreground">{copy.priceNote}</p></div></div></header>
        <section className="section-padding bg-softmint/25"><div className="container-narrow grid gap-10 lg:grid-cols-2"><div><h2 className="text-2xl">{copy.audience}</h2><ul className="mt-5 space-y-3">{solution.audience.map((item) => <li key={item.en} className="flex gap-3 text-muted-foreground"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />{t(item, locale)}</li>)}</ul></div><div><h2 className="text-2xl">{copy.problem}</h2><p className="mt-5 leading-relaxed text-muted-foreground">{t(solution.problem, locale)}</p></div></div></section>
        <section className="section-padding"><div className="container-narrow grid gap-10 lg:grid-cols-2"><div><h2 className="text-2xl">{copy.included}</h2><ul className="mt-5 space-y-3">{solution.included.map((item) => <li key={item.en} className="flex gap-3 text-muted-foreground"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />{t(item, locale)}</li>)}</ul></div><div><h2 className="text-2xl">{copy.addOns}</h2><ul className="mt-5 space-y-3">{solution.addOns.map((item) => <li key={item.en} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />{t(item, locale)}</li>)}</ul>{solution.id === "san-site" ? <p className="mt-6 rounded-xl border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">{copy.customDomain}</p> : null}</div></div></section>
        {solution.packages ? <section className="section-padding bg-softmint/25"><div className="container-narrow"><div className="mb-10 max-w-2xl"><h2 className="text-3xl">{locale === "id" ? "Pilih paket SAN Site" : "Choose a SAN Site package"}</h2><p className="mt-3 text-muted-foreground">{locale === "id" ? "Harga tahun pertama dan renewal ditampilkan terpisah agar mudah dibandingkan." : "First-year and renewal prices are shown separately for clarity."}</p></div><SitePricingCards locale={locale} /></div></section> : null}
        <section className="section-padding"><div className="container-narrow"><h2 className="text-2xl">{copy.process}</h2><ol className="mt-6 grid gap-4 md:grid-cols-3">{solution.process.map((step, index) => <li key={step.en} className="rounded-xl border border-border bg-white p-5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-softmint text-sm font-bold text-primary">{index + 1}</span><p className="mt-4 font-medium">{t(step, locale)}</p></li>)}</ol></div></section>
        {relatedStudies.length > 0 ? <section className="section-padding bg-white"><div className="container-narrow"><h2 className="text-2xl">{copy.related}</h2><div className="mt-6 grid gap-4 md:grid-cols-2">{relatedStudies.map((study) => study ? <Link key={study.id} to={caseStudyPath(study.slug[locale], locale)} className="rounded-xl border border-border p-5 transition-colors hover:border-primary/30 hover:shadow-soft"><p className="font-semibold">{t(study.title, locale)}</p><p className="mt-2 text-sm text-muted-foreground">{t(study.description, locale)}</p></Link> : null)}</div></div></section> : null}
        <section className="section-padding"><div className="container-narrow max-w-3xl"><h2 className="text-2xl">{copy.faq}</h2><Accordion type="single" collapsible className="mt-6 rounded-2xl border border-border bg-white px-6">{faqs.map((faq, index) => <AccordionItem key={faq.question.en} value={`faq-${index}`}><AccordionTrigger className="text-left">{t(faq.question, locale)}</AccordionTrigger><AccordionContent className="text-muted-foreground">{t(faq.answer, locale)}</AccordionContent></AccordionItem>)}</Accordion></div></section>
        <section className="section-padding pt-0"><div className="container-narrow rounded-2xl bg-darksection p-8 text-center text-white md:p-12"><h2 className="text-3xl text-white">{copy.cta}</h2><p className="mx-auto mt-3 max-w-xl text-white/75">{copy.priceNote}</p><Button asChild variant="secondary" className="mt-7 min-h-11"><Link to={contactPath(locale, { solutionId: solution.id })}>{copy.cta}</Link></Button></div></section>
      </article>
    </SiteLayout>
  );
};

export default SolutionDetailPage;
