import type { Metadata } from "next";
import { Urbanist, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const fontHeading = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const fontSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
});

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "RecallGuard Canada - Product Recall Monitoring",
  description: "Monitor Canadian recalls against your product list and protect your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontHeading.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans" suppressHydrationWarning>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
