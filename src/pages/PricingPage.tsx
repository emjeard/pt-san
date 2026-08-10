import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { SitePricingCards } from "@/components/solutions/SitePricingCards";
import { solutions, customEngineeringStartingPrice, formatIDR } from "@/data/solutions";
import { contactPath, routeFor, routes, solutionPath } from "@/lib/routes";

const copy = {
  id: { title: "Harga dan Paket", subtitle: "Gunakan harga mulai sebagai titik awal pembicaraan. Scope akhir dikonfirmasi setelah kebutuhan, konten, integrasi, dan hosting dipahami.", seoTitle: "Harga Solusi Digital dan Software Custom | SAN Solution", seoDescription: "Lihat harga mulai SAN Site, SAN Corporate, SAN Publisher, SAN Education, SAN Commerce, SAN Growth, dan custom software.", home: "Beranda", pricing: "Harga", site: "Perbandingan SAN Site", other: "Solusi lainnya", factors: "Apa yang memengaruhi harga akhir?", factorsList: ["Scope dan jumlah halaman/modul", "Integrasi API, payment, CRM, atau sistem lama", "Volume konten, data migration, dan kebutuhan hosting", "Level custom development, QA, dan support"], custom: "Custom Engineering", customText: "Untuk software custom, SAN mulai dari Rp15 juta tergantung scope. Harga bukan satu-satunya pertimbangan: discovery, arsitektur, keamanan, dan maintainability juga penting.", renewal: "Renewal SAN Site ditampilkan terpisah dari harga tahun pertama. Domain bergantung pada ekstensi dan ketersediaan.", cta: "Diskusikan kebutuhan" },
  en: { title: "Pricing and packages", subtitle: "Use starting prices as a conversation point. Final scope is confirmed after understanding requirements, content, integrations, and hosting.", seoTitle: "Digital Solution and Custom Software Pricing | SAN Solution", seoDescription: "See starting prices for SAN Site, SAN Corporate, SAN Publisher, SAN Education, SAN Commerce, SAN Growth, and custom software.", home: "Home", pricing: "Pricing", site: "SAN Site comparison", other: "Other solutions", factors: "What affects the final price?", factorsList: ["Scope and number of pages/modules", "API, payment, CRM, or legacy integrations", "Content volume, data migration, and hosting requirements", "Level of custom development, QA, and support"], custom: "Custom Engineering", customText: "Custom software starts from Rp15m depending on scope. Price is not the only consideration: discovery, architecture, security, and maintainability matter too.", renewal: "SAN Site renewal is shown separately from first-year pricing. Domains depend on extension and availability.", cta: "Discuss your needs" },
} as const;

export type PricingPageProps = { locale: SiteLocale };

const PricingPage = ({ locale }: PricingPageProps) => {
  const content = copy[locale];
  return (
    <SiteLayout locale={locale} idPath={routes.pricing.id} enPath={routes.pricing.en}>
      <SEOHead title={content.seoTitle} description={content.seoDescription} canonicalPath={routes.pricing[locale]} locale={locale} alternateIdPath={routes.pricing.id} alternateEnPath={routes.pricing.en} />
      <div className="section-padding pb-0"><div className="container-narrow"><Breadcrumbs items={[{ label: content.home, href: routeFor("home", locale) }, { label: content.pricing }]} /></div></div>
      <header className="section-padding pb-16"><div className="container-narrow max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{content.pricing}</p><h1 className="mt-3 text-4xl sm:text-5xl">{content.title}</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">{content.subtitle}</p></div></header>
      <section className="section-padding bg-softmint/25"><div className="container-narrow"><h2 className="mb-10 text-3xl">{content.site}</h2><SitePricingCards locale={locale} /><p className="mt-6 text-sm text-muted-foreground">{content.renewal}</p></div></section>
      <section className="section-padding"><div className="container-narrow"><h2 className="mb-10 text-3xl">{content.other}</h2><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{solutions.filter((solution) => solution.id !== "san-site").map((solution) => <article key={solution.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm"><h3 className="text-xl font-semibold">{solution.title[locale]}</h3><p className="mt-2 text-sm text-muted-foreground">{solution.summary[locale]}</p><p className="mt-5 font-bold">{locale === "id" ? "Mulai " : "From "}{formatIDR(solution.startingPrice)}{solution.billing === "monthly" ? (locale === "id" ? "/bulan" : "/month") : ""}</p><Button asChild variant="link" className="mt-5 h-auto p-0"><Link to={solutionPath(solution.slug[locale], locale)}>{locale === "id" ? "Lihat scope" : "View scope"}</Link></Button></article>)}</div></div></section>
      <section className="section-padding bg-white"><div className="container-narrow grid gap-10 lg:grid-cols-2"><div><h2 className="text-3xl">{content.factors}</h2><ul className="mt-6 space-y-3">{content.factorsList.map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />{item}</li>)}</ul></div><div className="rounded-2xl bg-darksection p-7 text-white"><h2 className="text-2xl text-white">{content.custom}</h2><p className="mt-4 text-white/75">{content.customText}</p><p className="mt-5 text-xl font-semibold text-white">{formatIDR(customEngineeringStartingPrice)}+</p><Button asChild variant="secondary" className="mt-6 min-h-11"><Link to={contactPath(locale, { type: "custom" })}>{content.cta}</Link></Button></div></div></section>
      <section className="section-padding pt-0"><div className="container-narrow rounded-2xl border border-border bg-softmint/50 p-7 text-center"><p className="text-muted-foreground">{locale === "id" ? "Siap membandingkan pilihan?" : "Ready to compare your options?"}</p><Button asChild className="mt-5 min-h-11"><Link to={contactPath(locale)}>{content.cta}</Link></Button></div></section>
    </SiteLayout>
  );
};

export default PricingPage;
