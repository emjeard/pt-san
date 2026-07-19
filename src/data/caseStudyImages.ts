import visitorManagement from "@/assets/case-studies/visitor-management-system.webp";
import jetkiosPos from "@/assets/case-studies/jetkios-pos-platform.webp";
import governmentPortals from "@/assets/case-studies/government-portals.webp";
import smartTourism from "@/assets/case-studies/smart-tourism-ecommerce.webp";

/**
 * Optional illustrative previews for case studies.
 * These are conceptual visuals — not live product screenshots.
 */
export const caseStudyImages: Record<
  string,
  { src: string; alt: { id: string; en: string }; illustrative?: boolean }
> = {
  "visitor-management-system": {
    src: visitorManagement,
    illustrative: true,
    alt: {
      id: "Ilustrasi sistem manajemen data center dan visitor dengan dashboard keamanan dan kontrol akses",
      en: "Illustration of a data center and visitor management system with security dashboard and access control",
    },
  },
  "jetkios-pos-platform": {
    src: jetkiosPos,
    illustrative: true,
    alt: {
      id: "Ilustrasi aplikasi POS Jetkios untuk merchant UMKM dengan kasir tablet dan dashboard penjualan",
      en: "Illustration of the Jetkios POS app for small merchants with tablet checkout and sales dashboard",
    },
  },
  "government-portals": {
    src: governmentPortals,
    illustrative: true,
    alt: {
      id: "Ilustrasi portal informasi pemerintahan dengan akses layanan publik dan tampilan berita resmi",
      en: "Illustration of a government information portal with public services access and official news interface",
    },
  },
  "smart-tourism-ecommerce": {
    src: smartTourism,
    illustrative: true,
    alt: {
      id: "Ilustrasi aplikasi mobile smart tourism dan e-commerce dengan ticketing dan belanja",
      en: "Illustration of smart tourism and e-commerce mobile apps with ticketing and shopping features",
    },
  },
};
