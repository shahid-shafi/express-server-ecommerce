import express from 'express';
import {
    createProduct, getAllProducts, getProductById, deleteProductById, updateProductById
} from '../controllers/productControllers';
import reviewRouter from './reviewRouter';
import validationMiddleware from '../middleware/validation/validationHandler';
import { createProductValidation } from '../constants/validation/productValidation';

const router = express.Router();

router.use('/products/:productId/reviews', reviewRouter);

router.route('/products')
    .post(validationMiddleware(createProductValidation), createProduct)
    .get(getAllProducts)

router.route('products/:id')
    .get(getProductById)
    .delete(deleteProductById)
    .patch(updateProductById)

export default router;