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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = exports.sendOTPEmail = exports.activateAccountEmail = void 0;
const mailgen_1 = __importDefault(require("mailgen"));
const activateAccountEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.activateAccountEmail = activateAccountEmail;
const sendOTPEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const template = (0, exports.generateTemplate)(email);
    }
    catch (error) {
        console.log('Error from sendOTPEmail: ', error);
        throw new Error(error);
    }
});
exports.sendOTPEmail = sendOTPEmail;
const mailGenerator = new mailgen_1.default({
    theme: 'default',
    product: {
        // Your product or app name
        name: 'ShopIT',
        link: 'https://youtube.com/',
        // Your product logo URL
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png',
    },
});
const generateTemplate = (email) => {
    const template = {
        body: {
            name: 'Max',
            intro: 'You have requested to reset your password!',
            action: [
                {
                    instructions: 'Choose an option below to proceed:',
                    button: {
                        text: 'Login as Max',
                        link: `https://yourapp.com/login?token=`,
                    },
                },
                {
                    instructions: '',
                    button: {
                        text: 'Change Password',
                        link: `https://yourapp.com/change-password?token=`,
                    },
                },
            ],
            outro: 'If you did not request a password reset, please ignore this email.',
        },
    };
    return mailGenerator.generate(template);
};
exports.generateTemplate = generateTemplate;
const generateActivationTemplate = (name) => {
    const template = {
        body: {
            name: `Hi ${name}`,
            intro: 'Welcome to ShopIt! We\'re very excited to have you on board.',
            action: {
                instructions: 'To activate you account, please click here:',
                button: {
                    color: '#4a86f7',
                    text: 'Activate your account',
                    link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        },
    };
    return mailGenerator.generate(template);
};
