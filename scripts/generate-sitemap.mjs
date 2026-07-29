#!/usr/bin/env node
/**
 * Generates public/sitemap.xml for www.sansolution.tech
 * Run: npm run sitemap
 */
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { neon } from "@neondatabase/serverless";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outputPath = join(root, "public", "sitemap.xml");

const SITE_URL = "https://www.sansolution.tech";

const staticRoutes = {
  id: [
    "/",
    "/tentang-kami",
    "/layanan",
    "/studi-kasus",
    "/blog",
    "/kontak",
    "/kebijakan-privasi",
    "/ketentuan-layanan",
  ],
  en: [
    "/en",
    "/en/about",
    "/en/services",
    "/en/case-studies",
    "/en/blog",
    "/en/contact",
    "/en/privacy",
    "/en/terms",
  ],
};

const serviceSlugs = {
  id: [
    "pengembangan-website",
    "aplikasi-mobile",
    "sistem-enterprise",
    "pengembangan-saas",
    "integrasi-sistem",
    "devops-infrastruktur",
    "implementasi-odoo",
  ],
  en: [
    "web-development",
    "mobile-app-development",
    "enterprise-systems",
    "saas-development",
    "system-integration",
    "devops-infrastructure",
    "odoo-implementation",
  ],
};

const caseStudySlugs = {
  id: [
    "sistem-manajemen-visitor",
    "platform-pos-jetkios",
    "portal-pemerintahan",
    "smart-tourism-ecommerce",
    "toko-online-odoo",
    "sistem-manajemen-sekolah-odoo",
    "sistem-manajemen-klinik-odoo",
    "sistem-hr-payroll-odoo",
    "sistem-manajemen-gudang-odoo",
  ],
  en: [
    "visitor-management-system",
    "jetkios-pos-platform",
    "government-portals",
    "smart-tourism-ecommerce",
    "odoo-online-store",
    "odoo-school-management",
    "odoo-clinic-management",
    "odoo-hr-payroll",
    "odoo-warehouse-management",
  ],
};

const fallbackBlogSlugs = {
  id: [
    "panduan-implementasi-odoo-erp-indonesia",
    "arsitektur-sistem-enterprise-scalable-aman",
    "strategi-pengembangan-produk-saas-b2b",
  ],
  en: [
    "odoo-erp-implementation-guide-indonesia",
    "scalable-secure-enterprise-system-architecture",
    "b2b-saas-product-development-strategy",
  ],
};

const loadLocalDatabaseUrl = () => {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const line = readFileSync(join(root, ".env"), "utf8")
      .split(/\r?\n/)
      .find((value) => /^\s*DATABASE_URL\s*=/.test(value));
    return line?.split("=").slice(1).join("=").trim();
  } catch {
    return undefined;
  }
};

const getBlogSlugs = async () => {
  const databaseUrl = loadLocalDatabaseUrl();
  if (!databaseUrl) return fallbackBlogSlugs;
  try {
    const sql = neon(databaseUrl);
    const rows = await sql.query(
      `SELECT slug_id, slug_en
       FROM blog_articles
       WHERE status = 'published' AND published_at <= CURRENT_DATE
       ORDER BY published_at DESC`,
      [],
    );
    if (!rows.length) return fallbackBlogSlugs;
    return {
      id: rows.map((row) => row.slug_id),
      en: rows.map((row) => row.slug_en),
    };
  } catch (error) {
    console.warn(`Blog sitemap fallback: ${error instanceof Error ? error.message : error}`);
    return fallbackBlogSlugs;
  }
};

const formatDate = (date) => date.toISOString().slice(0, 10);

const getLastmod = () => {
  try {
    const pkgStat = statSync(join(root, "package.json"));
    return formatDate(pkgStat.mtime);
  } catch {
    return formatDate(new Date("2026-07-19"));
  }
};

const buildPaths = (blogSlugs) => {
  const paths = [...staticRoutes.id, ...staticRoutes.en];

  for (const slug of serviceSlugs.id) {
    paths.push(`/layanan/${slug}`);
  }
  for (const slug of serviceSlugs.en) {
    paths.push(`/en/services/${slug}`);
  }
  for (const slug of caseStudySlugs.id) {
    paths.push(`/studi-kasus/${slug}`);
  }
  for (const slug of caseStudySlugs.en) {
    paths.push(`/en/case-studies/${slug}`);
  }
  for (const slug of blogSlugs.id) {
    paths.push(`/blog/${slug}`);
  }
  for (const slug of blogSlugs.en) {
    paths.push(`/en/blog/${slug}`);
  }

  return paths;
};

const toLoc = (path) => {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
};

const blogSlugs = await getBlogSlugs();
const paths = buildPaths(blogSlugs);
const lastmod = getLastmod();
const urls = paths
  .map(
    (path) => `  <url>
    <loc>${toLoc(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === "/" || path === "/en" ? "1.0" : path.split("/").length <= 2 ? "0.8" : "0.7"}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(outputPath, xml, "utf8");
console.log(`Wrote ${outputPath} (${paths.length} URLs, lastmod=${lastmod})`);
