import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
        ],
    },
}

export default withNextIntl(withPayload(nextConfig))
