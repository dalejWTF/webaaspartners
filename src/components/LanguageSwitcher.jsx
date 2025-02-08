'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select"; // Asegúrate de que este `Select` esté disponible en tu proyecto
import { GrLanguage } from "react-icons/gr";


const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname(); // Obtener el pathname actual para determinar el idioma actual

    // Idiomas disponibles
    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'es', label: 'ES' }
    ];

    // Función para cambiar el idioma
    const handleChangeLanguage = (languageCode) => {
        const currentPath = window.location.pathname;
        // Redirigir al idioma seleccionado
        router.push(`/${languageCode}${currentPath.replace(/^\/[a-z]{2}/, '')}`);
    };

    // Obtener el idioma actual desde el pathname
    const currentLanguage = pathname.split('/')[1] || 'en'; // Si no hay idioma en el path, usar 'en' por defecto

    return (
        <Select value={currentLanguage} onValueChange={handleChangeLanguage}>
            <SelectTrigger className="flex items-center gap-2 xl:text-primary text-accent">
                <GrLanguage />
                <span>{currentLanguage.toUpperCase()}</span> {/* Mostrar el idioma seleccionado */}
            </SelectTrigger>
            <SelectContent className="w-auto p-0">
                <SelectGroup>
                    {languages.map(({ code, label }) => (
                        <SelectItem key={code} value={code} className="text-sm py-1 px-2">
                            {label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LanguageSwitcher;
