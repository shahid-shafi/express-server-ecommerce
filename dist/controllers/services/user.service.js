"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordService = exports.verifyOTPService = exports.resetPasswordOTPService = exports.userLogInService = exports.sendActivateAccountLinkService = exports.activateUserAccountService = exports.userSignUpService = void 0;
const password_1 = require("../../utils/common/password");
const token_1 = require("../../utils/common/token");
const activateAccountQuery_1 = require("../query/activateAccountQuery");
const otpQuery_1 = require("../query/otpQuery");
const userQuery_1 = require("../query/userQuery");
const activateAccount_service_1 = require("./activateAccount.service");
const email_service_1 = require("./email.service");
const otp_service_1 = require("./otp.service");
const userSignUpService = async (newUserData) => {
    const { name, email, password } = newUserData;
    const user = await (0, userQuery_1.findUserByParams)({ email });
    if (user) {
        throw new Error('User with that email already exists!');
    }
    const hashedPassword = await (0, password_1.generateHashPassword)(password);
    const newUser = await (0, userQuery_1.userSignUpQuery)({ ...newUserData, password: hashedPassword });
    const activateToken = (0, activateAccount_service_1.generateActivateAccountToken)();
    await (0, email_service_1.activateUserAccountEmailService)(name, email, activateToken);
    await (0, activateAccount_service_1.saveActivateAccountToken)(newUser._id, activateToken);
    return newUser;
};
exports.userSignUpService = userSignUpService;
const activateUserAccountService = async (token) => {
    const tokenRecord = await (0, activateAccountQuery_1.verifyActivateTokenQuery)(token);
    if (!tokenRecord) {
        throw new Error('Invalid link');
    }
    const currentTime = new Date();
    if (tokenRecord?.expire < currentTime) {
        throw new Error('This link has expired!');
    }
    const user = await (0, userQuery_1.activateUserAccountQuery)(tokenRecord.id);
    if (user) {
        await (0, activateAccountQuery_1.deleteActivateTokenQuery)(user._id);
    }
    return user;
};
exports.activateUserAccountService = activateUserAccountService;
const sendActivateAccountLinkService = async (email) => {
    const user = await (0, userQuery_1.findUserByParams)({ email });
    if (!user) {
        throw new Error('Email not registered!, please signup to continue');
    }
    await (0, activateAccountQuery_1.deleteActivateTokenQuery)(user._id);
    const activateToken = (0, activateAccount_service_1.generateActivateAccountToken)();
    await (0, email_service_1.activateUserAccountEmailService)(user.name, email, activateToken);
    await (0, activateAccount_service_1.saveActivateAccountToken)(user._id, activateToken);
    return user;
};
exports.sendActivateAccountLinkService = sendActivateAccountLinkService;
const userLogInService = async (email, password) => {
    const user = await (0, userQuery_1.findUserWithPassword)({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    if (!user.active) {
        throw new Error('Please confirm your email address, before log in');
    }
    const isPasswordValid = await (0, password_1.matchPassword)(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = (0, token_1.signToken)(user?._id);
    return token;
};
exports.userLogInService = userLogInService;
const resetPasswordOTPService = async (email) => {
    const user = await (0, userQuery_1.findUserByParams)({ email });
    if (!user) {
        throw new Error('No user found with this email address!');
    }
    await (0, otpQuery_1.deleteOTpRecordQuery)(user?._id);
    const otp = (0, otp_service_1.generateOTP)();
    const result = await (0, email_service_1.sendResetPasswordEmail)(email, otp);
    (0, otp_service_1.saveOTPService)(user?._id, otp);
    return result?.response;
};
exports.resetPasswordOTPService = resetPasswordOTPService;
const verifyOTPService = async (id, otp) => {
    const otpRecord = await (0, otpQuery_1.getVerifyOTPQuery)(id, otp);
    if (!otpRecord) {
        throw new Error('Invalid OTP');
    }
    const currentTime = new Date();
    if (otpRecord?.expire < currentTime) {
        throw new Error('OTP Expired');
    }
    return otpRecord?.id;
};
exports.verifyOTPService = verifyOTPService;
const resetPasswordService = async (id, password) => {
    const isOTPVerified = await (0, otp_service_1.isOTPVerifiedService)(id);
    if (!isOTPVerified) {
        throw new Error('Please verify otp before resetting password');
    }
    const hashedPassword = await (0, password_1.generateHashPassword)(password);
    const user = await (0, userQuery_1.userResetPasswordQuery)(id, hashedPassword);
    await (0, otpQuery_1.deleteOTpRecordQuery)(user?._id);
    return user;
};
exports.resetPasswordService = resetPasswordService;
