"use client";

import React from "react";
import { Grid3X3, Zap, Bot, Trophy, ArrowUpRight } from "lucide-react";
import { sounds } from "./AudioEffects";

export type CardAction = "tables" | "quiz" | "ai" | "rewards";

interface LetsLearnGridProps {
  onSelectCard: (action: CardAction) => void;
}

export default function LetsLearnGrid({ onSelectCard }: LetsLearnGridProps) {
  const cards = [
    {
      id: "tables" as CardAction,
      title: "Tabel",
      subtext: "Perkalian Lengkap",
      desc: "Latihan hafalan tabel perkalian 2 sampai 12 secara terstruktur.",
      badge: "×2 sampai ×12",
      icon: Grid3X3,
      theme: {
        bgPastel: "bg-blue-50",
        iconBg: "bg-[#DBEAFE]",
        iconColor: "text-[#2563EB]",
        borderColor: "border-blue-200",
        badgeBg: "bg-blue-100 text-blue-700",
        ringColor: "focus-visible:ring-blue-500",
      },
    },
    {
      id: "quiz" as CardAction,
      title: "Kuis Harian",
      subtext: "10 Soal Acak",
      desc: "Uji kecepatan dan ketelitianmu dengan 10 soal acak dari 100 bank soal.",
      badge: "10 dari 100 Soal",
      icon: Zap,
      theme: {
        bgPastel: "bg-amber-50",
        iconBg: "bg-[#FEF3C7]",
        iconColor: "text-[#D97706]",
        borderColor: "border-amber-200",
        badgeBg: "bg-amber-100 text-amber-800",
        ringColor: "focus-visible:ring-amber-500",
      },
    },
    {
      id: "ai" as CardAction,
      title: "Tutor AI",
      subtext: "Teman Belajar 24 Jam",
      desc: "Dapatkan penjelasan langkah visual untuk pecahan, porogapit, & trik kilat.",
      badge: "Bantuan Instan",
      icon: Bot,
      theme: {
        bgPastel: "bg-emerald-50",
        iconBg: "bg-[#D1FAE5]",
        iconColor: "text-[#059669]",
        borderColor: "border-emerald-200",
        badgeBg: "bg-emerald-100 text-emerald-800",
        ringColor: "focus-visible:ring-emerald-500",
      },
    },
    {
      id: "rewards" as CardAction,
      title: "Peti Hadiah",
      subtext: "Bintang & Lencana",
      desc: "Kumpulkan bintang emas dan buka lencana jagoan matematika kelas 4.",
      badge: "128 Bintang",
      icon: Trophy,
      theme: {
        bgPastel: "bg-pink-50",
        iconBg: "bg-[#FCE7F3]",
        iconColor: "text-[#DB2777]",
        borderColor: "border-pink-200",
        badgeBg: "bg-pink-100 text-pink-700",
        ringColor: "focus-visible:ring-pink-500",
      },
    },
  ];

  const handleCardClick = (id: CardAction) => {
    sounds.playPop();
    onSelectCard(id);
  };

  return (
    <section aria-labelledby="lets-learn-heading" className="w-full">
      {/* Header Bagian */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2
            id="lets-learn-heading"
            className="text-[20px] sm:text-[24px] font-black text-[#1F2937] tracking-tight flex items-center gap-2"
          >
            <span>Yuk, Belajar!</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] inline-block animate-ping" />
          </h2>
          <p className="text-[13px] sm:text-[14px] font-semibold text-[#6B7280]">
            Pilih modul pembelajaran favoritmu hari ini
          </p>
        </div>
        <span className="hidden sm:inline-flex text-[13px] sm:text-[14px] font-bold text-[#8B5CF6] bg-[#EDE9FE] px-3.5 py-1.5 rounded-full border border-purple-200 shadow-2xs">
          Matematika Kelas 4 SD
        </span>
      </div>

      {/* Grid 4 Kolom (2x2 di ponsel, 4 kolom di desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`clay-card-surface p-3.5 sm:p-5 text-left flex flex-col justify-between min-h-[145px] sm:min-h-[170px] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 ${card.theme.ringColor}`}
              aria-label={`${card.title}: ${card.subtext}`}
            >
              {/* Baris Atas: Ikon dan tombol navigasi panah */}
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl ${card.theme.iconBg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className={`w-5 h-5 sm:w-7 sm:h-7 ${card.theme.iconColor}`} />
                </div>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#8B5CF6] group-hover:bg-purple-50 group-hover:scale-105 transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Konten Tengah & Bawah */}
              <div className="mt-2.5 sm:mt-4">
                <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                  <h3 className="text-[16px] sm:text-[20px] font-black text-[#1F2937] leading-tight group-hover:text-[#8B5CF6] transition-colors">
                    {card.title}
                  </h3>
                </div>
                <p className="text-[12px] sm:text-[15px] font-bold text-[#4B5563] leading-snug">
                  {card.subtext}
                </p>
                <p className="hidden md:block text-[14px] font-medium text-[#6B7280] leading-relaxed mt-1.5 line-clamp-2">
                  {card.desc}
                </p>
                <div className="mt-2 sm:mt-3">
                  <span
                    className={`inline-block text-[11px] sm:text-[13px] font-extrabold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${card.theme.badgeBg}`}
                  >
                    {card.badge}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
