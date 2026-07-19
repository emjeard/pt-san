import type { TranslatableString } from "./translations";

export type ServiceProcessStep = {
  title: TranslatableString;
  description: TranslatableString;
};

export type ServiceFaqItem = {
  question: TranslatableString;
  answer: TranslatableString;
};

export type Service = {
  id: string;
  slug: { id: string; en: string };
  title: TranslatableString;
  summary: TranslatableString;
  problems: TranslatableString[];
  scope: TranslatableString[];
  benefits: TranslatableString[];
  process: ServiceProcessStep[];
  technologies: string[];
  relatedCaseStudyIds: string[];
  faq: ServiceFaqItem[];
  seo: {
    title: TranslatableString;
    description: TranslatableString;
  };
};

export const services: Service[] = [
  {
    id: "web-development",
    slug: {
      id: "pengembangan-website",
      en: "web-development",
    },
    title: {
      id: "Pengembangan Website & Portal",
      en: "Website & Portal Development",
    },
    summary: {
      id: "Kami membangun website perusahaan, portal informasi, dan aplikasi web yang mudah digunakan — dari portal pemerintahan hingga platform operasional bisnis.",
      en: "We build company websites, information portals, and web applications that are easy to use — from government portals to business operational platforms.",
    },
    problems: [
      {
        id: "Informasi perusahaan atau institusi sulit diakses dan tidak terstruktur",
        en: "Company or institutional information is hard to access and poorly structured",
      },
      {
        id: "Proses bisnis masih bergantung pada dokumen manual dan komunikasi terpisah",
        en: "Business processes still rely on manual documents and disconnected communication",
      },
      {
        id: "Website lama sulit dirawat, lambat, atau tidak aman",
        en: "Legacy websites are difficult to maintain, slow, or insecure",
      },
    ],
    scope: [
      {
        id: "Website perusahaan dan landing page",
        en: "Company websites and landing pages",
      },
      {
        id: "Portal informasi pemerintahan dan institusi publik",
        en: "Government and public institution information portals",
      },
      {
        id: "Aplikasi web operasional seperti POS dan dashboard internal",
        en: "Operational web applications such as POS and internal dashboards",
      },
      {
        id: "Integrasi dengan sistem backend dan database existing",
        en: "Integration with existing backend systems and databases",
      },
    ],
    benefits: [
      {
        id: "Pengunjung menemukan informasi yang mereka butuhkan dengan lebih cepat",
        en: "Visitors find the information they need more quickly",
      },
      {
        id: "Tim internal bekerja dari satu platform web yang konsisten",
        en: "Internal teams work from one consistent web platform",
      },
      {
        id: "Fondasi web yang siap berkembang seiring kebutuhan bisnis",
        en: "A web foundation ready to grow with business needs",
      },
    ],
    process: [
      {
        title: { id: "Pahami kebutuhan", en: "Understand requirements" },
        description: {
          id: "Kami memetakan tujuan bisnis, pengguna, dan konten yang perlu ditampilkan.",
          en: "We map business goals, users, and content that needs to be presented.",
        },
      },
      {
        title: { id: "Rancang struktur", en: "Design structure" },
        description: {
          id: "Informasi, alur navigasi, dan kebutuhan teknis dirancang sebelum development.",
          en: "Information architecture, navigation flow, and technical needs are designed before development.",
        },
      },
      {
        title: { id: "Bangun & uji", en: "Build & test" },
        description: {
          id: "Website dibangun secara iteratif dengan review berkala dan pengujian.",
          en: "The website is built iteratively with regular reviews and testing.",
        },
      },
      {
        title: { id: "Luncurkan & dukung", en: "Launch & support" },
        description: {
          id: "Deployment production, handover, dan rekomendasi pemeliharaan.",
          en: "Production deployment, handover, and maintenance recommendations.",
        },
      },
    ],
    technologies: ["Next.js", "React", "Nuxt.js", "Laravel", "PHP", "TypeScript", "Tailwind CSS"],
    relatedCaseStudyIds: [
      "government-portals",
      "jetkios-pos-platform",
      "smart-tourism-ecommerce",
    ],
    faq: [
      {
        question: {
          id: "Apakah SAN Solution hanya membuat website statis?",
          en: "Does SAN Solution only build static websites?",
        },
        answer: {
          id: "Tidak. Kami membangun website informasi, portal, dan aplikasi web operasional — termasuk sistem dengan backend, database, dan integrasi.",
          en: "No. We build informational websites, portals, and operational web applications — including systems with backend, database, and integrations.",
        },
      },
      {
        question: {
          id: "Bisakah website terhubung dengan sistem internal yang sudah ada?",
          en: "Can the website connect to existing internal systems?",
        },
        answer: {
          id: "Ya, integrasi dengan sistem existing adalah bagian umum dari scope kami — tergantung kebutuhan dan ketersediaan API atau akses data.",
          en: "Yes, integration with existing systems is a common part of our scope — depending on requirements and API or data access availability.",
        },
      },
    ],
    seo: {
      title: {
        id: "Jasa Pengembangan Website & Portal | SAN Solution",
        en: "Website & Portal Development Services | SAN Solution",
      },
      description: {
        id: "SAN Solution membangun website perusahaan, portal pemerintahan, dan aplikasi web operasional yang mudah digunakan dan siap berkembang.",
        en: "SAN Solution builds company websites, government portals, and operational web applications that are easy to use and ready to grow.",
      },
    },
  },
  {
    id: "mobile-app-development",
    slug: {
      id: "aplikasi-mobile",
      en: "mobile-app-development",
    },
    title: {
      id: "Pengembangan Aplikasi Mobile",
      en: "Mobile App Development",
    },
    summary: {
      id: "Aplikasi Android dan iOS untuk retail, pariwisata, dan manajemen — dibangun dengan Flutter dan native Android, tersedia di Play Store & App Store.",
      en: "Android and iOS apps for retail, tourism, and management — built with Flutter and native Android, published on Play Store & App Store.",
    },
    problems: [
      {
        id: "Pelanggan atau pengguna internal tidak bisa mengakses layanan dari mobile",
        en: "Customers or internal users cannot access services from mobile devices",
      },
      {
        id: "Pengalaman mobile tidak konsisten antara Android dan iOS",
        en: "Mobile experience is inconsistent between Android and iOS",
      },
      {
        id: "Fitur seperti ticketing, belanja, atau engagement sulit diakses di luar desktop",
        en: "Features like ticketing, shopping, or engagement are hard to access outside desktop",
      },
    ],
    scope: [
      {
        id: "Aplikasi cross-platform dengan Flutter",
        en: "Cross-platform apps with Flutter",
      },
      {
        id: "Aplikasi native Android",
        en: "Native Android applications",
      },
      {
        id: "Integrasi dengan backend API dan sistem payment",
        en: "Integration with backend APIs and payment systems",
      },
      {
        id: "Publikasi ke Play Store dan App Store",
        en: "Publication to Play Store and App Store",
      },
    ],
    benefits: [
      {
        id: "Pengguna mengakses layanan langsung dari perangkat mobile mereka",
        en: "Users access services directly from their mobile devices",
      },
      {
        id: "Satu codebase untuk Android dan iOS dengan Flutter",
        en: "One codebase for Android and iOS with Flutter",
      },
      {
        id: "Pengalaman mobile yang dirancang untuk engagement dan transaksi",
        en: "Mobile experience designed for engagement and transactions",
      },
    ],
    process: [
      {
        title: { id: "Definisikan pengguna", en: "Define users" },
        description: {
          id: "Siapa pengguna aplikasi, fitur apa yang paling penting, dan platform target.",
          en: "Who the app users are, which features matter most, and target platforms.",
        },
      },
      {
        title: { id: "Rancang UX mobile", en: "Design mobile UX" },
        description: {
          id: "Alur aplikasi, navigasi, dan integrasi backend dirancang sebelum coding.",
          en: "App flows, navigation, and backend integration are designed before coding.",
        },
      },
      {
        title: { id: "Kembangkan & uji", en: "Develop & test" },
        description: {
          id: "Development iteratif dengan pengujian di perangkat nyata.",
          en: "Iterative development with testing on real devices.",
        },
      },
      {
        title: { id: "Rilis & iterasi", en: "Release & iterate" },
        description: {
          id: "Publikasi ke store, monitoring, dan perbaikan berdasarkan feedback.",
          en: "Store publication, monitoring, and improvements based on feedback.",
        },
      },
    ],
    technologies: ["Flutter", "Android", "iOS", "Golang", "Next.js"],
    relatedCaseStudyIds: ["smart-tourism-ecommerce"],
    faq: [
      {
        question: {
          id: "Flutter atau native — mana yang dipilih?",
          en: "Flutter or native — which do you choose?",
        },
        answer: {
          id: "Pilihan bergantung kebutuhan proyek. Flutter efisien untuk Android dan iOS sekaligus; native Android digunakan saat kebutuhan platform spesifik lebih dominan.",
          en: "The choice depends on project needs. Flutter is efficient for both Android and iOS; native Android is used when platform-specific requirements dominate.",
        },
      },
      {
        question: {
          id: "Apakah aplikasi bisa terhubung dengan backend existing?",
          en: "Can the app connect to an existing backend?",
        },
        answer: {
          id: "Ya. Aplikasi mobile kami dirancang untuk berintegrasi dengan API backend — baik yang sudah ada maupun yang kami bangun bersamaan.",
          en: "Yes. Our mobile apps are designed to integrate with backend APIs — whether existing or built alongside the app.",
        },
      },
    ],
    seo: {
      title: {
        id: "Jasa Pengembangan Aplikasi Mobile | SAN Solution",
        en: "Mobile App Development Services | SAN Solution",
      },
      description: {
        id: "SAN Solution membangun aplikasi Android dan iOS dengan Flutter untuk retail, pariwisata, ticketing, dan e-commerce.",
        en: "SAN Solution builds Android and iOS apps with Flutter for retail, tourism, ticketing, and e-commerce.",
      },
    },
  },
  {
    id: "enterprise-systems",
    slug: {
      id: "sistem-enterprise",
      en: "enterprise-systems",
    },
    title: {
      id: "Sistem Enterprise & Internal Tools",
      en: "Enterprise Systems & Internal Tools",
    },
    summary: {
      id: "Custom ERP, Visitor Management, HRIS, dan internal tools mission-critical menggunakan .NET Core dan Java — dirancang untuk organisasi besar dengan keamanan ketat dan high availability.",
      en: "Custom ERP, Visitor Management, HRIS, and mission-critical internal tools using .NET Core and Java — designed for large organizations with strict security and high availability.",
    },
    problems: [
      {
        id: "Proses operasional perusahaan besar masih manual atau tersebar di banyak sistem",
        en: "Large company operations are still manual or scattered across many systems",
      },
      {
        id: "Sistem lama sulit dirawat dan tidak memenuhi kebutuhan keamanan regulasi",
        en: "Legacy systems are hard to maintain and do not meet regulatory security requirements",
      },
      {
        id: "Tim tidak punya visibilitas real-time terhadap operasi penting",
        en: "Teams lack real-time visibility into critical operations",
      },
    ],
    scope: [
      {
        id: "Custom ERP dan modul operasional internal",
        en: "Custom ERP and internal operational modules",
      },
      {
        id: "Visitor Management dan sistem keamanan aset",
        en: "Visitor Management and asset security systems",
      },
      {
        id: "HRIS dan tools manajemen karyawan",
        en: "HRIS and employee management tools",
      },
      {
        id: "System analysis dan arsitektur database skala enterprise",
        en: "System analysis and enterprise-scale database architecture",
      },
    ],
    benefits: [
      {
        id: "Operasi terstruktur dengan kontrol keamanan yang sesuai kebutuhan regulasi",
        en: "Structured operations with security controls aligned to regulatory needs",
      },
      {
        id: "Arsitektur yang dirancang untuk high availability dan skala nasional",
        en: "Architecture designed for high availability and national-scale operations",
      },
      {
        id: "Sistem yang lebih mudah dirawat dibanding legacy yang terfragmentasi",
        en: "A system easier to maintain than fragmented legacy solutions",
      },
    ],
    process: [
      {
        title: { id: "Analisis kebutuhan", en: "Requirements analysis" },
        description: {
          id: "System analysis mendalam — proses bisnis, regulasi, dan kendala teknis existing.",
          en: "In-depth system analysis — business processes, regulations, and existing technical constraints.",
        },
      },
      {
        title: { id: "Arsitektur sistem", en: "System architecture" },
        description: {
          id: "Desain arsitektur database, keamanan, dan deployment untuk lingkungan mission-critical.",
          en: "Database, security, and deployment architecture design for mission-critical environments.",
        },
      },
      {
        title: { id: "Pengembangan bertahap", en: "Phased development" },
        description: {
          id: "Development iteratif dengan demo rutin, code review, dan quality gate.",
          en: "Iterative development with regular demos, code reviews, and quality gates.",
        },
      },
      {
        title: { id: "Deployment & handover", en: "Deployment & handover" },
        description: {
          id: "Deployment production, dokumentasi, dan rekomendasi monitoring.",
          en: "Production deployment, documentation, and monitoring recommendations.",
        },
      },
    ],
    technologies: [".NET Core", "Java", "SQL Server", "MariaDB", "Docker", "Linux"],
    relatedCaseStudyIds: [
      "visitor-management-system",
      "odoo-school-management",
      "odoo-hr-payroll",
    ],
    faq: [
      {
        question: {
          id: "Apakah SAN Solution pernah menangani proyek skala enterprise?",
          en: "Has SAN Solution handled enterprise-scale projects?",
        },
        answer: {
          id: "Ya. Tim kami memiliki pengalaman membangun sistem mission-critical untuk organisasi besar termasuk PLN, Pertamina, dan Telkom.",
          en: "Yes. Our team has experience building mission-critical systems for major organizations including PLN, Pertamina, and Telkom.",
        },
      },
      {
        question: {
          id: "Bagaimana dengan kepatuhan keamanan dan regulasi?",
          en: "What about security and regulatory compliance?",
        },
        answer: {
          id: "Keamanan dan kepatuhan regulasi menjadi pertimbangan desain sejak awal — bukan fitur tambahan di akhir proyek.",
          en: "Security and regulatory compliance are design considerations from the start — not add-on features at the end of a project.",
        },
      },
    ],
    seo: {
      title: {
        id: "Pengembangan Sistem Enterprise | SAN Solution",
        en: "Enterprise System Development | SAN Solution",
      },
      description: {
        id: "SAN Solution membangun ERP custom, Visitor Management, HRIS, dan internal tools mission-critical untuk organisasi besar di Indonesia.",
        en: "SAN Solution builds custom ERP, Visitor Management, HRIS, and mission-critical internal tools for large organizations in Indonesia.",
      },
    },
  },
  {
    id: "saas-development",
    slug: {
      id: "pengembangan-saas",
      en: "saas-development",
    },
    title: {
      id: "Pengembangan SaaS & Produk Digital",
      en: "SaaS & Digital Product Development",
    },
    summary: {
      id: "Pengembangan end-to-end untuk startup — dari MVP hingga scale. Workflow berbasis AI dan teknologi mutakhir untuk iterasi cepat tanpa mengorbankan kualitas.",
      en: "End-to-end development for startups — from MVP to scale. AI-assisted workflows and modern technology for fast iteration without compromising quality.",
    },
    problems: [
      {
        id: "Ide produk digital belum terwujud dalam bentuk yang bisa diuji ke pasar",
        en: "A digital product idea has not yet taken a form that can be tested in the market",
      },
      {
        id: "Produk awal tidak mampu menangani pertumbuhan pengguna",
        en: "Early product cannot handle user growth",
      },
      {
        id: "Tim founder perlu partner development yang memahami bisnis, bukan hanya coding",
        en: "Founder teams need a development partner who understands business, not just coding",
      },
    ],
    scope: [
      {
        id: "MVP dan validasi produk awal",
        en: "MVP and early product validation",
      },
      {
        id: "Platform SaaS multi-tenant atau single-tenant",
        en: "Multi-tenant or single-tenant SaaS platforms",
      },
      {
        id: "Fitur pencarian cepat dan dashboard operasional",
        en: "Fast search features and operational dashboards",
      },
      {
        id: "Skalabilitas dari MVP ke production scale",
        en: "Scalability from MVP to production scale",
      },
    ],
    benefits: [
      {
        id: "Produk bisa diuji ke pasar lebih cepat dengan scope MVP yang jelas",
        en: "Product can be tested in the market faster with a clear MVP scope",
      },
      {
        id: "Fondasi teknis yang dirancang untuk berkembang seiring traction",
        en: "Technical foundation designed to grow with traction",
      },
      {
        id: "Iterasi cepat dengan workflow development modern",
        en: "Fast iteration with modern development workflows",
      },
    ],
    process: [
      {
        title: { id: "Validasi ide", en: "Validate the idea" },
        description: {
          id: "Prioritas fitur, target pengguna, dan batasan MVP didefinisikan bersama.",
          en: "Feature priorities, target users, and MVP boundaries are defined together.",
        },
      },
      {
        title: { id: "Bangun MVP", en: "Build MVP" },
        description: {
          id: "Produk minimum viable dibangun dengan milestone jelas dan demo rutin.",
          en: "Minimum viable product built with clear milestones and regular demos.",
        },
      },
      {
        title: { id: "Uji & iterasi", en: "Test & iterate" },
        description: {
          id: "Feedback pengguna dikumpulkan dan fitur diperbaiki sebelum scale.",
          en: "User feedback is collected and features refined before scaling.",
        },
      },
      {
        title: { id: "Scale & optimasi", en: "Scale & optimize" },
        description: {
          id: "Arsitektur dan infrastruktur disiapkan untuk pertumbuhan pengguna.",
          en: "Architecture and infrastructure prepared for user growth.",
        },
      },
    ],
    technologies: ["Next.js", "React", "Golang", "Typesense", "Python", "PostgreSQL", "Redis"],
    relatedCaseStudyIds: ["jetkios-pos-platform"],
    faq: [
      {
        question: {
          id: "Berapa lama waktu untuk MVP?",
          en: "How long does an MVP take?",
        },
        answer: {
          id: "Durasi bergantung scope fitur dan kompleksitas. Kami mendefinisikan milestone dan estimasi setelah memahami kebutuhan — tanpa janji timeline tetap sebelum analisis.",
          en: "Duration depends on feature scope and complexity. We define milestones and estimates after understanding requirements — without fixed timeline promises before analysis.",
        },
      },
      {
        question: {
          id: "Apakah SAN Solution bisa menjadi co-founder teknis?",
          en: "Can SAN Solution act as a technical co-founder?",
        },
        answer: {
          id: "Kami bekerja sebagai partner pengembangan produk — membantu dari ide hingga produk siap scale, dengan komunikasi bisnis yang jelas.",
          en: "We work as a product development partner — helping from idea to scale-ready product, with clear business communication.",
        },
      },
    ],
    seo: {
      title: {
        id: "Jasa Pengembangan SaaS & Produk Digital | SAN Solution",
        en: "SaaS & Digital Product Development | SAN Solution",
      },
      description: {
        id: "SAN Solution membantu startup membangun MVP, platform SaaS, dan produk digital dari ide hingga scale dengan teknologi modern.",
        en: "SAN Solution helps startups build MVPs, SaaS platforms, and digital products from idea to scale with modern technology.",
      },
    },
  },
  {
    id: "system-integration",
    slug: {
      id: "integrasi-sistem",
      en: "system-integration",
    },
    title: {
      id: "Integrasi Sistem & Modernisasi Legacy",
      en: "System Integration & Legacy Modernization",
    },
    summary: {
      id: "Menghubungkan sistem yang terpisah dan memodernisasi legacy system agar lebih mudah dirawat — dengan System Analysis untuk organisasi besar dan arsitektur SQL Server serta MariaDB.",
      en: "Connecting disconnected systems and modernizing legacy systems for easier maintenance — with System Analysis for large organizations and SQL Server and MariaDB architecture.",
    },
    problems: [
      {
        id: "Data bisnis tersebar di banyak sistem yang tidak saling terhubung",
        en: "Business data is scattered across many unconnected systems",
      },
      {
        id: "Legacy system sulit dirawat, diperluas, atau diintegrasikan",
        en: "Legacy systems are hard to maintain, extend, or integrate",
      },
      {
        id: "Tim operasional harus input data yang sama di beberapa tempat",
        en: "Operations teams must enter the same data in multiple places",
      },
    ],
    scope: [
      {
        id: "Integrasi antar sistem via API, middleware, atau ETL",
        en: "Inter-system integration via API, middleware, or ETL",
      },
      {
        id: "Modernisasi legacy system ke arsitektur yang lebih maintainable",
        en: "Legacy system modernization to more maintainable architecture",
      },
      {
        id: "System analysis dan desain arsitektur data",
        en: "System analysis and data architecture design",
      },
      {
        id: "Migrasi database dan replatforming bertahap",
        en: "Database migration and phased replatforming",
      },
    ],
    benefits: [
      {
        id: "Tim melihat informasi operasional dari satu sumber yang konsisten",
        en: "Teams see operational information from one consistent source",
      },
      {
        id: "Sistem legacy diperbarui tanpa mengganggu operasi harian",
        en: "Legacy systems updated without disrupting daily operations",
      },
      {
        id: "Arsitektur data yang lebih jelas untuk keputusan bisnis",
        en: "Clearer data architecture for business decisions",
      },
    ],
    process: [
      {
        title: { id: "Audit sistem", en: "System audit" },
        description: {
          id: "Pemetaan sistem existing, alur data, dan titik integrasi yang dibutuhkan.",
          en: "Mapping existing systems, data flows, and required integration points.",
        },
      },
      {
        title: { id: "Rancang integrasi", en: "Design integration" },
        description: {
          id: "Arsitektur integrasi, API contract, dan strategi migrasi dirancang.",
          en: "Integration architecture, API contracts, and migration strategy are designed.",
        },
      },
      {
        title: { id: "Implementasi bertahap", en: "Phased implementation" },
        description: {
          id: "Integrasi dibangun per modul dengan pengujian di setiap tahap.",
          en: "Integration built module by module with testing at each stage.",
        },
      },
      {
        title: { id: "Validasi & handover", en: "Validation & handover" },
        description: {
          id: "Verifikasi alur data, dokumentasi, dan rekomendasi monitoring.",
          en: "Data flow verification, documentation, and monitoring recommendations.",
        },
      },
    ],
    technologies: [".NET Core", "Java", "SQL Server", "MariaDB", "Golang", "Docker"],
    relatedCaseStudyIds: [
      "visitor-management-system",
      "government-portals",
    ],
    faq: [
      {
        question: {
          id: "Apakah integrasi bisa dilakukan tanpa mengganti seluruh sistem?",
          en: "Can integration be done without replacing the entire system?",
        },
        answer: {
          id: "Ya. Kami sering bekerja dengan pendekatan bertahap — menghubungkan sistem existing terlebih dahulu, lalu memodernisasi bagian demi bagian sesuai prioritas.",
          en: "Yes. We often work with a phased approach — connecting existing systems first, then modernizing piece by piece according to priorities.",
        },
      },
      {
        question: {
          id: "Bagaimana jika dokumentasi sistem lama tidak lengkap?",
          en: "What if legacy system documentation is incomplete?",
        },
        answer: {
          id: "System analysis menjadi langkah awal — kami memetakan sistem existing sebelum merancang integrasi atau modernisasi.",
          en: "System analysis is the first step — we map existing systems before designing integration or modernization.",
        },
      },
    ],
    seo: {
      title: {
        id: "Jasa Integrasi Sistem & Modernisasi Legacy | SAN Solution",
        en: "System Integration & Legacy Modernization | SAN Solution",
      },
      description: {
        id: "SAN Solution menghubungkan sistem terpisah dan memodernisasi legacy system untuk organisasi enterprise dengan System Analysis mendalam.",
        en: "SAN Solution connects disconnected systems and modernizes legacy systems for enterprise organizations with in-depth System Analysis.",
      },
    },
  },
  {
    id: "devops-infrastructure",
    slug: {
      id: "devops-infrastruktur",
      en: "devops-infrastructure",
    },
    title: {
      id: "DevOps & Infrastruktur",
      en: "DevOps & Infrastructure",
    },
    summary: {
      id: "Manajemen server, containerization Docker, CI/CD pipeline, dan optimasi Linux untuk environment production high-traffic — mendukung deployment multi-lokasi.",
      en: "Server management, Docker containerization, CI/CD pipelines, and Linux optimization for high-traffic production environments — supporting multi-location deployment.",
    },
    problems: [
      {
        id: "Deployment manual rentan error dan lambat",
        en: "Manual deployment is error-prone and slow",
      },
      {
        id: "Infrastruktur tidak siap menangani lonjakan traffic",
        en: "Infrastructure is not ready to handle traffic spikes",
      },
      {
        id: "Tim development dan operasional tidak punya pipeline yang konsisten",
        en: "Development and operations teams lack a consistent pipeline",
      },
    ],
    scope: [
      {
        id: "Setup dan optimasi server Linux production",
        en: "Linux production server setup and optimization",
      },
      {
        id: "Containerization dengan Docker",
        en: "Containerization with Docker",
      },
      {
        id: "CI/CD pipeline untuk deployment otomatis",
        en: "CI/CD pipelines for automated deployment",
      },
      {
        id: "Deployment multi-lokasi dan high-availability setup",
        en: "Multi-location deployment and high-availability setup",
      },
    ],
    benefits: [
      {
        id: "Deployment lebih cepat dan lebih aman dengan pipeline otomatis",
        en: "Faster and safer deployment with automated pipelines",
      },
      {
        id: "Infrastruktur siap untuk traffic production yang tinggi",
        en: "Infrastructure ready for high production traffic",
      },
      {
        id: "Environment yang konsisten antara development dan production",
        en: "Consistent environments between development and production",
      },
    ],
    process: [
      {
        title: { id: "Assess infrastruktur", en: "Assess infrastructure" },
        description: {
          id: "Review setup existing, kebutuhan traffic, dan titik risiko operasional.",
          en: "Review existing setup, traffic requirements, and operational risk points.",
        },
      },
      {
        title: { id: "Rancang pipeline", en: "Design pipeline" },
        description: {
          id: "Arsitektur container, CI/CD, dan strategi deployment dirancang.",
          en: "Container architecture, CI/CD, and deployment strategy are designed.",
        },
      },
      {
        title: { id: "Implementasi", en: "Implementation" },
        description: {
          id: "Docker, pipeline, dan konfigurasi server diimplementasikan dan diuji.",
          en: "Docker, pipelines, and server configuration implemented and tested.",
        },
      },
      {
        title: { id: "Monitoring & handover", en: "Monitoring & handover" },
        description: {
          id: "Rekomendasi monitoring, dokumentasi, dan prosedur operasional.",
          en: "Monitoring recommendations, documentation, and operational procedures.",
        },
      },
    ],
    technologies: ["Docker", "Linux", "CI/CD", "MariaDB", "PostgreSQL"],
    relatedCaseStudyIds: ["visitor-management-system"],
    faq: [
      {
        question: {
          id: "Apakah SAN Solution mengelola server klien secara berkelanjutan?",
          en: "Does SAN Solution manage client servers on an ongoing basis?",
        },
        answer: {
          id: "Kami membantu setup infrastruktur dan pipeline. Pengelolaan berkelanjutan dapat didiskusikan sesuai kebutuhan — tanpa janji lifetime support.",
          en: "We help set up infrastructure and pipelines. Ongoing management can be discussed based on needs — without lifetime support promises.",
        },
      },
      {
        question: {
          id: "Cloud atau on-premise?",
          en: "Cloud or on-premise?",
        },
        answer: {
          id: "Keduanya dimungkinkan. Pilihan bergantung kebutuhan keamanan, regulasi, dan budget klien — kami membantu merancang setup yang sesuai.",
          en: "Both are possible. The choice depends on security requirements, regulations, and client budget — we help design the appropriate setup.",
        },
      },
    ],
    seo: {
      title: {
        id: "Jasa DevOps & Infrastruktur | SAN Solution",
        en: "DevOps & Infrastructure Services | SAN Solution",
      },
      description: {
        id: "SAN Solution menyediakan manajemen server, Docker containerization, CI/CD pipeline, dan optimasi Linux untuk production high-traffic.",
        en: "SAN Solution provides server management, Docker containerization, CI/CD pipelines, and Linux optimization for high-traffic production.",
      },
    },
  },
  {
    id: "odoo-implementation",
    slug: {
      id: "implementasi-odoo",
      en: "odoo-implementation",
    },
    title: {
      id: "Implementasi Odoo",
      en: "Odoo Implementation",
    },
    summary: {
      id: "Implementasi dan kustomisasi Odoo untuk e-commerce, sekolah, klinik, HR & payroll, dan warehouse management — berdasarkan pengalaman proyek nyata di berbagai industri.",
      en: "Odoo implementation and customization for e-commerce, schools, clinics, HR & payroll, and warehouse management — based on real project experience across industries.",
    },
    problems: [
      {
        id: "Operasional bisnis masih di spreadsheet dan sistem terpisah",
        en: "Business operations still run on spreadsheets and separate systems",
      },
      {
        id: "Kebutuhan ERP spesifik industri belum terpenuhi solusi off-the-shelf",
        en: "Industry-specific ERP needs are not met by off-the-shelf solutions",
      },
      {
        id: "Implementasi ERP sebelumnya gagal karena scope tidak jelas",
        en: "Previous ERP implementation failed due to unclear scope",
      },
    ],
    scope: [
      {
        id: "Implementasi modul Odoo (Sales, Inventory, HR, Accounting, dll.)",
        en: "Odoo module implementation (Sales, Inventory, HR, Accounting, etc.)",
      },
      {
        id: "Kustomisasi workflow sesuai proses bisnis klien",
        en: "Workflow customization aligned with client business processes",
      },
      {
        id: "Integrasi payment gateway dan sistem existing",
        en: "Payment gateway and existing system integration",
      },
      {
        id: "Migrasi data dan pelatihan pengguna",
        en: "Data migration and user training",
      },
    ],
    benefits: [
      {
        id: "Operasional bisnis terpusat dalam satu platform Odoo",
        en: "Business operations centralized in one Odoo platform",
      },
      {
        id: "Modul disesuaikan dengan kebutuhan spesifik industri",
        en: "Modules tailored to specific industry needs",
      },
      {
        id: "Pengalaman implementasi nyata di retail, pendidikan, kesehatan, dan distribusi",
        en: "Real implementation experience in retail, education, healthcare, and distribution",
      },
    ],
    process: [
      {
        title: { id: "Analisis proses", en: "Process analysis" },
        description: {
          id: "Workflow bisnis existing dipetakan ke modul Odoo yang relevan.",
          en: "Existing business workflows are mapped to relevant Odoo modules.",
        },
      },
      {
        title: { id: "Konfigurasi & kustomisasi", en: "Configuration & customization" },
        description: {
          id: "Modul Odoo dikonfigurasi dan dikustomisasi sesuai kebutuhan.",
          en: "Odoo modules are configured and customized to requirements.",
        },
      },
      {
        title: { id: "Migrasi & uji", en: "Migration & testing" },
        description: {
          id: "Data dimigrasikan dan sistem diuji dengan skenario operasional nyata.",
          en: "Data is migrated and the system tested with real operational scenarios.",
        },
      },
      {
        title: { id: "Go-live & dukungan", en: "Go-live & support" },
        description: {
          id: "Peluncuran production, pelatihan pengguna, dan rekomendasi pemeliharaan.",
          en: "Production launch, user training, and maintenance recommendations.",
        },
      },
    ],
    technologies: ["Odoo", "Python", "PostgreSQL", "XML"],
    relatedCaseStudyIds: [
      "odoo-online-store",
      "odoo-school-management",
      "odoo-clinic-management",
      "odoo-hr-payroll",
      "odoo-warehouse-management",
    ],
    faq: [
      {
        question: {
          id: "Industri apa saja yang sudah ditangani dengan Odoo?",
          en: "Which industries have been handled with Odoo?",
        },
        answer: {
          id: "Pengalaman kami meliputi retail e-commerce, pendidikan, kesehatan (klinik), HR & payroll korporat, dan warehouse management distribusi.",
          en: "Our experience covers retail e-commerce, education, healthcare (clinics), corporate HR & payroll, and distribution warehouse management.",
        },
      },
      {
        question: {
          id: "Apakah Odoo Community atau Enterprise?",
          en: "Odoo Community or Enterprise?",
        },
        answer: {
          id: "Pilihan edition bergantung kebutuhan modul dan budget. Kami membantu mengevaluasi opsi yang paling sesuai sebelum memulai implementasi.",
          en: "Edition choice depends on module needs and budget. We help evaluate the most suitable option before starting implementation.",
        },
      },
    ],
    seo: {
      title: {
        id: "Jasa Implementasi Odoo | SAN Solution",
        en: "Odoo Implementation Services | SAN Solution",
      },
      description: {
        id: "SAN Solution mengimplementasikan Odoo untuk e-commerce, sekolah, klinik, HR & payroll, dan warehouse management berdasarkan pengalaman proyek nyata.",
        en: "SAN Solution implements Odoo for e-commerce, schools, clinics, HR & payroll, and warehouse management based on real project experience.",
      },
    },
  },
];

export const getServiceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const getServiceBySlug = (
  slug: string,
  locale: "id" | "en" = "id",
): Service | undefined =>
  services.find((service) => service.slug[locale] === slug);

export const getCoreServices = (): Service[] =>
  services.filter((service) =>
    [
      "enterprise-systems",
      "saas-development",
      "mobile-app-development",
      "devops-infrastructure",
    ].includes(service.id),
  );
