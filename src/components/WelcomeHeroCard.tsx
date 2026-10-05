"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Wand2, Zap } from "lucide-react";
import { sounds } from "./AudioEffects";
import confetti from "canvas-confetti";

interface WelcomeHeroCardProps {
  studentName?: string;
  onStartClick: () => void;
}

const MASCOT_QUOTES = [
  "Ketuk aku! Kamu jagoan matematika! 🧙‍♂️",
  "Tahukah kamu? 8 × 7 = 56! Ajaib! ✨",
  "Siap taklukkan 10 soal kuis hari ini? 🚀",
  "Tos dulu, bintang hebat! ⭐",
  "Matematika adalah kekuatan supermu! 💥",
];

export default function WelcomeHeroCard({ studentName, onStartClick }: WelcomeHeroCardProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);

  const handleMascotTap = () => {
    sounds.playPop();
    setIsWaving(true);
    setQuoteIndex((prev) => (prev + 1) % MASCOT_QUOTES.length);
    setTimeout(() => setIsWaving(false), 600);
  };

  const handleStartAdventure = () => {
    sounds.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.4 },
        colors: ["#8B5CF6", "#F59E0B", "#10B981", "#EC4899"],
      });
    } catch {
      // Confetti fallback
    }
    onStartClick();
  };

  return (
    <section 
      aria-label="Bagian Sambutan" 
      className="w-full"
    >
      <div className="clay-card-hero p-5 sm:p-7 md:p-10 text-white relative">
        {/* Soft background light spots for depth */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-400/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 relative z-10">
          {/* Teks dan Tombol Aksi */}
          <div className="flex-1 text-center md:text-left w-full">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-yellow-200 text-[12px] sm:text-[14px] font-extrabold mb-2 sm:mb-3 shadow-inner border border-white/20">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
              <span>Petualangan Kelas 4 • RaniaArchi</span>
            </div>

            <h1 className="text-[24px] sm:text-[32px] md:text-[38px] font-black tracking-tight leading-tight drop-shadow-sm text-white">
              Halo, {studentName ? `${studentName}!` : "Bintang Matematika!"}
            </h1>

            <p className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-purple-100 mt-1.5 sm:mt-2 max-w-xl leading-relaxed">
              Siap belajar hal seru dan ajaib hari ini? Taklukkan 10 soal kuis acak dari 100 bank soal dan raih lencana bintang emasmu!
            </p>

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 sm:gap-3">
              <button
                onClick={handleStartAdventure}
                className="clay-button-white w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 font-black text-[15px] sm:text-[17px] text-[#7C3AED] hover:bg-purple-50 cursor-pointer shadow-xl active:scale-95 transition-transform"
                aria-label="Mulai kuis matematika 10 soal sekarang"
              >
                <span>Mulai Belajar Sekarang!</span>
                <ArrowRight className="w-5 h-5 text-[#8B5CF6]" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-xs text-purple-100 text-[13px] sm:text-[14px] font-bold">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />
                <span>10 Soal Acak Cepat</span>
              </div>
            </div>
          </div>

          {/* Maskot 3D Interaktif dengan Gelembung Bicara */}
          <div className="relative flex flex-col items-center flex-shrink-0 mt-2 md:mt-0 w-full md:w-auto">
            <div className="flex flex-row md:flex-col items-center justify-center gap-3 sm:gap-4 w-full">
              {/* Tombol Maskot */}
              <button
                type="button"
                onClick={handleMascotTap}
                className={`relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 flex-shrink-0 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-purple-300 to-white shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${
                  isWaving ? "rotate-6 scale-110" : "animate-gentle-float"
                }`}
                aria-label="Maskot Bintang RaniaArchi - Ketuk untuk tips"
                title="Ketuk maskot untuk tips seru!"
              >
                <div className="w-full h-full rounded-full overflow-hidden relative bg-[#8B5CF6]/30 border-2 sm:border-3 border-white shadow-inner">
                  <Image
                    src="/mascot.jpg"
                    alt="Maskot 3D Bintang Matematika yang ceria memakai toga dan kacamata"
                    width={144}
                    height={144}
                    priority
                    className="w-full h-full object-cover select-none"
                  />
                </div>
              </button>

              {/* Gelembung Kata Maskot */}
              <div className="flex flex-col items-start md:items-center text-left md:text-center">
                <div className="bg-white text-[#1F2937] text-[13px] sm:text-[14px] md:text-[15px] font-black px-3.5 py-2 rounded-2xl shadow-lg border-2 border-purple-200 max-w-[210px] sm:max-w-[240px]">
                  <div className="flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                    <span>{MASCOT_QUOTES[quoteIndex]}</span>
                  </div>
                </div>
                <span className="text-[12px] sm:text-[14px] font-bold text-purple-200 mt-1 pl-1 md:pl-0">
                  Ketuk maskot untuk semangat! ⭐
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
