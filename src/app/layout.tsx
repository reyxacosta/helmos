import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/features/shell/providers/theme-provider";
import { THEME_COOKIE } from "@/features/shell/config/cookies";
import type { Theme } from "@/features/shell/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HelmOS",
  description: "HelmOS — a personal operating system for every part of life.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  // Dark by default until the user explicitly opts into light mode.
  const theme: Theme = cookieStore.get(THEME_COOKIE)?.value === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      data-theme={theme}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
