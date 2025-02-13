"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl"; // Importa el hook

const info = [
    {
        icon: <FaPhoneAlt />,
        title: "Phone Argentina",
        text: "+54 9 11 6053 4334"
    },
    {
        icon: <FaPhoneAlt />,
        title: "Phone EC",
        text: "+593 99 612 7261"
    },
    {
        icon: <FaEnvelope />,
        title: "Email",
        text: "hola@aaspartners.com"
    }
]

const Contact = () => {
    const t = useTranslations('Contact'); // Obtén las traducciones para esta página
    return (
        <motion.section initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: { delay: 1, duration: 0.4, ease: "easeIn" }
            }}
            className="py-6">
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row gap-[30px]">
                    {/* Formulario de contacto */}
                    <div className="xl:h-[54%] order-2 xl:order-none">
                        <form className="flex flex-col gap-6 p-10 border border-accent rounded-xl">
                            <h3 className="text-4xl text-accent">{t('formTitle')}</h3> {/* Título dinámico */}
                            <p className="text-primary/90">{t('formDescription')}</p> {/* Descripción dinámica */}
                            {/* Campos de entrada */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input type="firstname" placeholder={t('firstNamePlaceholder')} />
                                <Input type="lastname" placeholder={t('lastNamePlaceholder')} />
                                <Input type="email" placeholder={t('emailPlaceholder')} />
                                <Input type="phone" placeholder={t('phonePlaceholder')} />
                            </div>
                            {/* Selección de servicio */}
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('selectServicePlaceholder')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{t('selectService')}</SelectLabel>
                                        <SelectItem value="intdes">{t('serviceInteriorDesign')}</SelectItem>
                                        <SelectItem value="remo">{t('serviceRemodeling')}</SelectItem>
                                        <SelectItem value="build">{t('serviceBuilding')}</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* Campo de texto */}
                            <Textarea className="h-[200px]" placeholder={t('messagePlaceholder')} />
                            {/* Botón de envío */}
                            <Button className="max-w-40" variant='outline'>{t('sendMessageButton')}</Button>
                        </form>
                    </div>
                    {/* Información de contacto */}
                    <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                        <ul className="flex flex-col gap-10">
                            {info.map((item, index) => {
                                return (
                                    <li key={index} className="flex items-center gap-6">
                                        <div className="w-[40px] h-[40px] xl:w-[60px] xl:h-[60px] bg-primary/80 text-white rounded-md flex items-center justify-center">
                                            <div className="text-[20px]">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p>{t(item.title)}</p> {/* Título dinámico */}
                                            <h3 className="text-xl">{item.text}</h3>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Contact;
