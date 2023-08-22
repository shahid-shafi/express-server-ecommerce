"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationOptions = exports.sendResponse = void 0;
const sendResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
exports.sendResponse = sendResponse;
const getPaginationOptions = (page, size) => {
    const defaultPage = 1;
    const defaultSize = 10;
    const maxPageSize = 100;
    const normalizedPage = Math.max(defaultPage, page || defaultPage);
    const limit = Math.min(maxPageSize, Math.max(defaultSize, size || defaultSize));
    const skip = (normalizedPage - 1) * limit;
    return { skip, limit };
};
exports.getPaginationOptions = getPaginationOptions;
