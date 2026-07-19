import { Link } from "react-router-dom";
import type { SiteLocale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { routeFor, routes } from "@/lib/routes";

const pageCopy = {
  id: {
    seoTitle: "Ketentuan Layanan | SAN Solution",
    seoDescription:
      "Ketentuan penggunaan website SAN Solution — informasi umum tentang konten, tautan, dan batas tanggung jawab.",
    home: "Beranda",
    terms: "Ketentuan Layanan",
    title: "Ketentuan Layanan",
    updated: "Terakhir diperbarui: Juli 2026",
  },
  en: {
    seoTitle: "Terms of Service | SAN Solution",
    seoDescription:
      "SAN Solution website terms of use — general information about content, links, and limitations of liability.",
    home: "Home",
    terms: "Terms of Service",
    title: "Terms of Service",
    updated: "Last updated: July 2026",
  },
} as const;

export type TermsPageProps = {
  locale: SiteLocale;
};

const TermsPage = ({ locale }: TermsPageProps) => {
  const copy = pageCopy[locale];

  return (
    <SiteLayout
      locale={locale}
      idPath={routes.terms.id}
      enPath={routes.terms.en}
    >
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonicalPath={routes.terms[locale]}
        locale={locale}
        alternateIdPath={routes.terms.id}
        alternateEnPath={routes.terms.en}
      />

      <div className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: copy.home, href: routeFor("home", locale) },
              { label: copy.terms },
            ]}
          />

          <SectionHeading title={copy.title} subtitle={copy.updated} className="mb-10" />

          <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
            {locale === "id" ? (
              <>
                <p>
                  Ketentuan ini mengatur penggunaan website {siteConfig.brandName} di{" "}
                  <a href={siteConfig.siteUrl}>{siteConfig.siteUrl}</a>. Dengan mengakses website
                  ini, Anda setuju dengan ketentuan berikut.
                </p>

                <h2>Tujuan Website</h2>
                <p>
                  Website ini menyediakan informasi tentang layanan pengembangan software{" "}
                  {siteConfig.brandName}, studi kasus, dan cara menghubungi kami. Konten bersifat
                  informatif dan bukan penawaran kontrak yang mengikat kecuali disepakati secara
                  tertulis dalam perjanjian proyek terpisah.
                </p>

                <h2>Akurasi Informasi</h2>
                <p>
                  Kami berupaya menjaga informasi di website tetap akurat dan terkini, namun tidak
                  menjamin kelengkapan atau bebas kesalahan. Studi kasus dan contoh proyek
                  mencerminkan pengalaman nyata, tetapi hasil proyek di masa depan bergantung pada
                  kebutuhan spesifik masing-masing klien.
                </p>

                <h2>Konsultasi & Proyek</h2>
                <p>
                  Permintaan melalui formulir kontak, email, atau WhatsApp adalah langkah awal
                  komunikasi — bukan kontrak kerja. Scope, timeline, biaya, dan tanggung jawab
                  didefinisikan dalam proposal atau perjanjian proyek yang disepakati bersama.
                </p>

                <h2>Kekayaan Intelektual</h2>
                <p>
                  Konten website (teks, desain, logo, dan materi lain) dimiliki oleh{" "}
                  {siteConfig.brandName} atau digunakan dengan izin. Anda tidak boleh
                  menyalin, mendistribusikan, atau memodifikasi konten untuk keperluan komersial
                  tanpa persetujuan tertulis, kecuali untuk penggunaan pribadi non-komersial.
                </p>

                <h2>Tautan Eksternal</h2>
                <p>
                  Website dapat berisi tautan ke situs pihak ketiga (proyek klien, profil sosial,
                  dll.). Kami tidak bertanggung jawab atas konten atau kebijakan situs eksternal
                  tersebut.
                </p>

                <h2>Penafian</h2>
                <p>
                  Website disediakan &quot;sebagaimana adanya&quot;. Sejauh diizinkan hukum yang
                  berlaku, {siteConfig.brandName} tidak bertanggung jawab atas kerugian tidak
                  langsung yang timbul dari penggunaan website ini. Ketentuan ini bukan nasihat
                  hukum — untuk pertanyaan hukum spesifik, konsultasikan penasihat hukum Anda.
                </p>

                <h2>Perubahan Ketentuan</h2>
                <p>
                  Kami dapat memperbarui ketentuan ini sewaktu-waktu. Penggunaan website setelah
                  pembaruan dianggap sebagai penerimaan ketentuan yang baru.
                </p>

                <h2>Kontak</h2>
                <p>
                  Pertanyaan tentang ketentuan ini dapat disampaikan melalui{" "}
                  <Link to={routeFor("contact", locale)}>halaman kontak</Link>
                  {siteConfig.contact.email ? (
                    <>
                      {" "}
                      atau{" "}
                      <a href={`mailto:${siteConfig.contact.email}`}>
                        {siteConfig.contact.email}
                      </a>
                    </>
                  ) : null}
                  .
                </p>
              </>
            ) : (
              <>
                <p>
                  These terms govern use of the {siteConfig.brandName} website at{" "}
                  <a href={siteConfig.siteUrl}>{siteConfig.siteUrl}</a>. By accessing this website,
                  you agree to the following terms.
                </p>

                <h2>Purpose of the Website</h2>
                <p>
                  This website provides information about {siteConfig.brandName} software development
                  services, case studies, and how to contact us. Content is informational and is not
                  a binding contract offer unless agreed in a separate written project agreement.
                </p>

                <h2>Accuracy of Information</h2>
                <p>
                  We strive to keep website information accurate and up to date, but do not
                  guarantee completeness or error-free content. Case studies and project examples
                  reflect real experience, but future project outcomes depend on each client&apos;s
                  specific requirements.
                </p>

                <h2>Consultations & Projects</h2>
                <p>
                  Requests via the contact form, email, or WhatsApp are initial communication — not
                  a work contract. Scope, timeline, cost, and responsibilities are defined in a
                  proposal or project agreement agreed together.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                  Website content (text, design, logo, and other materials) is owned by{" "}
                  {siteConfig.brandName} or used with permission. You may not copy, distribute, or
                  modify content for commercial purposes without written consent, except for
                  personal non-commercial use.
                </p>

                <h2>External Links</h2>
                <p>
                  The website may link to third-party sites (client projects, social profiles, etc.).
                  We are not responsible for the content or policies of those external sites.
                </p>

                <h2>Disclaimer</h2>
                <p>
                  The website is provided &quot;as is&quot;. To the extent permitted by applicable
                  law, {siteConfig.brandName} is not liable for indirect losses arising from use of
                  this website. These terms are not legal advice — for specific legal questions,
                  consult your legal advisor.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                  We may update these terms at any time. Continued use of the website after updates
                  constitutes acceptance of the revised terms.
                </p>

                <h2>Contact</h2>
                <p>
                  Questions about these terms can be sent via the{" "}
                  <Link to={routeFor("contact", locale)}>contact page</Link>
                  {siteConfig.contact.email ? (
                    <>
                      {" "}
                      or{" "}
                      <a href={`mailto:${siteConfig.contact.email}`}>
                        {siteConfig.contact.email}
                      </a>
                    </>
                  ) : null}
                  .
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default TermsPage;
