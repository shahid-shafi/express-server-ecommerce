"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSignUpValidation = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'any.required': 'User must have a name.',
        'string.min': `User name must be at least {#limit} characters long`,
        'string.max': `User name cannot exceed {#limit} characters`,
    }),
    email: joi_1.default.string().email().email({ minDomainSegments: 2 })
        .lowercase()
        .required()
        .pattern(new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'))
        .messages({
        'any.required': 'Please provide your email address',
        'string.email': 'Please provide a valid email address.',
        'string.empty': 'Please provide your email address',
        'string.pattern.base': 'Please provide a valid email address',
    }),
    phone: joi_1.default.string().optional(),
    password: joi_1.default.string().min(8).required().messages({
        'any.required': 'Please provide a password',
        'string.min': 'Password must be at least 8 characters long',
    }),
    passwordConfirm: joi_1.default.string().valid(joi_1.default.ref('password')).required().messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match',
    }),
});
