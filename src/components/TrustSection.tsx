import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const TrustSection = () => {
  const { lang } = useLanguage();
  const { stats } = translations.trust;

  return (
    <section className="py-12 bg-white border-b border-border">
      <div className="container-narrow px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center pt-8 md:pt-0 animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-secondary-foreground font-medium text-sm md:text-base">
                {t(stat.label, lang)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
