import { Code2, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const icons = [Code2, Server];

const TeamExpertiseSection = () => {
  const { lang } = useLanguage();
  const expertise = translations.expertise;

  return (
    <section id="expertise" className="section-padding bg-softmint/30">
      <div className="container-narrow">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-softmint rounded-full mb-4">
            {t(expertise.label, lang)}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(expertise.title, lang)}</h2>
          <p className="text-secondary-foreground text-lg">{t(expertise.subtitle, lang)}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {expertise.founders.map((founder, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="bg-white border border-border shadow-sm hover:shadow-md rounded-2xl p-8 transition-shadow duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-softmint flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{t(founder.title, lang)}</h3>
                  </div>
                </div>
                <p className="text-secondary-foreground text-base leading-relaxed mb-6">
                  {t(founder.description, lang)}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-secondary text-sm text-secondary-foreground"
                    >
                      {skill}
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

export default TeamExpertiseSection;
