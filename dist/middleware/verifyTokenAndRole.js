"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndRole = void 0;
const constants_1 = require("../constants/constants");
const token_1 = require("../utils/common/token");
const verifyTokenAndRole = (requiredRoles) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token not found' });
        }
        try {
            const decodedToken = (0, token_1.verifyToken)(token);
            if (!Object.values(constants_1.userRoles).includes(decodedToken?.role)) {
                return res.status(403).json({ error: 'Invalid user role' });
            }
            if (!requiredRoles.includes(decodedToken?.role)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }
            req.userId = decodedToken.id;
            req.userRole = decodedToken.role;
            return next();
        }
        catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    };
};
exports.verifyTokenAndRole = verifyTokenAndRole;
