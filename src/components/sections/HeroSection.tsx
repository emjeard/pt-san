import { ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactPath, routeFor } from "@/lib/routes";
import { trackEvent } from "@/lib/analytics";
import heroDashboard from "@/assets/hero-dashboard-preview.webp";

const HeroSection = () => {
  const { lang } = useLanguage();
  const content = lang === "id"
    ? {
        badge: "Solusi digital untuk setiap tahap bisnis",
        headline: "Dari website siap pakai hingga software custom.",
        subheadline: "Mulai dari website bisnis yang cepat diluncurkan hingga sistem enterprise yang dirancang untuk proses operasional kompleks.",
        primary: "Lihat paket website",
        secondary: "Konsultasikan software custom",
        caseStudies: "Lihat studi kasus",
        imageLabel: "Ilustrasi dashboard bisnis SAN Solution",
      }
    : {
        badge: "Digital solutions for every stage of business",
        headline: "From ready-to-launch websites to custom software.",
        subheadline: "Start with a business website that is easy to launch, or build an enterprise system around complex operational needs.",
        primary: "View website packages",
        secondary: "Discuss custom software",
        caseStudies: "View case studies",
        imageLabel: "Illustrative SAN Solution business dashboard",
      };

  const solutionsPath = routeFor("solutions", lang);
  const customPath = contactPath(lang, { type: "custom" });
  const caseStudiesPath = routeFor("caseStudies", lang);

  return (
    <section className="relative overflow-hidden bg-[var(--gradient-hero)]">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="container-narrow section-padding pb-20 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="animate-fade-up"><span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-sm text-muted-foreground">{content.badge}</span></div>
            <h1 className="animate-fade-up-delay-1 mt-6 max-w-2xl text-4xl font-extrabold leading-[1.12] sm:text-5xl lg:mx-0 lg:text-[3.25rem]">{content.headline}</h1>
            <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">{content.subheadline}</p>
            <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button size="lg" className="gap-2 px-8 text-base" asChild>
                <Link to={solutionsPath} onClick={() => trackEvent("solution_cta_click", { location: "hero_primary", locale: lang })}>{content.primary}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-white/80 px-8 text-base" asChild>
                <Link to={customPath} onClick={() => trackEvent("custom_service_cta_click", { location: "hero_secondary", locale: lang })}><MessageSquare className="h-4 w-4" aria-hidden="true" />{content.secondary}</Link>
              </Button>
            </div>
            <Link to={caseStudiesPath} className="mt-5 inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">{content.caseStudies}<ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="animate-fade-up-delay-2 mx-auto w-full max-w-lg lg:max-w-none">
            <figure className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-softmint/60 to-transparent blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white/90 p-2 shadow-soft sm:p-3">
                <img src={heroDashboard} alt={content.imageLabel} width={1400} height={1050} loading="eager" decoding="async" className="h-auto w-full rounded-xl object-cover" />
                <figcaption className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border/80 bg-white/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm">{content.imageLabel}</figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
