import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { Button } from "@/components/ui/button";
import { translations, t } from "@/data/translations";
import { routeFor, routes } from "@/lib/routes";

const pageCopy = {
  id: {
    seoTitle: "Tentang Kami | SAN Solution",
    seoDescription:
      "SAN Solution menggabungkan pengalaman enterprise dan pengembangan produk digital — dari sistem mission-critical hingga SaaS dan aplikasi mobile.",
    home: "Beranda",
    about: "Tentang Kami",
    storyTitle: "Cerita Perusahaan",
    storyLead:
      "SAN Solution resmi didirikan pada 2023, menggabungkan lebih dari satu dekade pengalaman membangun sistem enterprise, aplikasi mobile, dan produk digital di Indonesia.",
    storyBody:
      "Kami bekerja dengan perusahaan, startup, dan organisasi publik — dari analisis kebutuhan hingga implementasi dan handover. Fokus kami: solusi yang mudah digunakan, arsitektur yang maintainable, dan komunikasi yang jelas sepanjang proyek.",
    founded: "Didirikan",
    country: "Negara",
    expertiseHeading: "Keahlian Tim",
    journeyHeading: "Perjalanan Kami",
    ctaTitle: "Ingin bekerja sama?",
    ctaButton: "Hubungi Kami",
  },
  en: {
    seoTitle: "About Us | SAN Solution",
    seoDescription:
      "SAN Solution combines enterprise experience and digital product development — from mission-critical systems to SaaS and mobile apps.",
    home: "Home",
    about: "About Us",
    storyTitle: "Company Story",
    storyLead:
      "SAN Solution was officially established in 2023, combining more than a decade of experience building enterprise systems, mobile apps, and digital products in Indonesia.",
    storyBody:
      "We work with companies, startups, and public organizations — from requirements analysis through implementation and handover. Our focus: solutions that are easy to use, maintainable architecture, and clear communication throughout the project.",
    founded: "Founded",
    country: "Country",
    expertiseHeading: "Team Expertise",
    journeyHeading: "Our Journey",
    ctaTitle: "Want to work together?",
    ctaButton: "Contact Us",
  },
} as const;

export type AboutPageProps = {
  locale: SiteLocale;
};

const AboutPage = ({ locale }: AboutPageProps) => {
  const copy = pageCopy[locale];
  const expertise = translations.expertise;
  const timeline = translations.timeline;

  return (
    <SiteLayout
      locale={locale}
      idPath={routes.about.id}
      enPath={routes.about.en}
    >
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonicalPath={routes.about[locale]}
        locale={locale}
        alternateIdPath={routes.about.id}
        alternateEnPath={routes.about.en}
      />

      <div className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: copy.home, href: routeFor("home", locale) },
              { label: copy.about },
            ]}
          />

          <SectionHeading
            title={copy.about}
            subtitle={copy.storyLead}
            className="mb-12"
          />

          <section className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl">{copy.storyTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{copy.storyLead}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{copy.storyBody}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-white p-5">
                <dt className="text-sm font-medium text-muted-foreground">{copy.founded}</dt>
                <dd className="mt-1 text-lg font-semibold">{siteConfig.company.foundingYear}</dd>
              </div>
              <div className="rounded-xl border border-border bg-white p-5">
                <dt className="text-sm font-medium text-muted-foreground">{copy.country}</dt>
                <dd className="mt-1 text-lg font-semibold">{siteConfig.company.country}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-16">
            <SectionHeading
              label={t(expertise.label, locale)}
              title={copy.expertiseHeading}
              subtitle={t(expertise.subtitle, locale)}
              className="mb-10"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {expertise.founders.map((area) => (
                <article
                  key={area.title.en}
                  className="rounded-2xl border border-border bg-white p-8 shadow-sm"
                >
                  <h3 className="text-xl font-semibold">{t(area.title, locale)}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {t(area.description, locale)}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <SectionHeading
              label={t(timeline.label, locale)}
              title={copy.journeyHeading}
              subtitle={t(timeline.subtitle, locale)}
              className="mb-10"
            />
            <ol className="mx-auto max-w-3xl space-y-6">
              {timeline.milestones.map((milestone) => (
                <li
                  key={milestone.year}
                  className={`rounded-2xl border p-6 ${
                    milestone.highlight
                      ? "border-primary/30 bg-softmint/30"
                      : "border-border bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold text-primary">{milestone.year}</p>
                  <h3 className="mt-2 text-lg font-semibold">{t(milestone.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(milestone.description, locale)}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-border bg-softmint/30 p-8 text-center">
            <h2 className="font-heading text-2xl">{copy.ctaTitle}</h2>
            <Button asChild className="mt-6 min-h-11">
              <Link to={routeFor("contact", locale)}>{copy.ctaButton}</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default AboutPage;
