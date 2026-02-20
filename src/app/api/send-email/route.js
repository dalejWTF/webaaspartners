import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getEmailTemplate } from "./templates/emailTemplate";

// ✅ Payload local API (v3 / Next)
// Ajusta el import según tu setup si tu payload está en otro path
import { getPayload } from "payload";
import config from "@/payload.config"; // o "../../payload.config" según tu alias

async function getServiceLabelFromPayload({ slug, locale }) {
    if (!slug) return null;

    const payload = await getPayload({ config });

    const result = await payload.find({
        collection: "services",
        where: { slug: { equals: slug } },
        limit: 1,
        locale: locale || "es",
        fallbackLocale: "es", // o "none" si prefieres
        depth: 0
    });

    return result?.docs?.[0]?.label ?? null;
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstname, lastname, email, phone, service, message, locale } = body;

        const serviceLabel =
            (await getServiceLabelFromPayload({ slug: service, locale })) ||
            "Unknown Service";

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: process.env.MAIL_SECURE === "true",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const htmlContent = getEmailTemplate(
            firstname,
            lastname,
            email,
            phone,
            serviceLabel,
            message
        );

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_TO,
            subject: `Nuevo mensaje de ${firstname} ${lastname} - ${serviceLabel}`,
            text: `Nombre: ${firstname} ${lastname}
Email: ${email}
Teléfono: ${phone}
Servicio: ${serviceLabel}
Mensaje: ${message}
`,
            html: htmlContent
        });

        return NextResponse.json({ message: "Correo enviado correctamente" }, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json(
            { message: "Error al enviar el correo", error: error?.message },
            { status: 500 }
        );
    }
}
