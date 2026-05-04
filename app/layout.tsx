import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GIX Lab 5 — Equipment & Events",
  description:
    "Next.js + Supabase — equipment checkout tracker and GIX events with category filters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-black/10 dark:border-white/15 py-6 text-center text-xs text-black/50 dark:text-white/50">
          TECHIN 510 · Week 5 · Open-Meteo + Supabase
        </footer>
      </body>
    </html>
  );
}
