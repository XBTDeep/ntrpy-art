import type { Metadata, Viewport } from "next";
import { Unbounded, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "900"],
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "NTRPY — The Turning Within",
  description:
    "Chaos into order. Order into chaos. A neo-spiritual archive of transformation, rendered in chrome. Pronounced entropy.",
};

export const viewport: Viewport = {
  themeColor: "#030303",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable}`}
      >
        {children}
        {/* film grain */}
        <div className="grain" aria-hidden="true" />
        {/* scanlines */}
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
