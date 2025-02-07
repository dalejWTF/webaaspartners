"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {CiMenuFries} from "react-icons/ci";


const links = [
    {
        name: "home",
        path: "/"
    },
    {
        name: "services",
        path: "/services"
    },
    {
        name: "contact us",
        path: "/contact"
    }
]

const MobileNav = () => {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false); // Para manejar el estado del menú
  
    const handleLinkClick = () => {
      setOpen(false); // Cerrar el menú cuando se hace clic en una opción
    };
  
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex justify-center items-center">
          <CiMenuFries className="text-[32px] text-primary" />
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <div className="mt-32 mb-40 text-center text-2xl">
            <Link href="/">
              <h1 className="text-4xl font-semibold text-accent">
                A+AS <span>Partners</span>
              </h1>
            </Link>
          </div>
          <nav className="flex flex-col justify-center items-center gap-8 text-accent">
            {links.map((link, index) => {
              return (
                <Link
                  href={link.path}
                  key={index}
                  onClick={handleLinkClick} // Cerrar el menú al hacer clic
                  className={`
                    ${link.path === pathname && "text-white border-b-2 border-accent"}
                    text-xl capitalize hover:text-white transition-all`}>
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    );
  };
  
  export default MobileNav;