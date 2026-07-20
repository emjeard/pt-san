import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/ui-custom/Reveal";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";
import { trackEvent } from "@/lib/analytics";
import {
  isContactFormConfigured,
  submitContactForm,
  type ContactFormData,
  type ContactFormErrors,
} from "@/lib/contact";

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  projectType: string;
  projectStage: string;
  message: string;
  website: string;
};

const emptyForm = (): FormState => ({
  name: "",
  email: "",
  whatsapp: "",
  company: "",
  projectType: "",
  projectStage: "",
  message: "",
  website: "",
});

const ContactSection = () => {
  const { lang } = useLanguage();
  const c = translations.contact;
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const formStartedAt = useRef(Date.now());
  const hasTrackedStart = useRef(false);
  const endpointConfigured = isContactFormConfigured();

  const whatsappUrl = getWhatsAppUrl(t(c.whatsappPrefill, lang));

  const mapValidationError = (message: string): string => {
    const map: Record<string, { en: string; id: string }> = {
      "Name is required": { en: "Name is required", id: "Nama wajib diisi" },
      "Email or WhatsApp is required": {
        en: "Email or WhatsApp is required",
        id: "Email atau WhatsApp wajib diisi",
      },
      "Invalid email address": {
        en: "Invalid email address",
        id: "Alamat email tidak valid",
      },
      "Project type is required": {
        en: "Project type is required",
        id: "Jenis proyek wajib diisi",
      },
      "Message is required": { en: "Message is required", id: "Pesan wajib diisi" },
      "Please wait a moment before submitting": {
        en: "Please wait a moment before submitting",
        id: "Tunggu sebentar sebelum mengirim",
      },
    };
    return map[message]?.[lang] ?? t(c.errorGeneric, lang);
  };

  const trackFormStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent("contact_form_start", { location: "homepage_contact" });
  };

  const updateField = (field: keyof FormState, value: string) => {
    trackFormStart();
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpointConfigured) return;

    setStatus("loading");
    setStatusMessage("");
    setErrors({});

    const payload: ContactFormData = {
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      company: form.company,
      projectType: form.projectType,
      projectStage: form.projectStage,
      message: form.message,
      website: form.website,
      formStartedAt: formStartedAt.current,
    };

    try {
      await submitContactForm(payload);
      setStatus("success");
      setStatusMessage(t(c.successDescription, lang));
      setForm(emptyForm());
      formStartedAt.current = Date.now();
      hasTrackedStart.current = false;
      trackEvent("contact_form_success", { location: "homepage_contact" });
    } catch (error) {
      const message = error instanceof Error ? error.message : t(c.errorGeneric, lang);
      setStatus("error");
      setStatusMessage(mapValidationError(message));
      trackEvent("contact_form_error", {
        location: "homepage_contact",
        reason: message.slice(0, 100),
      });
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-narrow max-w-3xl">
        <Reveal>
          <div className="mb-10 overflow-hidden rounded-2xl bg-darksection px-8 py-10 text-center text-white">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {t(c.ctaBandTitle, lang)}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">{t(c.ctaBandSubtitle, lang)}</p>
          {whatsappUrl ? (
            <Button
              size="lg"
              variant="secondary"
              className="mt-6 gap-2"
              asChild
              onClick={() =>
                trackEvent("whatsapp_contact_click", { location: "contact_cta_band" })
              }
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                {t(c.whatsappCta, lang)}
              </a>
            </Button>
          ) : null}
          </div>
        </Reveal>

        <SectionHeading
          label={t(c.label, lang)}
          title={t(c.title, lang)}
          subtitle={t(c.subtitle, lang)}
          align="center"
          className="mx-auto mb-8"
        />

        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t(c.supportLabel, lang)}{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium text-primary hover:underline"
            onClick={() => trackEvent("email_contact_click", { location: "contact_support" })}
          >
            {siteConfig.contact.email}
          </a>
          {siteConfig.contact.whatsappDisplay ? (
            <>
              <span className="mx-2 text-border">|</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                onClick={() =>
                  trackEvent("whatsapp_contact_click", { location: "contact_support" })
                }
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {siteConfig.contact.whatsappDisplay}
              </a>
            </>
          ) : null}
        </p>

        {!endpointConfigured ? (
          <div
            className="mb-6 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground"
            role="status"
          >
            {t(c.formDisabled, lang)}
          </div>
        ) : null}

        <Reveal delay={80}>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-white p-8 shadow-sm"
          noValidate
        >
          <div className="sr-only" aria-hidden="true">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{t(c.name, lang)}</Label>
              <Input
                id="contact-name"
                name="name"
                required
                value={form.name}
                placeholder={t(c.namePlaceholder, lang)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                onChange={(event) => updateField("name", event.target.value)}
              />
              {errors.name ? (
                <p id="contact-name-error" className="text-sm text-destructive">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">{t(c.email, lang)}</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                placeholder={t(c.emailPlaceholder, lang)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                onChange={(event) => updateField("email", event.target.value)}
              />
              {errors.email ? (
                <p id="contact-email-error" className="text-sm text-destructive">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{t(c.emailOrWhatsapp, lang)}</p>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-whatsapp">{t(c.whatsapp, lang)}</Label>
              <Input
                id="contact-whatsapp"
                name="whatsapp"
                type="tel"
                value={form.whatsapp}
                placeholder={t(c.whatsappPlaceholder, lang)}
                onChange={(event) => updateField("whatsapp", event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-company">{t(c.company, lang)}</Label>
              <Input
                id="contact-company"
                name="company"
                value={form.company}
                placeholder={t(c.companyPlaceholder, lang)}
                onChange={(event) => updateField("company", event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-project-type">{t(c.projectType, lang)}</Label>
              <Input
                id="contact-project-type"
                name="projectType"
                required
                value={form.projectType}
                placeholder={t(c.projectTypePlaceholder, lang)}
                aria-invalid={Boolean(errors.projectType)}
                onChange={(event) => updateField("projectType", event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-project-stage">{t(c.projectStage, lang)}</Label>
              <Input
                id="contact-project-stage"
                name="projectStage"
                value={form.projectStage}
                placeholder={t(c.projectStagePlaceholder, lang)}
                onChange={(event) => updateField("projectStage", event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">{t(c.message, lang)}</Label>
            <Textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={form.message}
              placeholder={t(c.messagePlaceholder, lang)}
              className="resize-none"
              aria-invalid={Boolean(errors.message)}
              onChange={(event) => updateField("message", event.target.value)}
            />
          </div>

          <div aria-live="polite" aria-atomic="true" className="min-h-[1.25rem]">
            {status === "success" ? (
              <p className="rounded-lg bg-softmint px-4 py-3 text-sm text-primary">
                <strong>{t(c.successTitle, lang)}</strong> {statusMessage}
              </p>
            ) : null}
            {status === "error" ? (
              <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {statusMessage}{" "}
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline"
                    onClick={() =>
                      trackEvent("whatsapp_contact_click", { location: "contact_form_error" })
                    }
                  >
                    {t(c.whatsappCta, lang)}
                  </a>
                ) : null}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={status === "loading" || !endpointConfigured}
          >
            <Send className="h-4 w-4" />
            {status === "loading" ? t(c.sending, lang) : t(c.send, lang)}
          </Button>

          {!endpointConfigured && whatsappUrl ? (
            <Button size="lg" variant="outline" className="w-full gap-2" asChild>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_contact_click", { location: "contact_form_fallback" })
                }
              >
                <MessageCircle className="h-4 w-4" />
                {t(c.whatsappCta, lang)}
              </a>
            </Button>
          ) : null}
        </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
