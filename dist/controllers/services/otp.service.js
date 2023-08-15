"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOTPVerifiedService = exports.saveOTPService = exports.generateOTP = void 0;
const otpQuery_1 = require("../query/otpQuery");
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.generateOTP = generateOTP;
const saveOTPService = async (id, otp) => {
    const expire = new Date();
    expire.setMinutes(expire.getMinutes() + 5);
    const otpVerificationData = {
        id,
        otp,
        expire,
    };
    return await (0, otpQuery_1.createOTPRecordQuery)(otpVerificationData);
};
exports.saveOTPService = saveOTPService;
const isOTPVerifiedService = async (id) => {
    return await (0, otpQuery_1.isOTPVerifiedQuery)(id);
};
exports.isOTPVerifiedService = isOTPVerifiedService;
