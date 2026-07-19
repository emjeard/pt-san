import { useNavigate } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type LanguageSwitcherProps = {
  currentLocale: SiteLocale;
  idPath: string;
  enPath: string;
  className?: string;
};

export const LanguageSwitcher = ({
  currentLocale,
  idPath,
  enPath,
  className,
}: LanguageSwitcherProps) => {
  const navigate = useNavigate();

  const switchTo = (target: SiteLocale) => {
    if (target === currentLocale) return;

    trackEvent("language_switch", {
      from: currentLocale,
      to: target,
    });

    navigate(target === "id" ? idPath : enPath);
  };

  const locales: SiteLocale[] = ["id", "en"];

  return (
    <div
      className={cn("inline-flex items-center rounded-full border border-border bg-card p-1", className)}
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-pressed={isActive}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {locale}
          </button>
        );
      })}
    </div>
  );
};
