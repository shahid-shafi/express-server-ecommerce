"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveActivateAccountToken = exports.generateActivateAccountToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const activateAccountQuery_1 = require("../query/activateAccountQuery");
const generateActivateAccountToken = (length = 32) => {
    return crypto_1.default.randomBytes(length).toString('hex');
};
exports.generateActivateAccountToken = generateActivateAccountToken;
const saveActivateAccountToken = async (id, token) => {
    const expire = new Date();
    expire.setDate(expire.getDate() + 7);
    return await (0, activateAccountQuery_1.activateAccountQuery)({ id, token, expire });
};
exports.saveActivateAccountToken = saveActivateAccountToken;
