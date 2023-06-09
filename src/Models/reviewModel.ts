import mongoose, { Schema } from 'mongoose';
import { IReview } from '../interfaces/schemaInterfaces';

const reviewSchema: Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to the user'],
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Review must belong to the product'],
        },
        rating: {
            type: Number,
            required: [true, 'Review must contain a rating'],
            min: 1,
            max: 5,
        },
        comment: String,
        v: {
            type: Number,
            select: false,
        }
    },
    {
        timestamps: true,
    },
);

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;