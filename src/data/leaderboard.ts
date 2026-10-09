import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface LeaderboardEntry {
  id: string;
  name: string;
  timeSeconds: number;
  score: number;
  wrongCount?: number;
  totalQuestions: number;
  date: string;
  badge?: string;
}

export const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: "lead-1",
    name: "Rania Archi",
    timeSeconds: 38,
    score: 10,
    wrongCount: 0,
    totalQuestions: 10,
    date: "Hari ini",
    badge: "Juara Bertahan 👑",
  },
  {
    id: "lead-2",
    name: "Budi Pratama",
    timeSeconds: 45,
    score: 10,
    wrongCount: 0,
    totalQuestions: 10,
    date: "Kemarin",
    badge: "Kilat Matematika ⚡",
  },
  {
    id: "lead-3",
    name: "Siti Aisyah",
    timeSeconds: 52,
    score: 10,
    wrongCount: 0,
    totalQuestions: 10,
    date: "2 hari lalu",
    badge: "Bintang Hitung 🌟",
  },
  {
    id: "lead-4",
    name: "Ahmad Fauzi",
    timeSeconds: 59,
    score: 10,
    wrongCount: 1,
    totalQuestions: 10,
    date: "3 hari lalu",
  },
  {
    id: "lead-5",
    name: "Dewi Lestari",
    timeSeconds: 67,
    score: 10,
    wrongCount: 1,
    totalQuestions: 10,
    date: "4 hari lalu",
  },
  {
    id: "lead-6",
    name: "Reza Rahadian",
    timeSeconds: 74,
    score: 10,
    wrongCount: 2,
    totalQuestions: 10,
    date: "5 hari lalu",
  },
  {
    id: "lead-7",
    name: "Nadia Putri",
    timeSeconds: 83,
    score: 10,
    wrongCount: 2,
    totalQuestions: 10,
    date: "Minggu ini",
  },
  {
    id: "lead-8",
    name: "Kevin Sanjaya",
    timeSeconds: 91,
    score: 9,
    wrongCount: 1,
    totalQuestions: 10,
    date: "Minggu ini",
  },
  {
    id: "lead-9",
    name: "Putri Maharani",
    timeSeconds: 98,
    score: 9,
    wrongCount: 2,
    totalQuestions: 10,
    date: "Minggu ini",
  },
  {
    id: "lead-10",
    name: "Dimas Anggara",
    timeSeconds: 105,
    score: 9,
    wrongCount: 3,
    totalQuestions: 10,
    date: "Minggu ini",
  },
];

const LEADERBOARD_KEY = "raniaarchi_leaderboard_top10";

/** Format detik ke string mm:ss (contoh: 38 -> "00:38", 85 -> "01:25") */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/** Mengonversi tanggal ISO ke label bahasa Indonesia */
function formatEntryDate(dateString?: string): string {
  if (!dateString) return "Baru saja";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24 && d.getDate() === now.getDate()) {
      return "Hari ini";
    }
    if (diffHours < 48) {
      return "Kemarin";
    }
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  } catch {
    return "Baru saja";
  }
}

/** Mengecek apakah mode online Supabase sedang aktif */
export function isOnlineMode(): boolean {
  return isSupabaseConfigured();
}

const LEADERBOARD_CLEARED_KEY = "raniaarchi_leaderboard_cleared";

/**
 * Mengambil data dari localStorage secara instan.
 * Memastikan persaingan dengan pemain lain selalu terlihat,
 * kecuali jika admin secara spesifik telah mengosongkan papan juara.
 */
export function getLocalLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") {
    return DEFAULT_LEADERBOARD;
  }
  try {
    const isCleared = localStorage.getItem(LEADERBOARD_CLEARED_KEY) === "true";
    const raw = localStorage.getItem(LEADERBOARD_KEY);

    if (raw === null) {
      if (isCleared) return [];
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
      return DEFAULT_LEADERBOARD;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      if (parsed.length === 0 && !isCleared) {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
        return DEFAULT_LEADERBOARD;
      }
      return parsed.slice(0, 10);
    }
    return isCleared ? [] : DEFAULT_LEADERBOARD;
  } catch {
    return DEFAULT_LEADERBOARD;
  }
}

/**
 * Helper untuk mengurutkan Leaderboard:
 * 1. Skor Tertinggi (Benar terbanyak)
 * 2. Kesalahan Terkecil (Pemain dengan salah lebih sedikit menang)
 * 3. Waktu Tercepat (Detik terkecil)
 */
export function sortLeaderboardEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aWrong = a.wrongCount ?? 0;
    const bWrong = b.wrongCount ?? 0;
    if (aWrong !== bWrong) return aWrong - bWrong;
    return a.timeSeconds - b.timeSeconds;
  });
}

/**
 * Ekstraksi badge dan wrongCount secara aman.
 * Jika database Supabase belum memiliki kolom `wrong_count`,
 * wrongCount disimpan dan diekstrak melalui penanda `[w:X]` di kolom `badge`.
 */
export function parseBadgeAndWrongCount(
  rawBadge: string | null | undefined,
  rawWrongCount: number | null | undefined
): { badge?: string; wrongCount: number } {
  // 1. Jika kolom wrong_count tersedia dari database
  if (rawWrongCount != null && !isNaN(Number(rawWrongCount))) {
    const cleanBadge = rawBadge?.replace(/\[w:\d+\]/g, "").trim() || undefined;
    return { badge: cleanBadge, wrongCount: Number(rawWrongCount) };
  }

  // 2. Jika wrong_count tersimpan dalam badge format [w:X]
  if (rawBadge && typeof rawBadge === "string") {
    const match = rawBadge.match(/\[w:(\d+)\]/);
    if (match) {
      const parsedWrong = parseInt(match[1], 10);
      const cleanBadge = rawBadge.replace(/\[w:\d+\]/g, "").trim() || undefined;
      return { badge: cleanBadge, wrongCount: isNaN(parsedWrong) ? 0 : parsedWrong };
    }
  }

  return { badge: rawBadge || undefined, wrongCount: 0 };
}

interface DbLeaderboardRow {
  id: string | number;
  name: string;
  time_seconds: number;
  score: number;
  wrong_count?: number | null;
  total_questions?: number;
  created_at?: string;
  badge?: string | null;
}

/**
 * Mengambil data Top 10 Best Player dari Cloud Database Supabase secara online.
 * Menghubungkan langsung ke cloud server sehingga persaingan skor dengan user lain terlihat nyata.
 */
export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      let rawRows: DbLeaderboardRow[] | null = null;

      const firstQuery = await supabase
        .from("leaderboard")
        .select("id, name, time_seconds, score, wrong_count, total_questions, created_at, badge")
        .order("score", { ascending: false })
        .order("wrong_count", { ascending: true })
        .order("time_seconds", { ascending: true })
        .limit(50);

      if (!firstQuery.error && Array.isArray(firstQuery.data)) {
        rawRows = firstQuery.data as unknown as DbLeaderboardRow[];
      } else {
        // Fallback query jika skema cloud belum ditambahkan wrong_count
        const fallbackRes = await supabase
          .from("leaderboard")
          .select("id, name, time_seconds, score, total_questions, created_at, badge")
          .order("score", { ascending: false })
          .order("time_seconds", { ascending: true })
          .limit(50);

        if (!fallbackRes.error && Array.isArray(fallbackRes.data)) {
          rawRows = fallbackRes.data as unknown as DbLeaderboardRow[];
        }
      }

      if (rawRows && Array.isArray(rawRows)) {
        const isCleared =
          typeof window !== "undefined" &&
          localStorage.getItem(LEADERBOARD_CLEARED_KEY) === "true";

        if (rawRows.length === 0 && !isCleared) {
          // Jika di Cloud masih kosong dan belum sengaja dihapus admin, inisialisasi benchmark
          await resetToBenchmark();
          return DEFAULT_LEADERBOARD;
        }

        const mapped: LeaderboardEntry[] = rawRows.map((row) => {
          const { badge: cleanBadge, wrongCount } = parseBadgeAndWrongCount(
            row.badge,
            row.wrong_count
          );
          return {
            id: String(row.id),
            name: row.name,
            timeSeconds: Number(row.time_seconds),
            score: Number(row.score),
            wrongCount,
            totalQuestions: Number(row.total_questions || 10),
            date: formatEntryDate(row.created_at),
            badge: cleanBadge,
          };
        });

        const sorted = sortLeaderboardEntries(mapped);
        const top10 = sorted.slice(0, 10);

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
          } catch {
            // Ignore
          }
        }
        return top10;
      }
    } catch (e) {
      console.warn("Koneksi Supabase leaderboard bermasalah, menggunakan cache:", e);
      // Fallback ke localStorage bila koneksi internet bermasalah
    }
  }

  return getLocalLeaderboard();
}

/** Alias synchronous untuk render pertama */
export function getLeaderboard(): LeaderboardEntry[] {
  return getLocalLeaderboard();
}

/**
 * Mencatat hasil kuis siswa ke Leaderboard (Supabase Cloud + LocalStorage).
 */
export async function recordQuizCompletion(params: {
  name: string;
  timeSeconds: number;
  score: number;
  wrongCount?: number;
  totalQuestions: number;
}): Promise<{ rank: number | null; leaderboard: LeaderboardEntry[] }> {
  const safeName = params.name.trim() || "Pemain RaniaArchi";
  const safeWrong = params.wrongCount ?? 0;
  const rawBadge = params.score === 10 && safeWrong === 0 && params.timeSeconds <= 45 ? "Paling Kilat 🚀" : undefined;
  const fallbackBadge = rawBadge ? `${rawBadge} [w:${safeWrong}]` : `[w:${safeWrong}]`;

  // 1. Simpan ke Supabase jika aktif
  if (supabase && isSupabaseConfigured()) {
    try {
      const payload: Record<string, unknown> = {
        name: safeName,
        time_seconds: Math.max(1, params.timeSeconds),
        score: params.score,
        wrong_count: safeWrong,
        total_questions: params.totalQuestions,
        badge: rawBadge || null,
      };

      const { error: insertErr } = await supabase.from("leaderboard").insert(payload);
      if (insertErr) {
        // Fallback jika kolom wrong_count belum ada di cloud Supabase:
        // Simpan jumlah salah di dalam field badge agar tetap terbaca!
        delete payload.wrong_count;
        payload.badge = fallbackBadge;
        await supabase.from("leaderboard").insert(payload);
      }

      const freshLeaderboard = await fetchLeaderboard();
      const rankIdx = freshLeaderboard.findIndex(
        (e) =>
          e.name.toLowerCase() === safeName.toLowerCase() &&
          e.score === params.score &&
          (e.wrongCount ?? 0) === safeWrong
      );
      const onlineRank = rankIdx !== -1 ? rankIdx + 1 : null;

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("raniaarchi_leaderboard_updated"));
      }

      return { rank: onlineRank, leaderboard: freshLeaderboard };
    } catch {
      // Fallback ke penyimpanan lokal jika koneksi Supabase bermasalah
    }
  }

  // 2. Fallback Penyimpanan Lokal (localStorage)
  const current = getLocalLeaderboard();
  const newEntry: LeaderboardEntry = {
    id: `entry-${Date.now()}`,
    name: safeName,
    timeSeconds: Math.max(1, params.timeSeconds),
    score: params.score,
    wrongCount: safeWrong,
    totalQuestions: params.totalQuestions,
    date: "Baru saja",
    badge: rawBadge,
  };

  const combined = sortLeaderboardEntries([...current, newEntry]);
  const top10 = combined.slice(0, 10);
  const rankIndex = top10.findIndex((e) => e.id === newEntry.id);
  const rank = rankIndex !== -1 ? rankIndex + 1 : null;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
      window.dispatchEvent(new Event("raniaarchi_leaderboard_updated"));
    } catch {
      // Ignore
    }
  }

  return { rank, leaderboard: top10 };
}

/**
 * Menghapus satu entri di leaderboard.
 */
export async function deleteLeaderboardEntry(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from("leaderboard").delete().eq("id", id);
    } catch {
      // Fallback
    }
  }

  if (typeof window !== "undefined") {
    try {
      const current = getLocalLeaderboard();
      const updated = current.filter((e) => e.id !== id);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("raniaarchi_leaderboard_updated"));
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

/**
 * KOSONGKAN SELURUH PAPAN JUARA (HAPUS SEMUA DATA LEADERBOARD).
 * Benar-benar menghapus semua data hingga menjadi array kosong [].
 */
export async function clearLeaderboard(): Promise<LeaderboardEntry[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from("leaderboard").delete().neq("name", "___DUMMY_NEQ___");
    } catch (err) {
      console.error("Gagal mengosongkan leaderboard Supabase:", err);
    }
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify([]));
      localStorage.setItem(LEADERBOARD_CLEARED_KEY, "true");
      window.dispatchEvent(new Event("raniaarchi_leaderboard_updated"));
    } catch {
      // Ignore
    }
  }
  return [];
}

/**
 * ISI ULANG DATA CONTOH (BENCHMARK 10 PEMAIN AWAL).
 * Digunakan jika guru ingin mengisi kembali data simulasi latihan.
 */
export async function resetToBenchmark(): Promise<LeaderboardEntry[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from("leaderboard").delete().neq("name", "___DUMMY_NEQ___");
      const seedData = DEFAULT_LEADERBOARD.map((item) => ({
        name: item.name,
        time_seconds: item.timeSeconds,
        score: item.score,
        wrong_count: item.wrongCount ?? 0,
        total_questions: item.totalQuestions,
        badge: item.badge || null,
      }));
      const { error: seedErr } = await supabase.from("leaderboard").insert(seedData);
      if (seedErr) {
        // Fallback jika kolom wrong_count belum ada
        const fallbackSeed = seedData.map(({ wrong_count, ...rest }) => rest);
        await supabase.from("leaderboard").insert(fallbackSeed);
      }
    } catch (err) {
      console.error("Gagal restore benchmark Supabase:", err);
    }
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(LEADERBOARD_CLEARED_KEY);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
      window.dispatchEvent(new Event("raniaarchi_leaderboard_updated"));
    } catch {
      // Ignore
    }
  }
  return DEFAULT_LEADERBOARD;
}

/** Alias kompatibilitas */
export const resetLeaderboard = clearLeaderboard;
