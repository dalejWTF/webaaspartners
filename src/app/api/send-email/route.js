// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
export async function POST(request) {
    const { firstname, lastname, email, phone, service, message } = await request.json();

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST, // Cambia esto por el host de tu servidor de correo
        port: process.env.MAIL_PORT, // Puerto para SMTP seguro
        secure: process.env.MAIL_SECURE, // Usar SSL
        auth: {
            user: process.env.MAIL_USER, // Cambia esto por tu correo
            pass: process.env.MAIL_PASS, // Cambia esto por tu contraseña
        },
    });

    // Configurar el contenido del correo
    const mailOptions = {
        from: process.env.MAIL_USER, // Correo del remitente
        to: process.env.MAIL_TO,
        subject: 'Nuevo mensaje de contacto', // Asunto del correo
        text: `
            Nombre: ${firstname} ${lastname}
            Email: ${email}
            Teléfono: ${phone}
            Servicio: ${service}
            Mensaje: ${message}
        `,
    };

    try {
        // Enviar el correo
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Correo enviado correctamente' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error al enviar el correo' }, { status: 500 });
    }
}