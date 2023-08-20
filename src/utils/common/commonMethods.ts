import { Response } from "express";

interface IResData {
    status: boolean;
    message: string;
    data?: any;
}

export const sendResponse = (res: Response, statusCode: number, data: IResData) => {
    res.status(statusCode).json(data);
}

export const getPaginationOptions = (page: number, size: number) => {
    const defaultPage = 1;
    const defaultSize = 10;
    const maxPageSize = 100;

    const normalizedPage = Math.max(defaultPage, page || defaultPage);
    const limit = Math.min(
        maxPageSize,
        Math.max(defaultSize, size || defaultSize),
    );

    const skip = (normalizedPage - 1) * limit;

    return { skip, limit };
};