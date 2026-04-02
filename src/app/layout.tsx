import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ModeProvider } from "@/context/ModeContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tradingmatrix.org'),
  title: "TradingMatrix — Wholesale & Retail Solutions",
  description:
    "Discover consumer and business products from global manufacturers. Seamless pricing, powerful search, and direct checkout.",
  keywords: ["wholesale", "retail", "consumer", "business", "global manufacturer", "product showcase", "tradingmatrix"],
  openGraph: {
    title: "TradingMatrix — Wholesale & Retail Solutions",
    description: "Wholesale & retail products with seamless checkout.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ModeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ModeProvider>
      </body>
    </html>
  );
}
