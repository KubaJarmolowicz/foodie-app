import type { Metadata } from "next";
import { Quicksand, Montserrat } from "next/font/google";
import "./globals.css";
import { MainHeader } from "@/components/main-header/main-header";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextLevel Food",
  description: "GDelicious meals, shared by a food-loving community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${montserrat.variable} font-quicksand`}
      >
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
