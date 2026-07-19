import { Link, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaseStudyImage } from "@/components/ui-custom/CaseStudyImage";
import {
  caseStudyCategoryLabels,
  getCaseStudyBySlug,
} from "@/data/caseStudies";
import { caseStudyImages } from "@/data/caseStudyImages";
import { getServiceById } from "@/data/services";
import { t } from "@/data/translations";
import { trackEvent } from "@/lib/analytics";
import {
  caseStudyPath,
  routeFor,
  routes,
  servicePath,
} from "@/lib/routes";
import NotFound from "./NotFound";

const sectionLabels = {
  id: {
    home: "Beranda",
    caseStudies: "Studi Kasus",
    overview: "Ringkasan",
    context: "Konteks Klien",
    challenge: "Tantangan",
    solution: "Solusi",
    features: "Fitur Utama",
    tech: "Teknologi",
    role: "Peran Kami",
    outcome: "Hasil",
    relatedServices: "Layanan Terkait",
    ctaTitle: "Ingin hasil serupa untuk organisasi Anda?",
    ctaSubtitle: "Hubungi kami untuk mendiskusikan kebutuhan proyek.",
    ctaButton: "Konsultasi Gratis",
    external: "Lihat proyek live",
  },
  en: {
    home: "Home",
    caseStudies: "Case Studies",
    overview: "Overview",
    context: "Client Context",
    challenge: "Challenge",
    solution: "Solution",
    features: "Key Features",
    tech: "Technologies",
    role: "Our Role",
    outcome: "Outcome",
    relatedServices: "Related Services",
    ctaTitle: "Want similar results for your organization?",
    ctaSubtitle: "Contact us to discuss your project needs.",
    ctaButton: "Free Consultation",
    external: "View live project",
  },
} as const;

export type CaseStudyDetailPageProps = {
  locale: SiteLocale;
};

const CaseStudyDetailPage = ({ locale }: CaseStudyDetailPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug, locale) : undefined;

  if (!study) {
    return <NotFound />;
  }

  const labels = sectionLabels[locale];
  const relatedServices = study.relatedServiceIds
    .map((id) => getServiceById(id))
    .filter(Boolean);

  const seoTitle =
    locale === "id"
      ? `${t(study.title, locale)} | Studi Kasus SAN Solution`
      : `${t(study.title, locale)} | SAN Solution Case Study`;

  return (
    <SiteLayout
      locale={locale}
      idPath={caseStudyPath(study.slug.id, "id")}
      enPath={caseStudyPath(study.slug.en, "en")}
    >
      <SEOHead
        title={seoTitle}
        description={t(study.description, locale)}
        canonicalPath={caseStudyPath(study.slug[locale], locale)}
        locale={locale}
        alternateIdPath={caseStudyPath(study.slug.id, "id")}
        alternateEnPath={caseStudyPath(study.slug.en, "en")}
      />

      <article className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: labels.home, href: routeFor("home", locale) },
              { label: labels.caseStudies, href: routeFor("caseStudies", locale) },
              { label: t(study.title, locale) },
            ]}
          />

          <header className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline">
                {caseStudyCategoryLabels[study.category][locale]}
              </Badge>
              {study.year ? (
                <span className="text-sm text-muted-foreground">{study.year}</span>
              ) : null}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl">
              {t(study.title, locale)}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{t(study.client, locale)}</p>
            {study.url ? (
              <a
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                onClick={() =>
                  trackEvent("portfolio_external_link_click", {
                    project: study.id,
                    locale,
                  })
                }
              >
                {labels.external}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </header>

          {caseStudyImages[study.id] ? (
            <div className="mx-auto mt-10 max-w-4xl">
              <CaseStudyImage
                caseStudyId={study.id}
                lang={locale}
                size="hero"
                className="border-0 shadow-soft"
              />
            </div>
          ) : null}

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.overview}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t(study.description, locale)}
            </p>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.context}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t(study.client, locale)}
              {study.year
                ? locale === "id"
                  ? ` · Periode proyek: ${study.year}`
                  : ` · Project period: ${study.year}`
                : ""}
            </p>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.challenge}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t(study.challenge, locale)}
            </p>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.solution}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t(study.solution, locale)}
            </p>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.features}</h2>
            <ul className="mt-6 space-y-3">
              {study.features.map((feature) => (
                <li key={feature.en} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {t(feature, locale)}
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.tech}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {study.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.role}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t(study.role, locale)}
            </p>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.outcome}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t(study.outcome, locale)}
            </p>
          </section>

          {relatedServices.length > 0 ? (
            <section className="mx-auto mt-14 max-w-3xl">
              <h2 className="font-heading text-2xl">{labels.relatedServices}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <Link
                    key={service!.id}
                    to={servicePath(service!.slug[locale], locale)}
                    className="rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary/25 hover:shadow-soft"
                  >
                    <h3 className="font-semibold">{t(service!.title, locale)}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {t(service!.summary, locale)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-softmint/30 p-8 text-center">
            <h2 className="font-heading text-2xl">{labels.ctaTitle}</h2>
            <p className="mt-3 text-muted-foreground">{labels.ctaSubtitle}</p>
            <Button asChild className="mt-6 min-h-11">
              <Link to={routeFor("contact", locale)}>{labels.ctaButton}</Link>
            </Button>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
};

export default CaseStudyDetailPage;
