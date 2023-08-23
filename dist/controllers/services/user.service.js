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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersService = exports.deleteUserByIdService = exports.getUserByIdService = exports.resetPasswordService = exports.verifyOTPService = exports.resetPasswordOTPService = exports.userLogInService = exports.sendActivateAccountLinkService = exports.activateUserAccountService = exports.userSignUpService = void 0;
const commonMethods_1 = require("../../utils/common/commonMethods");
const password_1 = require("../../utils/common/password");
const token_1 = require("../../utils/common/token");
const activateAccount_query_1 = require("../query/activateAccount.query");
const otp_query_1 = require("../query/otp.query");
const user_query_1 = require("../query/user.query");
const activateAccount_service_1 = require("./activateAccount.service");
const email_service_1 = require("./email.service");
const otp_service_1 = require("./otp.service");
const userSignUpService = (newUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = newUserData;
    const user = yield (0, user_query_1.findUserByParams)({ email });
    if (user) {
        throw new Error('User with that email already exists!');
    }
    const hashedPassword = yield (0, password_1.generateHashPassword)(password);
    const newUser = yield (0, user_query_1.userSignUpQuery)(Object.assign(Object.assign({}, newUserData), { password: hashedPassword }));
    const activateToken = (0, activateAccount_service_1.generateActivateAccountToken)();
    yield (0, email_service_1.activateUserAccountEmailService)(name, email, activateToken);
    yield (0, activateAccount_service_1.saveActivateAccountToken)(newUser._id, activateToken);
    return newUser;
});
exports.userSignUpService = userSignUpService;
const activateUserAccountService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenRecord = yield (0, activateAccount_query_1.verifyActivateTokenQuery)(token);
    if (!tokenRecord) {
        throw new Error('Invalid link');
    }
    const currentTime = new Date();
    if ((tokenRecord === null || tokenRecord === void 0 ? void 0 : tokenRecord.expire) < currentTime) {
        throw new Error('This link has expired!');
    }
    const user = yield (0, user_query_1.activateUserAccountQuery)(tokenRecord.id);
    if (user) {
        yield (0, activateAccount_query_1.deleteActivateTokenQuery)(user._id);
    }
    return user;
});
exports.activateUserAccountService = activateUserAccountService;
const sendActivateAccountLinkService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_query_1.findUserByParams)({ email });
    if (!user) {
        throw new Error('Email not registered!, please signup to continue');
    }
    yield (0, activateAccount_query_1.deleteActivateTokenQuery)(user._id);
    const activateToken = (0, activateAccount_service_1.generateActivateAccountToken)();
    yield (0, email_service_1.activateUserAccountEmailService)(user.name, email, activateToken);
    yield (0, activateAccount_service_1.saveActivateAccountToken)(user._id, activateToken);
    return user;
});
exports.sendActivateAccountLinkService = sendActivateAccountLinkService;
const userLogInService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_query_1.findUserWithPassword)({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    if (!(user === null || user === void 0 ? void 0 : user.active)) {
        throw new Error('Please confirm your email address, before log in');
    }
    const isPasswordValid = yield (0, password_1.matchPassword)(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = (0, token_1.signToken)(user === null || user === void 0 ? void 0 : user._id);
    return token;
});
exports.userLogInService = userLogInService;
const resetPasswordOTPService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_query_1.findUserByParams)({ email });
    if (!user) {
        throw new Error('No user found with this email address!');
    }
    yield (0, otp_query_1.deleteOTpRecordQuery)(user === null || user === void 0 ? void 0 : user._id);
    const otp = (0, otp_service_1.generateOTP)();
    const result = yield (0, email_service_1.sendResetPasswordEmail)(email, otp);
    (0, otp_service_1.saveOTPService)(user === null || user === void 0 ? void 0 : user._id, otp);
    return result === null || result === void 0 ? void 0 : result.response;
});
exports.resetPasswordOTPService = resetPasswordOTPService;
const verifyOTPService = (id, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const otpRecord = yield (0, otp_query_1.getVerifyOTPQuery)(id, otp);
    if (!otpRecord) {
        throw new Error('Invalid OTP');
    }
    const currentTime = new Date();
    if ((otpRecord === null || otpRecord === void 0 ? void 0 : otpRecord.expire) < currentTime) {
        throw new Error('OTP Expired');
    }
    return otpRecord === null || otpRecord === void 0 ? void 0 : otpRecord.id;
});
exports.verifyOTPService = verifyOTPService;
const resetPasswordService = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isOTPVerified = yield (0, otp_service_1.isOTPVerifiedService)(id);
    if (!isOTPVerified) {
        throw new Error('Please verify otp before resetting password');
    }
    const hashedPassword = yield (0, password_1.generateHashPassword)(password);
    const user = yield (0, user_query_1.userResetPasswordQuery)(id, hashedPassword);
    yield (0, otp_query_1.deleteOTpRecordQuery)(user === null || user === void 0 ? void 0 : user._id);
    return user;
});
exports.resetPasswordService = resetPasswordService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_query_1.getUserByIdQuery)(id);
});
exports.getUserByIdService = getUserByIdService;
const deleteUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_query_1.deleteUserByIdQuery)(id);
});
exports.deleteUserByIdService = deleteUserByIdService;
const getAllUsersService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = query;
    const { skip, limit } = (0, commonMethods_1.getPaginationOptions)(page, size);
    return yield (0, user_query_1.getAllUsersQuery)(skip, limit);
});
exports.getAllUsersService = getAllUsersService;
