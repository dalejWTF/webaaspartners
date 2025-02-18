// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getEmailTemplate } from './templates/emailTemplate';

export async function POST(request) {
    try {
        console.log("Recibiendo solicitud POST...");

        const body = await request.json();
        console.log("Datos recibidos:", body);

        const { firstname, lastname, email, phone, service, message } = body;

        // Diccionario para traducir el valor crudo del servicio
        const serviceTranslations = {
            intdes: "Interior Design", // Traducción para "intdes"
            remo: "Remodeling",       // Traducción para "remo"
            build: "Building",        // Traducción para "build"
        };

        // Obtener la traducción del servicio
        const translatedService = serviceTranslations[service] || "Unknown Service";

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE === 'true', // Convertir a booleano
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        console.log("Transporter creado correctamente");

        const htmlContent = getEmailTemplate(firstname, lastname, email, phone, translatedService, message);

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_TO,
            subject: `Hey! Tienes un nuevo mensaje de ${firstname} ${lastname} para ${translatedService}`,
            text: `
                Nombre: ${firstname} ${lastname}
                Email: ${email}
                Teléfono: ${phone}
                Servicio: ${translatedService}
                Mensaje: ${message}
            `,
            html: htmlContent, // Agregar el contenido HTML
        };

        console.log("Enviando correo...");
        await transporter.sendMail(mailOptions);
        console.log("Correo enviado correctamente");

        return NextResponse.json({ message: "Correo enviado correctamente" }, { status: 200 });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ message: "Error al enviar el correo", error: error.message }, { status: 500 });
    }
}