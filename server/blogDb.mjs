import { neon } from "@neondatabase/serverless";

const ARTICLE_COLUMNS = `
  id,
  slug_id,
  slug_en,
  title_id,
  title_en,
  excerpt_id,
  excerpt_en,
  content_id,
  content_en,
  category_id,
  category_en,
  TO_CHAR(published_at, 'YYYY-MM-DD') AS published_at,
  read_time_minutes,
  author_name,
  author_role_id,
  author_role_en,
  author_bio_id,
  author_bio_en,
  author_avatar_url,
  tags,
  related_service_ids,
  related_case_study_ids,
  featured_image,
  status,
  created_at,
  updated_at
`;

const getSql = (databaseUrl) => {
  if (!databaseUrl) {
    const error = new Error("DATABASE_URL is not configured");
    error.code = "DATABASE_NOT_CONFIGURED";
    throw error;
  }
  return neon(databaseUrl);
};

const isoDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
};

export const mapArticleRow = (row) => ({
  id: row.id,
  slug: { id: row.slug_id, en: row.slug_en },
  title: { id: row.title_id, en: row.title_en },
  excerpt: { id: row.excerpt_id, en: row.excerpt_en },
  content: { id: row.content_id, en: row.content_en },
  publishedAt: isoDate(row.published_at),
  readTimeMinutes: row.read_time_minutes,
  category: { id: row.category_id, en: row.category_en },
  author: {
    name: row.author_name,
    role: { id: row.author_role_id, en: row.author_role_en },
    bio: { id: row.author_bio_id, en: row.author_bio_en },
    ...(row.author_avatar_url ? { avatarUrl: row.author_avatar_url } : {}),
  },
  tags: row.tags || [],
  relatedServiceIds: row.related_service_ids || [],
  relatedCaseStudyIds: row.related_case_study_ids || [],
  ...(row.featured_image ? { featuredImage: row.featured_image } : {}),
  status: row.status,
  createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at,
  updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
});

export const listPublishedArticles = async (databaseUrl) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    `SELECT ${ARTICLE_COLUMNS}
     FROM blog_articles
     WHERE status = 'published'
       AND published_at <= CURRENT_DATE
     ORDER BY published_at DESC, created_at DESC`,
    [],
  );
  return rows.map(mapArticleRow);
};

export const findPublishedArticleBySlug = async (databaseUrl, slug, locale) => {
  const sql = getSql(databaseUrl);
  const column = locale === "en" ? "slug_en" : "slug_id";
  const rows = await sql.query(
    `SELECT ${ARTICLE_COLUMNS}
     FROM blog_articles
     WHERE ${column} = $1
       AND status = 'published'
       AND published_at <= CURRENT_DATE
     LIMIT 1`,
    [slug],
  );
  return rows[0] ? mapArticleRow(rows[0]) : null;
};

export const listAdminArticles = async (databaseUrl) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    `SELECT ${ARTICLE_COLUMNS}
     FROM blog_articles
     ORDER BY updated_at DESC, created_at DESC`,
    [],
  );
  return rows.map(mapArticleRow);
};

const articleParams = (article) => [
  article.id,
  article.slug.id,
  article.slug.en,
  article.title.id,
  article.title.en,
  article.excerpt.id,
  article.excerpt.en,
  article.content.id,
  article.content.en,
  article.category.id,
  article.category.en,
  article.publishedAt,
  article.readTimeMinutes,
  article.author.name,
  article.author.role.id,
  article.author.role.en,
  article.author.bio.id,
  article.author.bio.en,
  article.author.avatarUrl || null,
  article.tags,
  article.relatedServiceIds,
  article.relatedCaseStudyIds,
  article.featuredImage || null,
  article.status,
];

export const createArticle = async (databaseUrl, article) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    `INSERT INTO blog_articles (
       id, slug_id, slug_en, title_id, title_en, excerpt_id, excerpt_en,
       content_id, content_en, category_id, category_en, published_at,
       read_time_minutes, author_name, author_role_id, author_role_en,
       author_bio_id, author_bio_en, author_avatar_url, tags,
       related_service_ids, related_case_study_ids, featured_image, status
     ) VALUES (
       $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::date,
       $13, $14, $15, $16, $17, $18, $19, $20::text[], $21::text[],
       $22::text[], $23, $24
     )
     RETURNING ${ARTICLE_COLUMNS}`,
    articleParams(article),
  );
  return mapArticleRow(rows[0]);
};

export const updateArticle = async (databaseUrl, id, article) => {
  const sql = getSql(databaseUrl);
  const params = articleParams({ ...article, id });
  const rows = await sql.query(
    `UPDATE blog_articles SET
       slug_id = $2, slug_en = $3, title_id = $4, title_en = $5,
       excerpt_id = $6, excerpt_en = $7, content_id = $8, content_en = $9,
       category_id = $10, category_en = $11, published_at = $12::date,
       read_time_minutes = $13, author_name = $14, author_role_id = $15,
       author_role_en = $16, author_bio_id = $17, author_bio_en = $18,
       author_avatar_url = $19, tags = $20::text[], related_service_ids = $21::text[],
       related_case_study_ids = $22::text[], featured_image = $23, status = $24,
       updated_at = NOW()
     WHERE id = $1
     RETURNING ${ARTICLE_COLUMNS}`,
    params,
  );
  return rows[0] ? mapArticleRow(rows[0]) : null;
};

export const deleteArticle = async (databaseUrl, id) => {
  const sql = getSql(databaseUrl);
  const rows = await sql.query(
    "DELETE FROM blog_articles WHERE id = $1 RETURNING id",
    [id],
  );
  return Boolean(rows[0]);
};
