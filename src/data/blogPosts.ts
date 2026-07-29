import type { TranslatableString } from "./translations";

export type BlogAuthor = {
  name: string;
  role: TranslatableString;
  avatarUrl?: string;
  bio: TranslatableString;
};

export type BlogPost = {
  id: string;
  slug: { id: string; en: string };
  title: TranslatableString;
  excerpt: TranslatableString;
  content: TranslatableString;
  publishedAt: string;
  readTimeMinutes: number;
  category: TranslatableString;
  author: BlogAuthor;
  tags: string[];
  relatedServiceIds: string[];
  relatedCaseStudyIds: string[];
  featuredImage?: string;
};

export const blogAuthors: Record<string, BlogAuthor> = {
  rizky: {
    name: "Rizky Pratama",
    role: {
      id: "Senior ERP & Odoo Solution Architect",
      en: "Senior ERP & Odoo Solution Architect",
    },
    bio: {
      id: "Spesialis implementasi ERP Odoo dan transformasi digital bisnis skala menengah hingga enterprise dengan pengalaman lebih dari 8 tahun.",
      en: "Specialist in Odoo ERP implementation and digital transformation for mid-to-enterprise businesses with 8+ years of experience.",
    },
  },
  hendra: {
    name: "Hendra Wijaya",
    role: {
      id: "Principal Software Architect",
      en: "Principal Software Architect",
    },
    bio: {
      id: "Praktisi arsitektur perangkat lunak enterprise, infrastruktur cloud, dan keamanan data mission-critical.",
      en: "Practitioner in enterprise software architecture, cloud infrastructure, and mission-critical data security.",
    },
  },
  siti: {
    name: "Siti Rahmawati",
    role: {
      id: "Head of Product & SaaS Engineering",
      en: "Head of Product & SaaS Engineering",
    },
    bio: {
      id: "Pakar strategi produk SaaS B2B, UX sistem bisnis, dan pengembangan aplikasi web berbasis microservices.",
      en: "Expert in B2B SaaS product strategy, business UX, and microservices-based web app development.",
    },
  },
};

export const blogPosts: BlogPost[] = [
  {
    id: "implementasi-odoo-erp-indonesia",
    slug: {
      id: "panduan-implementasi-odoo-erp-indonesia",
      en: "odoo-erp-implementation-guide-indonesia",
    },
    title: {
      id: "Panduan Lengkap Implementasi Odoo ERP untuk Efisiensi Bisnis di Indonesia",
      en: "Comprehensive Guide to Odoo ERP Implementation for Business Efficiency in Indonesia",
    },
    excerpt: {
      id: "Pelajari strategi sukses implementasi Odoo ERP: dari analisis kebutuhan, kustomisasi modul akuntansi dan gudang, hingga kalkulasi ROI bagi perusahaan Indonesia.",
      en: "Learn proven strategies for Odoo ERP implementation: requirement analysis, accounting and warehouse module customization, and ROI calculations for Indonesian enterprises.",
    },
    category: {
      id: "ERP & Odoo",
      en: "ERP & Odoo",
    },
    publishedAt: "2026-07-20",
    readTimeMinutes: 7,
    author: blogAuthors.rizky,
    tags: ["Odoo", "ERP", "Enterprise", "Transformasi Digital"],
    relatedServiceIds: ["odoo-implementation", "enterprise-systems"],
    relatedCaseStudyIds: ["odoo-online-store", "odoo-warehouse-management"],
    content: {
      id: `
### Mengapa Odoo ERP Menjadi Pilihan Utama Bisnis di Indonesia?

Enterprise Resource Planning (ERP) adalah tulang punggung operasional perusahaan modern. Di Indonesia, semakin banyak perusahaan retail, manufaktur, distribusi, dan institusi layanan yang beralih ke **Odoo ERP** karena sifatnya yang modular, fleksibel, serta memiliki efisiensi biaya yang jauh lebih baik dibandingkan ERP tradisional berskala besar.

#### 1. Pentingnya Analisis Kebutuhan Sebelum Implementasi

Salah satu penyebab utama kegagalan proyek ERP adalah langsung melakukan *coding* atau kustomisasi tanpa analisis proses bisnis (*business process mapping*) yang matang. Di SAN Solution, tahapan awal selalu dimulai dengan:
- **Gap Analysis**: Membandingkan workflow standar Odoo dengan proses operasional unik perusahaan Anda.
- **Data Migration Planning**: Memastikan data master (pelanggan, vendor, produk, dan saldo awal akuntansi) tersaring dengan bersih.

#### 2. Kustomisasi Modul Kunci untuk Pasar Indonesia

Odoo versi standar telah menyediakan fitur lengkap, namun untuk pasar Indonesia diperlukan penyesuaian regulasi dan operasional spesifik:
- **Modul Akuntansi & Perpajakan**: Penyesuaian skema Faktur Pajak, PPh, PPN, dan integrasi laporan keuangan sesuai PSAK.
- **Modul Manajemen Gudang (WMS)**: Integrasi barcode scanner, penataan lokasi multi-gudang, dan aturan pemesanan ulang (*auto-reorder*) berbasis tren penjualan.
- **Penggajian & HR**: Penyesuaian kalkulasi PPh 21, BPJS Kesehatan, dan BPJS Ketenagakerjaan pada modul Odoo HR.

#### 3. Kalkulasi ROI dan Nilai Bisnis Nyata

Dengan implementasi Odoo yang terarah, perusahaan umumnya merasakan peningkatan efisiensi yang terukur:
- **Penghematan Waktu Administrasi**: Memangkas hingga 60% waktu pencatatan manual antar divisi.
- **Akurasi Inventori**: Menurunkan kerugian akibat selisih stok fisik hingga di atas 98%.
- **Kecepatan Keputusan**: Dashboard eksekutif memberikan laporan keuangan dan penjualan secara real-time.

---

### Kesimpulan & Langkah Selanjutnya

Implementasi ERP yang sukses bukan sekadar menginstal software, melainkan membangun fondasi operasional yang siap berkembang (*scalable*). Tim engineer SAN Solution siap membantu perusahaan Anda merancang alur ERP Odoo yang presisi sesuai target bisnis Anda.
      `.trim(),
      en: `
### Why Odoo ERP is the Leading Choice for Businesses in Indonesia

Enterprise Resource Planning (ERP) forms the operational backbone of modern enterprises. In Indonesia, a growing number of retail, manufacturing, distribution, and service organizations are migrating to **Odoo ERP** due to its modularity, flexibility, and superior cost efficiency compared to traditional enterprise legacy systems.

#### 1. The Crucial Role of Requirement Analysis

A primary cause of ERP project delays is diving into customization without thorough business process mapping. At SAN Solution, our engagement model begins with:
- **Gap Analysis**: Benchmarking standard Odoo workflows against your unique operational rules.
- **Data Migration Planning**: Cleanly extracting and validating master data (customers, vendors, products, and initial accounting balances).

#### 2. Key Module Customization for Local Operations

While out-of-the-box Odoo is comprehensive, Indonesian localization demands specific compliance:
- **Accounting & Tax Localization**: Tailoring e-Faktur tax invoicing, VAT/Withholding taxes, and PSAK financial reporting.
- **Warehouse Management (WMS)**: Barcode scanner integration, multi-warehouse routing, and demand-driven auto-reordering.
- **HR & Payroll**: Integrating local PPh 21 tax formulas, BPJS healthcare, and social security compliance into Odoo HR.

#### 3. Measurable ROI and Tangible Business Value

A well-executed Odoo rollout yields immediate performance gains:
- **Administrative Time Savings**: Cuts up to 60% of manual data entry across departments.
- **Inventory Precision**: Reduces physical stock discrepancy losses to under 2%.
- **Decision Speed**: Executive dashboards deliver real-time financial and sales visibility.

---

### Conclusion & Next Steps

Successful ERP deployment is not just installing software—it is building a scalable operational engine. SAN Solution’s engineering team is ready to design a tailored Odoo roadmap aligned with your growth goals.
      `.trim(),
    },
  },
  {
    id: "arsitektur-sistem-enterprise-modern",
    slug: {
      id: "arsitektur-sistem-enterprise-scalable-aman",
      en: "scalable-secure-enterprise-system-architecture",
    },
    title: {
      id: "Membangun Arsitektur Sistem Enterprise yang Scalable, Andal, dan Aman",
      en: "Building Scalable, Reliable, and Secure Enterprise System Architectures",
    },
    excerpt: {
      id: "Studi arsitektur perangkat lunak enterprise: strategi microservices, high availability 99.99%, zero downtime deployment, dan proteksi data tingkat tinggi.",
      en: "Enterprise software architecture study: microservices patterns, 99.99% high availability, zero-downtime deployment, and mission-critical data protection.",
    },
    category: {
      id: "Arsitektur & DevOps",
      en: "Architecture & DevOps",
    },
    publishedAt: "2026-07-22",
    readTimeMinutes: 8,
    author: blogAuthors.hendra,
    tags: ["Enterprise", "System Architecture", "Security", "DevOps"],
    relatedServiceIds: ["enterprise-systems", "devops-infrastructure", "system-integration"],
    relatedCaseStudyIds: ["visitor-management-system", "government-portals"],
    content: {
      id: `
### Tantangan Skalabilitas pada Aplikasi Skala Besar

Seiring bertumbuhnya jumlah transaksi dan pengguna harian, sistem perangkat lunak skala besar (*enterprise systems*) menghadapi tekanan performa yang tinggi. Tanpa perancangan arsitektur yang matang, penambahan fitur baru sering kali memperlambat respon aplikasi dan meningkatkan risiko *downtime*.

#### 1. Kapan Harus Menggunakan Microservices vs Modular Monolith?

Tidak semua sistem harus langsung menggunakan arsitektur microservices yang rumit:
- **Modular Monolith**: Sangat ideal untuk tahap awal atau aplikasi skala menengah di mana batas antar-domain bisnis masih berkembang. Mudah di-deploy dan diuji secara holistik.
- **Microservices**: Tepat diterapkan saat layanan tertentu (misal: mesin pembayaran atau pemrosesan absensi) memiliki lonjakan beban *traffic* yang jauh berbeda dari layanan lainnya.

#### 2. Kunci Mencapai High Availability (99.99% Uptime)

Untuk sistem *mission-critical* seperti pada BUMN, perbankan, atau instansi publik, *downtime* dapat berakibat fatal pada reputasi dan finansial:
- **Load Balancing & Auto-Scaling**: Mendistribusikan beban trafik secara dinamis menggunakan Nginx, HAProxy, atau Kubernetes ingress controller.
- **Database Replication & Failover**: Memanfaatkan konfigurasi Primary-Replica dengan *automatic failover* (misal pada PostgreSQL atau MariaDB cluster).
- **Health Checks & Circuit Breakers**: Mencegah kegagalan cascading ketika salah satu layanan eksternal mengalami kendala.

#### 3. Proteksi Keamanan & Kepatuhan Data

Keamanan harus dibangun sejak baris kode pertama (*security by design*):
- **Role-Based Access Control (RBAC)**: Memastikan setiap pengguna hanya dapat mengakses data sesuai hak wewenangnya.
- **Enkripsi Data (At Rest & In Transit)**: Mengamankan data sensitif dengan enkripsi AES-256 pada database dan TLS 1.3 pada alur komunikasi jaringan.
- **Audit Logging**: Mencatat setiap aktivitas manipulasi data secara tidak terpisahkan (*immutable log*) untuk kepatuhan regulasi.

---

### Kesimpulan

Arsitektur sistem yang baik adalah arsitektur yang fleksibel beradaptasi dengan pertumbuhan bisnis tanpa mengorbankan keamanan atau performa. SAN Solution membantu perusahaan merancang dan mengimplementasikan arsitektur sistem enterprise yang tangguh untuk jangka panjang.
      `.trim(),
      en: `
### Scalability Challenges in Enterprise Software Systems

As daily active users and transaction volumes expand, enterprise software systems face significant performance pressure. Without deliberate architectural design, adding new capabilities often degrades response latency and amplifies outage risks.

#### 1. Deciding Between Microservices vs Modular Monoliths

Not every system requires complex microservices from day one:
- **Modular Monolith**: Highly effective for initial phases or mid-sized platforms where domain boundaries are evolving. Simplifies deployment and end-to-end testing.
- **Microservices**: Ideal when specific workloads (e.g., payment engines or attendance processing) experience traffic spikes vastly out-scaling other services.

#### 2. Blueprint for 99.99% High Availability

For mission-critical environments in enterprise and public sectors, downtime carries severe financial and reputational consequences:
- **Load Balancing & Auto-Scaling**: Distributing traffic dynamically using Nginx, HAProxy, or Kubernetes ingress controllers.
- **Database Replication & Automated Failover**: Implementing Primary-Replica setups with automated failover on PostgreSQL or MariaDB clusters.
- **Health Probes & Circuit Breakers**: Preventing cascading failures when downstream third-party dependencies slow down.

#### 3. Data Protection & Security Compliance

Security must be embedded from the first line of code (*security by design*):
- **Role-Based Access Control (RBAC)**: Enforcing strict privilege boundaries across user groups.
- **Data Encryption (At Rest & In Transit)**: Securing sensitive records via AES-256 storage encryption and TLS 1.3 transit protocols.
- **Audit Logging**: Maintaining immutable audit logs for regulatory compliance.

---

### Conclusion

A superior architecture evolves seamlessly alongside business growth without compromising stability or security. SAN Solution partners with enterprises to build resilient, future-ready infrastructure.
      `.trim(),
    },
  },
  {
    id: "strategi-pengembangan-saas-b2b",
    slug: {
      id: "strategi-pengembangan-produk-saas-b2b",
      en: "b2b-saas-product-development-strategy",
    },
    title: {
      id: "Strategi Pengembangan Produk SaaS B2B: Dari Konsep Hingga Scale-Up",
      en: "B2B SaaS Product Development Strategy: From Concept to Scale-Up",
    },
    excerpt: {
      id: "Panduan praktis membangun produk SaaS B2B: arsitektur multi-tenancy, integrasi payment gateway, retensi pengguna, dan performa tinggi.",
      en: "Actionable guide to building B2B SaaS products: multi-tenancy architecture, automated billing integration, user retention, and high performance.",
    },
    category: {
      id: "SaaS & App Dev",
      en: "SaaS & App Dev",
    },
    publishedAt: "2026-07-25",
    readTimeMinutes: 6,
    author: blogAuthors.siti,
    tags: ["SaaS", "Web App", "B2B", "Product Development"],
    relatedServiceIds: ["saas-development", "web-development", "mobile-app-development"],
    relatedCaseStudyIds: ["jetkios-pos-platform", "smart-tourism-ecommerce"],
    content: {
      id: `
### Fenomena Pertumbuhan Aplikasi SaaS B2B

Model bisnis Software-as-a-Service (SaaS) B2B kini semakin diminati karena memberikan pendapatan berulang (*recurring revenue*) yang stabil serta mempermudah pelanggan dalam menggunakan aplikasi bisnis tanpa biaya lisensi awal yang mahal.

#### 1. Memilih Arsitektur Multi-Tenancy yang Tepat

Solusi SaaS B2B harus dapat mengelola banyak tenant (perusahaan/klien) dari satu basis kode terpusat:
- **Shared Database, Shared Schema**: Hemat biaya infrastruktur, sangat cocok untuk SaaS B2B skala menengah. Isolasi data dipisahkan melalui kunci \`tenant_id\`.
- **Shared Database, Separate Schema**: Memberikan isolasi data lebih kuat dengan membuat skema database terpisah untuk setiap tenant.
- **Database-per-Tenant**: Pilihan terbaik untuk klien korporat dengan tingkat kepatuhan keamanan yang sangat tinggi.

#### 2. Kecepatan Onboarding & Pengalaman Pengguna (UX)

Pada aplikasi B2B, pengguna menginginkan aplikasi yang intuitif tanpa perlu membaca panduan tebal:
- **Self-Service Onboarding**: Memungkinkan pengguna mendaftar, memilih paket, dan langsung mencoba fitur utama dalam kurun waktu kurang dari 5 menit.
- **Responsive & Fast Loading**: Memastikan tampilan dapat diakses cepat dari perangkat desktop maupun smartphone.

#### 3. Integrasi Penagihan & Manajemen Langganan Automatis

Otomatisasi siklus langganan adalah jantung efisiensi produk SaaS:
- **Integrasi Payment Gateway**: Mendukung pembayaran via Transfer Bank, QRIS, Kartu Kredit, hingga E-Wallet.
- **Automated Dunning & Invoicing**: Mengirimkan pengingat pembaharuan langganan dan penerbitan faktur secara otomatis sebelum masa berlaku berakhir.

---

### Kesimpulan

Membangun produk SaaS B2B yang sukses memerlukan kombinasi antara keandalan teknis dan kemudahan pengalaman pengguna. Tim SAN Solution siap mendampingi perjalanan produk SaaS Anda dari fase MVP hingga skala penuh.
      `.trim(),
      en: `
### The Rise of B2B Software-as-a-Service

B2B Software-as-a-Service (SaaS) models are rapidly gaining traction due to predictable recurring revenue streams and zero upfront software licensing friction for business customers.

#### 1. Selecting the Right Multi-Tenancy Architecture

B2B SaaS platforms must efficiently serve thousands of corporate tenants from a core engine:
- **Shared Database, Shared Schema**: Infrastructure cost-effective, ideal for mid-market SaaS. Tenant data segregation is strictly enforced via \`tenant_id\` scopes.
- **Shared Database, Separate Schema**: Delivers enhanced isolation by provisioning dedicated database schemas per corporate customer.
- **Database-per-Tenant**: Essential for high-security enterprise tiers requiring physical data isolation.

#### 2. Streamlined Onboarding & User Experience (UX)

Modern B2B decision-makers demand intuitive tools without lengthy training manuals:
- **Self-Service Onboarding**: Enables users to register, select subscription tiers, and realize core product value in under 5 minutes.
- **Responsive & High-Speed Execution**: Guarantees snappy performance across desktop interfaces and mobile browsers.

#### 3. Automated Billing & Subscription Management

Automating the recurring billing cycle is critical to scaling SaaS operations:
- **Payment Gateway Integration**: Supporting virtual accounts, QRIS, credit cards, and local digital wallets.
- **Automated Dunning & Invoicing**: Dispatching renewal notices and auto-generating PDF invoices prior to billing cycles.

---

### Conclusion

Building a thriving B2B SaaS platform requires technical excellence paired with friction-free UX. SAN Solution’s product development squad is ready to transform your vision from MVP to market leader.
      `.trim(),
    },
  },
];

export const getBlogPostById = (id: string): BlogPost | undefined =>
  blogPosts.find((post) => post.id === id);

export const getBlogPostBySlug = (
  slug: string,
  locale: "id" | "en" = "id",
): BlogPost | undefined =>
  blogPosts.find((post) => post.slug[locale] === slug);
