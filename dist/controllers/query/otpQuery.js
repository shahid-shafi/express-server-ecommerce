"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOTpRecordQuery = exports.isOTPVerifiedQuery = exports.getVerifyOTPQuery = exports.createOTPRecordQuery = void 0;
const otpModel_1 = require("../../Models/otpModel");
const createOTPRecordQuery = async (data) => {
    return await otpModel_1.OTP.create(data);
};
exports.createOTPRecordQuery = createOTPRecordQuery;
const getVerifyOTPQuery = async (id, otp) => {
    return await otpModel_1.OTP.findOneAndUpdate({ otp, id }, { isVerified: true }, { new: true });
};
exports.getVerifyOTPQuery = getVerifyOTPQuery;
const isOTPVerifiedQuery = async (id) => {
    const otpVerification = await otpModel_1.OTP.findOne({ id });
    return otpVerification?.isVerified;
};
exports.isOTPVerifiedQuery = isOTPVerifiedQuery;
const deleteOTpRecordQuery = async (id) => {
    return await otpModel_1.OTP.deleteMany({ id });
};
exports.deleteOTpRecordQuery = deleteOTpRecordQuery;
