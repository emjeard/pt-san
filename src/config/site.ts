export const siteConfig = {
  brandName: "SAN Solution",
  shortName: "SAN",
  siteUrl: "https://www.sansolution.tech",
  defaultLocale: "id" as const,
  supportedLocales: ["id", "en"] as const,

  contact: {
    /** Business email — only render when configured */
    email:
      import.meta.env.VITE_CONTACT_EMAIL?.trim() || "kontak@sansolution.tech",
    /**
     * WhatsApp in international format without + (e.g. 628568862327).
     * Display number may differ for local formatting.
     */
    whatsappNumber:
      import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "").trim() ||
      "628568862327",
    whatsappDisplay: "0856-8862-327",
    /**
     * Contact form POST destination.
     * Defaults to /api/contact (Vite middleware locally, Netlify Function in production).
     */
    formEndpoint:
      import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || "/api/contact",
  },

  social: {
    /** Founder profile — not a company page until confirmed */
    linkedin: "https://www.linkedin.com/in/muchamad-jeffri-a7715749/",
    linkedinLabel: "Founder LinkedIn",
    github: "https://github.com/emjeard",
    githubLabel: "Founder GitHub",
    instagram: "",
  },

  company: {
    legalName: "",
    city: "",
    country: "Indonesia",
    foundingYear: "2023",
  },

  analytics: {
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "",
  },
} as const;

export type SiteLocale = (typeof siteConfig.supportedLocales)[number];

export const getWhatsAppUrl = (message: string) => {
  const number = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (!number) return "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

export const absoluteUrl = (path = "/") => {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};
