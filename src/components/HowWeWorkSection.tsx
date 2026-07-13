import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const HowWeWorkSection = () => {
  const { lang } = useLanguage();
  const { label, title, subtitle, steps } = translations.howWeWork;

  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-softmint rounded-full mb-4">
            {t(label, lang)}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t(title, lang)}
          </h2>
          <p className="text-secondary-foreground text-lg">
            {t(subtitle, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="relative p-6 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-full bg-softmint text-primary flex items-center justify-center font-bold mb-4">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(step.title, lang)}</h3>
              <p className="text-secondary-foreground text-sm leading-relaxed">
                {t(step.description, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
