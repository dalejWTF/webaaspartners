//app/(frontend)/[locale]/layout.jsx

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';


const interFont = Inter({
  variable: "--font-interFont",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: process.env.NEXT_PUBLIC_META_TITLE,
  description: process.env.NEXT_PUBLIC_META_DESCRIPTION,
};

// Aquí se asegura de que `params` se resuelva correctamente
export default async function RootLayout({ children, params }) {
  // Esperar a que `params` esté disponible
  const { locale } = await params;

  // Verificar si el `locale` es válido
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Obtener los mensajes de la localización
  const messages = await getMessages(locale);

  return (

    <NextIntlClientProvider messages={messages}>
      <Header />
      <StairTransition />
      <PageTransition>{children}</PageTransition>
    </NextIntlClientProvider>
  );
}
