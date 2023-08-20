import Joi, { ObjectSchema } from 'joi';
import { IRole } from '../interfaces/schemaInterfaces';

export const createReviewValidation: ObjectSchema<IRole> = Joi.object<IRole>({
    title: Joi.string()
        .required()
        .min(2)
        .messages({
            'string.base': 'Title must be a string',
            'any.required': 'Role must have a title',
            'string.empty': 'Title is not allowed to be empty',
            'string.min': 'Title must have at least {#limit} characters'
        }),
})