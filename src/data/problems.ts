import type { TranslatableString } from "./translations";

export type ProblemItem = {
  id: string;
  title: TranslatableString;
  description: TranslatableString;
  icon: "workflow" | "data" | "legacy" | "scale" | "visibility";
};

export const problemsSection = {
  label: { id: "Masalah Bisnis", en: "Business Problems" },
  title: {
    id: "Masalah yang Kami Bantu Selesaikan",
    en: "Business Problems We Help Solve",
  },
  subtitle: {
    id: "Teknologi adalah alat — fokus kami adalah memahami dan menyelesaikan tantangan operasional bisnis Anda.",
    en: "Technology is a tool — our focus is understanding and solving your operational business challenges.",
  },
} as const;

export const businessProblems: ProblemItem[] = [
  {
    id: "manual-processes",
    icon: "workflow",
    title: {
      id: "Proses Manual & Berulang",
      en: "Manual & Repetitive Processes",
    },
    description: {
      id: "Kami membantu mengubah alur kerja berulang menjadi proses digital yang terstruktur — sehingga tim bisa fokus pada pekerjaan yang lebih bernilai.",
      en: "We help turn repetitive workflows into structured digital processes — so teams can focus on higher-value work.",
    },
  },
  {
    id: "disconnected-data",
    icon: "data",
    title: {
      id: "Data Bisnis Terpisah",
      en: "Disconnected Business Data",
    },
    description: {
      id: "Kami membantu menghubungkan informasi sehingga tim dapat memantau operasi dari satu tempat — tanpa input data yang sama di banyak sistem.",
      en: "We help connect information so teams can monitor operations from one place — without entering the same data in multiple systems.",
    },
  },
  {
    id: "legacy-systems",
    icon: "legacy",
    title: {
      id: "Sistem Lama Sulit Dirawat",
      en: "Legacy or Difficult-to-Maintain Systems",
    },
    description: {
      id: "Kami membantu memodernisasi sistem sehingga lebih mudah dirawat, diperluas, dan diintegrasikan — tanpa mengganggu operasi harian.",
      en: "We help modernize systems so they are easier to maintain, extend, and integrate — without disrupting daily operations.",
    },
  },
  {
    id: "scaling-products",
    icon: "scale",
    title: {
      id: "Produk Digital Perlu Skala",
      en: "Digital Products That Need to Scale",
    },
    description: {
      id: "Kami merancang fondasi yang dapat berkembang seiring pengguna dan kebutuhan bisnis — dari MVP hingga platform production.",
      en: "We design foundations that can evolve with users and business requirements — from MVP to production platform.",
    },
  },
  {
    id: "limited-visibility",
    icon: "visibility",
    title: {
      id: "Visibilitas Operasional Terbatas",
      en: "Limited Operational Visibility",
    },
    description: {
      id: "Kami membuat dashboard dan laporan yang membuat informasi penting lebih mudah dipahami — untuk keputusan bisnis yang lebih cepat.",
      en: "We create dashboards and reporting tools that make important information easier to understand — for faster business decisions.",
    },
  },
];

export const getProblemById = (id: string): ProblemItem | undefined =>
  businessProblems.find((item) => item.id === id);
