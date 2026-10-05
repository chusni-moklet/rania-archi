# 🚀 Panduan Setup Database Online Supabase (RaniaArchi)

Fitur **Best Player (Papan Juara Top 10)** pada RaniaArchi telah didesain secara **Hybrid**:
1. **Mode Online (Supabase Cloud)**: Semua siswa dari perangkat/HP mana pun berbagi papan peringkat yang sama secara terpusat dan *real-time*.
2. **Mode Offline/Lokal (Fallback)**: Jika Supabase belum dikonfigurasi atau offline, aplikasi otomatis menyimpan di `localStorage` per browser sehingga web tidak akan pernah error.

---

## Langkah 1: Buat Proyek Gratis di Supabase

1. Buka [https://supabase.com](https://supabase.com) lalu masuk (Sign in dengan GitHub atau Google).
2. Klik tombol **"New Project"**.
3. Isi data proyek:
   - **Name**: `rania-archi` (atau nama pilihan Anda)
   - **Database Password**: Buat password yang aman (dan simpan)
   - **Region**: Pilih **Singapore** (paling cepat untuk Indonesia)
   - **Pricing Plan**: Pilih **Free Plan** ($0)
4. Klik **"Create new project"** dan tunggu sekitar 1-2 menit hingga database siap.

---

## Langkah 2: Buat Tabel Papan Juara (Jalankan SQL)

1. Di menu sidebar kiri dashboard Supabase, klik **SQL Editor** (ikon `>_`).
2. Klik **"New Query"**.
3. Buka file [`supabase/schema.sql`](file:///Users/macbookpro/Documents/Project/math-edu/supabase/schema.sql) di proyek ini, lalu salin dan tempel isinya ke editor Supabase:

```sql
-- 1. Buat tabel leaderboard
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  time_seconds INTEGER NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER DEFAULT 10 NOT NULL,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Index performa tinggi untuk peringkat
CREATE INDEX IF NOT EXISTS idx_leaderboard_ranking 
ON public.leaderboard (score DESC, time_seconds ASC);

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- 4. Kebijakan RLS (Publik / Siswa boleh membaca)
CREATE POLICY "Semua orang dapat membaca leaderboard" 
ON public.leaderboard FOR SELECT TO anon, authenticated USING (true);

-- 5. Kebijakan RLS (Siswa boleh mengirim skor baru)
CREATE POLICY "Semua orang dapat menambahkan skor leaderboard" 
ON public.leaderboard FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 6. Masukkan 10 pemain awal tolak ukur (benchmark)
INSERT INTO public.leaderboard (name, time_seconds, score, total_questions, badge)
VALUES
  ('Rania Archi', 38, 10, 10, 'Juara Bertahan 👑'),
  ('Budi Pratama', 45, 10, 10, 'Kilat Matematika ⚡'),
  ('Siti Aisyah', 52, 10, 10, 'Bintang Hitung 🌟'),
  ('Ahmad Fauzi', 59, 10, 10, NULL),
  ('Dewi Lestari', 67, 10, 10, NULL),
  ('Reza Rahadian', 74, 10, 10, NULL),
  ('Nadia Putri', 83, 10, 10, NULL),
  ('Kevin Sanjaya', 91, 9, 10, NULL),
  ('Putri Maharani', 98, 9, 10, NULL),
  ('Dimas Anggara', 105, 9, 10, NULL);
```

4. Klik tombol **"Run"** (atau tekan `Ctrl+Enter` / `Cmd+Enter`).
5. Status akan menunjukkan `Success. No rows returned`.

---

## Langkah 3: Ambil Kunci API Supabase

1. Di dashboard Supabase, klik **Project Settings** (ikon gerigi di kiri bawah) -> pilih **API**.
2. Salin 2 nilai berikut:
   - **Project URL** (contoh: `https://xyzcompany.supabase.co`)
   - **Project API Keys** bagian **`anon` `public`** (kunci panjang bertuliskan public)

---

## Langkah 4: Pasang Kunci API

### A. Untuk Menjalankan di Komputer Lokal:
Buat file baru bernama `.env.local` di folder utama proyek:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
```

### B. Untuk Website yang Sudah Di-Deploy (Vercel / Netlify):
1. Buka dashboard proyek di **Vercel** (atau tempat Anda deploy).
2. Masuk ke **Settings** -> **Environment Variables**.
3. Tambahkan 2 variabel:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`, Value: URL Supabase Anda
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Value: Kunci Anon Supabase Anda
4. Klik **Save** dan lakukan **Redeploy**.

---

## Selesai! 🎉
Begitu kedua variabel ini terisi:
- Label di modal Best Player akan otomatis berubah menjadi `🟢 Online (Supabase Cloud)`.
- Semua rekor kuis yang dikerjakan siswa dari HP/laptop manapun akan otomatis tersimpan di database Supabase dan langsung terlihat oleh seluruh teman sekelas!
