import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";
import { routeFor } from "@/lib/routes";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  const { lang } = useLanguage();
  const hero = translations.hero;

  const contactPath = `${routeFor("contact", lang)}`;
  const caseStudiesPath = routeFor("caseStudies", lang);

  return (
    <section className="relative overflow-hidden bg-[var(--gradient-hero)]">
      <div className="absolute inset-0 bg-glow pointer-events-none" />

      <div className="container-narrow section-padding pb-20 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-sm text-muted-foreground">
                {t(hero.badge, lang)}
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 mt-6 max-w-2xl text-4xl font-extrabold leading-[1.12] sm:text-5xl lg:mx-0 lg:text-[3.25rem]">
              {t(hero.headline, lang)}
            </h1>

            <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
              {t(hero.subheadline, lang)}
            </p>

            <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button size="lg" className="gap-2 px-8 text-base" asChild>
                <Link
                  to={contactPath}
                  onClick={() => trackEvent("consultation_cta_click", { location: "hero_primary" })}
                >
                  {t(hero.ctaPrimary, lang)} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 text-base bg-white/80" asChild>
                <Link to={caseStudiesPath}>{t(hero.ctaSecondary, lang)}</Link>
              </Button>
            </div>
          </div>

          <div className="animate-fade-up-delay-2 mx-auto w-full max-w-lg lg:max-w-none">
            <div
              className="rounded-2xl border border-border bg-white/90 p-4 shadow-soft"
              aria-hidden="true"
            >
              <p className="mb-3 text-center text-xs text-muted-foreground">
                {t(hero.mockLabel, lang)}
              </p>
              <div className="overflow-hidden rounded-xl border border-border bg-softmint/40">
                <div className="flex items-center gap-2 border-b border-border bg-white px-4 py-3">
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <div className="h-2 w-24 rounded bg-muted" />
                  <div className="ml-auto flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-border" />
                    <span className="h-2 w-2 rounded-full bg-border" />
                    <span className="h-2 w-2 rounded-full bg-border" />
                  </div>
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="rounded-lg border border-border bg-white p-3">
                      <div className="mb-2 h-2 w-12 rounded bg-primary/20" />
                      <div className="h-6 w-16 rounded bg-muted" />
                    </div>
                  ))}
                </div>
                <div className="border-t border-border bg-white p-4">
                  <div className="mb-2 flex justify-between">
                    <div className="h-2 w-20 rounded bg-muted" />
                    <div className="h-2 w-10 rounded bg-primary/30" />
                  </div>
                  <div className="space-y-2">
                    {[72, 48, 86, 54].map((width) => (
                      <div
                        key={width}
                        className="h-2 rounded bg-secondary"
                        style={{ width: `${width}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
