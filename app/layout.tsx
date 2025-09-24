import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";

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
        className="font-sans antialiased min-h-screen"
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
