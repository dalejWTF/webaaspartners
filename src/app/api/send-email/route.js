// app/api/send-email/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getEmailTemplate } from "./templates/emailTemplate";

function getOriginFromRequest(request) {
    const proto = request.headers.get("x-forwarded-proto") || "http";
    const host =
        request.headers.get("x-forwarded-host") ||
        request.headers.get("host") ||
        "localhost:3000";

    return `${proto}://${host}`;
}

async function fetchServiceLabel({ origin, slug, locale }) {
    if (!slug) return null;

    const qs =
        `where[slug][equals]=${encodeURIComponent(slug)}` +
        `&limit=1` +
        `&locale=${encodeURIComponent(locale || "es")}` +
        `&fallback-locale=es`;

    const res = await fetch(`${origin}/api/services?${qs}`, {
        cache: "no-store",
        headers: {
            "content-type": "application/json",
        },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.docs?.[0]?.label ?? null;
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstname, lastname, email, phone, service, message, locale } = body;

        const origin = getOriginFromRequest(request);

        const serviceLabel =
            (await fetchServiceLabel({ origin, slug: service, locale })) ||
            "Unknown Service";

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: process.env.MAIL_SECURE === "true",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
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
            html: htmlContent,
        });

        return NextResponse.json(
            { message: "Correo enviado correctamente" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json(
            { message: "Error al enviar el correo", error: error.message },
            { status: 500 }
        );
    }
}
