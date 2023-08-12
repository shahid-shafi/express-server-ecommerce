import { Response } from "express";

interface IResData {
    status: boolean;
    message: string;
    data?: any;
}

export const sendResponse = (res: Response, statusCode: number, data: IResData) => {
    res.status(statusCode).json(data);
}