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
exports.isOTPVerifiedService = exports.saveOTPService = exports.generateOTP = void 0;
const otp_query_1 = require("../query/otp.query");
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
exports.generateOTP = generateOTP;
const saveOTPService = (id, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const expire = new Date();
    expire.setMinutes(expire.getMinutes() + 5);
    const otpVerificationData = {
        id,
        otp,
        expire,
    };
    return yield (0, otp_query_1.createOTPRecordQuery)(otpVerificationData);
});
exports.saveOTPService = saveOTPService;
const isOTPVerifiedService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, otp_query_1.isOTPVerifiedQuery)(id);
});
exports.isOTPVerifiedService = isOTPVerifiedService;
