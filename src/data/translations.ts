export type Language = "en" | "id";

export const translations = {
  nav: {
    about: { en: "About", id: "Tentang" },
    services: { en: "Services", id: "Layanan" },
    portfolio: { en: "Portfolio", id: "Portofolio" },
    tech: { en: "Tech", id: "Teknologi" },
    contact: { en: "Contact", id: "Kontak" },
    getInTouch: { en: "Get in Touch", id: "Hubungi Kami" },
  },
  hero: {
    badge: { en: "Trusted by Enterprise & Startups", id: "Dipercaya oleh Enterprise & Startup" },
    headline: {
      en: "Engineering Scalable Digital Solutions for Enterprises & Startups.",
      id: "Rancang Bangun Solusi Digital Terukur untuk Korporasi & Startup.",
    },
    headlineHighlight: { en: "Digital Solutions", id: "Solusi Digital" },
    headlineBefore: {
      en: "Engineering Scalable ",
      id: "Rancang Bangun ",
    },
    headlineAfter: {
      en: " for Enterprises & Startups.",
      id: " Terukur untuk Korporasi & Startup.",
    },
    subheadline: {
      en: "Combining 16+ years of expertise in High-Performance Backend, Enterprise Systems, and Mobile Innovations.",
      id: "Menggabungkan 16+ tahun pengalaman di Backend High-Performance, Sistem Enterprise, dan Inovasi Mobile.",
    },
    ctaServices: { en: "Our Services", id: "Layanan Kami" },
    ctaConsult: { en: "Book a Consultation", id: "Jadwalkan Konsultasi" },
  },
  about: {
    label: { en: "Who We Are", id: "Siapa Kami" },
    title: { en: "Our Team", id: "Tim Kami" },
    subtitle: {
      en: "Two complementary skill sets combining enterprise experience with modern product development.",
      id: "Dua keahlian yang saling melengkapi, menggabungkan pengalaman enterprise dengan pengembangan produk modern.",
    },
    founders: [
      {
        name: "",
        title: { en: "Product & Innovation", id: "Produk & Inovasi" },
        description: {
          en: "8+ years of experience in Fullstack Development (Next.js, Golang, Python) & Mobile (Flutter). Built SaaS platforms and tourism apps. Pioneered AI-assisted development workflows for faster delivery.",
          id: "8+ tahun pengalaman dalam Fullstack Development (Next.js, Golang, Python) & Mobile (Flutter). Membangun platform SaaS dan aplikasi pariwisata. Merintis workflow development berbasis AI untuk delivery yang lebih cepat.",
        },
        skills: ["Next.js", "Golang", "Flutter", "Python", "PostgreSQL"],
      },
      {
        name: "",
        title: { en: "System Architecture & Enterprise", id: "Arsitektur Sistem & Enterprise" },
        description: {
          en: "15+ years building mission-critical enterprise systems with .NET/C# for major organizations including PLN, Pertamina, and Telkom. Specialist in Legacy System Modernization and High-Availability Infrastructure.",
          id: "15+ tahun membangun sistem enterprise mission-critical dengan .NET/C# untuk organisasi besar termasuk PLN, Pertamina, dan Telkom. Spesialis dalam Modernisasi Legacy System dan Infrastruktur High-Availability.",
        },
        skills: [".NET Core", "C#", "SQL Server", "Docker", "Linux"],
      },
    ],
  },
  services: {
    label: { en: "Our Services", id: "Layanan Kami" },
    title: { en: "What We Build", id: "Apa yang Kami Bangun" },
    subtitle: {
      en: "From enterprise systems to mobile apps, we deliver solutions that scale.",
      id: "Dari sistem enterprise hingga aplikasi mobile, kami menghadirkan solusi yang skalabel.",
    },
    items: [
      {
        title: { en: "Enterprise System Integration", id: "Integrasi Sistem Skala Enterprise" },
        description: {
          en: "Custom ERP, Visitor Management, HRIS, and mission-critical internal tools using .NET Core and Java. We specialize in System Analysis for large organizations — designing complex SQL Server and MariaDB architectures that power national-scale operations with strict security, high availability, and regulatory compliance.",
          id: "Custom ERP, Visitor Management, HRIS, dan internal tools mission-critical menggunakan .NET Core dan Java. Kami mengkhususkan diri dalam System Analysis untuk organisasi besar — merancang arsitektur SQL Server dan MariaDB kompleks yang mendukung operasi skala nasional dengan keamanan ketat, high availability, dan kepatuhan regulasi.",
        },
        tags: [".NET Core", "Java", "SQL Server", "System Analysis"],
      },
      {
        title: { en: "SaaS & Product Development", id: "Pengembangan SaaS & Produk" },
        description: {
          en: "End-to-end development for startups — from MVP to scale. We leverage AI-assisted workflows and bleeding-edge tech like Golang and Typesense for lightning-fast search capabilities, paired with Next.js, React, and Python for rapid iteration.",
          id: "Pengembangan end-to-end untuk startup — dari MVP hingga scale. Kami memanfaatkan workflow berbasis AI dan teknologi mutakhir seperti Golang dan Typesense untuk kapabilitas pencarian super cepat, dipadukan dengan Next.js, React, dan Python untuk iterasi cepat.",
        },
        tags: ["Next.js", "React", "Golang", "Typesense", "AI Workflows"],
      },
      {
        title: { en: "Mobile App Ecosystems", id: "Ekosistem Aplikasi Mobile" },
        description: {
          en: "Native Android and cross-platform Flutter apps for retail, tourism, and management. Published on Play Store & App Store.",
          id: "Aplikasi Native Android dan cross-platform Flutter untuk retail, pariwisata, dan manajemen. Tersedia di Play Store & App Store.",
        },
        tags: ["Flutter", "Android", "iOS"],
      },
      {
        title: { en: "DevOps & Infrastructure", id: "DevOps & Infrastruktur" },
        description: {
          en: "Server management, Docker containerization, CI/CD pipelines, and Linux optimization for high-traffic production environments.",
          id: "Manajemen server, containerization Docker, CI/CD pipeline, dan optimasi Linux untuk environment production high-traffic.",
        },
        tags: ["Docker", "Linux", "CI/CD"],
      },
    ],
  },
  portfolio: {
    label: { en: "Portfolio", id: "Portofolio" },
    title: { en: "Featured Projects", id: "Proyek Unggulan" },
    subtitle: {
      en: "Real-world solutions delivered for enterprises, governments, and startups.",
      id: "Solusi nyata yang telah kami deliver untuk enterprise, pemerintah, dan startup.",
    },
    projects: [
      {
        tag: "Enterprise",
        title: { en: "Data Center & Visitor Management System", id: "Sistem Manajemen Data Center & Visitor" },
        client: { en: "PLN (State Electricity Company)", id: "PLN (Perusahaan Listrik Negara)" },
        description: {
          en: "A complex high-security visitor data and asset management system for Indonesia's national electricity company. Multi-location deployment with Docker containerization.",
          id: "Sistem manajemen data visitor dan aset keamanan tinggi yang kompleks untuk perusahaan listrik nasional Indonesia. Deployment multi-lokasi dengan containerization Docker.",
        },
        tech: ["ASP.NET Core", "MariaDB", "Docker", "Linux"],
      },
      {
        tag: "SaaS",
        title: { en: "Jetkios POS Platform", id: "Platform POS Jetkios" },
        client: { en: "Small Merchants", id: "Merchant UMKM" },
        description: {
          en: "A comprehensive Point of Sales web application for small merchants handling product stock management, transaction recording, and sales reporting.",
          id: "Aplikasi web Point of Sales komprehensif untuk merchant kecil yang menangani manajemen stok produk, pencatatan transaksi, dan pelaporan penjualan.",
        },
        tech: ["Nuxt.js", "PostgreSQL", "Redis"],
      },
      {
        tag: "Public Sector",
        title: { en: "Government Portals", id: "Portal Pemerintahan" },
        client: { en: "Surabaya City Gov & Ministry of Public Works", id: "Pemkot Surabaya & Kementerian PUPR" },
        description: {
          en: "Information portals ensuring high accessibility and transparency for government institutions, built with security and compliance standards.",
          id: "Portal informasi yang menjamin aksesibilitas dan transparansi tinggi untuk institusi pemerintah, dibangun dengan standar keamanan dan kepatuhan.",
        },
        tech: ["Laravel", "PHP", "MySQL"],
      },
      {
        tag: "Mobile",
        title: { en: "Smart Tourism & E-Commerce", id: "Smart Tourism & E-Commerce" },
        client: { en: "Persija Jakarta, PSS Sleman & Travel Platforms", id: "Persija Jakarta, PSS Sleman & Platform Travel" },
        description: {
          en: "Android & iOS apps for Travel Marketplaces and Liga 1 Football Clubs, featuring ticketing, e-commerce, and fan engagement features.",
          id: "Aplikasi Android & iOS untuk Marketplace Travel dan Klub Sepakbola Liga 1, dengan fitur ticketing, e-commerce, dan fan engagement.",
        },
        tech: ["Flutter", "Android", "Golang", "Next.js"],
      },
      {
        tag: "Enterprise",
        title: { en: "Odoo Online Store", id: "Toko Online Odoo" },
        client: { en: "Retail Business (2019)", id: "Bisnis Retail (2019)" },
        description: {
          en: "Full-featured Odoo e-commerce store with product catalog, payment gateway integration, inventory sync, and customer portal for seamless online shopping.",
          id: "Toko e-commerce Odoo lengkap dengan katalog produk, integrasi payment gateway, sinkronisasi inventori, dan portal pelanggan untuk pengalaman belanja online yang mulus.",
        },
        tech: ["Odoo", "Python", "PostgreSQL", "XML"],
        url: "https://multitoys.id/about-us",
      },
      {
        tag: "Public Sector",
        title: { en: "Odoo School Management System", id: "Sistem Manajemen Sekolah Odoo" },
        client: { en: "Educational Institution", id: "Institusi Pendidikan" },
        description: {
          en: "Comprehensive school ERP on Odoo covering student enrollment, academic scheduling, grade management, parent communication, and fee collection.",
          id: "ERP sekolah komprehensif berbasis Odoo mencakup penerimaan siswa, penjadwalan akademik, manajemen nilai, komunikasi orang tua, dan pengelolaan biaya.",
        },
        tech: ["Odoo", "Python", "PostgreSQL", "XML"],
      },
      {
        tag: "SaaS",
        title: { en: "Odoo Clinic Management System", id: "Sistem Manajemen Klinik Odoo" },
        client: { en: "Healthcare Provider", id: "Penyedia Layanan Kesehatan" },
        description: {
          en: "Odoo-based clinic system managing patient records, appointment scheduling, doctor queues, medical billing, and pharmacy inventory in a unified platform.",
          id: "Sistem klinik berbasis Odoo yang mengelola rekam medis pasien, penjadwalan janji, antrian dokter, penagihan medis, dan inventori apotek dalam satu platform terpadu.",
        },
        tech: ["Odoo", "Python", "PostgreSQL", "XML"],
      },
      {
        tag: "Enterprise",
        title: { en: "Odoo HR & Payroll System", id: "Sistem HR & Penggajian Odoo" },
        client: { en: "Corporate Client", id: "Klien Korporat" },
        description: {
          en: "End-to-end HR solution on Odoo covering employee onboarding, attendance tracking, leave management, performance appraisals, and automated payroll processing.",
          id: "Solusi HR end-to-end di Odoo mencakup onboarding karyawan, absensi, manajemen cuti, penilaian kinerja, dan pemrosesan penggajian otomatis.",
        },
        tech: ["Odoo", "Python", "PostgreSQL", "XML"],
      },
      {
        tag: "Enterprise",
        title: { en: "Odoo Warehouse Management System", id: "Sistem Manajemen Gudang Odoo" },
        client: { en: "Distribution Company", id: "Perusahaan Distribusi" },
        description: {
          en: "Odoo WMS with multi-warehouse support, barcode scanning, stock valuation, automated reordering, and real-time inventory tracking across locations.",
          id: "WMS Odoo dengan dukungan multi-gudang, pemindaian barcode, penilaian stok, pemesanan ulang otomatis, dan pelacakan inventori real-time di berbagai lokasi.",
        },
        tech: ["Odoo", "Python", "PostgreSQL", "XML"],
      },
    ],
  },
  tech: {
    label: { en: "Technology", id: "Teknologi" },
    title: { en: "Our Tech Stack", id: "Tech Stack Kami" },
    subtitle: {
      en: "Battle-tested technologies powering enterprise-grade solutions.",
      id: "Teknologi teruji yang mendukung solusi kelas enterprise.",
    },
    categories: [
      { label: "Backend", items: ["Golang", "Python", "C# (.NET)", "PHP (Laravel)", "Java", "Node.js"] },
      { label: "Frontend", items: ["Next.js", "React.js", "Nuxt.js", "Tailwind CSS", "TypeScript"] },
      { label: "Mobile", items: ["Flutter", "Android (Kotlin)", "iOS (Dart)"] },
      {
        label: { en: "Database & Infra", id: "Database & Infra" },
        items: ["PostgreSQL", "SQL Server", "MySQL", "Redis", "Elasticsearch", "Docker", "Linux"],
      },
    ],
  },
  whyUs: {
    label: { en: "Why Us", id: "Mengapa Kami" },
    title: { en: "Why Choose Almahira Tech", id: "Mengapa Memilih Almahira Tech" },
    reasons: [
      {
        title: { en: "Proven Reliability", id: "Keandalan Terbukti" },
        description: {
          en: "Experience handling mission-critical systems for national companies like PLN, Pertamina, and Telkom — with 99%+ uptime track records.",
          id: "Pengalaman menangani sistem mission-critical untuk perusahaan nasional seperti PLN, Pertamina, dan Telkom — dengan track record uptime 99%+.",
        },
      },
      {
        title: { en: "Speed & Innovation", id: "Kecepatan & Inovasi" },
        description: {
          en: "Utilizing AI-assisted coding workflows for faster delivery without compromising quality. Modern tooling meets veteran expertise.",
          id: "Memanfaatkan workflow coding berbasis AI untuk delivery lebih cepat tanpa mengorbankan kualitas. Tooling modern bertemu keahlian veteran.",
        },
      },
      {
        title: { en: "Scalable Architecture", id: "Arsitektur Skalabel" },
        description: {
          en: "Systems designed to handle growth from Day 1. Microservices, containerization, and cloud-native approaches built into every project.",
          id: "Sistem yang dirancang untuk menangani pertumbuhan sejak Hari Pertama. Microservices, containerization, dan pendekatan cloud-native terintegrasi di setiap proyek.",
        },
      },
    ],
  },
  timeline: {
    label: { en: "Our Journey", id: "Perjalanan Kami" },
    title: { en: "Project History", id: "Sejarah Proyek" },
    subtitle: {
      en: "A decade-plus track record of delivering enterprise systems, mobile apps, and digital products across Indonesia.",
      id: "Rekam jejak lebih dari satu dekade dalam menghadirkan sistem enterprise, aplikasi mobile, dan produk digital di seluruh Indonesia.",
    },
    milestones: [
      {
        year: "2009 – 2011",
        title: { en: "Government & Infrastructure Systems", id: "Sistem Pemerintahan & Infrastruktur" },
        description: {
          en: "Built the Indonesia Bridge Management System (IBMS) for the Ministry of Public Works using C# & MySQL. Developed asset management systems for the Ministry of Education & Culture, and created web solutions for corporate clients.",
          id: "Membangun Indonesia Bridge Management System (IBMS) untuk Kementerian PUPR menggunakan C# & MySQL. Mengembangkan sistem manajemen aset untuk Kementerian Pendidikan & Kebudayaan, serta solusi web untuk klien korporat.",
        },
        tags: ["C#", "MySQL", "Oracle", "Codeigniter"],
        highlight: false,
      },
      {
        year: "2012 – 2013",
        title: { en: "Public Sector & Mobile Beginnings", id: "Sektor Publik & Awal Mula Mobile" },
        description: {
          en: "Delivered Transjakarta Busway asset management, SSO for Bappenas, and E-Procurement for Ministry of Public Works. Meanwhile, started Android development — building tourism directories (Jogjatik), place finders, and utility apps.",
          id: "Menghadirkan manajemen aset Transjakarta Busway, SSO untuk Bappenas, dan E-Procurement Kementerian PUPR. Di sisi lain, memulai pengembangan Android — membangun direktori pariwisata (Jogjatik), pencari tempat, dan aplikasi utilitas.",
        },
        tags: ["ASP.NET", "SQL Server", "Android", "Java"],
        highlight: false,
      },
      {
        year: "2014 – 2015",
        title: { en: "Pertamina & Enterprise Scale", id: "Pertamina & Skala Enterprise" },
        description: {
          en: "Created the Pertamina Upstream Development Way website and continued building mission-critical systems with .NET & SQL Server for national energy companies. Developed ATM simulation and e-commerce apps for Kidzania.",
          id: "Membuat website Pertamina Upstream Development Way dan melanjutkan pembangunan sistem mission-critical dengan .NET & SQL Server untuk perusahaan energi nasional. Mengembangkan simulasi ATM dan aplikasi e-commerce untuk Kidzania.",
        },
        tags: ["ASP.NET", "SQL Server", "PHP", "Android"],
        highlight: true,
      },
      {
        year: "2016 – 2017",
        title: { en: "Mobile Expansion & E-Commerce", id: "Ekspansi Mobile & E-Commerce" },
        description: {
          en: "Built Android apps for Ebaba e-commerce platform (shop, services, media), ride-hailing app Adajek, and DITKUH Repository for Ministry of Environment & Forestry. Developed HRIS systems using Java Server Faces. Expanded into Android marketplace development.",
          id: "Membangun aplikasi Android untuk platform e-commerce Ebaba (toko, layanan, media), aplikasi ride-hailing Adajek, dan DITKUH Repository untuk Kementerian LHK. Mengembangkan sistem HRIS menggunakan Java Server Faces. Merambah pengembangan marketplace Android.",
        },
        tags: ["Java Android", "Java Server Faces", "MariaDB", "Node.js"],
        highlight: false,
      },
      {
        year: "2018 – 2019",
        title: { en: "Flutter & Liga 1 Football Apps", id: "Flutter & Aplikasi Sepakbola Liga 1" },
        description: {
          en: "Pioneered Flutter development for major Liga 1 football clubs — Persija Jakarta, PSS Sleman, and Babel United FC — with apps published on Play Store & App Store. Built HRIS with Codeigniter, risk analysis system for Pertamina Hulu Energi, and travel marketplace platforms.",
          id: "Merintis pengembangan Flutter untuk klub sepakbola Liga 1 — Persija Jakarta, PSS Sleman, dan Babel United FC — dengan aplikasi di Play Store & App Store. Membangun HRIS dengan Codeigniter, sistem analisis risiko untuk Pertamina Hulu Energi, dan platform marketplace travel.",
        },
        tags: ["Flutter", "ASP.NET Core", "Golang", "Next.js"],
        highlight: true,
      },
      {
        year: "2020 – 2021",
        title: { en: "Telkom Data Warehouse & PLN Systems", id: "Data Warehouse Telkom & Sistem PLN" },
        description: {
          en: "Analyzed data warehouse solutions for Telkom Indonesia as System Analyst. Built the Visitor Management System for PT Indonesia Comnets Plus (PLN subsidiary) with ASP.NET Core, MariaDB & Docker containerization across multi-location deployments.",
          id: "Menganalisis solusi data warehouse untuk Telkom Indonesia sebagai System Analyst. Membangun Visitor Management System untuk PT Indonesia Comnets Plus (anak perusahaan PLN) dengan ASP.NET Core, MariaDB & containerization Docker untuk deployment multi-lokasi.",
        },
        tags: ["ASP.NET Core", "MariaDB", "Docker", "System Analysis"],
        highlight: true,
      },
      {
        year: "2022 – 2023",
        title: { en: "PLN Data Center & Enterprise HRIS", id: "Data Center PLN & HRIS Enterprise" },
        description: {
          en: "Delivered the PLN Data Center & Visitor Management System (DCIM) — a high-security asset management platform for Indonesia's national electricity company. Built enterprise HRIS and microservice prototypes for AXA Financial Indonesia. Developed SaaS products with AI-assisted workflows.",
          id: "Menghadirkan Sistem Manajemen Data Center & Visitor PLN (DCIM) — platform manajemen aset keamanan tinggi untuk perusahaan listrik nasional Indonesia. Membangun HRIS enterprise dan prototipe microservice untuk AXA Financial Indonesia. Mengembangkan produk SaaS dengan workflow berbasis AI.",
        },
        tags: ["ASP.NET Core", "Docker", "Linux", "AI Workflows"],
        highlight: true,
      },
      {
        year: "2023",
        title: { en: "Almahira Tech — Unified Digital Solutions", id: "Almahira Tech — Solusi Digital Terpadu" },
        description: {
          en: "Officially established Almahira Tech, combining 16+ years of enterprise and product expertise. Now building with Golang microservices, Typesense-powered search, and cloud-native architecture at Hedra.id and beyond — serving enterprises, governments, and startups across Indonesia.",
          id: "Resmi mendirikan Almahira Tech, menggabungkan 16+ tahun keahlian enterprise dan produk. Kini membangun dengan microservices Golang, pencarian berbasis Typesense, dan arsitektur cloud-native di Hedra.id dan lainnya — melayani enterprise, pemerintah, dan startup di seluruh Indonesia.",
        },
        tags: ["Golang", "Typesense", "Next.js", "Python", "Docker"],
        highlight: true,
      },
      {
        year: "2024",
        title: { en: "Government Portals & SaaS Products", id: "Portal Pemerintahan & Produk SaaS" },
        description: {
          en: "Built Gapura Surabaya — the official news portal for Surabaya City Government using Laravel. Launched Jetkios POS for small merchants, and a School Management System used by real schools. Continued enterprise InPonsel platform development with Golang & Next.js.",
          id: "Membangun Gapura Surabaya — portal berita resmi Pemkot Surabaya menggunakan Laravel. Meluncurkan Jetkios POS untuk merchant UMKM, dan Sistem Manajemen Sekolah yang digunakan sekolah nyata. Melanjutkan pengembangan platform enterprise InPonsel dengan Golang & Next.js.",
        },
        tags: ["Laravel", "Nuxt.js", "PostgreSQL", "Golang"],
        highlight: false,
      },
    ],
  },
  contact: {
    label: { en: "Contact", id: "Kontak" },
    title: { en: "Let's Build Something Great", id: "Mari Bangun Sesuatu yang Hebat" },
    subtitle: {
      en: "Tell us about your project and we'll get back to you within 24 hours.",
      id: "Ceritakan tentang proyek Anda dan kami akan menghubungi Anda dalam 24 jam.",
    },
    name: { en: "Name", id: "Nama" },
    namePlaceholder: { en: "Your name", id: "Nama Anda" },
    email: { en: "Email", id: "Email" },
    emailPlaceholder: { en: "you@company.com", id: "anda@perusahaan.com" },
    projectType: { en: "Project Type", id: "Jenis Proyek" },
    projectTypePlaceholder: {
      en: "e.g. Enterprise System, Mobile App, SaaS",
      id: "contoh: Sistem Enterprise, Aplikasi Mobile, SaaS",
    },
    message: { en: "Message", id: "Pesan" },
    messagePlaceholder: { en: "Tell us about your project...", id: "Ceritakan tentang proyek Anda..." },
    send: { en: "Send Message", id: "Kirim Pesan" },
    sending: { en: "Sending...", id: "Mengirim..." },
    toastTitle: { en: "Message sent!", id: "Pesan terkirim!" },
    toastDescription: {
      en: "We'll get back to you within 24 hours.",
      id: "Kami akan menghubungi Anda dalam 24 jam.",
    },
  },
  footer: {
    tagline: {
      en: "Engineering scalable digital solutions.",
      id: "Merancang solusi digital yang skalabel.",
    },
    rights: {
      en: "All rights reserved.",
      id: "Hak cipta dilindungi.",
    },
  },
} as const;

// Helper type for translatable strings
export type TranslatableString = { en: string; id: string };

export const t = (value: TranslatableString | string, lang: Language): string => {
  if (typeof value === "string") return value;
  return value[lang];
};
