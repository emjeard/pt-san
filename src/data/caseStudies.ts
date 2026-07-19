import type { TranslatableString } from "./translations";

export type CaseStudyCategory =
  | "enterprise"
  | "saas"
  | "public-sector"
  | "mobile"
  | "odoo";

export type CaseStudy = {
  id: string;
  slug: { id: string; en: string };
  tag: CaseStudyCategory;
  title: TranslatableString;
  client: TranslatableString;
  description: TranslatableString;
  challenge: TranslatableString;
  solution: TranslatableString;
  features: TranslatableString[];
  role: TranslatableString;
  outcome: TranslatableString;
  tech: string[];
  relatedServiceIds: string[];
  category: CaseStudyCategory;
  year?: string;
  url?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "visitor-management-system",
    slug: {
      id: "sistem-manajemen-visitor",
      en: "visitor-management-system",
    },
    tag: "enterprise",
    category: "enterprise",
    title: {
      id: "Sistem Manajemen Data Center & Visitor",
      en: "Data Center & Visitor Management System",
    },
    client: {
      id: "PLN (Perusahaan Listrik Negara)",
      en: "PLN (State Electricity Company)",
    },
    description: {
      id: "Sistem manajemen data visitor dan aset keamanan tinggi yang kompleks untuk perusahaan listrik nasional Indonesia. Deployment multi-lokasi dengan containerization Docker.",
      en: "A complex high-security visitor data and asset management system for Indonesia's national electricity company. Multi-location deployment with Docker containerization.",
    },
    challenge: {
      id: "Operasi data center dan pengelolaan visitor di banyak lokasi membutuhkan kontrol keamanan ketat, pelacakan aset yang andal, dan sistem yang stabil untuk lingkungan mission-critical.",
      en: "Data center operations and visitor management across multiple locations required strict security controls, reliable asset tracking, and a stable system for mission-critical environments.",
    },
    solution: {
      id: "Platform terpadu dengan ASP.NET Core, MariaDB, dan deployment berbasis Docker di berbagai lokasi — dirancang untuk keamanan tinggi, ketersediaan operasional, dan kepatuhan regulasi.",
      en: "A unified platform built with ASP.NET Core, MariaDB, and Docker-based deployment across locations — designed for high security, operational availability, and regulatory compliance.",
    },
    features: [
      {
        id: "Manajemen visitor dan aset data center dengan kontrol akses keamanan tinggi",
        en: "Visitor and data center asset management with high-security access controls",
      },
      {
        id: "Deployment multi-lokasi dengan containerization Docker",
        en: "Multi-location deployment with Docker containerization",
      },
      {
        id: "Arsitektur database MariaDB untuk operasi skala enterprise",
        en: "MariaDB database architecture for enterprise-scale operations",
      },
    ],
    role: {
      id: "Analisis sistem, perancangan arsitektur, pengembangan backend, dan persiapan deployment infrastruktur production.",
      en: "System analysis, architecture design, backend development, and production infrastructure deployment preparation.",
    },
    outcome: {
      id: "Sistem operasional yang mendukung pengelolaan visitor dan aset data center PLN di lingkungan keamanan tinggi dengan deployment multi-lokasi.",
      en: "An operational system supporting PLN's visitor and data center asset management in a high-security, multi-location environment.",
    },
    tech: ["ASP.NET Core", "MariaDB", "Docker", "Linux"],
    relatedServiceIds: [
      "enterprise-systems",
      "system-integration",
      "devops-infrastructure",
    ],
    year: "2020–2022",
  },
  {
    id: "jetkios-pos-platform",
    slug: {
      id: "platform-pos-jetkios",
      en: "jetkios-pos-platform",
    },
    tag: "saas",
    category: "saas",
    title: {
      id: "Platform POS Jetkios",
      en: "Jetkios POS Platform",
    },
    client: {
      id: "Merchant UMKM",
      en: "Small Merchants",
    },
    description: {
      id: "Aplikasi web Point of Sales komprehensif untuk merchant kecil yang menangani manajemen stok produk, pencatatan transaksi, dan pelaporan penjualan.",
      en: "A comprehensive Point of Sales web application for small merchants handling product stock management, transaction recording, and sales reporting.",
    },
    challenge: {
      id: "Merchant kecil membutuhkan cara praktis mencatat penjualan, memantau stok, dan melihat laporan tanpa sistem yang rumit atau mahal.",
      en: "Small merchants needed a practical way to record sales, monitor stock, and view reports without a complex or expensive system.",
    },
    solution: {
      id: "Aplikasi web POS dengan manajemen produk, pencatatan transaksi, dan pelaporan penjualan — dibangun dengan Nuxt.js, PostgreSQL, dan Redis.",
      en: "A web-based POS application with product management, transaction recording, and sales reporting — built with Nuxt.js, PostgreSQL, and Redis.",
    },
    features: [
      {
        id: "Manajemen stok produk dan katalog",
        en: "Product stock and catalog management",
      },
      {
        id: "Pencatatan transaksi penjualan",
        en: "Sales transaction recording",
      },
      {
        id: "Pelaporan penjualan untuk keputusan operasional harian",
        en: "Sales reporting for daily operational decisions",
      },
    ],
    role: {
      id: "Perancangan produk, pengembangan fullstack web application, dan persiapan platform untuk merchant UMKM.",
      en: "Product design, fullstack web application development, and platform preparation for small merchants.",
    },
    outcome: {
      id: "Platform POS web yang membantu merchant kecil mengelola stok, transaksi, dan laporan penjualan dari satu aplikasi.",
      en: "A web POS platform helping small merchants manage stock, transactions, and sales reports from a single application.",
    },
    tech: ["Nuxt.js", "PostgreSQL", "Redis"],
    relatedServiceIds: ["saas-development", "web-development"],
    year: "2024",
  },
  {
    id: "government-portals",
    slug: {
      id: "portal-pemerintahan",
      en: "government-portals",
    },
    tag: "public-sector",
    category: "public-sector",
    title: {
      id: "Portal Pemerintahan",
      en: "Government Portals",
    },
    client: {
      id: "Pemkot Surabaya & Kementerian PUPR",
      en: "Surabaya City Gov & Ministry of Public Works",
    },
    description: {
      id: "Portal informasi yang menjamin aksesibilitas dan transparansi tinggi untuk institusi pemerintah, dibangun dengan standar keamanan dan kepatuhan.",
      en: "Information portals ensuring high accessibility and transparency for government institutions, built with security and compliance standards.",
    },
    challenge: {
      id: "Institusi pemerintah perlu menyampaikan informasi publik secara jelas, aman, dan mudah diakses oleh masyarakat dan stakeholder internal.",
      en: "Government institutions needed to deliver public information clearly, securely, and accessibly to citizens and internal stakeholders.",
    },
    solution: {
      id: "Portal informasi dengan fokus aksesibilitas, transparansi, dan keamanan — termasuk Gapura Surabaya sebagai portal berita resmi Pemkot Surabaya menggunakan Laravel.",
      en: "Information portals focused on accessibility, transparency, and security — including Gapura Surabaya, the official news portal for Surabaya City Government built with Laravel.",
    },
    features: [
      {
        id: "Portal informasi publik dengan aksesibilitas tinggi",
        en: "Public information portals with high accessibility",
      },
      {
        id: "Standar keamanan dan kepatuhan untuk institusi pemerintah",
        en: "Security and compliance standards for government institutions",
      },
      {
        id: "Manajemen konten berita dan informasi resmi",
        en: "News and official information content management",
      },
    ],
    role: {
      id: "Perancangan portal, pengembangan web application, dan implementasi standar keamanan untuk sektor publik.",
      en: "Portal design, web application development, and security standard implementation for the public sector.",
    },
    outcome: {
      id: "Portal pemerintahan yang membantu institusi publik menyampaikan informasi dengan lebih transparan dan terstruktur.",
      en: "Government portals helping public institutions deliver information more transparently and in a structured way.",
    },
    tech: ["Laravel", "PHP", "MySQL"],
    relatedServiceIds: ["web-development", "system-integration"],
    year: "2024",
  },
  {
    id: "smart-tourism-ecommerce",
    slug: {
      id: "smart-tourism-ecommerce",
      en: "smart-tourism-ecommerce",
    },
    tag: "mobile",
    category: "mobile",
    title: {
      id: "Smart Tourism & E-Commerce",
      en: "Smart Tourism & E-Commerce",
    },
    client: {
      id: "Persija Jakarta, PSS Sleman & Platform Travel",
      en: "Persija Jakarta, PSS Sleman & Travel Platforms",
    },
    description: {
      id: "Aplikasi Android & iOS untuk Marketplace Travel dan Klub Sepakbola Liga 1, dengan fitur ticketing, e-commerce, dan fan engagement.",
      en: "Android & iOS apps for Travel Marketplaces and Liga 1 Football Clubs, featuring ticketing, e-commerce, and fan engagement features.",
    },
    challenge: {
      id: "Organisasi pariwisata dan klub olahraga perlu menjangkau pengguna mobile dengan fitur ticketing, belanja, dan engagement — sambil menjaga pengalaman yang konsisten di Android dan iOS.",
      en: "Tourism organizations and sports clubs needed to reach mobile users with ticketing, shopping, and engagement features — while maintaining a consistent experience on Android and iOS.",
    },
    solution: {
      id: "Aplikasi mobile cross-platform dengan Flutter untuk marketplace travel dan klub Liga 1, didukung backend Golang dan web dengan Next.js.",
      en: "Cross-platform mobile apps with Flutter for travel marketplaces and Liga 1 clubs, supported by Golang backend and Next.js web.",
    },
    features: [
      {
        id: "Ticketing dan e-commerce dalam aplikasi mobile",
        en: "In-app ticketing and e-commerce",
      },
      {
        id: "Fitur fan engagement untuk klub sepakbola",
        en: "Fan engagement features for football clubs",
      },
      {
        id: "Publikasi di Play Store dan App Store",
        en: "Published on Play Store and App Store",
      },
    ],
    role: {
      id: "Pengembangan aplikasi mobile Flutter, integrasi backend, dan peluncuran di Play Store & App Store.",
      en: "Flutter mobile app development, backend integration, and Play Store & App Store release.",
    },
    outcome: {
      id: "Aplikasi mobile yang memungkinkan pengguna mengakses ticketing, belanja, dan engagement langsung dari perangkat mereka.",
      en: "Mobile applications enabling users to access ticketing, shopping, and engagement directly from their devices.",
    },
    tech: ["Flutter", "Android", "Golang", "Next.js"],
    relatedServiceIds: ["mobile-app-development", "web-development"],
    year: "2018–2019",
  },
  {
    id: "odoo-online-store",
    slug: {
      id: "toko-online-odoo",
      en: "odoo-online-store",
    },
    tag: "odoo",
    category: "odoo",
    title: {
      id: "Toko Online Odoo",
      en: "Odoo Online Store",
    },
    client: {
      id: "Bisnis Retail (2019)",
      en: "Retail Business (2019)",
    },
    description: {
      id: "Toko e-commerce Odoo lengkap dengan katalog produk, integrasi payment gateway, sinkronisasi inventori, dan portal pelanggan untuk pengalaman belanja online yang mulus.",
      en: "Full-featured Odoo e-commerce store with product catalog, payment gateway integration, inventory sync, and customer portal for seamless online shopping.",
    },
    challenge: {
      id: "Bisnis retail perlu channel penjualan online yang terhubung dengan inventori dan proses operasional internal.",
      en: "A retail business needed an online sales channel connected to inventory and internal operational processes.",
    },
    solution: {
      id: "Implementasi toko e-commerce Odoo dengan katalog produk, payment gateway, sinkronisasi inventori, dan portal pelanggan.",
      en: "Odoo e-commerce store implementation with product catalog, payment gateway, inventory sync, and customer portal.",
    },
    features: [
      {
        id: "Katalog produk dan keranjang belanja online",
        en: "Product catalog and online shopping cart",
      },
      {
        id: "Integrasi payment gateway",
        en: "Payment gateway integration",
      },
      {
        id: "Sinkronisasi inventori dan portal pelanggan",
        en: "Inventory sync and customer portal",
      },
    ],
    role: {
      id: "Implementasi modul Odoo e-commerce, kustomisasi, dan integrasi payment gateway.",
      en: "Odoo e-commerce module implementation, customization, and payment gateway integration.",
    },
    outcome: {
      id: "Toko online Odoo operasional yang menghubungkan penjualan digital dengan manajemen inventori bisnis retail.",
      en: "An operational Odoo online store connecting digital sales with retail business inventory management.",
    },
    tech: ["Odoo", "Python", "PostgreSQL", "XML"],
    relatedServiceIds: ["odoo-implementation", "web-development"],
    year: "2019",
    url: "https://multitoys.id/about-us",
  },
  {
    id: "odoo-school-management",
    slug: {
      id: "sistem-manajemen-sekolah-odoo",
      en: "odoo-school-management",
    },
    tag: "odoo",
    category: "odoo",
    title: {
      id: "Sistem Manajemen Sekolah Odoo",
      en: "Odoo School Management System",
    },
    client: {
      id: "Institusi Pendidikan",
      en: "Educational Institution",
    },
    description: {
      id: "ERP sekolah komprehensif berbasis Odoo mencakup penerimaan siswa, penjadwalan akademik, manajemen nilai, komunikasi orang tua, dan pengelolaan biaya.",
      en: "Comprehensive school ERP on Odoo covering student enrollment, academic scheduling, grade management, parent communication, and fee collection.",
    },
    challenge: {
      id: "Sekolah perlu satu sistem untuk mengelola penerimaan siswa, jadwal, nilai, komunikasi orang tua, dan pembayaran biaya.",
      en: "Schools needed a single system to manage student enrollment, schedules, grades, parent communication, and fee payments.",
    },
    solution: {
      id: "ERP sekolah berbasis Odoo yang mengintegrasikan modul akademik, administrasi, dan keuangan dalam satu platform.",
      en: "Odoo-based school ERP integrating academic, administrative, and financial modules in one platform.",
    },
    features: [
      {
        id: "Penerimaan siswa dan penjadwalan akademik",
        en: "Student enrollment and academic scheduling",
      },
      {
        id: "Manajemen nilai dan komunikasi orang tua",
        en: "Grade management and parent communication",
      },
      {
        id: "Pengelolaan biaya sekolah",
        en: "School fee management",
      },
    ],
    role: {
      id: "Implementasi dan kustomisasi modul Odoo untuk operasional sekolah.",
      en: "Odoo module implementation and customization for school operations.",
    },
    outcome: {
      id: "Sistem manajemen sekolah terpadu yang digunakan sekolah nyata untuk operasional harian.",
      en: "An integrated school management system used by real schools for daily operations.",
    },
    tech: ["Odoo", "Python", "PostgreSQL", "XML"],
    relatedServiceIds: ["odoo-implementation", "enterprise-systems"],
  },
  {
    id: "odoo-clinic-management",
    slug: {
      id: "sistem-manajemen-klinik-odoo",
      en: "odoo-clinic-management",
    },
    tag: "odoo",
    category: "odoo",
    title: {
      id: "Sistem Manajemen Klinik Odoo",
      en: "Odoo Clinic Management System",
    },
    client: {
      id: "Penyedia Layanan Kesehatan",
      en: "Healthcare Provider",
    },
    description: {
      id: "Sistem klinik berbasis Odoo yang mengelola rekam medis pasien, penjadwalan janji, antrian dokter, penagihan medis, dan inventori apotek dalam satu platform terpadu.",
      en: "Odoo-based clinic system managing patient records, appointment scheduling, doctor queues, medical billing, and pharmacy inventory in a unified platform.",
    },
    challenge: {
      id: "Klinik perlu mengelola pasien, jadwal, antrian, penagihan, dan inventori apotek tanpa data terpisah di banyak sistem.",
      en: "Clinics needed to manage patients, schedules, queues, billing, and pharmacy inventory without data scattered across multiple systems.",
    },
    solution: {
      id: "Platform klinik Odoo terpadu untuk rekam medis, janji temu, antrian, penagihan, dan inventori apotek.",
      en: "Unified Odoo clinic platform for medical records, appointments, queues, billing, and pharmacy inventory.",
    },
    features: [
      {
        id: "Rekam medis pasien dan penjadwalan janji",
        en: "Patient medical records and appointment scheduling",
      },
      {
        id: "Antrian dokter dan penagihan medis",
        en: "Doctor queues and medical billing",
      },
      {
        id: "Inventori apotek terintegrasi",
        en: "Integrated pharmacy inventory",
      },
    ],
    role: {
      id: "Implementasi modul Odoo kesehatan dan kustomisasi workflow klinik.",
      en: "Odoo healthcare module implementation and clinic workflow customization.",
    },
    outcome: {
      id: "Sistem klinik terpadu yang menyederhanakan operasional harian penyedia layanan kesehatan.",
      en: "An integrated clinic system simplifying daily operations for healthcare providers.",
    },
    tech: ["Odoo", "Python", "PostgreSQL", "XML"],
    relatedServiceIds: ["odoo-implementation", "enterprise-systems"],
  },
  {
    id: "odoo-hr-payroll",
    slug: {
      id: "sistem-hr-payroll-odoo",
      en: "odoo-hr-payroll",
    },
    tag: "odoo",
    category: "odoo",
    title: {
      id: "Sistem HR & Penggajian Odoo",
      en: "Odoo HR & Payroll System",
    },
    client: {
      id: "Klien Korporat",
      en: "Corporate Client",
    },
    description: {
      id: "Solusi HR end-to-end di Odoo mencakup onboarding karyawan, absensi, manajemen cuti, penilaian kinerja, dan pemrosesan penggajian otomatis.",
      en: "End-to-end HR solution on Odoo covering employee onboarding, attendance tracking, leave management, performance appraisals, and automated payroll processing.",
    },
    challenge: {
      id: "Perusahaan korporat perlu proses HR dan penggajian yang terstruktur — dari onboarding hingga absensi, cuti, dan payroll.",
      en: "Corporate companies needed structured HR and payroll processes — from onboarding through attendance, leave, and payroll.",
    },
    solution: {
      id: "Modul HR Odoo terintegrasi untuk onboarding, absensi, cuti, penilaian kinerja, dan penggajian otomatis.",
      en: "Integrated Odoo HR modules for onboarding, attendance, leave, performance appraisal, and automated payroll.",
    },
    features: [
      {
        id: "Onboarding karyawan dan pelacakan absensi",
        en: "Employee onboarding and attendance tracking",
      },
      {
        id: "Manajemen cuti dan penilaian kinerja",
        en: "Leave management and performance appraisals",
      },
      {
        id: "Pemrosesan penggajian otomatis",
        en: "Automated payroll processing",
      },
    ],
    role: {
      id: "Implementasi modul HR Odoo, konfigurasi workflow, dan kustomisasi kebutuhan korporat.",
      en: "Odoo HR module implementation, workflow configuration, and corporate customization.",
    },
    outcome: {
      id: "Solusi HR terpadu yang membantu perusahaan mengelola siklus karyawan dan penggajian dari satu platform.",
      en: "An integrated HR solution helping companies manage employee lifecycle and payroll from one platform.",
    },
    tech: ["Odoo", "Python", "PostgreSQL", "XML"],
    relatedServiceIds: ["odoo-implementation", "enterprise-systems"],
  },
  {
    id: "odoo-warehouse-management",
    slug: {
      id: "sistem-manajemen-gudang-odoo",
      en: "odoo-warehouse-management",
    },
    tag: "odoo",
    category: "odoo",
    title: {
      id: "Sistem Manajemen Gudang Odoo",
      en: "Odoo Warehouse Management System",
    },
    client: {
      id: "Perusahaan Distribusi",
      en: "Distribution Company",
    },
    description: {
      id: "WMS Odoo dengan dukungan multi-gudang, pemindaian barcode, penilaian stok, pemesanan ulang otomatis, dan pelacakan inventori real-time di berbagai lokasi.",
      en: "Odoo WMS with multi-warehouse support, barcode scanning, stock valuation, automated reordering, and real-time inventory tracking across locations.",
    },
    challenge: {
      id: "Perusahaan distribusi perlu visibilitas inventori real-time di banyak gudang, dengan proses penerimaan, pengiriman, dan pemesanan ulang yang terstruktur.",
      en: "Distribution companies needed real-time inventory visibility across warehouses, with structured receiving, shipping, and reorder processes.",
    },
    solution: {
      id: "WMS Odoo dengan dukungan multi-gudang, barcode scanning, penilaian stok, dan pelacakan inventori real-time.",
      en: "Odoo WMS with multi-warehouse support, barcode scanning, stock valuation, and real-time inventory tracking.",
    },
    features: [
      {
        id: "Manajemen multi-gudang dengan barcode scanning",
        en: "Multi-warehouse management with barcode scanning",
      },
      {
        id: "Penilaian stok dan pemesanan ulang otomatis",
        en: "Stock valuation and automated reordering",
      },
      {
        id: "Pelacakan inventori real-time di berbagai lokasi",
        en: "Real-time inventory tracking across locations",
      },
    ],
    role: {
      id: "Implementasi modul inventory Odoo, konfigurasi multi-gudang, dan kustomisasi workflow distribusi.",
      en: "Odoo inventory module implementation, multi-warehouse configuration, and distribution workflow customization.",
    },
    outcome: {
      id: "Sistem gudang terpadu yang membantu perusahaan distribusi memantau dan mengelola inventori di berbagai lokasi.",
      en: "An integrated warehouse system helping distribution companies monitor and manage inventory across locations.",
    },
    tech: ["Odoo", "Python", "PostgreSQL", "XML"],
    relatedServiceIds: ["odoo-implementation", "enterprise-systems"],
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined =>
  caseStudies.find((study) => study.id === id);

export const getCaseStudyBySlug = (
  slug: string,
  locale: "id" | "en" = "id",
): CaseStudy | undefined =>
  caseStudies.find((study) => study.slug[locale] === slug);

const HOMEPAGE_CASE_STUDY_IDS = [
  "visitor-management-system",
  "jetkios-pos-platform",
  "government-portals",
  "smart-tourism-ecommerce",
] as const;

export const getHomepageCaseStudies = (): CaseStudy[] =>
  HOMEPAGE_CASE_STUDY_IDS.map((id) => getCaseStudyById(id)).filter(
    (study): study is CaseStudy => Boolean(study),
  );

export const caseStudyCategoryLabels: Record<
  CaseStudyCategory,
  { id: string; en: string }
> = {
  enterprise: { id: "Enterprise", en: "Enterprise" },
  saas: { id: "SaaS", en: "SaaS" },
  "public-sector": { id: "Sektor Publik", en: "Public Sector" },
  mobile: { id: "Mobile", en: "Mobile" },
  odoo: { id: "Odoo", en: "Odoo" },
};
