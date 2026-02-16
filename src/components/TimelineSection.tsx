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

          <div className="space-y-14">
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
                  <div
                    className={`absolute left-4 md:left-1/2 w-3.5 h-3.5 rounded-full border-4 border-background -translate-x-[7px] md:-translate-x-[7px] mt-1.5 z-10 ${
                      milestone.highlight
                        ? "bg-primary shadow-glow"
                        : "bg-muted-foreground"
                    }`}
                  />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`rounded-xl border p-5 transition-colors ${
                        milestone.highlight
                          ? "border-primary/30 bg-card-gradient shadow-glow"
                          : "border-border bg-card/50"
                      }`}
                    >
                      <span
                        className={`inline-block text-sm font-mono font-semibold tracking-wider mb-2 ${
                          milestone.highlight ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-bold mb-2">
                        {t(milestone.title, lang)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {t(milestone.description, lang)}
                      </p>
                      <div className={`flex flex-wrap gap-1.5 ${isLeft ? "md:justify-end" : ""}`}>
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
