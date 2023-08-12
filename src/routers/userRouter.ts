import express from 'express';
const router = express.Router();
import {
  activateUserAccount,
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
import validateRequestBody from '../middleware/validation/validateReqBody';
import { userSignUpValidation } from '../validation/userValidation';
import { userLogInSchema, userResetPasswordOTPSchema, userResetPasswordSchema, userVerifyOTPSchema } from '../controllers/validation/userValidation';

router.post(
  '/signUp',
  validateRequestBody(userSignUpValidation),
  userSignUp
);

router.get('/activateUserAccount', activateUserAccount)

router.get('/accountActivationLink', sendActivateAccountLink)

router.post('/logIn', validateRequestBody(userLogInSchema), userLogIn);

router.route('/users').get(getAllUsers);

router
  .route('/users/:id')
  .get(getUserById)
  .patch(parseProfilePicture, resizeProfilePicture, updateUserById)

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
