import visitorManagement from "@/assets/case-studies/visitor-management-system.webp";
import jetkiosPos from "@/assets/case-studies/jetkios-pos-platform.webp";
import governmentPortals from "@/assets/case-studies/government-portals.webp";
import smartTourism from "@/assets/case-studies/smart-tourism-ecommerce.webp";
import odooOnlineStore from "@/assets/case-studies/odoo-online-store.webp";
import odooSchoolManagement from "@/assets/case-studies/odoo-school-management.webp";
import odooClinicManagement from "@/assets/case-studies/odoo-clinic-management.webp";
import odooHrPayroll from "@/assets/case-studies/odoo-hr-payroll.webp";
import odooWarehouseManagement from "@/assets/case-studies/odoo-warehouse-management.webp";

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
  "odoo-online-store": {
    src: odooOnlineStore,
    illustrative: true,
    alt: {
      id: "Ilustrasi dashboard e-commerce Toko Online Odoo dengan katalog produk dan integrasi inventori",
      en: "Illustration of Odoo Online Store e-commerce dashboard with product catalog and inventory integration",
    },
  },
  "odoo-school-management": {
    src: odooSchoolManagement,
    illustrative: true,
    alt: {
      id: "Ilustrasi sistem ERP manajemen sekolah Odoo dengan penerimaan siswa dan portal nilai",
      en: "Illustration of Odoo School Management ERP system with student enrollment and grade portal",
    },
  },
  "odoo-clinic-management": {
    src: odooClinicManagement,
    illustrative: true,
    alt: {
      id: "Ilustrasi sistem manajemen klinik Odoo dengan rekam medis digital dan antrian dokter",
      en: "Illustration of Odoo Clinic Management system with digital medical records and doctor queue",
    },
  },
  "odoo-hr-payroll": {
    src: odooHrPayroll,
    illustrative: true,
    alt: {
      id: "Ilustrasi dashboard sistem HR dan penggajian otomatis Odoo dengan manajemen absensi dan cuti",
      en: "Illustration of Odoo HR and automated payroll dashboard with attendance and leave management",
    },
  },
  "odoo-warehouse-management": {
    src: odooWarehouseManagement,
    illustrative: true,
    alt: {
      id: "Ilustrasi sistem manajemen gudang WMS Odoo dengan pelacakan stok multi-gudang dan barcode",
      en: "Illustration of Odoo WMS warehouse management system with multi-warehouse stock tracking and barcode",
    },
  },
};
