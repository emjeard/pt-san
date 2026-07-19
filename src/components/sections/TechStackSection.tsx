import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const TechStackSection = () => {
  const { lang } = useLanguage();
  const tech = translations.tech;

  return (
    <section id="tech" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label={t(tech.label, lang)}
          title={t(tech.title, lang)}
          subtitle={t(tech.subtitle, lang)}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tech.categories.map((cat) => {
            const label = typeof cat.label === "string" ? cat.label : t(cat.label, lang);
            return (
              <div
                key={label}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                  {label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li key={item}>
                      <span className="inline-block rounded-lg bg-secondary px-3 py-1.5 text-sm text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
