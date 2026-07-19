import { Link } from "react-router-dom";
import { Github, Linkedin, MessageCircle } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { getCoreServices } from "@/data/services";
import { t } from "@/data/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/analytics";
import { isValidHref, routeFor, servicePath } from "@/lib/routes";

const footerCopy = {
  services: { id: "Layanan", en: "Services" },
  company: { id: "Perusahaan", en: "Company" },
  legal: { id: "Legal", en: "Legal" },
  connect: { id: "Hubungi", en: "Connect" },
  caseStudies: { id: "Studi Kasus", en: "Case Studies" },
  about: { id: "Tentang Kami", en: "About Us" },
  contact: { id: "Kontak", en: "Contact" },
  privacy: { id: "Kebijakan Privasi", en: "Privacy Policy" },
  terms: { id: "Syarat & Ketentuan", en: "Terms of Service" },
  whatsapp: { id: "WhatsApp", en: "WhatsApp" },
  description: {
    id: "Partner teknologi untuk sistem enterprise, SaaS, mobile, dan infrastruktur — dari analisis hingga implementasi.",
    en: "Technology partner for enterprise systems, SaaS, mobile, and infrastructure — from analysis through delivery.",
  },
} as const;

export const Footer = () => {
  const { lang } = useLanguage();
  const coreServices = getCoreServices();
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      href: siteConfig.social.linkedin,
      label: siteConfig.social.linkedinLabel,
      icon: Linkedin,
    },
    {
      href: siteConfig.social.github,
      label: siteConfig.social.githubLabel,
      icon: Github,
    },
  ].filter((link) => isValidHref(link.href));

  const whatsappUrl = getWhatsAppUrl(
    lang === "id"
      ? "Halo SAN Solution, saya ingin konsultasi proyek."
      : "Hello SAN Solution, I'd like to discuss a project.",
  );

  const linkClass =
    "inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-darksection rounded-sm";

  return (
    <footer className="dark-section bg-dark-section text-foreground">
      <div className="container-narrow section-padding pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              to={routeFor("home", lang)}
              className="inline-flex min-h-11 items-center gap-2 rounded-md font-heading text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-darksection"
            >
              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-auto rounded-md"
              />
              <span>{siteConfig.brandName}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {footerCopy.description[lang]}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              {footerCopy.services[lang]}
            </h2>
            <ul className="mt-4 space-y-1">
              {coreServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={servicePath(service.slug[lang], lang)}
                    className={linkClass}
                  >
                    {t(service.title, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              {footerCopy.company[lang]}
            </h2>
            <ul className="mt-4 space-y-1">
              <li>
                <Link to={routeFor("caseStudies", lang)} className={linkClass}>
                  {footerCopy.caseStudies[lang]}
                </Link>
              </li>
              <li>
                <Link to={routeFor("about", lang)} className={linkClass}>
                  {footerCopy.about[lang]}
                </Link>
              </li>
              <li>
                <Link to={routeFor("contact", lang)} className={linkClass}>
                  {footerCopy.contact[lang]}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              {footerCopy.legal[lang]}
            </h2>
            <ul className="mt-4 space-y-1">
              <li>
                <Link to={routeFor("privacy", lang)} className={linkClass}>
                  {footerCopy.privacy[lang]}
                </Link>
              </li>
              <li>
                <Link to={routeFor("terms", lang)} className={linkClass}>
                  {footerCopy.terms[lang]}
                </Link>
              </li>
            </ul>

            {(socialLinks.length > 0 || whatsappUrl) && (
              <div className="mt-8">
                <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                  {footerCopy.connect[lang]}
                </h2>
                <ul className="mt-4 space-y-1">
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <li key={href}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        <Icon className="mr-2 inline h-4 w-4" aria-hidden="true" />
                        {label}
                      </a>
                    </li>
                  ))}
                  {whatsappUrl ? (
                    <li>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                        onClick={() =>
                          trackEvent("whatsapp_contact_click", { location: "footer" })
                        }
                      >
                        <MessageCircle className="mr-2 inline h-4 w-4" aria-hidden="true" />
                        {footerCopy.whatsapp[lang]}
                        {siteConfig.contact.whatsappDisplay
                          ? ` (${siteConfig.contact.whatsappDisplay})`
                          : ""}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.brandName}. {lang === "id" ? "Hak cipta dilindungi." : "All rights reserved."}
          </p>
          <p>{siteConfig.siteUrl.replace(/^https?:\/\//, "")}</p>
        </div>
      </div>
    </footer>
  );
};
