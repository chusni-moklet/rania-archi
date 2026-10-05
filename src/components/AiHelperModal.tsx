"use client";

import React, { useState } from "react";
import { X, Bot, Sparkles, Send, Lightbulb } from "lucide-react";
import Image from "next/image";
import { sounds } from "./AudioEffects";

interface AiHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: "tutor" | "kid";
  text: string;
  steps?: string[];
}

export default function AiHelperModal({ isOpen, onClose }: AiHelperModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "tutor",
      text: "Halo Bintang Matematika! Aku Teman AI-mu! 🤖 Tanyakan apa saja tentang pelajaran matematika kelas 4, atau ketuk contoh pertanyaan di bawah:",
    },
  ]);
  const [inputVal, setInputVal] = useState("");

  if (!isOpen) return null;

  const quickPrompts = [
    {
      title: "Trik Jari Perkalian 9 ✨",
      q: "Bagaimana cara mudah menghafal perkalian 9?",
      ans: "Gunakan trik jari ajaib! Pada 9 × 7: tekuk jari ke-7 dari kiri. Di sebelah kiri ada 6 jari, di sebelah kanan ada 3 jari! Gabungkan: 63! 🚀",
      steps: ["1. Buka kedua tangan (10 jari)", "2. Tekuk jari ke-7 dari kiri", "3. 6 jari kiri dan 3 jari kanan = 63!"],
    },
    {
      title: "Pecahan Pizza 🍕",
      q: "Bagaimana cara mudah memahami pecahan?",
      ans: "Bayangkan seloyang pizza dipotong jadi 4 bagian sama besar! Jika kamu makan 1 potong, kamu memakan 1/4 bagian pizza. Kalau makan 2 potong, artinya 2/4 atau setengah (1/2) pizza!",
      steps: ["Penyebut (angka bawah): Total semua potongan (4)", "Pembilang (angka atas): Potongan yang kamu makan (1)"],
    },
    {
      title: "Pembagian Porogapit ➗",
      q: "Bagaimana urutan langkah pembagian bersusun?",
      ans: "Ingat jembatan keledai: Ba-Ka-Ku-Tu! Bagi, Kali, Kurangkan, Turunkan! 👨‍👩‍👧‍👦",
      steps: ["Ba - Bagi angka depan", "Ka - Kali hasilnya", "Ku - Kurangkan", "Tu - Turunkan angka berikutnya"],
    },
  ];

  const handleSelectPrompt = (prompt: typeof quickPrompts[0]) => {
    sounds.playPop();
    const newMessages: Message[] = [
      ...messages,
      { sender: "kid", text: prompt.q },
      { sender: "tutor", text: prompt.ans, steps: prompt.steps },
    ];
    setMessages(newMessages);
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    sounds.playPop();
    const userText = inputVal.trim();
    setInputVal("");

    const newMsgs: Message[] = [
      ...messages,
      { sender: "kid", text: userText },
      {
        sender: "tutor",
        text: `Pertanyaan yang bagus sekali tentang "${userText}"! Matematika itu penuh dengan pola menarik. Mari kita pelajari langkah demi langkah! ✨`,
        steps: ["Langkah 1: Perhatikan angka yang diketahui", "Langkah 2: Selesaikan operasi hitung bertahap", "Langkah 3: Rayakan jawabanmu yang luar biasa! ⭐"],
      },
    ];
    setMessages(newMsgs);
    setTimeout(() => sounds.playSuccess(), 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-helper-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-[390px] bg-white rounded-[24px] shadow-2xl border-4 border-emerald-200 overflow-hidden relative flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="ai-helper-title" className="text-[18px] font-black leading-none">
                Tutor Matematika AI
              </h2>
              <p className="text-[14px] text-emerald-200 font-semibold mt-1">
                Teman Belajar Pintar 24 Jam
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 cursor-pointer transition-colors"
            aria-label="Tutup tutor AI"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Obrolan */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${m.sender === "kid" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "tutor" && (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-100 flex-shrink-0 border border-purple-200">
                  <Image
                    src="/mascot.jpg"
                    alt="Maskot Tutor AI"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`p-3.5 rounded-[18px] max-w-[82%] text-[15px] font-semibold leading-relaxed shadow-sm ${
                  m.sender === "kid"
                    ? "bg-[#8B5CF6] text-white rounded-br-xs"
                    : "bg-emerald-50 text-[#1F2937] border border-emerald-100 rounded-bl-xs"
                }`}
              >
                <p>{m.text}</p>
                {m.steps && (
                  <div className="mt-2.5 space-y-1.5 pt-2 border-t border-emerald-200/60">
                    {m.steps.map((st, idx) => (
                      <div
                        key={idx}
                        className="bg-white/90 px-2.5 py-1.5 rounded-[12px] text-[14px] font-bold text-emerald-900 shadow-2xs"
                      >
                        {st}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Contoh Pertanyaan Cepat */}
          <div className="pt-2">
            <p className="text-[14px] font-bold text-gray-500 mb-2 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Ketuk pertanyaan cepat:</span>
            </p>
            <div className="flex flex-col gap-2">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPrompt(p)}
                  className="text-left p-2.5 rounded-[14px] bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-[14px] font-bold text-[#1F2937] transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{p.title}</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bilah Input */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Tanyakan soal matematika..."
            className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2.5 text-[15px] font-semibold text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[48px]"
          />
          <button
            onClick={handleSend}
            className="clay-button-primary px-4 h-[48px] rounded-full flex items-center justify-center cursor-pointer bg-emerald-600 shadow-md"
            aria-label="Kirim pertanyaan"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
