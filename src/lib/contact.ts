import { siteConfig } from "@/config/site";

export type ContactFormData = {
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  projectType: string;
  projectStage?: string;
  preferredContact?: string;
  message: string;
  /** Honeypot field — must remain empty for legitimate submissions. */
  website?: string;
  /** Client-side timestamp (ms) when the form was opened. */
  formStartedAt?: number;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export type ContactFormValidationResult = {
  valid: boolean;
  errors: ContactFormErrors;
};

export type ContactFormSubmitResult = {
  ok: true;
};

const MIN_SUBMISSION_MS = 3000;

const hasContactMethod = (data: ContactFormData): boolean =>
  Boolean(data.email?.trim() || data.whatsapp?.trim());

export const validateContactForm = (
  data: ContactFormData,
): ContactFormValidationResult => {
  const errors: ContactFormErrors = {};

  if (!data.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!hasContactMethod(data)) {
    errors.email = "Email or WhatsApp is required";
  } else if (data.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Invalid email address";
  }

  if (!data.projectType?.trim()) {
    errors.projectType = "Project type is required";
  }

  if (!data.message?.trim()) {
    errors.message = "Message is required";
  }

  if (data.website?.trim()) {
    errors.website = "Invalid submission";
  }

  if (data.formStartedAt) {
    const elapsed = Date.now() - data.formStartedAt;
    if (elapsed < MIN_SUBMISSION_MS) {
      errors.message = "Please wait a moment before submitting";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

const getFormEndpoint = (): string =>
  siteConfig.contact.formEndpoint ||
  import.meta.env.VITE_CONTACT_ENDPOINT?.trim() ||
  "/api/contact";

const buildPayload = (data: ContactFormData): Record<string, unknown> => {
  const payload: Record<string, unknown> = {
    name: data.name.trim(),
    email: data.email.trim(),
    projectType: data.projectType.trim(),
    message: data.message.trim(),
    website: data.website?.trim() || "",
    formStartedAt: data.formStartedAt,
  };

  if (data.whatsapp?.trim()) payload.whatsapp = data.whatsapp.trim();
  if (data.company?.trim()) payload.company = data.company.trim();
  if (data.projectStage?.trim()) payload.projectStage = data.projectStage.trim();
  if (data.preferredContact?.trim()) {
    payload.preferredContact = data.preferredContact.trim();
  }

  return payload;
};

/**
 * Submit the contact form to /api/contact (Resend via Netlify Function / Vite middleware).
 * Success is returned only after a successful HTTP response.
 */
export const submitContactForm = async (
  data: ContactFormData,
): Promise<ContactFormSubmitResult> => {
  const validation = validateContactForm(data);
  if (!validation.valid) {
    const firstError = Object.values(validation.errors)[0] ?? "Validation failed";
    throw new Error(firstError);
  }

  const endpoint = getFormEndpoint();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildPayload(data)),
  });

  let body: { ok?: boolean; error?: string } = {};
  try {
    body = await response.json();
  } catch {
    // ignore non-JSON
  }

  if (!response.ok) {
    throw new Error(
      body.error ||
        `Submission failed (${response.status}). Please try again or contact us via WhatsApp.`,
    );
  }

  return { ok: true };
};

/** Form is always available via /api/contact; delivery depends on RESEND_API_KEY on the server. */
export const isContactFormConfigured = (): boolean => Boolean(getFormEndpoint());

export const getContactFormFallbackMessage = (): string => {
  const whatsapp = siteConfig.contact.whatsappDisplay;
  const email = siteConfig.contact.email;
  const parts: string[] = [];

  if (whatsapp) parts.push(`WhatsApp: ${whatsapp}`);
  if (email) parts.push(`Email: ${email}`);

  return parts.length > 0
    ? parts.join(" | ")
    : "Please reach us via WhatsApp or email.";
};
