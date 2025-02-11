import React from "react";
import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

const socials = [
    {
        icon: <FaInstagram />,
        path: "https://www.instagram.com/arquitectos.aas/?igsh=MW40eDZxNXRuOHMxbQ%3D%3D"
    },
    {
        icon: <FaWhatsapp />,
        path: "https://wa.me/+593983495374"
    },
    {
        icon: <FaTiktok />,
        path: "https://www.tiktok.com/@carlosulloamarquez?_t=ZM-8tb5cgCQiqE&_r=1"
    },
]

const Social = ({ containerStyles, iconStyles }) => {
    return (
        <div className={containerStyles}>
            {socials.map((item, index) => {
                return (
                    <Link key={index} href={item.path} className={iconStyles}>
                        {item.icon}
                    </Link>
                );
            })}
        </div>
    );
};

export default Social;