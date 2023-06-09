import Joi, { ObjectSchema } from 'joi';
import { IReview } from '../../interfaces/schemaInterfaces';

export const createReviewValidation: ObjectSchema<IReview> = Joi.object<IReview>({
    user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.pattern.base': 'User ID must be a valid ObjectId',
            'any.required': 'Review must belong to the user',
        }),
    product: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.pattern.base': 'Product ID must be a valid ObjectId',
            'any.required': 'Review must belong to the product',
        }),
    rating: Joi.number().integer().required().min(1).max(5).messages({
        'number.base': 'Rating must be a number',
        'number.integer': 'Rating must be an integer',
        'any.required': 'Review must contain a rating',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating must be at most 5',
    }),
});
