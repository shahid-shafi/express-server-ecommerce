import express from 'express';
import { createCategory, deleteCategoryById, getAllCatagories, getCategoryById, updateCategoryById } from '../controllers/categoryControllers';
import validateRequestBody from '../middleware/validateReqBody';
import { createCategoryValidation } from '../validation/categoryValidation';
const router = express.Router();

router.route('/category')
    .post(validateRequestBody(createCategoryValidation), createCategory)
    .get(getAllCatagories)

router.route('category/:id')
    .get(getCategoryById)
    .patch(updateCategoryById)
    .delete(deleteCategoryById)

export default router;