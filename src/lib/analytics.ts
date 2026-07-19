import { siteConfig } from "@/config/site";

export type AnalyticsEventName =
  | "consultation_cta_click"
  | "contact_form_start"
  | "contact_form_success"
  | "contact_form_error"
  | "whatsapp_contact_click"
  | "email_contact_click"
  | "language_switch"
  | "portfolio_external_link_click";

export type AnalyticsEventProps = Record<
  string,
  string | number | boolean | undefined
>;

const PII_KEYS = new Set([
  "email",
  "name",
  "phone",
  "whatsapp",
  "message",
  "company",
  "user_email",
  "user_name",
  "user_phone",
]);

const sanitizeProps = (
  props?: AnalyticsEventProps,
): Record<string, string | number | boolean> | undefined => {
  if (!props) return undefined;

  const sanitized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) continue;
    if (PII_KEYS.has(key.toLowerCase())) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = value;
    }
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
};

const getMeasurementId = (): string =>
  siteConfig.analytics.gaMeasurementId ||
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ||
  "";

const isGtagAvailable = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.gtag === "function" &&
  Boolean(getMeasurementId());

/**
 * Track a GA4 event. Never sends PII. Only fires when gtag and
 * VITE_GA_MEASUREMENT_ID are configured.
 */
export const trackEvent = (
  name: AnalyticsEventName,
  props?: AnalyticsEventProps,
): void => {
  if (!isGtagAvailable()) return;

  const measurementId = getMeasurementId();
  const sanitized = sanitizeProps(props);

  window.gtag!("event", name, {
    send_to: measurementId,
    ...sanitized,
  });
};

export const isAnalyticsEnabled = (): boolean => isGtagAvailable();
