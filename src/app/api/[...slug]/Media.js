export const Media = {
    slug: 'media',
    access: { read: () => true }, // para que el landing pueda verlas sin login
    upload: { mimeTypes: ['image/*'] },
    fields: [{ name: 'alt', type: 'text', required: true }],
}
