import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "@/config/site";

/**
 * Loads GA4 and tracks SPA route transitions.
 * Does not send form field contents or other PII.
 */
export const Analytics = () => {
  const id = siteConfig.analytics.gaMeasurementId;
  const location = useLocation();

  useEffect(() => {
    if (!id || typeof document === "undefined") return;

    if (!document.getElementById("san-ga-script")) {
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
    window.gtag?.("config", id, {
      page_path: location.pathname + location.search,
      anonymize_ip: true,
    });
  }, [id, location]);

  return null;
};
