import { Shield, Zap, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const icons = [Shield, Zap, TrendingUp];

const WhyUsSection = () => {
  const { lang } = useLanguage();
  const why = translations.whyUs;

  return (
    <section id="why-us" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">{t(why.label, lang)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(why.title, lang)}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {why.reasons.map((reason, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="text-center p-8 rounded-xl border border-border bg-card-gradient hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{t(reason.title, lang)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(reason.description, lang)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
