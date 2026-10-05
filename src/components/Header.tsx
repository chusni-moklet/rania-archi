"use client";

import React from "react";
import {
  Star,
  Flame,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Zap,
  Bot,
  Trophy,
  User,
  Crown,
} from "lucide-react";
import { sounds } from "./AudioEffects";

interface HeaderProps {
  streak: number;
  stars: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenStats?: () => void;
  onOpenQuiz?: () => void;
  onOpenTables?: () => void;
  onOpenAi?: () => void;
  onOpenProfile?: () => void;
  onOpenLeaderboard?: () => void;
}

export default function Header({
  streak,
  stars,
  isMuted,
  onToggleMute,
  onOpenStats,
  onOpenQuiz,
  onOpenTables,
  onOpenAi,
  onOpenProfile,
  onOpenLeaderboard,
}: HeaderProps) {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-purple-200/70 sticky top-0 z-30 shadow-xs">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        {/* Sisi Kiri: Logo & Nama Brand RaniaArchi */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#F59E0B] via-amber-400 to-[#FDE047] flex items-center justify-center shadow-md shadow-amber-500/25 text-white animate-star-twinkle flex-shrink-0">
            <Star className="w-4.5 h-4.5 sm:w-6 sm:h-6 fill-white text-white drop-shadow-sm" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[19px] sm:text-[22px] font-black tracking-tight text-[#1F2937] leading-none whitespace-nowrap">
              RaniaArchi
            </span>
            <span className="hidden sm:inline-flex text-[13px] font-bold text-[#8B5CF6] bg-[#EDE9FE] px-2.5 py-0.5 rounded-full items-center gap-1 border border-purple-200 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              Kelas 4 SD
            </span>
          </div>
        </div>

        {/* Tengah: Menu Navigasi Bersih & Rapi (Tampil di Layar Desktop >= 1280px) */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden xl:flex items-center gap-1 bg-purple-50/80 p-1 sm:p-1.5 rounded-full border border-purple-200/80 flex-shrink-0"
        >
          <button
            onClick={() => sounds.playPop()}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-full text-[13px] sm:text-[14px] font-black text-[#8B5CF6] bg-white shadow-xs cursor-pointer whitespace-nowrap"
          >
            Beranda
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenTables) onOpenTables();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-[13px] sm:text-[14px] font-bold text-[#4B5563] hover:text-[#1F2937] hover:bg-white/70 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
            <span>Tabel</span>
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenQuiz) onOpenQuiz();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-[13px] sm:text-[14px] font-bold text-[#4B5563] hover:text-[#1F2937] hover:bg-white/70 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
            <span>Kuis</span>
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenLeaderboard) onOpenLeaderboard();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-[13px] sm:text-[14px] font-bold text-[#4B5563] hover:text-[#1F2937] hover:bg-white/70 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
            <span>Best Player</span>
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenAi) onOpenAi();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-[13px] sm:text-[14px] font-bold text-[#4B5563] hover:text-[#1F2937] hover:bg-white/70 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
            <span>Tutor AI</span>
          </button>
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenStats) onOpenStats();
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-full text-[13px] sm:text-[14px] font-bold text-[#4B5563] hover:text-[#1F2937] hover:bg-white/70 transition-colors flex items-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />
            <span>Hadiah</span>
          </button>
        </nav>

        {/* Sisi Kanan: Status Gamifikasi Sejajar & Tombol Akses Cepat */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Lencana Streak */}
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenStats) onOpenStats();
            }}
            className="clay-pill-badge bg-white px-2 sm:px-2.5 py-1 min-h-[36px] sm:min-h-[44px] flex items-center gap-1 sm:gap-1.5 text-[#1F2937] hover:scale-95 active:scale-95 transition-transform cursor-pointer border border-amber-200 whitespace-nowrap"
            aria-label={`Streak: ${streak} hari`}
            title={`${streak} Hari Berturut-turut`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-inner flex-shrink-0">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
            </div>
            <span className="font-black text-[12px] sm:text-[14px] text-[#1F2937] whitespace-nowrap">
              {streak} <span className="hidden xs:inline">Hari</span>
            </span>
          </button>

          {/* Lencana Bintang */}
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenStats) onOpenStats();
            }}
            className="clay-pill-badge bg-white px-2 sm:px-2.5 py-1 min-h-[36px] sm:min-h-[44px] flex items-center gap-1 sm:gap-1.5 text-[#1F2937] hover:scale-95 active:scale-95 transition-transform cursor-pointer border border-yellow-200 whitespace-nowrap"
            aria-label={`Total: ${stars} bintang emas`}
            title={`${stars} Bintang Emas Terkumpul`}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-yellow-300 to-[#F59E0B] flex items-center justify-center text-white shadow-inner flex-shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
            </div>
            <span className="font-black text-[12px] sm:text-[14px] text-[#1F2937] whitespace-nowrap">
              {stars}
            </span>
          </button>

          {/* Tombol Cepat Papan Juara Best Player (Top 10) */}
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenLeaderboard) onOpenLeaderboard();
            }}
            className="w-9 h-9 min-h-[36px] min-w-[36px] sm:w-11 sm:h-11 sm:min-h-[44px] sm:min-w-[44px] rounded-full bg-amber-50 hover:bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm hover:scale-95 active:scale-95 transition-all cursor-pointer border border-amber-300 flex-shrink-0"
            aria-label="Buka menu Best Player Top 10"
            title="Papan Juara Best Player (Top 10)"
          >
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-600" />
          </button>

          {/* Sakelar Suara */}
          <button
            onClick={() => {
              onToggleMute();
              sounds.playPop();
            }}
            className="w-9 h-9 min-h-[36px] min-w-[36px] sm:w-11 sm:h-11 sm:min-h-[44px] sm:min-w-[44px] rounded-full bg-white flex items-center justify-center text-[#6B7280] hover:text-[#8B5CF6] shadow-sm hover:scale-95 active:scale-95 transition-all cursor-pointer border border-purple-200 flex-shrink-0"
            aria-label={isMuted ? "Nyalakan efek suara" : "Matikan efek suara"}
            title={isMuted ? "Nyalakan efek suara" : "Matikan efek suara"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6]" />
            )}
          </button>

          {/* Tombol Profil Siswa */}
          <button
            onClick={() => {
              sounds.playPop();
              if (onOpenProfile) onOpenProfile();
            }}
            className="w-9 h-9 min-h-[36px] min-w-[36px] sm:w-11 sm:h-11 sm:min-h-[44px] sm:min-w-[44px] rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md hover:scale-95 active:scale-95 transition-transform cursor-pointer flex-shrink-0"
            aria-label="Buka profil siswa"
            title="Profil Siswa"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
