import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";
import { routeFor } from "@/lib/routes";
import { trackEvent } from "@/lib/analytics";
import heroDashboard from "@/assets/hero-dashboard-preview.webp";

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
            <figure className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-softmint/60 to-transparent blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white/90 p-2 shadow-soft sm:p-3">
                <img
                  src={heroDashboard}
                  alt={
                    lang === "id"
                      ? "Ilustrasi dashboard bisnis SAN Solution dengan grafik dan ringkasan operasional"
                      : "Illustrative SAN Solution business dashboard with charts and operational summary"
                  }
                  width={1400}
                  height={1050}
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto w-full rounded-xl object-cover"
                />
                <figcaption className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border/80 bg-white/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
                  {t(hero.mockLabel, lang)}
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
