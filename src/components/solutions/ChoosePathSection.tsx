import { ArrowRight, Boxes, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { Button } from "@/components/ui/button";
import { routeFor, contactPath } from "@/lib/routes";
import { trackEvent } from "@/lib/analytics";

export const ChoosePathSection = ({ locale }: { locale: SiteLocale }) => (
  <section className="section-padding bg-white" aria-labelledby="choose-path-heading">
    <div className="container-narrow">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{locale === "id" ? "Pilih jalur yang tepat" : "Choose your path"}</p>
        <h2 id="choose-path-heading" className="mt-3 text-3xl sm:text-4xl">{locale === "id" ? "Mulai dari solusi yang sesuai kebutuhan Anda" : "Start with the solution that fits your needs"}</h2>
        <p className="mt-4 text-muted-foreground">{locale === "id" ? "Scope jelas untuk kebutuhan siap pakai, atau pendekatan discovery untuk sistem yang benar-benar khusus." : "Choose a defined scope for a ready solution, or a discovery-led approach for a truly custom system."}</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-primary/20 bg-softmint/50 p-7 md:p-9">
          <Boxes className="h-8 w-8 text-primary" aria-hidden="true" />
          <h3 className="mt-5 text-2xl">{locale === "id" ? "Saya butuh website / solusi siap pakai" : "I need a website / ready solution"}</h3>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {(locale === "id" ? ["Mulai dengan scope dan harga yang jelas", "Fondasi terkelola untuk launch lebih cepat", "Bisa dikembangkan ketika kebutuhan bertambah"] : ["Start with clear scope and pricing", "Managed foundation for a faster launch", "Can evolve as your needs grow"]).map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />{item}</li>)}
          </ul>
          <Button asChild className="mt-7 min-h-11 gap-2">
            <Link to={routeFor("solutions", locale)} onClick={() => trackEvent("solution_cta_click", { locale, source_section: "choose_path" })}>{locale === "id" ? "Lihat solusi siap pakai" : "View ready solutions"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </article>
        <article className="rounded-2xl border border-border bg-darksection p-7 text-white md:p-9">
          <Code2 className="h-8 w-8 text-emerald-300" aria-hidden="true" />
          <h3 className="mt-5 text-2xl text-white">{locale === "id" ? "Saya butuh software sesuai kebutuhan" : "I need software built around my needs"}</h3>
          <ul className="mt-5 space-y-2 text-sm text-white/75">
            {(locale === "id" ? ["Workflow dan integrasi yang spesifik", "Modernisasi sistem lama dan migrasi data", "Arsitektur yang dirancang untuk operasional jangka panjang"] : ["Specific workflows and integrations", "Legacy modernization and data migration", "Architecture designed for long-term operations"]).map((item) => <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />{item}</li>)}
          </ul>
          <Button asChild variant="secondary" className="mt-7 min-h-11 gap-2">
            <Link to={contactPath(locale, { type: "custom" })} onClick={() => trackEvent("custom_service_cta_click", { locale, source_section: "choose_path" })}>{locale === "id" ? "Konsultasikan software custom" : "Discuss custom software"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </Button>
        </article>
      </div>
    </div>
  </section>
);
