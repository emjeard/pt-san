import type { SiteLocale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import ClientsSection from "@/components/sections/ClientsSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import { ChoosePathSection } from "@/components/solutions/ChoosePathSection";
import { ReadySolutionsSection } from "@/components/solutions/ReadySolutionsSection";
import { CustomEngineeringSection } from "@/components/solutions/CustomEngineeringSection";
import { ProcessPathsSection } from "@/components/solutions/ProcessPathsSection";
import { PricingSummarySection } from "@/components/solutions/PricingSummarySection";
import { routes } from "@/lib/routes";

const homeSeo = {
  id: {
    title: "SAN Solution | Solusi Digital dari Website hingga Software Custom",
    description: "Solusi digital untuk bisnis, dari website siap pakai hingga software custom. Mulai dari paket website bisnis, platform vertikal, hingga sistem enterprise.",
  },
  en: {
    title: "SAN Solution | Digital Solutions from Websites to Custom Software",
    description: "Digital solutions for every stage of business, from ready-to-launch websites and vertical platforms to custom enterprise software.",
  },
} as const;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SAN Solution",
  url: `${siteConfig.siteUrl}/`,
  logo: `${siteConfig.siteUrl}/logo.png`,
  image: `${siteConfig.siteUrl}/og-san-solution.jpg`,
  description: "Solusi digital untuk bisnis, dari website siap pakai hingga software custom.",
  foundingDate: siteConfig.company.foundingYear,
  telephone: `+${siteConfig.contact.whatsappNumber}`,
  email: siteConfig.contact.email,
  areaServed: { "@type": "Country", name: "Indonesia" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${siteConfig.contact.whatsappNumber}`,
    contactType: "customer service",
    email: siteConfig.contact.email,
    availableLanguage: ["Indonesian", "English"],
  },
};

export type HomePageProps = { locale: SiteLocale };

const HomePage = ({ locale }: HomePageProps) => {
  const seo = homeSeo[locale];
  return (
    <SiteLayout locale={locale} idPath={routes.home.id} enPath={routes.home.en}>
      <SEOHead title={seo.title} description={seo.description} canonicalPath={routes.home[locale]} locale={locale} alternateIdPath={routes.home.id} alternateEnPath={routes.home.en} jsonLd={organizationJsonLd} />
      <HeroSection />
      <TrustSection />
      <ClientsSection />
      <ChoosePathSection locale={locale} />
      <ReadySolutionsSection locale={locale} />
      <CustomEngineeringSection locale={locale} />
      <CaseStudiesSection />
      <ProcessPathsSection locale={locale} />
      <PricingSummarySection locale={locale} />
      <WhyUsSection />
      <FAQSection />
      <ContactSection />
    </SiteLayout>
  );
};

export default HomePage;
