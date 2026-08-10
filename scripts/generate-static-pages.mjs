#!/usr/bin/env node
/**
 * Adds a small, crawlable HTML shell for public routes after Vite builds the SPA.
 * React still owns the interactive page after hydration; this keeps the Vite
 * architecture while giving crawlers and no-JS requests meaningful metadata and H1 content.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const dist = join(root, "dist");
const siteUrl = "https://www.sansolution.tech";

const solutions = [
  ["website-bisnis", "business-website", "SAN Site", "SAN Site", "Website bisnis profesional mulai Rp699 ribu.", "Professional business websites from Rp699k."],
  ["website-perusahaan", "corporate-website", "SAN Corporate", "SAN Corporate", "Website perusahaan dengan struktur konten dan integrasi yang fleksibel.", "Flexible company websites with tailored content and integrations."],
  ["portal-media", "publishing-platform", "SAN Publisher", "SAN Publisher", "Platform publishing untuk portal berita dan newsroom.", "Publishing platforms for news portals and newsrooms."],
  ["platform-pendidikan", "education-platform", "SAN Education", "SAN Education", "Platform pembelajaran dan pendidikan mulai Rp4,5 juta.", "Learning and education platforms from Rp4.5m."],
  ["ecommerce-marketplace", "ecommerce-marketplace", "SAN Commerce", "SAN Commerce", "Solusi e-commerce dan marketplace mulai Rp4,9 juta.", "E-commerce and marketplace solutions from Rp4.9m."],
  ["marketing-automation", "marketing-automation", "SAN Growth", "SAN Growth", "Marketing automation mulai Rp199 ribu per bulan.", "Marketing automation from Rp199k per month."],
];

const pages = [
  { idPath: "/", enPath: "/en", id: { title: "SAN Solution | Solusi Digital dari Website hingga Software Custom", description: "Solusi digital untuk bisnis, dari website siap pakai hingga software custom.", h1: "Dari website siap pakai hingga software custom." }, en: { title: "SAN Solution | Digital Solutions from Websites to Custom Software", description: "Digital solutions for every stage of business, from ready-to-launch websites to custom enterprise software.", h1: "From ready-to-launch websites to custom software." } },
  { idPath: "/solusi", enPath: "/en/solutions", id: { title: "Solusi Digital untuk Bisnis | SAN Solution", description: "Jelajahi solusi digital SAN dengan scope dan harga mulai yang transparan.", h1: "Solusi Digital Siap Pakai" }, en: { title: "Digital Solutions for Business | SAN Solution", description: "Explore SAN digital solutions with clear scope and starting prices.", h1: "Ready Digital Solutions" } },
  { idPath: "/harga", enPath: "/en/pricing", id: { title: "Harga Solusi Digital dan Software Custom | SAN Solution", description: "Lihat harga mulai solusi SAN Site, platform vertikal, dan software custom.", h1: "Harga dan Paket" }, en: { title: "Digital Solution and Custom Software Pricing | SAN Solution", description: "See starting prices for SAN Site, vertical platforms, and custom software.", h1: "Pricing and packages" } },
  { idPath: "/tentang-kami", enPath: "/en/about", id: { title: "Tentang SAN Solution", description: "Kenali pengalaman profesional dan pendekatan SAN Solution.", h1: "Tentang SAN Solution" }, en: { title: "About SAN Solution", description: "Learn about SAN Solution's professional experience and approach.", h1: "About SAN Solution" } },
  { idPath: "/layanan", enPath: "/en/services", id: { title: "Layanan Pengembangan Software | SAN Solution", description: "Website, aplikasi mobile, SaaS, enterprise systems, integrasi, DevOps, dan Odoo.", h1: "Layanan Custom Software" }, en: { title: "Software Development Services | SAN Solution", description: "Websites, mobile apps, SaaS, enterprise systems, integrations, DevOps, and Odoo.", h1: "Custom Software Services" } },
  { idPath: "/studi-kasus", enPath: "/en/case-studies", id: { title: "Studi Kasus Proyek | SAN Solution", description: "Proyek nyata SAN Solution untuk enterprise, pemerintah, startup, dan bisnis.", h1: "Studi Kasus" }, en: { title: "Project Case Studies | SAN Solution", description: "Real SAN Solution projects for enterprises, governments, startups, and businesses.", h1: "Case Studies" } },
  { idPath: "/blog", enPath: "/en/blog", id: { title: "Blog & Wawasan Teknologi Enterprise | SAN Solution", description: "Wawasan praktis tentang arsitektur, ERP, SaaS, SEO, dan transformasi digital.", h1: "Blog dan Wawasan Teknologi" }, en: { title: "Blog & Technology Insights | SAN Solution", description: "Practical insights on architecture, ERP, SaaS, SEO, and digital transformation.", h1: "Blog and Technology Insights" } },
  { idPath: "/kontak", enPath: "/en/contact", id: { title: "Kontak | SAN Solution", description: "Hubungi SAN Solution untuk solusi siap pakai atau software custom.", h1: "Diskusikan kebutuhan digital Anda" }, en: { title: "Contact | SAN Solution", description: "Contact SAN Solution about ready solutions or custom software.", h1: "Discuss your digital needs" } },
  { idPath: "/kebijakan-privasi", enPath: "/en/privacy", id: { title: "Kebijakan Privasi | SAN Solution", description: "Kebijakan privasi SAN Solution.", h1: "Kebijakan Privasi" }, en: { title: "Privacy Policy | SAN Solution", description: "SAN Solution privacy policy.", h1: "Privacy Policy" } },
  { idPath: "/ketentuan-layanan", enPath: "/en/terms", id: { title: "Ketentuan Layanan | SAN Solution", description: "Ketentuan layanan SAN Solution.", h1: "Ketentuan Layanan" }, en: { title: "Terms of Service | SAN Solution", description: "SAN Solution terms of service.", h1: "Terms of Service" } },
];

for (const [idSlug, enSlug, idTitle, enTitle, idDescription, enDescription] of solutions) {
  pages.push({
    idPath: `/solusi/${idSlug}`,
    enPath: `/en/solutions/${enSlug}`,
    id: { title: `${idTitle} | SAN Solution`, description: idDescription, h1: idTitle },
    en: { title: `${enTitle} | SAN Solution`, description: enDescription, h1: enTitle },
  });
}

const serviceSlugs = [
  ["pengembangan-website", "web-development"],
  ["aplikasi-mobile", "mobile-app-development"],
  ["sistem-enterprise", "enterprise-systems"],
  ["pengembangan-saas", "saas-development"],
  ["integrasi-sistem", "system-integration"],
  ["devops-infrastruktur", "devops-infrastructure"],
  ["implementasi-odoo", "odoo-implementation"],
];
for (const [idSlug, enSlug] of serviceSlugs) {
  pages.push({
    idPath: `/layanan/${idSlug}`,
    enPath: `/en/services/${enSlug}`,
    id: { title: `${idSlug.replaceAll("-", " ")} | SAN Solution`, description: "Layanan custom software SAN Solution.", h1: idSlug.replaceAll("-", " ") },
    en: { title: `${enSlug.replaceAll("-", " ")} | SAN Solution`, description: "SAN Solution custom software service.", h1: enSlug.replaceAll("-", " ") },
  });
}

const caseStudySlugs = [
  ["sistem-manajemen-visitor", "visitor-management-system"],
  ["platform-pos-jetkios", "jetkios-pos-platform"],
  ["portal-pemerintahan", "government-portals"],
  ["smart-tourism-ecommerce", "smart-tourism-ecommerce"],
  ["toko-online-odoo", "odoo-online-store"],
  ["sistem-manajemen-sekolah-odoo", "odoo-school-management"],
  ["sistem-manajemen-klinik-odoo", "odoo-clinic-management"],
  ["sistem-hr-payroll-odoo", "odoo-hr-payroll"],
  ["sistem-manajemen-gudang-odoo", "odoo-warehouse-management"],
];
for (const [idSlug, enSlug] of caseStudySlugs) {
  pages.push({
    idPath: `/studi-kasus/${idSlug}`,
    enPath: `/en/case-studies/${enSlug}`,
    id: { title: `Studi Kasus ${idSlug.replaceAll("-", " ")} | SAN Solution`, description: "Studi kasus proyek SAN Solution.", h1: idSlug.replaceAll("-", " ") },
    en: { title: `Case Study ${enSlug.replaceAll("-", " ")} | SAN Solution`, description: "SAN Solution project case study.", h1: enSlug.replaceAll("-", " ") },
  });
}

const blogSlugs = [
  ["panduan-implementasi-odoo-erp-indonesia", "odoo-erp-implementation-guide-indonesia"],
  ["arsitektur-sistem-enterprise-scalable-aman", "scalable-secure-enterprise-system-architecture"],
  ["strategi-pengembangan-produk-saas-b2b", "b2b-saas-product-development-strategy"],
];
for (const [idSlug, enSlug] of blogSlugs) {
  pages.push({
    idPath: `/blog/${idSlug}`,
    enPath: `/en/blog/${enSlug}`,
    id: { title: `${idSlug.replaceAll("-", " ")} | SAN Solution`, description: "Artikel dan wawasan SAN Solution.", h1: idSlug.replaceAll("-", " ") },
    en: { title: `${enSlug.replaceAll("-", " ")} | SAN Solution`, description: "SAN Solution article and insight.", h1: enSlug.replaceAll("-", " ") },
  });
}

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const replaceFirst = (html, pattern, replacement) => html.replace(pattern, replacement);

const renderPage = (template, page, locale) => {
  const content = page[locale];
  const canonicalPath = locale === "id" ? page.idPath : page.enPath;
  const idUrl = `${siteUrl}${page.idPath === "/" ? "/" : page.idPath}`;
  const enUrl = `${siteUrl}${page.enPath}`;
  const canonicalUrl = `${siteUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;
  const lang = locale === "id" ? "id" : "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.title,
    description: content.description,
    url: canonicalUrl,
    inLanguage: lang,
    isPartOf: { "@type": "WebSite", name: "SAN Solution", url: `${siteUrl}/` },
  };
  let html = template;
  html = replaceFirst(html, /<html lang="[^"]*">/, `<html lang="${lang}">`);
  html = replaceFirst(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(content.title)}</title>`);
  html = replaceFirst(html, /<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(content.description)}" />`);
  html = replaceFirst(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = replaceFirst(html, /<link rel="alternate" hreflang="id"[^>]*>/, `<link rel="alternate" hreflang="id" href="${idUrl}" />`);
  html = replaceFirst(html, /<link rel="alternate" hreflang="en"[^>]*>/, `<link rel="alternate" hreflang="en" href="${enUrl}" />`);
  html = replaceFirst(html, /<link rel="alternate" hreflang="x-default"[^>]*>/, `<link rel="alternate" hreflang="x-default" href="${idUrl}" />`);
  html = replaceFirst(html, /<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${escapeHtml(content.title)}" />`);
  html = replaceFirst(html, /<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${escapeHtml(content.description)}" />`);
  html = replaceFirst(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = replaceFirst(html, /<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="${locale === "id" ? "id_ID" : "en_US"}" />`);
  html = replaceFirst(html, /<meta property="og:locale:alternate"[^>]*>/, `<meta property="og:locale:alternate" content="${locale === "id" ? "en_US" : "id_ID"}" />`);
  html = replaceFirst(html, /<meta\s+name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${escapeHtml(content.title)}" />`);
  html = replaceFirst(html, /<meta\s+name="twitter:description"[\s\S]*?\/>/, `<meta name="twitter:description" content="${escapeHtml(content.description)}" />`);
  html = replaceFirst(html, /<div id="root"><\/div>/, `<div id="root"><main id="static-content"><p>SAN Solution</p><h1>${escapeHtml(content.h1)}</h1><p>${escapeHtml(content.description)}</p><nav aria-label="Public pages"><a href="${locale === "id" ? "/solusi" : "/en/solutions"}">${locale === "id" ? "Solusi" : "Solutions"}</a> <a href="${locale === "id" ? "/harga" : "/en/pricing"}">${locale === "id" ? "Harga" : "Pricing"}</a> <a href="${locale === "id" ? "/kontak" : "/en/contact"}">${locale === "id" ? "Kontak" : "Contact"}</a></nav></main></div>`);
  html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head>`);
  return html;
};

const template = await readFile(join(dist, "index.html"), "utf8");
const generated = new Set();
for (const page of pages) {
  for (const locale of ["id", "en"]) {
    const path = locale === "id" ? page.idPath : page.enPath;
    if (generated.has(path)) continue;
    generated.add(path);
    const relative = path === "/" ? "index.html" : join(path.replace(/^\//, ""), "index.html");
    const output = join(dist, relative);
    await mkdir(join(output, ".."), { recursive: true });
    await writeFile(output, renderPage(template, page, locale), "utf8");
  }
}
console.log(`Wrote static HTML shells for ${generated.size} public locale routes`);
