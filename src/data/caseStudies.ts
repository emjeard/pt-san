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
      id: "Sistem manajemen data visitor dan aset fisik berkeamanan tinggi untuk data center perusahaan listrik nasional Indonesia. Meningkatkan efisiensi verifikasi akses, menjamin kedaulatan data, dan mengamankan operasional multi-lokasi.",
      en: "A high-security visitor and physical asset management system for Indonesia's national electricity company data center. Enhances access verification efficiency, ensures data sovereignty, and secures multi-location operations.",
    },
    challenge: {
      id: "Operasi data center skala nasional membutuhkan verifikasi keamanan visitor yang cepat, jejak audit aset yang presisi, serta keandalan operasional tanpa henti (zero downtime).",
      en: "National-scale data center operations required fast visitor security verification, precise asset audit trails, and zero-downtime operational reliability.",
    },
    solution: {
      id: "Platform enterprise terpadu berbasis arsitektur microservices yang terisolasi tinggi — mendukung integritas data, ketersediaan tinggi, serta kemudahan integrasi antar-cabang secara terpusat.",
      en: "A unified enterprise platform based on highly isolated microservices architecture — supporting data integrity, high availability, and seamless multi-branch centralized integration.",
    },
    features: [
      {
        id: "Otomatisasi verifikasi visitor & kontrol akses berstandar keamanan data center",
        en: "Automated visitor verification & access control meeting data center security standards",
      },
      {
        id: "Pelacakan aset fisik dan jejak audit real-time untuk kepatuhan regulasi",
        en: "Physical asset tracking and real-time audit trail for regulatory compliance",
      },
      {
        id: "Arsitektur terdistribusi multi-lokasi dengan ketersediaan tinggi (high availability)",
        en: "Multi-location distributed architecture with high availability",
      },
    ],
    role: {
      id: "Analisis sistem, perancangan arsitektur enterprise, pengembangan backend, dan pengawasan deployment infrastruktur production.",
      en: "System analysis, enterprise architecture design, backend development, and production infrastructure deployment oversight.",
    },
    outcome: {
      id: "Solusi operasional teruji yang mempercepat proses masuk visitor hingga 70% sekaligus memperkuat standar keamanan fisik di seluruh lokasi data center PLN.",
      en: "A battle-tested operational solution accelerating visitor check-in by up to 70% while strengthening physical security standards across all PLN data center sites.",
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
      id: "Platform e-commerce Odoo terintegrasi yang menghubungkan toko online secara otomatis dengan sistem gudang dan akuntansi. Meningkatkan efisiensi pemrosesan pesanan, mempercepat transaksi, dan menyajikan pengalaman belanja online yang seamless.",
      en: "Integrated Odoo e-commerce platform connecting online store automatically with warehouse and accounting systems. Boosts order processing efficiency, accelerates transactions, and delivers a seamless online shopping experience.",
    },
    challenge: {
      id: "Bisnis retail membutuhkan saluran penjualan digital yang mampu mengintegrasikan stok secara otomatis tanpa risiko overselling atau pencatatan transaksi manual yang rentan kesalahan.",
      en: "Retail businesses needed a digital sales channel able to automatically sync inventory without overselling risks or error-prone manual transaction entries.",
    },
    solution: {
      id: "Implementasi toko e-commerce Odoo yang terhubung langsung dengan manajemen stok real-time, gerbang pembayaran otomatis, dan portal layanan mandiri pelanggan.",
      en: "Implementation of an Odoo e-commerce store connected directly to real-time inventory management, automated payment gateways, and customer self-service portals.",
    },
    features: [
      {
        id: "Katalog produk interaktif & sinkronisasi stok otomatis real-time",
        en: "Interactive product catalog & real-time automatic stock synchronization",
      },
      {
        id: "Integrasi payment gateway serba otomatis & pelacakan pesanan",
        en: "Automated payment gateway integration & order tracking",
      },
      {
        id: "Portal pelanggan untuk riwayat belanja dan manajemen klaim mudah",
        en: "Customer portal for shopping history and easy claim management",
      },
    ],
    role: {
      id: "Implementasi modul Odoo e-commerce, kustomisasi alur transaksi, dan integrasi sistem pembayaran digital.",
      en: "Odoo e-commerce module implementation, transaction workflow customization, and digital payment system integration.",
    },
    outcome: {
      id: "Toko online Odoo operasional yang meningkatkan penjualan digital hingga 45% dan menghilangkan redundansi pencatatan stok manual.",
      en: "An operational Odoo online store increasing digital sales by up to 45% while eliminating manual stock recording redundancy.",
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
      id: "Sistem ERP pendidikan berbasis Odoo yang mengintegrasikan seluruh operasional sekolah — dari pendaftaran siswa baru, jadwal pelajaran, hingga pembayaran SPP online. Menghemat waktu administrasi hingga 65% dan mengoptimalkan komunikasi sekolah.",
      en: "Odoo-based educational ERP system integrating all school operations — from new student enrollment, class scheduling, to online fee payments. Saves administrative time by up to 65% and optimizes school communication.",
    },
    challenge: {
      id: "Institusi pendidikan sering mengalami kendala rekap nilai manual, pengelolaan pembayaran SPP yang lambat, dan saluran komunikasi terpisah antara pihak sekolah dan orang tua.",
      en: "Educational institutions faced challenges with manual grade rollups, slow fee processing, and fragmented communication channels between school staff and parents.",
    },
    solution: {
      id: "Platform ERP sekolah terpadu berbasis Odoo yang menyatukan manajemen akademik, administrasi keuangan, dan portal komunikasi orang tua dalam satu sistem otomatis.",
      en: "A unified Odoo school ERP platform integrating academic management, financial administration, and parent communication portals into one automated system.",
    },
    features: [
      {
        id: "Penerimaan siswa baru digital & otomatisasi jadwal pelajaran",
        en: "Digital new student enrollment & automated class scheduling",
      },
      {
        id: "Manajemen nilai terintegrasi & portal transparansi untuk orang tua",
        en: "Integrated grade management & transparency portal for parents",
      },
      {
        id: "Pengelolaan tagihan & pembayaran SPP online otomatis",
        en: "Automated billing management & online fee payments",
      },
    ],
    role: {
      id: "Implementasi dan kustomisasi modul Odoo untuk efisiensi operasional pendidikan.",
      en: "Odoo module implementation and customization for educational operational efficiency.",
    },
    outcome: {
      id: "Sistem ERP sekolah modern yang digunakan untuk menyederhanakan administrasi harian dan mempercepat pelaporan akademik.",
      en: "A modern school ERP system used to simplify daily administration and accelerate academic reporting.",
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
      id: "Solusi ERP kesehatan terpadu berbasis Odoo yang mengotomatiskan rekam medis pasien, manajemen antrian dokter, penagihan, dan persediaan obat apotek. Mengurangi waktu tunggu pasien hingga 50% dan tingkatkan akurasi layanan.",
      en: "Unified Odoo healthcare ERP solution automating patient medical records, doctor queues, billing, and pharmacy stock. Reduces patient wait time by up to 50% while improving service accuracy.",
    },
    challenge: {
      id: "Penyedia layanan kesehatan membutuhkan alur pelayanan pasien yang cepat, ketersediaan obat apotek terintegrasi, serta efisiensi administrasi medis tanpa kerumitan pencatatan terpisah.",
      en: "Healthcare providers needed fast patient service workflows, integrated pharmacy stock availability, and administrative efficiency without fragmented recordkeeping.",
    },
    solution: {
      id: "Platform klinik Odoo terpadu yang menyelaraskan pendaftaran pasien, janji temu dokter, rekam medis elektronik (EMR), penagihan otomatis, dan kontrol stok apotek real-time.",
      en: "A unified Odoo clinic platform synchronizing patient registration, doctor appointments, electronic medical records (EMR), automated billing, and real-time pharmacy stock control.",
    },
    features: [
      {
        id: "Rekam medis elektronik (EMR) pasien & manajemen antrian dokter digital",
        en: "Electronic Medical Records (EMR) & digital doctor queue management",
      },
      {
        id: "Penagihan medis otomatis & integrasi klaim pembayaran",
        en: "Automated medical billing & payment claim integration",
      },
      {
        id: "Manajemen inventori apotek & pemesanan obat otomatis",
        en: "Pharmacy inventory management & automated reordering",
      },
    ],
    role: {
      id: "Implementasi modul Odoo kesehatan, konfigurasi workflow klinik, dan penyesuaian regulasi medis.",
      en: "Odoo healthcare module implementation, clinic workflow configuration, and medical compliance tailoring.",
    },
    outcome: {
      id: "Sistem klinik terpadu yang menyederhanakan operasional harian, mempercepat pelayanan pasien, dan menjamin akurasi stok obat.",
      en: "An integrated clinic system simplifying daily operations, accelerating patient care, and ensuring pharmacy stock precision.",
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
      id: "Sistem manajemen SDM & penggajian otomatis berbasis Odoo yang mengelola seluruh siklus kerja karyawan — dari onboarding, absensi digital, persetujuan cuti, hingga kalkulasi payroll otomatis secara akurat.",
      en: "Automated HR & payroll management system on Odoo managing the complete employee lifecycle — from onboarding, digital attendance, leave approvals, to precise automated payroll processing.",
    },
    challenge: {
      id: "Perusahaan korporat membutuhkan sistem HR terstruktur yang mampu memproses penggajian karyawan secara tepat waktu serta memberikan transparansi data absensi dan penilaian kinerja.",
      en: "Corporate enterprises needed structured HR systems capable of processing employee payroll accurately on time with transparent attendance and performance metrics.",
    },
    solution: {
      id: "Modul HR Odoo terintegrasi yang disesuaikan dengan regulasi tenaga kerja lokal, dilengkapi kalkulasi payroll otomatis, manajemen cuti mandiri, dan evaluasi kinerja karyawan.",
      en: "Integrated Odoo HR modules tailored to local labor regulations, featuring automated payroll calculation, self-service leave management, and employee performance evaluation.",
    },
    features: [
      {
        id: "Onboarding karyawan digital & pelacakan absensi otomatis",
        en: "Digital employee onboarding & automated attendance tracking",
      },
      {
        id: "Manajemen cuti mandiri & penilaian kinerja berimbang",
        en: "Self-service leave management & balanced performance appraisal",
      },
      {
        id: "Pemrosesan penggajian otomatis & slip gaji digital presisi",
        en: "Automated payroll processing & precise digital payslips",
      },
    ],
    role: {
      id: "Implementasi modul HR Odoo, konfigurasi aturan payroll korporat, dan otomatisasi alur persetujuan SDM.",
      en: "Odoo HR module implementation, corporate payroll rule configuration, and HR approval workflow automation.",
    },
    outcome: {
      id: "Solusi HR terpadu yang memangkas waktu pemrosesan payroll bulanan hingga 80% dan mengeliminasi kesalahan perhitungan manual.",
      en: "An integrated HR solution cutting monthly payroll processing time by up to 80% and eliminating manual calculation errors.",
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
      id: "Sistem Manajemen Gudang (WMS) Odoo pintar dengan dukungan multi-lokasi, pemindaian barcode, dan pemesanan ulang stok otomatis. Mengoptimalkan alokasi barang dan meningkatkan akurasi inventori hingga 99%.",
      en: "Smart Odoo Warehouse Management System (WMS) featuring multi-location support, barcode scanning, and automated stock reordering. Optimizes inventory placement and elevates stock accuracy to 99%.",
    },
    challenge: {
      id: "Perusahaan distribusi membutuhkan visibilitas stok barang real-time di banyak lokasi gudang untuk mencegah kekosongan barang (stockout) serta mempercepat proses penerimaan dan pengiriman.",
      en: "Distribution companies needed real-time stock visibility across multiple warehouse sites to prevent stockouts and accelerate receiving and dispatch operations.",
    },
    solution: {
      id: "WMS Odoo berbasis barcode multi-gudang yang mengotomatiskan alur stok fisik, pelacakan lot/serial, penilaian persediaan, dan pemesanan ulang otomatis.",
      en: "Multi-warehouse barcode-enabled Odoo WMS automating physical stock workflows, lot/serial tracking, inventory valuation, and automated reorder points.",
    },
    features: [
      {
        id: "Manajemen multi-gudang terintegrasi & pemindaian barcode presisi",
        en: "Integrated multi-warehouse management & precise barcode scanning",
      },
      {
        id: "Penilaian stok otomatis & poin pemesanan ulang pintar (auto-reorder)",
        en: "Automated stock valuation & smart auto-reorder thresholds",
      },
      {
        id: "Pelacakan inventori real-time di seluruh rantai distribusi",
        en: "Real-time inventory tracking across the entire distribution network",
      },
    ],
    role: {
      id: "Implementasi modul WMS Odoo, integrasi scanner barcode, dan kustomisasi alur distribusi multi-gudang.",
      en: "Odoo WMS module implementation, barcode scanner integration, and multi-warehouse distribution workflow customization.",
    },
    outcome: {
      id: "Sistem gudang terpadu yang membantu perusahaan distribusi meningkatkan efisiensi pemenuhan pesanan dan menghilangkan kerugian akibat barang yang hilang atau kedaluwarsa.",
      en: "An integrated warehouse system helping distribution companies boost order fulfillment efficiency while eliminating losses from missing or expired inventory.",
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
