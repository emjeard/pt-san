import { Code2, Server } from "lucide-react";
import { Reveal } from "@/components/ui-custom/Reveal";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const icons = [Code2, Server];

const ExpertiseSection = () => {
  const { lang } = useLanguage();
  const expertise = translations.expertise;

  return (
    <section id="expertise" className="section-padding bg-softmint/30">
      <div className="container-narrow">
        <SectionHeading
          label={t(expertise.label, lang)}
          title={t(expertise.title, lang)}
          subtitle={t(expertise.subtitle, lang)}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {expertise.founders.map((area, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={area.title.en} delay={index * 80}>
                <article className="rounded-2xl border border-border bg-white p-8 shadow-sm">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-softmint text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold">{t(area.title, lang)}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(area.description, lang)}
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
