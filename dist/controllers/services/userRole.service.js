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
exports.deleteUserRoleByIdService = exports.updateUserRoleByIdService = exports.getAllUserRolesService = exports.getUserRoleByIdService = exports.createUserRoleService = void 0;
const commonMethods_1 = require("../../utils/common/commonMethods");
const userRole_query_1 = require("../query/userRole.query");
const createUserRoleService = (roleData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, userRole_query_1.createUserRoleQuery)(roleData);
});
exports.createUserRoleService = createUserRoleService;
const getUserRoleByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield (0, userRole_query_1.getUserRoleByIdQuery)(id);
    if (!role) {
        throw new Error('Role not found');
    }
    return role;
});
exports.getUserRoleByIdService = getUserRoleByIdService;
const getAllUserRolesService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = query;
    const { skip, limit } = (0, commonMethods_1.getPaginationOptions)(page, size);
    return yield (0, userRole_query_1.getAllUserRolesQuery)(skip, limit);
});
exports.getAllUserRolesService = getAllUserRolesService;
const updateUserRoleByIdService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRole = yield (0, userRole_query_1.updateUserRoleByIdQuery)(id, updateData);
    if (!updatedRole) {
        throw new Error('Role not found');
    }
    return updatedRole;
});
exports.updateUserRoleByIdService = updateUserRoleByIdService;
const deleteUserRoleByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedRole = yield (0, userRole_query_1.deleteUserRoleByIdQuery)(id);
    if (!deletedRole) {
        throw new Error('Role not found');
    }
    return deletedRole;
});
exports.deleteUserRoleByIdService = deleteUserRoleByIdService;
