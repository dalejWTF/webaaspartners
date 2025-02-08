"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import Nav from './Nav';
import MobileNav from './MobileNav';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from "next-intl"; // Importa el hook

const Header = ({ locale = 'en' }) => {
  const t = useTranslations('Header'); // Obtén las traducciones para esta página
  const pathname = usePathname();

  return (
    <header className="py-8 xl:py-12">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href={`/${locale}`}>
          <h1 className="text-4xl font-semibold">
            A+AS <span className="text-accent">Partners</span>
          </h1>
        </Link>

        {/* desktop nav & contact */}
        <div className="hidden xl:flex items-center gap-8 text-accent">
          <Nav locale={locale} />
          <Link href={`/${locale}/contact`}>
            <Button variant="outline" className="text-primary">
              {t("Contact")}
            </Button>
          </Link>
          {/* Dropdown de idioma */}
          <LanguageSwitcher />
        </div>

        {/* mobile nav & contact */}
        <div className="xl:hidden">
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
};

export default Header;
