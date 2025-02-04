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


const info = [
    {
        icon: <FaPhoneAlt />,
        title: "Phone",
        text: "+1 234 567 890"
    },
    {
        icon: <FaEnvelope />,
        title: "Email",
        text: "info@aaspartners.com"
    },
    {
        icon: <FaMapMarkedAlt />,
        title: "Address",
        text: "1234 St Name, SomeCity, SomeCountry"
    }

]



const Contact = () =>{
    return (
        <motion.section initial={{opacity:0}}
        animate={{
            opacity:1,
            transition: {delay:1, duration:0.4, ease:"easeIn"}
        }}
        className="py-6"> 
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row gap-[30px]">
                    {/* Contact Form */}
                <div className="xl:h-[54%] order-2 xl:order-none">
                    <form className="flex flex-col gap-6 p-10 border border-accent rounded-xl">
                        <h3 className="text-4xl text-accent">Let's work together</h3>
                        <p className="text-primary/90">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                        {/* Input */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input type="firstname" placeholder=" First name"/>
                            <Input type="lastname" placeholder=" Last name"/>
                            <Input type="email" placeholder=" Email address"/>
                            <Input type="phone" placeholder=" Phone number"/>
                        </div>
                        {/* Select */}
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a service"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a service</SelectLabel>
                                    <SelectItem value="intdes">Interior Design</SelectItem>
                                    <SelectItem value="remo">Remodeling</SelectItem>
                                    <SelectItem value="build">Building</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {/* Textarea */}
                        <Textarea className="h-[200px]" placeholder="Type your message here."/>
                        {/* Button */}
                        <Button className="max-w-40" variant='outline'>Send Message</Button>
                    </form>
                </div>
                {/* Info Form */}
                <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
                    <ul className="flex flex-col gap-10">
                        {info.map((item, index) => {
                            return(
                                <li key={index} className="flex items-center gap-6">
                                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-primary text-white rounded-md flex items-center justify-center">
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
    )
}


export default Contact;