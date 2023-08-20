import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { sendResponse } from '../utils/common/commonMethods';
import {
    createCategoryService,
    deleteCategoryByIdService,
    getAllCategoriesService,
    getCategoryByIdService,
    updateCategoryByIdService,
} from './services/category.service';

export const createCategory = catchAsync(
    async (req: Request, res: Response) => {
        const category = await createCategoryService(req.body);
        sendResponse(res, 200, {
            status: true,
            data: category,
            message: 'Category created successfully!',
        });
    }
);

export const getCategoryById = catchAsync(
    async (req: Request, res: Response) => {
        const category = await getCategoryByIdService(req.params.id);
        sendResponse(res, 200, {
            status: true,
            data: category,
            message: 'Category fetched successfully!',
        });
    }
);

export const getAllCatagories = catchAsync(
    async (req: Request, res: Response) => {
        const data = await getAllCategoriesService(req.query);

        if (!data?.categories?.length) {
            sendResponse(res, 204, {
                status: true,
                data,
                message: 'No categories found',
            });
            return;
        }

        sendResponse(res, 200, {
            status: true,
            data,
            message: 'Categories fetched successfully!',
        });
    }
);

export const updateCategoryById = catchAsync(
    async (req: Request, res: Response) => {
        const category = await updateCategoryByIdService(req.params.id, req.body);
        sendResponse(res, 200, {
            status: true,
            data: category,
            message: 'Category updated successfully!',
        });
    }
);

export const deleteCategoryById = catchAsync(
    async (req: Request, res: Response) => {
        await deleteCategoryByIdService(req.params.id);

        sendResponse(res, 200, {
            status: true,
            message: 'Category deleted successfully!',
        });
    }
);
