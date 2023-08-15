"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.userSignUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../Models/userModel"));
const appError_1 = __importDefault(require("../../utils/appError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET || 'just a secret';
const sighToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (res, user, message, statusCode) => {
    const token = sighToken(user._id);
    let cookieOptions;
    if (process.env.JWT_COOKIE_EXPIRES_IN) {
        cookieOptions = {
            expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
    }
    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;
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
exports.userSignUp = (0, catchAsync_1.default)(async (req, res) => {
    const newUser = await userModel_1.default.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    });
    createSendToken(res, newUser, 'message', 201);
});
exports.loginUser = (0, catchAsync_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError_1.default('Please provide email and password!', 400));
    }
    const user = await userModel_1.default.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError_1.default('Incorrect email or password', 401));
    }
    //3. If everything is ok, send token to client
    const message = 'You have loggedIn Successfully';
    createSendToken(res, user, message, 200);
});
