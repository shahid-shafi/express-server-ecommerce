import { IReview } from "../../interfaces/schemaInterfaces";
import { getPaginationOptions } from "../../utils/common/commonMethods";
import { createReviewQuery, deleteReviewByIdQuery, getAllReviewsQuery, getReviewByIdQuery, updatedReviewByIdQuery } from "../query/review.query";

export const createReviewService = async (reviewData: IReview): Promise<any> => {
    return await createReviewQuery(reviewData);
}

export const getReviewByIdService = async (id: string): Promise<any> => {
    const review = await getReviewByIdQuery(id);

    if (!review) {
        throw new Error('Review not found');
    }

    return review;
}

export const getAllReviewsService = async (query: any): Promise<any> => {
    const { page, size } = query;
    const { skip, limit } = getPaginationOptions(page, size);
    return await getAllReviewsQuery(skip, limit);
}

export const updateReviewByIdService =
    async (id: string, updateData: Partial<IReview>): Promise<any> => {
        const updatedReview = await updatedReviewByIdQuery(id, updateData);

        if (!updatedReview) {
            throw new Error('Review not found');
        }

        return updatedReview;
    };

export const deleteReviewByIdService = async (id: string) => {
    const deletedReview = await deleteReviewByIdQuery(id);

    if (!deletedReview) {
        throw new Error('Review not found');
    }

    return deletedReview;
}