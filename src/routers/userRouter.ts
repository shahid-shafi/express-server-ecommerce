import express from 'express';
const router = express.Router();
import { createUser, deleteUserById, getAllUsers, getUserById, updateAllUsers, updateUserById } from '../controllers/userControllers';
import validationMiddleware from '../middleware/validation/validationHandler';
import { createUserValidation } from '../constants/validation/userValidation';
import { parseProfilePicture, resizeProfilePicture } from '../middleware/multer/profileImage';

// router.route('/update-all-users').post(updateAllUsers)

router.route('/users')
  .post(createUser)
  .get(getAllUsers)

router.route('/users/:id')
  .get(getUserById)
  .patch(parseProfilePicture, resizeProfilePicture, updateUserById)
  .delete(deleteUserById)

export default router;
