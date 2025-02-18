// templates/emailTemplate.js
export const getEmailTemplate = (firstname, lastname, email, phone, service, message) => {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4A90E2; text-align: center;">¡Nuevo mensaje de contacto!</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
                <p><strong>Nombre:</strong> ${firstname} ${lastname}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${phone}</p>
                <p><strong>Servicio:</strong> ${service}</p>
                <p><strong>Mensaje:</strong></p>
                <div style="background-color: #fff; padding: 10px; border-radius: 4px; border: 1px solid #eee;">
                    <p>${message}</p>
                </div>
            </div>
            <p style="text-align: center; margin-top: 20px; color: #777;">
                Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
            </p>
        </div>
    `;
};