import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marco Antônio Bruschi | Engenharia de Software & Full Stack",
  description: "Portfólio de Marco Antônio Silva Bruschi — Estudante de Engenharia de Software na PUCPR e Desenvolvedor Full Stack especializado em back-end escalável, segurança stateless e integrações com IA.",
  keywords: ["Marco Bruschi", "Engenharia de Software", "Full Stack", "Node.js", "React", "TypeScript", "PUCPR", "Curitiba"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
