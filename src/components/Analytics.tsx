import { useEffect } from "react";
import { siteConfig } from "@/config/site";

/**
 * Loads GA4 only when a measurement ID is configured.
 * Does not send form field contents or other PII.
 */
export const Analytics = () => {
  const id = siteConfig.analytics.gaMeasurementId;

  useEffect(() => {
    if (!id || typeof document === "undefined") return;
    if (document.getElementById("san-ga-script")) return;

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
    window.gtag?.("config", id, { anonymize_ip: true });
  }, [id]);

  return null;
};
