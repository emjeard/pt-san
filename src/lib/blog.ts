import type { BlogPost } from "@/data/blogPosts";
import type { SiteLocale } from "@/config/site";

export type ArticleStatus = "draft" | "published";

export type AdminBlogArticle = BlogPost & {
  status: ArticleStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogArticleInput = BlogPost & {
  status: ArticleStatus;
};

export class BlogApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BlogApiError";
    this.status = status;
  }
}

const requestBlog = async <T>(
  path: string,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(`/api/blog${path}`, {
    credentials: "same-origin",
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...(init?.method && !["GET", "HEAD"].includes(init.method)
        ? { "X-Blog-Admin": "1" }
        : {}),
      ...init?.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new BlogApiError(payload.error || "Permintaan blog gagal.", response.status);
  }
  return payload as T;
};

export const fetchPublishedArticles = async (): Promise<BlogPost[]> => {
  const payload = await requestBlog<{ articles: BlogPost[] }>("/articles");
  return payload.articles;
};

export const fetchPublishedArticle = async (
  slug: string,
  locale: SiteLocale,
): Promise<BlogPost> => {
  const payload = await requestBlog<{ article: BlogPost }>(
    `/articles/${encodeURIComponent(slug)}?locale=${locale}`,
  );
  return payload.article;
};

export const fetchAdminSession = async (): Promise<boolean> => {
  try {
    const payload = await requestBlog<{ authenticated: boolean }>("/admin/session");
    return payload.authenticated;
  } catch (error) {
    if (error instanceof BlogApiError && error.status === 401) return false;
    throw error;
  }
};

export const loginBlogAdmin = async (password: string): Promise<void> => {
  await requestBlog("/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
};

export const logoutBlogAdmin = async (): Promise<void> => {
  await requestBlog("/admin/logout", { method: "POST" });
};

export const fetchAdminArticles = async (): Promise<AdminBlogArticle[]> => {
  const payload = await requestBlog<{ articles: AdminBlogArticle[] }>("/admin/articles");
  return payload.articles;
};

export const createBlogArticle = async (
  article: BlogArticleInput,
): Promise<AdminBlogArticle> => {
  const payload = await requestBlog<{ article: AdminBlogArticle }>("/admin/articles", {
    method: "POST",
    body: JSON.stringify(article),
  });
  return payload.article;
};

export const updateBlogArticle = async (
  id: string,
  article: BlogArticleInput,
): Promise<AdminBlogArticle> => {
  const payload = await requestBlog<{ article: AdminBlogArticle }>(
    `/admin/articles/${encodeURIComponent(id)}`,
    { method: "PUT", body: JSON.stringify(article) },
  );
  return payload.article;
};

export const deleteBlogArticle = async (id: string): Promise<void> => {
  await requestBlog(`/admin/articles/${encodeURIComponent(id)}`, { method: "DELETE" });
};

export const uploadImageKit = async (fileBase64: string, fileName: string): Promise<string> => {
  const payload = await requestBlog<{ url: string }>("/admin/upload", {
    method: "POST",
    body: JSON.stringify({ file: fileBase64, fileName }),
  });
  return payload.url;
};

