import express from "express";
import { createUserRole, deleteRoleById, getRoleById, getAllRoles, updateRoleById } from "../controllers/roleController";
const router = express.Router();

router.route('/role')
    .post(createUserRole)
    .get(getAllRoles)

router.route('/role/:id')
    .get(getRoleById)
    .patch(updateRoleById)
    .delete(deleteRoleById)

export default router;