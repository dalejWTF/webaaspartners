import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

const socials = [
    {
        icon: <FaInstagram />,
        path: "https://www.instagram.com/arquitectos.aas/?igsh=MW40eDZxNXRuOHMxbQ%3D%3D"
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