import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { sendResponse } from '../utils/common/commonMethods';
import {
    createReviewService,
    deleteReviewByIdService,
    getAllReviewsService,
    getReviewByIdService,
    updateReviewByIdService,
} from './services/review.service';

export const createReview = catchAsync(async (req: Request, res: Response) => {
    const review = await createReviewService(req.body);
    sendResponse(res, 200, {
        status: true,
        data: review,
        message: 'Review created successfully',
    });
});

export const getReviewById = catchAsync(async (req: Request, res: Response) => {
    const review = await getReviewByIdService(req.params.id);
    sendResponse(res, 200, {
        status: true,
        data: review,
        message: 'Review fetched successfully',
    });
});

export const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const data = await getAllReviewsService(req.query);
    if (!data?.reviews?.length) {
        sendResponse(res, 204, {
            status: true,
            data,
            message: 'No reviews found',
        });
        return;
    }

    sendResponse(res, 200, {
        status: true,
        data,
        message: 'Reviews fetched successfully!',
    });
});

export const updateReviewById = catchAsync(async (req: Request, res: Response) => {
    const updatedReview = await updateReviewByIdService(req.params.id, req.body);

    sendResponse(res, 200, {

        status: true,
        data: updatedReview,
        message: 'Reviews fetched successfully!',
    });
});

export const deleteReviewById = catchAsync(async (req: Request, res: Response) => {
    await deleteReviewByIdService(req.params.id);

    sendResponse(res, 200, {
        status: true,
        message: 'Reviews fetched successfully!',
    });
});
