import express from 'express';
import { createCategory, deleteCategoryById, getAllCatagories, getCategoryById, updateCategoryById } from '../controllers/categoryControllers';
import validationMiddleware from '../middleware/validation/validationHandler';
import { createCategoryValidation } from '../constants/validation/categoryValidation';
const router = express.Router();

router.route('/category')
    .post(validationMiddleware(createCategoryValidation), createCategory)
    .get(getAllCatagories)

router.route('category/:id')
    .get(getCategoryById)
    .patch(updateCategoryById)
    .delete(deleteCategoryById)

export default router;