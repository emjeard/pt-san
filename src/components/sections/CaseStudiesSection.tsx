import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaseStudyImage } from "@/components/ui-custom/CaseStudyImage";
import { Reveal } from "@/components/ui-custom/Reveal";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  caseStudyCategoryLabels,
  getHomepageCaseStudies,
} from "@/data/caseStudies";
import { translations, t } from "@/data/translations";
import { trackEvent } from "@/lib/analytics";
import { caseStudyPath, routeFor } from "@/lib/routes";

const CaseStudiesSection = () => {
  const { lang } = useLanguage();
  const port = translations.portfolio;
  const studies = getHomepageCaseStudies();

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label={t(port.label, lang)}
          title={t(port.title, lang)}
          subtitle={t(port.subtitle, lang)}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((study, index) => {
            const detailPath = caseStudyPath(study.slug[lang], lang);
            const categoryLabel = caseStudyCategoryLabels[study.category][lang];

            return (
              <Reveal key={study.id} delay={(index % 2) * 80} className="h-full">
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:border-primary/25 hover:shadow-soft">
                  <CaseStudyImage caseStudyId={study.id} lang={lang} />

                  <div className="p-7">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {categoryLabel}
                      </Badge>
                      {study.year ? (
                        <span className="text-xs text-muted-foreground">{study.year}</span>
                      ) : null}
                    </div>

                    <h3 className="text-lg font-semibold">{t(study.title, lang)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t(study.client, lang)}</p>

                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">
                          {lang === "id" ? "Tantangan: " : "Challenge: "}
                        </span>
                        {t(study.challenge, lang)}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          {lang === "id" ? "Solusi: " : "Solution: "}
                        </span>
                        {t(study.solution, lang)}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {study.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Button variant="link" className="h-auto p-0 text-primary" asChild>
                        <Link to={detailPath} className="inline-flex items-center gap-1">
                          {lang === "id" ? "Baca studi kasus" : "Read case study"}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      {study.url ? (
                        <a
                          href={study.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                          onClick={() =>
                            trackEvent("portfolio_external_link_click", {
                              project_id: study.id,
                            })
                          }
                        >
                          {lang === "id" ? "Kunjungi proyek" : "Visit project"}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={100} className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link to={routeFor("caseStudies", lang)}>
              {lang === "id" ? "Lihat semua studi kasus" : "View all case studies"}
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
