// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Showcasing my projects, skills, and experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="relative">
        <div className="custom-cursor" id="cursor"></div>
        <Navbar />
        <main className="min-h-screen pt-20 flex justify-center">
          <div className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>


        <Footer />
      </body>
    </html>
  );
}
