import { Link, useParams } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  caseStudyCategoryLabels,
  getCaseStudyById,
} from "@/data/caseStudies";
import { getServiceBySlug } from "@/data/services";
import { t } from "@/data/translations";
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
    services: "Layanan",
    problems: "Masalah yang Kami Selesaikan",
    scope: "Cakupan Layanan",
    benefits: "Manfaat",
    process: "Proses Kami",
    caseStudies: "Studi Kasus Terkait",
    tech: "Teknologi",
    faq: "Pertanyaan Umum",
    ctaTitle: "Siap mendiskusikan proyek ini?",
    ctaSubtitle: "Ceritakan kebutuhan Anda — kami akan merespons dalam 24 jam.",
    ctaButton: "Konsultasi Gratis",
  },
  en: {
    home: "Home",
    services: "Services",
    problems: "Problems We Solve",
    scope: "Service Scope",
    benefits: "Benefits",
    process: "Our Process",
    caseStudies: "Related Case Studies",
    tech: "Technologies",
    faq: "Frequently Asked Questions",
    ctaTitle: "Ready to discuss this project?",
    ctaSubtitle: "Tell us about your needs — we'll respond within 24 hours.",
    ctaButton: "Free Consultation",
  },
} as const;

export type ServiceDetailPageProps = {
  locale: SiteLocale;
};

const ServiceDetailPage = ({ locale }: ServiceDetailPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug, locale) : undefined;

  if (!service) {
    return <NotFound />;
  }

  const labels = sectionLabels[locale];
  const relatedStudies = service.relatedCaseStudyIds
    .map((id) => getCaseStudyById(id))
    .filter(Boolean);

  return (
    <SiteLayout
      locale={locale}
      idPath={servicePath(service.slug.id, "id")}
      enPath={servicePath(service.slug.en, "en")}
    >
      <SEOHead
        title={t(service.seo.title, locale)}
        description={t(service.seo.description, locale)}
        canonicalPath={servicePath(service.slug[locale], locale)}
        locale={locale}
        alternateIdPath={servicePath(service.slug.id, "id")}
        alternateEnPath={servicePath(service.slug.en, "en")}
      />

      <article className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: labels.home, href: routeFor("home", locale) },
              { label: labels.services, href: routeFor("services", locale) },
              { label: t(service.title, locale) },
            ]}
          />

          <header className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl">
              {t(service.title, locale)}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t(service.summary, locale)}
            </p>
          </header>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.problems}</h2>
            <ul className="mt-6 space-y-3">
              {service.problems.map((problem) => (
                <li key={problem.en} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {t(problem, locale)}
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.scope}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.scope.map((item) => (
                <li
                  key={item.en}
                  className="rounded-xl border border-border bg-white p-4 text-sm text-muted-foreground"
                >
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.benefits}</h2>
            <ul className="mt-6 space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit.en} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {t(benefit, locale)}
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.process}</h2>
            <ol className="mt-6 space-y-4">
              {service.process.map((step, index) => (
                <li
                  key={step.title.en}
                  className="flex gap-4 rounded-xl border border-border bg-softmint/20 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{t(step.title, locale)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(step.description, locale)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {relatedStudies.length > 0 ? (
            <section className="mx-auto mt-14 max-w-3xl">
              <h2 className="font-heading text-2xl">{labels.caseStudies}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedStudies.map((study) => (
                  <Link
                    key={study!.id}
                    to={caseStudyPath(study!.slug[locale], locale)}
                    className="rounded-xl border border-border bg-white p-5 transition-colors hover:border-primary/25 hover:shadow-soft"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">
                      {caseStudyCategoryLabels[study!.category][locale]}
                    </p>
                    <h3 className="mt-2 font-semibold">{t(study!.title, locale)}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {t(study!.description, locale)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="font-heading text-2xl">{labels.tech}</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {service.faq.length > 0 ? (
            <section className="mx-auto mt-14 max-w-3xl">
              <h2 className="font-heading text-2xl">{labels.faq}</h2>
              <Accordion type="single" collapsible className="mt-6">
                {service.faq.map((item, index) => (
                  <AccordionItem key={item.question.en} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {t(item.question, locale)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {t(item.answer, locale)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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

export default ServiceDetailPage;
