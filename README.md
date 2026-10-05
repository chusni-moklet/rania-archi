# RaniaArchi 🌟
**Website Petualangan Belajar Matematika Interaktif Anak Kelas 4 SD**

RaniaArchi adalah platform edukasi matematika ramah anak dengan gaya visual **Claymorphism** modern (terinspirasi dari Khan Academy Kids & Duolingo Math), dirancang khusus untuk memotivasi siswa sekolah dasar belajar matematika dengan cara yang seru, interaktif, dan penuh hadiah.

---

## 🚀 Fitur Unggulan

1. **Bank 100 Soal Kurikulum Matematika Kelas 4 SD**:
   - 40 Soal Perkalian & Pembagian (termasuk teknik porogapit & perkalian bersusun).
   - 15 Soal Pecahan & Desimal.
   - 45 Soal Geometri, Satuan Waktu, Pengukuran, dan Soal Cerita Kontekstual.
   - Setiap sesi memilih **10 soal acak** dari total 100 soal dengan kunci jawaban, umpan balik visual, dan penjelasan instan.

2. **Formulir Nama & Sertifikat Prestasi**:
   - Formulir input nama siswa sebelum memulai kuis.
   - Tersimpan otomatis di peramban (`localStorage`) agar tidak perlu mengisi berulang.
   - Piagam emas resmi **"Sertifikat Prestasi • RaniaArchi"** tercetak dengan nama siswa, nilai akhir (0–100), skor jawaban benar, dan bintang kemenangan di akhir kuis.

3. **Modul Hafalan Tabel Perkalian (×2 sampai ×12)**:
   - Kartu angka interaktif dengan animasi ketuk dan pemutar audio ceria.
   - Indikator centang keberhasilan hafalan.

4. **Tutor AI 24 Jam**:
   - Penjelasan bertahap step-by-step untuk materi konsep matematika yang menantang (pecahan, porogapit, luas bangun datar).

5. **Gamifikasi & Hadiah Menarik**:
   - Sistem **Streak Belajar Harian** & kalender mingguan aktif.
   - **Tantangan Harian Spesial (10 Soal Target)** dengan cincin progres melingkar.
   - Peti Hadiah & koleksi lencana jagoan matematika.

6. **Desain Mobile-First & Desktop Bento**:
   - **Mobile View**: Tampilan ringkas, 2x2 Bento Grid modul belajar, bilah navigasi bawah (Beranda, Kuis, Hadiah, Profil) yang ergonomis dan bebas dari teks terpotong.
   - **Desktop View**: Header navigasi lengkap, tata letak seimbang (*flush container alignment*).
   - **Sound Effects & Confetti**: Efek audio synthesizer (tanpa file mp3 eksternal) dan selebrasi konfeti warna-warni.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [TailwindCSS v4](https://tailwindcss.com/) dengan custom Claymorphism design system
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animasi & Efek**: `canvas-confetti`, Web Audio API

---

## 💻 Cara Menjalankan

1. **Instal dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser.

3. **Linter & Build Produksi**:
   ```bash
   npm run lint
   npm run build
   ```
