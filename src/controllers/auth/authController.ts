import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../../Models/userModel';
import AppError from '../../utils/appError';
import catchAsync from '../../utils/catchAsync';
import dotenv from 'dotenv';
import { IUser } from '../../interfaces/schemaInterfaces';
dotenv.config();

const secret: string = process.env.JWT_SECRET || 'just a secret';

const sighToken = (id: string) => {
    return jwt.sign({ id }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

interface cookieOptions {
    expires: Date,
    httpOnly: boolean,
    secure?: boolean
}

const createSendToken = (res: Response, user: any, message: string, statusCode: number) => {
    const token = sighToken(user._id);
    let cookieOptions: cookieOptions;
    if (process.env.JWT_COOKIE_EXPIRES_IN) {
        cookieOptions = {
            expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
    }

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;
    user.confirmPassword = undefined;

    res.status(statusCode).json({
        status: 'success',
        message,
        token,
        data: {
            user: user,
        },
    });
};

export const userSignUp = catchAsync(async (req: Request, res: Response) => {
    const newUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    });

    createSendToken(res, newUser, 'message', 201);
});

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user: IUser | null = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    //3. If everything is ok, send token to client
    const message = 'You have loggedIn Successfully';
    createSendToken(res, user, message, 200);
});