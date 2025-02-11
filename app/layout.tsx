import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/global/CustomCursor";
import GlassNavbar from "@/components/global/GlassNavbar";




// import ParticleBackground from "@/components/home/ParticleBackground"


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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
     
        
     
        <GlassNavbar />
        <CustomCursor /> {/* Add this line */}
        {/* <ParticleBackground /> */}
        
        
     
        {children}
        <div className="orb orb-blue" />
        <div className="orb orb-purple" />
      </body>
    </html>
  );
}
