import { Building2, Rocket, Smartphone, Cloud } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const icons = [Building2, Rocket, Smartphone, Cloud];

const ServicesSection = () => {
  const { lang } = useLanguage();
  const svc = translations.services;

  return (
    <section id="services" className="section-padding bg-glow">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">{t(svc.label, lang)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(svc.title, lang)}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t(svc.subtitle, lang)}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {svc.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="group bg-card-gradient border border-border rounded-xl p-8 hover:border-primary/40 hover:shadow-glow transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(service.title, lang)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {t(service.description, lang)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground font-mono"
                    >
                      {tag}
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

export default ServicesSection;
