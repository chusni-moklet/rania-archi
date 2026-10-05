-- ==============================================================================
-- SKEMA TABEL PAPAN JUARA BEST PLAYER (TOP 10) - RANIAARCHI
-- Jalankan skrip SQL ini di Dashboard Supabase: Menu "SQL Editor" -> "New Query"
-- ==============================================================================

-- 1. Buat tabel leaderboard jika belum ada
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  time_seconds INTEGER NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER DEFAULT 10 NOT NULL,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Buat index performa tinggi untuk mengurutkan nilai tertinggi & waktu tercepat
CREATE INDEX IF NOT EXISTS idx_leaderboard_ranking 
ON public.leaderboard (score DESC, time_seconds ASC);

-- 3. Aktifkan Row Level Security (RLS) demi keamanan
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- 4. Kebijakan RLS: Siapapun (anon) boleh membaca data papan juara
DROP POLICY IF EXISTS "Semua orang dapat membaca leaderboard" ON public.leaderboard;
CREATE POLICY "Semua orang dapat membaca leaderboard" 
ON public.leaderboard 
FOR SELECT 
TO anon, authenticated
USING (true);

-- 5. Kebijakan RLS: Siapapun (anon) boleh mengirimkan hasil kuis baru
DROP POLICY IF EXISTS "Semua orang dapat menambahkan skor leaderboard" ON public.leaderboard;
CREATE POLICY "Semua orang dapat menambahkan skor leaderboard" 
ON public.leaderboard 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- 6. Masukkan data tolak ukur awal (benchmark 10 pemain pertama)
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
