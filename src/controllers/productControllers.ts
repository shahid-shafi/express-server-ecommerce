import { Request, Response } from 'express';
import { sendResponse } from '../utils/common/commonMethods';
import {
    createProductService,
    deleteProductByIdService,
    getAllProductsService,
    getProductByIdService,
    updateProductByIdService,
} from './services/product.service';
import catchAsync from '../utils/catchAsync';

export const createProduct = catchAsync(async (req: Request, res: Response) => {
    const product = await createProductService(req.body);
    sendResponse(res, 200, {
        status: true,
        data: product,
        message: 'Product created successfully!',
    });
});

export const updateProductById = catchAsync(
    async (req: Request, res: Response) => {
        const product = await updateProductByIdService(req.params.id, req.body);
        sendResponse(res, 200, {
            status: true,
            data: product,
            message: 'Product updated successfully!',
        });
    }
);

export const getAllProducts = catchAsync(
    async (req: Request, res: Response) => {
        const data = await getAllProductsService(req.query);
        if (!data?.products?.length) {
            sendResponse(res, 204, {
                status: true,
                data,
                message: 'No Products found',
            });
            return;
        }

        sendResponse(res, 200, {
            status: true,
            data,
            message: 'Products fetched successfully!',
        });
    }
);

export const getProductById = catchAsync(
    async (req: Request, res: Response) => {
        const product = await getProductByIdService(req.params.id);
        sendResponse(res, 200, {
            status: true,
            data: product,
            message: 'Product fetched successfully',
        });
    }
);

export const deleteProductById = catchAsync(
    async (req: Request, res: Response) => {
        await deleteProductByIdService(req.params.id);
        sendResponse(res, 200, {
            status: true,
            data: null,
            message: 'Product fetched successfully',
        });
    }
);
