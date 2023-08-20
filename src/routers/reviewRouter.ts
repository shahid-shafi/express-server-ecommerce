import express from 'express';
import { createReview, deleteReviewById, getAllReviews, getReviewById, updateReviewById } from '../controllers/reviewControllers';
import validateRequestBody from '../middleware/validateReqBody';
import { createReviewValidation } from '../validation/reviewValidation';
const router = express.Router({ mergeParams: true });

router.route('/reviews')
    .post(validateRequestBody(createReviewValidation), createReview)
    .get(getAllReviews)

router.route('/reviews/:id')
    .get(getReviewById)
    .patch(updateReviewById)
    .delete(deleteReviewById)

export default router;