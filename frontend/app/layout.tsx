import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingAIChat from "@/components/FloatingAIChat";
import AIButtonHandler from "@/components/AIButtonHandler";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AiGentsRealty - Dubai Off-Plan Property Investment Platform",
  description: "AI-powered platform for discovering and investing in Dubai's best off-plan projects. Compare developers, calculate ROI, and find your perfect property.",
  keywords: ["Dubai", "off-plan", "real estate", "investment", "property", "Emaar", "DAMAC"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
        <AIButtonHandler />
        <FloatingAIChat />
      </body>
    </html>
  );
}
