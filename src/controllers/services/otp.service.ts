import { createOTPRecordQuery, isOTPVerifiedQuery } from '../query/otp.query';

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

export const saveOTPService = async (id: string, otp: number) => {
    const expire = new Date();
    expire.setMinutes(expire.getMinutes() + 5);

    const otpVerificationData = {
        id,
        otp,
        expire,
    };

    return await createOTPRecordQuery(otpVerificationData);
}

export const isOTPVerifiedService = async (id: string) => {
    return await isOTPVerifiedQuery(id);
};