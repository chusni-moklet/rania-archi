export const ADMIN_CREDENTIALS = {
  email: "chusniarin12@gmail.com",
  password: "Arindika06",
};

const ADMIN_STORAGE_KEY = "raniaarchi_admin_authenticated";

/** Memverifikasi email dan password admin */
export function verifyAdminCredentials(email: string, pass: string): boolean {
  const safeEmail = email.trim().toLowerCase();
  return (
    safeEmail === ADMIN_CREDENTIALS.email.toLowerCase() &&
    pass === ADMIN_CREDENTIALS.password
  );
}

/** Menyimpan status login admin di browser */
export function setAdminSession(isLoggedIn: boolean): void {
  if (typeof window === "undefined") return;
  if (isLoggedIn) {
    sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
    localStorage.setItem(ADMIN_STORAGE_KEY, "true");
  } else {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }
}

/** Mengecek apakah admin sedang dalam status login */
export function isAdminSessionActive(): boolean {
  if (typeof window === "undefined") return false;
  return (
    sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true" ||
    localStorage.getItem(ADMIN_STORAGE_KEY) === "true"
  );
}

/** Mengeluarkan admin (logout) */
export function clearAdminSession(): void {
  setAdminSession(false);
}
