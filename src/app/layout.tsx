import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cultura Builder Hub — Seja um Builder Local Certificado",
  description:
    "Builders que usam IA pra ganhar dinheiro abrindo escritórios locais da Cultura Builder. Powered by AWS e NVIDIA Inception.",
  metadataBase: new URL("http://localhost:3001"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
