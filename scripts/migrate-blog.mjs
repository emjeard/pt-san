#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { neon } from "@neondatabase/serverless";
import { blogPosts } from "../src/data/blogPosts.ts";

const loadLocalEnv = () => {
  try {
    const source = readFileSync(resolve(".env"), "utf8");
    for (const line of source.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
    }
  } catch {
    // Deployment environments provide variables directly.
  }
};

const main = async () => {
  if (!process.argv.includes("--apply")) {
    throw new Error("Migration dibatalkan. Jalankan dengan --apply untuk mengubah database.");
  }

  loadLocalEnv();
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL belum dikonfigurasi.");

  const target = new URL(databaseUrl);
  console.log(`Target: ${target.hostname}/${target.pathname.slice(1)}`);
  const sql = neon(databaseUrl);

  await sql.query(
    `CREATE TABLE IF NOT EXISTS blog_articles (
      id TEXT PRIMARY KEY,
      slug_id TEXT NOT NULL UNIQUE,
      slug_en TEXT NOT NULL UNIQUE,
      title_id TEXT NOT NULL,
      title_en TEXT NOT NULL,
      excerpt_id TEXT NOT NULL,
      excerpt_en TEXT NOT NULL,
      content_id TEXT NOT NULL,
      content_en TEXT NOT NULL,
      category_id TEXT NOT NULL,
      category_en TEXT NOT NULL,
      published_at DATE NOT NULL,
      read_time_minutes INTEGER NOT NULL CHECK (read_time_minutes BETWEEN 1 AND 180),
      author_name TEXT NOT NULL,
      author_role_id TEXT NOT NULL,
      author_role_en TEXT NOT NULL,
      author_bio_id TEXT NOT NULL,
      author_bio_en TEXT NOT NULL,
      author_avatar_url TEXT,
      tags TEXT[] NOT NULL DEFAULT '{}',
      related_service_ids TEXT[] NOT NULL DEFAULT '{}',
      related_case_study_ids TEXT[] NOT NULL DEFAULT '{}',
      featured_image TEXT,
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`,
    [],
  );
  await sql.query(
    "CREATE INDEX IF NOT EXISTS blog_articles_publication_idx ON blog_articles (status, published_at DESC)",
    [],
  );

  let inserted = 0;
  for (const post of blogPosts) {
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
        $22::text[], $23, 'published'
      ) ON CONFLICT (id) DO NOTHING
      RETURNING id`,
      [
        post.id,
        post.slug.id,
        post.slug.en,
        post.title.id,
        post.title.en,
        post.excerpt.id,
        post.excerpt.en,
        post.content.id,
        post.content.en,
        post.category.id,
        post.category.en,
        post.publishedAt,
        post.readTimeMinutes,
        post.author.name,
        post.author.role.id,
        post.author.role.en,
        post.author.bio.id,
        post.author.bio.en,
        post.author.avatarUrl || null,
        post.tags,
        post.relatedServiceIds,
        post.relatedCaseStudyIds,
        post.featuredImage || null,
      ],
    );
    inserted += rows.length;
  }

  const verification = await sql.query(
    `SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'published')::int AS published,
      COUNT(*) FILTER (WHERE status = 'draft')::int AS drafts
     FROM blog_articles`,
    [],
  );
  console.log(`Migration complete. Seed inserted: ${inserted}.`);
  console.log(`Articles: ${verification[0].total} total, ${verification[0].published} published, ${verification[0].drafts} draft.`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

