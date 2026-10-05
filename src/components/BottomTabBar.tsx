"use client";

import React from "react";
import { Home, Zap, Trophy, User, Sparkles } from "lucide-react";
import { sounds } from "./AudioEffects";

export type TabId = "home" | "quiz" | "rewards" | "profile";

interface BottomTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function BottomTabBar({
  activeTab,
  onTabChange,
}: BottomTabBarProps) {
  const tabs = [
    { id: "home" as TabId, label: "Beranda", icon: Home },
    { id: "quiz" as TabId, label: "Kuis", icon: Zap },
    { id: "rewards" as TabId, label: "Hadiah", icon: Trophy },
    { id: "profile" as TabId, label: "Profil", icon: User },
  ];

  const handleTabClick = (tabId: TabId) => {
    sounds.playPop();
    onTabChange(tabId);
  };

  return (
    <>
      {/* 1. Mobile Fixed Tab Bar (Hanya tampil di layar ponsel < md) */}
      <nav
        aria-label="Bilah Navigasi Bawah Ponsel"
        className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md border-t border-purple-200/80 shadow-[0_-6px_20px_rgba(139,92,246,0.12)] py-1.5 px-3 z-40"
      >
        <ul className="flex items-center justify-around gap-1 max-w-[420px] mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <li key={tab.id} className="flex-1 flex justify-center">
                <button
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 rounded-2xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                    isActive
                      ? "bg-[#EDE9FE] text-[#8B5CF6] font-black"
                      : "text-[#6B7280] hover:text-[#1F2937] hover:bg-purple-50 font-bold"
                  }`}
                  aria-label={tab.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive ? "bg-[#8B5CF6] text-white shadow-md shadow-purple-500/30" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4 transition-transform" />
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-extrabold leading-tight mt-1 text-center whitespace-nowrap">
                    {tab.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 2. Desktop & Tablet Website Footer (Tampil di layar >= md) */}
      <footer className="hidden md:block w-full border-t border-purple-200/60 bg-white/60 backdrop-blur-xs mt-10 py-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#1F2937]">
            <span className="text-[18px] font-black text-[#8B5CF6]">RaniaArchi</span>
            <span className="text-[#6B7280] text-[14px] font-semibold">
              • Website Petualangan Belajar Matematika Anak Kelas 4 SD
            </span>
          </div>

          <div className="flex items-center gap-4 text-[14px] font-bold text-[#6B7280]">
            <button
              onClick={() => handleTabClick("home")}
              className="hover:text-[#8B5CF6] transition-colors cursor-pointer"
            >
              Beranda
            </button>
            <span>•</span>
            <button
              onClick={() => handleTabClick("quiz")}
              className="hover:text-[#8B5CF6] transition-colors cursor-pointer"
            >
              Kuis 10 Soal
            </button>
            <span>•</span>
            <button
              onClick={() => handleTabClick("rewards")}
              className="hover:text-[#8B5CF6] transition-colors cursor-pointer"
            >
              Peti Hadiah
            </button>
            <span>•</span>
            <button
              onClick={() => handleTabClick("profile")}
              className="hover:text-[#8B5CF6] transition-colors cursor-pointer"
            >
              Profil Siswa
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#8B5CF6] bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>Semangat Belajar, Juara!</span>
          </div>
        </div>
      </footer>
    </>
  );
}
