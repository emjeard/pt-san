import type { TranslatableString } from "./translations";

export type FaqItem = {
  id: string;
  question: TranslatableString;
  answer: TranslatableString;
};

export const faqSection = {
  label: { id: "FAQ", en: "FAQ" },
  title: {
    id: "Pertanyaan yang Sering Diajukan",
    en: "Frequently Asked Questions",
  },
  subtitle: {
    id: "Jawaban praktis sebelum Anda memulai konsultasi dengan kami.",
    en: "Practical answers before you start a consultation with us.",
  },
} as const;

export const homepageFaq: FaqItem[] = [
  {
    id: "project-types",
    question: {
      id: "Jenis proyek apa saja yang ditangani SAN Solution?",
      en: "What types of projects does SAN Solution handle?",
    },
    answer: {
      id: "Kami membangun website dan portal, aplikasi mobile, sistem enterprise (ERP, HRIS, Visitor Management), produk SaaS, integrasi sistem, infrastruktur DevOps, dan implementasi Odoo — untuk perusahaan, startup, dan organisasi pemerintahan.",
      en: "We build websites and portals, mobile apps, enterprise systems (ERP, HRIS, Visitor Management), SaaS products, system integration, DevOps infrastructure, and Odoo implementations — for companies, startups, and government organizations.",
    },
  },
  {
    id: "existing-systems",
    question: {
      id: "Bisakah SAN Solution memperbaiki atau mengembangkan sistem yang sudah ada?",
      en: "Can SAN Solution improve or extend an existing system?",
    },
    answer: {
      id: "Ya. Kami sering bekerja dengan sistem existing — menambah fitur, memodernisasi legacy system, atau menghubungkannya dengan aplikasi baru. System analysis menjadi langkah awal sebelum perubahan apapun.",
      en: "Yes. We often work with existing systems — adding features, modernizing legacy systems, or connecting them to new applications. System analysis is the first step before any changes.",
    },
  },
  {
    id: "technical-knowledge",
    question: {
      id: "Apakah klien perlu memiliki pengetahuan teknis?",
      en: "Does the client need technical knowledge?",
    },
    answer: {
      id: "Tidak. Kami menerjemahkan kebutuhan bisnis Anda ke solusi teknis. Anda cukup menjelaskan tujuan, proses, dan kendala — kami yang merancang pendekatan teknisnya.",
      en: "No. We translate your business needs into technical solutions. You explain goals, processes, and constraints — we design the technical approach.",
    },
  },
  {
    id: "consultation-process",
    question: {
      id: "Bagaimana proses konsultasi awal?",
      en: "How does the initial consultation process work?",
    },
    answer: {
      id: "Anda bisa menghubungi kami via form kontak, email, atau WhatsApp. Kami akan memahami kebutuhan, menjelaskan pendekatan yang mungkin, dan mendiskusikan langkah selanjutnya — tanpa kewajiban lanjut jika belum siap.",
      en: "You can reach us via the contact form, email, or WhatsApp. We will understand your needs, explain possible approaches, and discuss next steps — with no obligation to proceed if you are not ready.",
    },
  },
  {
    id: "mvp",
    question: {
      id: "Bisakah SAN Solution membangun MVP?",
      en: "Can SAN Solution build an MVP?",
    },
    answer: {
      id: "Ya. Kami membantu startup mendefinisikan scope MVP, membangun produk minimum viable, dan menyiapkan fondasi untuk scale — dengan milestone dan prioritas yang jelas sebelum development dimulai.",
      en: "Yes. We help startups define MVP scope, build a minimum viable product, and prepare a foundation for scale — with clear milestones and priorities before development begins.",
    },
  },
  {
    id: "maintenance",
    question: {
      id: "Apakah SAN Solution menyediakan pemeliharaan setelah launch?",
      en: "Does SAN Solution provide maintenance after launch?",
    },
    answer: {
      id: "Kami menyediakan handover, dokumentasi, dan rekomendasi monitoring setelah launch. Pengelolaan berkelanjutan dapat didiskusikan sesuai kebutuhan proyek — tanpa janji lifetime support.",
      en: "We provide handover, documentation, and monitoring recommendations after launch. Ongoing management can be discussed based on project needs — without lifetime support promises.",
    },
  },
  {
    id: "integration",
    question: {
      id: "Bisakah SAN Solution mengintegrasikan aplikasi yang sudah ada?",
      en: "Can SAN Solution integrate an existing application?",
    },
    answer: {
      id: "Ya. Integrasi sistem adalah salah satu keahlian kami — menghubungkan aplikasi baru dengan ERP, database, atau API existing melalui pendekatan yang aman dan terstruktur.",
      en: "Yes. System integration is one of our specialties — connecting new applications with existing ERP, databases, or APIs through a safe and structured approach.",
    },
  },
  {
    id: "info-before-start",
    question: {
      id: "Informasi apa yang dibutuhkan sebelum memulai proyek?",
      en: "What information is needed before starting a project?",
    },
    answer: {
      id: "Yang paling membantu: tujuan bisnis, pengguna target, proses existing, sistem yang sudah ada, timeline yang diharapkan, dan batasan budget jika ada. Tidak perlu dokumen lengkap — kami membantu menyusunnya bersama.",
      en: "Most helpful: business goals, target users, existing processes, current systems, expected timeline, and budget constraints if any. Full documentation is not required — we help compile it together.",
    },
  },
  {
    id: "remote-clients",
    question: {
      id: "Apakah SAN Solution menerima klien remote?",
      en: "Does SAN Solution work with remote clients?",
    },
    answer: {
      id: "Ya. Kami berkolaborasi dengan klien di seluruh Indonesia melalui meeting online, demo rutin, dan komunikasi via email atau WhatsApp.",
      en: "Yes. We collaborate with clients across Indonesia through online meetings, regular demos, and communication via email or WhatsApp.",
    },
  },
  {
    id: "scope",
    question: {
      id: "Bagaimana scope proyek ditentukan?",
      en: "How is project scope determined?",
    },
    answer: {
      id: "Scope ditentukan setelah konsultasi awal — kami memetakan kebutuhan, mendefinisikan prioritas, dan menyusun milestone sebelum development. Perubahan scope didiskusikan secara transparan selama proyek berjalan.",
      en: "Scope is determined after initial consultation — we map requirements, define priorities, and outline milestones before development. Scope changes are discussed transparently during the project.",
    },
  },
];

export const getFaqById = (id: string): FaqItem | undefined =>
  homepageFaq.find((item) => item.id === id);
