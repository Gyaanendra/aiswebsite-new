import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { twMerge } from "tailwind-merge";
import "./globals.css";
import CustomCursor from "@/components/global/CustomCursor";
import GlassNavbar from "@/components/global/GlassNavbar";

export const metadata: Metadata = {
  title: "AIS",
  description: "Artificial Intelligence Society",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={twMerge("min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlassNavbar />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
