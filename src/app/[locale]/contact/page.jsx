"use client";

import { useState } from "react";
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
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SubmitButton } from "@/components/SubmitButton";

const info = [
    {
        icon: <FaPhoneAlt />,
        title: "Argentina",
        text: "+54 9 1160 53 4334"
    },
    {
        icon: <FaPhoneAlt />,
        title: "Ecuador",
        text: "+593 99 612 7261"
    },
    {
        icon: <FaEnvelope />,
        title: "Email",
        text: "hola@aasarchitects.com"
    }
];

const Contact = () => {
    const t = useTranslations('Contact');
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        // Validar que solo se ingresen números y el símbolo "+" al inicio
        const cleanedValue = value.replace(/[^0-9+]/g, ''); // Eliminar caracteres no permitidos
        if (cleanedValue.startsWith('+') || !cleanedValue.includes('+')) {
            setFormData({ ...formData, phone: cleanedValue });
        }
    };

    const handleServiceChange = (value) => {
        setFormData({ ...formData, service: value }); // Almacena el valor crudo
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsLoading(false);
                }, 3000);
            } else {
                alert(t('emailSentError'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert(t('emailSentError'));
        } finally {
            if (!isSuccess) {
                setIsLoading(false);
            }
        }
    };

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
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 border border-accent rounded-xl">
                            <h3 className="text-4xl text-accent">{t('formTitle')}</h3>
                            <p className="text-primary/90">{t('formDescription')}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    type="text"
                                    name="firstname"
                                    placeholder={t('firstNamePlaceholder')}
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required // Campo obligatorio
                                    title="Por favor, ingresa tu nombre."
                                />
                                <Input
                                    type="text"
                                    name="lastname"
                                    placeholder={t('lastNamePlaceholder')}
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required // Campo obligatorio
                                    title="Por favor, ingresa tu apellido."
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder={t('emailPlaceholder')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required // Campo obligatorio
                                    title="Por favor, ingresa un correo electrónico válido."
                                />
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder={t('phonePlaceholder')}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    pattern="\+?[0-9]*"
                                    required // Campo obligatorio
                                    title="Por favor, ingresa un número de teléfono válido (solo números y el símbolo + al inicio)."
                                />
                            </div>
                            <Select onValueChange={handleServiceChange} required> {/* Campo obligatorio */}
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
                            <Textarea
                                className="h-[200px]"
                                name="message"
                                placeholder={t('messagePlaceholder')}
                                value={formData.message}
                                onChange={handleChange}
                                required // Campo obligatorio
                                title="Por favor, ingresa un mensaje."
                            />
                            {/* Usar el nuevo componente SubmitButton */}
                            <SubmitButton
                                isLoading={isLoading}
                                isSuccess={isSuccess}
                                sendMessageButton={t('sendMessageButton')}
                                sendingMessageButton={t('sendingMessageButton')}
                                emailSentSuccess={t('emailSentSuccess')}
                            />
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
                                            <p>{item.title}</p> 
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
    );
};

export default Contact;