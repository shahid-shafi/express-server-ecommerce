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
exports.userResetPassword = exports.verifyResetPasswordOTP = exports.userResetPasswordOTP = exports.checkUserName = exports.updateUserById = exports.userLogIn = exports.sendActivateAccountLink = exports.activateUserAccount = exports.userSignUp = exports.getUserById = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const handlerFactory_1 = require("./handler/handlerFactory");
const appError_1 = __importDefault(require("../utils/appError"));
const user_service_1 = require("./services/user.service");
const commonMethods_1 = require("../utils/common/commonMethods");
exports.getAllUsers = (0, handlerFactory_1.getAll)(userModel_1.default, 'role');
exports.getUserById = (0, handlerFactory_1.getOne)(userModel_1.default, 'role');
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_service_1.userSignUpService)(req.body);
        (0, commonMethods_1.sendResponse)(res, 200, {
            status: true,
            message: 'User created successfully!',
        });
    }
    catch (error) {
        (0, commonMethods_1.sendResponse)(res, 500, { status: false, message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.userSignUp = userSignUp;
const activateUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (error) {
        console.log('Activate User Account Error: ', error);
        (0, commonMethods_1.sendResponse)(res, 500, { status: false, message: error.message });
    }
});
exports.activateUserAccount = activateUserAccount;
const sendActivateAccountLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        yield (0, user_service_1.sendActivateAccountLinkService)(email);
        (0, commonMethods_1.sendResponse)(res, 200, {
            status: true,
            message: 'Link sent successfully!',
        });
    }
    catch (error) {
        console.log('Send activate link controller: ', error);
        (0, commonMethods_1.sendResponse)(res, 500, { status: false, message: error.message });
    }
});
exports.sendActivateAccountLink = sendActivateAccountLink;
const userLogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Please provide email and password');
        }
        const result = yield (0, user_service_1.userLogInService)(email, password);
        (0, commonMethods_1.sendResponse)(res, 200, {
            status: true,
            message: 'User logged in successfully',
            data: result,
        });
    }
    catch (error) {
        console.log('User login Error: ', error);
        (0, commonMethods_1.sendResponse)(res, 500, { status: false, message: error.message });
    }
});
exports.userLogIn = userLogIn;
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
    const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: {
        // user: updatedUser
        },
    });
}));
exports.checkUserName = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield userModel_1.default.findOne({ username });
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
const userResetPasswordOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (error) {
        (0, commonMethods_1.sendResponse)(res, 500, { status: false, message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.userResetPasswordOTP = userResetPasswordOTP;
const verifyResetPasswordOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (error) {
        (0, commonMethods_1.sendResponse)(res, 500, { status: false, message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.verifyResetPasswordOTP = verifyResetPasswordOTP;
const userResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    }
    catch (error) {
        (0, commonMethods_1.sendResponse)(res, 500, { status: false, message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.userResetPassword = userResetPassword;
