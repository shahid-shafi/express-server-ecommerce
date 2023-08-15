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
exports.deleteActivateTokenQuery = exports.verifyActivateTokenQuery = exports.activateAccountQuery = void 0;
const activateAccountModel_1 = require("../../Models/activateAccountModel");
const activateAccountQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield activateAccountModel_1.ActivateAccount.create(data);
});
exports.activateAccountQuery = activateAccountQuery;
const verifyActivateTokenQuery = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield activateAccountModel_1.ActivateAccount.findOne({ token });
});
exports.verifyActivateTokenQuery = verifyActivateTokenQuery;
const deleteActivateTokenQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield activateAccountModel_1.ActivateAccount.deleteMany({ id });
});
exports.deleteActivateTokenQuery = deleteActivateTokenQuery;
