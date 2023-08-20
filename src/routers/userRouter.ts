import express from 'express';
const router = express.Router();
import {
  activateUserAccount,
  deleteUserById,
  getAllUsers,
  getUserById,
  sendActivateAccountLink,
  updateUserById,
  userLogIn,
  userResetPassword,
  userResetPasswordOTP,
  userSignUp,
  verifyResetPasswordOTP,
} from '../controllers/userControllers';
import {
  parseProfilePicture,
  resizeProfilePicture,
} from '../middleware/multer/profileImage';
import validateRequestBody from '../middleware/validateReqBody';
import {
  userLogInSchema,
  userResetPasswordOTPSchema,
  userResetPasswordSchema,
  userSignUpSchema,
  userVerifyOTPSchema,
} from '../validation/user.JoiValidation';

router.post('/signUp', validateRequestBody(userSignUpSchema), userSignUp);

router.get('/activateUserAccount', activateUserAccount);

router.get('/accountActivationLink', sendActivateAccountLink);

router.post('/logIn', validateRequestBody(userLogInSchema), userLogIn);

router.route('/users').get(getAllUsers);

router
  .route('/users/:id')
  .get(getUserById)
  .patch(parseProfilePicture, resizeProfilePicture, updateUserById)
  .delete(deleteUserById);

router.post(
  '/sendUserResetPasswordOTP',
  validateRequestBody(userResetPasswordOTPSchema),
  userResetPasswordOTP
);

router.post(
  '/verifyUserResetPasswordOTP',
  validateRequestBody(userVerifyOTPSchema),
  verifyResetPasswordOTP
);

router.post(
  '/resetUserPassword/:id',
  validateRequestBody(userResetPasswordSchema),
  userResetPassword
);

export default router;
