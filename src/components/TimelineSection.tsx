import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const TimelineSection = () => {
  const { lang } = useLanguage();
  const tl = translations.timeline;

  return (
    <section id="timeline" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            {t(tl.label, lang)}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            {t(tl.title, lang)}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t(tl.subtitle, lang)}
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-12">
            {tl.milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10 shadow-glow" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="inline-block text-sm font-mono text-primary font-semibold tracking-wider mb-1">
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{t(milestone.title, lang)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(milestone.description, lang)}
                    </p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
