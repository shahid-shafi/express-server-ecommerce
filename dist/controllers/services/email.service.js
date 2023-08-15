"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.activateUserAccountEmailService = void 0;
const email_1 = require("../../utils/email/email");
const activateAccount_1 = require("../../utils/email/templates/activateAccount");
const { EMAIL } = process.env;
const activateUserAccountEmailService = async (name, email, activateToken) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Activate your account.',
        html: (0, activateAccount_1.activateAccountTemplate)(name, activateToken),
    };
    return await (0, email_1.sendEmail)(mailOptions);
};
exports.activateUserAccountEmailService = activateUserAccountEmailService;
const sendResetPasswordEmail = async (email, otp) => {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };
    return await (0, email_1.sendEmail)(mailOptions);
};
exports.sendResetPasswordEmail = sendResetPasswordEmail;
