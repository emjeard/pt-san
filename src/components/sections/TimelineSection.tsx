import { Reveal } from "@/components/ui-custom/Reveal";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const TimelineSection = () => {
  const { lang } = useLanguage();
  const tl = translations.timeline;

  return (
    <section id="timeline" className="section-padding bg-softmint/20">
      <div className="container-narrow">
        <SectionHeading
          label={t(tl.label, lang)}
          title={t(tl.title, lang)}
          subtitle={t(tl.subtitle, lang)}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute bottom-0 left-4 top-0 w-px bg-border md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          />

          <ol className="space-y-10 md:space-y-12">
            {tl.milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <Reveal
                  key={milestone.year}
                  as="li"
                  delay={Math.min(index * 40, 160)}
                  className={`relative list-none md:flex md:items-start ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`absolute left-4 top-6 z-10 h-3.5 w-3.5 -translate-x-[7px] rounded-full border-4 border-background md:left-1/2 ${
                      milestone.highlight ? "bg-primary" : "bg-muted-foreground"
                    }`}
                    aria-hidden="true"
                  />

                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"
                    }`}
                  >
                    <article
                      className={`rounded-2xl border p-6 ${
                        milestone.highlight
                          ? "border-primary/25 bg-white shadow-soft"
                          : "border-border bg-white/90"
                      }`}
                    >
                      <time
                        dateTime={milestone.year.replace(/\s/g, "")}
                        className={`text-sm font-semibold tracking-wide ${
                          milestone.highlight ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {milestone.year}
                      </time>
                      <h3 className="mt-2 text-lg font-bold">{t(milestone.title, lang)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {t(milestone.description, lang)}
                      </p>
                      <ul
                        className={`mt-4 flex flex-wrap gap-1.5 ${
                          isLeft ? "md:justify-end" : ""
                        }`}
                      >
                        {milestone.tags.map((tag) => (
                          <li key={tag}>
                            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>

                  <div className="hidden md:block md:w-1/2" aria-hidden="true" />
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
