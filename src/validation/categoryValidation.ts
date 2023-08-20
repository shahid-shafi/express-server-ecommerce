import Joi, { ObjectSchema } from 'joi';
import { ICategory } from '../interfaces/schemaInterfaces';

export const createCategoryValidation: ObjectSchema<ICategory> = Joi.object<ICategory>({
    title: Joi.string().required().messages({
        'any.required': 'Category title is required',
    })
})