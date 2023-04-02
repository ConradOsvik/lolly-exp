import Header from "@/components/layout/header";
import "./globals.css";
import { Rubik } from "next/font/google";
import Footer from "@/components/layout/footer";

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.className}>
      <body className="bg-gray-50">
        <Header />
        <main className="mt-[80px] flex h-[calc(100vh-80px)] flex-col items-center justify-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
