import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { Button } from "@/components/ui/button";
import { customEngineeringStartingPrice, formatStartingPrice, solutions } from "@/data/solutions";
import { routeFor } from "@/lib/routes";

export const PricingSummarySection = ({ locale }: { locale: SiteLocale }) => (
  <section className="section-padding bg-white" aria-labelledby="pricing-summary-heading">
    <div className="container-narrow">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{locale === "id" ? "Ringkasan harga" : "Pricing overview"}</p><h2 id="pricing-summary-heading" className="mt-3 text-3xl sm:text-4xl">{locale === "id" ? "Mulai dari scope yang transparan" : "Start with transparent scope"}</h2></div><Button asChild variant="outline" className="min-h-11 gap-2"><Link to={routeFor("pricing", locale)}>{locale === "id" ? "Lihat detail harga" : "View pricing details"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button></div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((solution) => <div key={solution.id} className="rounded-xl border border-border bg-card p-5"><p className="font-semibold">{solution.title[locale]}</p><p className="mt-2 text-sm text-muted-foreground">{formatStartingPrice(solution.startingPrice, solution.billing, locale)}</p></div>)}
        <div className="rounded-xl border border-primary/20 bg-softmint/50 p-5"><p className="font-semibold">Custom Software</p><p className="mt-2 text-sm text-muted-foreground">{locale === "id" ? `Mulai ${formatStartingPrice(customEngineeringStartingPrice, "custom", locale).replace("Mulai ", "")}, tergantung scope` : `From ${formatStartingPrice(customEngineeringStartingPrice, "custom", locale).replace("From ", "")}, depending on scope`}</p></div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{locale === "id" ? "Biaya akhir bergantung pada scope, integrasi, volume konten, kebutuhan hosting, dan pengembangan custom." : "Final cost depends on scope, integrations, content volume, hosting requirements, and custom development."}</p>
    </div>
  </section>
);
