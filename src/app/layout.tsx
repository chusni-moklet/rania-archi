import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RaniaArchi | Petualangan Matematika Kelas 4",
  description: "Website edukasi belajar matematika interaktif dan menyenangkan untuk siswa kelas 4 SD. Kuasai perkalian, selesaikan kuis harian, dan raih bintang emas bersama RaniaArchi!",
  keywords: ["RaniaArchi", "belajar matematika", "matematika kelas 4", "game edukasi anak", "tabel perkalian", "kuis matematika"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B5CF6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-screen bg-[#F3E8FF] text-[#1F2937] flex flex-col">
        {children}
      </body>
    </html>
  );
}
