import type { SiteLocale } from "@/config/site";
import { getSolutionById } from "@/data/solutions";

export type WhatsAppMessageOptions = {
  locale: SiteLocale;
  solutionId?: string;
  packageId?: string;
  custom?: boolean;
};

export const buildWhatsAppMessage = ({ locale, solutionId, packageId, custom = false }: WhatsAppMessageOptions): string => {
  const solution = solutionId ? getSolutionById(solutionId) : undefined;
  const selectedPackage = solution?.packages?.find((pkg) => pkg.id === packageId);
  if (custom) {
    return locale === "id"
      ? "Halo SAN Solution,\n\nSaya ingin konsultasi proyek software custom.\n\nPerusahaan:\nJenis proyek:\nTahap saat ini:\nKebutuhan singkat:"
      : "Hello SAN Solution,\n\nI would like to discuss a custom software project.\n\nCompany:\nProject type:\nCurrent stage:\nBrief requirements:";
  }
  const solutionName = solution?.title[locale] ?? "SAN Site";
  const packageName = selectedPackage?.name[locale];
  return locale === "id"
    ? `Halo SAN Solution,\n\nSaya tertarik dengan ${solutionName}${packageName ? ` ${packageName}` : ""}.\n\nNama:\nNama bisnis:\nWebsite saat ini:\nKebutuhan singkat:`
    : `Hello SAN Solution,\n\nI am interested in ${solutionName}${packageName ? ` ${packageName}` : ""}.\n\nName:\nBusiness name:\nCurrent website:\nBrief requirements:`;
};
