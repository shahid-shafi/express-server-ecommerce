import Review from "../Models/reviewModel";
import {
    createOne, deleteOne, getAll, getOne, updateOne
} from "./handler/handlerFactory";

export const createReview = createOne(Review);
export const getAllReviews = getAll(Review, '');
export const getReviewById = getOne(Review, '');
export const updateReviewById = updateOne(Review);
export const deleteReviewById = deleteOne(Review);