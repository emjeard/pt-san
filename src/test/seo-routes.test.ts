import { describe, it, expect } from "vitest";
import { siteConfig } from "@/config/site";
import { routes, servicePath, caseStudyPath, blogPostPath, solutionPath, contactPath } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

describe("site configuration", () => {
  it("uses www canonical domain", () => {
    expect(siteConfig.siteUrl).toBe("https://www.sansolution.tech");
    expect(siteConfig.defaultLocale).toBe("id");
  });

  it("builds absolute URLs on the canonical host", () => {
    expect(absoluteUrl("/")).toBe("https://www.sansolution.tech/");
    expect(absoluteUrl("/layanan")).toBe("https://www.sansolution.tech/layanan");
    expect(absoluteUrl("/blog")).toBe("https://www.sansolution.tech/blog");
  });
});

describe("locale routes", () => {
  it("keeps Indonesian and English paths separate", () => {
    expect(routes.home.id).toBe("/");
    expect(routes.home.en).toBe("/en");
    expect(routes.services.id).toBe("/layanan");
    expect(routes.services.en).toBe("/en/services");
    expect(routes.solutions.id).toBe("/solusi");
    expect(routes.pricing.en).toBe("/en/pricing");
    expect(routes.blog.id).toBe("/blog");
    expect(routes.blog.en).toBe("/en/blog");
    expect(servicePath("aplikasi-mobile", "id")).toBe("/layanan/aplikasi-mobile");
    expect(servicePath("mobile-app-development", "en")).toBe(
      "/en/services/mobile-app-development",
    );
    expect(caseStudyPath("jetkios-pos-platform", "id")).toBe(
      "/studi-kasus/jetkios-pos-platform",
    );
    expect(blogPostPath("panduan-implementasi-odoo-erp-indonesia", "id")).toBe(
      "/blog/panduan-implementasi-odoo-erp-indonesia",
    );
    expect(blogPostPath("odoo-erp-implementation-guide-indonesia", "en")).toBe(
      "/en/blog/odoo-erp-implementation-guide-indonesia",
    );
    expect(solutionPath("website-bisnis", "id")).toBe("/solusi/website-bisnis");
    expect(solutionPath("business-website", "en")).toBe("/en/solutions/business-website");
    expect(contactPath("id", { solutionId: "san-site", packageId: "business" })).toBe(
      "/kontak?solution=san-site&package=business",
    );
  });
});
