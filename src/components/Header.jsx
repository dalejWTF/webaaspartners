"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import Nav from './Nav';
import MobileNav from './MobileNav';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from "next-intl"; // Importa el hook

const Header = () => {
  const t = useTranslations('Header'); // Obtén las traducciones para esta página
  const pathname = usePathname();

  // Extraemos el idioma actual de la URL (esto se hace dividiendo la URL y obteniendo el primer segmento)
  const locale = pathname.split('/')[1] || 'en'; // 'en' es el idioma por defecto

  // Validar si el idioma es válido (esto depende de los idiomas que soportes)
  const validLocales = ['en', 'es']; // Lista de idiomas válidos
  if (!validLocales.includes(locale)) {
    // Redirigir a una página de error si el idioma no es válido
    // Puede ser una página de 404 personalizada o redirigir al idioma por defecto
    window.location.href = `/en${pathname.replace(/^\/[a-z]{2}/, '')}`;
  }

  return (
    <header className="py-8 xxl:pt-8 xxl:pb-4 xl:pt-4 xl:pb-2">
      <div className="container mx-auto flex justify-between">
        {/* logo */}
        <Link href={`/${locale}`}>
          <h1 className="text-4xl font-semibold">
            {process.env.NEXT_PUBLIC_SITE_TITLE} <span className="text-accent">{process.env.NEXT_PUBLIC_SITE_TITLE_SPAN}</span>
          </h1>
          <span className='text-md text-accent'>{t("siteSubtitle")}</span>
        </Link>

        {/* desktop nav & contact */}
        <div className="hidden xl:flex items-center gap-8 text-accent">
          <Nav /> {/* Ya no pasamos el locale como prop */}
          <Link href={`/${locale}/contact`}>
            <Button variant="outline" className="text-primary/60">
              {t("Contact")}
            </Button>
          </Link>
          {/* Dropdown de idioma */}
          <LanguageSwitcher />
        </div>

        {/* mobile nav & contact */}
        <div className="xl:hidden">
          <MobileNav /> {/* Ya no pasamos el locale como prop */}
        </div>
      </div>
    </header>
  );
};

export default Header;