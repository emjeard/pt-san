import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const tagColors: Record<string, string> = {
  Enterprise: "bg-primary/15 text-primary border-primary/20",
  SaaS: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Public Sector": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Mobile: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

const PortfolioSection = () => {
  const { lang } = useLanguage();
  const port = translations.portfolio;

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">{t(port.label, lang)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(port.title, lang)}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t(port.subtitle, lang)}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {port.projects.map((project, i) => (
            <div
              key={i}
              className="group bg-card-gradient border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-1 bg-gradient-to-r from-primary to-primary/50" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant="outline"
                    className={`text-xs font-mono ${tagColors[project.tag] || ""}`}
                  >
                    {project.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{t(project.client, lang)}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{t(project.title, lang)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {t(project.description, lang)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded bg-secondary text-xs text-secondary-foreground font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
