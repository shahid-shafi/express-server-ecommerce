import { NextFunction, Request, Response } from "express";
import User from "../Models/userModel";
import catchAsync from "../utils/catchAsync";
import {
    createOne, deleteOne, getAll, getOne, updateAll, updateOne
} from "./handler/handlerFactory";
import AppError from "../utils/appError";

interface AuthRequest extends Request {
    user?: any;
}

export const getAllUsers = getAll(User, 'role');
export const getUserById = getOne(User, 'role');
export const createUser = createOne(User);
export const deleteUserById = deleteOne(User);
// export const updateUserById = updateOne(User);
export const updateAllUsers = updateAll(User);

const filterRequestBody = (obj:any, ...allowedFields:any) => {
    const newObj:any = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

export const updateUserById = catchAsync(async (req: AuthRequest, res:Response, next:NextFunction) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword.',
                400
            )
        );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterRequestBody(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            // user: updatedUser
        }
    });
});

export const checkUserName =
    catchAsync(async (req: Request, res: Response) => {
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
    })