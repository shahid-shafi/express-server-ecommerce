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
    name: joi_1.default.string().min(3).max(40).required().messages({
        'any.required': 'User must have a name.',
        'string.min': `User name must be at least {#limit} characters long`,
        'string.max': `User name cannot exceed {#limit} characters`,
    }),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .lowercase()
        .required()
        .pattern(new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'))
        .messages({
        'any.required': 'Please provide your email address',
        'string.email': 'Please provide a valid email address.',
        'string.empty': 'Please provide your email address',
        'string.pattern.base': 'Please provide a valid email address',
    }),
    gender: joi_1.default.string().valid('male', 'female').optional(),
    age: joi_1.default.number().integer().positive().optional(),
    username: joi_1.default.string().optional(),
    phone: joi_1.default.string().optional(),
    profilePicture: joi_1.default.string().optional(),
    role: joi_1.default.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional(),
    password: joi_1.default.string().min(8).required().messages({
        'any.required': 'Please provide a password',
        'string.min': 'Password must be at least 8 characters long',
    }),
    passwordConfirm: joi_1.default.string().valid(joi_1.default.ref('password')).required().messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match',
    }),
    address: joi_1.default.array()
        .items(joi_1.default.object({
        address: joi_1.default.string().optional(),
        city: joi_1.default.string().optional(),
        coordinates: joi_1.default.object({
            lat: joi_1.default.number().optional(),
            lng: joi_1.default.number().optional(),
        }).optional(),
        postalCode: joi_1.default.string().optional(),
        state: joi_1.default.string().optional(),
    }))
        .optional(),
    passwordChangedAt: joi_1.default.date().optional(),
    passwordResetToken: joi_1.default.string().optional(),
    passwordResetExpires: joi_1.default.date().optional(),
    active: joi_1.default.boolean().optional(),
    __v: joi_1.default.number().optional(),
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
    email: joi_1.default.string()
        .email()
        .pattern(new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'))
        .required()
        .messages({
        'any.required': 'Please provide your email address',
        'string.email': 'Please provide a valid email address.',
        'string.empty': 'Please provide your email address',
        'string.pattern.base': 'Please provide a valid email address',
    }),
    // username: Joi.string().optional(),
    password: joi_1.default.string().required(),
});
// .xor('email', 'username')
// .with('password', ['email', 'username']);
