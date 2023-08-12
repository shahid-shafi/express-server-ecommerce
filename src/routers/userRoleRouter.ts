import express from "express";
import { createUserRole, deleteRoleById, getRoleById, getAllRoles, updateRoleById } from "../controllers/roleController";
const router = express.Router();

router.route('/roles')
    .post(createUserRole)
    .get(getAllRoles)

router.route('/roles/:id')
    .get(getRoleById)
    .patch(updateRoleById)
    .delete(deleteRoleById)

export default router;