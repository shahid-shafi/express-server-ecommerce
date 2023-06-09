import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import AppError from "../../utils/appError";
import catchAsync from "../../utils/catchAsync";
import User from "../../Models/userModel";
import Role from "../../Models/roleModel";
dotenv.config();

interface RequestWithUserRole extends Request {
    user?: any,
}

export const authorize = (role: string) => catchAsync(
    async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return next(new AppError('You are not logged in', 401))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        if (!decoded) {
            return next(new AppError('Unauthorized', 401))
        }

        const user = await User.findById(decoded?.id).populate('role');
        if (!user) {
            return next(new AppError('Unauthorized', 401))
        }

        const role = await Role.findOne({ name: decoded?.role });
        if (!role) {
            return next(new AppError('Unauthorized', 401))
        }

        if (role._id.toString() !== user.role._id.toString()) {
            return next(new AppError('Unauthorized', 401))
        }
        req.user = user;
        next();
    })

export const restrictTo = (...roles: any) => {
    //roles => ['admin', 'seller', 'user']
    return catchAsync(async (req: RequestWithUserRole, res: Response, next: NextFunction) => {

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // token = req.headers.authorization.split(' ')[1];
            token = req.header('Authorization')?.replace('Bearer ', '');
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt
        }

        if (!token) {
            return next(new AppError('You are not logged in!. Please login to get access', 401))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const currentUser = await User.findById(decoded?.id).populate('role');

        if (!currentUser) {
            return next(new AppError('User belonging to this token does not exist', 401))
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError("You don't have permission to perform this action", 403));
        }
        next();
    })
}