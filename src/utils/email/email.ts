import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { EMAIL, EMAIL_PASSWORD, NODE_ENV } = process.env;

export const sendEmail = async (mailOptions: any) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        logger: NODE_ENV === 'development',
        debug: NODE_ENV === 'development',
        ignoreTLS: false,
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD,
        },
    });

    return await transporter.sendMail(mailOptions);
};
