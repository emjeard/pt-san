import { ArrowRight, Cloud, Code2, Smartphone, Workflow } from "lucide-react";
import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { Button } from "@/components/ui/button";
import { contactPath, routeFor } from "@/lib/routes";
import { formatIDR, customEngineeringStartingPrice } from "@/data/solutions";
import { trackEvent } from "@/lib/analytics";

const items = [
  { icon: Code2, id: { id: "Website, portal, dan SaaS", en: "Websites, portals, and SaaS" } },
  { icon: Smartphone, id: { id: "Aplikasi mobile dan ekosistem produk", en: "Mobile apps and product ecosystems" } },
  { icon: Workflow, id: { id: "Enterprise systems dan integrasi API", en: "Enterprise systems and API integration" } },
  { icon: Cloud, id: { id: "DevOps, infrastruktur, dan maintainability", en: "DevOps, infrastructure, and maintainability" } },
];

export const CustomEngineeringSection = ({ locale }: { locale: SiteLocale }) => (
  <section className="section-padding bg-darksection text-white" aria-labelledby="custom-engineering-heading">
    <div className="container-narrow grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">{locale === "id" ? "Custom engineering" : "Custom engineering"}</p>
        <h2 id="custom-engineering-heading" className="mt-3 text-3xl text-white sm:text-4xl">{locale === "id" ? "Butuh sistem yang tidak bisa diselesaikan dengan paket standar?" : "Need a system that cannot be solved by a standard package?"}</h2>
        <p className="mt-5 max-w-2xl text-white/75">{locale === "id" ? "Tim SAN merancang aplikasi dan sistem berdasarkan proses bisnis, integrasi, keamanan, dan kebutuhan operasional. Custom software mulai dari Rp15 juta, tergantung scope." : "SAN designs applications and systems around business processes, integrations, security, and operations. Custom software starts from Rp15m, depending on scope."}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild variant="secondary" className="min-h-11 gap-2">
            <Link to={contactPath(locale, { type: "custom" })} onClick={() => trackEvent("custom_service_cta_click", { locale, source_section: "custom_engineering" })}>{locale === "id" ? "Diskusikan kebutuhan sistem" : "Discuss your system"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </Button>
          <Button asChild variant="outline" className="min-h-11 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link to={routeFor("services", locale)}>{locale === "id" ? "Lihat layanan custom" : "View custom services"}</Link>
          </Button>
        </div>
        <p className="mt-5 text-sm text-white/55">{locale === "id" ? `Referensi mulai: ${formatIDR(customEngineeringStartingPrice)}. Final cost depends on scope, integrations, data, and hosting.` : `Starting reference: ${formatIDR(customEngineeringStartingPrice)}. Final cost depends on scope, integrations, data, and hosting.`}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(({ icon: Icon, id }) => <div key={id.en} className="rounded-xl border border-white/10 bg-white/5 p-5"><Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" /><p className="mt-4 text-sm font-medium text-white/90">{id[locale]}</p></div>)}
      </div>
    </div>
  </section>
);
