import type { Metadata } from "next";
import { Russo_One, Inter } from "next/font/google";
import "./globals.css";

const russoOne = Russo_One({
  variable: "--font-russo-one",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "USDC TROLL — Stake & Troll",
  description:
    "USDC TROLL — the memecoin that trolls the market. Stake your TROLL, earn rewards, stay smug.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${russoOne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
