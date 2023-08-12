"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createReviewValidation = joi_1.default.object({
    user: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
        'string.pattern.base': 'User ID must be a valid ObjectId',
        'any.required': 'Review must belong to the user',
    }),
    product: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
        'string.pattern.base': 'Product ID must be a valid ObjectId',
        'any.required': 'Review must belong to the product',
    }),
    rating: joi_1.default.number().integer().required().min(1).max(5).messages({
        'number.base': 'Rating must be a number',
        'number.integer': 'Rating must be an integer',
        'any.required': 'Review must contain a rating',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating must be at most 5',
    }),
});
