import User from "../../Models/user.model";
import { IUser } from "../../interfaces/schemaInterfaces";
import { ICreateUser } from "../../interfaces/user.Interface";
import { getPaginationOptions } from "../../utils/common/commonMethods";

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

export const getUserByIdQuery = async (id: string): Promise<IUser | null> => {
    return await User.findById(id);
};

export const deleteUserByIdQuery = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(
        { _id: id },
        { $set: { active: false } },
        { new: true },
    )
}

export const getAllUsersQuery = async (skip: number, limit: number) => {
    const [users, count] = await Promise.all([
        User.find()
            .skip(skip)
            .limit(limit)
            .populate(''),
        User.countDocuments(),
    ]);
    return { users, count };
}