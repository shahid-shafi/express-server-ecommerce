"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fxn) => (req, res, next) => {
    fxn(req, res, next).catch(next);
};
exports.default = catchAsync;
