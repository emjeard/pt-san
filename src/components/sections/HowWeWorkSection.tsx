import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const HowWeWorkSection = () => {
  const { lang } = useLanguage();
  const { label, title, subtitle, steps } = translations.howWeWork;

  return (
    <section id="process" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label={t(label, lang)}
          title={t(title, lang)}
          subtitle={t(subtitle, lang)}
          align="center"
          className="mx-auto mb-14"
        />

        <ol className="grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step.title.en}
              className="relative rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-softmint text-sm font-bold text-primary"
                aria-hidden="true"
              >
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold">{t(step.title, lang)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(step.description, lang)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
