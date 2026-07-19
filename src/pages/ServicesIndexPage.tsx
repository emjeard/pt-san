import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { t } from "@/data/translations";
import { routeFor, routes, servicePath } from "@/lib/routes";

const pageCopy = {
  id: {
    title: "Layanan Kami",
    subtitle:
      "Dari sistem enterprise hingga aplikasi mobile dan implementasi Odoo — solusi digital yang dirancang sesuai kebutuhan bisnis Anda.",
    seoTitle: "Layanan Pengembangan Software | SAN Solution",
    seoDescription:
      "Jasa pengembangan website, aplikasi mobile, sistem enterprise, SaaS, DevOps, integrasi sistem, dan implementasi Odoo di Indonesia.",
    home: "Beranda",
    services: "Layanan",
    learnMore: "Pelajari layanan",
    contactCta: "Konsultasikan kebutuhan",
  },
  en: {
    title: "Our Services",
    subtitle:
      "From enterprise systems to mobile apps and Odoo implementation — digital solutions designed around your business needs.",
    seoTitle: "Software Development Services | SAN Solution",
    seoDescription:
      "Website development, mobile apps, enterprise systems, SaaS, DevOps, system integration, and Odoo implementation in Indonesia.",
    home: "Home",
    services: "Services",
    learnMore: "Learn more",
    contactCta: "Discuss your needs",
  },
} as const;

export type ServicesIndexPageProps = {
  locale: SiteLocale;
};

const ServicesIndexPage = ({ locale }: ServicesIndexPageProps) => {
  const copy = pageCopy[locale];

  return (
    <SiteLayout
      locale={locale}
      idPath={routes.services.id}
      enPath={routes.services.en}
    >
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonicalPath={routes.services[locale]}
        locale={locale}
        alternateIdPath={routes.services.id}
        alternateEnPath={routes.services.en}
      />

      <div className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: copy.home, href: routeFor("home", locale) },
              { label: copy.services },
            ]}
          />

          <SectionHeading
            title={copy.title}
            subtitle={copy.subtitle}
            className="mb-12"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className="group flex h-full flex-col rounded-2xl border border-border bg-white p-8 shadow-sm transition-all hover:border-primary/25 hover:shadow-soft"
              >
                <h2 className="text-xl font-semibold">{t(service.title, locale)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(service.summary, locale)}
                </p>

                <ul className="mt-5 space-y-2">
                  {service.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit.en} className="flex gap-2 text-sm text-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {t(benefit, locale)}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <Button variant="link" className="h-auto p-0 text-primary" asChild>
                    <Link
                      to={servicePath(service.slug[locale], locale)}
                      className="inline-flex items-center gap-1"
                    >
                      {copy.learnMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-border bg-softmint/30 p-8 text-center">
            <p className="text-lg text-muted-foreground">
              {locale === "id"
                ? "Tidak yakin layanan mana yang cocok? Ceritakan kebutuhan Anda — kami bantu memetakan solusinya."
                : "Not sure which service fits? Tell us about your needs — we'll help map the right solution."}
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

export default ServicesIndexPage;
