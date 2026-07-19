import { MessageSquare, Shield, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const icons = [Shield, MessageSquare, Wrench];

const WhyUsSection = () => {
  const { lang } = useLanguage();
  const why = translations.whyUs;

  return (
    <section id="why-us" className="section-padding bg-white">
      <div className="container-narrow">
        <SectionHeading
          label={t(why.label, lang)}
          title={t(why.title, lang)}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {why.reasons.map((reason, index) => {
            const Icon = icons[index];
            return (
              <article
                key={reason.title.en}
                className="rounded-2xl border border-border bg-card-gradient p-8 text-center transition-colors hover:border-primary/25 md:text-left"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-softmint text-primary md:mx-0">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold">{t(reason.title, lang)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(reason.description, lang)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
