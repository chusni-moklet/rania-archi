"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Mail,
  Key,
  LogOut,
  Trophy,
  BookOpen,
  Users,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  Crown,
  Timer,
  Globe2,
  Database,
  Zap,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  verifyAdminCredentials,
  setAdminSession,
  isAdminSessionActive,
  clearAdminSession,
  ADMIN_CREDENTIALS,
} from "@/lib/adminAuth";
import {
  LeaderboardEntry,
  fetchLeaderboard,
  clearLeaderboard,
  resetToBenchmark,
  resetLeaderboard,
  deleteLeaderboardEntry,
  formatTime,
  isOnlineMode,
} from "@/data/leaderboard";
import {
  Question,
  getAllQuestions,
  fetchCustomQuestions,
  addCustomQuestion,
  deleteCustomQuestion,
} from "@/data/questionBank";
import {
  StudentAccount,
  fetchStudents,
  addStudent,
  deleteStudent,
} from "@/data/students";
import { sounds } from "@/components/AudioEffects";

type AdminTab = "leaderboard" | "questions" | "students";

export default function AdminPortalPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("leaderboard");

  useEffect(() => {
    setIsMounted(true);
    setIsAuthenticated(isAdminSessionActive());
  }, []);

  // Login Form State
  const [emailInput, setEmailInput] = useState(ADMIN_CREDENTIALS.email);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isResettingLeaderboard, setIsResettingLeaderboard] = useState(false);
  const [leaderboardMessage, setLeaderboardMessage] = useState("");

  // Question Management State
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [allQuestionsCount, setAllQuestionsCount] = useState(100);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newSubtext, setNewSubtext] = useState("Trik Perkalian Kelas 4");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState<"A" | "B" | "C" | "D">("A");
  const [newExplanation, setNewExplanation] = useState("");
  const [questionMessage, setQuestionMessage] = useState("");

  // Students Management State
  const [students, setStudents] = useState<StudentAccount[]>([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGrade, setNewStudentGrade] = useState("Kelas 4 SD");
  const [newStudentPin, setNewStudentPin] = useState("");
  const [studentMessage, setStudentMessage] = useState("");

  const online = isOnlineMode();

  // Muat data jika sudah login
  const loadAllAdminData = async () => {
    try {
      const [leads, qList, stdList] = await Promise.all([
        fetchLeaderboard(),
        fetchCustomQuestions(),
        fetchStudents(),
      ]);
      setLeaderboard(leads);
      setCustomQuestions(qList);
      setAllQuestionsCount(getAllQuestions().length);
      setStudents(stdList);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    let ignore = false;
    if (isAuthenticated) {
      Promise.all([
        fetchLeaderboard(),
        fetchCustomQuestions(),
        fetchStudents(),
      ]).then(([leads, qList, stdList]) => {
        if (!ignore) {
          setLeaderboard(leads);
          setCustomQuestions(qList);
          setAllQuestionsCount(getAllQuestions().length);
          setStudents(stdList);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [isAuthenticated]);

  // Handle Login Admin
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (verifyAdminCredentials(emailInput, passwordInput)) {
      sounds.playSuccess();
      setAdminSession(true);
      setIsAuthenticated(true);
    } else {
      sounds.playBoing();
      setLoginError("Email atau Password Admin salah. Silakan coba lagi!");
    }
  };

  // Handle Logout Admin
  const handleLogout = () => {
    sounds.playPop();
    clearAdminSession();
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  // =========================================================================
  // ACTIONS TAB 1: KOSONGKAN & KELOLA LEADERBOARD
  // =========================================================================
  const handleClearLeaderboard = async () => {
    if (
      !confirm(
        "Apakah Anda yakin ingin MENGHAPUS SEMUA data rekor di Papan Juara? Papan Juara akan benar-benar KOSONG (0 data)."
      )
    ) {
      return;
    }

    setIsResettingLeaderboard(true);
    sounds.playPop();
    try {
      const cleared = await clearLeaderboard();
      setLeaderboard(cleared);
      setLeaderboardMessage("Papan Juara berhasil dikosongkan seluruhnya! (0 data tersisa) 🗑️");
      setTimeout(() => setLeaderboardMessage(""), 4000);
    } catch {
      setLeaderboardMessage("Gagal mengosongkan papan juara. Silakan coba lagi.");
    } finally {
      setIsResettingLeaderboard(false);
    }
  };

  const handleRestoreBenchmark = async () => {
    if (
      !confirm(
        "Ingin mengisi ulang 10 data simulasi tolak ukur (Rania Archi, dkk) ke papan juara untuk latihan?"
      )
    ) {
      return;
    }

    setIsResettingLeaderboard(true);
    sounds.playPop();
    try {
      const benchmarkData = await resetToBenchmark();
      setLeaderboard(benchmarkData);
      setLeaderboardMessage("Data contoh benchmark (10 pemain) berhasil diisi kembali! 🏆");
      setTimeout(() => setLeaderboardMessage(""), 4000);
    } catch {
      setLeaderboardMessage("Gagal mengisi ulang data contoh. Silakan coba lagi.");
    } finally {
      setIsResettingLeaderboard(false);
    }
  };

  const handleDeleteLeaderboardItem = async (id: string, name: string) => {
    if (!confirm(`Hapus rekor "${name}" dari papan juara?`)) return;
    sounds.playPop();
    await deleteLeaderboardEntry(id);
    const updated = leaderboard.filter((item) => item.id !== id);
    setLeaderboard(updated);
    setLeaderboardMessage(`Rekor "${name}" berhasil dihapus.`);
    setTimeout(() => setLeaderboardMessage(""), 3000);
  };

  // =========================================================================
  // ACTIONS TAB 2: TAMBAH & KELOLA SOAL
  // =========================================================================
  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !optionA.trim() || !optionB.trim()) {
      alert("Harap isi pertanyaan dan opsi jawaban!");
      return;
    }

    sounds.playSuccess();
    try {
      const added = await addCustomQuestion({
        question: newQuestionText.trim(),
        subtext: newSubtext.trim() || "Soal Tambahan Guru",
        options: [
          { id: "A", label: optionA.trim(), isCorrect: correctOption === "A" },
          { id: "B", label: optionB.trim(), isCorrect: correctOption === "B" },
          { id: "C", label: optionC.trim() || "-", isCorrect: correctOption === "C" },
          { id: "D", label: optionD.trim() || "-", isCorrect: correctOption === "D" },
        ],
        explanation:
          newExplanation.trim() ||
          `Jawaban benar adalah ${
            correctOption === "A" ? optionA : correctOption === "B" ? optionB : correctOption === "C" ? optionC : optionD
          }.`,
      });

      setCustomQuestions((prev) => [...prev, added]);
      setAllQuestionsCount(getAllQuestions().length);
      setQuestionMessage("Soal baru berhasil ditambahkan ke Bank Soal kuis! 🚀");

      // Reset form
      setNewQuestionText("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setNewExplanation("");
      setTimeout(() => setQuestionMessage(""), 4000);
    } catch {
      setQuestionMessage("Gagal menambahkan soal.");
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm("Hapus soal ini dari Bank Soal?")) return;
    sounds.playPop();
    await deleteCustomQuestion(id);
    setCustomQuestions((prev) => prev.filter((q) => q.id !== id));
    setAllQuestionsCount(getAllQuestions().length);
  };

  // =========================================================================
  // ACTIONS TAB 3: TAMBAH & KELOLA AKUN SISWA
  // =========================================================================
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) {
      alert("Masukkan nama siswa!");
      return;
    }

    sounds.playSuccess();
    try {
      const newStd = await addStudent({
        name: newStudentName.trim(),
        grade: newStudentGrade.trim(),
        pin: newStudentPin.trim() || undefined,
      });

      setStudents((prev) => [newStd, ...prev]);
      setStudentMessage(`Akun siswa "${newStd.name}" berhasil ditambahkan! 🌟`);
      setNewStudentName("");
      setNewStudentPin("");
      setTimeout(() => setStudentMessage(""), 4000);
    } catch {
      setStudentMessage("Gagal menambahkan akun siswa.");
    }
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (!confirm(`Hapus akun siswa "${name}"?`)) return;
    sounds.playPop();
    await deleteStudent(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // =========================================================================
  // RENDER: HYDRATION GUARD
  // =========================================================================
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F3E8FF] via-purple-100 to-amber-50 flex flex-col justify-center items-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-white border-2 border-purple-200 shadow-md flex items-center justify-center animate-spin">
          <RefreshCw className="w-6 h-6 text-[#8B5CF6]" />
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: JIKA BELUM LOGIN (LOGIN FORM)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F3E8FF] via-purple-100 to-amber-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-[440px] bg-white rounded-[26px] shadow-2xl border-4 border-purple-200 overflow-hidden p-6 sm:p-8 animate-in fade-in duration-300">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center text-white shadow-lg mb-3">
              <Lock className="w-8 h-8 text-yellow-300" />
            </div>
            <h1 className="text-[24px] font-black text-[#1F2937]">Portal Guru & Admin</h1>
            <p className="text-[14px] font-semibold text-[#6B7280] mt-1">
              RaniaArchi • Sistem Manajemen Pembelajaran
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[13px] font-black text-[#1F2937] flex items-center gap-1.5 mb-1.5">
                <Mail className="w-4 h-4 text-[#8B5CF6]" />
                <span>Email Admin:</span>
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-purple-50/70 border-2 border-purple-200 text-[#1F2937] font-bold text-[15px] focus:outline-none focus:border-[#8B5CF6] focus:bg-white shadow-inner"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="text-[13px] font-black text-[#1F2937] flex items-center gap-1.5 mb-1.5">
                <Key className="w-4 h-4 text-[#8B5CF6]" />
                <span>Password Admin:</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  placeholder="Masukkan password admin..."
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-purple-50/70 border-2 border-purple-200 text-[#1F2937] font-bold text-[15px] focus:outline-none focus:border-[#8B5CF6] focus:bg-white shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="clay-button-primary w-full py-3.5 px-4 font-black text-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2 active:scale-95 transition-transform"
            >
              <Lock className="w-5 h-5" />
              <span>Masuk ke Dashboard Admin</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-[13px]">
            <Link
              href="/"
              className="font-bold text-[#8B5CF6] hover:text-[#7C3AED] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda Siswa</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: DASHBOARD ADMIN (AUTHENTICATED)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F3E8FF] flex flex-col selection:bg-purple-200">
      {/* Top Header Admin */}
      <header className="bg-white/95 backdrop-blur-md border-b border-purple-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-md font-black text-xl"
            >
              ⭐
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[20px] font-black text-[#1F2937] leading-none">
                  RaniaArchi Admin
                </h1>
                <span className="text-[11px] font-black bg-purple-100 text-[#8B5CF6] px-2 py-0.5 rounded-full border border-purple-200">
                  Panel Guru
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[12px] font-bold text-gray-500">
                  {ADMIN_CREDENTIALS.email}
                </span>
                {online ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full border border-emerald-300">
                    <Globe2 className="w-3 h-3 text-emerald-600" />
                    <span>Supabase Online</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.2 rounded-full border border-amber-300">
                    <Database className="w-3 h-3 text-amber-600" />
                    <span>Mode Lokal</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-purple-50 hover:bg-purple-100 text-[#8B5CF6] font-bold text-[13px] border border-purple-200 transition-colors"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Halaman Siswa</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[13px] border border-red-200 cursor-pointer transition-colors"
              title="Keluar dari akun admin"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6">
        {/* Navigation Tabs (3 Menu Utama) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white/70 p-1.5 rounded-2xl border border-purple-200 shadow-xs">
          <button
            onClick={() => {
              sounds.playPop();
              setActiveTab("leaderboard");
            }}
            className={`py-3 px-3 rounded-xl font-black text-[13px] sm:text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "leaderboard"
                ? "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md shadow-purple-500/25"
                : "text-[#6B7280] hover:text-[#1F2937] hover:bg-purple-50"
            }`}
          >
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
            <span>Papan Juara</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setActiveTab("questions");
            }}
            className={`py-3 px-3 rounded-xl font-black text-[13px] sm:text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "questions"
                ? "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md shadow-purple-500/25"
                : "text-[#6B7280] hover:text-[#1F2937] hover:bg-purple-50"
            }`}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
            <span>Bank Soal ({allQuestionsCount})</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setActiveTab("students");
            }}
            className={`py-3 px-3 rounded-xl font-black text-[13px] sm:text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "students"
                ? "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md shadow-purple-500/25"
                : "text-[#6B7280] hover:text-[#1F2937] hover:bg-purple-50"
            }`}
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
            <span>Akun Siswa ({students.length})</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: KELOLA & RESET LEADERBOARD                                 */}
        {/* ================================================================= */}
        {activeTab === "leaderboard" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {leaderboardMessage && (
              <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 text-emerald-900 rounded-2xl font-bold flex items-center gap-2 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{leaderboardMessage}</span>
              </div>
            )}

            {/* Header Tindakan Reset & Kosongkan */}
            <div className="clay-card-surface p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-2 border-purple-200">
              <div>
                <h2 className="text-[18px] sm:text-[20px] font-black text-[#1F2937] flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500 fill-amber-400" />
                  <span>Manajemen Rekor Papan Juara Best Player</span>
                </h2>
                <p className="text-[13px] sm:text-[14px] font-semibold text-[#6B7280] mt-0.5">
                  Hapus rekor individual siswa, kosongkan seluruh papan juara untuk kuis baru, atau isi ulang data contoh.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <button
                  onClick={() => {
                    sounds.playPop();
                    loadAllAdminData();
                  }}
                  className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#8B5CF6] font-bold text-[13px] flex items-center justify-center gap-1.5 border border-purple-200 cursor-pointer transition-colors"
                  title="Segarkan data terbaru"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Segarkan</span>
                </button>

                <button
                  onClick={handleRestoreBenchmark}
                  disabled={isResettingLeaderboard}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[13px] flex items-center justify-center gap-1.5 border border-amber-300 cursor-pointer transition-colors disabled:opacity-50"
                  title="Isi ulang 10 rekor pemain contoh untuk simulasi/latihan"
                >
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Isi Ulang Data Contoh</span>
                </button>

                <button
                  onClick={handleClearLeaderboard}
                  disabled={isResettingLeaderboard}
                  className="clay-button-primary bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 py-2 px-3.5 font-black text-[13px] flex items-center justify-center gap-1.5 cursor-pointer shadow-md text-white border-red-400 active:scale-95 transition-transform disabled:opacity-50"
                  title="Hapus semua data rekor di papan juara hingga kosong"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                  <span>{isResettingLeaderboard ? "Memproses..." : "Kosongkan Papan Juara"}</span>
                </button>
              </div>
            </div>

            {/* Tabel / Daftar Pemain Terdaftar */}
            <div className="clay-card-surface p-5 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[16px] font-black text-[#1F2937]">
                  Daftar Peringkat Saat Ini ({leaderboard.length} Rekor):
                </h3>
                {leaderboard.length === 0 && (
                  <span className="text-[12px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Papan Juara Kosong (0 data)
                  </span>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-purple-200 text-[12px] font-black text-gray-500 uppercase tracking-wider">
                      <th className="py-2.5 px-3">Rank</th>
                      <th className="py-2.5 px-3">Nama Siswa</th>
                      <th className="py-2.5 px-3">Waktu</th>
                      <th className="py-2.5 px-3">Skor</th>
                      <th className="py-2.5 px-3">Tanggal</th>
                      <th className="py-2.5 px-3">Gelar / Badge</th>
                      <th className="py-2.5 px-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100 text-[14px] font-bold text-[#1F2937]">
                    {leaderboard.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-10 px-4 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl mb-2">
                              🏆
                            </div>
                            <span className="text-[16px] font-black text-[#1F2937]">
                              Papan Juara Saat Ini Kosong (0 Rekor)
                            </span>
                            <p className="text-[13px] font-semibold text-gray-500 mt-1 max-w-md">
                              Seluruh rekor telah dibersihkan oleh admin. Rekor akan otomatis muncul saat siswa mulai menyelesaikan kuis matematika, atau klik tombol &quot;Isi Ulang Data Contoh&quot; di atas jika ingin menampilkan data simulasi.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      leaderboard.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-purple-50/50 transition-colors">
                          <td className="py-3 px-3">
                            <span
                              className={`w-7 h-7 rounded-full font-black text-[12px] flex items-center justify-center ${
                                idx === 0
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : idx === 1
                                  ? "bg-slate-200 text-slate-700"
                                  : idx === 2
                                  ? "bg-amber-50 text-amber-900 border border-amber-200"
                                  : "bg-purple-50 text-purple-700"
                              }`}
                            >
                              #{idx + 1}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-black text-[#1F2937]">
                            {item.name}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-mono text-blue-600 font-extrabold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 text-[12px] inline-flex items-center gap-1">
                              <Timer className="w-3 h-3 text-blue-500" />
                              {formatTime(item.timeSeconds)}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-emerald-700 font-black">
                              {item.score}/{item.totalQuestions}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-gray-400 text-[12px]">
                            {item.date}
                          </td>
                          <td className="py-3 px-3">
                            {item.badge ? (
                              <span className="text-[11px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                                {item.badge}
                              </span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => handleDeleteLeaderboardItem(item.id, item.name)}
                              className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer transition-colors"
                              title={`Hapus rekor ${item.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: MANAJEMEN & TAMBAH SOAL MATEMATIKA                         */}
        {/* ================================================================= */}
        {activeTab === "questions" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {questionMessage && (
              <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 text-emerald-900 rounded-2xl font-bold flex items-center gap-2 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{questionMessage}</span>
              </div>
            )}

            {/* Form Tambah Soal Baru */}
            <div className="clay-card-surface p-5 sm:p-6 border-2 border-purple-200">
              <h2 className="text-[18px] sm:text-[20px] font-black text-[#1F2937] flex items-center gap-2 mb-1">
                <Plus className="w-5 h-5 text-[#8B5CF6]" />
                <span>Tambah Soal Matematika Baru</span>
              </h2>
              <p className="text-[13px] font-semibold text-[#6B7280] mb-4">
                Soal yang Anda tambahkan akan otomatis diacak bersama 100 soal bawaan kurikulum untuk kuis siswa.
              </p>

              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[13px] font-black text-[#1F2937] block mb-1">
                      Pertanyaan Soal:
                    </label>
                    <input
                      type="text"
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="Contoh: 15 × 8 = ? atau Berapa keliling segitiga sama sisi jika sisinya 9 cm?"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-purple-50/70 border-2 border-purple-200 font-bold text-[15px] focus:outline-none focus:border-[#8B5CF6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-black text-[#1F2937] block mb-1">
                      Kategori / Subteks:
                    </label>
                    <input
                      type="text"
                      value={newSubtext}
                      onChange={(e) => setNewSubtext(e.target.value)}
                      placeholder="Contoh: Perkalian Puluhan"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-purple-50/70 border-2 border-purple-200 font-bold text-[15px] focus:outline-none focus:border-[#8B5CF6] focus:bg-white"
                    />
                  </div>
                </div>

                {/* 4 Pilihan Jawaban */}
                <div>
                  <label className="text-[13px] font-black text-[#1F2937] block mb-1.5">
                    Pilihan Jawaban (Tandai yang Benar):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "A" as const, val: optionA, setVal: setOptionA },
                      { id: "B" as const, val: optionB, setVal: setOptionB },
                      { id: "C" as const, val: optionC, setVal: setOptionC },
                      { id: "D" as const, val: optionD, setVal: setOptionD },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        className={`flex items-center gap-2 p-2 rounded-xl border-2 transition-all ${
                          correctOption === opt.id
                            ? "bg-emerald-50 border-emerald-400"
                            : "bg-purple-50/50 border-purple-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="correct_option"
                          checked={correctOption === opt.id}
                          onChange={() => setCorrectOption(opt.id)}
                          className="w-4 h-4 text-emerald-600 cursor-pointer ml-1"
                          id={`radio-${opt.id}`}
                        />
                        <label
                          htmlFor={`radio-${opt.id}`}
                          className="font-black text-[14px] text-gray-700 cursor-pointer"
                        >
                          {opt.id}:
                        </label>
                        <input
                          type="text"
                          value={opt.val}
                          onChange={(e) => opt.setVal(e.target.value)}
                          placeholder={`Jawaban Pilihan ${opt.id}...`}
                          required={opt.id === "A" || opt.id === "B"}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-purple-200 font-bold text-[14px] focus:outline-none focus:border-[#8B5CF6]"
                        />
                        {correctOption === opt.id && (
                          <span className="text-[11px] font-black text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded-full mr-1">
                            Benar ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-black text-[#1F2937] block mb-1">
                    Penjelasan / Trik Cara Menghitung:
                  </label>
                  <input
                    type="text"
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                    placeholder="Contoh: 15 × 8 = (10 × 8) + (5 × 8) = 80 + 40 = 120! 🌟"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-50/70 border-2 border-purple-200 font-bold text-[14px] focus:outline-none focus:border-[#8B5CF6] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="clay-button-primary py-3 px-6 font-black text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-transform"
                >
                  <Plus className="w-5 h-5 text-yellow-300" />
                  <span>Simpan Soal ke Bank Kuis</span>
                </button>
              </form>
            </div>

            {/* Daftar Soal Tambahan */}
            <div className="clay-card-surface p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[16px] font-black text-[#1F2937]">
                  Soal Tambahan Buatan Guru ({customQuestions.length} Soal)
                </h3>
                <span className="text-[12px] font-bold text-gray-500">
                  Total Keseluruhan: {100 + customQuestions.length} Soal
                </span>
              </div>

              {customQuestions.length === 0 ? (
                <div className="p-6 text-center text-gray-400 bg-purple-50/40 rounded-2xl border border-dashed border-purple-200">
                  <p className="font-bold text-[14px]">
                    Belum ada soal tambahan yang dibuat.
                  </p>
                  <p className="text-[13px] mt-0.5">
                    Gunakan formulir di atas untuk menambahkan soal baru kapan saja!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {customQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="p-3.5 bg-white rounded-xl border border-purple-200 flex items-start justify-between gap-3 shadow-2xs hover:border-purple-300 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[12px] font-black bg-purple-100 text-[#8B5CF6] px-2 py-0.2 rounded-full">
                            #{q.id} {q.subtext}
                          </span>
                        </div>
                        <p className="text-[16px] font-black text-[#1F2937]">
                          {q.question}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {q.options.map((opt) => (
                            <span
                              key={opt.id}
                              className={`text-[12px] font-bold px-2.5 py-0.5 rounded-lg border ${
                                opt.isCorrect
                                  ? "bg-emerald-100 text-emerald-800 border-emerald-300 font-black"
                                  : "bg-gray-50 text-gray-600 border-gray-200"
                              }`}
                            >
                              {opt.id}: {opt.label} {opt.isCorrect && "✓"}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                        title="Hapus soal ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: MANAJEMEN & TAMBAH AKUN SISWA                              */}
        {/* ================================================================= */}
        {activeTab === "students" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {studentMessage && (
              <div className="p-3.5 bg-emerald-50 border-2 border-emerald-300 text-emerald-900 rounded-2xl font-bold flex items-center gap-2 shadow-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{studentMessage}</span>
              </div>
            )}

            {/* Form Tambah Siswa */}
            <div className="clay-card-surface p-5 sm:p-6 border-2 border-purple-200">
              <h2 className="text-[18px] sm:text-[20px] font-black text-[#1F2937] flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#8B5CF6]" />
                <span>Tambah Akun Siswa Baru</span>
              </h2>
              <p className="text-[13px] font-semibold text-[#6B7280] mb-4">
                Daftarkan siswa kelas agar nama mereka tercatat dalam sistem pembelajaran dan sertifikat kuis.
              </p>

              <form onSubmit={handleAddStudent} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[13px] font-black text-[#1F2937] block mb-1">
                    Nama Lengkap Siswa:
                  </label>
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Contoh: Rania Archi"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-50/70 border-2 border-purple-200 font-bold text-[15px] focus:outline-none focus:border-[#8B5CF6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[13px] font-black text-[#1F2937] block mb-1">
                    Kelas:
                  </label>
                  <input
                    type="text"
                    value={newStudentGrade}
                    onChange={(e) => setNewStudentGrade(e.target.value)}
                    placeholder="Contoh: Kelas 4 SD"
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-50/70 border-2 border-purple-200 font-bold text-[15px] focus:outline-none focus:border-[#8B5CF6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-[13px] font-black text-[#1F2937] block mb-1">
                    PIN Masuk (Opsional):
                  </label>
                  <input
                    type="text"
                    value={newStudentPin}
                    onChange={(e) => setNewStudentPin(e.target.value)}
                    placeholder="Contoh: 1234"
                    maxLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-50/70 border-2 border-purple-200 font-bold text-[15px] focus:outline-none focus:border-[#8B5CF6] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-4 mt-1">
                  <button
                    type="submit"
                    className="clay-button-primary py-3 px-6 font-black text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-transform"
                  >
                    <Plus className="w-5 h-5 text-yellow-300" />
                    <span>Daftarkan Akun Siswa</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Daftar Siswa Terdaftar */}
            <div className="clay-card-surface p-5">
              <h3 className="text-[16px] font-black text-[#1F2937] mb-3">
                Daftar Siswa Terdaftar ({students.length} Siswa):
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {students.map((std) => (
                  <div
                    key={std.id}
                    className="p-3.5 bg-white rounded-2xl border border-purple-200 flex items-center justify-between shadow-2xs hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-100 to-indigo-100 text-[#8B5CF6] font-black flex items-center justify-center text-[16px] shadow-xs">
                        {std.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-black text-[15px] text-[#1F2937] leading-tight">
                          {std.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[11px] font-bold text-gray-500">
                            {std.grade}
                          </span>
                          {std.pin && (
                            <span className="text-[10px] font-mono text-purple-600 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                              PIN: {std.pin}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteStudent(std.id, std.name)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                      title={`Hapus siswa ${std.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
