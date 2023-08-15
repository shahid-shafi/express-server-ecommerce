"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPassword = exports.generateHashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateHashPassword = async (password) => {
    const saltRounds = 12;
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
};
exports.generateHashPassword = generateHashPassword;
const matchPassword = async (password, storedPassword) => {
    return await bcrypt_1.default.compare(password, storedPassword);
};
exports.matchPassword = matchPassword;
