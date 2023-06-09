import Joi, { ObjectSchema } from 'joi';
import { IUser } from '../../interfaces/schemaInterfaces';

export const createUserValidation: ObjectSchema<IUser> = Joi.object<IUser>({
    name: Joi.string().min(3).max(40).required().messages({
        'any.required': 'User must have a name.',
        'string.min': `User name must be at least {#limit} characters long`,
        'string.max': `User name cannot exceed {#limit} characters`,
    }),
    email: Joi.string()
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
    gender: Joi.string().valid('male', 'female').optional(),
    age: Joi.number().integer().positive().optional(),
    username: Joi.string().optional(),
    phone: Joi.string().optional(),
    profilePicture: Joi.string().optional(),
    role: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .optional(),
    password: Joi.string().min(8).required().messages({
        'any.required': 'Please provide a password',
        'string.min': 'Password must be at least 8 characters long',
    }),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match',
    }),
    address: Joi.array()
        .items(
            Joi.object({
                address: Joi.string().optional(),
                city: Joi.string().optional(),
                coordinates: Joi.object({
                    lat: Joi.number().optional(),
                    lng: Joi.number().optional(),
                }).optional(),
                postalCode: Joi.string().optional(),
                state: Joi.string().optional(),
            })
        )
        .optional(),
    passwordChangedAt: Joi.date().optional(),
    passwordResetToken: Joi.string().optional(),
    passwordResetExpires: Joi.date().optional(),
    active: Joi.boolean().optional(),
    __v: Joi.number().optional(),
});

export const userLoginValidation: ObjectSchema<IUser> = Joi.object<IUser>({
    email: Joi.string()
        .email()
        .pattern(new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'))
        .required()
        .messages({
            'any.required': 'Please provide your email address',
            'string.email': 'Please provide a valid email address.',
            'string.empty': 'Please provide your email address',
            'string.pattern.base': 'Please provide a valid email address',
        }),
    username: Joi.string(),
    password: Joi.string().required(),
})
    .xor('email', 'username')
    .with('password', ['email', 'username']);
