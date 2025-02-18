// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        console.log("Recibiendo solicitud POST...");

        const body = await request.json();
        console.log("Datos recibidos:", body);

        const { firstname, lastname, email, phone, service, message } = body;

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        console.log("Transporter creado correctamente");

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_TO,
            subject: "Nuevo mensaje de contacto",
            text: `
                Nombre: ${firstname} ${lastname}
                Email: ${email}
                Teléfono: ${phone}
                Servicio: ${service}
                Mensaje: ${message}
            `,
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