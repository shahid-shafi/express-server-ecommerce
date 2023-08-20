import { IRole } from '../../interfaces/schemaInterfaces';
import { getPaginationOptions } from '../../utils/common/commonMethods';
import {
    createUserRoleQuery,
    deleteUserRoleByIdQuery,
    getAllUserRolesQuery,
    getUserRoleByIdQuery,
    updateUserRoleByIdQuery,
} from '../query/userRole.query';

export const createUserRoleService = async (roleData: IRole): Promise<any> => {
    return await createUserRoleQuery(roleData);
};

export const getUserRoleByIdService = async (id: string): Promise<any> => {
    const role = await getUserRoleByIdQuery(id);

    if (!role) {
        throw new Error('Role not found');
    }

    return role;
};

export const getAllUserRolesService = async (query: any): Promise<any> => {
    const { page, size } = query;
    const { skip, limit } = getPaginationOptions(page, size);
    return await getAllUserRolesQuery(skip, limit);
};

export const updateUserRoleByIdService = async (
    id: string,
    updateData: Partial<IRole>
): Promise<any> => {
    const updatedRole = await updateUserRoleByIdQuery(id, updateData);

    if (!updatedRole) {
        throw new Error('Role not found');
    }

    return updatedRole;
};

export const deleteUserRoleByIdService = async (id: string): Promise<any> => {
    const deletedRole = await deleteUserRoleByIdQuery(id);

    if (!deletedRole) {
        throw new Error('Role not found');
    }

    return deletedRole;
};
