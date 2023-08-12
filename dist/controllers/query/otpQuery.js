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
exports.deleteOTpRecordQuery = exports.isOTPVerifiedQuery = exports.getVerifyOTPQuery = exports.createOTPRecordQuery = void 0;
const otpModel_1 = require("../../Models/otpModel");
const createOTPRecordQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield otpModel_1.OTP.create(data);
});
exports.createOTPRecordQuery = createOTPRecordQuery;
const getVerifyOTPQuery = (id, otp) => __awaiter(void 0, void 0, void 0, function* () {
    return yield otpModel_1.OTP.findOneAndUpdate({ otp, id }, { isVerified: true }, { new: true });
});
exports.getVerifyOTPQuery = getVerifyOTPQuery;
const isOTPVerifiedQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const otpVerification = yield otpModel_1.OTP.findOne({ id });
    return otpVerification === null || otpVerification === void 0 ? void 0 : otpVerification.isVerified;
});
exports.isOTPVerifiedQuery = isOTPVerifiedQuery;
const deleteOTpRecordQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield otpModel_1.OTP.deleteMany({ id });
});
exports.deleteOTpRecordQuery = deleteOTpRecordQuery;
