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

/** Format total seconds into mm:ss (e.g., 45 -> "00:45", 85 -> "01:25") */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/** Retrieve current Top 10 from localStorage or return default benchmark players */
export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") {
    return DEFAULT_LEADERBOARD;
  }
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
      return DEFAULT_LEADERBOARD;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.slice(0, 10);
    }
    return DEFAULT_LEADERBOARD;
  } catch {
    return DEFAULT_LEADERBOARD;
  }
}

/**
 * Save new player result to leaderboard.
 * Sorting priority:
 * 1) Higher score (number of correct answers)
 * 2) Lower time (fastest in seconds)
 * Keeps only the Top 10 fastest players.
 * Returns rank (1-10) if qualified, or null if outside top 10.
 */
export function recordQuizCompletion(params: {
  name: string;
  timeSeconds: number;
  score: number;
  totalQuestions: number;
}): { rank: number | null; leaderboard: LeaderboardEntry[] } {
  const current = getLeaderboard();
  const safeName = params.name.trim() || "Pemain RaniaArchi";

  const newEntry: LeaderboardEntry = {
    id: `entry-${Date.now()}`,
    name: safeName,
    timeSeconds: Math.max(1, params.timeSeconds),
    score: params.score,
    totalQuestions: params.totalQuestions,
    date: "Baru saja",
    badge: params.score === 10 && params.timeSeconds <= 45 ? "Paling Kilat 🚀" : undefined,
  };

  // Combine and sort
  const combined = [...current, newEntry].sort((a, b) => {
    // 1. Sort by score descending (higher is better)
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // 2. Sort by time ascending (lower seconds is faster)
    return a.timeSeconds - b.timeSeconds;
  });

  const top10 = combined.slice(0, 10);
  const rankIndex = top10.findIndex((e) => e.id === newEntry.id);
  const rank = rankIndex !== -1 ? rankIndex + 1 : null;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
    } catch {
      // Fallback
    }
  }

  return { rank, leaderboard: top10 };
}

/** Reset leaderboard back to default benchmarks */
export function resetLeaderboard(): LeaderboardEntry[] {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
    } catch {
      // Fallback
    }
  }
  return DEFAULT_LEADERBOARD;
}
