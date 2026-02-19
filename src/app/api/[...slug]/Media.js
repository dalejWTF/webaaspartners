export const Media = {
    slug: "media",
    access: { read: () => true },
    upload: { mimeTypes: ["image/*"] },
    fields: [
        { name: "alt", type: "text", required: true },
    ],
};
