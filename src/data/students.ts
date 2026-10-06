import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface StudentAccount {
  id: string;
  name: string;
  grade: string;
  pin?: string;
  createdAt: string;
}

const STUDENTS_STORAGE_KEY = "raniaarchi_registered_students";

export const DEFAULT_STUDENTS: StudentAccount[] = [
  {
    id: "std-1",
    name: "Rania Archi",
    grade: "Kelas 4 SD",
    pin: "1234",
    createdAt: "2026-10-01",
  },
  {
    id: "std-2",
    name: "Budi Pratama",
    grade: "Kelas 4 SD",
    pin: "1234",
    createdAt: "2026-10-02",
  },
  {
    id: "std-3",
    name: "Siti Aisyah",
    grade: "Kelas 4 SD",
    pin: "1234",
    createdAt: "2026-10-03",
  },
  {
    id: "std-4",
    name: "Ahmad Fauzi",
    grade: "Kelas 4 SD",
    createdAt: "2026-10-04",
  },
  {
    id: "std-5",
    name: "Dewi Lestari",
    grade: "Kelas 4 SD",
    createdAt: "2026-10-05",
  },
];

/** Ambil daftar siswa dari localStorage secara instan */
export function getLocalStudents(): StudentAccount[] {
  if (typeof window === "undefined") {
    return DEFAULT_STUDENTS;
  }
  try {
    const raw = localStorage.getItem(STUDENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_STUDENTS;
  } catch {
    return DEFAULT_STUDENTS;
  }
}

/** Ambil daftar akun siswa (Supabase Cloud jika aktif, fallback ke localStorage) */
export async function fetchStudents(): Promise<StudentAccount[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("id, name, grade, pin, created_at")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: StudentAccount[] = data.map((item) => ({
          id: String(item.id),
          name: item.name,
          grade: item.grade || "Kelas 4 SD",
          pin: item.pin || undefined,
          createdAt: item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID") : "Baru saja",
        }));

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(mapped));
          } catch {
            // Ignore
          }
        }
        return mapped;
      }
    } catch {
      // Fallback
    }
  }

  return getLocalStudents();
}

/** Tambah akun siswa baru */
export async function addStudent(params: {
  name: string;
  grade?: string;
  pin?: string;
}): Promise<StudentAccount> {
  const safeName = params.name.trim();
  const safeGrade = params.grade?.trim() || "Kelas 4 SD";
  const safePin = params.pin?.trim() || undefined;

  const newLocalItem: StudentAccount = {
    id: `std-${Date.now()}`,
    name: safeName,
    grade: safeGrade,
    pin: safePin,
    createdAt: new Date().toLocaleDateString("id-ID"),
  };

  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("students")
        .insert({
          name: safeName,
          grade: safeGrade,
          pin: safePin || null,
        })
        .select()
        .single();

      if (!error && data) {
        newLocalItem.id = String(data.id);
      }
    } catch {
      // Fallback
    }
  }

  // Update local storage
  if (typeof window !== "undefined") {
    try {
      const current = getLocalStudents();
      const updated = [newLocalItem, ...current];
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }

  return newLocalItem;
}

/** Hapus akun siswa */
export async function deleteStudent(id: string): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from("students").delete().eq("id", id);
    } catch {
      // Fallback
    }
  }

  if (typeof window !== "undefined") {
    try {
      const current = getLocalStudents();
      const updated = current.filter((s) => s.id !== id);
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }
  return true;
}
