import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import ProblemsSection from "@/components/sections/ProblemsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import TechStackSection from "@/components/sections/TechStackSection";
import TimelineSection from "@/components/sections/TimelineSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import { routes } from "@/lib/routes";

const homeSeo = {
  id: {
    title: "SAN Solution | Software, Website, Aplikasi, dan Sistem Bisnis",
    description:
      "SAN Solution membantu perusahaan, startup, dan organisasi membangun website, aplikasi mobile, produk SaaS, sistem enterprise, dan solusi digital yang siap berkembang.",
  },
  en: {
    title: "SAN Solution | Software, Websites, Apps, and Business Systems",
    description:
      "SAN Solution helps companies, startups, and organizations build websites, mobile apps, SaaS products, enterprise systems, and digital solutions ready to grow.",
  },
} as const;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "SAN Solution",
  url: "https://www.sansolution.tech/",
  logo: "https://www.sansolution.tech/logo.png",
  description:
    "SAN Solution membantu perusahaan, startup, dan organisasi membangun sistem enterprise, produk SaaS, aplikasi mobile, website, dan solusi digital yang siap berkembang.",
  foundingDate: "2023",
  areaServed: "Indonesia",
  email: "support@sansolution.tech",
};

export type HomePageProps = {
  locale: SiteLocale;
};

const HomePage = ({ locale }: HomePageProps) => {
  const seo = homeSeo[locale];

  return (
    <SiteLayout locale={locale} idPath={routes.home.id} enPath={routes.home.en}>
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonicalPath={routes.home[locale]}
        locale={locale}
        alternateIdPath={routes.home.id}
        alternateEnPath={routes.home.en}
        jsonLd={organizationJsonLd}
      />
      <HeroSection />
      <TrustSection />
      <ProblemsSection />
      <ServicesSection />
      <CaseStudiesSection />
      <WhyUsSection />
      <HowWeWorkSection />
      <ExpertiseSection />
      <TechStackSection />
      <TimelineSection />
      <FAQSection />
      <ContactSection />
    </SiteLayout>
  );
};

export default HomePage;
