import express from 'express';
import { createReview, deleteReviewById, getAllReviews, getReviewById, updateReviewById } from '../controllers/reviewControllers';
import validationMiddleware from '../middleware/validation/validationHandler';
import { createReviewValidation } from '../constants/validation/reviewValidation';
const router = express.Router({ mergeParams: true });

router.route('/reviews')
    .post(validationMiddleware(createReviewValidation), createReview)
    .get(getAllReviews)

router.route('/reviews/:id')
    .get(getReviewById)
    .patch(updateReviewById)
    .delete(deleteReviewById)

export default router;