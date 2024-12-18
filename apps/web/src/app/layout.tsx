import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <nav className="flex flex-row bg-white items-center px-5 h-16 ">
          <Link className="font-bold text-gray-500" href="/">
            <Image
              src="/images/logo.png"
              alt="FSE Logo"
              width={80}
              height={40}
              priority
            />
          </Link>
        </nav>
        <main className="flex flex-col items-center p-5">{children}</main>
      </body>
    </html>
  );
}
