import Joi from "joi";

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user',
    SELLER = 'seller',
}

export const userSignUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid(...Object.values(UserRoles)).optional(),
    password: Joi.string().min(8).required().messages({
        'any.required': 'Please provide a password',
        'string.min': 'Password must be at least 8 characters long',
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match',
    }),
});

export const userResetPasswordOTPSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const userVerifyOTPSchema = Joi.object({
    otp: Joi.number().required(),
});

export const userResetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': "Passwords don't match",
    }),
});

export const userLogInSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Password is required'
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
    }),
})