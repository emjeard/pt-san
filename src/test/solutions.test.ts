import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage } from "@/lib/lead";
import { formatIDR, formatStartingPrice, getSolutionBySlug, siteSolution } from "@/data/solutions";

describe("solution catalog", () => {
  it("keeps the commercial catalog and package pricing centralized", () => {
    expect(siteSolution.id).toBe("san-site");
    expect(siteSolution.packages?.map((pkg) => pkg.firstYear)).toEqual([699000, 999000, 1490000]);
    expect(getSolutionBySlug("business-website", "en")?.id).toBe("san-site");
  });

  it("formats Indonesian Rupiah and recurring prices", () => {
    expect(formatIDR(699000)).toBe("Rp699.000");
    expect(formatStartingPrice(199000, "monthly", "id")).toBe("Mulai Rp199.000/bulan");
  });

  it("builds structured WhatsApp messages without analytics data", () => {
    const message = buildWhatsAppMessage({ locale: "id", solutionId: "san-site", packageId: "business" });
    expect(message).toContain("SAN Site Business");
    expect(message).toContain("Nama bisnis:");
    expect(message).not.toContain("email");
  });
});
