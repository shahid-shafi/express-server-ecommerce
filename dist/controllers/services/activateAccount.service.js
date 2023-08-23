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
exports.saveActivateAccountToken = exports.generateActivateAccountToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const activateAccount_query_1 = require("../query/activateAccount.query");
const generateActivateAccountToken = (length = 32) => {
    return crypto_1.default.randomBytes(length).toString('hex');
};
exports.generateActivateAccountToken = generateActivateAccountToken;
const saveActivateAccountToken = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const expire = new Date();
    expire.setDate(expire.getDate() + 7);
    return yield (0, activateAccount_query_1.activateAccountQuery)({ id, token, expire });
});
exports.saveActivateAccountToken = saveActivateAccountToken;
