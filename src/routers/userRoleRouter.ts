import express from 'express';
import {
    createUserRole,
    deleteUserRoleById,
    getUserRoleById,
    getAllUserRoles,
    updateUserRoleById,
} from '../controllers/roleController';
const router = express.Router();

router.route('/roles').post(createUserRole).get(getAllUserRoles);

router
    .route('/roles/:id')
    .get(getUserRoleById)
    .patch(updateUserRoleById)
    .delete(deleteUserRoleById);

export default router;
