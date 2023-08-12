import User from "../../Models/userModel";
import { IUser } from "../../interfaces/schemaInterfaces";
import { ICreateUser } from "../../interfaces/user.Interface";

export const userSignUpQuery = async (newUserData: ICreateUser) => {
    return await User.create(newUserData);
}

export const activateUserAccountQuery = async (id: string) => {
    return await User.findByIdAndUpdate({ _id: id },
        { $set: { active: true } },
        { new: true },)
}

export const findUserByParams = async (params: Partial<IUser | any>): Promise<IUser | null> => {
    return await User.findOne(params);
};

export const findUserWithPassword = async (params: Partial<IUser | any>): Promise<IUser | null> => {
    return await User.findOne(params).select('+password +active');
}

export const userResetPasswordQuery = async (id: string, hashedPassword: string) => {
    return await User.findOneAndUpdate(
        { _id: id },
        { $set: { password: hashedPassword } },
        { new: true },
    );
};