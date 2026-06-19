import type { Metadata } from "next";
import {
  Instrument_Serif,
  Newsreader,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Cursor from "@/components/motion/Cursor";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import { PageTransitionProvider } from "@/components/motion/PageTransition";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const newsreader = Newsreader({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanvi Chowdhury — Frontend Engineer",
  description:
    "Frontend engineer focused on motion, interaction design, and the craft of shipping software that feels considered, responsive, and alive.",
  openGraph: {
    title: "Tanvi Chowdhury — Frontend Engineer",
    description:
      "Frontend engineer building interactive web products — React, TypeScript, motion systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${newsreader.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            {children}
            <Cursor />
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
