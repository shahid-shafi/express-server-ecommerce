import { Request, Response, NextFunction } from 'express';

export const ignoreFields = (ignoredFields: string[]) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const modifiedBody = Object.fromEntries(
        Object.entries(req.body)?.filter(([key]) => !ignoredFields?.includes(key))
    );

    req.body = modifiedBody;
    next();
};