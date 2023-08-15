"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../utils/appError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const colors_1 = __importDefault(require("colors"));
const validateRequestBody = (validationSchema) => (0, catchAsync_1.default)(async (req, res, next) => {
    const { error } = validationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(colors_1.default.bgRed('Error:'), colors_1.default.strip(error.message));
        const errorMessages = error.details.map((detail) => detail.message);
        next(new appError_1.default(errorMessages.join(', '), 400));
    }
    next();
});
exports.default = validateRequestBody;
