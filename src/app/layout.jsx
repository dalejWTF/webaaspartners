import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const interFont = Inter({
  variable: "--font-interFont",
  weight: ["100","200","300","400","500","600","700","800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "A+AS Partners",
  description: "Building your dreams",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={interFont.variable}>
        <Header/>
        <StairTransition/>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
