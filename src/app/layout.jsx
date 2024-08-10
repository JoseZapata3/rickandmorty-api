import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
        <header>
                <Link href={`http://localhost:3000`}>
                  <Image src="/img/react-rickandmorty.jpg" width={100} height={100} priority={true} alt={`Home page Logo`}/>
                </Link>
        </header>
          {children}
        </body>
    </html>
  );
}
