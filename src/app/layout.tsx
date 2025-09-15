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
  title: "Générateur de Prompts Windsurf - Code Parfait à Chaque Fois",
  description: "Transformez vos idées de codage en prompts parfaitement optimisés qui génèrent du code sans erreur et prêt pour la production. Alimenté par l'IA, aucune inscription requise.",
  keywords: "windsurf, prompt generator, ai coding, code generation, développement, programmation",
  authors: [{ name: "Générateur de Prompts Windsurf" }],
  openGraph: {
    title: "Générateur de Prompts Windsurf",
    description: "Obtenez du code parfait de Windsurf à chaque fois avec nos prompts optimisés par l'IA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
