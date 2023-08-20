import { IOtp } from '../../interfaces/schemaInterfaces';
import { OTP } from '../../Models/otp.model';

export const createOTPRecordQuery = async (data: IOtp) => {
    return await OTP.create(data);
};

export const getVerifyOTPQuery = async (id: string, otp: number) => {
    return await OTP.findOneAndUpdate(
        { otp, id },
        { isVerified: true },
        { new: true },
    );
};

export const isOTPVerifiedQuery = async (id: string) => {
    const otpVerification = await OTP.findOne({ id });
    return otpVerification?.isVerified;
};

export const deleteOTpRecordQuery = async (id: string) => {
    return await OTP.deleteMany({ id });
};
