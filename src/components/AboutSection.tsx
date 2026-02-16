import { Code2, Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const icons = [Code2, Server];

const AboutSection = () => {
  const { lang } = useLanguage();
  const about = translations.about;

  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">{t(about.label, lang)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(about.title, lang)}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t(about.subtitle, lang)}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {about.founders.map((founder, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="bg-card-gradient border border-border rounded-xl p-8 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t(founder.title, lang)}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {t(founder.description, lang)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground font-mono"
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

export default AboutSection;
