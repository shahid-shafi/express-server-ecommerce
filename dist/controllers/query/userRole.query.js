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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserRoleByIdQuery = exports.updateUserRoleByIdQuery = exports.getAllUserRolesQuery = exports.getUserRoleByIdQuery = exports.createUserRoleQuery = void 0;
const role_model_1 = __importDefault(require("../../Models/role.model"));
const createUserRoleQuery = (roleData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield role_model_1.default.create(roleData);
});
exports.createUserRoleQuery = createUserRoleQuery;
const getUserRoleByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield role_model_1.default.findById(id);
});
exports.getUserRoleByIdQuery = getUserRoleByIdQuery;
const getAllUserRolesQuery = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const [roles, count] = yield Promise.all([
        role_model_1.default.find().skip(skip).limit(limit),
        role_model_1.default.countDocuments(),
    ]);
    return { roles, count };
});
exports.getAllUserRolesQuery = getAllUserRolesQuery;
const updateUserRoleByIdQuery = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield role_model_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
});
exports.updateUserRoleByIdQuery = updateUserRoleByIdQuery;
const deleteUserRoleByIdQuery = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield role_model_1.default.findByIdAndDelete(id);
});
exports.deleteUserRoleByIdQuery = deleteUserRoleByIdQuery;
