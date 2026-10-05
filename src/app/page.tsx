"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import WelcomeHeroCard from "@/components/WelcomeHeroCard";
import LetsLearnGrid, { CardAction } from "@/components/LetsLearnGrid";
import DailyChallengeCard from "@/components/DailyChallengeCard";
import BottomTabBar, { TabId } from "@/components/BottomTabBar";
import QuizModal from "@/components/QuizModal";
import TablesModal from "@/components/TablesModal";
import AiHelperModal from "@/components/AiHelperModal";
import RewardsModal from "@/components/RewardsModal";
import { sounds } from "@/components/AudioEffects";
import { Sparkles, Trophy, Flame, Heart, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function HomeDashboard() {
  // Status Aplikasi
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [streak] = useState(5);
  const [stars, setStars] = useState(140);
  const [challengeProgress, setChallengeProgress] = useState(2);
  const [totalChallenge] = useState(10);
  const [isMuted, setIsMuted] = useState(false);
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("raniaarchi_student_name") || "Rania";
    }
    return "Rania";
  });

  const handleUpdateStudentName = (name: string) => {
    const trimmed = name.trim() || "Rania";
    setStudentName(trimmed);
    if (typeof window !== "undefined") {
      localStorage.setItem("raniaarchi_student_name", trimmed);
    }
  };

  // Status Modal & Dialog
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isTablesOpen, setIsTablesOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sounds.enabled = !nextMuted;
  };

  const handleCardSelect = (action: CardAction) => {
    switch (action) {
      case "tables":
        setIsTablesOpen(true);
        break;
      case "quiz":
        setIsQuizOpen(true);
        break;
      case "ai":
        setIsAiOpen(true);
        break;
      case "rewards":
        setIsRewardsOpen(true);
        break;
    }
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    if (tab === "home") {
      // Kembali ke beranda
    } else if (tab === "quiz") {
      setIsQuizOpen(true);
    } else if (tab === "rewards") {
      setIsRewardsOpen(true);
    } else if (tab === "profile") {
      setIsProfileOpen(true);
    }
  };

  const handleQuestionCompleted = () => {
    setStars((prev) => prev + 1);
    setChallengeProgress((prev) => {
      const nextVal = Math.min(totalChallenge, prev + 1);
      if (nextVal === totalChallenge && prev < totalChallenge) {
        setTimeout(() => {
          try {
            confetti({
              particleCount: 100,
              spread: 90,
              origin: { y: 0.5 },
            });
          } catch {
            // Fallback
          }
        }, 300);
      }
      return nextVal;
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#F3E8FF] flex flex-col justify-between selection:bg-purple-200">
      {/* 1. Header Website Responsif (RaniaArchi) */}
      <Header
        streak={streak}
        stars={stars}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenStats={() => setIsRewardsOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenTables={() => setIsTablesOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* 2. Konten Utama Dashboard Website */}
      <main
        className="max-w-6xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-4 sm:gap-8 flex-1 pb-24 md:pb-8"
        aria-label="Dashboard Utama RaniaArchi"
      >
        {/* Kartu Sambutan Utama (Hero Banner) dengan Nama Siswa */}
        <WelcomeHeroCard studentName={studentName} onStartClick={() => setIsQuizOpen(true)} />

        {/* Modul Pembelajaran Utama (Grid 2x2 di Mobile, 4 Kolom di Desktop) */}
        <LetsLearnGrid onSelectCard={handleCardSelect} />

        {/* Kartu Tantangan Harian (Wide Banner) */}
        <DailyChallengeCard
          current={challengeProgress}
          total={totalChallenge}
          onOpenChallenge={() => setIsQuizOpen(true)}
        />

        {/* 3. Fitur Tambahan Tampilan Website: Progres & Tips Matematika */}
        <section aria-label="Aktivitas Belajar & Tips Cepat" className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Widget 1: Kalender Streak Mingguan */}
          <div className="clay-card-surface p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Flame className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-black text-[#1F2937]">Streak 5 Hari</h3>
                  <p className="text-[13px] sm:text-[14px] font-semibold text-[#6B7280]">Target Belajar Minggu Ini</p>
                </div>
              </div>
              <span className="text-[13px] sm:text-[14px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Aktif 🔥
              </span>
            </div>

            {/* Hari-hari dalam seminggu */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center my-2">
              {[
                { day: "Sen", done: true },
                { day: "Sel", done: true },
                { day: "Rab", done: true },
                { day: "Kam", done: true },
                { day: "Jum", done: true },
                { day: "Sab", done: false },
                { day: "Min", done: false },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-1.5 sm:p-2 rounded-xl flex flex-col items-center gap-1 border ${
                    item.done
                      ? "bg-purple-100/80 border-purple-300 text-[#8B5CF6]"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  <span className="text-[12px] sm:text-[14px] font-bold">{item.day}</span>
                  {item.done ? (
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10B981]" />
                  ) : (
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-gray-300" />
                  )}
                </div>
              ))}
            </div>

            <p className="text-[13px] sm:text-[14px] font-semibold text-[#6B7280] mt-1.5 sm:mt-2">
              Belajar 2 hari lagi untuk memecahkan rekor mingguanmu! ⭐
            </p>
          </div>

          {/* Widget 2: Tips Kilat Rumus Kelas 4 */}
          <div className="clay-card-surface p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Lightbulb className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-black text-[#1F2937]">Tips Kilat Hari Ini</h3>
                  <span className="text-[13px] sm:text-[14px] font-bold text-amber-700 bg-amber-100 px-2 py-0.2 rounded-full">
                    Geometri Kelas 4
                  </span>
                </div>
              </div>
              <div className="bg-amber-50/70 p-2.5 sm:p-3 rounded-xl border border-amber-200/60 mt-1.5 sm:mt-2">
                <p className="text-[14px] sm:text-[15px] font-extrabold text-[#1F2937]">
                  Keliling Persegi = 4 × Sisi
                </p>
                <p className="text-[13px] sm:text-[14px] font-medium text-[#4B5563] mt-1">
                  Jika sisi persegi = 6 cm, kelilingnya adalah 4 × 6 = <strong className="text-amber-700">24 cm</strong>!
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsTablesOpen(true)}
              className="mt-2.5 sm:mt-3 text-[13px] sm:text-[14px] font-bold text-[#8B5CF6] hover:text-[#7C3AED] flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Modul Hafalan Tabel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Widget 3: Info Bank Soal & Tantangan */}
          <div className="clay-card-surface p-4 sm:p-5 flex flex-col justify-between bg-gradient-to-br from-white to-purple-50/40">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Trophy className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-black text-[#1F2937]">Bank 100 Soal</h3>
                  <p className="text-[13px] sm:text-[14px] font-semibold text-[#6B7280]">Kurikulum Matematika SD</p>
                </div>
              </div>

              <div className="space-y-1 sm:space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-[13px] sm:text-[14px] font-bold">
                  <span className="text-[#6B7280]">Soal Perkalian & Pembagian:</span>
                  <span className="text-[#1F2937]">40 Soal</span>
                </div>
                <div className="flex items-center justify-between text-[13px] sm:text-[14px] font-bold">
                  <span className="text-[#6B7280]">Pecahan & Desimal:</span>
                  <span className="text-[#1F2937]">15 Soal</span>
                </div>
                <div className="flex items-center justify-between text-[13px] sm:text-[14px] font-bold">
                  <span className="text-[#6B7280]">Geometri, Waktu & Cerita:</span>
                  <span className="text-[#1F2937]">45 Soal</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="clay-button-primary w-full py-2.5 sm:py-3 px-4 font-black text-[14px] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm mt-3 active:scale-95 transition-transform"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Mulai 10 Soal Acak</span>
            </button>
          </div>
        </section>
      </main>

      {/* 4. Bilah Navigasi Bawah / Footer Website */}
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 5. Modal-Modal Interaktif */}
      {isQuizOpen && (
        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => {
            setIsQuizOpen(false);
            setActiveTab("home");
          }}
          onQuestionCompleted={handleQuestionCompleted}
          studentName={studentName}
          onUpdateStudentName={handleUpdateStudentName}
        />
      )}

      <TablesModal
        isOpen={isTablesOpen}
        onClose={() => setIsTablesOpen(false)}
      />

      <AiHelperModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      <RewardsModal
        isOpen={isRewardsOpen}
        stars={stars}
        onClose={() => {
          setIsRewardsOpen(false);
          setActiveTab("home");
        }}
      />

      {/* Dialog Profil Siswa */}
      {isProfileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-2xl border-4 border-purple-200 p-6 flex flex-col items-center text-center relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                sounds.playPop();
                setIsProfileOpen(false);
                setActiveTab("home");
              }}
              className="absolute top-4 right-4 w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-purple-50 text-[#8B5CF6] hover:bg-purple-100 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Tutup profil"
            >
              ✕
            </button>

            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-amber-400 p-1 mb-2 shadow-lg flex-shrink-0">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl">
                🦁
              </div>
            </div>

            <h2 id="profile-title" className="text-[22px] font-black text-[#1F2937]">
              {studentName} • RaniaArchi
            </h2>
            <span className="text-[13px] font-bold text-[#8B5CF6] bg-[#EDE9FE] px-3.5 py-0.5 rounded-full mt-1 border border-purple-200">
              Kelas 4 SD • Bintang Prestasi Level 8
            </span>

            {/* Input Ubah Nama Siswa */}
            <div className="w-full mt-4 text-left">
              <label htmlFor="profile-name-input" className="text-[13px] font-black text-[#1F2937] mb-1 block">
                Ganti Nama Siswa:
              </label>
              <input
                id="profile-name-input"
                type="text"
                value={studentName}
                onChange={(e) => handleUpdateStudentName(e.target.value)}
                placeholder="Ketik namamu..."
                maxLength={30}
                className="w-full px-3.5 py-2.5 rounded-xl bg-purple-50/70 border-2 border-purple-200 text-[#1F2937] text-[15px] font-bold focus:outline-none focus:border-[#8B5CF6] focus:bg-white shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 w-full my-4">
              <div className="p-3 bg-purple-50 rounded-[18px] border border-purple-100 flex flex-col items-center">
                <Flame className="w-5 h-5 text-orange-500 mb-1" />
                <span className="text-[18px] font-black text-[#1F2937]">{streak} Hari</span>
                <span className="text-[13px] font-bold text-gray-500">Streak Belajar</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-[18px] border border-amber-100 flex flex-col items-center">
                <Trophy className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-[18px] font-black text-[#1F2937]">{stars} Bintang</span>
                <span className="text-[13px] font-bold text-gray-500">Peti Bintang</span>
              </div>
            </div>

            <div className="w-full p-3.5 rounded-[18px] bg-emerald-50 border border-emerald-100 text-left flex items-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-[13px] font-bold text-emerald-800 leading-snug">
                Luar biasa, {studentName}! Kamu telah menyelesaikan 14 soal kuis matematika minggu ini!
              </span>
            </div>

            <button
              onClick={() => {
                sounds.playPop();
                setIsProfileOpen(false);
                setActiveTab("home");
              }}
              className="clay-button-primary w-full py-3 px-4 font-black text-[15px] cursor-pointer"
            >
              Simpan & Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
