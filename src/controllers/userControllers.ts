import { NextFunction, Request, Response } from 'express';
import User from '../Models/userModel';
import catchAsync from '../utils/catchAsync';
import {
    deleteOne,
    getAll,
    getOne,
    updateAll,
} from './handler/handlerFactory';
import AppError from '../utils/appError';
import {
    resetPasswordService,
    resetPasswordOTPService,
    verifyOTPService,
    userSignUpService,
    activateUserAccountService,
    sendActivateAccountLinkService,
    userLogInService,
} from './services/user.service';
import { sendResponse } from '../utils/common/commonMethods';

interface AuthRequest extends Request {
    user?: any;
}

export const getAllUsers = getAll(User, 'role');
export const getUserById = getOne(User, 'role');

export const userSignUp = async (req: Request, res: Response) => {
    try {
        await userSignUpService(req.body);

        sendResponse(res, 200, {
            status: true,
            message: 'User created successfully!',
        });
    } catch (error: any) {
        sendResponse(res, 500, { status: false, message: error?.message });
    }
};

export const activateUserAccount = async (req: Request, res: Response) => {
    try {
        const token = req.query.token as string;

        if (!token) {
            throw new Error('Token is required!');
        }

        const user = await activateUserAccountService(token);
        if (user) {
            sendResponse(res, 200, {
                status: true,
                message: 'Account activated successfully!',
            });
        }
    } catch (error: any) {
        console.log('Activate User Account Error: ', error);
        sendResponse(res, 500, { status: false, message: error.message });
    }
};

export const sendActivateAccountLink = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await sendActivateAccountLinkService(email);
        sendResponse(res, 200, {
            status: true,
            message: 'Link sent successfully!',
        });
    } catch (error: any) {
        console.log('Send activate link controller: ', error);
        sendResponse(res, 500, { status: false, message: error.message });
    }
};

export const userLogIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Please provide email and password');
        }
        
        const result = await userLogInService(email, password);
        sendResponse(res, 200, {
            status: true,
            message: 'User logged in successfully',
            data: result,
        });
    } catch (error: any) {
        console.log('User login Error: ', error);
        sendResponse(res, 500, { status: false, message: error.message });
    }
};

const filterRequestBody = (obj: any, ...allowedFields: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

export const updateUserById = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        if (req.body.password || req.body.passwordConfirm) {
            return next(
                new AppError(
                    'This route is not for password updates. Please use /updateMyPassword.',
                    400
                )
            );
        }

        const filteredBody = filterRequestBody(req.body, 'name', 'email');
        if (req.file) filteredBody.photo = req.file.filename;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            filteredBody,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: 'success',
            data: {
                // user: updatedUser
            },
        });
    }
);

export const checkUserName = catchAsync(async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
        res.status(201).json({
            result: 'success',
            message: `${username} is taken`,
        });
    } else {
        res.status(201).json({
            result: 'success',
            message: `${username} is available`,
        });
    }
});

export const userResetPasswordOTP = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: 'Email is required.' });
        }
        const response = await resetPasswordOTPService(email);
        if (response?.includes('OK')) {
            sendResponse(res, 200, {
                status: true,
                message: 'OTP sent successfully',
            });
        }
    } catch (error: any) {
        sendResponse(res, 500, { status: false, message: error?.message });
    }
};

export const verifyResetPasswordOTP = async (req: Request, res: Response) => {
    try {
        const { otp } = req.body;
        const id = req.params.id;

        if (!otp) {
            throw new Error('Otp is required!');
        }

        const userId = await verifyOTPService(id, otp);
        sendResponse(res, 200, {
            status: true,
            data: userId,
            message: 'OTP verified successfully',
        });
    } catch (error: any) {
        sendResponse(res, 500, { status: false, message: error?.message });
    }
};

export const userResetPassword = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            throw new Error('Passwords are required!');
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords don't match");
        }
        const userId = await resetPasswordService(id, password);
        sendResponse(res, 200, {
            status: true,
            data: { userId },
            message: 'Password reset successfully!',
        });
    } catch (error: any) {
        sendResponse(res, 500, { status: false, message: error?.message });
    }
};
