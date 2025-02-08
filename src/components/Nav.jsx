"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation'; // usePathname para obtener la ruta actual
import { useTranslations } from "next-intl"; // Importa el hook para las traducciones

const Nav = () => {
  const pathname = usePathname(); // Ruta actual
  const t = useTranslations('Header'); // Traducciones de la sección de navegación

  // Extraemos el idioma actual de la URL (esto se hace dividiendo la URL y obteniendo el primer segmento)
  const locale = pathname.split('/')[1] || 'en';  // 'en' es el idioma por defecto

  const links = [
    { name: "Home", path: `/${locale}` },
    { name: "Services", path: `/${locale}/services` }
  ];

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <Link
          href={link.path}
          key={index}
          className={`${link.path === pathname ? "text-primary border-b-2 border-accent" : ""} 
                      capitalize font-medium hover:text-primary transition-all`}
        >
          {t(link.name)}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
