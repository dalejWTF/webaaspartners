export const Landing = {
    slug: 'landing',
    fields: [
        {
            name: 'images',
            type: 'array',
            fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
            ],
        },
    ],
}
