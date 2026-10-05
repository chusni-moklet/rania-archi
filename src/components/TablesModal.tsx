"use client";

import React, { useState } from "react";
import { X, Sparkles, BookOpen, Volume2 } from "lucide-react";
import { sounds } from "./AudioEffects";

interface TablesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TablesModal({ isOpen, onClose }: TablesModalProps) {
  const [selectedTable, setSelectedTable] = useState(7);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tables-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-[390px] bg-white rounded-[24px] shadow-2xl border-4 border-blue-200 overflow-hidden relative flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="tables-modal-title" className="text-[18px] font-black leading-none">
                Tabel Perkalian
              </h2>
              <p className="text-[14px] text-blue-200 font-semibold mt-1">
                Latihan Cepat Kelas 4
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 cursor-pointer transition-colors"
            aria-label="Tutup tabel perkalian"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pemilih Angka (Pills) */}
        <div className="px-5 pt-4 pb-2 border-b border-gray-100">
          <p className="text-[14px] font-bold text-[#6B7280] mb-2">
            Pilih tabel yang ingin kamu kuasai:
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <button
                key={num}
                onClick={() => {
                  sounds.playPop();
                  setSelectedTable(num);
                }}
                className={`min-w-[48px] h-[48px] rounded-full font-black text-[16px] transition-all flex items-center justify-center cursor-pointer ${
                  selectedTable === num
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105"
                    : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                }`}
                aria-label={`Tabel perkalian ${num}`}
              >
                ×{num}
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Perkalian */}
        <div className="p-5 overflow-y-auto space-y-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((multiplier) => {
            const result = selectedTable * multiplier;
            return (
              <div
                key={multiplier}
                onClick={() => sounds.playPop()}
                className="flex items-center justify-between p-3 rounded-[16px] bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-200 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[14px] font-bold text-gray-500">
                    {multiplier}
                  </span>
                  <span className="text-[17px] font-extrabold text-[#1F2937]">
                    {selectedTable} × {multiplier} =
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-black text-blue-600 bg-white px-3 py-1 rounded-full shadow-inner border border-blue-100">
                    {result}
                  </span>
                  <Volume2 className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Catatan Kaki */}
        <div className="p-4 bg-blue-50 border-t border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[14px] font-bold text-blue-800">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Latihan 2 menit sehari untuk raih lencana bintang!</span>
          </div>
          <button
            onClick={() => {
              sounds.playSuccess();
              onClose();
            }}
            className="clay-button-primary px-5 py-2.5 font-bold text-[14px] min-h-[48px]"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
