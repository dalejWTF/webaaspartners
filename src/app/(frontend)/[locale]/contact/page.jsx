"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

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

import { SubmitButton } from "@/components/SubmitButton";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const info = [
    { icon: <FaPhoneAlt />, title: "Argentina", text: "+54 9 11 6053-4334" },
    { icon: <FaPhoneAlt />, title: "Argentina", text: "+54 9 11 7110-4201" },
    { icon: <FaPhoneAlt />, title: "Ecuador", text: "+593 99 612 7261" },
    { icon: <FaEnvelope />, title: "Email", text: "hola@aasarchitects.com" }
];

const INITIAL_FORM = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: ""
};

export default function Contact() {
    const t = useTranslations("Contact");
    const locale = useLocale();

    const [services, setServices] = useState([]);
    const [servicesLoading, setServicesLoading] = useState(true);

    const [formData, setFormData] = useState(INITIAL_FORM);

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function loadServices() {
            setServicesLoading(true);
            try {
                const qs =
                    `where[active][equals]=true` +
                    `&limit=200` +
                    `&locale=${encodeURIComponent(locale)}` +
                    `&fallback-locale=none`;

                const res = await fetch(`/api/services?${qs}`, { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to load services");

                const data = await res.json();
                const docs = (data?.docs ?? []).filter(
                    (s) => typeof s?.label === "string" && s.label.trim().length > 0
                );

                if (!cancelled) setServices(docs);
            } catch (e) {
                console.error(e);
                if (!cancelled) setServices([]);
            } finally {
                if (!cancelled) setServicesLoading(false);
            }
        }

        loadServices();
        return () => {
            cancelled = true;
        };
    }, [locale]);

    const sortedServices = useMemo(() => {
        return [...services].sort((a, b) =>
            (a?.label ?? "").localeCompare(b?.label ?? "", locale)
        );
    }, [services, locale]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handlePhoneChange = (e) => {
        const cleanedValue = e.target.value.replace(/[^0-9+]/g, "");
        if (cleanedValue.startsWith("+") || !cleanedValue.includes("+")) {
            setFormData((p) => ({ ...p, phone: cleanedValue }));
        }
    };

    const handleServiceChange = (value) => {
        setFormData((p) => ({ ...p, service: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, locale })
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData(INITIAL_FORM);
                setIsLoading(false);
                setTimeout(() => setIsSuccess(false), 3000);
            } else {
                setIsLoading(false);
                alert(t("emailSentError"));
            }
        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
            alert(t("emailSentError"));
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1, duration: 0.4, ease: "easeIn" } }}
            className="py-4 xl:py-0"
        >
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row gap-[30px]">
                    <div className="xl:h-[54%] order-2 xl:order-none">
                        <form
                            onSubmit={handleSubmit}
                            className="contact-form flex flex-col gap-6 p-10 border border-accent rounded-xl"
                        >
                            <h3 className="text-4xl text-accent">{t("formTitle")}</h3>
                            <p className="text-primary/90">{t("formDescription")}</p>

                            <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    name="firstname"
                                    placeholder={t("firstNamePlaceholder")}
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    name="lastname"
                                    placeholder={t("lastNamePlaceholder")}
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder={t("emailPlaceholder")}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder={t("phonePlaceholder")}
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    pattern="\+?[0-9]*"
                                    required
                                />
                            </div>

                            <Select
                                value={formData.service}
                                onValueChange={handleServiceChange}
                                required
                                disabled={servicesLoading}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={servicesLoading ? "..." : t("selectServicePlaceholder")}
                                    />
                                </SelectTrigger>

                                <SelectContent className="max-h-[280px] overflow-y-auto">
                                    <SelectGroup>
                                        <SelectLabel>{t("selectService")}</SelectLabel>

                                        {sortedServices.map((s) => (
                                            <SelectItem key={s.slug} value={s.slug}>
                                                {s.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Textarea
                                className="contact-textarea h-[200px]"
                                name="message"
                                placeholder={t("messagePlaceholder")}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />

                            <SubmitButton
                                isLoading={isLoading}
                                isSuccess={isSuccess}
                                sendMessageButton={t("sendMessageButton")}
                                sendingMessageButton={t("sendingMessageButton")}
                                emailSentSuccess={t("emailSentSuccess")}
                            />
                        </form>
                    </div>

                    <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                        <ul className="flex flex-col gap-10">
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
