import Mailgen from 'mailgen';
import dotenv from 'dotenv'; 
dotenv.config();

const { APP_LOGO_LINK, APP_LINK } = process.env;

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'ShopIT',
        link: APP_LINK,
        logo: APP_LOGO_LINK,
        copyright: 'Copyright © 2023 ShopIT. All rights reserved.',
    }
});

export const generateTemplate = (template: any) => {
    return mailGenerator.generate(template);
};