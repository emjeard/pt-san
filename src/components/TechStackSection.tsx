import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const TechStackSection = () => {
  const { lang } = useLanguage();
  const tech = translations.tech;

  return (
    <section id="tech" className="section-padding bg-glow">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">{t(tech.label, lang)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(tech.title, lang)}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t(tech.subtitle, lang)}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tech.categories.map((cat, i) => {
            const label = typeof cat.label === "string" ? cat.label : t(cat.label, lang);
            return (
              <div key={i} className="bg-card-gradient border border-border rounded-xl p-6">
                <h3 className="text-sm font-mono text-primary tracking-wider uppercase mb-4">
                  {label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg bg-secondary text-sm text-secondary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
