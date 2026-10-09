"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Trophy,
  Timer,
  Crown,
  Zap,
  ArrowRight,
  RefreshCw,
  Globe2,
  Database,
} from "lucide-react";
import { sounds } from "./AudioEffects";
import {
  LeaderboardEntry,
  getLeaderboard,
  fetchLeaderboard,
  formatTime,
  isOnlineMode,
} from "@/data/leaderboard";

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
  currentStudentName?: string;
}

export default function LeaderboardModal({
  isOpen,
  onClose,
  onStartQuiz,
  currentStudentName,
}: LeaderboardModalProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => getLeaderboard());
  const [isLoading, setIsLoading] = useState(false);
  const online = isOnlineMode();

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const updateData = () => {
      setIsLoading(true);
      fetchLeaderboard()
        .then((data) => {
          if (!ignore) {
            setLeaderboard(data);
          }
        })
        .finally(() => {
          if (!ignore) {
            setIsLoading(false);
          }
        });
    };

    if (isOpen) {
      updateData();
    }

    window.addEventListener("raniaarchi_leaderboard_updated", updateData);
    window.addEventListener("storage", updateData);
    return () => {
      ignore = true;
      window.removeEventListener("raniaarchi_leaderboard_updated", updateData);
      window.removeEventListener("storage", updateData);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];
  const rest = leaderboard.slice(3, 10);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="leaderboard-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-[480px] bg-white rounded-[26px] shadow-2xl border-4 border-purple-200 overflow-hidden relative flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] px-5 py-4 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/30 border border-yellow-300/40 flex items-center justify-center shadow-inner flex-shrink-0 animate-star-twinkle">
              <Trophy className="w-6 h-6 text-yellow-300 fill-yellow-300 drop-shadow" />
            </div>
            <div>
              <h2
                id="leaderboard-modal-title"
                className="text-[19px] sm:text-[21px] font-black leading-tight flex items-center gap-1.5"
              >
                <span>Papan Juara Tercepat</span>
                <Crown className="w-4 h-4 text-yellow-300 fill-yellow-300 inline" />
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-[12px] text-purple-200 font-bold whitespace-nowrap">
                  Top 10 Pemain • Skor, Kesalahan & Waktu
                </span>
                {online ? (
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-400/40 shadow-xs whitespace-nowrap flex-shrink-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <Globe2 className="w-3 h-3 text-emerald-400" />
                    <span>Title Race</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-yellow-200 bg-yellow-950/40 px-2 py-0.2 rounded-full border border-yellow-400/30 whitespace-nowrap flex-shrink-0">
                    <Database className="w-3 h-3 text-yellow-400" />
                    <span>Mode Lokal</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 cursor-pointer transition-colors"
            aria-label="Tutup papan peringkat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Konten Scrollable */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {/* Info Banner Rekor & Refresh */}
          <div className="p-3 bg-gradient-to-r from-amber-50 to-purple-50 rounded-2xl border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                <Timer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Rekor Juara Saat Ini
                </span>
                {top1 ? (
                  <span className="text-[14px] sm:text-[15px] font-black text-[#8B5CF6]">
                    {top1.name} ({formatTime(top1.timeSeconds)} • {top1.wrongCount ?? 0} Salah)
                  </span>
                ) : (
                  <span className="text-[13px] font-bold text-gray-400">
                    Belum ada rekor tercatat
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sounds.playPop();
                  handleRefresh();
                }}
                disabled={isLoading}
                title="Segarkan data peringkat dari cloud database"
                className="text-[12px] font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-full border border-purple-200 shadow-2xs hover:bg-purple-50 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin text-purple-600" : ""}`} />
                <span>Segarkan</span>
              </button>
            </div>
          </div>

          {/* LOADING SKELETON / INDIKATOR */}
          {isLoading && leaderboard.length === 0 ? (
            <div className="py-12 px-5 flex flex-col items-center text-center bg-purple-50/50 rounded-2xl border-2 border-dashed border-purple-200 my-2">
              <RefreshCw className="w-8 h-8 text-purple-600 animate-spin mb-3" />
              <h3 className="text-[17px] font-black text-[#1F2937]">Menghubungkan ke Papan Juara Online...</h3>
              <p className="text-[12px] font-semibold text-[#6B7280] mt-1">
                Mengambil data pemain tercepat langsung dari Cloud Database...
              </p>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="py-10 px-5 flex flex-col items-center text-center bg-purple-50/50 rounded-2xl border-2 border-dashed border-purple-200 my-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl mb-3 shadow-inner">
                🏆
              </div>
              <h3 className="text-[18px] font-black text-[#1F2937]">Papan Juara Masih Kosong!</h3>
              <p className="text-[13px] font-semibold text-[#6B7280] max-w-xs mt-1 leading-relaxed">
                Belum ada siswa yang tercatat di papan peringkat. Mulai kuis sekarang dan jadilah Juara #1! 🚀
              </p>
            </div>
          ) : (
            <>
              {/* Podium Top 3 (1st, 2nd, 3rd) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 items-end pt-3 pb-1">
                {/* Rank 2 (Perak) */}
                {top2 ? (
                  <div className={`flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-slate-50 border-2 text-center shadow-xs transition-all ${
                    currentStudentName &&
                    top2.name.toLowerCase().trim() === currentStudentName.toLowerCase().trim()
                      ? "border-purple-400 bg-purple-50/90 ring-2 ring-purple-300 shadow-sm"
                      : "border-slate-200"
                  }`}>
                    <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 font-black text-[13px] flex items-center justify-center shadow-inner mb-1.5">
                      🥈
                    </div>
                    <span className="text-[13px] sm:text-[14px] font-black text-[#1F2937] truncate w-full">
                      {top2.name}
                    </span>
                    {currentStudentName &&
                      top2.name.toLowerCase().trim() === currentStudentName.toLowerCase().trim() && (
                        <span className="text-[9px] font-black bg-[#8B5CF6] text-white px-1.5 py-0.2 rounded-full my-0.5">
                          Kamu
                        </span>
                    )}
                    <span className="text-[11px] font-black text-[#8B5CF6] mt-0.5 flex items-center gap-0.5">
                      <Timer className="w-3 h-3 text-amber-500" />
                      {formatTime(top2.timeSeconds)}
                    </span>
                    <div className="flex flex-col gap-0.5 mt-1 w-full">
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        {top2.score}/{top2.totalQuestions} Benar
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        (top2.wrongCount ?? 0) === 0
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                          : "text-amber-800 bg-amber-50 border border-amber-200"
                      }`}>
                        {(top2.wrongCount ?? 0) === 0 ? "0 Salah ✨" : `${top2.wrongCount} Salah`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-50/40 border border-dashed border-slate-200 text-center opacity-60">
                    <span className="text-xl mb-1">🥈</span>
                    <span className="text-[12px] font-bold text-gray-400">Kosong</span>
                  </div>
                )}

                {/* Rank 1 (Emas - Menonjol) */}
                {top1 ? (
                  <div className={`flex flex-col items-center p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-amber-50 to-yellow-50/70 border-3 text-center shadow-md relative -translate-y-2 transition-all ${
                    currentStudentName &&
                    top1.name.toLowerCase().trim() === currentStudentName.toLowerCase().trim()
                      ? "border-amber-400 ring-2 ring-purple-400"
                      : "border-amber-300"
                  }`}>
                    <div className="absolute -top-3 w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-sm">
                      <Crown className="w-3.5 h-3.5 fill-white" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-white font-black text-[16px] flex items-center justify-center shadow-inner mb-1">
                      🥇
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-black text-[#1F2937] truncate w-full">
                      {top1.name}
                    </span>
                    {currentStudentName &&
                      top1.name.toLowerCase().trim() === currentStudentName.toLowerCase().trim() && (
                        <span className="text-[9px] font-black bg-[#8B5CF6] text-white px-2 py-0.2 rounded-full my-0.5">
                          Kamu
                        </span>
                    )}
                    <span className="text-[12px] font-black text-[#8B5CF6] mt-0.5 flex items-center gap-0.5">
                      <Timer className="w-3.5 h-3.5 text-amber-600" />
                      {formatTime(top1.timeSeconds)}
                    </span>
                    <div className="flex flex-col gap-0.5 mt-1 w-full">
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        {top1.score}/{top1.totalQuestions} Benar
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        (top1.wrongCount ?? 0) === 0
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                          : "text-amber-800 bg-amber-50 border border-amber-200"
                      }`}>
                        {(top1.wrongCount ?? 0) === 0 ? "0 Salah ✨" : `${top1.wrongCount} Salah`}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full mt-1 truncate max-w-full">
                      {top1.badge || "Juara 1 👑"}
                    </span>
                  </div>
                ) : null}

                {/* Rank 3 (Perunggu) */}
                {top3 ? (
                  <div className={`flex flex-col items-center p-2.5 sm:p-3 rounded-2xl bg-amber-50/50 border-2 text-center shadow-xs transition-all ${
                    currentStudentName &&
                    top3.name.toLowerCase().trim() === currentStudentName.toLowerCase().trim()
                      ? "border-purple-400 bg-purple-50/90 ring-2 ring-purple-300 shadow-sm"
                      : "border-amber-200"
                  }`}>
                    <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-800 font-black text-[13px] flex items-center justify-center shadow-inner mb-1.5">
                      🥉
                    </div>
                    <span className="text-[13px] sm:text-[14px] font-black text-[#1F2937] truncate w-full">
                      {top3.name}
                    </span>
                    {currentStudentName &&
                      top3.name.toLowerCase().trim() === currentStudentName.toLowerCase().trim() && (
                        <span className="text-[9px] font-black bg-[#8B5CF6] text-white px-1.5 py-0.2 rounded-full my-0.5">
                          Kamu
                        </span>
                    )}
                    <span className="text-[11px] font-black text-[#8B5CF6] mt-0.5 flex items-center gap-0.5">
                      <Timer className="w-3.5 h-3.5 text-amber-500" />
                      {formatTime(top3.timeSeconds)}
                    </span>
                    <div className="flex flex-col gap-0.5 mt-1 w-full">
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        {top3.score}/{top3.totalQuestions} Benar
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        (top3.wrongCount ?? 0) === 0
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                          : "text-amber-800 bg-amber-50 border border-amber-200"
                      }`}>
                        {(top3.wrongCount ?? 0) === 0 ? "0 Salah ✨" : `${top3.wrongCount} Salah`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-2.5 rounded-2xl bg-amber-50/30 border border-dashed border-amber-200 text-center opacity-60">
                    <span className="text-xl mb-1">🥉</span>
                    <span className="text-[12px] font-bold text-gray-400">Kosong</span>
                  </div>
                )}
              </div>

              {/* Daftar Peringkat 4 - 10 */}
              {rest.length > 0 && (
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-[12px] font-black text-gray-500 uppercase tracking-wider">
                      Peringkat 4 sampai 10
                    </h4>
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                      Skor • Kesalahan • Waktu
                    </span>
                  </div>

                  {rest.map((entry, idx) => {
                    const rankNum = idx + 4;
                    const isCurrent =
                      currentStudentName &&
                      entry.name.toLowerCase().trim() ===
                        currentStudentName.toLowerCase().trim();

                    return (
                      <div
                        key={entry.id}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all ${
                          isCurrent
                            ? "bg-purple-100/90 border-[#8B5CF6] shadow-sm ring-2 ring-purple-300"
                            : "bg-white border-purple-100 hover:border-purple-200 shadow-2xs"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-purple-100 text-[#8B5CF6] font-black text-[12px] flex items-center justify-center flex-shrink-0">
                            #{rankNum}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[14px] font-black text-[#1F2937]">
                                {entry.name}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-extrabold bg-[#8B5CF6] text-white px-1.5 py-0.2 rounded-full">
                                  Kamu
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] font-bold text-gray-400">
                              {entry.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className={`inline-block text-[11px] font-black px-2 py-0.5 rounded-full border ${
                            (entry.wrongCount ?? 0) === 0
                              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                              : "text-amber-800 bg-amber-50 border-amber-200"
                          }`}>
                            {(entry.wrongCount ?? 0) === 0 ? "0 Salah" : `${entry.wrongCount} Salah`}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-[#8B5CF6] text-[11px] sm:text-[12px] font-black border border-purple-200/70">
                            <Timer className="w-3 h-3 text-amber-500" />
                            <span>{formatTime(entry.timeSeconds)}</span>
                          </span>
                          <span className="inline-block text-[11px] sm:text-[12px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                            {entry.score}/{entry.totalQuestions}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Tombol Aksi */}
        <div className="p-4 bg-gray-50 border-t border-purple-100 flex flex-col sm:flex-row items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
              onStartQuiz();
            }}
            className="clay-button-primary w-full py-3 px-4 font-black text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-transform"
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span>Mulai Kuis & Pecahkan Rekor!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
