import { CookieOptions, NextFunction, Request, Response } from 'express';
import User from '../Models/user.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import {
    resetPasswordService,
    resetPasswordOTPService,
    verifyOTPService,
    userSignUpService,
    activateUserAccountService,
    sendActivateAccountLinkService,
    userLogInService,
    getAllUsersService,
    getUserByIdService,
    deleteUserByIdService,
} from './services/user.service';
import { sendResponse } from '../utils/common/commonMethods';
interface AuthRequest extends Request {
    user?: any;
}

const { NODE_ENV, JWT_COOKIE_EXPIRES_IN } = process.env;

export const userSignUp = catchAsync(async (req: Request, res: Response) => {
    await userSignUpService(req.body);
    sendResponse(res, 200, {
        status: true,
        message: 'User created successfully!',
    });
});

export const activateUserAccount = catchAsync(
    async (req: Request, res: Response) => {
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
    }
);

export const sendActivateAccountLink = catchAsync(
    async (req: Request, res: Response) => {
        const { email } = req.body;
        await sendActivateAccountLinkService(email);
        sendResponse(res, 200, {
            status: true,
            message: 'Link sent successfully!',
        });
    }
);

export const userLogIn = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error('Please provide email and password');
    }

    const token = await userLogInService(email, password);

    let cookieOptions: CookieOptions;
    if (JWT_COOKIE_EXPIRES_IN) {
        cookieOptions = {
            expires: new Date(
                Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };
    }

    if (NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }

    res.cookie('jwt', token, cookieOptions);
    sendResponse(res, 200, {
        status: true,
        message: 'User logged in successfully',
        data: token,
    });
});

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
                user: updatedUser,
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

export const userResetPasswordOTP = catchAsync(
    async (req: Request, res: Response) => {
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
    }
);

export const verifyResetPasswordOTP = catchAsync(
    async (req: Request, res: Response) => {
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
    }
);

export const userResetPassword = catchAsync(
    async (req: Request, res: Response) => {
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
    }
);

export const getUserById = catchAsync(async (req: Request, res: Response) => {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
        throw new Error('User does not exist');
    }
    sendResponse(res, 200, {
        status: true,
        data: user,
        message: 'User fetched successfully!',
    });
});

export const deleteUserById = catchAsync(
    async (req: Request, res: Response) => {
        await deleteUserByIdService(req.params.id);

        sendResponse(res, 200, {
            status: true,
            data: null,
            message: 'User deleted successfully',
        });
    }
);

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const data = getAllUsersService(req.query);
    sendResponse(res, 200, {
        status: true,
        data,
        message: 'Users fetched successfully!',
    });
});
