"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl"; // Importa el hook

const Nav = ({ locale }) => {
    const pathname = usePathname();
    const t = useTranslations('Header'); // Obtén las traducciones para esta página

    const links = [
        {
            name: "Home",
            path: `/${locale}`
        },
        {
            name: "Services",
            path: `/${locale}/services`
        }
    ];

    return (
        <nav className="flex gap-8">
            {links.map((link, index) => {
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={`${link.path === pathname && "text-primary border-b-2 border-accent"
                            } capitalize font-medium hover:text-primary transition-all`}
                    >
                        {t(link.name)}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Nav;
