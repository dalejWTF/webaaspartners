import { CollectionConfig } from 'payload'

export const Landing: CollectionConfig = {
    slug: 'landing',
    fields: [
        {
            name: 'title',
            type: 'text', 
        },
        {
            name: 'sections',
            type: 'array',
            fields: [
                {
                    name: 'heroImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}