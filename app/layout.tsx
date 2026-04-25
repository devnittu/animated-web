import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deep Space | Cinematic Space Exploration",
  description:
    "An immersive cinematic Interstellar-style deep space experience. Black holes, orbital mechanics, and NASA-grade motion storytelling.",
  keywords: ["space exploration", "black hole", "Interstellar", "cinematic", "astronomy"],
  openGraph: {
    title: "Deep Space | Cinematic Space Exploration",
    description: "Journey beyond the event horizon — an immersive cinematic space experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <body style={{ background: "#000" }}>
        {children}
      </body>
    </html>
  );
}
