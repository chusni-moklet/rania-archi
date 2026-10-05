"use client";

import React from "react";
import { X, Trophy, Star, Award, Zap, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { sounds } from "./AudioEffects";

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
}

export default function RewardsModal({
  isOpen,
  onClose,
  stars,
}: RewardsModalProps) {
  if (!isOpen) return null;

  const badges = [
    {
      title: "Jagoan Perkalian",
      desc: "Kuasai tabel perkalian 1 sampai 10",
      icon: Zap,
      color: "from-amber-400 to-yellow-500",
      unlocked: true,
    },
    {
      title: "Pahlawan 5 Hari",
      desc: "Belajar 5 hari berturut-turut",
      icon: Star,
      color: "from-purple-500 to-indigo-600",
      unlocked: true,
    },
    {
      title: "Pakar Pembagian",
      desc: "Selesaikan 20 teka-teki pembagian",
      icon: Award,
      color: "from-pink-500 to-rose-600",
      unlocked: true,
    },
    {
      title: "Penyihir Pecahan",
      desc: "Selesaikan 10 kuis pecahan",
      icon: ShieldCheck,
      color: "from-emerald-400 to-teal-500",
      unlocked: false,
    },
  ];

  const handleCelebrate = () => {
    sounds.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rewards-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-[390px] bg-white rounded-[24px] shadow-2xl border-4 border-pink-200 overflow-hidden relative flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h2 id="rewards-modal-title" className="text-[18px] font-black leading-none">
                Peti Bintangmu
              </h2>
              <p className="text-[14px] text-pink-200 font-semibold mt-1">
                Piala & Lencana Matematika
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 cursor-pointer transition-colors"
            aria-label="Tutup hadiah"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Penghitung Bintang */}
        <div className="p-4 bg-gradient-to-b from-amber-50 to-white text-center border-b border-amber-100">
          <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-1.5 rounded-full mb-1">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            <span className="text-[20px] font-black text-amber-900">{stars} Bintang Emas</span>
          </div>
          <p className="text-[14px] font-semibold text-[#6B7280]">
            Terus selesaikan soal untuk membuka avatar baru!
          </p>
        </div>

        {/* Daftar Lencana */}
        <div className="p-4 overflow-y-auto space-y-3">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                onClick={handleCelebrate}
                className={`p-3.5 rounded-[18px] border-2 flex items-center gap-3 transition-transform cursor-pointer hover:scale-[0.99] active:scale-[0.98] ${
                  b.unlocked
                    ? "bg-white border-pink-100 shadow-sm"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-[16px] bg-gradient-to-tr ${b.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[16px] font-black text-[#1F2937] leading-tight">
                      {b.title}
                    </h3>
                    <span
                      className={`text-[14px] font-black px-2.5 py-0.5 rounded-full ${
                        b.unlocked ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {b.unlocked ? "TERBUKA" : "TERKUNCI"}
                    </span>
                  </div>
                  <p className="text-[14px] font-semibold text-[#6B7280] mt-0.5">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-pink-50 border-t border-pink-100 flex items-center justify-between">
          <span className="text-[14px] font-bold text-pink-900">
            Lencana baru dalam 12 Bintang lagi! ⭐
          </span>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="clay-button-primary px-5 py-2.5 font-bold text-[14px] min-h-[48px]"
          >
            Keren!
          </button>
        </div>
      </div>
    </div>
  );
}
