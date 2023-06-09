import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/appError";
import Joi from 'joi';
import catchAsync from "../../utils/catchAsync";
import colors from 'colors';

const validationMiddleware = (validationSchema: Joi.ObjectSchema) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = validationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            console.log(colors.bgRed('Error:'), colors.strip(error.message));
            next(new AppError(error.message, 400));
        }
        next();
    })

export default validationMiddleware;
