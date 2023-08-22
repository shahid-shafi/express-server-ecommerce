"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUserById = exports.getUserById = exports.userResetPassword = exports.verifyResetPasswordOTP = exports.userResetPasswordOTP = exports.checkUserName = exports.updateUserById = exports.userLogIn = exports.sendActivateAccountLink = exports.activateUserAccount = exports.userSignUp = void 0;
const user_model_1 = __importDefault(require("../Models/user.model"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const user_service_1 = require("./services/user.service");
const commonMethods_1 = require("../utils/common/commonMethods");
const { NODE_ENV, JWT_COOKIE_EXPIRES_IN } = process.env;
exports.userSignUp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_service_1.userSignUpService)(req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        message: 'User created successfully!',
    });
}));
exports.activateUserAccount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    if (!token) {
        throw new Error('Token is required!');
    }
    const user = yield (0, user_service_1.activateUserAccountService)(token);
    if (user) {
        (0, commonMethods_1.sendResponse)(res, 200, {
            status: true,
            message: 'Account activated successfully!',
        });
    }
}));
exports.sendActivateAccountLink = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield (0, user_service_1.sendActivateAccountLinkService)(email);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        message: 'Link sent successfully!',
    });
}));
exports.userLogIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error('Please provide email and password');
    }
    const token = yield (0, user_service_1.userLogInService)(email, password);
    let cookieOptions;
    if (JWT_COOKIE_EXPIRES_IN) {
        cookieOptions = {
            expires: new Date(Date.now() + Number(JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
    }
    if (NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res.cookie('jwt', token, cookieOptions);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        message: 'User logged in successfully',
        data: token,
    });
}));
const filterRequestBody = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
};
exports.updateUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new appError_1.default('This route is not for password updates. Please use /updateMyPassword.', 400));
    }
    const filteredBody = filterRequestBody(req.body, 'name', 'email');
    if (req.file)
        filteredBody.photo = req.file.filename;
    const updatedUser = yield user_model_1.default.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
}));
exports.checkUserName = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield user_model_1.default.findOne({ username });
    if (user) {
        res.status(201).json({
            result: 'success',
            message: `${username} is taken`,
        });
    }
    else {
        res.status(201).json({
            result: 'success',
            message: `${username} is available`,
        });
    }
}));
exports.userResetPasswordOTP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ error: 'Email is required.' });
    }
    const response = yield (0, user_service_1.resetPasswordOTPService)(email);
    if (response === null || response === void 0 ? void 0 : response.includes('OK')) {
        (0, commonMethods_1.sendResponse)(res, 200, {
            status: true,
            message: 'OTP sent successfully',
        });
    }
}));
exports.verifyResetPasswordOTP = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const id = req.params.id;
    if (!otp) {
        throw new Error('Otp is required!');
    }
    const userId = yield (0, user_service_1.verifyOTPService)(id, otp);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: userId,
        message: 'OTP verified successfully',
    });
}));
exports.userResetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
        throw new Error('Passwords are required!');
    }
    if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
    }
    const userId = yield (0, user_service_1.resetPasswordService)(id, password);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: { userId },
        message: 'Password reset successfully!',
    });
}));
exports.getUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.getUserByIdService)(req.params.id);
    if (!user) {
        throw new Error('User does not exist');
    }
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: user,
        message: 'User fetched successfully!',
    });
}));
exports.deleteUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_service_1.deleteUserByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: null,
        message: 'User deleted successfully',
    });
}));
exports.getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, user_service_1.getAllUsersService)(req.query);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data,
        message: 'Users fetched successfully!',
    });
}));
