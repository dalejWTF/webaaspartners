import { CollectionConfig } from 'payload' // <--- 1. Importa esto

// 2. Agrega el tipo ': CollectionConfig' después del nombre
export const Media: CollectionConfig = { 
    slug: 'media',
    access: { read: () => true },
    upload: {
        mimeTypes: ['image/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
    ],
}