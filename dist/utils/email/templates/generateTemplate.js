"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemplate = void 0;
const mailgen_1 = __importDefault(require("mailgen"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { APP_LOGO_LINK, APP_LINK } = process.env;
const mailGenerator = new mailgen_1.default({
    theme: 'default',
    product: {
        name: 'ShopIT',
        link: APP_LINK,
        logo: APP_LOGO_LINK,
        copyright: 'Copyright © 2023 ShopIT. All rights reserved.',
    }
});
const generateTemplate = (template) => {
    return mailGenerator.generate(template);
};
exports.generateTemplate = generateTemplate;
