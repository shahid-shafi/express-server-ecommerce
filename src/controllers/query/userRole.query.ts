import Role from "../../Models/role.model";
import { IRole } from "../../interfaces/schemaInterfaces";

export const createUserRoleQuery = async (roleData: IRole): Promise<any> => {
    return await Role.create(roleData);
};

export const getUserRoleByIdQuery = async (id: string): Promise<any> => {
    return await Role.findById(id);
};

export const getAllUserRolesQuery = async (skip: number, limit: number): Promise<any> => {
    const [roles, count] = await Promise.all([
        Role.find().skip(skip).limit(limit),
        Role.countDocuments(),
    ]);
    return { roles, count };
};

export const updateUserRoleByIdQuery = async (id: string, updateData: Partial<IRole>): Promise<any> => {
    return await Role.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );
};

export const deleteUserRoleByIdQuery = async (id: string): Promise<any> => {
    return await Role.findByIdAndDelete(id);
};