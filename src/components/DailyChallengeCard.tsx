"use client";

import React from "react";
import { Star, ChevronRight, CheckCircle2, Award } from "lucide-react";
import { sounds } from "./AudioEffects";

interface DailyChallengeCardProps {
  current: number;
  total: number;
  onOpenChallenge: () => void;
}

export default function DailyChallengeCard({
  current,
  total,
  onOpenChallenge,
}: DailyChallengeCardProps) {
  const percentage = Math.min(100, Math.round((current / total) * 100));
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleClick = () => {
    sounds.playPop();
    onOpenChallenge();
  };

  return (
    <section aria-labelledby="daily-challenge-heading" className="w-full">
      <div className="clay-card-challenge p-4 sm:p-6 md:p-7 text-white relative overflow-hidden">
        {/* Soft background glow & shapes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-8 left-1/3 w-36 h-36 bg-amber-600/20 rounded-full blur-lg pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 relative z-10">
          {/* Kolom Kiri: Indikator Progres Melingkar + Teks */}
          <div className="flex items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            {/* Indikator Progres Melingkar */}
            <div className="relative flex-shrink-0 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 72 72">
                {/* Background Track */}
                <circle
                  cx="36"
                  cy="36"
                  r={radius}
                  className="stroke-amber-900/30"
                  strokeWidth="7"
                  fill="transparent"
                />
                {/* Progress Bar */}
                <circle
                  cx="36"
                  cy="36"
                  r={radius}
                  className="stroke-white transition-all duration-700 ease-out"
                  strokeWidth="7"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Konten Tengah: current/total */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[16px] sm:text-[20px] font-black text-white leading-none tracking-tight drop-shadow-sm">
                  {current}/{total}
                </span>
                <span className="text-[10px] sm:text-[13px] font-extrabold text-amber-100 uppercase tracking-wider leading-none mt-0.5 sm:mt-1">
                  Selesai
                </span>
              </div>
            </div>

            {/* Informasi Teks */}
            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-amber-100 mb-0.5 sm:mb-1">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/25 flex items-center justify-center">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-200 text-yellow-200" />
                </div>
                <span className="text-[12px] sm:text-[14px] font-black uppercase tracking-wider text-amber-100">
                  Tantangan Harian Spesial
                </span>
              </div>

              <h3
                id="daily-challenge-heading"
                className="text-[16px] sm:text-[20px] font-black leading-snug text-white drop-shadow-sm"
              >
                Selesaikan {total} soal untuk mendapatkan Bintang Emas & Lencana!
              </h3>

              <p className="text-[12px] sm:text-[14px] font-semibold text-amber-100 mt-0.5 sm:mt-1">
                {current >= total
                  ? "Luar biasa! Kamu sudah menyelesaikan seluruh misi tantangan hari ini!"
                  : `Tinggal ${total - current} soal lagi untuk mengklaim hadiah spesial hari ini.`}
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Tombol Aksi & Hadiah */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-shrink-0">
            <div className="hidden lg:flex flex-col items-end mr-2">
              <span className="text-[14px] font-bold text-amber-100">Hadiah Selesai:</span>
              <span className="text-[15px] font-black text-white flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-200" /> +50 XP & 1 ⭐ Emas
              </span>
            </div>

            <button
              onClick={handleClick}
              className="clay-button-white w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 text-[15px] sm:text-[16px] font-black text-[#D97706] inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:bg-amber-50 active:scale-95 transition-transform"
              aria-label={`Mulai tantangan harian. Progres: ${current} dari ${total} soal selesai`}
            >
              {current >= total ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  <span>Misi Selesai!</span>
                </>
              ) : (
                <>
                  <span>Mulai Kerjakan Soal</span>
                  <ChevronRight className="w-5 h-5 text-[#D97706]" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
