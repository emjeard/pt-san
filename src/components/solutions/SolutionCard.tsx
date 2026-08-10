import { ArrowRight, Building2, GraduationCap, Mail, Newspaper, ShoppingBag, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import type { SiteLocale } from "@/config/site";
import { Button } from "@/components/ui/button";
import { formatStartingPrice, type Solution } from "@/data/solutions";
import { solutionPath } from "@/lib/routes";
import { trackEvent } from "@/lib/analytics";
import { t } from "@/data/translations";

const icons: Record<Solution["id"], LucideIcon> = {
  "san-site": Globe2,
  "san-corporate": Building2,
  "san-publisher": Newspaper,
  "san-education": GraduationCap,
  "san-commerce": ShoppingBag,
  "san-growth": Mail,
};

export type SolutionCardProps = {
  solution: Solution;
  locale: SiteLocale;
  featured?: boolean;
};

export const SolutionCard = ({ solution, locale, featured = false }: SolutionCardProps) => {
  const Icon = icons[solution.id];
  const href = solutionPath(solution.slug[locale], locale);

  return (
    <article className={`group flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft md:p-7 ${featured ? "border-primary/35 ring-1 ring-primary/10" : "border-border"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-softmint text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        {featured ? (
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {locale === "id" ? "Pilihan awal" : "Best starting point"}
          </span>
        ) : null}
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t(solution.eyebrow, locale)}</p>
      <h3 className="mt-2 text-xl font-semibold">{t(solution.title, locale)}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(solution.summary, locale)}</p>
      <p className="mt-5 text-base font-bold text-foreground">{formatStartingPrice(solution.startingPrice, solution.billing, locale)}</p>
      <ul className="mt-4 space-y-2">
        {solution.included.slice(0, 3).map((item) => (
          <li key={item.en} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {t(item, locale)}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Button variant="link" className="h-auto p-0 text-primary" asChild>
          <Link
            to={href}
            onClick={() => trackEvent("solution_cta_click", { solution_id: solution.id, locale, source_section: "solution_card" })}
            className="inline-flex items-center gap-1"
          >
            {locale === "id" ? "Lihat solusi" : "View solution"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  );
};
