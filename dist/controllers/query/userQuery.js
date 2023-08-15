"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResetPasswordQuery = exports.findUserWithPassword = exports.findUserByParams = exports.activateUserAccountQuery = exports.userSignUpQuery = void 0;
const userModel_1 = __importDefault(require("../../Models/userModel"));
const userSignUpQuery = async (newUserData) => {
    return await userModel_1.default.create(newUserData);
};
exports.userSignUpQuery = userSignUpQuery;
const activateUserAccountQuery = async (id) => {
    return await userModel_1.default.findByIdAndUpdate({ _id: id }, { $set: { active: true } }, { new: true });
};
exports.activateUserAccountQuery = activateUserAccountQuery;
const findUserByParams = async (params) => {
    return await userModel_1.default.findOne(params);
};
exports.findUserByParams = findUserByParams;
const findUserWithPassword = async (params) => {
    return await userModel_1.default.findOne(params).select('+password +active');
};
exports.findUserWithPassword = findUserWithPassword;
const userResetPasswordQuery = async (id, hashedPassword) => {
    return await userModel_1.default.findOneAndUpdate({ _id: id }, { $set: { password: hashedPassword } }, { new: true });
};
exports.userResetPasswordQuery = userResetPasswordQuery;
