// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import config from '@/config';
export async function POST(request) {
    const { firstname, lastname, email, phone, service, message } = await request.json();

    // Configurar el transporter de nodemailer
    const transporter = nodemailer.createTransport({
        host: config.hostMail, // Cambia esto por el host de tu servidor de correo
        port: config.portMail, // Puerto para SMTP seguro
        secure: config.secureMail, // Usar SSL
        auth: {
            user: config.userMail, // Cambia esto por tu correo
            pass: config.passMail, // Cambia esto por tu contraseña
        },
    });

    // Configurar el contenido del correo
    const mailOptions = {
        from: config.userMail, // Correo del remitente
        to: 'info@tudominio.com', // Correo del destinatario
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