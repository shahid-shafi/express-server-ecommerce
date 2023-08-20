import Review from "../../Models/review.model"
import { IReview } from "../../interfaces/schemaInterfaces";

export const createReviewQuery = async (reviewData: IReview): Promise<any> => {
    return await Review.create(reviewData);
};

export const getReviewByIdQuery = async (id: string): Promise<any> => {
    return await Review.findById(id);
};

export const getAllReviewsQuery = async (skip: number, limit: number): Promise<any> => {
    const [reviews, count] = await Promise.all([
        Review.find().skip(skip).limit(limit).populate(''),
        Review.countDocuments(),
    ]);
    return { reviews, count };
};

export const updatedReviewByIdQuery =
    async (id: string, updateData: Partial<IReview>): Promise<IReview | null> => {
        return await Review.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
    };

export const deleteReviewByIdQuery = async (id: string): Promise<any> => {
    return await Review.findByIdAndDelete(id);
}