"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const appError_1 = __importDefault(require("../../utils/appError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const userModel_1 = __importDefault(require("../../Models/userModel"));
const roleModel_1 = __importDefault(require("../../Models/roleModel"));
dotenv_1.default.config();
const authorize = (role) => (0, catchAsync_1.default)(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return next(new appError_1.default('You are not logged in', 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return next(new appError_1.default('Unauthorized', 401));
    }
    const user = await userModel_1.default.findById(decoded?.id).populate('role');
    if (!user) {
        return next(new appError_1.default('Unauthorized', 401));
    }
    const role = await roleModel_1.default.findOne({ name: decoded?.role });
    if (!role) {
        return next(new appError_1.default('Unauthorized', 401));
    }
    if (role._id.toString() !== user.role._id.toString()) {
        return next(new appError_1.default('Unauthorized', 401));
    }
    req.user = user;
    next();
});
exports.authorize = authorize;
const restrictTo = (...roles) => {
    //roles => ['admin', 'seller', 'user']
    return (0, catchAsync_1.default)(async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // token = req.headers.authorization.split(' ')[1];
            token = req.header('Authorization')?.replace('Bearer ', '');
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(new appError_1.default('You are not logged in!. Please login to get access', 401));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const currentUser = await userModel_1.default.findById(decoded?.id).populate('role');
        if (!currentUser) {
            return next(new appError_1.default('User belonging to this token does not exist', 401));
        }
        if (!roles.includes(req.user.role)) {
            return next(new appError_1.default("You don't have permission to perform this action", 403));
        }
        next();
    });
};
exports.restrictTo = restrictTo;
