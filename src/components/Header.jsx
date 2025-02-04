import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Nav from './Nav'
import MobileNav from './MobileNav'


const Header = () =>{
    return <header className="py-8 xl:py-12">
        <div className="container mx-auto flex justify-between items-center">
            {/* logo */}
            <Link href="/">
                <h1 className="text-4xl font-semibold">
                    A+AS <span className="text-accent">Partners</span>
                </h1>
            </Link>

            {/* desktop nav & contact*/}
            <div className="hidden xl:flex items-center gap-8">
                <Nav/>
                <Link href="/contact">
                    <Button variant='outline'> Contact Us</Button>
                </Link>
            </div>

            {/* desktop nav & contact*/}
            <div className="xl:hidden">
                <MobileNav/>
            </div>
        </div>
    </header>
    
}


export default Header