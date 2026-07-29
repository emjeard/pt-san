import { randomUUID } from "node:crypto";
import {
  clearAdminSessionCookie,
  createAdminSessionCookie,
  hasValidAdminSession,
  verifyAdminPassword,
} from "./blogAuth.mjs";
import {
  createArticle,
  deleteArticle,
  findPublishedArticleBySlug,
  listAdminArticles,
  listPublishedArticles,
  updateArticle,
} from "./blogDb.mjs";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

const json = (status, payload, headers = {}) => ({
  status,
  headers: { ...JSON_HEADERS, ...headers },
  body: JSON.stringify(payload),
});

const text = (value, field, maxLength, required = true) => {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (required && !normalized) throw new Error(`${field} wajib diisi.`);
  if (normalized.length > maxLength) {
    throw new Error(`${field} maksimal ${maxLength} karakter.`);
  }
  return normalized;
};

const translated = (value, field, maxLength) => ({
  id: text(value?.id, `${field} (ID)`, maxLength),
  en: text(value?.en, `${field} (EN)`, maxLength),
});

const stringArray = (value, field) => {
  if (!Array.isArray(value)) throw new Error(`${field} harus berupa daftar.`);
  return [...new Set(value.map((item) => text(item, field, 100)).filter(Boolean))].slice(0, 30);
};

export const validateArticleInput = (input, existingId) => {
  if (!input || typeof input !== "object") throw new Error("Data artikel tidak valid.");
  const slug = translated(input.slug, "Slug", 160);
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugPattern.test(slug.id) || !slugPattern.test(slug.en)) {
    throw new Error("Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.");
  }

  const publishedAt = text(input.publishedAt, "Tanggal terbit", 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    throw new Error("Tanggal terbit harus berformat YYYY-MM-DD.");
  }

  const readTimeMinutes = Number(input.readTimeMinutes);
  if (!Number.isInteger(readTimeMinutes) || readTimeMinutes < 1 || readTimeMinutes > 180) {
    throw new Error("Waktu baca harus antara 1 dan 180 menit.");
  }

  const status = input.status === "published" ? "published" : input.status === "draft" ? "draft" : null;
  if (!status) throw new Error("Status artikel tidak valid.");

  return {
    id: existingId || text(input.id || randomUUID(), "ID", 100),
    slug,
    title: translated(input.title, "Judul", 240),
    excerpt: translated(input.excerpt, "Ringkasan", 600),
    content: translated(input.content, "Konten", 100_000),
    category: translated(input.category, "Kategori", 120),
    publishedAt,
    readTimeMinutes,
    author: {
      name: text(input.author?.name, "Nama penulis", 160),
      role: translated(input.author?.role, "Peran penulis", 200),
      bio: translated(input.author?.bio, "Bio penulis", 800),
      avatarUrl: text(input.author?.avatarUrl, "URL avatar", 1_000, false) || undefined,
    },
    tags: stringArray(input.tags || [], "Tag"),
    relatedServiceIds: stringArray(input.relatedServiceIds || [], "Layanan terkait"),
    relatedCaseStudyIds: stringArray(input.relatedCaseStudyIds || [], "Studi kasus terkait"),
    featuredImage: text(input.featuredImage, "Gambar utama", 1_000, false) || undefined,
    status,
  };
};

const normalizePath = (rawUrl) => {
  const pathname = new URL(rawUrl || "/", "http://localhost").pathname;
  return pathname
    .replace(/^\/\.netlify\/functions\/blog/, "")
    .replace(/^\/api\/blog/, "") || "/";
};

const isSecureRequest = (request) => {
  const forwarded = request.headers["x-forwarded-proto"];
  return forwarded === "https" || new URL(request.url, "http://localhost").protocol === "https:";
};

const isSameOriginWrite = (request) => {
  const origin = request.headers.origin;
  if (!origin) return true;
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  try {
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false;
  }
};

const parseBody = (body) => {
  if (!body) return {};
  if (typeof body === "object") return body;
  try {
    return JSON.parse(body);
  } catch {
    const error = new Error("Body JSON tidak valid.");
    error.status = 400;
    throw error;
  }
};

const adminConfigured = (env) =>
  typeof env.BLOG_ADMIN_PASSWORD === "string" &&
  env.BLOG_ADMIN_PASSWORD.length >= 12 &&
  typeof env.BLOG_SESSION_SECRET === "string" &&
  env.BLOG_SESSION_SECRET.length >= 32;

export const handleBlogApiRequest = async (request) => {
  const method = (request.method || "GET").toUpperCase();
  const path = normalizePath(request.url);
  const env = request.env || process.env;
  const databaseUrl = env.DATABASE_URL;

  try {
    if (method === "GET" && path === "/articles") {
      const articles = await listPublishedArticles(databaseUrl);
      return json(200, { articles }, { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" });
    }

    const publicMatch = path.match(/^\/articles\/([^/]+)$/);
    if (method === "GET" && publicMatch) {
      const url = new URL(request.url, "http://localhost");
      const locale = url.searchParams.get("locale") === "en" ? "en" : "id";
      const article = await findPublishedArticleBySlug(
        databaseUrl,
        decodeURIComponent(publicMatch[1]),
        locale,
      );
      return article
        ? json(200, { article }, { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" })
        : json(404, { error: "Artikel tidak ditemukan." });
    }

    if (path === "/admin/login" && method === "POST") {
      if (!adminConfigured(env)) {
        return json(503, { error: "Akses admin belum dikonfigurasi di server." });
      }
      const body = parseBody(request.body);
      if (!verifyAdminPassword(body.password, env.BLOG_ADMIN_PASSWORD)) {
        return json(401, { error: "Password tidak valid." });
      }
      return json(200, { ok: true }, {
        "Cache-Control": "no-store",
        "Set-Cookie": createAdminSessionCookie(env.BLOG_SESSION_SECRET, isSecureRequest(request)),
      });
    }

    if (path === "/admin/logout" && method === "POST") {
      return json(200, { ok: true }, {
        "Cache-Control": "no-store",
        "Set-Cookie": clearAdminSessionCookie(isSecureRequest(request)),
      });
    }

    if (path.startsWith("/admin")) {
      if (!adminConfigured(env)) {
        return json(503, { error: "Akses admin belum dikonfigurasi di server." });
      }
      if (!hasValidAdminSession(request.headers.cookie, env.BLOG_SESSION_SECRET)) {
        return json(401, { error: "Sesi admin tidak valid atau sudah berakhir." });
      }
      if (!["GET", "HEAD"].includes(method)) {
        if (request.headers["x-blog-admin"] !== "1" || !isSameOriginWrite(request)) {
          return json(403, { error: "Permintaan admin ditolak." });
        }
      }

      if (path === "/admin/session" && method === "GET") {
        return json(200, { authenticated: true }, { "Cache-Control": "no-store" });
      }
      if (path === "/admin/articles" && method === "GET") {
        return json(200, { articles: await listAdminArticles(databaseUrl) }, { "Cache-Control": "no-store" });
      }
      if (path === "/admin/articles" && method === "POST") {
        const article = validateArticleInput(parseBody(request.body));
        return json(201, { article: await createArticle(databaseUrl, article) }, { "Cache-Control": "no-store" });
      }

      const adminArticleMatch = path.match(/^\/admin\/articles\/([^/]+)$/);
      if (adminArticleMatch && method === "PUT") {
        const id = decodeURIComponent(adminArticleMatch[1]);
        const article = validateArticleInput(parseBody(request.body), id);
        const updated = await updateArticle(databaseUrl, id, article);
        return updated
          ? json(200, { article: updated }, { "Cache-Control": "no-store" })
          : json(404, { error: "Artikel tidak ditemukan." });
      }
      if (adminArticleMatch && method === "DELETE") {
        const deleted = await deleteArticle(databaseUrl, decodeURIComponent(adminArticleMatch[1]));
        return deleted
          ? json(200, { ok: true }, { "Cache-Control": "no-store" })
          : json(404, { error: "Artikel tidak ditemukan." });
      }
    }

    return json(404, { error: "Endpoint tidak ditemukan." });
  } catch (error) {
    if (error?.code === "23505") {
      return json(409, { error: "ID atau slug artikel sudah digunakan." });
    }
    if (error?.code === "42P01") {
      return json(503, { error: "Tabel blog belum dimigrasikan." });
    }
    if (error?.code === "DATABASE_NOT_CONFIGURED") {
      return json(503, { error: "Koneksi database belum dikonfigurasi." });
    }
    if (error instanceof Error && /wajib|maksimal|harus|tidak valid|antara/.test(error.message)) {
      return json(400, { error: error.message });
    }
    console.error("[blog-api]", error);
    return json(error?.status || 500, { error: "Terjadi kesalahan pada layanan blog." });
  }
};
