#!/usr/bin/env node
/**
 * Generates public/sitemap.xml for www.sansolution.tech
 * Run: npm run sitemap
 */
import { writeFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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
    "/kontak",
    "/kebijakan-privasi",
    "/ketentuan-layanan",
  ],
  en: [
    "/en",
    "/en/about",
    "/en/services",
    "/en/case-studies",
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

const formatDate = (date) => date.toISOString().slice(0, 10);

const getLastmod = () => {
  try {
    const pkgStat = statSync(join(root, "package.json"));
    return formatDate(pkgStat.mtime);
  } catch {
    return formatDate(new Date("2026-07-19"));
  }
};

const buildPaths = () => {
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

  return paths;
};

const toLoc = (path) => {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
};

const lastmod = getLastmod();
const urls = buildPaths()
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
console.log(`Wrote ${outputPath} (${buildPaths().length} URLs, lastmod=${lastmod})`);
