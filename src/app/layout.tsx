import type { Metadata } from "next";
import { EB_Garamond, Hanken_Grotesk } from "next/font/google";
import Sidebar from "@/component/Sidebar";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UserHub",
  description: "A simple user directory",
  icons: {
    icon: "/userhub-logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
