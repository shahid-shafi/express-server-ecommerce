"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createProductValidation = joi_1.default.object({
    name: joi_1.default.string().required().messages({
        'any.required': 'Product name is required',
    }),
    description: joi_1.default.string().required().messages({
        'any.required': 'Product description is required',
    }),
    price: joi_1.default.number().min(1).required().messages({
        'any.required': 'Product price is required',
        'number.min': `Product price must be greater than or equal to {#limit}`,
    }),
    brand: joi_1.default.string(),
    discountPercentage: joi_1.default.number().default(0),
    category: joi_1.default.array()
        .items(joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/))
        .required()
        .min(1)
        .messages({
        'any.required': `Select at least {#limit} category for this product`,
        'array.min': `Select at least {#limit} category for this product`,
        'string.regex': 'Invalid category id format',
    }),
    thumbnail: joi_1.default.string().required().messages({
        'any.required': 'Product thumbnail is required',
    }),
    images: joi_1.default.array().items(joi_1.default.string()),
    createdby: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': 'Product creatorId is required',
        'string.regex': 'Invalid creatorId format',
    }),
    stock: joi_1.default.number().required().messages({
        'any.required': 'Product available stock is required',
    }),
    rating: joi_1.default.number().min(0).max(5),
    reviews: joi_1.default.array().items(joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/)),
    createdAt: joi_1.default.date(),
    updatedAt: joi_1.default.date(),
    __v: joi_1.default.number(),
});
