import { ArrowRight, Building2, Cloud, Rocket, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui-custom/Reveal";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";
import { getCoreServices } from "@/data/services";
import { servicePath } from "@/lib/routes";

const serviceIcons = {
  "enterprise-systems": Building2,
  "saas-development": Rocket,
  "mobile-app-development": Smartphone,
  "devops-infrastructure": Cloud,
} as const;

const ServicesSection = () => {
  const { lang } = useLanguage();
  const svc = translations.services;
  const coreServices = getCoreServices();

  return (
    <section id="services" className="section-padding bg-softmint/30">
      <div className="container-narrow">
        <SectionHeading
          label={t(svc.label, lang)}
          title={t(svc.title, lang)}
          subtitle={t(svc.subtitle, lang)}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {coreServices.map((service, index) => {
            const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? Building2;
            const slug = service.slug[lang];
            const href = servicePath(slug, lang);

            return (
              <Reveal key={service.id} delay={index * 70} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-8 shadow-sm transition-all hover:border-primary/25 hover:shadow-soft">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-softmint text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold">{t(service.title, lang)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(service.summary, lang)}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.benefits.slice(0, 2).map((benefit) => (
                      <li key={benefit.en} className="flex gap-2 text-sm text-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {t(benefit, lang)}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.technologies.slice(0, 4).map((tech) => (
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
                      <Link to={href} className="inline-flex items-center gap-1">
                        {lang === "id" ? "Pelajari layanan" : "Learn more"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
