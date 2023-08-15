import Joi from "joi";

export const userSignUpValidation = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'User must have a name.',
        'string.min': `User name must be at least {#limit} characters long`,
        'string.max': `User name cannot exceed {#limit} characters`,
    }),
    email: Joi.string().email().email({ minDomainSegments: 2 })
        .lowercase()
        .required()
        .pattern(new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'))
        .messages({
            'any.required': 'Please provide your email address',
            'string.email': 'Please provide a valid email address.',
            'string.empty': 'Please provide your email address',
            'string.pattern.base': 'Please provide a valid email address',
        }),
    phone: Joi.string().optional(),
    role: Joi.string().optional(),
    password: Joi.string().min(8).required().messages({
        'any.required': 'Please provide a password',
        'string.min': 'Password must be at least 8 characters long',
    }),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match',
    }),
});