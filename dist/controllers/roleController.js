"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleById = exports.updateRoleById = exports.getRoleById = exports.getAllRoles = exports.createUserRole = void 0;
const roleModel_1 = __importDefault(require("../Models/roleModel"));
const handlerFactory_1 = require("./handler/handlerFactory");
exports.createUserRole = (0, handlerFactory_1.createOne)(roleModel_1.default);
exports.getAllRoles = (0, handlerFactory_1.getAll)(roleModel_1.default, '');
exports.getRoleById = (0, handlerFactory_1.getOne)(roleModel_1.default, '');
exports.updateRoleById = (0, handlerFactory_1.updateOne)(roleModel_1.default);
exports.deleteRoleById = (0, handlerFactory_1.deleteOne)(roleModel_1.default);
