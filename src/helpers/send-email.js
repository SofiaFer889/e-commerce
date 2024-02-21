import nodemailer from 'nodemailer'
import logger  from '../utils/logger.js'

export const sendEmail = async(email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth:{
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL,
            },
        })

        await transporter.sendMail({
            from:'Ecommerce <sofefeer@gmail.com>',
            to:`${email}`,
            subject:'cambiar contraseña',
            html: templateHtmlEmail(email, url)
        })

    } catch (error) {
        logger.error(error)
    }
}

const templateHtmlEmail = (email, url) => {
    const titulo = 'Cambiar la contraseña de la cuenta'
    const link = url
    return (
        `<div>
            <h1>${titulo}</h1>
            <p>Estimado usuario,</p>
            <p>Haga clic en el siguiente enlace para cambiar su contraseña:</p>
            <a href="${link}">Cambiar contraseña</a>
            <p>Si no solicitó este cambio, ignore este mensaje.</p>
            <p>Gracias,</p>
            <p>Equipo de Ecommerce</p>
            <p>Email: ${email}</p>
        </div>`
    )
}