import { Request, Response, NextFunction } from 'express';
import { sendResponse } from './common/commonMethods';

type fxn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsync = (fxn: fxn) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fxn(req, res, next);
    } catch (error: any) {
      sendResponse(res, 500, { status: false, message: error?.message });
    }
  };
};

export default catchAsync;