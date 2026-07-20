import { Database, Eye, GitBranch, RefreshCw, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui-custom/Reveal";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { businessProblems, problemsSection } from "@/data/problems";
import { t } from "@/data/translations";

const iconMap = {
  workflow: RefreshCw,
  data: Database,
  legacy: GitBranch,
  scale: TrendingUp,
  visibility: Eye,
} as const;

const ProblemsSection = () => {
  const { lang } = useLanguage();

  return (
    <section id="problems" className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          label={t(problemsSection.label, lang)}
          title={t(problemsSection.title, lang)}
          subtitle={t(problemsSection.subtitle, lang)}
          align="center"
          className="mx-auto mb-14"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessProblems.map((problem, index) => {
            const Icon = iconMap[problem.icon];
            return (
              <Reveal key={problem.id} delay={index * 60}>
                <article className="rounded-2xl border border-border bg-white p-7 shadow-sm transition-shadow hover:shadow-soft">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-softmint text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold">{t(problem.title, lang)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(problem.description, lang)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
