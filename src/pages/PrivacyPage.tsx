import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { isAnalyticsEnabled } from "@/lib/analytics";
import { isContactFormConfigured } from "@/lib/contact";
import { routeFor, routes } from "@/lib/routes";

const pageCopy = {
  id: {
    seoTitle: "Kebijakan Privasi | SAN Solution",
    seoDescription:
      "Kebijakan privasi SAN Solution — bagaimana kami menangani data formulir kontak, analitik, dan preferensi bahasa di website sansolution.tech.",
    home: "Beranda",
    privacy: "Kebijakan Privasi",
    title: "Kebijakan Privasi",
    updated: "Terakhir diperbarui: Juli 2026",
  },
  en: {
    seoTitle: "Privacy Policy | SAN Solution",
    seoDescription:
      "SAN Solution privacy policy — how we handle contact form data, analytics, and language preferences on sansolution.tech.",
    home: "Home",
    privacy: "Privacy Policy",
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
  },
} as const;

export type PrivacyPageProps = {
  locale: SiteLocale;
};

const PrivacyPage = ({ locale }: PrivacyPageProps) => {
  const copy = pageCopy[locale];
  const analyticsEnabled = isAnalyticsEnabled();
  const formConfigured = isContactFormConfigured();

  return (
    <SiteLayout
      locale={locale}
      idPath={routes.privacy.id}
      enPath={routes.privacy.en}
    >
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonicalPath={routes.privacy[locale]}
        locale={locale}
        alternateIdPath={routes.privacy.id}
        alternateEnPath={routes.privacy.en}
      />

      <div className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: copy.home, href: routeFor("home", locale) },
              { label: copy.privacy },
            ]}
          />

          <SectionHeading title={copy.title} subtitle={copy.updated} className="mb-10" />

          <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
            {locale === "id" ? (
              <>
                <p>
                  Kebijakan ini menjelaskan bagaimana {siteConfig.brandName} (
                  <a href={siteConfig.siteUrl}>{siteConfig.siteUrl.replace(/^https?:\/\//, "")}</a>
                  ) menangani informasi saat Anda menggunakan website kami.
                </p>

                <h2>Informasi yang Kami Kumpulkan</h2>
                <h3>Formulir kontak</h3>
                <p>
                  {formConfigured
                    ? "Jika Anda mengirim formulir kontak, kami menerima data yang Anda isi — seperti nama, email, nomor WhatsApp (jika diisi), perusahaan, jenis proyek, dan pesan. Data ini dikirim ke layanan formulir pihak ketiga yang kami konfigurasi untuk menerima permintaan kontak."
                    : "Formulir kontak di website ini saat ini tidak aktif. Jika formulir diaktifkan di masa depan, data yang Anda kirim (seperti nama, email, dan pesan) akan diproses untuk merespons permintaan Anda."}
                </p>
                <h3>Analitik</h3>
                <p>
                  {analyticsEnabled
                    ? "Kami menggunakan Google Analytics 4 (GA4) untuk memahami penggunaan website secara agregat — misalnya halaman yang dikunjungi dan peristiwa interaksi umum. GA4 dapat menggunakan cookie atau teknologi serupa sesuai kebijakan Google."
                    : "Saat ini kami tidak menjalankan Google Analytics di website ini. Jika analitik diaktifkan di masa depan, kebijakan ini akan diperbarui."}
                </p>
                <h3>Preferensi bahasa</h3>
                <p>
                  Website menyimpan preferensi bahasa Anda di localStorage browser (
                  <code>san-solution-language</code>) agar pilihan bahasa tetap konsisten saat
                  navigasi. Data ini disimpan di perangkat Anda, bukan di server kami.
                </p>

                <h2>Bagaimana Kami Menggunakan Informasi</h2>
                <ul>
                  <li>Merespons pertanyaan dan permintaan konsultasi yang Anda kirim.</li>
                  <li>Memahami penggunaan website secara umum (jika analitik aktif).</li>
                  <li>Menjaga pengalaman browsing sesuai preferensi bahasa Anda.</li>
                </ul>
                <p>
                  Kami tidak menjual data pribadi Anda. Kami tidak menggunakan data kontak untuk
                  newsletter massal kecuali Anda secara eksplisit meminta hal tersebut.
                </p>

                <h2>Penyimpanan & Retensi</h2>
                <p>
                  Data formulir kontak disimpan sesuai kebijakan penyimpanan layanan formulir yang
                  kami gunakan, dan/atau di email atau sistem internal kami selama diperlukan untuk
                  menindaklanjuti permintaan Anda — biasanya tidak lebih dari 24 bulan setelah
                  komunikasi terakhir, kecuali diperlukan untuk dokumentasi proyek yang sedang
                  berjalan.
                </p>
                <p>
                  Data analitik (jika aktif) disimpan sesuai pengaturan dan kebijakan retensi Google
                  Analytics.
                </p>

                <h2>Cookie</h2>
                <p>
                  Website ini adalah aplikasi single-page (SPA). Selain cookie/teknologi yang
                  mungkin digunakan oleh layanan analitik pihak ketiga, kami menggunakan localStorage
                  untuk preferensi bahasa — bukan cookie pelacakan iklan.
                </p>

                <h2>Tautan Pihak Ketiga</h2>
                <p>
                  Website dapat memuat tautan ke layanan eksternal (misalnya WhatsApp, LinkedIn,
                  GitHub, atau proyek klien). Kebijakan privasi mereka berlaku saat Anda
                  meninggalkan website kami.
                </p>

                <h2>Hak Anda & Pertanyaan</h2>
                <p>
                  Anda dapat meminta akses, koreksi, atau penghapusan data kontak yang Anda kirim
                  dengan menghubungi kami melalui{" "}
                  <Link to={routeFor("contact", locale)}>halaman kontak</Link>
                  {siteConfig.contact.email ? (
                    <>
                      {" "}
                      atau email{" "}
                      <a href={`mailto:${siteConfig.contact.email}`}>
                        {siteConfig.contact.email}
                      </a>
                    </>
                  ) : null}
                  .
                </p>

                <h2>Perubahan Kebijakan</h2>
                <p>
                  Kami dapat memperbarui kebijakan ini jika layanan website berubah. Tanggal
                  pembaruan akan ditampilkan di bagian atas halaman ini.
                </p>
              </>
            ) : (
              <>
                <p>
                  This policy explains how {siteConfig.brandName} (
                  <a href={siteConfig.siteUrl}>{siteConfig.siteUrl.replace(/^https?:\/\//, "")}</a>
                  ) handles information when you use our website.
                </p>

                <h2>Information We Collect</h2>
                <h3>Contact form</h3>
                <p>
                  {formConfigured
                    ? "If you submit the contact form, we receive the data you provide — such as name, email, WhatsApp number (if provided), company, project type, and message. This data is sent to a third-party form service configured to receive contact requests."
                    : "The contact form on this website is currently inactive. If enabled in the future, data you submit (such as name, email, and message) will be processed to respond to your request."}
                </p>
                <h3>Analytics</h3>
                <p>
                  {analyticsEnabled
                    ? "We use Google Analytics 4 (GA4) to understand aggregate website usage — for example pages visited and general interaction events. GA4 may use cookies or similar technologies per Google's policies."
                    : "We are not currently running Google Analytics on this website. If analytics is enabled in the future, this policy will be updated."}
                </p>
                <h3>Language preference</h3>
                <p>
                  The website stores your language preference in browser localStorage (
                  <code>san-solution-language</code>) so your choice persists as you navigate. This
                  data stays on your device, not on our servers.
                </p>

                <h2>How We Use Information</h2>
                <ul>
                  <li>To respond to inquiries and consultation requests you submit.</li>
                  <li>To understand general website usage (if analytics is active).</li>
                  <li>To maintain a browsing experience aligned with your language preference.</li>
                </ul>
                <p>
                  We do not sell your personal data. We do not use contact data for bulk newsletters
                  unless you explicitly request that.
                </p>

                <h2>Storage & Retention</h2>
                <p>
                  Contact form data is retained according to the storage policy of the form service
                  we use, and/or in our email or internal systems as needed to follow up on your
                  request — typically no longer than 24 months after the last communication, unless
                  required for an active project engagement.
                </p>
                <p>
                  Analytics data (if active) is retained per Google Analytics settings and retention
                  policies.
                </p>

                <h2>Cookies</h2>
                <p>
                  This website is a single-page application (SPA). Aside from cookies or technologies
                  that third-party analytics services may use, we use localStorage for language
                  preference — not advertising tracking cookies.
                </p>

                <h2>Third-Party Links</h2>
                <p>
                  The website may link to external services (such as WhatsApp, LinkedIn, GitHub, or
                  client projects). Their privacy policies apply when you leave our site.
                </p>

                <h2>Your Rights & Questions</h2>
                <p>
                  You may request access, correction, or deletion of contact data you submitted by
                  reaching us via the{" "}
                  <Link to={routeFor("contact", locale)}>contact page</Link>
                  {siteConfig.contact.email ? (
                    <>
                      {" "}
                      or email{" "}
                      <a href={`mailto:${siteConfig.contact.email}`}>
                        {siteConfig.contact.email}
                      </a>
                    </>
                  ) : null}
                  .
                </p>

                <h2>Policy Changes</h2>
                <p>
                  We may update this policy if website services change. The update date will appear at
                  the top of this page.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default PrivacyPage;
