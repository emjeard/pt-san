import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { Button } from "@/components/ui/button";
import { formatIDR, siteSolution } from "@/data/solutions";
import { contactPath } from "@/lib/routes";
import { t } from "@/data/translations";
import { trackEvent } from "@/lib/analytics";

export type SitePricingCardsProps = {
  locale: SiteLocale;
  compact?: boolean;
};

export const SitePricingCards = ({ locale, compact = false }: SitePricingCardsProps) => (
  <div className="grid gap-5 md:grid-cols-3">
    {siteSolution.packages?.map((pkg) => (
      <article
        key={pkg.id}
        className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm ${pkg.featured ? "border-primary/40 ring-2 ring-primary/10" : "border-border"}`}
      >
        {pkg.featured ? (
          <span className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {locale === "id" ? "Paling populer" : "Most popular"}
          </span>
        ) : null}
        <h3 className="text-xl font-semibold">{t(pkg.name, locale)}</h3>
        <p className="mt-2 min-h-12 text-sm text-muted-foreground">{t(pkg.description, locale)}</p>
        <div className="mt-5 border-y border-border py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{locale === "id" ? "Tahun pertama" : "First year"}</p>
          <p className="mt-1 text-2xl font-bold">{formatIDR(pkg.firstYear)}</p>
          <p className="mt-1 text-sm text-muted-foreground">{locale === "id" ? "Renewal mulai " : "Renewal from "}{formatIDR(pkg.renewal)}/year</p>
        </div>
        <ul className="mt-5 space-y-3">
          {pkg.features.map((feature) => (
            <li key={feature.en} className="flex gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {t(feature, locale)}
            </li>
          ))}
        </ul>
        {!compact ? (
          <Button asChild variant={pkg.featured ? "default" : "outline"} className="mt-6 min-h-11 w-full gap-2">
            <Link
              to={contactPath(locale, { solutionId: siteSolution.id, packageId: pkg.id })}
              onClick={() => trackEvent("pricing_package_select", { solution_id: siteSolution.id, package_id: pkg.id, locale })}
            >
              {locale === "id" ? "Pilih paket" : "Choose package"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        ) : null}
      </article>
    ))}
  </div>
);
