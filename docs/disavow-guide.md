# Panduan Pengunggahan Google Search Console Disavow Tool

Panduan ini digunakan untuk mengunggah file pemblokiran backlink spam (*Disavow Links*) ke Google Search Console untuk situs **https://www.sansolution.tech/**.

---

## 📌 Langkah-Langkah Pengunggahan

1. **Masuk ke Google Search Console Disavow Tool**:
   * Buka browser dan akses URL resmi Google Disavow Tool:
     👉 [https://search.google.com/search-console/disavow-links](https://search.google.com/search-console/disavow-links)

2. **Pilih Properti Website**:
   * Pilih properti domain `https://www.sansolution.tech/` (atau properti domain `sansolution.tech`).

3. **Unggah File Disavow**:
   * Klik tombol **Upload Disavow List** / **Unggah Daftar Penolakan**.
   * Pilih file `docs/seo-disavow-spam-domains.txt` yang telah disediakan di repositori project ini.

4. **Konfirmasi & Verifikasi**:
   * Setelah berhasil diunggah, Google akan menampilkan jumlah domain/URL yang berhasil diproses.
   * Disavow list akan mulai diproses Googlebot dalam kurun waktu beberapa hari hingga minggu ke depan saat crawler memperbarui indeks.

---

## ⚠️ Catatan Penting
* **Pembaruan Berkala**: Jika tim SEO menemukan backlink spam baru melalui tools seperti Google Search Console (Search Traffic > Links), Ahrefs, atau Semrush, tambahkan baris `domain:nama-domain-spam.com` ke file `seo-disavow-spam-domains.txt` dan unggah ulang file tersebut (file baru akan menggantikan daftar lama).
