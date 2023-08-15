"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { EMAIL, EMAIL_PASSWORD, NODE_ENV } = process.env;
const sendEmail = async (mailOptions) => {
    const transporter = nodemailer_1.default.createTransport({
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
exports.sendEmail = sendEmail;
