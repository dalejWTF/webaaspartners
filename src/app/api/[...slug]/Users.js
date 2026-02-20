// Users.js
const isAdmin = ({ req }) => req.user?.role === "admin";
const isLoggedIn = ({ req }) => Boolean(req.user);

export const Users = {
    slug: "users",
    auth: true,

    admin: {
        useAsTitle: "email",
        defaultColumns: ["email", "role", "updatedAt"],
        hidden: ({ user }) => user?.role !== "admin",
    },

    access: {
        create: isAdmin,

        read: ({ req }) => {
            if (!req.user) return false;
            if (req.user.role === "admin") return true;
            return { id: { equals: req.user.id } };
        },

        update: ({ req }) => {
            if (!req.user) return false;
            if (req.user.role === "admin") return true;
            return { id: { equals: req.user.id } };
        },

        delete: isAdmin,
    },

    fields: [
        {
            name: "role",
            type: "select",
            required: true,
            defaultValue: "user",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
            access: {
                create: isAdmin,
                update: isAdmin,
            },
        },
    ],
};
