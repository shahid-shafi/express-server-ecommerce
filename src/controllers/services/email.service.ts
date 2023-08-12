import { sendEmail } from '../../utils/email/email';
import { activateAccountTemplate } from '../../utils/email/templates/activateAccount';
const { EMAIL } = process.env;

export const activateUserAccountEmailService = async (
    name: string,
    email: string,
    activateToken: string
) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Activate your account.',
        html: activateAccountTemplate(name, activateToken),
    };

    return await sendEmail(mailOptions);
};

export const sendResetPasswordEmail = async (email: string, otp: number) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };

    return await sendEmail(mailOptions);
};
