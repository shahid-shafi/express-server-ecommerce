import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import Joi from 'joi';
import catchAsync from "../utils/catchAsync";
import colors from 'colors';

const validateRequestBody = (validationSchema: Joi.ObjectSchema) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = validationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            console.log(colors.bgRed('Error:'), colors.strip(error.message));
            const errorMessages = error.details.map((detail: any) => detail.message);
            next(new AppError(errorMessages.join(', '), 400));
        }
        next();
    })

export default validateRequestBody;
