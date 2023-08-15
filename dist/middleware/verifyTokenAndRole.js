"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndRole = void 0;
const constants_1 = require("../constants/constants");
const token_1 = require("../utils/common/token");
const verifyTokenAndRole = (requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token not found' });
        }
        try {
            const decodedToken = (0, token_1.verifyToken)(token);
            if (!Object.values(constants_1.userRoles).includes(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role)) {
                return res.status(403).json({ error: 'Invalid user role' });
            }
            if (!requiredRoles.includes(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role)) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }
            req.userId = decodedToken.id;
            req.userRole = decodedToken.role;
            return next();
        }
        catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    });
};
exports.verifyTokenAndRole = verifyTokenAndRole;
