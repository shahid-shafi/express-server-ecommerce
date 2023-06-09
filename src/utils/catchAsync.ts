import { Request, Response, NextFunction } from 'express';

const catchAsync =
(fxn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fxn(req, res, next).catch(next);
  };

export default catchAsync;
