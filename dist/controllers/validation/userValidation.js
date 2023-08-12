"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogInSchema = exports.userResetPasswordSchema = exports.userVerifyOTPSchema = exports.userResetPasswordOTPSchema = exports.userSignUpSchema = exports.UserRoles = void 0;
const joi_1 = __importDefault(require("joi"));
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "admin";
    UserRoles["USER"] = "user";
    UserRoles["SELLER"] = "seller";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
exports.userSignUpSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    role: joi_1.default.string().valid(...Object.values(UserRoles)).optional(),
    password: joi_1.default.string().min(8).required().messages({
        'any.required': 'Please provide a password',
        'string.min': 'Password must be at least 8 characters long',
    }),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required().messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match',
    }),
});
exports.userResetPasswordOTPSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.userVerifyOTPSchema = joi_1.default.object({
    otp: joi_1.default.number().required(),
});
exports.userResetPasswordSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().required().valid(joi_1.default.ref('password')).messages({
        'any.only': "Passwords don't match",
    }),
});
exports.userLogInSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'any.required': 'Password is required'
    }),
    password: joi_1.default.string().min(8).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
    }),
});
