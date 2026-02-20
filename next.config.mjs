import createNextIntlPlugin from 'next-intl/plugin';

// Aquí le indicamos a Next.js dónde está tu archivo de configuración (nota la extensión .jsx)
const withNextIntl = createNextIntlPlugin('./src/i18n/request.jsx');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.public.blob.vercel-storage.com",
            },
        ],
    },
};

// Envolvemos tu configuración con el plugin
export default withNextIntl(nextConfig);