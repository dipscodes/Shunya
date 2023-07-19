import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shunya",
  description: "Awesome todo app that has never been done",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-800 px-5 text-slate-100 flex flex-row justify-center items-center`}
      >
        {children}
      </body>
    </html>
  );
}
