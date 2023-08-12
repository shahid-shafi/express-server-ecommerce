"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userControllers_1 = require("../controllers/userControllers");
const profileImage_1 = require("../middleware/multer/profileImage");
const validateReqBody_1 = __importDefault(require("../middleware/validation/validateReqBody"));
const userValidation_1 = require("../validation/userValidation");
const userValidation_2 = require("../controllers/validation/userValidation");
router.post('/signUp', (0, validateReqBody_1.default)(userValidation_1.userSignUpValidation), userControllers_1.userSignUp);
router.get('/activateUserAccount', userControllers_1.activateUserAccount);
router.get('/accountActivationLink', userControllers_1.sendActivateAccountLink);
router.post('/logIn', (0, validateReqBody_1.default)(userValidation_2.userLogInSchema), userControllers_1.userLogIn);
router.route('/users').get(userControllers_1.getAllUsers);
router
    .route('/users/:id')
    .get(userControllers_1.getUserById)
    .patch(profileImage_1.parseProfilePicture, profileImage_1.resizeProfilePicture, userControllers_1.updateUserById);
router.post('/sendUserResetPasswordOTP', (0, validateReqBody_1.default)(userValidation_2.userResetPasswordOTPSchema), userControllers_1.userResetPasswordOTP);
router.post('/verifyUserResetPasswordOTP', (0, validateReqBody_1.default)(userValidation_2.userVerifyOTPSchema), userControllers_1.verifyResetPasswordOTP);
router.post('/resetUserPassword/:id', (0, validateReqBody_1.default)(userValidation_2.userResetPasswordSchema), userControllers_1.userResetPassword);
exports.default = router;
