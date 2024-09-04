import nodemailer from 'nodemailer'

const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com'
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '465')
const EMAIL_USER = process.env.EMAIL_USER || 'unknown'
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'unknown'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
})

export const sendAuthenticationEmail = async (email: string, url: string) => {
    const mailOptions = {
        from: 'home.sloboda@gmail.com',
        to: email,
        subject: "Family - Lien d'authentification",
        text: 'Voici votre lien de connexion : ' + url,
    }

    return transporter.sendMail(mailOptions)
}
