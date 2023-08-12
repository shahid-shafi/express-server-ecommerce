import { userRoles } from "../constants/constants";
import { Request as ExpressRequest, Response, NextFunction } from "express";
import { verifyToken } from "../utils/common/token";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            userRole?: string;
        }
    }
}

export type ValueOf<T> = T[keyof T];
export type UserRole = ValueOf<typeof userRoles>;

const verifyTokenAndRole = (requiredRoles: UserRole[]) => {
    return async (req: ExpressRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token not found' });
        }

        try {
            const decodedToken = verifyToken(token);

            if (!Object.values(userRoles).includes(decodedToken?.role)) {
                return res.status(403).json({ error: 'Invalid user role' });
            }

            if (!requiredRoles.includes(decodedToken?.role)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }

            req.userId = decodedToken.id;
            req.userRole = decodedToken.role;

            return next();
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
};

export { verifyTokenAndRole };