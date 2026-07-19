import { describe, it, expect } from "vitest";
import { siteConfig } from "@/config/site";
import { routes, servicePath, caseStudyPath } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

describe("site configuration", () => {
  it("uses www canonical domain", () => {
    expect(siteConfig.siteUrl).toBe("https://www.sansolution.tech");
    expect(siteConfig.defaultLocale).toBe("id");
  });

  it("builds absolute URLs on the canonical host", () => {
    expect(absoluteUrl("/")).toBe("https://www.sansolution.tech/");
    expect(absoluteUrl("/layanan")).toBe("https://www.sansolution.tech/layanan");
  });
});

describe("locale routes", () => {
  it("keeps Indonesian and English paths separate", () => {
    expect(routes.home.id).toBe("/");
    expect(routes.home.en).toBe("/en");
    expect(routes.services.id).toBe("/layanan");
    expect(routes.services.en).toBe("/en/services");
    expect(servicePath("aplikasi-mobile", "id")).toBe("/layanan/aplikasi-mobile");
    expect(servicePath("mobile-app-development", "en")).toBe(
      "/en/services/mobile-app-development",
    );
    expect(caseStudyPath("jetkios-pos-platform", "id")).toBe(
      "/studi-kasus/jetkios-pos-platform",
    );
  });
});
