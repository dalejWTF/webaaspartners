export const Services = {
    slug: "services",
    admin: {
        useAsTitle: "slug",
        defaultColumns: ["slug", "active"],
    },
    access: { read: () => true },
    fields: [
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            label: "Value del Select",
        },
        {
            name: "label",
            type: "text",
            required: true,
            localized: true, // ✅ clave
            label: "Nombre visible",
        },
        {
            name: "active",
            type: "checkbox",
            defaultValue: true,
            label: "Activo",
        },
    ],
};
