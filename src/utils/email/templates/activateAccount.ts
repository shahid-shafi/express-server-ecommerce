import { generateTemplate } from "./generateTemplate";
import dotenv from 'dotenv';
dotenv.config();

const { APP_LINK } = process.env;

export const activateAccountTemplate = (name: string, activationToken: string) => {
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
    return generateTemplate(email);
}