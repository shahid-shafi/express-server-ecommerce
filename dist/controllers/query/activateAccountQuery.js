"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivateTokenQuery = exports.verifyActivateTokenQuery = exports.activateAccountQuery = void 0;
const activateAccountModel_1 = require("../../Models/activateAccountModel");
const activateAccountQuery = async (data) => {
    return await activateAccountModel_1.ActivateAccount.create(data);
};
exports.activateAccountQuery = activateAccountQuery;
const verifyActivateTokenQuery = async (token) => {
    return await activateAccountModel_1.ActivateAccount.findOne({ token });
};
exports.verifyActivateTokenQuery = verifyActivateTokenQuery;
const deleteActivateTokenQuery = async (id) => {
    return await activateAccountModel_1.ActivateAccount.deleteMany({ id });
};
exports.deleteActivateTokenQuery = deleteActivateTokenQuery;
