import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "400", "600"]
});

const open_sans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guardrail Agent",
  description: "Hackathon Guardrail Agent - Patagonia Coders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased wh-100`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
