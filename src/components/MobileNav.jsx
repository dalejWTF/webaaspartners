"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl"; // Importa el hook para las traducciones
import config from "@/config";

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Header'); // Traducciones de la sección de navegación

  const [open, setOpen] = React.useState(false); // Para manejar el estado del menú

  // Extraemos el idioma de la URL
  const locale = pathname.split('/')[1] || 'en'; // 'en' es el idioma por defecto

  // Lista de enlaces con idioma dinámico
  const links = [
    { name: "Home", path: `/${locale}` },
    //{ name: "Services", path: `/${locale}/services` },
    { name: "Contact", path: `/${locale}/contact` }
  ];

  // Función para manejar el cambio de idioma
  const handleLanguageChange = (languageCode) => {
    const currentPath = window.location.pathname;
    // Redirigir al idioma seleccionado manteniendo la ruta actual
    router.push(`/${languageCode}${currentPath.replace(/^\/[a-z]{2}/, '')}`);
    setOpen(false); // Cerrar el menú
  };

  const handleLinkClick = () => {
    setOpen(false); // Cerrar el menú cuando se hace clic en una opción
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <FaBars className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href={`/${locale}`}>
            <h1 className="text-4xl font-semibold text-white">
              {config.siteTitle}<br/><span className="text-4xl font-semibold text-accent">{config.siteTitleSpan}</span>
            </h1>
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col justify-center items-center gap-8 text-accent">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={handleLinkClick} // Cerrar el menú al hacer clic
              className={`
                ${link.path === pathname && "text-white border-b-2 border-accent"}
                text-xl capitalize hover:text-white transition-all`}
            >
              {t(link.name)}
            </Link>
          ))}
        </nav>

        {/* Dropdown de idioma */}
        <LanguageSwitcher onLanguageChange={handleLanguageChange} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
