import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface QuestionOption {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  question: string;
  subtext: string;
  options: QuestionOption[];
  explanation: string;
}

export const QUESTION_BANK: Question[] = [
  // --- 1 sampai 20: Perkalian & Mental Math ---
  {
    id: 1,
    question: "8 × 7 = ?",
    subtext: "Kartu Kilat Perkalian",
    options: [
      { id: "A", label: "48", isCorrect: false },
      { id: "B", label: "54", isCorrect: false },
      { id: "C", label: "56", isCorrect: true },
      { id: "D", label: "64", isCorrect: false },
    ],
    explanation: "Hebat! 8 kelompok dari 7 bernilai 56! 🌟",
  },
  {
    id: 2,
    question: "9 × 6 = ?",
    subtext: "Tabel Perkalian",
    options: [
      { id: "A", label: "54", isCorrect: true },
      { id: "B", label: "45", isCorrect: false },
      { id: "C", label: "63", isCorrect: false },
      { id: "D", label: "56", isCorrect: false },
    ],
    explanation: "Tepat sekali! 9 dikali 6 hasilnya 54! 🚀",
  },
  {
    id: 3,
    question: "12 × 4 = ?",
    subtext: "Perkalian 12",
    options: [
      { id: "A", label: "44", isCorrect: false },
      { id: "B", label: "48", isCorrect: true },
      { id: "C", label: "52", isCorrect: false },
      { id: "D", label: "36", isCorrect: false },
    ],
    explanation: "Keren! 10 × 4 = 40, dan 2 × 4 = 8. Jadi 40 + 8 = 48! 🎯",
  },
  {
    id: 4,
    question: "7 × 7 = ?",
    subtext: "Bilangan Kuadrat",
    options: [
      { id: "A", label: "42", isCorrect: false },
      { id: "B", label: "47", isCorrect: false },
      { id: "C", label: "49", isCorrect: true },
      { id: "D", label: "56", isCorrect: false },
    ],
    explanation: "Benar! 7 × 7 = 49! Bilangan kuadrat sempurna! ✨",
  },
  {
    id: 5,
    question: "6 × 8 = ?",
    subtext: "Perkalian Dasar",
    options: [
      { id: "A", label: "48", isCorrect: true },
      { id: "B", label: "46", isCorrect: false },
      { id: "C", label: "54", isCorrect: false },
      { id: "D", label: "42", isCorrect: false },
    ],
    explanation: "Tepat! 6 dikali 8 adalah 48! 🌟",
  },
  {
    id: 6,
    question: "11 × 9 = ?",
    subtext: "Perkalian 11",
    options: [
      { id: "A", label: "89", isCorrect: false },
      { id: "B", label: "99", isCorrect: true },
      { id: "C", label: "109", isCorrect: false },
      { id: "D", label: "91", isCorrect: false },
    ],
    explanation: "Keajaiban angka 11! 11 × 9 = 99! 🎩",
  },
  {
    id: 7,
    question: "25 × 4 = ?",
    subtext: "Hitung Cepat",
    options: [
      { id: "A", label: "75", isCorrect: false },
      { id: "B", label: "100", isCorrect: true },
      { id: "C", label: "125", isCorrect: false },
      { id: "D", label: "90", isCorrect: false },
    ],
    explanation: "Luar biasa! 4 kali 25 menghasilkan 100 pas! 💯",
  },
  {
    id: 8,
    question: "15 × 3 = ?",
    subtext: "Perkalian Dua Digit",
    options: [
      { id: "A", label: "45", isCorrect: true },
      { id: "B", label: "35", isCorrect: false },
      { id: "C", label: "50", isCorrect: false },
      { id: "D", label: "40", isCorrect: false },
    ],
    explanation: "Bagus! 10 × 3 = 30, dan 5 × 3 = 15. 30 + 15 = 45! ⭐",
  },
  {
    id: 9,
    question: "50 × 6 = ?",
    subtext: "Perkalian Puluhan",
    options: [
      { id: "A", label: "250", isCorrect: false },
      { id: "B", label: "300", isCorrect: true },
      { id: "C", label: "360", isCorrect: false },
      { id: "D", label: "350", isCorrect: false },
    ],
    explanation: "Tepat! 5 × 6 = 30, tambahkan satu nol di belakang = 300! 🎈",
  },
  {
    id: 10,
    question: "8 × 9 = ?",
    subtext: "Tabel Perkalian",
    options: [
      { id: "A", label: "72", isCorrect: true },
      { id: "B", label: "81", isCorrect: false },
      { id: "C", label: "68", isCorrect: false },
      { id: "D", label: "74", isCorrect: false },
    ],
    explanation: "Mantap! 8 × 9 = 72! Kamu pintar sekali! 🔥",
  },
  {
    id: 11,
    question: "14 × 2 = ?",
    subtext: "Kelipatan Dua",
    options: [
      { id: "A", label: "26", isCorrect: false },
      { id: "B", label: "28", isCorrect: true },
      { id: "C", label: "30", isCorrect: false },
      { id: "D", label: "24", isCorrect: false },
    ],
    explanation: "Dua kali 14 adalah 28! Mudah kan! ✌️",
  },
  {
    id: 12,
    question: "7 × 8 = ?",
    subtext: "Perkalian Dasar",
    options: [
      { id: "A", label: "54", isCorrect: false },
      { id: "B", label: "56", isCorrect: true },
      { id: "C", label: "64", isCorrect: false },
      { id: "D", label: "58", isCorrect: false },
    ],
    explanation: "Ingat urutan 5-6-7-8: 56 = 7 × 8! 🎵",
  },
  {
    id: 13,
    question: "30 × 7 = ?",
    subtext: "Perkalian Puluhan",
    options: [
      { id: "A", label: "210", isCorrect: true },
      { id: "B", label: "270", isCorrect: false },
      { id: "C", label: "240", isCorrect: false },
      { id: "D", label: "180", isCorrect: false },
    ],
    explanation: "3 × 7 = 21, jadi 30 × 7 = 210! 🎯",
  },
  {
    id: 14,
    question: "13 × 3 = ?",
    subtext: "Hitung Mental",
    options: [
      { id: "A", label: "36", isCorrect: false },
      { id: "B", label: "39", isCorrect: true },
      { id: "C", label: "42", isCorrect: false },
      { id: "D", label: "29", isCorrect: false },
    ],
    explanation: "10 × 3 = 30 dan 3 × 3 = 9. 30 + 9 = 39! ⭐",
  },
  {
    id: 15,
    question: "8 × 8 = ?",
    subtext: "Bilangan Kuadrat",
    options: [
      { id: "A", label: "56", isCorrect: false },
      { id: "B", label: "62", isCorrect: false },
      { id: "C", label: "64", isCorrect: true },
      { id: "D", label: "72", isCorrect: false },
    ],
    explanation: "8 dikali 8 sama dengan 64! 🍪",
  },
  {
    id: 16,
    question: "40 × 5 = ?",
    subtext: "Perkalian Puluhan",
    options: [
      { id: "A", label: "200", isCorrect: true },
      { id: "B", label: "250", isCorrect: false },
      { id: "C", label: "180", isCorrect: false },
      { id: "D", label: "220", isCorrect: false },
    ],
    explanation: "4 × 5 = 20, tambahkan nol di belakang = 200! 🚀",
  },
  {
    id: 17,
    question: "12 × 5 = ?",
    subtext: "Perkalian 12",
    options: [
      { id: "A", label: "55", isCorrect: false },
      { id: "B", label: "60", isCorrect: true },
      { id: "C", label: "65", isCorrect: false },
      { id: "D", label: "50", isCorrect: false },
    ],
    explanation: "Seperti jumlah menit dalam satu jam penuh: 12 × 5 = 60! ⏰",
  },
  {
    id: 18,
    question: "6 × 7 = ?",
    subtext: "Tabel Perkalian",
    options: [
      { id: "A", label: "42", isCorrect: true },
      { id: "B", label: "48", isCorrect: false },
      { id: "C", label: "36", isCorrect: false },
      { id: "D", label: "45", isCorrect: false },
    ],
    explanation: "6 × 7 = 42! Jawaban yang sangat tepat! ✨",
  },
  {
    id: 19,
    question: "9 × 9 = ?",
    subtext: "Bilangan Kuadrat",
    options: [
      { id: "A", label: "72", isCorrect: false },
      { id: "B", label: "81", isCorrect: true },
      { id: "C", label: "99", isCorrect: false },
      { id: "D", label: "89", isCorrect: false },
    ],
    explanation: "9 × 9 = 81! Kerja bagus! 🌟",
  },
  {
    id: 20,
    question: "16 × 2 = ?",
    subtext: "Kelipatan Dua",
    options: [
      { id: "A", label: "32", isCorrect: true },
      { id: "B", label: "34", isCorrect: false },
      { id: "C", label: "28", isCorrect: false },
      { id: "D", label: "36", isCorrect: false },
    ],
    explanation: "16 ditambah 16 sama dengan 32! 🎯",
  },

  // --- 21 sampai 40: Pembagian & Berbagi Rata ---
  {
    id: 21,
    question: "36 ÷ 4 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "8", isCorrect: false },
      { id: "B", label: "9", isCorrect: true },
      { id: "C", label: "7", isCorrect: false },
      { id: "D", label: "6", isCorrect: false },
    ],
    explanation: "Tepat! Karena 4 × 9 = 36, maka 36 ÷ 4 = 9! 🎯",
  },
  {
    id: 22,
    question: "42 ÷ 6 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "6", isCorrect: false },
      { id: "B", label: "7", isCorrect: true },
      { id: "C", label: "8", isCorrect: false },
      { id: "D", label: "9", isCorrect: false },
    ],
    explanation: "Hebat! 6 × 7 = 42, jadi 42 ÷ 6 = 7! 🌟",
  },
  {
    id: 23,
    question: "63 ÷ 7 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "9", isCorrect: true },
      { id: "B", label: "8", isCorrect: false },
      { id: "C", label: "7", isCorrect: false },
      { id: "D", label: "6", isCorrect: false },
    ],
    explanation: "Benar! 7 × 9 = 63, sehingga 63 ÷ 7 = 9! ✨",
  },
  {
    id: 24,
    question: "72 ÷ 8 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "7", isCorrect: false },
      { id: "B", label: "8", isCorrect: false },
      { id: "C", label: "9", isCorrect: true },
      { id: "D", label: "10", isCorrect: false },
    ],
    explanation: "Keren! 8 × 9 = 72, jadi 72 ÷ 8 = 9! 🚀",
  },
  {
    id: 25,
    question: "54 ÷ 9 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "6", isCorrect: true },
      { id: "B", label: "7", isCorrect: false },
      { id: "C", label: "5", isCorrect: false },
      { id: "D", label: "8", isCorrect: false },
    ],
    explanation: "Tepat! 9 × 6 = 54, maka 54 ÷ 9 = 6! 🎈",
  },
  {
    id: 26,
    question: "80 ÷ 10 = ?",
    subtext: "Pembagian 10",
    options: [
      { id: "A", label: "8", isCorrect: true },
      { id: "B", label: "800", isCorrect: false },
      { id: "C", label: "18", isCorrect: false },
      { id: "D", label: "7", isCorrect: false },
    ],
    explanation: "Cukup hilangkan satu angka nol: 80 ÷ 10 = 8! ⚡",
  },
  {
    id: 27,
    question: "45 ÷ 5 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "7", isCorrect: false },
      { id: "B", label: "8", isCorrect: false },
      { id: "C", label: "9", isCorrect: true },
      { id: "D", label: "10", isCorrect: false },
    ],
    explanation: "Hitung kelipatan 5: 5 × 9 = 45! ⭐",
  },
  {
    id: 28,
    question: "48 ÷ 6 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "7", isCorrect: false },
      { id: "B", label: "8", isCorrect: true },
      { id: "C", label: "9", isCorrect: false },
      { id: "D", label: "6", isCorrect: false },
    ],
    explanation: "6 × 8 = 48, jadi 48 ÷ 6 = 8! 🎯",
  },
  {
    id: 29,
    question: "100 ÷ 4 = ?",
    subtext: "Hitung Cepat",
    options: [
      { id: "A", label: "20", isCorrect: false },
      { id: "B", label: "25", isCorrect: true },
      { id: "C", label: "30", isCorrect: false },
      { id: "D", label: "15", isCorrect: false },
    ],
    explanation: "Setengah dari 100 adalah 50, setengah dari 50 adalah 25! 💯",
  },
  {
    id: 30,
    question: "56 ÷ 8 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "7", isCorrect: true },
      { id: "B", label: "6", isCorrect: false },
      { id: "C", label: "8", isCorrect: false },
      { id: "D", label: "9", isCorrect: false },
    ],
    explanation: "8 × 7 = 56, jadi 56 ÷ 8 = 7! 🌟",
  },
  {
    id: 31,
    question: "35 ÷ 7 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "4", isCorrect: false },
      { id: "B", label: "5", isCorrect: true },
      { id: "C", label: "6", isCorrect: false },
      { id: "D", label: "7", isCorrect: false },
    ],
    explanation: "7 × 5 = 35, jadi 35 ÷ 7 = 5! 🌈",
  },
  {
    id: 32,
    question: "24 ÷ 3 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "6", isCorrect: false },
      { id: "B", label: "7", isCorrect: false },
      { id: "C", label: "8", isCorrect: true },
      { id: "D", label: "9", isCorrect: false },
    ],
    explanation: "3 × 8 = 24, maka 24 ÷ 3 = 8! 🚀",
  },
  {
    id: 33,
    question: "64 ÷ 8 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "8", isCorrect: true },
      { id: "B", label: "7", isCorrect: false },
      { id: "C", label: "9", isCorrect: false },
      { id: "D", label: "6", isCorrect: false },
    ],
    explanation: "8 × 8 = 64, jadi 64 ÷ 8 = 8! ✨",
  },
  {
    id: 34,
    question: "81 ÷ 9 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "8", isCorrect: false },
      { id: "B", label: "9", isCorrect: true },
      { id: "C", label: "7", isCorrect: false },
      { id: "D", label: "6", isCorrect: false },
    ],
    explanation: "9 × 9 = 81, jadi 81 ÷ 9 = 9! 🎯",
  },
  {
    id: 35,
    question: "120 ÷ 10 = ?",
    subtext: "Pembagian 10",
    options: [
      { id: "A", label: "12", isCorrect: true },
      { id: "B", label: "20", isCorrect: false },
      { id: "C", label: "10", isCorrect: false },
      { id: "D", label: "1200", isCorrect: false },
    ],
    explanation: "120 dibagi 10 sama dengan 12! Sangat cepat! ⚡",
  },
  {
    id: 36,
    question: "32 ÷ 4 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "6", isCorrect: false },
      { id: "B", label: "7", isCorrect: false },
      { id: "C", label: "8", isCorrect: true },
      { id: "D", label: "9", isCorrect: false },
    ],
    explanation: "4 × 8 = 32, jadi 32 ÷ 4 = 8! 🌟",
  },
  {
    id: 37,
    question: "49 ÷ 7 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "6", isCorrect: false },
      { id: "B", label: "7", isCorrect: true },
      { id: "C", label: "8", isCorrect: false },
      { id: "D", label: "9", isCorrect: false },
    ],
    explanation: "7 × 7 = 49, maka 49 ÷ 7 = 7! 🎈",
  },
  {
    id: 38,
    question: "27 ÷ 3 = ?",
    subtext: "Pembagian Dasar",
    options: [
      { id: "A", label: "9", isCorrect: true },
      { id: "B", label: "8", isCorrect: false },
      { id: "C", label: "7", isCorrect: false },
      { id: "D", label: "6", isCorrect: false },
    ],
    explanation: "3 × 9 = 27, jadi 27 ÷ 3 = 9! 🎯",
  },
  {
    id: 39,
    question: "200 ÷ 4 = ?",
    subtext: "Hitung Cepat",
    options: [
      { id: "A", label: "40", isCorrect: false },
      { id: "B", label: "50", isCorrect: true },
      { id: "C", label: "60", isCorrect: false },
      { id: "D", label: "25", isCorrect: false },
    ],
    explanation: "20 ÷ 4 = 5, sehingga 200 ÷ 4 = 50! 🚀",
  },
  {
    id: 40,
    question: "90 ÷ 3 = ?",
    subtext: "Pembagian Puluhan",
    options: [
      { id: "A", label: "30", isCorrect: true },
      { id: "B", label: "20", isCorrect: false },
      { id: "C", label: "40", isCorrect: false },
      { id: "D", label: "25", isCorrect: false },
    ],
    explanation: "9 ÷ 3 = 3, maka 90 ÷ 3 = 30! ✨",
  },

  // --- 41 sampai 55: Pecahan & Desimal ---
  {
    id: 41,
    question: "Pecahan manakah yang senilai dengan 1/2?",
    subtext: "Pecahan Senilai",
    options: [
      { id: "A", label: "2/4", isCorrect: true },
      { id: "B", label: "1/4", isCorrect: false },
      { id: "C", label: "3/5", isCorrect: false },
      { id: "D", label: "2/6", isCorrect: false },
    ],
    explanation: "Pintar! 2 dari 4 potong pizza sama dengan setengah (1/2) pizza! 🍕",
  },
  {
    id: 42,
    question: "1/4 + 2/4 = ?",
    subtext: "Penjumlahan Pecahan",
    options: [
      { id: "A", label: "3/8", isCorrect: false },
      { id: "B", label: "3/4", isCorrect: true },
      { id: "C", label: "2/4", isCorrect: false },
      { id: "D", label: "1/2", isCorrect: false },
    ],
    explanation: "Penyebutnya tetap 4, jumlahkan pembilangnya: 1 + 2 = 3/4! 🥧",
  },
  {
    id: 43,
    question: "Berapa 1/2 dari 20?",
    subtext: "Pecahan dari Jumlah",
    options: [
      { id: "A", label: "5", isCorrect: false },
      { id: "B", label: "10", isCorrect: true },
      { id: "C", label: "15", isCorrect: false },
      { id: "D", label: "8", isCorrect: false },
    ],
    explanation: "Setengah dari 20 adalah 20 ÷ 2 = 10! ⭐",
  },
  {
    id: 44,
    question: "Pecahan manakah yang nilainya paling besar?",
    subtext: "Membandingkan Pecahan",
    options: [
      { id: "A", label: "1/8", isCorrect: false },
      { id: "B", label: "1/4", isCorrect: false },
      { id: "C", label: "1/2", isCorrect: true },
      { id: "D", label: "1/6", isCorrect: false },
    ],
    explanation: "Makin sedikit bagian pembagi, makin besar potongannya! 1/2 paling besar! 🍰",
  },
  {
    id: 45,
    question: "12 jam sama dengan berapa bagian dari satu hari?",
    subtext: "Pecahan & Waktu",
    options: [
      { id: "A", label: "1/4", isCorrect: false },
      { id: "B", label: "1/3", isCorrect: false },
      { id: "C", label: "1/2", isCorrect: true },
      { id: "D", label: "2/3", isCorrect: false },
    ],
    explanation: "Satu hari ada 24 jam. 12/24 = 1/2 (setengah) hari! ☀️",
  },
  {
    id: 46,
    question: "5/8 - 2/8 = ?",
    subtext: "Pengurangan Pecahan",
    options: [
      { id: "A", label: "3/8", isCorrect: true },
      { id: "B", label: "3/0", isCorrect: false },
      { id: "C", label: "7/8", isCorrect: false },
      { id: "D", label: "2/8", isCorrect: false },
    ],
    explanation: "Penyebut tetap 8, kurangkan atasnya: 5 - 2 = 3/8! 🎨",
  },
  {
    id: 47,
    question: "Pecahan 3/3 sama nilainya dengan bilangan berapa?",
    subtext: "Bilangan Bulat",
    options: [
      { id: "A", label: "0", isCorrect: false },
      { id: "B", label: "1", isCorrect: true },
      { id: "C", label: "3", isCorrect: false },
      { id: "D", label: "6", isCorrect: false },
    ],
    explanation: "Jika pembilang dan penyebut sama, hasilnya 1 utuh! 3/3 = 1! 🍏",
  },
  {
    id: 48,
    question: "Berapa nilai 1/4 dari 100?",
    subtext: "Pecahan dari Jumlah",
    options: [
      { id: "A", label: "20", isCorrect: false },
      { id: "B", label: "25", isCorrect: true },
      { id: "C", label: "30", isCorrect: false },
      { id: "D", label: "50", isCorrect: false },
    ],
    explanation: "100 dibagi 4 bagian sama rata adalah 25! 🪙",
  },
  {
    id: 49,
    question: "Bentuk desimal dari 1/2 adalah...",
    subtext: "Pecahan ke Desimal",
    options: [
      { id: "A", label: "0.2", isCorrect: false },
      { id: "B", label: "0.5", isCorrect: true },
      { id: "C", label: "0.25", isCorrect: false },
      { id: "D", label: "0.05", isCorrect: false },
    ],
    explanation: "0.5 dibaca lima persepuluh (5/10) yang disederhanakan jadi 1/2! ✨",
  },
  {
    id: 50,
    question: "2/5 + 1/5 = ?",
    subtext: "Penjumlahan Pecahan",
    options: [
      { id: "A", label: "3/5", isCorrect: true },
      { id: "B", label: "3/10", isCorrect: false },
      { id: "C", label: "1/5", isCorrect: false },
      { id: "D", label: "4/5", isCorrect: false },
    ],
    explanation: "Penyebutnya sama: 2 + 1 = 3/5! Mudah sekali! 🌟",
  },
  {
    id: 51,
    question: "Berapa potong setengah kue yang dibutuhkan untuk membuat 2 kue utuh?",
    subtext: "Pecahan ke Bentuk Utuh",
    options: [
      { id: "A", label: "2 potong", isCorrect: false },
      { id: "B", label: "4 potong", isCorrect: true },
      { id: "C", label: "6 potong", isCorrect: false },
      { id: "D", label: "8 potong", isCorrect: false },
    ],
    explanation: "1 kue butuh 2 potong setengah. Jadi 2 kue butuh 2 × 2 = 4 potong! 🎂",
  },
  {
    id: 52,
    question: "Bentuk paling sederhana dari 4/8 adalah...",
    subtext: "Menyederhanakan Pecahan",
    options: [
      { id: "A", label: "1/4", isCorrect: false },
      { id: "B", label: "1/2", isCorrect: true },
      { id: "C", label: "3/4", isCorrect: false },
      { id: "D", label: "2/3", isCorrect: false },
    ],
    explanation: "Bagi atas dan bawah dengan 4: 4/8 = 1/2! 🎯",
  },
  {
    id: 53,
    question: "Berapa 1/3 dari 18?",
    subtext: "Pecahan dari Jumlah",
    options: [
      { id: "A", label: "6", isCorrect: true },
      { id: "B", label: "5", isCorrect: false },
      { id: "C", label: "9", isCorrect: false },
      { id: "D", label: "4", isCorrect: false },
    ],
    explanation: "18 dibagi 3 adalah 6! Jadi 1/3 dari 18 = 6! 🎈",
  },
  {
    id: 54,
    question: "Bentuk pecahan biasa dari 0.7 adalah...",
    subtext: "Desimal ke Pecahan",
    options: [
      { id: "A", label: "7/10", isCorrect: true },
      { id: "B", label: "7/100", isCorrect: false },
      { id: "C", label: "1/7", isCorrect: false },
      { id: "D", label: "7/1", isCorrect: false },
    ],
    explanation: "0.7 memiliki 1 angka di belakang koma, jadi 7/10! 📏",
  },
  {
    id: 55,
    question: "4/7 + 2/7 = ?",
    subtext: "Penjumlahan Pecahan",
    options: [
      { id: "A", label: "6/7", isCorrect: true },
      { id: "B", label: "6/14", isCorrect: false },
      { id: "C", label: "5/7", isCorrect: false },
      { id: "D", label: "1/7", isCorrect: false },
    ],
    explanation: "Jumlahkan pembilang: 4 + 2 = 6, penyebut tetap 7 = 6/7! 🌟",
  },

  // --- 56 sampai 70: Geometri, Luas & Keliling ---
  {
    id: 56,
    question: "Sebuah persegi memiliki sisi 5 cm. Berapa kelilingnya?",
    subtext: "Geometri: Keliling Persegi",
    options: [
      { id: "A", label: "15 cm", isCorrect: false },
      { id: "B", label: "20 cm", isCorrect: true },
      { id: "C", label: "25 cm", isCorrect: false },
      { id: "D", label: "10 cm", isCorrect: false },
    ],
    explanation: "Keliling persegi = 4 × sisi: 4 × 5 cm = 20 cm! 📐",
  },
  {
    id: 57,
    question: "Persegi panjang panjangnya 6 cm dan lebarnya 4 cm. Berapakah luasnya?",
    subtext: "Geometri: Luas",
    options: [
      { id: "A", label: "20 cm²", isCorrect: false },
      { id: "B", label: "24 cm²", isCorrect: true },
      { id: "C", label: "28 cm²", isCorrect: false },
      { id: "D", label: "18 cm²", isCorrect: false },
    ],
    explanation: "Luas = panjang × lebar = 6 × 4 = 24 cm²! 🟨",
  },
  {
    id: 58,
    question: "Bangun datar segienam (heksagon) memiliki berapa sisi?",
    subtext: "Bangun Datar",
    options: [
      { id: "A", label: "5 sisi", isCorrect: false },
      { id: "B", label: "6 sisi", isCorrect: true },
      { id: "C", label: "7 sisi", isCorrect: false },
      { id: "D", label: "8 sisi", isCorrect: false },
    ],
    explanation: "Heksagon memiliki 6 sisi sama panjang seperti sarang lebah! 🐝",
  },
  {
    id: 59,
    question: "Berapa besar sudut siku-siku?",
    subtext: "Pengukuran Sudut",
    options: [
      { id: "A", label: "45°", isCorrect: false },
      { id: "B", label: "90°", isCorrect: true },
      { id: "C", label: "180°", isCorrect: false },
      { id: "D", label: "360°", isCorrect: false },
    ],
    explanation: "Pojok siku-siku yang tegak lurus selalu berukuran tepat 90°! 📐",
  },
  {
    id: 60,
    question: "Berapa keliling persegi panjang dengan panjang 8 cm dan lebar 3 cm?",
    subtext: "Geometri: Keliling",
    options: [
      { id: "A", label: "22 cm", isCorrect: true },
      { id: "B", label: "24 cm", isCorrect: false },
      { id: "C", label: "11 cm", isCorrect: false },
      { id: "D", label: "16 cm", isCorrect: false },
    ],
    explanation: "Keliling = 2 × (panjang + lebar) = 2 × (8 + 3) = 22 cm! 📏",
  },
  {
    id: 61,
    question: "Sebuah persegi memiliki luas 36 cm². Berapa panjang sisinya?",
    subtext: "Geometri: Panjang Sisi",
    options: [
      { id: "A", label: "4 cm", isCorrect: false },
      { id: "B", label: "6 cm", isCorrect: true },
      { id: "C", label: "8 cm", isCorrect: false },
      { id: "D", label: "9 cm", isCorrect: false },
    ],
    explanation: "Karena sisi × sisi = luas, dan 6 × 6 = 36, maka sisinya 6 cm! 🟩",
  },
  {
    id: 62,
    question: "Berapa jumlah sisi pada bangun segidelapan (oktagon)?",
    subtext: "Bangun Datar",
    options: [
      { id: "A", label: "6 sisi", isCorrect: false },
      { id: "B", label: "7 sisi", isCorrect: false },
      { id: "C", label: "8 sisi", isCorrect: true },
      { id: "D", label: "10 sisi", isCorrect: false },
    ],
    explanation: "Oktagon memiliki 8 sisi (seperti rambu STOP di jalan raya)! 🛑",
  },
  {
    id: 63,
    question: "Segitiga sama sisi memiliki panjang sisi 7 cm. Berapa kelilingnya?",
    subtext: "Keliling Segitiga",
    options: [
      { id: "A", label: "14 cm", isCorrect: false },
      { id: "B", label: "21 cm", isCorrect: true },
      { id: "C", label: "28 cm", isCorrect: false },
      { id: "D", label: "18 cm", isCorrect: false },
    ],
    explanation: "Ada 3 sisi yang sama panjang: 7 + 7 + 7 = 21 cm! 🔺",
  },
  {
    id: 64,
    question: "Sudut yang besarnya kurang dari 90° disebut sudut...",
    subtext: "Jenis Sudut",
    options: [
      { id: "A", label: "Lancip", isCorrect: true },
      { id: "B", label: "Tumpul", isCorrect: false },
      { id: "C", label: "Siku-siku", isCorrect: false },
      { id: "D", label: "Lurus", isCorrect: false },
    ],
    explanation: "Sudut kecil yang runcing disebut sudut lancip (< 90°)! 📐",
  },
  {
    id: 65,
    question: "Berapa luas persegi yang memiliki panjang sisi 8 cm?",
    subtext: "Luas Persegi",
    options: [
      { id: "A", label: "32 cm²", isCorrect: false },
      { id: "B", label: "64 cm²", isCorrect: true },
      { id: "C", label: "48 cm²", isCorrect: false },
      { id: "D", label: "16 cm²", isCorrect: false },
    ],
    explanation: "Luas = sisi × sisi = 8 × 8 = 64 cm²! 🌟",
  },
  {
    id: 66,
    question: "Berapa pasang sisi sejajar yang dimiliki oleh persegi panjang?",
    subtext: "Sifat Bangun Datar",
    options: [
      { id: "A", label: "1 pasang", isCorrect: false },
      { id: "B", label: "2 pasang", isCorrect: true },
      { id: "C", label: "3 pasang", isCorrect: false },
      { id: "D", label: "4 pasang", isCorrect: false },
    ],
    explanation: "Sisi atas-bawah dan sisi kiri-kanan sejajar: ada 2 pasang! ⏸️",
  },
  {
    id: 67,
    question: "Berapa keliling segilima beraturan dengan panjang sisi 6 cm?",
    subtext: "Keliling Segilima",
    options: [
      { id: "A", label: "24 cm", isCorrect: false },
      { id: "B", label: "30 cm", isCorrect: true },
      { id: "C", label: "36 cm", isCorrect: false },
      { id: "D", label: "25 cm", isCorrect: false },
    ],
    explanation: "Segilima memiliki 5 sisi: 5 × 6 cm = 30 cm! ⭐️",
  },
  {
    id: 68,
    question: "Jumlah seluruh sudut dalam segitiga selalu berjumlah...",
    subtext: "Aturan Sudut Segitiga",
    options: [
      { id: "A", label: "90°", isCorrect: false },
      { id: "B", label: "180°", isCorrect: true },
      { id: "C", label: "270°", isCorrect: false },
      { id: "D", label: "360°", isCorrect: false },
    ],
    explanation: "Ketiga sudut pada segitiga apa pun selalu berjumlah 180°! 🔺",
  },
  {
    id: 69,
    question: "Sebuah karpet panjangnya 7 meter dan lebarnya 3 meter. Berapa luasnya?",
    subtext: "Soal Cerita: Luas",
    options: [
      { id: "A", label: "20 m²", isCorrect: false },
      { id: "B", label: "21 m²", isCorrect: true },
      { id: "C", label: "24 m²", isCorrect: false },
      { id: "D", label: "14 m²", isCorrect: false },
    ],
    explanation: "Luas = panjang × lebar = 7 × 3 = 21 m²! 🛋️",
  },
  {
    id: 70,
    question: "Sudut yang besarnya lebih dari 90° tetapi kurang dari 180° disebut sudut...",
    subtext: "Jenis Sudut",
    options: [
      { id: "A", label: "Lancip", isCorrect: false },
      { id: "B", label: "Tumpul", isCorrect: true },
      { id: "C", label: "Siku-siku", isCorrect: false },
      { id: "D", label: "Refleks", isCorrect: false },
    ],
    explanation: "Sudut lebar yang lebih dari 90° disebut sudut tumpul! 📐",
  },

  // --- 71 sampai 85: Nilai Tempat, Penjumlahan & Pengurangan ---
  {
    id: 71,
    question: "350 + 280 = ?",
    subtext: "Penjumlahan Ratusan",
    options: [
      { id: "A", label: "620", isCorrect: false },
      { id: "B", label: "630", isCorrect: true },
      { id: "C", label: "640", isCorrect: false },
      { id: "D", label: "530", isCorrect: false },
    ],
    explanation: "350 + 200 = 550, lalu 550 + 80 = 630! 🎯",
  },
  {
    id: 72,
    question: "1.000 - 350 = ?",
    subtext: "Pengurangan Ribuan",
    options: [
      { id: "A", label: "650", isCorrect: true },
      { id: "B", label: "750", isCorrect: false },
      { id: "C", label: "600", isCorrect: false },
      { id: "D", label: "700", isCorrect: false },
    ],
    explanation: "1.000 - 300 = 700, lalu 700 - 50 = 650! 💯",
  },
  {
    id: 73,
    question: "Pada bilangan 4.782, berapakah nilai tempat angka 7?",
    subtext: "Nilai Tempat",
    options: [
      { id: "A", label: "7", isCorrect: false },
      { id: "B", label: "70", isCorrect: false },
      { id: "C", label: "700", isCorrect: true },
      { id: "D", label: "7.000", isCorrect: false },
    ],
    explanation: "Angka 7 berada pada kolom ratusan, jadi nilainya 700! 🏫",
  },
  {
    id: 74,
    question: "Bulatkan angka 678 ke puluhan terdekat!",
    subtext: "Pembulatan",
    options: [
      { id: "A", label: "670", isCorrect: false },
      { id: "B", label: "680", isCorrect: true },
      { id: "C", label: "700", isCorrect: false },
      { id: "D", label: "690", isCorrect: false },
    ],
    explanation: "Angka satuannya adalah 8 (5 ke atas bulatkan naik), jadi 680! 🎯",
  },
  {
    id: 75,
    question: "Bulatkan angka 2.439 ke ratusan terdekat!",
    subtext: "Pembulatan",
    options: [
      { id: "A", label: "2.400", isCorrect: true },
      { id: "B", label: "2.500", isCorrect: false },
      { id: "C", label: "2.440", isCorrect: false },
      { id: "D", label: "2.000", isCorrect: false },
    ],
    explanation: "Angka puluhannya 3 (kurang dari 5 bulatkan turun), jadi 2.400! 📉",
  },
  {
    id: 76,
    question: "540 + 460 = ?",
    subtext: "Jumlah Pasangan 1000",
    options: [
      { id: "A", label: "900", isCorrect: false },
      { id: "B", label: "1.000", isCorrect: true },
      { id: "C", label: "1.100", isCorrect: false },
      { id: "D", label: "990", isCorrect: false },
    ],
    explanation: "540 + 460 = 1.000 pas! Angka seribu yang indah! 🏆",
  },
  {
    id: 77,
    question: "720 - 150 = ?",
    subtext: "Pengurangan",
    options: [
      { id: "A", label: "570", isCorrect: true },
      { id: "B", label: "580", isCorrect: false },
      { id: "C", label: "630", isCorrect: false },
      { id: "D", label: "560", isCorrect: false },
    ],
    explanation: "720 - 100 = 620, lalu 620 - 50 = 570! ⭐",
  },
  {
    id: 78,
    question: "Bentuk standar dari 4.000 + 300 + 20 + 5 adalah...",
    subtext: "Bentuk Panjang Bilangan",
    options: [
      { id: "A", label: "4.325", isCorrect: true },
      { id: "B", label: "43.025", isCorrect: false },
      { id: "C", label: "4.235", isCorrect: false },
      { id: "D", label: "432", isCorrect: false },
    ],
    explanation: "Gabungkan nilai ribuan, ratusan, puluhan, dan satuan: 4.325! 🧩",
  },
  {
    id: 79,
    question: "Bilangan manakah yang nilainya paling besar?",
    subtext: "Membandingkan Bilangan",
    options: [
      { id: "A", label: "7.809", isCorrect: false },
      { id: "B", label: "7.908", isCorrect: false },
      { id: "C", label: "7.980", isCorrect: true },
      { id: "D", label: "7.098", isCorrect: false },
    ],
    explanation: "Bandingkan angka ratusan dan puluhannya: 7.980 paling besar! 👑",
  },
  {
    id: 80,
    question: "800 - 245 = ?",
    subtext: "Pengurangan Meminjam",
    options: [
      { id: "A", label: "555", isCorrect: true },
      { id: "B", label: "565", isCorrect: false },
      { id: "C", label: "645", isCorrect: false },
      { id: "D", label: "545", isCorrect: false },
    ],
    explanation: "800 - 200 = 600, lalu 600 - 45 = 555! 🌟",
  },
  {
    id: 81,
    question: "Lanjutan dari pola bilangan: 4, 8, 12, 16, ___?",
    subtext: "Pola Bilangan",
    options: [
      { id: "A", label: "18", isCorrect: false },
      { id: "B", label: "20", isCorrect: true },
      { id: "C", label: "24", isCorrect: false },
      { id: "D", label: "22", isCorrect: false },
    ],
    explanation: "Pola bertambah 4 di setiap langkah! 16 + 4 = 20! 🦘",
  },
  {
    id: 82,
    question: "Lanjutan dari pola bilangan: 100, 90, 80, 70, ___?",
    subtext: "Pola Bilangan",
    options: [
      { id: "A", label: "65", isCorrect: false },
      { id: "B", label: "60", isCorrect: true },
      { id: "C", label: "50", isCorrect: false },
      { id: "D", label: "55", isCorrect: false },
    ],
    explanation: "Pola berkurang 10 di setiap langkah! 70 - 10 = 60! 📉",
  },
  {
    id: 83,
    question: "Lanjutan dari pola bilangan: 2, 4, 8, 16, ___?",
    subtext: "Pola Perkalian Dua",
    options: [
      { id: "A", label: "32", isCorrect: true },
      { id: "B", label: "24", isCorrect: false },
      { id: "C", label: "20", isCorrect: false },
      { id: "D", label: "28", isCorrect: false },
    ],
    explanation: "Pola dikali 2 di setiap langkah: 16 × 2 = 32! 🚀",
  },
  {
    id: 84,
    question: "625 + 375 = ?",
    subtext: "Penjumlahan Ratusan",
    options: [
      { id: "A", label: "950", isCorrect: false },
      { id: "B", label: "1.000", isCorrect: true },
      { id: "C", label: "1.050", isCorrect: false },
      { id: "D", label: "990", isCorrect: false },
    ],
    explanation: "600 + 300 = 900, dan 25 + 75 = 100. 900 + 100 = 1.000! 🎯",
  },
  {
    id: 85,
    question: "Pada bilangan 8.305, angka manakah yang menempati nilai puluhan?",
    subtext: "Nilai Tempat",
    options: [
      { id: "A", label: "8", isCorrect: false },
      { id: "B", label: "3", isCorrect: false },
      { id: "C", label: "0", isCorrect: true },
      { id: "D", label: "5", isCorrect: false },
    ],
    explanation: "Angka 0 menempati nilai puluhan (5 satuan, 3 ratusan, 8 ribuan)! ✨",
  },

  // --- 86 sampai 100: Pengukuran, Waktu & Soal Cerita ---
  {
    id: 86,
    question: "2 setengah jam sama dengan berapa menit?",
    subtext: "Satuan Waktu",
    options: [
      { id: "A", label: "120 menit", isCorrect: false },
      { id: "B", label: "150 menit", isCorrect: true },
      { id: "C", label: "180 menit", isCorrect: false },
      { id: "D", label: "140 menit", isCorrect: false },
    ],
    explanation: "2 jam = 120 menit, setengah jam = 30 menit. 120 + 30 = 150 menit! ⏱️",
  },
  {
    id: 87,
    question: "3 kilogram (kg) sama dengan berapa gram (g)?",
    subtext: "Satuan Berat",
    options: [
      { id: "A", label: "300 g", isCorrect: false },
      { id: "B", label: "3.000 g", isCorrect: true },
      { id: "C", label: "30.000 g", isCorrect: false },
      { id: "D", label: "30 g", isCorrect: false },
    ],
    explanation: "1 kg = 1.000 g, jadi 3 kg = 3.000 gram! ⚖️",
  },
  {
    id: 88,
    question: "4 meter (m) sama dengan berapa sentimeter (cm)?",
    subtext: "Satuan Panjang",
    options: [
      { id: "A", label: "40 cm", isCorrect: false },
      { id: "B", label: "400 cm", isCorrect: true },
      { id: "C", label: "4.000 cm", isCorrect: false },
      { id: "D", label: "440 cm", isCorrect: false },
    ],
    explanation: "1 meter = 100 cm, jadi 4 meter = 400 sentimeter! 📏",
  },
  {
    id: 89,
    question: "Leo memiliki 24 stiker. Ia membagikannya sama rata kepada 4 temannya. Berapa stiker yang diterima setiap teman?",
    subtext: "Soal Cerita Pembagian",
    options: [
      { id: "A", label: "4 stiker", isCorrect: false },
      { id: "B", label: "6 stiker", isCorrect: true },
      { id: "C", label: "8 stiker", isCorrect: false },
      { id: "D", label: "5 stiker", isCorrect: false },
    ],
    explanation: "24 stiker dibagi 4 orang: 24 ÷ 4 = 6 stiker per orang! 🎁",
  },
  {
    id: 90,
    question: "Satu kotak berisi 8 kue mangkuk. Berapa jumlah kue mangkuk di dalam 6 kotak?",
    subtext: "Soal Cerita Perkalian",
    options: [
      { id: "A", label: "42 kue", isCorrect: false },
      { id: "B", label: "48 kue", isCorrect: true },
      { id: "C", label: "54 kue", isCorrect: false },
      { id: "D", label: "46 kue", isCorrect: false },
    ],
    explanation: "8 kue × 6 kotak = 48 kue mangkuk! Enak sekali! 🧁",
  },
  {
    id: 91,
    question: "Sekolah dimulai pukul 08.00 pagi dan selesai pukul 14.30 siang. Berapa lama kegiatan belajar berlangsung?",
    subtext: "Durasi Waktu",
    options: [
      { id: "A", label: "6 jam", isCorrect: false },
      { id: "B", label: "6 jam 30 menit", isCorrect: true },
      { id: "C", label: "7 jam", isCorrect: false },
      { id: "D", label: "5 jam 30 menit", isCorrect: false },
    ],
    explanation: "Dari 08.00 ke 14.00 adalah 6 jam, ditambah 30 menit = 6 jam 30 menit! 🎒",
  },
  {
    id: 92,
    question: "Maya menabung Rp15.000 setiap minggu selama 4 minggu. Berapa total tabungan Maya?",
    subtext: "Soal Cerita Uang",
    options: [
      { id: "A", label: "Rp45.000", isCorrect: false },
      { id: "B", label: "Rp60.000", isCorrect: true },
      { id: "C", label: "Rp50.000", isCorrect: false },
      { id: "D", label: "Rp75.000", isCorrect: false },
    ],
    explanation: "Rp15.000 × 4 minggu = Rp60.000! Rajin menabung pangkal kaya! 💵",
  },
  {
    id: 93,
    question: "2 Liter (L) jus sama dengan berapa mililiter (mL)?",
    subtext: "Satuan Volume",
    options: [
      { id: "A", label: "200 mL", isCorrect: false },
      { id: "B", label: "2.000 mL", isCorrect: true },
      { id: "C", label: "20.000 mL", isCorrect: false },
      { id: "D", label: "20 mL", isCorrect: false },
    ],
    explanation: "1 Liter = 1.000 mL, jadi 2 Liter = 2.000 mililiter! 🧃",
  },
  {
    id: 94,
    question: "Kereta api berangkat pukul 15.15 dan tiba pukul 16.00. Berapa menit lama perjalanan kereta api?",
    subtext: "Perhitungan Waktu",
    options: [
      { id: "A", label: "40 menit", isCorrect: false },
      { id: "B", label: "45 menit", isCorrect: true },
      { id: "C", label: "50 menit", isCorrect: false },
      { id: "D", label: "35 menit", isCorrect: false },
    ],
    explanation: "Dari 15.15 sampai 16.00 lamanya 45 menit! Tut tut tut! 🚂",
  },
  {
    id: 95,
    question: "Liam memiliki 50 kelereng. Ia memberikan 18 kelereng kepada temannya. Berapa sisa kelereng Liam sekarang?",
    subtext: "Soal Cerita Pengurangan",
    options: [
      { id: "A", label: "32 kelereng", isCorrect: true },
      { id: "B", label: "34 kelereng", isCorrect: false },
      { id: "C", label: "28 kelereng", isCorrect: false },
      { id: "D", label: "38 kelereng", isCorrect: false },
    ],
    explanation: "50 - 18 = 32 kelereng tersisa! 🔮",
  },
  {
    id: 96,
    question: "Berapa detik dalam waktu 5 menit?",
    subtext: "Konversi Waktu",
    options: [
      { id: "A", label: "250 detik", isCorrect: false },
      { id: "B", label: "300 detik", isCorrect: true },
      { id: "C", label: "360 detik", isCorrect: false },
      { id: "D", label: "200 detik", isCorrect: false },
    ],
    explanation: "1 menit = 60 detik. Jadi 5 × 60 = 300 detik! ⏱️",
  },
  {
    id: 97,
    question: "Sebuah buku memiliki 120 halaman. Rian membaca 10 halaman setiap malam. Berapa hari buku itu akan habis dibaca?",
    subtext: "Soal Cerita Pembagian",
    options: [
      { id: "A", label: "10 hari", isCorrect: false },
      { id: "B", label: "12 hari", isCorrect: true },
      { id: "C", label: "14 hari", isCorrect: false },
      { id: "D", label: "15 hari", isCorrect: false },
    ],
    explanation: "120 dibagi 10 = 12 hari untuk menyelesaikan buku! 📖",
  },
  {
    id: 98,
    question: "Ada berapa hari dalam kurun waktu 6 minggu?",
    subtext: "Hari & Kalender",
    options: [
      { id: "A", label: "36 hari", isCorrect: false },
      { id: "B", label: "42 hari", isCorrect: true },
      { id: "C", label: "48 hari", isCorrect: false },
      { id: "D", label: "40 hari", isCorrect: false },
    ],
    explanation: "1 minggu ada 7 hari. 7 hari × 6 minggu = 42 hari! 🗓️",
  },
  {
    id: 99,
    question: "Siti membeli 3 buku tulis seharga Rp4.000 per buku dan 1 pensil seharga Rp2.000. Berapa total uang yang harus ia bayar?",
    subtext: "Soal Cerita Campuran",
    options: [
      { id: "A", label: "Rp12.000", isCorrect: false },
      { id: "B", label: "Rp14.000", isCorrect: true },
      { id: "C", label: "Rp16.000", isCorrect: false },
      { id: "D", label: "Rp10.000", isCorrect: false },
    ],
    explanation: "Buku: 3 × Rp4.000 = Rp12.000. Ditambah pensil Rp2.000 = Rp14.000! ✏️",
  },
  {
    id: 100,
    question: "Sebuah pizza dipotong menjadi 8 bagian sama besar. Jika Budi makan 3 potong dan Ani makan 2 potong, berapa bagian pizza yang tersisa?",
    subtext: "Soal Cerita Pecahan",
    options: [
      { id: "A", label: "3/8 bagian", isCorrect: true },
      { id: "B", label: "2/8 bagian", isCorrect: false },
      { id: "C", label: "5/8 bagian", isCorrect: false },
      { id: "D", label: "4/8 bagian", isCorrect: false },
    ],
    explanation: "Sudah dimakan: 3 + 2 = 5 potong. Sisanya: 8 - 5 = 3 potong, yaitu 3/8 bagian pizza! 🍕",
  },
];

const CUSTOM_QUESTIONS_KEY = "raniaarchi_custom_questions";

/** Mengambil soal tambahan dari localStorage */
export function getCustomQuestions(): Question[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Mengambil seluruh soal (100 Soal Bawaan + Soal Tambahan Admin) */
export function getAllQuestions(): Question[] {
  const custom = getCustomQuestions();
  return [...QUESTION_BANK, ...custom];
}

/** Ambil soal tambahan dari Supabase (jika aktif) atau localStorage */
export async function fetchCustomQuestions(): Promise<Question[]> {
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("id, question, subtext, options, explanation")
        .order("id", { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: Question[] = data.map((item) => ({
          id: Number(item.id),
          question: item.question,
          subtext: item.subtext,
          options: item.options,
          explanation: item.explanation,
        }));

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(mapped));
          } catch {
            // Ignore
          }
        }
        return mapped;
      }
    } catch {
      // Fallback
    }
  }

  return getCustomQuestions();
}

/** Menambahkan soal baru oleh Admin */
export async function addCustomQuestion(params: {
  question: string;
  subtext: string;
  options: QuestionOption[];
  explanation: string;
}): Promise<Question> {
  const currentCustom = getCustomQuestions();
  const nextId = 100 + currentCustom.length + 1;

  const newQuestion: Question = {
    id: nextId,
    question: params.question.trim(),
    subtext: params.subtext.trim() || "Soal Tambahan Guru",
    options: params.options,
    explanation: params.explanation.trim() || "Jawaban tepat! Hebat sekali! 🌟",
  };

  // Simpan ke Supabase jika aktif
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("questions")
        .insert({
          question: newQuestion.question,
          subtext: newQuestion.subtext,
          options: newQuestion.options,
          explanation: newQuestion.explanation,
        })
        .select()
        .single();

      if (!error && data) {
        newQuestion.id = Number(data.id);
      }
    } catch {
      // Fallback
    }
  }

  // Simpan ke localStorage
  if (typeof window !== "undefined") {
    try {
      const updated = [...currentCustom, newQuestion];
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }

  return newQuestion;
}

/** Menghapus soal tambahan */
export async function deleteCustomQuestion(id: number): Promise<boolean> {
  if (supabase && isSupabaseConfigured()) {
    try {
      await supabase.from("questions").delete().eq("id", id);
    } catch {
      // Fallback
    }
  }

  if (typeof window !== "undefined") {
    try {
      const current = getCustomQuestions();
      const updated = current.filter((q) => q.id !== id);
      localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(updated));
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

/**
 * Pengacakan Fisher-Yates untuk memilih tepat `count` soal unik
 * dari bank soal (100 soal bawaan + soal tambahan dari guru).
 */
export function getRandomQuizQuestions(count: number = 10): Question[] {
  const pool = getAllQuestions();
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
