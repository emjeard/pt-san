import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { Badge } from "@/components/ui/badge";
import { CaseStudyImage } from "@/components/ui-custom/CaseStudyImage";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  caseStudies,
  caseStudyCategoryLabels,
} from "@/data/caseStudies";
import { t } from "@/data/translations";
import { trackEvent } from "@/lib/analytics";
import { caseStudyPath, routeFor, routes } from "@/lib/routes";

const pageCopy = {
  id: {
    title: "Studi Kasus",
    subtitle:
      "Proyek nyata yang kami deliver untuk enterprise, pemerintah, startup, dan bisnis di berbagai industri.",
    seoTitle: "Studi Kasus Proyek | SAN Solution",
    seoDescription:
      "Portofolio proyek SAN Solution: sistem enterprise PLN, portal pemerintahan, aplikasi mobile, SaaS, dan implementasi Odoo.",
    home: "Beranda",
    caseStudies: "Studi Kasus",
    readMore: "Baca studi kasus",
    external: "Lihat proyek live",
    contactCta: "Diskusikan proyek serupa",
  },
  en: {
    title: "Case Studies",
    subtitle:
      "Real projects delivered for enterprises, governments, startups, and businesses across industries.",
    seoTitle: "Project Case Studies | SAN Solution",
    seoDescription:
      "SAN Solution portfolio: PLN enterprise systems, government portals, mobile apps, SaaS, and Odoo implementations.",
    home: "Home",
    caseStudies: "Case Studies",
    readMore: "Read case study",
    external: "View live project",
    contactCta: "Discuss a similar project",
  },
} as const;

export type CaseStudiesIndexPageProps = {
  locale: SiteLocale;
};

const CaseStudiesIndexPage = ({ locale }: CaseStudiesIndexPageProps) => {
  const copy = pageCopy[locale];

  return (
    <SiteLayout
      locale={locale}
      idPath={routes.caseStudies.id}
      enPath={routes.caseStudies.en}
    >
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonicalPath={routes.caseStudies[locale]}
        locale={locale}
        alternateIdPath={routes.caseStudies.id}
        alternateEnPath={routes.caseStudies.en}
      />

      <div className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: copy.home, href: routeFor("home", locale) },
              { label: copy.caseStudies },
            ]}
          />

          <SectionHeading
            title={copy.title}
            subtitle={copy.subtitle}
            className="mb-12"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => {
              const detailPath = caseStudyPath(study.slug[locale], locale);
              const categoryLabel = caseStudyCategoryLabels[study.category][locale];

              return (
                <article
                  key={study.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:border-primary/25 hover:shadow-soft"
                >
                  <CaseStudyImage caseStudyId={study.id} lang={locale} />
                  <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {categoryLabel}
                    </Badge>
                    {study.year ? (
                      <span className="text-xs text-muted-foreground">{study.year}</span>
                    ) : null}
                  </div>

                  <h2 className="text-lg font-semibold">{t(study.title, locale)}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{t(study.client, locale)}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(study.description, locale)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Button variant="link" className="h-auto p-0 text-primary" asChild>
                      <Link
                        to={detailPath}
                        className="inline-flex items-center gap-1"
                      >
                        {copy.readMore}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                    {study.url ? (
                      <a
                        href={study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        onClick={() =>
                          trackEvent("portfolio_external_link_click", {
                            project: study.id,
                            locale,
                          })
                        }
                      >
                        {copy.external}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-14 rounded-2xl border border-border bg-softmint/30 p-8 text-center">
            <p className="text-lg text-muted-foreground">
              {locale === "id"
                ? "Punya tantangan serupa? Ceritakan konteks proyek Anda."
                : "Facing a similar challenge? Tell us about your project context."}
            </p>
            <Button asChild className="mt-6 min-h-11">
              <Link to={routeFor("contact", locale)}>{copy.contactCta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default CaseStudiesIndexPage;
