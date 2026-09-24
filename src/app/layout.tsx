import type { Metadata } from "next";
import { Syne, Manrope, Fragment_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MockMind | Elite Talent",
  description: "Rigorous, voice-based AI mock interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable} ${fragmentMono.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#050505] text-[#FAFAFA]">{children}</body>
    </html>
  );
}
