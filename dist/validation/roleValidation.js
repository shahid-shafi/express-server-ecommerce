"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createReviewValidation = joi_1.default.object({
    title: joi_1.default.string()
        .required()
        .min(2)
        .messages({
        'string.base': 'Title must be a string',
        'any.required': 'Role must have a title',
        'string.empty': 'Title is not allowed to be empty',
        'string.min': 'Title must have at least {#limit} characters'
    }),
});
