import nodemailer, { Transporter } from 'nodemailer';
import * as process from 'node:process';

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });
  }

  async sendSignInEmail(to: string, token: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Connectez-vous - Le petit coin',
      text: `Connectez-vous en suivant ce lien http://${process.env.HOST}:${process.env.PORT}/auth/verify/${token}`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
