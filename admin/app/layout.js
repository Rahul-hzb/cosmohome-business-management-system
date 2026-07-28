import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppProvider from "@/providers/app-provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Cosmohome Admin",
  description: "Business Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
