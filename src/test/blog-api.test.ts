import { describe, expect, it } from "vitest";
import {
  createAdminSessionCookie,
  hasValidAdminSession,
  verifyAdminPassword,
} from "../../server/blogAuth.mjs";
import { handleBlogApiRequest, validateArticleInput } from "../../server/blogApi.mjs";

const validArticle = {
  id: "test-article",
  slug: { id: "artikel-uji", en: "test-article" },
  title: { id: "Artikel Uji", en: "Test Article" },
  excerpt: { id: "Ringkasan artikel", en: "Article summary" },
  content: { id: "Konten artikel", en: "Article content" },
  category: { id: "Teknologi", en: "Technology" },
  publishedAt: "2026-07-29",
  readTimeMinutes: 5,
  author: {
    name: "SAN Editor",
    role: { id: "Editor", en: "Editor" },
    bio: { id: "Editor SAN", en: "SAN editor" },
  },
  tags: ["SAN", "Teknologi"],
  relatedServiceIds: [],
  relatedCaseStudyIds: [],
  status: "draft",
};

describe("blog article validation", () => {
  it("normalizes a valid bilingual article", () => {
    const article = validateArticleInput(validArticle);
    expect(article.slug.id).toBe("artikel-uji");
    expect(article.status).toBe("draft");
    expect(article.tags).toEqual(["SAN", "Teknologi"]);
  });

  it("rejects unsafe slugs", () => {
    expect(() =>
      validateArticleInput({
        ...validArticle,
        slug: { id: "Artikel Tidak Valid", en: "valid-slug" },
      }),
    ).toThrow(/Slug/);
  });
});

describe("blog admin session", () => {
  it("verifies password and a signed HttpOnly cookie", () => {
    expect(verifyAdminPassword("strong-password", "strong-password")).toBe(true);
    expect(verifyAdminPassword("wrong", "strong-password")).toBe(false);

    const setCookie = createAdminSessionCookie("test-session-secret", false);
    const cookie = setCookie.split(";")[0];
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("SameSite=Strict");
    expect(hasValidAdminSession(cookie, "test-session-secret")).toBe(true);
    expect(hasValidAdminSession(cookie, "different-secret")).toBe(false);
  });

  it("returns an authenticated session without touching the database", async () => {
    const secret = "test-session-secret-at-least-32-bytes";
    const cookie = createAdminSessionCookie(secret, false).split(";")[0];
    const response = await handleBlogApiRequest({
      method: "GET",
      url: "http://localhost/api/blog/admin/session",
      headers: { cookie, host: "localhost" },
      env: {
        BLOG_ADMIN_PASSWORD: "strong-password",
        BLOG_SESSION_SECRET: secret,
      },
    });
    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ authenticated: true });
  });
});
