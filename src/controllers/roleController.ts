import Role from "../Models/roleModel";
import {
    createOne, deleteOne, getAll, getOne, updateOne
} from "./handler/handlerFactory";

export const createUserRole = createOne(Role);
export const getAllRoles = getAll(Role, '');
export const getRoleById = getOne(Role, '');
export const updateRoleById = updateOne(Role);
export const deleteRoleById = deleteOne(Role);