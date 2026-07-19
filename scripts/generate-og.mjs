/**
 * One-time / CI helper: generate a simple 1200x630 OG image from the logo.
 * Run: node scripts/generate-og.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const out = path.join(root, "public", "og-san-solution.jpg");
const logoPath = path.join(root, "public", "logo.png");

const width = 1200;
const height = 630;
const bg = { r: 247, g: 249, b: 248 };

const svgText = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#F7F9F8"/>
  <rect x="0" y="0" width="12" height="100%" fill="#176B5B"/>
  <text x="80" y="280" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#17201D">SAN Solution</text>
  <text x="80" y="350" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#61706A">Software, Website, Aplikasi, dan Sistem Bisnis</text>
  <text x="80" y="520" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#176B5B">www.sansolution.tech</text>
</svg>
`;

await mkdir(path.dirname(out), { recursive: true });

const base = await sharp(Buffer.from(svgText)).jpeg({ quality: 88 }).toBuffer();

try {
  const logo = await sharp(logoPath)
    .resize(160, 160, { fit: "inside" })
    .png()
    .toBuffer();

  await sharp(base)
    .composite([{ input: logo, top: 80, left: 80 }])
    .jpeg({ quality: 88 })
    .toFile(out);
} catch {
  await sharp(base).toFile(out);
}

console.log("Wrote", out);
