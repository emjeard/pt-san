import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import ContactSection from "@/components/sections/ContactSection";
import { routeFor, routes } from "@/lib/routes";

const pageCopy = {
  id: {
    seoTitle: "Kontak | SAN Solution",
    seoDescription:
      "Hubungi SAN Solution untuk konsultasi proyek website, aplikasi mobile, sistem enterprise, SaaS, atau implementasi Odoo.",
    home: "Beranda",
    contact: "Kontak",
  },
  en: {
    seoTitle: "Contact | SAN Solution",
    seoDescription:
      "Contact SAN Solution to discuss website, mobile app, enterprise system, SaaS, or Odoo implementation projects.",
    home: "Home",
    contact: "Contact",
  },
} as const;

export type ContactPageProps = {
  locale: SiteLocale;
};

const ContactPage = ({ locale }: ContactPageProps) => {
  const copy = pageCopy[locale];

  return (
    <SiteLayout
      locale={locale}
      idPath={routes.contact.id}
      enPath={routes.contact.en}
    >
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonicalPath={routes.contact[locale]}
        locale={locale}
        alternateIdPath={routes.contact.id}
        alternateEnPath={routes.contact.en}
      />

      <div className="section-padding pb-0">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: copy.home, href: routeFor("home", locale) },
              { label: copy.contact },
            ]}
          />
        </div>
      </div>

      <ContactSection />
    </SiteLayout>
  );
};

export default ContactPage;
