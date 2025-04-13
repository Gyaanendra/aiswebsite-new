import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/global/CustomCursor";
import GlassNavbar from "@/components/global/GlassNavbar";


// import ParticleBackground from "@/components/home/ParticleBackground"
import localFont from 'next/font/local'

// Load Aileron font
const aileronFont = localFont({
  src: '../public/fonts/Aileron-Regular.otf',
  variable: '--font-aileron'
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIS",
  description: "Artificial Intelligence Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${aileronFont.variable}`}>
      <body
        className={aileronFont.className}
      >
        {" "}
        <GlassNavbar />
        <CustomCursor /> {/* Add this line */}
        {/* <ParticleBackground /> */}
        {children}
      </body>
    </html>
  );
}
