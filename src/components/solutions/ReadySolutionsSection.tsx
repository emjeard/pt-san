import type { SiteLocale } from "@/config/site";
import { solutions } from "@/data/solutions";
import { SolutionCard } from "@/components/solutions/SolutionCard";

export const ReadySolutionsSection = ({ locale, includeSite = false }: { locale: SiteLocale; includeSite?: boolean }) => {
  const visibleSolutions = includeSite ? solutions : solutions.filter((solution) => solution.id !== "san-site");
  return (
    <section className="section-padding bg-softmint/30" aria-labelledby="ready-solutions-heading">
      <div className="container-narrow">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{locale === "id" ? "Solusi siap pakai" : "Ready solutions"}</p>
          <h2 id="ready-solutions-heading" className="mt-3 text-3xl sm:text-4xl">{locale === "id" ? "Mulai dengan scope yang lebih mudah dipahami" : "Start with a scope that is easy to understand"}</h2>
          <p className="mt-4 text-muted-foreground">{locale === "id" ? "Paket productized untuk kebutuhan yang berulang, dengan ruang konsultasi ketika kebutuhan Anda lebih spesifik." : "Productized packages for recurring needs, with consultation available when your requirements become more specific."}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleSolutions.map((solution) => <SolutionCard key={solution.id} solution={solution} locale={locale} featured={solution.id === "san-site"} />)}
        </div>
      </div>
    </section>
  );
};
