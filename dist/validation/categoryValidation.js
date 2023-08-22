"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCategoryValidation = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        'any.required': 'Category title is required',
    })
});
