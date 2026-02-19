import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Users } from '@/app/api/[...slug]/Users'
import { Media } from '@/app/api/[...slug]/Media'
import { Landing } from '@/app/api/[...slug]/Landing' 

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET || '',
    admin: { user: 'users' },

    db: postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URL,
            ssl: {
        rejectUnauthorized: false, // A veces necesario para certificados autofirmados en desarrollo
        
      }
         },
    }),

    collections: [Users, Media, Landing],

    plugins: [
        vercelBlobStorage({
            collections: {
                // cuando crees la colección 'media', aquí la activas:
                // media: true,
            },
            token: process.env.AASPartners_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN,
            clientUploads: true,
        }),
    ],

    sharp,
})
