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
exports.deleteUserRoleById = exports.updateUserRoleById = exports.getAllUserRoles = exports.getUserRoleById = exports.createUserRole = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const commonMethods_1 = require("../utils/common/commonMethods");
const userRole_service_1 = require("./services/userRole.service");
exports.createUserRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserRole = yield (0, userRole_service_1.createUserRoleService)(req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: newUserRole,
        message: "Role created successfully",
    });
}));
exports.getUserRoleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRole = yield (0, userRole_service_1.getUserRoleByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: userRole,
        message: "Role fetched successfully"
    });
}));
exports.getAllUserRoles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = yield (0, userRole_service_1.getAllUserRolesService)(req.query);
    if (!((_a = data === null || data === void 0 ? void 0 : data.roles) === null || _a === void 0 ? void 0 : _a.length)) {
        (0, commonMethods_1.sendResponse)(res, 204, {
            status: true,
            data: [],
            message: 'No roles found',
        });
    }
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data,
        message: 'Roles fetched successfully'
    });
}));
exports.updateUserRoleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRole = yield (0, userRole_service_1.updateUserRoleByIdService)(req.params.id, req.body);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        data: updatedRole,
        message: 'Role updated successfully',
    });
}));
exports.deleteUserRoleById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userRole_service_1.deleteUserRoleByIdService)(req.params.id);
    (0, commonMethods_1.sendResponse)(res, 200, {
        status: true,
        message: 'Role deleted successfully',
    });
}));
