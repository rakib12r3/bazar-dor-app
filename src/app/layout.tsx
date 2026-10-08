import type { Metadata } from "next";
import {Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const notoSerifBengali = Noto_Serif_Bengali({

  subsets: ["latin","bengali"],
});



export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাজার দর ওয়েবসাইট",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en" data-theme="light"
      className={`${notoSerifBengali.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
