"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  Sparkles,
  HelpCircle,
  Trophy,
  RefreshCw,
  Star,
  ArrowRight,
  User,
  Award,
  Timer,
  Crown,
} from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "./AudioEffects";
import { Question, getRandomQuizQuestions, QUESTION_BANK } from "@/data/questionBank";
import { formatTime, recordQuizCompletion } from "@/data/leaderboard";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionCompleted: () => void;
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  onOpenLeaderboard?: () => void;
}

export default function QuizModal({
  isOpen,
  onClose,
  onQuestionCompleted,
  studentName,
  onUpdateStudentName,
  onOpenLeaderboard,
}: QuizModalProps) {
  const [step, setStep] = useState<"name_entry" | "questions" | "completed">("name_entry");
  const [nameInput, setNameInput] = useState<string>(studentName || "Rania");
  const [questions, setQuestions] = useState<Question[]>(() => getRandomQuizQuestions(10));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shakeOptionId, setShakeOptionId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  // Status Timer Pengerjaan Kuis (Stopwatch)
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [earnedRank, setEarnedRank] = useState<number | null>(null);

  // Stopwatch timer saat kuis berlangsung
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const startNewSession = () => {
    const selected10 = getRandomQuizQuestions(10);
    setQuestions(selected10);
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShakeOptionId(null);
    setCorrectCount(0);
    setSecondsElapsed(0);
    setTimerActive(false);
    setEarnedRank(null);
    setStep("name_entry");
  };

  if (!isOpen) return null;

  const handleStartQuiz = () => {
    const finalName = nameInput.trim() || "Rania";
    onUpdateStudentName(finalName);
    sounds.playSuccess();
    setSecondsElapsed(0);
    setTimerActive(true);
    setEarnedRank(null);
    setStep("questions");
  };

  const handleSelectOption = (option: { id: string; label: string; isCorrect: boolean }) => {
    if (isAnswered) return;

    setSelectedOptionId(option.id);

    if (option.isCorrect) {
      setIsAnswered(true);
      setCorrectCount((prev) => prev + 1);
      sounds.playSuccess();

      // Cheerful confetti burst
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10B981", "#8B5CF6", "#F59E0B", "#3B82F6"],
        });
      } catch {
        // Fallback
      }

      onQuestionCompleted();
    } else {
      sounds.playBoing();
      setShakeOptionId(option.id);
      setTimeout(() => {
        setShakeOptionId(null);
        setSelectedOptionId(null);
      }, 700);
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIdx + 1 < questions.length) {
      setIsAnswered(false);
      setSelectedOptionId(null);
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Selesaikan kuis dan hentikan timer
      setTimerActive(false);

      // Catat rekor ke Leaderboard Best Player (Top 10)
      const finalName = studentName || nameInput.trim() || "Rania";
      const { rank } = recordQuizCompletion({
        name: finalName,
        timeSeconds: secondsElapsed,
        score: correctCount,
        totalQuestions: questions.length,
      });
      setEarnedRank(rank);

      setStep("completed");
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 140,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#8B5CF6", "#F59E0B", "#10B981", "#EC4899", "#3B82F6"],
        });
      } catch {
        // Fallback
      }
    }
  };

  const q = questions[currentIdx] || questions[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-[440px] bg-white rounded-[24px] shadow-2xl border-4 border-purple-200 overflow-hidden relative flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] px-5 py-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner flex-shrink-0">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 id="quiz-modal-title" className="text-[18px] font-black leading-none">
                Tantangan Matematika Harian
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {step === "questions" ? (
                  <>
                    <span className="text-[13px] text-purple-200 font-bold">
                      Soal {currentIdx + 1} dari {questions.length}
                    </span>
                    <span className="text-[13px] font-bold text-yellow-300 bg-white/20 px-2 py-0.2 rounded-full">
                      10 dari {QUESTION_BANK.length} Soal
                    </span>
                  </>
                ) : step === "name_entry" ? (
                  <span className="text-[13px] text-purple-200 font-bold">
                    Persiapan Kuis • Kelas 4 SD
                  </span>
                ) : (
                  <span className="text-[13px] text-yellow-300 font-bold">
                    Kuis Selesai • Hasil Prestasi
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              setTimerActive(false);
              onClose();
            }}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 cursor-pointer transition-colors"
            aria-label="Tutup kuis"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Visible during questions) */}
        {step === "questions" && (
          <div className="w-full bg-purple-100 h-2 flex-shrink-0">
            <div
              className="bg-gradient-to-r from-amber-400 to-[#10B981] h-2 transition-all duration-300 rounded-r-full"
              style={{
                width: `${((currentIdx + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
              }}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* TAHAP 1: FORMULIR INPUT NAMA SEBELUM KUIS DIMULAI        */}
        {/* ======================================================== */}
        {step === "name_entry" && (
          <div className="p-6 flex flex-col items-center text-center overflow-y-auto">
            <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 p-1 mb-3 shadow-lg flex-shrink-0 animate-gentle-float">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl">
                🌟
              </div>
            </div>

            <h3 className="text-[22px] font-black text-[#1F2937] leading-tight">
              Siap Belajar Matematika?
            </h3>
            <p className="text-[14px] font-semibold text-[#6B7280] mt-1 leading-relaxed">
              Masukkan namamu sebelum mulai kuis agar tercatat di Sertifikat & Papan Juara Best Player!
            </p>

            {/* Formulir Input Nama */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleStartQuiz();
              }}
              className="w-full flex flex-col gap-3.5 mt-4"
            >
              <div className="flex flex-col text-left gap-1.5">
                <label
                  htmlFor="student-name-input"
                  className="text-[14px] font-black text-[#1F2937] flex items-center gap-1.5"
                >
                  <User className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Nama Lengkap / Panggilan:</span>
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Ketik namamu di sini..."
                  maxLength={25}
                  autoFocus
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-purple-50/70 border-2 border-purple-200 text-[#1F2937] text-[16px] font-black placeholder:text-gray-400 placeholder:font-semibold focus:outline-none focus:border-[#8B5CF6] focus:bg-white shadow-inner transition-all"
                />
              </div>

              {/* Info Timer & Leaderboard */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-center gap-2.5 text-left">
                <Timer className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span className="text-[13px] font-bold text-amber-900 leading-snug">
                  Waktu pengerjaan akan dihitung otomatis untuk memperebutkan posisi di <strong>Top 10 Best Player</strong>! ⚡
                </span>
              </div>

              {/* Tombol Mulai */}
              <button
                type="submit"
                className="clay-button-primary w-full py-3.5 px-4 font-black text-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-md mt-1 active:scale-95 transition-transform"
              >
                <span>Mulai Kuis & Hitung Waktu!</span>
                <ArrowRight className="w-5 h-5 text-yellow-200" />
              </button>

              {/* Pintasan Buka Papan Juara */}
              {onOpenLeaderboard && (
                <button
                  type="button"
                  onClick={() => {
                    sounds.playPop();
                    onOpenLeaderboard();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-purple-200"
                >
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>Lihat Papan Juara (Top 10 Tercepat)</span>
                </button>
              )}
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAHAP 2: MENGERJAKAN 10 SOAL ACAK + LIVE TIMER           */}
        {/* ======================================================== */}
        {step === "questions" && q && (
          <div className="p-5 flex flex-col items-center text-center overflow-y-auto">
            {/* Top Bar: Subtopic, Live Timer, and Student Name */}
            <div className="flex items-center justify-between w-full mb-2 gap-1.5 flex-wrap">
              {/* Subtopic */}
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] sm:text-[13px] font-bold text-[#8B5CF6] bg-[#EDE9FE] px-2.5 py-0.5 rounded-full border border-purple-200">
                  {q.subtext}
                </span>
                <span className="text-[12px] font-semibold text-gray-400">
                  #{q.id}
                </span>
              </div>

              {/* Live Stopwatch Timer Pill */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-800 font-black text-[13px] shadow-xs"
                title="Waktu pengerjaan kuis"
              >
                <Timer className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: "4s" }} />
                <span className="font-mono tracking-wider font-extrabold">{formatTime(secondsElapsed)}</span>
              </div>

              {/* Student Name */}
              <span className="text-[12px] sm:text-[13px] font-extrabold text-[#1F2937] bg-amber-100/90 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1 truncate max-w-[120px]">
                <User className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span className="truncate">{studentName || nameInput}</span>
              </span>
            </div>

            {/* Question Card */}
            <div className="my-2 py-4 px-5 bg-purple-50 rounded-[20px] border-2 border-purple-100 w-full shadow-inner">
              <p className="text-[22px] font-black text-[#1F2937] leading-snug">
                {q.question}
              </p>
            </div>

            <p className="text-[14px] font-semibold text-[#6B7280] mb-3">
              Pilih jawaban yang benar:
            </p>

            {/* 4 Choices Grid (2x2) */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {q.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isSuccess = isAnswered && opt.isCorrect;
                const isShake = shakeOptionId === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswered}
                    className={`min-h-[58px] p-3 rounded-[16px] font-black text-[18px] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 border-2 ${
                      isSuccess
                        ? "animate-correct-answer border-[#059669]"
                        : isShake
                        ? "bg-red-100 text-red-700 border-red-300 animate-bounce"
                        : isSelected
                        ? "bg-purple-100 text-[#8B5CF6] border-purple-300"
                        : "bg-white text-[#1F2937] border-purple-100 hover:border-purple-300 hover:scale-[0.98] active:scale-[0.98] shadow-sm"
                    }`}
                    aria-label={`Pilihan ${opt.id}: ${opt.label}`}
                  >
                    <span>{opt.label}</span>
                    {isSuccess && <CheckCircle className="w-5 h-5 fill-white text-[#10B981]" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation */}
            {isAnswered && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-[16px] text-emerald-800 text-[14px] font-bold flex items-center gap-2 w-full animate-in zoom-in-95 text-left">
                <Trophy className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>{q.explanation}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-4 w-full flex items-center gap-2">
              {isAnswered ? (
                <button
                  onClick={handleNext}
                  className="clay-button-primary w-full py-3.5 px-4 font-black text-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>
                    {currentIdx + 1 === questions.length ? "Lihat Hasil Akhir" : "Soal Berikutnya"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    sounds.playPop();
                    alert("Petunjuk: Baca angka dengan teliti atau gunakan teknik perkalian bertahap!");
                  }}
                  className="w-full py-3 px-4 rounded-full bg-purple-50 text-[#8B5CF6] font-bold text-[14px] flex items-center justify-center gap-1.5 hover:bg-purple-100 min-h-[48px] cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Butuh Bantuan?</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAHAP 3: HASIL AKHIR KUIS + WAKTU + PERINGKAT BEST PLAYER */}
        {/* ======================================================== */}
        {step === "completed" && (
          <div className="p-5 flex flex-col items-center text-center overflow-y-auto">
            <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-white shadow-lg mb-2 animate-bounce">
              <Trophy className="w-9 h-9 fill-white text-white drop-shadow" />
            </div>

            <h3 className="text-[22px] font-black text-[#1F2937] leading-tight">
              Hebat Sekali, {studentName || nameInput}! 🎉
            </h3>
            <p className="text-[14px] font-semibold text-[#6B7280] mt-0.5">
              Kamu berhasil menyelesaikan 10 soal tantangan matematika!
            </p>

            {/* Banner Khusus jika Masuk Top 10 Best Player */}
            {earnedRank !== null && (
              <div className="w-full mt-3 p-3 rounded-2xl bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 border-2 border-amber-400 text-amber-950 flex items-center gap-3 shadow-md text-left animate-in zoom-in-95">
                <div className="w-11 h-11 rounded-2xl bg-amber-400 text-amber-950 font-black flex items-center justify-center flex-shrink-0 text-[18px] shadow border border-amber-500">
                  #{earnedRank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-black text-amber-950 leading-tight flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Masuk Top 10 Best Player!</span>
                  </p>
                  <p className="text-[12px] font-semibold text-amber-800 leading-tight mt-0.5">
                    Waktu {formatTime(secondsElapsed)} berhasil membawamu ke Peringkat #{earnedRank}! 🚀
                  </p>
                </div>
              </div>
            )}

            {/* Piagam / Sertifikat Prestasi Siswa */}
            <div className="w-full bg-gradient-to-b from-amber-50/90 via-purple-50/40 to-white border-3 border-amber-300 rounded-[22px] p-4 my-3 shadow-md relative text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[12px] font-black uppercase tracking-wider mb-2 border border-amber-300 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>Sertifikat Prestasi • RaniaArchi</span>
              </div>

              <p className="text-[13px] font-bold text-[#6B7280]">
                Diberikan dengan bangga kepada:
              </p>

              {/* NAMA SISWA DITAMPILKAN DI AKHIR */}
              <h4 className="text-[24px] sm:text-[26px] font-black text-[#8B5CF6] tracking-tight my-1 drop-shadow-xs">
                {studentName || nameInput}
              </h4>

              <p className="text-[13px] font-semibold text-[#4B5563] max-w-[280px] mx-auto leading-snug">
                Siswa Berbakat Kelas 4 SD yang telah menuntaskan 10 Soal Acak Matematika!
              </p>

              {/* Statistik Hasil Kuis (4 Kolom Termasuk Waktu Stopwatch) */}
              <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-purple-200/60">
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-bold text-gray-500">Nilai</span>
                  <span className="text-[18px] font-black text-[#10B981]">
                    {Math.round((correctCount / questions.length) * 100)}
                  </span>
                </div>
                <div className="flex flex-col items-center border-l border-purple-200/60">
                  <span className="text-[11px] font-bold text-gray-500">Benar</span>
                  <span className="text-[18px] font-black text-[#8B5CF6]">
                    {correctCount}/{questions.length}
                  </span>
                </div>
                <div className="flex flex-col items-center border-l border-purple-200/60">
                  <span className="text-[11px] font-bold text-gray-500">Waktu</span>
                  <span className="text-[16px] font-black text-blue-600 font-mono">
                    {formatTime(secondsElapsed)}
                  </span>
                </div>
                <div className="flex flex-col items-center border-l border-purple-200/60">
                  <span className="text-[11px] font-bold text-gray-500">Bintang</span>
                  <span className="text-[17px] font-black text-amber-500 flex items-center gap-0.5">
                    +{correctCount} <Star className="w-3.5 h-3.5 fill-amber-500 inline" />
                  </span>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Akhir */}
            <div className="w-full space-y-2 mt-1">
              {onOpenLeaderboard && (
                <button
                  onClick={() => {
                    sounds.playPop();
                    onOpenLeaderboard();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-black text-[15px] flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md cursor-pointer border border-amber-300"
                >
                  <Crown className="w-5 h-5 text-amber-900 fill-amber-300" />
                  <span>Lihat Papan Juara (Top 10)</span>
                </button>
              )}

              <button
                onClick={() => {
                  sounds.playPop();
                  startNewSession();
                }}
                className="clay-button-primary w-full py-3 px-4 font-black text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Main Lagi (10 Soal Baru)</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  onClose();
                }}
                className="w-full py-2 px-4 rounded-full bg-purple-50 text-[#8B5CF6] font-bold text-[14px] flex items-center justify-center gap-1.5 hover:bg-purple-100 min-h-[40px] cursor-pointer"
              >
                <span>Kembali ke Beranda</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
