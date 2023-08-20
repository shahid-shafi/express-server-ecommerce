import Joi, { ObjectSchema } from 'joi';
import { IProduct } from '../interfaces/schemaInterfaces';

export const createProductValidation: ObjectSchema<IProduct> = Joi.object<IProduct>({
    name: Joi.string().required().messages({
        'any.required': 'Product name is required',
    }),
    description: Joi.string().required().messages({
        'any.required': 'Product description is required',
    }),
    price: Joi.number().min(1).required().messages({
        'any.required': 'Product price is required',
        'number.min': `Product price must be greater than or equal to {#limit}`,
    }),
    brand: Joi.string(),
    discountPercentage: Joi.number().default(0),
    category: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        .required()
        .min(1)
        .messages({
            'any.required': `Select at least {#limit} category for this product`,
            'array.min': `Select at least {#limit} category for this product`,
            'string.regex': 'Invalid category id format',
        }),
    thumbnail: Joi.string().required().messages({
        'any.required': 'Product thumbnail is required',
    }),
    images: Joi.array().items(Joi.string()),
    createdby: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': 'Product creatorId is required',
        'string.regex': 'Invalid creatorId format',
    }),
    stock: Joi.number().required().messages({
        'any.required': 'Product available stock is required',
    }),
    rating: Joi.number().min(0).max(5),
    reviews: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    __v: Joi.number(),
});