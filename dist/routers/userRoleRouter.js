"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controllers/roleController");
const router = express_1.default.Router();
router.route('/roles')
    .post(roleController_1.createUserRole)
    .get(roleController_1.getAllRoles);
router.route('/roles/:id')
    .get(roleController_1.getRoleById)
    .patch(roleController_1.updateRoleById)
    .delete(roleController_1.deleteRoleById);
exports.default = router;
