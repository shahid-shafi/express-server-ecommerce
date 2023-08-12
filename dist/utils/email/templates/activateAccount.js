"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateAccountTemplate = void 0;
const generateTemplate_1 = require("./generateTemplate");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { APP_LINK } = process.env;
const activateAccountTemplate = (name, activationToken) => {
    const email = {
        body: {
            name: `${name}`,
            intro: 'Welcome to ShopIT! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with ShopIT, please click here to activate your account:',
                button: {
                    color: '#1E52Eb',
                    text: 'Confirm your account',
                    link: `${APP_LINK}/activateUser?token=${activationToken}`,
                }
            },
            outro: 'This link will expire after 7 days from now.'
        }
    };
    return (0, generateTemplate_1.generateTemplate)(email);
};
exports.activateAccountTemplate = activateAccountTemplate;
