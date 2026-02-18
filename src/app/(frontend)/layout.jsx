// src/app/(frontend)/layout.jsx
import './[locale]/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export default function FrontendRootLayout({ children, params }) {
    const locale = params?.locale ?? 'es'

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.variable}>{children}</body>
        </html>
    )
}
