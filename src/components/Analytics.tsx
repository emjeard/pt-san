import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Ensures GA4 is loaded and tracks SPA route transitions.
 * Does not send form field contents or other PII.
 */
export const Analytics = () => {
  const id = siteConfig.analytics.gaMeasurementId || "G-51D874NJC9";
  
  let location = { pathname: "/", search: "" };
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    location = useLocation();
  } catch {
    // Fallback if rendered outside Router context
  }

  useEffect(() => {
    if (!id || typeof document === "undefined") return;

    // Inject script if not already present in HTML
    if (!document.getElementById("san-ga-script") && !window.gtag) {
      const script = document.createElement("script");
      script.id = "san-ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = ((...args: [string, string | Date, Record<string, unknown>?]) => {
        window.dataLayer?.push(args);
      }) as typeof window.gtag;
      window.gtag?.("js", new Date());
    }

    // Send pageview to GA4 on SPA route changes
    if (typeof window.gtag === "function") {
      window.gtag("config", id, {
        page_path: location.pathname + location.search,
        anonymize_ip: true,
      });
    }

    const locale = location.pathname.startsWith("/en") ? "en" : "id";
    if (location.pathname === "/harga" || location.pathname === "/en/pricing") {
      trackEvent("pricing_view", { locale });
    } else if (location.pathname.startsWith("/solusi/") || location.pathname.startsWith("/en/solutions/")) {
      const solutionId = location.pathname.split("/").filter(Boolean).at(-1);
      trackEvent("solution_view", { locale, solution_id: solutionId });
    }
  }, [id, location.pathname, location.search]);

  return null;
};
