import { ICreateUser } from "../../interfaces/user.Interface";
import { generateHashPassword, matchPassword } from "../../utils/common/password";
import { signToken } from "../../utils/common/token";
import { deleteActivateTokenQuery, verifyActivateTokenQuery } from "../query/activateAccountQuery";
import { deleteOTpRecordQuery, getVerifyOTPQuery } from "../query/otpQuery";
import { activateUserAccountQuery, findUserByParams, findUserWithPassword, userResetPasswordQuery, userSignUpQuery } from "../query/userQuery";
import { generateActivateAccountToken, saveActivateAccountToken } from "./activateAccount.service";
import { activateUserAccountEmailService, sendResetPasswordEmail } from "./email.service";
import { generateOTP, isOTPVerifiedService, saveOTPService } from "./otp.service";

export const userSignUpService = async (newUserData: ICreateUser) => {
    const { name, email, password } = newUserData;
    const user = await findUserByParams({ email });

    if (user) {
        throw new Error('User with that email already exists!');
    }

    const hashedPassword = await generateHashPassword(password);

    const newUser = await userSignUpQuery({ ...newUserData, password: hashedPassword });

    const activateToken = generateActivateAccountToken();

    await activateUserAccountEmailService(name, email, activateToken);
    await saveActivateAccountToken(newUser._id, activateToken);

    return newUser;
};

export const activateUserAccountService = async (token: string) => {
    const tokenRecord = await verifyActivateTokenQuery(token);

    if (!tokenRecord) {
        throw new Error('Invalid link');
    }

    const currentTime = new Date();

    if (tokenRecord?.expire < currentTime) {
        throw new Error('This link has expired!');
    }

    const user = await activateUserAccountQuery(tokenRecord.id);

    if (user) {
        await deleteActivateTokenQuery(user._id);
    }

    return user;
}

export const sendActivateAccountLinkService = async (email: string) => {
    const user = await findUserByParams({ email });
    if (!user) {
        throw new Error('Email not registered!, please signup to continue');
    }
    await deleteActivateTokenQuery(user._id);

    const activateToken = generateActivateAccountToken();
    await activateUserAccountEmailService(user.name, email, activateToken);
    await saveActivateAccountToken(user._id, activateToken);

    return user;
}

export const userLogInService = async (email: string, password: string) => {
    const user = await findUserWithPassword({ email });
    if (!user) {
        throw new Error('Invalid email or password')
    }

    if (!user.active) {
        throw new Error('Please confirm your email address, before log in');
    }

    const isPasswordValid = await matchPassword(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password')
    }
    const token = signToken(user?._id)
    return token;
}

export const resetPasswordOTPService = async (email: string) => {
    const user = await findUserByParams({ email });
    if (!user) {
        throw new Error('No user found with this email address!');
    }

    await deleteOTpRecordQuery(user?._id);
    const otp = generateOTP();

    const result = await sendResetPasswordEmail(email, otp);
    saveOTPService(user?._id, otp);

    return result?.response;
};

export const verifyOTPService = async (id: string, otp: number) => {
    const otpRecord = await getVerifyOTPQuery(id, otp);
    if (!otpRecord) {
        throw new Error('Invalid OTP');
    }

    const currentTime = new Date();

    if (otpRecord?.expire < currentTime) {
        throw new Error('OTP Expired');
    }

    return otpRecord?.id;
};

export const resetPasswordService = async (id: string, password: string) => {
    const isOTPVerified = await isOTPVerifiedService(id);

    if (!isOTPVerified) {
        throw new Error('Please verify otp before resetting password');
    }

    const hashedPassword = await generateHashPassword(password);
    const user = await userResetPasswordQuery(id, hashedPassword);
    await deleteOTpRecordQuery(user?._id);
    return user;
};