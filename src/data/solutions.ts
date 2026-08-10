import type { SiteLocale } from "@/config/site";

export type LocalizedText = Record<SiteLocale, string>;

export type SolutionId =
  | "san-site"
  | "san-corporate"
  | "san-publisher"
  | "san-education"
  | "san-commerce"
  | "san-growth";

export type SolutionBilling = "annual" | "monthly" | "custom";

export type SolutionPackage = {
  id: "starter" | "business" | "pro";
  name: LocalizedText;
  firstYear: number;
  renewal: number;
  description: LocalizedText;
  features: LocalizedText[];
  featured?: boolean;
};

export type SolutionFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type Solution = {
  id: SolutionId;
  title: LocalizedText;
  eyebrow: LocalizedText;
  slug: LocalizedText;
  summary: LocalizedText;
  audience: LocalizedText[];
  problem: LocalizedText;
  included: LocalizedText[];
  addOns: LocalizedText[];
  startingPrice: number;
  billing: SolutionBilling;
  packages?: SolutionPackage[];
  process: LocalizedText[];
  relatedCaseStudyIds: string[];
  seo: {
    title: LocalizedText;
    description: LocalizedText;
  };
  faq: SolutionFaq[];
};

export const customEngineeringStartingPrice = 15_000_000;

export const solutions: Solution[] = [
  {
    id: "san-site",
    title: { id: "SAN Site", en: "SAN Site" },
    eyebrow: { id: "Website bisnis siap diluncurkan", en: "Ready-to-launch business website" },
    slug: { id: "website-bisnis", en: "business-website" },
    summary: {
      id: "Website bisnis profesional dengan fondasi yang sudah teruji, hosting terkelola, dan ruang untuk berkembang.",
      en: "A professionally managed business website built on a proven foundation, with room to grow.",
    },
    audience: [
      { id: "UMKM dan bisnis lokal", en: "SMBs and local businesses" },
      { id: "Konsultan, kontraktor, dan klinik", en: "Consultants, contractors, and clinics" },
      { id: "Organisasi, yayasan, dan sekolah kecil", en: "Organizations, foundations, and small schools" },
      { id: "Startup tahap awal", en: "Early-stage startups" },
    ],
    problem: {
      id: "Anda membutuhkan website yang kredibel tanpa memulai proyek custom yang panjang dan sulit diprediksi.",
      en: "You need a credible website without starting a long, hard-to-predict custom project.",
    },
    included: [
      { id: "Website responsif dengan SSL dan hosting terkelola", en: "Responsive website with SSL and managed hosting" },
      { id: "Profil bisnis, layanan/produk, galeri, dan kontak", en: "Business profile, services/products, gallery, and contact pages" },
      { id: "CTA WhatsApp dan integrasi Google Maps", en: "WhatsApp CTA and Google Maps integration" },
      { id: "SEO dasar, sitemap, dan setup analytics-ready", en: "Basic SEO, sitemap, and analytics-ready setup" },
    ],
    addOns: [
      { id: "Custom domain sesuai ekstensi dan ketersediaan", en: "Custom domain subject to extension and availability" },
      { id: "Halaman tambahan, copywriting, atau fitur konten", en: "Additional pages, copywriting, or content features" },
      { id: "Integrasi API atau kebutuhan operasional khusus", en: "API integrations or operational requirements" },
    ],
    startingPrice: 699_000,
    billing: "annual",
    packages: [
      {
        id: "starter",
        name: { id: "Starter", en: "Starter" },
        firstYear: 699_000,
        renewal: 499_000,
        description: { id: "Untuk kebutuhan website bisnis yang sederhana dan jelas.", en: "For simple, clearly defined business website needs." },
        features: [
          { id: "Profil bisnis dan layanan utama", en: "Business profile and core services" },
          { id: "Hosting terkelola, SSL, dan subdomain SAN bila sesuai", en: "Managed hosting, SSL, and SAN subdomain where suitable" },
          { id: "Form kontak dan CTA WhatsApp", en: "Contact form and WhatsApp CTA" },
        ],
      },
      {
        id: "business",
        name: { id: "Business", en: "Business" },
        firstYear: 999_000,
        renewal: 699_000,
        description: { id: "Ruang konten lebih luas untuk bisnis yang sedang bertumbuh.", en: "More content room for a growing business." },
        features: [
          { id: "Semua fitur Starter", en: "Everything in Starter" },
          { id: "Dukungan custom domain", en: "Custom domain support" },
          { id: "Halaman dan konten bisnis lebih lengkap", en: "More complete business pages and content" },
        ],
        featured: true,
      },
      {
        id: "pro",
        name: { id: "Pro", en: "Pro" },
        firstYear: 1_490_000,
        renewal: 899_000,
        description: { id: "Untuk bisnis yang membutuhkan struktur konten dan SEO lebih kuat.", en: "For businesses that need stronger content structure and SEO." },
        features: [
          { id: "Semua fitur Business", en: "Everything in Business" },
          { id: "Halaman dan konten yang lebih luas", en: "Expanded pages and content" },
          { id: "Setup SEO dan dukungan implementasi prioritas", en: "Stronger SEO setup and priority implementation support" },
        ],
      },
    ],
    process: [
      { id: "Pilih paket yang sesuai", en: "Choose a suitable package" },
      { id: "Kirim informasi bisnis dan materi", en: "Share business information and materials" },
      { id: "Konfigurasi branding dan konten", en: "Configure branding and content" },
      { id: "Review bersama lalu luncurkan", en: "Review together, then launch" },
    ],
    relatedCaseStudyIds: ["jetkios-pos-platform", "government-portals"],
    seo: {
      title: { id: "SAN Site | Website Bisnis Profesional Mulai Rp699 Ribu", en: "SAN Site | Managed Business Websites from Rp699k" },
      description: { id: "Website bisnis untuk UMKM, konsultan, klinik, organisasi, dan startup awal. Mulai Rp699.000 dengan hosting terkelola dan fondasi SEO dasar.", en: "Professional business websites for SMBs, consultants, clinics, organizations, and early startups. From Rp699k with managed hosting and basic SEO." },
    },
    faq: [
      { question: { id: "Apa harga sudah termasuk hosting?", en: "Does the price include hosting?" }, answer: { id: "Paket SAN Site mencakup hosting terkelola selama periode yang tercantum. Detail kapasitas dan kebutuhan tambahan dikonfirmasi saat konsultasi.", en: "SAN Site packages include managed hosting for the stated period. Capacity and additional requirements are confirmed during consultation." } },
      { question: { id: "Apakah domain termasuk?", en: "Is a domain included?" }, answer: { id: "Dukungan domain bergantung pada ekstensi dan ketersediaan. Jangan anggap semua ekstensi termasuk tanpa konfirmasi paket.", en: "Domain support depends on the extension and availability. Do not assume every extension is included without package confirmation." } },
      { question: { id: "Apakah website bisa dikembangkan lagi?", en: "Can the website be expanded later?" }, answer: { id: "Bisa. Halaman tambahan, integrasi, atau workflow yang lebih khusus dapat dibahas sebagai add-on atau proyek custom.", en: "Yes. Additional pages, integrations, or more specific workflows can be discussed as an add-on or custom project." } },
    ],
  },
  {
    id: "san-corporate",
    title: { id: "SAN Corporate", en: "SAN Corporate" },
    eyebrow: { id: "Website perusahaan yang lebih fleksibel", en: "A more flexible company website" },
    slug: { id: "website-perusahaan", en: "corporate-website" },
    summary: { id: "Presentasi perusahaan yang lebih kuat dengan arsitektur konten, integrasi, dan struktur halaman yang disesuaikan.", en: "A stronger company presentation with tailored content architecture, integrations, and page structure." },
    audience: [
      { id: "Perusahaan yang sedang memperkuat brand", en: "Companies strengthening their brand" },
      { id: "Organisasi dengan banyak lini layanan", en: "Organizations with multiple service lines" },
      { id: "Bisnis yang membutuhkan integrasi form, CRM, atau API", en: "Businesses needing form, CRM, or API integrations" },
    ],
    problem: { id: "Template standar tidak cukup untuk menjelaskan bisnis, portofolio, dan proses internal Anda secara meyakinkan.", en: "A standard template is not enough to explain your business, portfolio, and internal processes convincingly." },
    included: [
      { id: "Implementasi visual semi-custom", en: "Semi-custom visual implementation" },
      { id: "Arsitektur informasi dan halaman layanan", en: "Information architecture and service pages" },
      { id: "Case studies, blog/news, analytics, dan SEO teknis", en: "Case studies, blog/news, analytics, and technical SEO" },
      { id: "Deployment dan handover", en: "Deployment and handover" },
    ],
    addOns: [
      { id: "Integrasi CRM, API, atau workflow internal", en: "CRM, API, or internal workflow integrations" },
      { id: "Content migration dan dukungan copywriting", en: "Content migration and copywriting support" },
    ],
    startingPrice: 3_500_000,
    billing: "custom",
    process: [
      { id: "Discovery singkat", en: "Focused discovery" },
      { id: "Susun struktur halaman dan visual", en: "Shape page structure and visuals" },
      { id: "Implementasi, review, dan deployment", en: "Implement, review, and deploy" },
    ],
    relatedCaseStudyIds: ["government-portals"],
    seo: { title: { id: "SAN Corporate | Jasa Website Perusahaan Mulai Rp3,5 Juta", en: "SAN Corporate | Company Websites from Rp3.5m" }, description: { id: "Website perusahaan dengan struktur konten, visual semi-custom, case study, blog, SEO teknis, dan integrasi sesuai kebutuhan.", en: "Company websites with semi-custom visuals, content architecture, case studies, blog, technical SEO, and integrations." } },
    faq: [],
  },
  {
    id: "san-publisher",
    title: { id: "SAN Publisher", en: "SAN Publisher" },
    eyebrow: { id: "Platform publishing siap diluncurkan", en: "A ready-to-launch publishing platform" },
    slug: { id: "portal-media", en: "publishing-platform" },
    summary: { id: "Fondasi portal berita, media organisasi, newsroom perusahaan, atau publikasi komunitas dengan alur editorial yang jelas.", en: "A foundation for news portals, organization media, corporate newsrooms, and community publishing with a clear editorial workflow." },
    audience: [
      { id: "Portal berita lokal dan media komunitas", en: "Local news portals and community media" },
      { id: "Media sekolah, kampus, dan asosiasi", en: "School, campus, and association media" },
      { id: "Corporate newsroom", en: "Corporate newsrooms" },
    ],
    problem: { id: "Tim editorial membutuhkan platform yang rapi untuk mengelola kategori, penulis, media, SEO, dan distribusi konten.", en: "Editorial teams need a structured platform for categories, authors, media, SEO, and content distribution." },
    included: [
      { id: "Kategori, artikel, author workflow, dan media management", en: "Categories, articles, author workflow, and media management" },
      { id: "SEO, sitemap, dan posisi iklan", en: "SEO, sitemap, and advertising positions" },
      { id: "Struktur konten bilingual bila diperlukan", en: "Bilingual content structure where needed" },
      { id: "Integrasi newsletter bila sesuai scope", en: "Newsletter integration where in scope" },
    ],
    addOns: [
      { id: "Workflow editorial lanjutan", en: "Advanced editorial workflow" },
      { id: "AI-assisted workflow dengan verifikasi editorial manusia", en: "AI-assisted workflow with human editorial verification" },
    ],
    startingPrice: 2_490_000,
    billing: "custom",
    process: [
      { id: "Petakan model publikasi", en: "Map the publishing model" },
      { id: "Konfigurasi struktur dan peran", en: "Configure structure and roles" },
      { id: "Review editorial lalu launch", en: "Review editorial flow, then launch" },
    ],
    relatedCaseStudyIds: ["government-portals"],
    seo: { title: { id: "SAN Publisher | Portal Media Mulai Rp2,49 Juta", en: "SAN Publisher | Publishing Platforms from Rp2.49m" }, description: { id: "Platform siap diluncurkan untuk portal berita, media organisasi, newsroom perusahaan, dan komunitas dengan SEO serta alur editorial.", en: "Ready-to-launch publishing platforms for news portals, organizations, corporate newsrooms, and communities with SEO and editorial workflows." } },
    faq: [],
  },
  {
    id: "san-education",
    title: { id: "SAN Education", en: "SAN Education" },
    eyebrow: { id: "Platform digital untuk pendidikan", en: "Digital platforms for education" },
    slug: { id: "platform-pendidikan", en: "education-platform" },
    summary: { id: "Paket platform pembelajaran dan administrasi pendidikan yang dapat dimulai dari scope terukur lalu dikembangkan.", en: "Education learning and administration platforms that start with a measurable scope and can evolve over time." },
    audience: [
      { id: "Sekolah dan lembaga kursus", en: "Schools and learning providers" },
      { id: "Kampus dan organisasi pendidikan", en: "Campuses and education organizations" },
      { id: "Institusi yang menyiapkan LMS", en: "Institutions preparing an LMS" },
    ],
    problem: { id: "Informasi pembelajaran, peran guru, siswa, kuis, dan administrasi sering tersebar di banyak alat.", en: "Learning content, teacher and student roles, quizzes, and administration are often spread across too many tools." },
    included: [
      { id: "LMS, kursus, guru/instruktur, dan siswa", en: "LMS, courses, teachers/instructors, and students" },
      { id: "Konten pembelajaran dan kuis", en: "Learning content and quizzes" },
      { id: "Membership atau pembayaran dasar bila dibutuhkan", en: "Basic membership or payments where needed" },
      { id: "Fondasi yang bisa diarahkan ke sistem sekolah lebih luas", en: "A foundation that can grow into broader school systems" },
    ],
    addOns: [
      { id: "PPDB, SIAKAD, parent portal, dan pembayaran", en: "Admissions, SIAKAD, parent portal, and payments" },
      { id: "Integrasi manajemen sekolah melalui custom development", en: "School management integration through custom development" },
    ],
    startingPrice: 4_500_000,
    billing: "custom",
    process: [
      { id: "Tentukan peran dan alur belajar", en: "Define learning roles and flows" },
      { id: "Konfigurasi konten dan akses", en: "Configure content and access" },
      { id: "Uji dengan pengguna lalu launch", en: "Test with users, then launch" },
    ],
    relatedCaseStudyIds: ["odoo-school-management"],
    seo: { title: { id: "SAN Education | LMS dan Platform Pendidikan Mulai Rp4,5 Juta", en: "SAN Education | LMS and Education Platforms from Rp4.5m" }, description: { id: "Platform pendidikan untuk LMS, kursus online, guru, siswa, kuis, dan akses pembelajaran. Modul sekolah lanjutan tersedia melalui konsultasi.", en: "Education platforms for LMS, online courses, teachers, students, quizzes, and learning access. Broader school modules are available through consultation." } },
    faq: [],
  },
  {
    id: "san-commerce",
    title: { id: "SAN Commerce", en: "SAN Commerce" },
    eyebrow: { id: "E-commerce dan marketplace yang dapat dikembangkan", en: "E-commerce and marketplace foundations" },
    slug: { id: "ecommerce-marketplace", en: "ecommerce-marketplace" },
    summary: { id: "Fondasi toko online atau marketplace dengan katalog, order, pembayaran, dan ruang untuk integrasi aplikasi.", en: "A foundation for online stores or marketplaces with catalog, orders, payments, and room for app integrations." },
    audience: [
      { id: "Bisnis dengan katalog dan order online", en: "Businesses with online catalogs and orders" },
      { id: "Brand yang perlu toko single-vendor", en: "Brands needing a single-vendor store" },
      { id: "Tim yang memvalidasi model marketplace", en: "Teams validating a marketplace model" },
    ],
    problem: { id: "Katalog sederhana tidak cukup ketika bisnis membutuhkan order management, variasi produk, pembayaran, atau peran vendor.", en: "A simple catalog is not enough when a business needs order management, product variants, payments, or vendor roles." },
    included: [
      { id: "Katalog produk dan variasi", en: "Product catalog and variants" },
      { id: "Single-vendor store atau scope marketplace yang disepakati", en: "Single-vendor store or an agreed marketplace scope" },
      { id: "Order management dan payment integration sesuai kebutuhan", en: "Order management and payment integration as needed" },
      { id: "Fondasi PWA atau integrasi mobile bila sesuai scope", en: "PWA foundation or mobile integration where in scope" },
    ],
    addOns: [
      { id: "Vendor, seller, delivery, atau customer app", en: "Vendor, seller, delivery, or customer apps" },
      { id: "Integrasi logistik dan workflow fulfillment", en: "Logistics integrations and fulfillment workflows" },
    ],
    startingPrice: 4_900_000,
    billing: "custom",
    process: [
      { id: "Validasi model jual-beli", en: "Validate the commerce model" },
      { id: "Susun katalog dan alur order", en: "Shape catalog and order flows" },
      { id: "Integrasikan pembayaran lalu uji", en: "Integrate payments and test" },
    ],
    relatedCaseStudyIds: ["smart-tourism-ecommerce", "jetkios-pos-platform"],
    seo: { title: { id: "SAN Commerce | E-commerce dan Marketplace Mulai Rp4,9 Juta", en: "SAN Commerce | E-commerce and Marketplace from Rp4.9m" }, description: { id: "Solusi e-commerce dan marketplace dengan katalog, variasi, order management, payment integration, dan opsi pengembangan aplikasi.", en: "E-commerce and marketplace solutions with catalogs, variants, order management, payment integration, and app expansion options." } },
    faq: [],
  },
  {
    id: "san-growth",
    title: { id: "SAN Growth", en: "SAN Growth" },
    eyebrow: { id: "Pertumbuhan dan komunikasi pelanggan", en: "Growth and customer communication" },
    slug: { id: "marketing-automation", en: "marketing-automation" },
    summary: { id: "Layanan recurring untuk newsletter, campaign, segmentasi, automation, dan pengukuran komunikasi pelanggan.", en: "Recurring support for newsletters, campaigns, segmentation, automation, and customer communication measurement." },
    audience: [
      { id: "Bisnis yang mulai membangun database pelanggan", en: "Businesses building a customer database" },
      { id: "Tim marketing yang membutuhkan automation", en: "Marketing teams needing automation" },
      { id: "Organisasi dengan campaign rutin", en: "Organizations running recurring campaigns" },
    ],
    problem: { id: "Komunikasi pelanggan tidak konsisten karena campaign, segmentasi, dan laporan masih dikerjakan terpisah.", en: "Customer communication is inconsistent because campaigns, segmentation, and reporting are handled separately." },
    included: [
      { id: "Newsletter dan email campaign", en: "Newsletters and email campaigns" },
      { id: "Segmentasi pelanggan dan automation", en: "Customer segmentation and automation" },
      { id: "Landing page atau campaign support", en: "Landing page or campaign support" },
      { id: "Analytics dan reporting", en: "Analytics and reporting" },
    ],
    addOns: [
      { id: "Integrasi official WhatsApp Business Platform", en: "Official WhatsApp Business Platform integration" },
      { id: "Lifecycle campaign dan CRM integration", en: "Lifecycle campaigns and CRM integration" },
    ],
    startingPrice: 199_000,
    billing: "monthly",
    process: [
      { id: "Petakan audience dan tujuan", en: "Map audiences and goals" },
      { id: "Siapkan channel dan campaign", en: "Set up channels and campaigns" },
      { id: "Ukur, pelajari, dan iterasikan", en: "Measure, learn, and iterate" },
    ],
    relatedCaseStudyIds: [],
    seo: { title: { id: "SAN Growth | Marketing Automation Mulai Rp199 Ribu/Bulan", en: "SAN Growth | Marketing Automation from Rp199k/month" }, description: { id: "Dukungan newsletter, email campaign, segmentasi, automation, official WhatsApp Business Platform, dan reporting untuk pertumbuhan yang terukur.", en: "Newsletter, email campaign, segmentation, automation, official WhatsApp Business Platform, and reporting support for measurable growth." } },
    faq: [],
  },
];

export const getSolutionById = (id: string): Solution | undefined =>
  solutions.find((solution) => solution.id === id);

export const getSolutionBySlug = (
  slug: string,
  locale: SiteLocale,
): Solution | undefined =>
  solutions.find((solution) => solution.slug[locale] === slug);

export const formatIDR = (amount: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s/g, "");

export const formatStartingPrice = (
  amount: number,
  billing: SolutionBilling,
  locale: SiteLocale,
): string => {
  const amountText = formatIDR(amount);
  if (billing === "monthly") {
    return locale === "id" ? `Mulai ${amountText}/bulan` : `From ${amountText}/month`;
  }
  if (billing === "annual") {
    return locale === "id" ? `Mulai ${amountText}` : `From ${amountText}`;
  }
  return locale === "id" ? `Mulai ${amountText}` : `From ${amountText}`;
};

export const siteSolution = solutions[0];
