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
    title: { en: "Led by Senior Experts", id: "Dipimpin oleh Pakar Senior" },
    subtitle: {
      en: "Two complementary leaders combining deep enterprise experience with modern product innovation.",
      id: "Dua pemimpin yang saling melengkapi, menggabungkan pengalaman enterprise mendalam dengan inovasi produk modern.",
    },
    founders: [
      {
        name: "M. Jeffri",
        title: { en: "Product & Innovation Lead", id: "Pemimpin Produk & Inovasi" },
        description: {
          en: "8+ years of experience in Fullstack Development (Next.js, Golang, Python) & Mobile (Flutter). Built SaaS platforms like Jetkios POS and tourism apps. Pioneered AI-assisted development workflows for faster delivery.",
          id: "8+ tahun pengalaman dalam Fullstack Development (Next.js, Golang, Python) & Mobile (Flutter). Membangun platform SaaS seperti Jetkios POS dan aplikasi pariwisata. Merintis workflow development berbasis AI untuk delivery yang lebih cepat.",
        },
        skills: ["Next.js", "Golang", "Flutter", "Python", "PostgreSQL"],
      },
      {
        name: "Zainal Abidin",
        title: { en: "System Architect & Enterprise Lead", id: "System Architect & Pemimpin Enterprise" },
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
    title: { en: "Why Choose Nexus Logic", id: "Mengapa Memilih Nexus Logic" },
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
