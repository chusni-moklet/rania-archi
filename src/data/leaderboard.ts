import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface LeaderboardEntry {
  id: string;
  name: string;
  timeSeconds: number;
  score: number;
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
    totalQuestions: 10,
    date: "Hari ini",
    badge: "Juara Bertahan 👑",
  },
  {
    id: "lead-2",
    name: "Budi Pratama",
    timeSeconds: 45,
    score: 10,
    totalQuestions: 10,
    date: "Kemarin",
    badge: "Kilat Matematika ⚡",
  },
  {
    id: "lead-3",
    name: "Siti Aisyah",
    timeSeconds: 52,
    score: 10,
    totalQuestions: 10,
    date: "2 hari lalu",
    badge: "Bintang Hitung 🌟",
  },
  {
    id: "lead-4",
    name: "Ahmad Fauzi",
    timeSeconds: 59,
    score: 10,
    totalQuestions: 10,
    date: "3 hari lalu",
  },
  {
    id: "lead-5",
    name: "Dewi Lestari",
    timeSeconds: 67,
    score: 10,
    totalQuestions: 10,
    date: "4 hari lalu",
  },
  {
    id: "lead-6",
    name: "Reza Rahadian",
    timeSeconds: 74,
    score: 10,
    totalQuestions: 10,
    date: "5 hari lalu",
  },
  {
    id: "lead-7",
    name: "Nadia Putri",
    timeSeconds: 83,
    score: 10,
    totalQuestions: 10,
    date: "Minggu ini",
  },
  {
    id: "lead-8",
    name: "Kevin Sanjaya",
    timeSeconds: 91,
    score: 9,
    totalQuestions: 10,
    date: "Minggu ini",
  },
  {
    id: "lead-9",
    name: "Putri Maharani",
    timeSeconds: 98,
    score: 9,
    totalQuestions: 10,
    date: "Minggu ini",
  },
  {
    id: "lead-10",
    name: "Dimas Anggara",
    timeSeconds: 105,
    score: 9,
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

/**
 * Mengambil data dari localStorage secara instan.
 * PENTING: Jika data kosong ([]) karena telah dihapus admin,
 * kembalikan [] dan JANGAN timpa kembali dengan DEFAULT_LEADERBOARD!
 */
export function getLocalLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    // Jika belum ada data sama sekali atau sudah dikosongkan, kembalikan []
    if (raw === null) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, 10);
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Mengambil data Top 10 Best Player.
 * Jika Supabase aktif, membaca dari Cloud.
 * Jika data di Cloud kosong (setelah dihapus admin), kembalikan [] kosong.
 */
export async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("id, name, time_seconds, score, total_questions, created_at, badge")
        .order("score", { ascending: false })
        .order("time_seconds", { ascending: true })
        .limit(10);

      if (!error && Array.isArray(data)) {
        const mapped: LeaderboardEntry[] = data.map((row) => ({
          id: String(row.id),
          name: row.name,
          timeSeconds: Number(row.time_seconds),
          score: Number(row.score),
          totalQuestions: Number(row.total_questions || 10),
          date: formatEntryDate(row.created_at),
          badge: row.badge || undefined,
        }));

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(mapped));
          } catch {
            // Ignore
          }
        }
        return mapped;
      }
    } catch {
      // Fallback ke localStorage bila gagal terhubung ke Supabase
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
  totalQuestions: number;
}): Promise<{ rank: number | null; leaderboard: LeaderboardEntry[] }> {
  const safeName = params.name.trim() || "Pemain RaniaArchi";
  const badge = params.score === 10 && params.timeSeconds <= 45 ? "Paling Kilat 🚀" : undefined;

  // 1. Simpan ke Supabase jika aktif
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from("leaderboard").insert({
        name: safeName,
        time_seconds: Math.max(1, params.timeSeconds),
        score: params.score,
        total_questions: params.totalQuestions,
        badge: badge || null,
      });

      const freshLeaderboard = await fetchLeaderboard();
      const rankIdx = freshLeaderboard.findIndex(
        (e) => e.name.toLowerCase() === safeName.toLowerCase() && e.score === params.score
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
    totalQuestions: params.totalQuestions,
    date: "Baru saja",
    badge,
  };

  const combined = [...current, newEntry].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeSeconds - b.timeSeconds;
  });

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
        total_questions: item.totalQuestions,
        badge: item.badge || null,
      }));
      await supabase.from("leaderboard").insert(seedData);
    } catch (err) {
      console.error("Gagal restore benchmark Supabase:", err);
    }
  }

  if (typeof window !== "undefined") {
    try {
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
