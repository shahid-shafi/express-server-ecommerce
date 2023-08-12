"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = exports.activateUserAccountEmailService = void 0;
const email_1 = require("../../utils/email/email");
const activateAccount_1 = require("../../utils/email/templates/activateAccount");
const { EMAIL } = process.env;
const activateUserAccountEmailService = (name, email, activateToken) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Activate your account.',
        html: (0, activateAccount_1.activateAccountTemplate)(name, activateToken),
    };
    return yield (0, email_1.sendEmail)(mailOptions);
});
exports.activateUserAccountEmailService = activateUserAccountEmailService;
const sendResetPasswordEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };
    return yield (0, email_1.sendEmail)(mailOptions);
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
