export const Landing = {
    slug: "landing",
    access: { read: () => true },
    fields: [
        { name: "title", type: "text" },
        {
            name: "carousel",
            type: "array",
            required: true,
            fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
                { name: "alt", type: "text" },
            ],
        },
    ],
};
