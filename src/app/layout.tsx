import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // ← nuevo

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Título y descripción que ve el navegador y Google
export const metadata: Metadata = {
  title: "Biblioteca de Platinos",
  description: "Lleva el control de los juegos que quieres platinar",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es"> {/* ← idioma de la página */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar /> {/* ← el menú aparece en todas las páginas */}
        {children}
      </body>
    </html>
  );
}
